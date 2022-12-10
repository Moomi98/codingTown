import styled from "styled-components";
import RoomDoor from "./RoomDoor";

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
  return (
    <Container>
      <RoomDoor title="Helloewqweqweqweqwweqwewqweqwe" />
      <RoomDoor title="Hello" />
      <RoomDoor title="Hello" />
      <RoomDoor title="Hello" />
      <RoomDoor title="Hello" />
      <RoomDoor title="Hello" />
      <RoomDoor title="Hello" />
      <RoomDoor title="Hello" />
      <RoomDoor title="Hello" />
      <RoomDoor title="Hello" />
      <RoomDoor title="Hello" />
      <RoomDoor title="Hello" />
      <RoomDoor title="Hello" />
      <RoomDoor title="Hello" />
      <RoomDoor title="Hello" />
      <RoomDoor title="Hello" />
    </Container>
  );
};

export default Lobby;
