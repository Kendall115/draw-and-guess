import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCountdown,
  setIsGameStarted,
  setIsWaiting,
} from "../../store/reducers/gameSlice";
import "./WaitingGame.css";
import { socket } from "../../socket";

const WaitingGame = () => {
  const countdown = useSelector((state) => state.gameSlice.countdown);
  const isHost = useSelector((state) => state.gameSlice.isHost);
  const isWaiting = useSelector((state) => state.gameSlice.isWaiting);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isWaiting && countdown > 0) {
      const countdownTimer = setInterval(() => {
        dispatch(setCountdown(countdown - 1));

        if (countdown === 1) {
          if (isHost) socket.emit("start game");
          clearInterval(countdownTimer);
          dispatch(setIsGameStarted(true));
        }
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [isWaiting, countdown]);

  const handleStartButtonClick = () => {
    if (isWaiting) {
      socket.emit("start countdown");
      dispatch(setIsWaiting(false));
    }
  };

  return (
    <div className="waiting-game">
      {isWaiting ? (
        <div className="waiting-container">
          <h2>Waiting for the game to start...</h2>
          <div className="spinner"></div>
          {isHost && (
            <button className="start-button" onClick={handleStartButtonClick}>
              Start Game
            </button>
          )}
        </div>
      ) : (
        <div>
          <h2>Game is starting in {countdown} seconds...</h2>
        </div>
      )}
    </div>
  );
};

export default WaitingGame;
