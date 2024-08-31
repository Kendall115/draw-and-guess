import { useSelector } from "react-redux";
import CopyToClipboard from "../copy-to-clipboard/CopyToClipboard";
import "./GameInfo.css";

const GameInfo = ({ roomID }) => {
  const guessWord = useSelector((state) => state.gameSlice.guessWord);
  const isCurrentTurn = useSelector((state) => state.gameSlice.isCurrentTurn);
  const gameStatus = useSelector((state) => state.gameSlice.gameStatus);
  const userNameDrawing = useSelector(
    (state) => state.gameSlice.userNameDrawing
  );
  const timeLeft = useSelector((state) => state.gameSlice.timeLeft);

  return (
    <div className="game-info">
      <CopyToClipboard copyText={roomID} />
      {isCurrentTurn && <h3>Draw: {guessWord}</h3>}
      <h3>
        {gameStatus === "playing" && timeLeft > 0 && (
          <>
            <i className="fa-solid fa-clock"></i> {timeLeft} sec
          </>
        )}
      </h3>
      {userNameDrawing && (
        <h3>
          {isCurrentTurn
            ? "Your turn drawing"
            : `${userNameDrawing} is drawing`}
        </h3>
      )}
    </div>
  );
};

export default GameInfo;
