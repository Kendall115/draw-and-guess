import { useEffect, useState } from "react";
import DrawingBoard from "../drawing-board/DrawingBoard";
import Toolbox from "../toolbox/Toolbox";
import Chat from "../chat/Chat";
import { initSocket, socket } from "../../socket";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser, setRoomID } from "../../store/reducers/chatReducer";
import "./GameScreen.css";

const GameScreen = () => {
  const [strokeColor, setStrokeColor] = useState("#FF5733");
  const dispatch = useDispatch();

  const { roomId, userName } = useParams();

  initSocket(roomId);
  useEffect(() => {
    socket.emit("join room", (success) => {
      console.log(success);
    });
    dispatch(setCurrentUser(userName));
    dispatch(setRoomID(roomId));
  }, []);

  return (
    <>
      <div className="container">
        <div className="column-1 rounded-corners">
          <DrawingBoard strokeColor={strokeColor} />
        </div>
        <div className="column-2 rounded-corners">
          <Chat />
        </div>
      </div>
      <div className="toolbox">
        <Toolbox strokeColor={strokeColor} setStrokeColor={setStrokeColor} />
      </div>
    </>
  );
};

export default GameScreen;
