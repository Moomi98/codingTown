import styled from "styled-components";
import { mainColor, disabledColor } from "../../styles/variables";
const Container = styled.input`
  width: 100%;
  height: 50px;
  padding: 8px 5px;
  font-size: 18px;
  border-radius: 5px;
  border: 2px solid ${disabledColor};
  outline: none;
  transition: all 0.2s;
  &:focus {
    border: 2px solid ${mainColor};
  }
`;

const TextField = () => {
  return <Container />;
};

export default TextField;
