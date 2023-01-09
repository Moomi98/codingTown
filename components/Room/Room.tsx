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

const VideoWrapper = styled.div`
  width: 100%;
  height: 92%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background-color: #222;
`;

const Room = (props: roomProps): JSX.Element => {
  // const currentUser = useRef<number>(1);
  // const videoWidth = useRef<number>(100);
  const [currentUser, setCurrentUser] = useState<number>(1);
  const [videoWidth, setVideoWidth] = useState<number>(100);
  const remoteVideoRefs = useRef<HTMLVideoElement>(null);
  // let [desktopStream, setDesktopStream] = useState<MediaStream>();
  // let [userMediaStream, setUserMediaStream] = useState<MediaStream>();
  const desktopStream = useRef<MediaStream>();
  const userMediaStream = useRef<MediaStream>();
  const [hasStream, setHasStream] = useState<boolean>(false);
  const socket = useRef<Socket>();
  const webRTC = useRef<WebRTC>();

  const init = async () => {
    socket.current = io(BASE_URL);
    webRTC.current = new WebRTC(socket.current, props.roomCode);
    webRTC.current.addTracks([
      desktopStream.current!,
      userMediaStream.current!,
    ]);

    socket.current.on(events.CONNECT, async () => {
      console.log("response");
    });
    socket.current.on(events.CONNECT_ERROR, (error: any) => {
      console.log("connect error", error);
    });

    socket.current.on(events.DISCONNECT, (reason: any) => {
      console.log("disconnect", reason);
    });

    socket.current.emit(props.enterType, {
      nickName: props.nickName,
      roomCode: String(props.roomCode),
    });
  };

  const setJoinEvent = async () => {
    webRTC.current?.setRemoteStream(remoteVideoRefs.current);

    socket.current?.on(events.HAND_SHAKE, async (response) => {
      webRTC.current?.setIceCandidate(response.sid);
    });

    socket.current?.on(events.JOIN, async (response: any) => {
      socket.current?.emit(events.HAND_SHAKE, {
        sid: response.sid,
        roomCode: props.roomCode,
      });
      webRTC.current?.setIceCandidate(response.sid);

      webRTC.current?.setLocalOffer(response.sid);
    });

    socket.current?.on(events.OFFER, (response: offerType) => {
      webRTC.current?.setRemoteOffer(
        {
          type: events.OFFER as RTCSdpType,
          sdp: response.sdp,
        },
        response.sid
      );
      // currentUser.current += 1;
      // videoWidth.current = 100 / Math.ceil(Math.sqrt(currentUser.current));
      setCurrentUser((state) => state + 1);
      setVideoWidth(100 / Math.ceil(Math.sqrt(currentUser + 1)) - 1);
    });

    socket.current?.on(events.ANSWER, (response: any) => {
      console.log("answer");

      webRTC.current?.setAnswer({
        type: events.ANSWER as RTCSdpType,
        sdp: response.sdp,
      });
      // currentUser.current += 1;
      // videoWidth.current = 100 / Math.ceil(Math.sqrt(currentUser.current));
      setCurrentUser((state) => state + 1);
      setVideoWidth(100 / Math.ceil(Math.sqrt(currentUser + 1)) - 1);
    });
  };

  const setStreams = async () => {
    // setDesktopStream(await loadDesktopCapture());
    // setUserMediaStream(await getUserMedia());
    desktopStream.current = await loadDesktopCapture();
    userMediaStream.current = await getUserMedia();
  };

  useEffect(() => {
    (async () => {
      await setStreams();
      setHasStream(true);
    })();
  }, []);

  useEffect(() => {
    if (hasStream) {
      init();
      setJoinEvent();
    }
  }, [hasStream]);

  return (
    <Container>
      <VideoWrapper>
        <Video
          desktopStream={desktopStream.current!}
          mediaStream={userMediaStream.current!}
          width={videoWidth}
        />
        <RemoteVideo ref={remoteVideoRefs} width={videoWidth} />
      </VideoWrapper>

      <Menu />
    </Container>
  );
};

export default Room;
