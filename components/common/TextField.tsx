import { forwardRef } from "react";
import styled from "styled-components";
import { mainColor, disabledColor } from "../../styles/variables";

interface textFieldProps {
  disabled?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
}

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
  &:disabled {
    background-color: #eee;
  }
`;

const TextField = forwardRef<HTMLInputElement, textFieldProps>((props, ref) => {
  return <Container ref={ref} disabled={props.disabled} />;
});

export default TextField;
