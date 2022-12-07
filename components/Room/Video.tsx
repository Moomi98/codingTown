import { useEffect, useRef } from "react";
import {
  loadDesktopCapture,
  getDevices,
  getUserMedia,
} from "../../utils/channel/channel";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { desktopStreamState, mediaStreamState } from "../../stores/stream";

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
  const [_, setDesktopStream] = useRecoilState(desktopStreamState);
  const [__, setMediaStream] = useRecoilState(mediaStreamState);
  const videoRef = useRef<HTMLVideoElement>(null);
  const setDesktopVideo = async () => {
    if (!videoRef.current) return;
    const desktopStream = await loadDesktopCapture();
    const mediaStream = await getUserMedia();
    setDesktopStream(desktopStream);
    setMediaStream(mediaStream);
    videoRef.current.srcObject = desktopStream || null;
  };

  useEffect(() => {
    setDesktopVideo();
  }, []);

  return (
    <Container>
      <VideoPlayer ref={videoRef} autoPlay></VideoPlayer>
    </Container>
  );
};

export default Video;
