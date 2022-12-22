import styled, { css, keyframes } from "styled-components";
import React, { useRef, useState } from "react";
import TextField from "../common/TextField";
import { colors } from "../../styles/variables";
import { useRouter } from "next/router";
import { paths } from "../../constants/paths";
import useEscEvent from "../../hooks/useEscEvent";
import useCloseAnimation from "../../hooks/useCloseAnimation";
import { enterRoomAPI } from "../../apis/http";

interface animationProps {
  animation: boolean;
}

interface roomInfoProps {
  roomName: string;
  roomCode: string;
  tags: Array<string>;
  isPrivate: boolean;
  password: string;
  currentUser: number;
  totalUser: number;
}

interface ModalProps {
  close: Function;
  roomInfo: roomInfoProps;
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
  height: 40%;
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
  width: 100%;
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

const ButtonLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ErrorMsg = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: red;
  text-align: center;
`;

const EnterRoomModal = (props: ModalProps) => {
  const [closeAnimation, setCloseAnimation] = useCloseAnimation(() =>
    props.close()
  );
  const backgroundRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [createButton, setCreateButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const escEvent = useEscEvent(() => setCloseAnimation(true));

  const getFormData = () => {
    if (!passwordRef.current) return false;
    if (!nickNameRef.current) return false;
    const nickName = nickNameRef.current.value;
    let password = "";
    if (props.roomInfo.isPrivate) {
      password = passwordRef.current.value;
    }

    return {
      nickName,
      password,
    };
  };

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (backgroundRef.current === e.target) setCloseAnimation(true);
  };

  const enterRoom = async () => {
    const roomData = getFormData();
    if (!roomData) return;

    const result = await enterRoomAPI(roomData);
    if (result.isSuccess) {
      localStorage.setItem("nickName", roomData.nickName);
      localStorage.setItem("roomCode", result.roomCode);
      router.push({
        pathname: paths.ROOM + `/${result.roomCode}`,
      });
    }
  };

  const canEnterRoom = () => {
    if (nickNameRef.current?.value.length === 0) {
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
        <Title>방 참가</Title>
        <FormLayout>
          <InputTypeLayout>
            <InputType>닉네임</InputType>
            <TextField ref={nickNameRef} change={canEnterRoom} />
          </InputTypeLayout>
          {props.roomInfo.isPrivate && (
            <InputTypeLayout>
              <InputType>비밀번호</InputType>
              <FlexLayout>
                <TextField ref={passwordRef} type="password" />
              </FlexLayout>
            </InputTypeLayout>
          )}
        </FormLayout>
        <ButtonLayout>
          {errorMessage.length > 0 && <ErrorMsg>{errorMessage}</ErrorMsg>}
          <CreateRoomButton
            ref={enterButtonRef}
            onClick={enterRoom}
            disabled={createButton}
          >
            참가하기
          </CreateRoomButton>
        </ButtonLayout>
      </ProjectDetailLayout>
    </Container>
  );
};

export default EnterRoomModal;
