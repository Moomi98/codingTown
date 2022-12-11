import styled from "styled-components";
import { colors } from "../../styles/variables";

interface tagProps {
  content: string;
}

const Container = styled.div`
  background-color: #f2f2f2;
  color: ${colors.gray};
  border-radius: 5px;
  padding: 5px 10px;
  max-width: 100px;
  max-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Tag = ({ content }: tagProps) => {
  return <Container>#{content}</Container>;
};

export default Tag;
