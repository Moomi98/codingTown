import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { mediaStreamState } from "../../stores/stream";
import { getDevices, getUserMedia } from "../../utils/channel/channel";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SettingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.p`
  font-weight: bold;
  margin: 0;
  font-size: 20px;
`;

const MicSelect = styled.select`
  width: 100%;
  height: 30px;
`;
const MicSetting = () => {
  const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>([]);
  const [_, setMediaStream] = useRecoilState(mediaStreamState);

  const setMicDevices = async () => {
    const devices = await getDevices();
    const speakerOptions = devices?.filter(
      (device) => device.kind === "audiooutput"
    );
    setSpeakers([...speakerOptions]);
  };

  const changeSpeaker = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const speakerId = e.target.selectedOptions[0].value;
    setMediaStream(await getUserMedia(speakerId));
  };

  useEffect(() => {
    setMicDevices();
  }, []);

  return (
    <Container>
      <SettingContainer>
        <Title>스피커 선택</Title>
        <MicSelect onChange={changeSpeaker}>
          {speakers?.map((speaker) => (
            <option key={speaker.deviceId} value={speaker.deviceId}>
              {speaker.label}
            </option>
          ))}
        </MicSelect>
      </SettingContainer>
    </Container>
  );
};

export default MicSetting;
