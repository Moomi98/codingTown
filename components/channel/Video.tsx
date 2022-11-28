import { useEffect, useRef } from "react";
import { loadDesktopCapture } from "../../utils/channel/channel";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const VideoPlayer = styled.video`
  display: block;
  margin: 0 auto;
  width: 100%;
  background-color: gray;
`;

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const setDesktopVideo = async () => {
    if (!videoRef.current) return;
    const stream = await loadDesktopCapture();
    videoRef.current.srcObject = stream || null;
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
