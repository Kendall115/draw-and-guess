import { useSelector } from "react-redux";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import "./GameInfo.css";

const GameInfo = ({ roomID }) => {
  const guessWord = useSelector((state) => state.gameSlice.guessWord);
  const isCurrentTurn = useSelector((state) => state.gameSlice.isCurrentTurn);
  const isGameStarted = useSelector((state) => state.gameSlice.isGameStarted);
  const userNameDrawing = useSelector(
    (state) => state.gameSlice.userNameDrawing
  );
  const timeLeft = useSelector((state) => state.gameSlice.timeLeft);

  return (
    <div className="game-info">
      <CopyToClipboard copyText={roomID} />
      {isCurrentTurn && <h3>Draw: {guessWord}</h3>}
      <h3>
        {isGameStarted && timeLeft > -1 && (
          <>
            <i className="fa-solid fa-clock"></i> {timeLeft} sec
          </>
        )}
      </h3>
      {userNameDrawing && <h3>{userNameDrawing} is drawing</h3>}
    </div>
  );
};

export default GameInfo;