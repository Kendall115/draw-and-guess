import { useDispatch, useSelector } from "react-redux";
import { gameCountdown } from "../../store/slices/gameSlice";
import { socket } from "../../socket";
import "./WaitingGame.css";

const WaitingGame = () => {
  const isHost = useSelector((state) => state.gameSlice.isHost);
  const dispatch = useDispatch();

  const handleStartButtonClick = () => {
    socket.emit("start countdown");
    dispatch(gameCountdown());
  };

  return (
    <div className="flex-center">
      <div className="waiting-container">
        <h2>Waiting for the game to start...</h2>
        <div className="spinner"></div>
        {isHost && (
          <button className="start-button" onClick={handleStartButtonClick}>
            Start Game
          </button>
        )}
      </div>
    </div>
  );
};

export default WaitingGame;
