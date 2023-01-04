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
  let socket: Socket = io(BASE_URL);
  let webRTC = new WebRTC(socket, props.roomCode);

  const init = (): void => {
    socket.on(events.CONNECT, () => {
      console.log("response");
    });

    socket.emit(props.enterType, {
      nickName: props.nickName,
      roomCode: String(props.roomCode),
    });

    socket.on(events.CONNECT_ERROR, (error: any) => {
      console.log("connect error", error);
    });

    socket.on(events.DISCONNECT, (reason: any) => {
      console.log("disconnect", reason);
    });
  };

  const setJoinEvent = () => {
    socket.on("*", (data) => {
      console.log(data);
    });
    socket.on(events.JOIN, async (response: any) => {
      webRTC.addTracks([await getUserMedia(), await loadDesktopCapture()]);
      webRTC.setLocalOffer(response.sid);

      webRTC.setIceCandidate(response.sid);
    });

    socket.on(events.OFFER, async (response: offerType) => {
      console.log(response);

      webRTC.setRemoteOffer(
        {
          type: events.OFFER as RTCSdpType,
          sdp: response.sdp,
        },
        response.sid
      );
    });

    socket.on(events.ANSWER, (response: any) => {
      console.log(response);

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
