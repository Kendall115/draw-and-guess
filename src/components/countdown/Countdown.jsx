import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCountdown, gamePlaying } from "../../store/slices/gameSlice";
import { socket } from "../../socket";

const Countdown = () => {
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

  return (
    <div className="flex-center">
      <h2>Game is starting in {countdown} seconds...</h2>
    </div>
  );
};

export default Countdown;
