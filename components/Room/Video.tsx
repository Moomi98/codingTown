import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { whiteboardState } from "../../stores/whiteboard";
import Whiteboard from "../whiteboard/Whiteboard";

interface videoProps {
  desktopStream: MediaStream;
  mediaStream: MediaStream;
}

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

const Video = (props: videoProps) => {
  const [whiteboard, setWhiteboard] = useRecoilState(whiteboardState);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (whiteboard) return;

    videoRef.current.srcObject = props.desktopStream;
  }, [props.desktopStream, whiteboard]);
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
