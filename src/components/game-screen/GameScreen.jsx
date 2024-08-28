import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { setAuthSocket } from "../../store/reducers/socketSlice";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
          {isGameStarted && <DrawingBoard strokeColor={strokeColor} />}
          {!isGameStarted && <WaitingGame />}
        </div>
        <div className="column-2 rounded-corners">
          <Chat />
        </div>
      </div>
      <div className="toolbox">
        {isGameStarted && (
          <Toolbox strokeColor={strokeColor} setStrokeColor={setStrokeColor} />
        )}
      </div>
    </>
  );
};

export default GameScreen;
