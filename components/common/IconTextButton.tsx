import styled from "styled-components";
import { MouseEventHandler, ReactNode } from "react";

interface iconTextButtonProps {
  icon: ReactNode;
  content: string;
  click?: MouseEventHandler<HTMLButtonElement>;
}

const Container = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const Content = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: white;
  text-align: center;
  margin-bottom: 0;
`;
const IconTextButton = (props: iconTextButtonProps) => {
  return (
    <Container onClick={props.click}>
      {props.icon}
      <Content>{props.content}</Content>
    </Container>
  );
};

export default IconTextButton;
