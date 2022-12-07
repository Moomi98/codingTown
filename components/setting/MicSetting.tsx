import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { desktopStreamState, mediaStreamState } from "../../stores/stream";
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
  const [mics, setMics] = useState<MediaDeviceInfo[]>([]);
  const [_, setMediaStream] = useRecoilState(mediaStreamState);

  const setMicDevices = async () => {
    const devices = await getDevices();
    const micOptions = devices?.filter(
      (device) => device.kind === "audioinput"
    );
    setMics([...micOptions]);
  };

  const changeMic = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const micId = e.target.selectedOptions[0].value;
    setMediaStream(await getUserMedia(micId));
  };

  useEffect(() => {
    setMicDevices();
  }, []);

  return (
    <Container>
      <SettingContainer>
        <Title>마이크 선택</Title>
        <MicSelect onChange={changeMic}>
          {mics?.map((mic) => (
            <option key={mic.deviceId} value={mic.deviceId}>
              {mic.label}
            </option>
          ))}
        </MicSelect>
      </SettingContainer>
    </Container>
  );
};

export default MicSetting;
