import styled from "styled-components";
import { FaCode } from "react-icons/fa";
import { colors } from "../../styles/variables";
import { useState } from "react";
import CreateRoomModal from "../modal/CreateRoomModal";
import { useRouter } from "next/router";
import SearchBar from "../common/Searchbar";
import { MdMeetingRoom } from "react-icons/md";

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
  @media screen and (max-width: "600px") {
  }
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
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const CreateRoomButtonWithText = styled.button`
  border: none;
  background-color: ${colors.main};
  color: white;
  font-size: 20px;
  font-weight: 500;
  padding: 10px 30px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.mainHover};
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const CreateRoomButtonWithIcon = styled(MdMeetingRoom)`
  width: 15%;
  border: none;
  background-color: ${colors.main};
  color: white;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 7px;

  &:hover {
    background-color: ${colors.mainHover};
  }
  @media screen and (min-width: 600px) {
    display: none;
  }
`;

const Header = (): JSX.Element => {
  const [createRoomModal, setCreateRoomModal] = useState(false);
  const router = useRouter();

  const routeLobby = () => {
    router.push("/lobby");
  };

  return (
    <Container>
      <HeaderLayout>
        <LogoLayout onClick={routeLobby}>
          <FaCode size={30} />
          <LogoName>Coding Town</LogoName>
        </LogoLayout>
        <SearchBar />
        <CreateRoomButtonWithText onClick={() => setCreateRoomModal(true)}>
          방 생성
        </CreateRoomButtonWithText>
        <CreateRoomButtonWithIcon
          size={45}
          onClick={() => setCreateRoomModal(true)}
        />
      </HeaderLayout>
      {createRoomModal && (
        <CreateRoomModal close={() => setCreateRoomModal(false)} />
      )}
    </Container>
  );
};
export default Header;
