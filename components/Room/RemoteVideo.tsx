import { forwardRef } from "react";
import styled, { css } from "styled-components";

interface RemoteVideoProps {
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
  position: relative;
  border: ${(props) => props.width && "3px solid black"};
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

const RemoteVideo = forwardRef<HTMLVideoElement, RemoteVideoProps>(
  (props, ref) => {
    // useEffect(() => {
    //   if (!videoRef.current) return;
    //   videoRef.current.srcObject = props.video;
    // }, [props.video]);

    return (
      <Container width={props.width}>
        <VideoPlayer ref={ref} autoPlay></VideoPlayer>
      </Container>
    );
  }
);

export default RemoteVideo;
