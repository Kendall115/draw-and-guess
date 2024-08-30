import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountdown,
  gamePlaying,
  gameCountdown,
} from "../../store/reducers/gameSlice";
import "./WaitingGame.css";
import { socket } from "../../socket";

const WaitingGame = () => {
  const countdown = useSelector((state) => state.gameSlice.countdown);
  const isHost = useSelector((state) => state.gameSlice.isHost);
  const gameStatus = useSelector((state) => state.gameSlice.gameStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (gameStatus === "countdown" && countdown > 0) {
      const countdownTimer = setInterval(() => {
        dispatch(setCountdown(countdown - 1));

        if (countdown === 1) {
          if (isHost) socket.emit("start game");
          clearInterval(countdownTimer);
          dispatch(gamePlaying());
        }
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [gameStatus, countdown]);

  const handleStartButtonClick = () => {
    if (gameStatus === "waiting") {
      socket.emit("start countdown");
      dispatch(gameCountdown());
    }
  };

  return (
    <div className="waiting-game">
      {gameStatus === "waiting" && (
        <div className="waiting-container">
          <h2>Waiting for the game to start...</h2>
          <div className="spinner"></div>
          {isHost && (
            <button className="start-button" onClick={handleStartButtonClick}>
              Start Game
            </button>
          )}
        </div>
      )}
      {gameStatus === "countdown" && (
        <div>
          <h2>Game is starting in {countdown} seconds...</h2>
        </div>
      )}
    </div>
  );
};

export default WaitingGame;
