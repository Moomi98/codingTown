import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import styled from "styled-components";

const CodeEditor = styled(AceEditor)`
  * {
    font-family: inherit;
  }
`;

const Whiteboard = () => {
  return (
    <CodeEditor
      mode="javascript"
      theme="monokai"
      name="UNIQUE_ID_OF_DIV"
      width="100%"
      height="100%"
      fontSize={14}
      editorProps={{ $blockScrolling: true }}
    ></CodeEditor>
  );
};

export default Whiteboard;
