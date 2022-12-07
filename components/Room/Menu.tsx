import styled from "styled-components";
import IconTextButton from "../common/IconTextButton";
import { AiFillSetting } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { videoMenu } from "../../constants/menus";
import { useEffect, useState } from "react";
import { colors } from "../../styles/variables";
import { useRouter } from "next/router";
import { paths } from "../../constants/paths";
import { getDevices } from "../../utils/channel/channel";
import Setting from "../setting/Setting";

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
  const [micStream, setMicStream] = useState<MediaDeviceInfo[] | null>(null);
  const [settingModal, setSettingModal] = useState(false);
  const router = useRouter();
  const iconSize = 30;
  const routeLobby = () => {
    router.push(paths.LOBBY);
  };

  const closeSettingModal = () => {
    setSettingModal(false);
  };

  const getMicStream = async () => {
    setMicStream(await getDevices());
  };

  const setMic = () => {
    // const audioTracks = micStream!.getAudioTracks();
    // console.log(audioTracks);
    // setIsMicOn((state) => (state = !state));
    // audioTracks.forEach(
    //   (audioTrack) => (audioTrack.enabled = !audioTrack.enabled)
    // );
  };

  useEffect(() => {
    getMicStream();
  }, []);

  return (
    <Container>
      <MenuContainer>
        <IconTextButton
          click={() => setSettingModal(true)}
          icon={<AiFillSetting size={iconSize} color="white" />}
          content={videoMenu.SETTING}
        />
        {isMicOn ? (
          <IconTextButton
            icon={<BsFillMicFill size={iconSize} color={colors.lightGreen} />}
            content={videoMenu.MIC_ON}
            click={setMic}
          />
        ) : (
          <IconTextButton
            icon={<BsFillMicMuteFill size={iconSize} color="white" />}
            content={videoMenu.MIC_OFF}
            click={setMic}
          />
        )}
      </MenuContainer>

      <IconTextButton
        icon={<FaChalkboardTeacher size={iconSize} color="white" />}
        content={videoMenu.WHITE_BOARD}
      />
      <LeaveRoomButton onClick={routeLobby}>
        {videoMenu.LEAVE_ROOM}
      </LeaveRoomButton>
      {settingModal && <Setting close={closeSettingModal} />}
    </Container>
  );
};

export default Menu;
