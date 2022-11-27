import Header from "../components/header/Header";
import Lobby from "../components/lobby/Lobby";
const lobby = (): JSX.Element => {
  return (
    <div className="div">
      <Header />
      <Lobby />
    </div>
  );
};

export default lobby;
