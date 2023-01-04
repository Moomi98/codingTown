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

  // makeConnection() {
  //   this.peerConnection.addEventListener("icecandidate", (data) => {
  //     this.socket.emit("icecandidate", {
  //       candidate: data.candidate,
  //       roomCode: this.roomCode,
  //     });
  //   });
  //   this.socket.on("icecandidate", (candidate) => {
  //     console.log(candidate);

  //     this.peerConnection.addIceCandidate(candidate);
  //   });
  // }

  addTracks(streams: MediaStream[]) {
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
        sid,
        roomCode: this.roomCode,
      });
    });
    this.socket.on(events.ICE_CANDIDATE, (candidate: RTCIceCandidateInit) => {
      console.log("iceCandidate", candidate);
      this.peerConnection.addIceCandidate(candidate);
    });
  }

  setRemoteStream(remoteVideo: HTMLVideoElement) {
    this.peerConnection.addEventListener("track", (data) => {
      console.log("track", data);

      remoteVideo.srcObject = data.streams[0];
    });
  }
}
