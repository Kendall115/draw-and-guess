import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { setAuthSocket } from "../../store/reducers/socketSlice";
import { useNavigate } from "react-router-dom";
import { restartStates } from "../../store/reducers/gameSlice";
import { clear } from "../../store/reducers/linesReducer";

import DrawingBoard from "../drawing-board/DrawingBoard";
import Toolbox from "../toolbox/Toolbox";
import Chat from "../chat/Chat";
import WaitingGame from "../WaitingGame/WaitingGame";

import "./GameScreen.css";
import GameInfo from "../game-info/GameInfo";

const GameScreen = () => {
  const [strokeColor, setStrokeColor] = useState("#FF5733");
  const dispatch = useDispatch();
  const { roomID, userName } = useParams();
  const isGameStarted = useSelector((state) => state.gameSlice.isGameStarted);
  const timeLeft = useSelector((state) => state.gameSlice.timeLeft);
  const isCurrentTurn = useSelector((state) => state.gameSlice.isCurrentTurn);
  const isHost = useSelector((state) => state.gameSlice.isHost);
  const guessword = useSelector((state) => state.gameSlice.guessWord);
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    dispatch(restartStates());
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
          {timeLeft === 0 && !isCurrentTurn && (
            <h3 className="guess-word">The word is: {guessword}</h3>
          )}
          {isGameStarted && <DrawingBoard strokeColor={strokeColor} />}
          {!isGameStarted && <WaitingGame />}
        </div>
        <div className="column-2 rounded-corners">
          <Chat />
        </div>
      </div>
      <div className="toolbox">
        {isGameStarted && timeLeft > 0 && (
          <Toolbox strokeColor={strokeColor} setStrokeColor={setStrokeColor} />
        )}
        {timeLeft == 0 && isGameStarted && isHost && (
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
