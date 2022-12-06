import styled, { keyframes, css } from "styled-components";
import useCloseAnimation from "../../hooks/useCloseAnimation";
import useEscEvent from "../../hooks/useEscEvent";
import { colors } from "../../styles/variables";
import { BsFillMicFill, BsHeadphones } from "react-icons/bs";
import { useState } from "react";
import MicSetting from "./MicSetting";
import SpeakerSetting from "./SpeakerSetting";

interface animationProps {
  animation: boolean;
}

interface SettingProps {
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

const Background = styled.div<animationProps>`
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

const Container = styled.div<animationProps>`
  width: 50%;
  height: 50%;
  padding: 20px;
  display: flex;
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

const SettingMenuList = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border-right: 1px solid ${colors.lightGray};
  padding: 10px 10px 10px 0;
`;

const SettingMenu = styled.button`
  width: 100%;
  height: 10%;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border: none;
  transition: all 0.2s;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #f6f6f6;
  }
  &:active,
  &:focus {
    box-shadow: ${colors.main} 0px 0px 2px 1px;
  }
`;

const Title = styled.p`
  font-weight: 500;
  margin: 0;
  font-size: 16px;
  color: ${colors.gray};
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

export const Setting = (props: SettingProps) => {
  const settingPages: any = {
    mic: <MicSetting />,
    speaker: <SpeakerSetting />,
  };

  const [closeAnimation, setCloseAnimation] = useCloseAnimation(() =>
    props.close()
  );
  const escEvent = useEscEvent(() => setCloseAnimation(true));
  const [currentSettingPage, setCurrentSettingPage] = useState<string>("mic");
  return (
    <Background animation={closeAnimation}>
      <Container animation={closeAnimation}>
        <SettingMenuList>
          <SettingMenu onClick={() => setCurrentSettingPage("mic")}>
            <BsFillMicFill size={25} color={colors.green} />
            <Title>마이크</Title>
          </SettingMenu>
          <SettingMenu onClick={() => setCurrentSettingPage("speaker")}>
            <BsHeadphones size={25} color={colors.lightBlue} />
            <Title>스피커</Title>
          </SettingMenu>
        </SettingMenuList>
        {settingPages[currentSettingPage]}
      </Container>
    </Background>
  );
};

export default Setting;
