import styled from "styled-components";
import { ReactNode } from "react";

interface iconTextButtonProps {
  icon: ReactNode;
  content: string;
}

const Container = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border: none;
`;
const Content = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: white;
  text-align: center;
`;
const IconTextButton = (props: iconTextButtonProps) => {
  return (
    <Container>
      {props.icon}
      <Content>{props.content}</Content>
    </Container>
  );
};

export default IconTextButton;
