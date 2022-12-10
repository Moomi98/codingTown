import { useEffect, useRef } from "react";
import { loadDesktopCapture, getUserMedia } from "../../utils/channel/channel";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { desktopStreamState, mediaStreamState } from "../../stores/stream";
import { whiteboardState } from "../../stores/whiteboard";
import Whiteboard from "../whiteboard/Whiteboard";

const Container = styled.div`
  width: 100%;
  height: 92%;
  position: relative;
`;

const VideoPlayer = styled.video`
  position: absolute;
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: gray;
  object-fit: fill;
`;

const Video = () => {
  const [desktopStream, setDesktopStream] = useRecoilState(desktopStreamState);
  const [__, setMediaStream] = useRecoilState(mediaStreamState);
  const [whiteboard, setWhiteboard] = useRecoilState(whiteboardState);
  const videoRef = useRef<HTMLVideoElement>(null);

  const setDesktopVideo = async () => {
    if (!videoRef.current) return;
    const desktop = await loadDesktopCapture();
    setDesktopStream(desktop);
    videoRef.current.srcObject = desktop || null;
  };

  const setMedia = async () => {
    const mediaStream = await getUserMedia();

    setMediaStream(mediaStream);
  };

  useEffect(() => {
    setDesktopVideo();
    setMedia();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (whiteboard) return;
    videoRef.current.srcObject = desktopStream;
  }, [whiteboard]);

  return (
    <Container>
      {whiteboard ? (
        <Whiteboard />
      ) : (
        <VideoPlayer ref={videoRef} autoPlay></VideoPlayer>
      )}
    </Container>
  );
};

export default Video;
