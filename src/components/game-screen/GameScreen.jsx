import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setRoomID } from "../../store/reducers/chatReducer";
import { initSocket, socket } from "../../socket";
import {
  setIsCurrentTurn,
  setIsGameStarted,
} from "../../store/reducers/gameSlice";
import { setLines } from "../../store/reducers/linesReducer";

import DrawingBoard from "../drawing-board/DrawingBoard";
import Toolbox from "../toolbox/Toolbox";
import Chat from "../chat/Chat";
import WaitingGame from "../WaitingGame/WaitingGame";

import "./GameScreen.css";

const GameScreen = () => {
  const [strokeColor, setStrokeColor] = useState("#FF5733");
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state) => state.gameSlice.isGameStarted);

  const { roomId, userName } = useParams();

  if (!socket) initSocket(roomId);
  useEffect(() => {
    socket.emit("join room", (success) => {
      console.log(success);
    });
    dispatch(setCurrentUser(userName));
    dispatch(setRoomID(roomId));
  }, []);

  useEffect(() => {
    const handleRecoverLines = async (lines) => {
      dispatch(setLines(lines));
    };

    const handleSelectedPlayer = async () => {
      dispatch(setIsCurrentTurn(true));
    };

    const handleRecoverGameStatus = async (gameStatus) => {
      dispatch(setIsGameStarted(gameStatus));
    };

    socket.on("selected player", handleSelectedPlayer);
    socket.on("recover game status", handleRecoverGameStatus);
    socket.on("recover lines", handleRecoverLines);

    return () => {
      socket.off("selected player", handleSelectedPlayer);
      socket.off("recover game status", handleRecoverGameStatus);
      socket.off("recover lines", handleRecoverLines);
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="column-1 rounded-corners">
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
