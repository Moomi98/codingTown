import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-dart";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-swift";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-terminal";
import styled from "styled-components";
import Menu from "./Menu";
import { useRecoilState, useRecoilValue } from "recoil";
import { codeState, languageState, themeState } from "../../stores/whiteboard";
import "ace-builds/src-noconflict/ext-language_tools";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CodeEditor = styled(AceEditor)`
  * {
    font-family: inherit;
  }
`;

const Whiteboard = () => {
  const selectedLanguage = useRecoilValue(languageState);
  const selectedTheme = useRecoilValue(themeState);
  const [code, setCode] = useRecoilState(codeState);

  return (
    <Container>
      <CodeEditor
        mode={selectedLanguage}
        theme={selectedTheme}
        name="UNIQUE_ID_OF_DIV"
        width="100%"
        height="100%"
        fontSize={14}
        value={code}
        editorProps={{ $blockScrolling: true }}
        onChange={(value: string) => setCode(value)}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
        }}
      />
      <Menu />
    </Container>
  );
};

export default Whiteboard;
