import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useRecoilState } from "recoil";
import { whiteboardState } from "../../stores/whiteboard";
import Whiteboard from "../whiteboard/Whiteboard";

interface videoProps {
  desktopStream: MediaStream;
  mediaStream: MediaStream;
  width?: number;
}

interface containerProps {
  width?: number;
}

const Container = styled.div<containerProps>`
  width: ${(props) =>
    props.width
      ? css`
          ${props.width}%
        `
      : `100%`};
  height: ${(props) =>
    props.width
      ? css`
          ${props.width}%
        `
      : `100%`};
  border: ${(props) => props.width && "3px solid black"};

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

  useEffect(() => {
    console.log(props.width);
  }, [props.width]);
  return (
    <Container width={props.width}>
      {whiteboard ? (
        <Whiteboard />
      ) : (
        <VideoPlayer ref={videoRef} autoPlay></VideoPlayer>
      )}
    </Container>
  );
};

export default Video;
