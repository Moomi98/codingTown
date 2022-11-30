import styled, { css, keyframes } from "styled-components";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import TextField from "../common/TextField";
import Toggle from "../common/Toggle";
import { mainColor, mainColorHover } from "../../styles/variables";
interface animationProps {
  animation: boolean;
}

interface ModalProps {
  close: Function;
}

const fadeIn = keyframes`
	0% {
		background: transparent;
	}
	100% {
		background: rgba(0, 0, 0, .7);
	}
`;
const fadeOut = keyframes`
	0% {
		background: rgba(0, 0, 0, .7);
	}
	100% {
		background: transparent;
	}
`;

const scaleUp = keyframes`
	0% {
		transform: scale(.8) translateY(1000px);
		opacity: 0;
	}
	100% {
		transform: scale(1) translateY(0);
		opacity: 1;
	}
`;

const scaleBack = keyframes`
	0% {
		transform: scale(1) translateY(0);
		opacity: 1;
	}
	100% {
		transform: scale(.8) translateY(1000px);
		opacity: 0;
	}
`;

const openSlideRightToLeft = keyframes`
  0%{
    width: 0;
  }
  100%{
    width: 100%;
  }
`;

const closeSlideRightToLeft = keyframes`
  0%{
    width: 100%;
  }
  100%{
    width: 0;
  }
`;

const Container = styled.div<animationProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  animation: ${(props) =>
    css`
      ${props.animation ? fadeOut : fadeIn} 0.5s
        cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    `};
`;

const ProjectDetailLayout = styled.div<animationProps>`
  width: 50%;
  height: 50%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: left;
  border: none;
  gap: 40px;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: white;
  z-index: 100;
  text-align: left;
  overflow-y: scroll;
  animation: ${(props) =>
    css`
      ${props.animation
        ? scaleBack
        : scaleUp} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards
    `};
`;

const FormLayout = styled.form`
  width: 100%;
  height: 100%;
  display: "flex";
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  font-weight: bold;
  margin: 0;
  font-size: 32px;
`;

const Subtitle = styled.h4`
  font-weight: 600;
  color: #888;
`;

const InputTypeLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 960px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }
`;

const InputType = styled.p`
  width: 160px;
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

const FlexLayout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 7px;
`;

const CreateRoomButton = styled.button`
  border: none;
  background-color: ${mainColor};
  color: white;
  font-size: 20px;
  font-weight: 500;
  padding: 10px 30px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${mainColorHover};
  }
`;

const Modal = (props: ModalProps) => {
  const [closeAnimation, setCloseAnimation] = useState(false);
  const [privateRoom, setPrivateRoom] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const setPassword = () => {
    if (privateRoom) {
      setPrivateRoom(false);
      console.log(passwordRef);
      if (passwordRef.current) {
        passwordRef.current.value = "";
        console.log(passwordRef.current.value);
      }
    } else {
      setPrivateRoom(true);
    }
  };

  useEffect(() => {
    if (closeAnimation) {
      setTimeout(() => props.close(), 500);
    }
  }, [closeAnimation]);

  useEffect(() => {
    const closeModal = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        setCloseAnimation(true);
      }
    };
    window.addEventListener("keydown", closeModal);

    return () => window.removeEventListener("keydown", closeModal);
  }, []);

  return (
    <Container animation={closeAnimation}>
      <ProjectDetailLayout animation={closeAnimation}>
        <Title>방 생성</Title>
        <FormLayout>
          <InputTypeLayout>
            <InputType>방 제목</InputType>
            <TextField />
          </InputTypeLayout>
          <InputTypeLayout>
            <InputType>닉네임</InputType>
            <TextField />
          </InputTypeLayout>
          <InputTypeLayout>
            <InputType>비밀번호</InputType>
            <FlexLayout>
              <Toggle click={setPassword} />
              <TextField ref={passwordRef} disabled={!privateRoom} />
            </FlexLayout>
          </InputTypeLayout>
        </FormLayout>
        <CreateRoomButton>생성하기</CreateRoomButton>
      </ProjectDetailLayout>
    </Container>
  );
};

export default Modal;
