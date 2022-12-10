import { useRecoilState } from "recoil";
import styled from "styled-components";
import { whiteboard } from "../../constants/whiteboard";
import { languageState } from "../../stores/whiteboard";

const Container = styled.aside`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  bottom: 4.8%;
  right: 1.5%;
  width: 15%;
  height: 90%;
  padding: 15px;
  border-radius: 10px;
  background-color: #494949;
  box-shadow: rgba(35, 35, 35, 0.3) 0px 3px 3px 5px;
`;

const MenuTypes = styled.p`
  font-weight: 500;
  color: white;
`;

const Select = styled.select`
  width: 100%;
  height: 30px;
`;

const Menu = () => {
  const [language, setLanguage] = useRecoilState(languageState);
  const changeLanguage = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.selectedOptions[0].value;
    console.log(selectedLanguage);
    setLanguage(selectedLanguage);
  };
  return (
    <Container>
      <MenuTypes>언어</MenuTypes>
      <Select onChange={changeLanguage}>
        {whiteboard.languages.map((language: string) => (
          <option key={language} value={whiteboard.mapping[language]}>
            {language}
          </option>
        ))}
      </Select>
    </Container>
  );
};
export default Menu;
