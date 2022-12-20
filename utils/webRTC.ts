import { Socket } from "socket.io-client";

export interface offerType {
  sdp: string;
  roomCode: number;
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

  makeConnection() {
    this.peerConnection.addEventListener("icecandidate", (data) => {
      this.socket.emit("icecandidate", data.candidate, this.roomCode);
    });
    this.socket.on("icecandidate", (candidate) => {
      this.peerConnection.addIceCandidate(candidate);
    });
  }

  addTracks(streams: MediaStream[]) {
    streams.forEach((stream) => {
      console.log(stream.getTracks());
      stream
        .getTracks()
        .forEach((track) => this.peerConnection.addTrack(track, stream));
    });
  }

  async setLocalOffer() {
    const offer = await this.peerConnection.createOffer();
    this.peerConnection.setLocalDescription(offer);
    this.socket.emit("offer", { sdp: offer.sdp, roomCode: this.roomCode });
  }

  async setRemoteOffer(offer: RTCSessionDescriptionInit) {
    this.peerConnection.setRemoteDescription(offer);
    const answer = await this.peerConnection.createAnswer();
    this.peerConnection.setLocalDescription(answer);
    this.socket.emit("answer", { sdp: answer.sdp, roomCode: this.roomCode });
  }

  async setAnswer(answer: RTCSessionDescriptionInit) {
    this.peerConnection.setRemoteDescription(answer);
  }
}
