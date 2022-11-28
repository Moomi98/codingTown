import styled from "styled-components";
import Menu from "./Menu";
import Video from "./Video";

const Container = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  margin: 0 auto;
  position: relative;
  top: 70px;
  padding-top: 30px;
`;

const Channel = (): JSX.Element => {
  return (
    <Container>
      <Video />
      <Menu />
    </Container>
  );
};

export default Channel;
