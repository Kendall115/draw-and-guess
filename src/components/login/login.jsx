import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { initSocket, socket } from "../../socket";

function Login() {
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [gameExistsError, setGameExistsError] = useState(false);

  const navigate = useNavigate();

  const handleJoinGame = () => {
    if (!roomId.trim() || !playerName.trim()) return;

    initSocket(roomId);
    socket.emit("join room", (success) => {
      if (!success) return setGameExistsError(true);
      navigate(`/game/${roomId}/${playerName}`);
    });
  };

  const handleCreateGame = () => {
    if (!roomId.trim() || !playerName.trim()) return;

    const uniqueRoomId = `${roomId}-${crypto.randomUUID()}`;
    initSocket(uniqueRoomId);
    socket.emit("create room");
    navigate(`/game/${uniqueRoomId}/${playerName}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Draw and Guess Game</h1>
        <div className="form-group">
          <label htmlFor="roomId" className="form-label">
            Room ID:
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
          <label htmlFor="playerName" className="form-label">
            Player Name:
          </label>
          <input
            type="text"
            id="playerName"
            className="form-input"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
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
