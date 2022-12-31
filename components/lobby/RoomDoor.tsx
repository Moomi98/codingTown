import styled from "styled-components";
import { BiUser } from "react-icons/bi";
import Tag from "../common/Tag";
import { MouseEventHandler, useState } from "react";
import EnterRoomModal from "../modal/EnterRoomModal";
import { AiFillLock } from "react-icons/ai";
import { colors } from "../../styles/variables";

interface roomDoorInfo {
  roomName: string;
  roomCode: string;
  tags: Array<string>;
  isPrivate: boolean;
  password: string;
  currentUser: number;
  totalUser: number;
}

interface roomDoorProps {
  roomInfo: roomDoorInfo;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

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

  @media screen and (max-width: 1280px) {
    width: 32%;
  }

  @media screen and (max-width: 720px) {
    width: 49%;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
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
  gap: 10px;
  width: 100%;
`;

const GrayText = styled.p`
  font-size: 16px;
  color: #aaa;
`;

const RoomDoor = (props: roomDoorProps) => {
  const [enterRoom, setEnterRoom] = useState<boolean>(false);

  return (
    <Container onClick={() => setEnterRoom(true)}>
      <TitleLayout>
        <Title>{props.roomInfo.roomName}</Title>
        <TagContainer>
          {props.roomInfo.tags.map((tag, index) => (
            <Tag key={index} content={tag} />
          ))}
        </TagContainer>
      </TitleLayout>
      <InfoLayout>
        <UserLayout>
          {props.roomInfo.isPrivate && (
            <AiFillLock size={25} color={colors.mainHover} />
          )}
          <BiUser size={30} color="#aaa" />
          <GrayText>
            {props.roomInfo.currentUser}/{props.roomInfo.totalUser}
          </GrayText>
        </UserLayout>
      </InfoLayout>
      {enterRoom && (
        <EnterRoomModal
          close={() => setEnterRoom(false)}
          roomInfo={props.roomInfo}
        />
      )}
    </Container>
  );
};

export default RoomDoor;
