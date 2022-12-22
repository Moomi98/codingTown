import styled from "styled-components";
import Menu from "./Menu";
import Video from "./Video";
import { BASE_URL } from "../../apis/http";
import { events } from "../../constants/events";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { WebRTC } from "../../utils/webRTC";
import { getUserMedia, loadDesktopCapture } from "../../utils/channel/channel";
import { offerType } from "../../utils/webRTC";
import { useRecoilState } from "recoil";
import { socketState } from "../../stores/socket";

interface roomProps {
  nickName: string;
  roomCode: number;
  enterType: string;
}

interface joinType {
  nickName: string;
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
  const [currentUser, setCurrentUser] = useState(0);
  const [roomSocket, setRoomSocket] = useRecoilState(socketState);
  let videoWidth = Math.floor(100 / currentUser);
  let socket: Socket = io(BASE_URL);
  let webRTC = new WebRTC(socket, 11212);

  const init = (): void => {
    setRoomSocket(socket);

    socket.on(events.CONNECT, () => {
      console.log("response");
    });

    socket.emit(events.MAKE_ROOM, {
      nickName: props.nickName,
      roomCode: props.roomCode,
    });

    socket.on(events.CONNECT_ERROR, (error: any) => {
      console.log("connect error", error);
    });

    socket.on(props.enterType, (response: any) => {
      console.log(response);
      setCurrentUser((prev) => prev + 1);
    });
  };

  const setJoinEvent = () => {
    socket.on(events.JOIN, async (response: joinType) => {
      console.log(response);

      webRTC.makeConnection();
      webRTC.addTracks([await getUserMedia(), await loadDesktopCapture()]);
      webRTC.setLocalOffer();
    });

    socket.on(events.OFFER, async (response: offerType) => {
      webRTC.setRemoteOffer({
        type: events.OFFER as RTCSdpType,
        sdp: response.sdp,
      });
    });

    socket.on(events.ANSWER, (response: offerType) => {
      webRTC.setAnswer({
        type: events.OFFER as RTCSdpType,
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
      <Video />

      <Menu />
    </Container>
  );
};

export default Room;
