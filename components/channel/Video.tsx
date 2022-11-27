import { useEffect, useRef } from "react";
import { loadDesktopCapture } from "../../utils/channel/channel";
import styled from "styled-components";
const VideoContainer = styled.video`
  width: 100%;
  height: 100%;
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
  return <VideoContainer ref={videoRef} autoPlay></VideoContainer>;
};

export default Video;
