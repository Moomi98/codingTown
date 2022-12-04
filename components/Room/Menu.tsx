import styled from "styled-components";
import IconTextButton from "../common/IconTextButton";
import { AiFillSetting } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { videoMenu } from "../../constants/menus";
import { useState } from "react";
import { colors } from "../../styles/variables";
import { useRouter } from "next/router";
import { paths } from "../../constants/paths";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background-color: black;
  padding: 20px 30px;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LeaveRoomButton = styled.button`
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  background-color: red;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #d20000;
  }
`;

const Menu = () => {
  const [mic, setMic] = useState(false);
  const router = useRouter();

  const routeLobby = () => {
    router.push(paths.LOBBY);
  };

  return (
    <Container>
      <MenuContainer>
        <IconTextButton
          icon={<AiFillSetting size={35} color="white" />}
          content={videoMenu.SETTING}
        />
        {mic ? (
          <IconTextButton
            icon={<BsFillMicFill size={35} color={colors.green} />}
            content={videoMenu.MIC_ON}
            click={() => setMic((prevState) => (prevState = !prevState))}
          />
        ) : (
          <IconTextButton
            icon={<BsFillMicMuteFill size={35} color="white" />}
            content={videoMenu.MIC_OFF}
            click={() => setMic((prevState) => (prevState = !prevState))}
          />
        )}
      </MenuContainer>

      <IconTextButton
        icon={<FaChalkboardTeacher size={35} color="white" />}
        content={videoMenu.WHITE_BOARD}
      />
      <LeaveRoomButton onClick={routeLobby}>
        {videoMenu.LEAVE_ROOM}
      </LeaveRoomButton>
    </Container>
  );
};

export default Menu;
