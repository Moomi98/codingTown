import { Socket } from "socket.io-client";
import { events } from "../constants/events";

export interface offerType {
  sdp: string;
  roomCode: number;
  sid: string;
}

export class WebRTC {
  peerConnection: RTCPeerConnection;
  socket: Socket;
  roomCode: number;
  constructor(socket: Socket, roomCode: number) {
    this.peerConnection = new RTCPeerConnection();
    this.socket = socket;
    this.roomCode = roomCode;
  }

  addTracks(streams: MediaStream[]) {
    console.log(streams);

    streams.forEach((stream) => {
      stream
        .getTracks()
        .forEach((track) => this.peerConnection.addTrack(track, stream));
    });
  }

  async setLocalOffer(sid: string) {
    const offer = await this.peerConnection.createOffer();
    this.peerConnection.setLocalDescription(offer);

    this.socket.emit(events.OFFER, {
      sdp: offer.sdp,
      roomCode: this.roomCode,
      sid,
    });
  }

  async setRemoteOffer(offer: RTCSessionDescriptionInit, sid: string) {
    this.peerConnection.setRemoteDescription(offer);
    const answer = await this.peerConnection.createAnswer();

    this.peerConnection.setLocalDescription(answer);
    this.socket.emit(events.ANSWER, {
      sdp: answer.sdp,
      roomCode: this.roomCode,
      sid,
    });
  }

  async setAnswer(answer: RTCSessionDescriptionInit) {
    this.peerConnection.setRemoteDescription(answer);
  }

  setIceCandidate(sid: string) {
    this.peerConnection.addEventListener("icecandidate", (data) => {
      this.socket.emit("icecandidate", {
        candidate: data.candidate,
        sid: sid,
        roomCode: this.roomCode,
      });
    });
    this.socket.on(events.ICE_CANDIDATE, (response) => {
      if (response.candidate) {
        this.peerConnection.addIceCandidate(response.candidate);
      }
    });
  }

  setRemoteStream(remoteVideo: HTMLVideoElement | null) {
    this.peerConnection.addEventListener("track", async (data) => {
      console.log(data);

      if (data.track.kind === "video") {
        if (!remoteVideo) return;
        console.log(data.streams[0]);

        remoteVideo.srcObject = data.streams[0];
      }
    });
  }
}
