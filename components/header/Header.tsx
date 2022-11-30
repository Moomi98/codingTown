import styled from "styled-components";
import { FaCode } from "react-icons/fa";
import { mainColor, mainColorHover } from "../../styles/variables";

const Container = styled.header`
  position: fixed;
  width: 100%;
  height: 70px;
  z-index: 10;
  background-color: white;
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
`;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 100%;
  margin: 0 auto;
`;

const LogoLayout = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const LogoName = styled.p`
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CreateRoomButton = styled.button`
  border: none;
  background-color: ${mainColor};
  color: white;
  font-size: 20px;
  font-weight: 500;
  padding: 10px 30px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${mainColorHover};
  }
`;

const Header = (): JSX.Element => {
  return (
    <Container>
      <HeaderLayout>
        <LogoLayout>
          <FaCode size={30} />
          <LogoName>Coding Town</LogoName>
        </LogoLayout>
        <CreateRoomButton>방 생성</CreateRoomButton>
      </HeaderLayout>
    </Container>
  );
};
export default Header;
