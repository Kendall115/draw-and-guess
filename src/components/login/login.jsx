import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsHost, resetState } from "../../store/slices/gameSlice";
import { clear } from "../../store/slices/linesSlice";
import { setAuthSocket } from "../../store/slices/socketSlice";

import "./login.css";
import { socket } from "../../socket";

function Login() {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [gameExistsError, setGameExistsError] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const resetGame = () => {
    dispatch(clear());
    dispatch(resetState());
  };

  const handleJoinGame = () => {
    if (!roomId.trim() || !userName.trim()) return;

    dispatch(setAuthSocket({ userName, roomID: roomId }));

    socket.emit("join room", roomId, (success) => {
      if (!success) return setGameExistsError(true);
      resetGame();
      navigate(`/game/${roomId}/${userName}`);
    });
  };

  const handleCreateGame = () => {
    if (!roomId.trim() || !userName.trim()) return;

    const uniqueRoomId = `${roomId}-${crypto.randomUUID()}`;

    resetGame();
    dispatch(setAuthSocket({ userName, roomID: uniqueRoomId }));
    dispatch(setIsHost(true));

    socket.emit("create room", uniqueRoomId);
    navigate(`/game/${uniqueRoomId}/${userName}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Draw and Guess Game</h1>
        <div className="form-group">
          <label htmlFor="roomId" className="form-label">
            Room Name:
          </label>
          <input
            type="text"
            id="roomId"
            className="form-input"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName" className="form-label">
            Player Name:
          </label>
          <input
            type="text"
            id="userName"
            className="form-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        {gameExistsError && (
          <div className="error">
            Room ID does not exists. Please choose a different room ID.
          </div>
        )}
        <div className="button-group">
          <button className="form-button" onClick={handleJoinGame}>
            Join Game
          </button>
          <button className="form-button" onClick={handleCreateGame}>
            Create Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
