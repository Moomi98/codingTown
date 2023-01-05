import { forwardRef, useEffect, useRef } from "react";
import styled from "styled-components";

interface RemoteVideoProps {
  video: MediaStream;
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

const RemoteVideo = forwardRef<HTMLVideoElement>((props, ref) => {
  // useEffect(() => {
  //   if (!videoRef.current) return;
  //   videoRef.current.srcObject = props.video;
  // }, [props.video]);

  return (
    <Container>
      <VideoPlayer ref={ref} autoPlay playsInline></VideoPlayer>
    </Container>
  );
});

export default RemoteVideo;
