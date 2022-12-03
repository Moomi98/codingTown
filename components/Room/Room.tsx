import styled from "styled-components";
import Menu from "./Menu";
import Video from "./Video";
import { BASE_URL } from "../../constants/api";
import { events } from "../../constants/events";
import { io, Socket } from "socket.io-client";
import { useEffect } from "react";

const Container = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  margin: 0 auto;
  position: relative;
  top: 70px;
  padding-top: 30px;
`;

const Channel = (): JSX.Element => {
  let socket: Socket;
  const initSocket = (): void => {
    socket = io(BASE_URL);
    socket.on(events.CONNECT, () => {
      console.log("response");
      console.log(socket);
    });

    addSocketListener(events.CONNECT_ERROR, () => {
      console.log("connect error");
    });

    addSocketListener(events.DISCONNECT, () => {
      console.log("disconnect");
    });
    addSocketListener(events.MAKE_ROOM, (response: any) => {
      console.log(events);
    });
    addSocketListener;
  };

  const addSocketListener = (event: string, callback: Function): void => {
    socket?.on(event, (payload) => callback(payload));
  };

  const emitSocket = (event: string, payload: object): void => {
    socket?.emit(event, payload);
  };

  useEffect(() => {
    initSocket();
  }, []);
  return (
    <Container>
      <Video />
      <Menu />
    </Container>
  );
};

export default Channel;
