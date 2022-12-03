import styled from "styled-components";
import IconTextButton from "../common/IconTextButton";
import { AiFillSetting } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { videoMenu } from "../../constants/menus";

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
  return (
    <Container>
      <IconTextButton
        icon={<AiFillSetting size={35} color="white" />}
        content={videoMenu.SETTING}
      />
      <IconTextButton
        icon={<FaChalkboardTeacher size={35} color="white" />}
        content={videoMenu.WHITE_BOARD}
      />
      <LeaveRoomButton>{videoMenu.LEAVE_ROOM}</LeaveRoomButton>
    </Container>
  );
};

export default Menu;
