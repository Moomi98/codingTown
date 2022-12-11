import { useRecoilState } from "recoil";
import styled from "styled-components";
import { whiteboard } from "../../constants/whiteboard";
import { languageState, themeState } from "../../stores/whiteboard";

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
  const [theme, setTheme] = useRecoilState(themeState);
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.selectedOptions[0].value;
    console.log(selectedLanguage);
    setLanguage(selectedLanguage);
  };

  const changeTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.selectedOptions[0].value;
    setTheme(selectedTheme);
  };
  return (
    <Container>
      <MenuTypes>언어</MenuTypes>
      <Select onChange={changeLanguage}>
        {whiteboard.languages.map((language: string) => (
          <option key={language} value={whiteboard.language_mapping[language]}>
            {language}
          </option>
        ))}
      </Select>
      <MenuTypes>테마</MenuTypes>
      <Select onChange={changeTheme}>
        {whiteboard.themes.map((theme: string) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </Select>
    </Container>
  );
};
export default Menu;
