import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { paths } from "../../constants/paths";
const Contaier = styled.div`
  width: 100%;
  height: 100%;
`;

const MainImageContainer = styled.div`
  position: relative;
  height: 100%;
  z-index: 1;
  width: 100%;
  background: #fd7544; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #00223e,
    #fd7544
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #00223e,
    #fd7544
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const GradientBackground = styled.div`
  width: 100%;
  height: 100%;
  background: #fd7544; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    black,
    30%,
    white
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(black, 30%, white);
`;
const ImageWrapper = styled.div`
  position: absolute;
  display: block;
  width: 100%;
  bottom: -7px;
  left: 0;
`;

const Title = styled.p`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  font-weight: bold;
  color: white;
`;

const Subtitle = styled.p`
  position: absolute;
  top: 26%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: 500;
  color: #e4e4e4;
`;

const StartButton = styled(Link)`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;
  background-color: #d1a142;
  color: white;
  font-size: 20px;
  font-weight: 500;
  padding: 10px 30px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #b88d38;
  }
`;

const Home = () => {
  return (
    <Contaier>
      <MainImageContainer>
        <ImageWrapper>
          <Image
            src={"/images/paris.svg"}
            alt="home"
            layout="responsive"
            width={100}
            height={100}
          />
        </ImageWrapper>
        <Title>Coding Town</Title>
        <Subtitle>우리가 만드는 코딩 세상</Subtitle>
        <StartButton href={paths.LOBBY}>시작하기</StartButton>
      </MainImageContainer>
      <GradientBackground />
    </Contaier>
  );
};

export default Home;
