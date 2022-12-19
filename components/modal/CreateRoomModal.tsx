import styled, { css, keyframes } from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import TextField from "../common/TextField";
import Toggle from "../common/Toggle";
import { colors } from "../../styles/variables";
import { useRouter } from "next/router";
import { paths } from "../../constants/paths";
import useEscEvent from "../../hooks/useEscEvent";
import useCloseAnimation from "../../hooks/useCloseAnimation";
import { createRoomAPI } from "../../apis/http";

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
  background-color: ${colors.main};
  color: white;
  font-size: 20px;
  font-weight: 500;
  padding: 10px 30px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.mainHover};
  }
  &:disabled {
    background-color: ${colors.disabled};
    cursor: not-allowed;
  }
`;

const Modal = (props: ModalProps) => {
  const [closeAnimation, setCloseAnimation] = useCloseAnimation(() =>
    props.close()
  );
  const [privateRoom, setPrivateRoom] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const roomNameRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const createButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [createButton, setCreateButton] = useState(true);
  const escEvent = useEscEvent(() => setCloseAnimation(true));

  const getFormData = () => {
    if (!roomNameRef.current) return false;
    if (!passwordRef.current) return false;
    if (!nickNameRef.current) return false;
    const roomName = roomNameRef.current.value;
    const nickName = nickNameRef.current.value;
    let password = "";
    if (privateRoom) {
      password = passwordRef.current.value;
    }

    return {
      roomName,
      nickName,
      password,
    };
  };

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (backgroundRef.current === e.target) setCloseAnimation(true);
  };

  const createRoom = async () => {
    const roomData = getFormData();
    if (!roomData) return;

    const result = await createRoomAPI(roomData);
    localStorage.setItem("nickName", roomData.nickName);
    localStorage.setItem("roomCode", result.roomCode);
    router.push({
      pathname: paths.ROOM + `/${result.roomCode}`,
    });
  };

  const setPassword = () => {
    if (privateRoom) {
      setPrivateRoom(false);
      if (passwordRef.current) {
        passwordRef.current.value = "";
      }
    } else {
      setPrivateRoom(true);
    }
  };

  const canCreateRoom = () => {
    if (
      roomNameRef.current?.value.length === 0 ||
      nickNameRef.current?.value.length === 0
    ) {
      setCreateButton(true);
    } else {
      setCreateButton(false);
    }
  };

  return (
    <Container
      animation={closeAnimation}
      onClick={closeModal}
      ref={backgroundRef}
    >
      <ProjectDetailLayout animation={closeAnimation}>
        <Title>방 생성</Title>
        <FormLayout>
          <InputTypeLayout>
            <InputType>방 제목</InputType>
            <TextField ref={roomNameRef} change={canCreateRoom} />
          </InputTypeLayout>
          <InputTypeLayout>
            <InputType>닉네임</InputType>
            <TextField ref={nickNameRef} change={canCreateRoom} />
          </InputTypeLayout>
          <InputTypeLayout>
            <InputType>비밀번호</InputType>
            <FlexLayout>
              <Toggle click={setPassword} />
              <TextField ref={passwordRef} disabled={!privateRoom} />
            </FlexLayout>
          </InputTypeLayout>
        </FormLayout>
        <CreateRoomButton
          ref={createButtonRef}
          onClick={createRoom}
          disabled={createButton}
        >
          생성하기
        </CreateRoomButton>
      </ProjectDetailLayout>
    </Container>
  );
};

export default Modal;
