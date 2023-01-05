import styled from "styled-components";
import Menu from "./Menu";
import Video from "./Video";
import { BASE_URL } from "../../apis/http";
import { events } from "../../constants/events";
import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { WebRTC } from "../../utils/webRTC";
import { getUserMedia, loadDesktopCapture } from "../../utils/channel/channel";
import { offerType } from "../../utils/webRTC";
import RemoteVideo from "./RemoteVideo";

interface roomProps {
  nickName: string;
  roomCode: number;
  enterType: string;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  position: relative;
`;

const Room = (props: roomProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState(1);
  const remoteVideoRefs = useRef<HTMLVideoElement>(null);
  let socket: Socket = io(BASE_URL);
  let webRTC = new WebRTC(socket, props.roomCode);

  const init = async () => {
    webRTC.addTracks([await getUserMedia(), await loadDesktopCapture()]);

    socket.on(events.CONNECT, async () => {
      console.log("response");
    });
    socket.on(events.CONNECT_ERROR, (error: any) => {
      console.log("connect error", error);
    });

    socket.on(events.DISCONNECT, (reason: any) => {
      console.log("disconnect", reason);
    });

    socket.emit(props.enterType, {
      nickName: props.nickName,
      roomCode: String(props.roomCode),
    });
  };

  const setJoinEvent = async () => {
    webRTC.setRemoteStream(remoteVideoRefs.current);

    socket.on(events.HAND_SHAKE, async (response) => {
      webRTC.setIceCandidate(response.sid);
    });

    socket.on(events.JOIN, async (response: any) => {
      socket.emit(events.HAND_SHAKE, {
        sid: response.sid,
        roomCode: props.roomCode,
      });
      webRTC.setIceCandidate(response.sid);

      webRTC.setLocalOffer(response.sid);
    });

    socket.on(events.OFFER, (response: offerType) => {
      webRTC.setRemoteOffer(
        {
          type: events.OFFER as RTCSdpType,
          sdp: response.sdp,
        },
        response.sid
      );
    });

    socket.on(events.ANSWER, (response: any) => {
      webRTC.setAnswer({
        type: events.ANSWER as RTCSdpType,
        sdp: response.sdp,
      });
    });
  };

  useEffect(() => {
    init();
    setJoinEvent();
  }, []);
  return (
    <Container>
      {/* <Video /> */}
      <RemoteVideo ref={remoteVideoRefs} />
      <Menu />
    </Container>
  );
};

export default Room;
