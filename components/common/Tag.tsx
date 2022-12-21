import styled from "styled-components";
import { colors } from "../../styles/variables";

interface tagProps {
  content: string;
}

const Container = styled.div`
  font-size: 16px;
  font-weight: 500;
  background-color: #f2f2f2;
  color: ${colors.gray};
  border-radius: 5px;
  padding: 5px 10px;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
`;

const Tag = ({ content }: tagProps) => {
  return <Container>#&nbsp;{content}</Container>;
};

export default Tag;
