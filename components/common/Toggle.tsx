import styled, { css } from "styled-components";
import { useState } from "react";
import { colors } from "../../styles/variables";

interface toggleStyledProps {
  toggle: boolean;
}

interface toggleProps {
  click?: Function;
}
const ToggleBtn = styled.button<toggleStyledProps>`
  width: 80px;
  height: 30px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (!props.toggle ? "none" : colors.main)};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;
const Circle = styled.div<toggleStyledProps>`
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 3px 0px;
  left: 0%;
  transition: all 0.2s ease-in-out;
  ${(props) =>
    props.toggle &&
    css`
      transform: translate(43px, 0);
      transition: all 0.2s ease-in-out;
    `}
`;

const Toggle = (props: toggleProps) => {
  const [toggle, setToggle] = useState(false);
  const clickedToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    setToggle((prev) => !prev);
    if (props.click) {
      props.click();
    }
  };
  return (
    <ToggleBtn onClick={clickedToggle} toggle={toggle}>
      <Circle toggle={toggle} />
    </ToggleBtn>
  );
};

export default Toggle;
