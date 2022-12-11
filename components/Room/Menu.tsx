import styled from "styled-components";
import IconTextButton from "../common/IconTextButton";
import { AiFillSetting } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsFillMicFill } from "react-icons/bs";
import { videoMenu } from "../../constants/menus";
import { useEffect, useState } from "react";
import { colors } from "../../styles/variables";
import { useRouter } from "next/router";
import { paths } from "../../constants/paths";
import { getUserMedia } from "../../utils/channel/channel";
import Setting from "../setting/Setting";
import { useRecoilState } from "recoil";
import { whiteboardState } from "../../stores/whiteboard";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 8%;
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
  const [isMicOn, setIsMicOn] = useState(true);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [settingModal, setSettingModal] = useState(false);
  const [whiteboard, setWhiteboard] = useRecoilState(whiteboardState);
  const router = useRouter();
  const iconSize = 30;
  const routeLobby = () => {
    router.push(paths.LOBBY);
  };

  const closeSettingModal = () => {
    setSettingModal(false);
  };

  const getMicStream = async () => {
    setMicStream(await getUserMedia());
  };

  const setMic = () => {
    const audioTracks = micStream!.getAudioTracks();
    setIsMicOn((state) => (state = !state));
    audioTracks.forEach(
      (audioTrack) => (audioTrack.enabled = !audioTrack.enabled)
    );
  };

  const showWhiteBoard = () => {
    setWhiteboard(whiteboard ? false : true);
  };

  useEffect(() => {
    getMicStream();
  }, []);

  return (
    <Container>
      <MenuContainer>
        <IconTextButton
          click={closeSettingModal}
          icon={<AiFillSetting size={iconSize} color="white" />}
          content={videoMenu.SETTING}
        />

        <IconTextButton
          icon={
            <BsFillMicFill
              size={iconSize}
              color={isMicOn ? colors.lightGreen : "white"}
            />
          }
          content={isMicOn ? videoMenu.MIC_ON : videoMenu.MIC_OFF}
          click={setMic}
        />
      </MenuContainer>
      <IconTextButton
        icon={
          <FaChalkboardTeacher
            size={iconSize}
            color={isMicOn ? colors.lightGreen : "white"}
          />
        }
        content={videoMenu.WHITE_BOARD}
        click={showWhiteBoard}
      />

      <LeaveRoomButton onClick={routeLobby}>
        {videoMenu.LEAVE_ROOM}
      </LeaveRoomButton>
      {settingModal && <Setting close={closeSettingModal} />}
    </Container>
  );
};

export default Menu;
