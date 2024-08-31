import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { setAuthSocket } from "../../store/slices/socketSlice";
import { useNavigate } from "react-router-dom";
import { newGame } from "../../store/slices/gameSlice";
import { clear } from "../../store/slices/linesSlice";

import DrawingBoard from "../drawing-board/DrawingBoard";
import Toolbox from "../toolbox/Toolbox";
import Chat from "../chat/Chat";
import WaitingGame from "../WaitingGame/WaitingGame";

import "./GameScreen.css";
import GameInfo from "../game-info/GameInfo";
import Countdown from "../countdown/Countdown";

const GameScreen = () => {
  const [strokeColor, setStrokeColor] = useState("#FF5733");
  const dispatch = useDispatch();
  const { roomID, userName } = useParams();
  const gameStatus = useSelector((state) => state.gameSlice.gameStatus);
  const isHost = useSelector((state) => state.gameSlice.isHost);
  const guessword = useSelector((state) => state.gameSlice.guessWord);
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    dispatch(newGame());
    dispatch(clear());
    socket.emit("play again");
  };

  useEffect(() => {
    if (socket) return;

    dispatch(setAuthSocket({ userName, roomID }));
    socket.emit("join room", roomID, (success) => {
      if (!success) navigate("/not-found");
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="column-1 rounded-corners">
          <GameInfo roomID={roomID} />
          {gameStatus === "finished" && (
            <h3 className="guess-word">The word was: {guessword}</h3>
          )}
          {(gameStatus === "playing" || gameStatus === "finished") && (
            <DrawingBoard strokeColor={strokeColor} />
          )}
          {gameStatus === "waiting" && <WaitingGame />}
          {gameStatus === "countdown" && <Countdown />}
        </div>
        <div className="column-2 rounded-corners">
          <Chat />
        </div>
      </div>
      <div className="toolbox">
        {gameStatus === "playing" && (
          <Toolbox strokeColor={strokeColor} setStrokeColor={setStrokeColor} />
        )}
        {gameStatus === "finished" && isHost && (
          <div className="play-again-container">
            <button className="play-again-button" onClick={handlePlayAgain}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default GameScreen;
