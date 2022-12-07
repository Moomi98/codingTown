import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { desktopStreamState, mediaStreamState } from "../../stores/stream";
import { getDevices } from "../../utils/channel/channel";

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
  const setMicDevices = async () => {
    const devices = await getDevices();
    const micOptions = devices?.filter(
      (device) => device.kind === "audioinput"
    );
    setMics([...micOptions]);
  };

  useEffect(() => {
    setMicDevices();
  }, []);

  return (
    <Container>
      <SettingContainer>
        <Title>마이크 선택</Title>
        <MicSelect>
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
