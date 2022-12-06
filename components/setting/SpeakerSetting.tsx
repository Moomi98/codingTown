import styled from "styled-components";

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

const SpeakerSetting = () => {
  return (
    <Container>
      <SettingContainer>
        <Title>스피커 선택</Title>
      </SettingContainer>
    </Container>
  );
};

export default SpeakerSetting;
