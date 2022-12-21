import { useEffect, useState } from "react";
import styled from "styled-components";
import { getRoomDoorsAPI } from "../../apis/http";
import RoomDoor from "./RoomDoor";

interface roomDoorInfo {
  roomName: string;
  roomCode: string;
  tags: Array<string>;
  isPrivate: boolean;
  password: string;
  currentUser: number;
  totalUser: number;
}

const Container = styled.div`
  width: 90%;
  height: calc(100% - 70px);
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
  gap: 2%;
  top: 70px;
  padding-top: 30px;
`;

const Lobby = () => {
  const [roomDoorInfos, setRoomDoorInfos] = useState<Array<roomDoorInfo>>([]);
  const setRoomDoors = async () => {
    const result = await getRoomDoorsAPI();
    setRoomDoorInfos(result);
    console.log(result);
  };

  useEffect(() => {
    setRoomDoors();
  }, []);

  return (
    <Container>
      {roomDoorInfos.map((roomDoorInfo) => (
        <RoomDoor roomInfo={roomDoorInfo} />
      ))}
    </Container>
  );
};

export default Lobby;
