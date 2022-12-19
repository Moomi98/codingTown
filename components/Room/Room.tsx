import styled from "styled-components";
import Menu from "./Menu";
import Video from "./Video";
import { BASE_URL } from "../../apis/http";
import { events } from "../../constants/events";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { WebRTC } from "../../utils/webRTC";

interface roomProps {
  nickName: string;
  roomCode: string;
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
  let videoWidth = Math.floor(100 / currentUser);
  let socket: Socket;
  let webRTC;

  const init = (): void => {
    socket = io(BASE_URL);
    webRTC = new WebRTC(socket, 11212);
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

    socket.on(events.MAKE_ROOM, (response: any) => {
      console.log(response);
      setCurrentUser((prev) => prev + 1);
    });
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Container>
      <Video width={videoWidth} />

      <Menu />
    </Container>
  );
};

export default Room;
