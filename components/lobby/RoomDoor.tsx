import styled from "styled-components";
import { BiUser } from "react-icons/bi";
import Tag from "../common/Tag";

const Container = styled.section`
  width: 23.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  height: 240px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: rgb(4 17 29 / 25%) 0px 0px 3px 0px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: rgb(4 17 29 / 25%) 0px 0px 8px 0px;
  }
`;

const Title = styled.p`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const TitleLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
`;

const TagContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
`;

const UserLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const GrayText = styled.p`
  font-size: 16px;
  color: #aaa;
`;

interface roomdoorProps {
  title: string;
}

const RoomDoor = (props: roomdoorProps) => {
  return (
    <Container>
      <TitleLayout>
        <Title>{props.title}</Title>
        <TagContainer>
          <Tag content={"java"} />
          <Tag content={"javadddddd"} />
          <Tag content={"java"} />
        </TagContainer>
      </TitleLayout>
      <InfoLayout>
        <UserLayout>
          <BiUser size={30} color="#aaa" />
          <GrayText>20/20</GrayText>
        </UserLayout>
      </InfoLayout>
    </Container>
  );
};

export default RoomDoor;
