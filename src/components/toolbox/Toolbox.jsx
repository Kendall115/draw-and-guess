import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { undo, clear } from "../../store/slices/linesSlice";
import "./Toolbox.css";

const Toolbox = ({ strokeColor, setStrokeColor }) => {
  const dispatch = useDispatch();
  const offset = useSelector((state) => state.offset);
  const isCurrentTurn = useSelector((state) => state.gameSlice.isCurrentTurn);

  const colors = [
    "#FF5733",
    "#FFC107",
    "#8BC34A",
    "#4CAF50",
    "#2196F3",
    "#607D8B",
    "#E91E63",
    "#9C27B0",
    "#A52A2A",
  ];

  const handleUndo = () => {
    if (!isCurrentTurn) return;
    dispatch(undo());
    socket.timeout(5000).emit("undo", offset);
  };

  const handleClear = () => {
    if (!isCurrentTurn) return;
    dispatch(clear());
    socket.timeout(5000).emit("clear", offset);
  };

  return (
    <div className="toolbox">
      <button
        disabled={!isCurrentTurn}
        className="clear-button"
        style={{ cursor: isCurrentTurn ? "pointer" : "" }}
        onClick={handleClear}
      >
        Clear
      </button>
      <button
        disabled={!isCurrentTurn}
        className="undo-button"
        style={{ cursor: isCurrentTurn ? "pointer" : "" }}
        onClick={handleUndo}
      >
        Undo
      </button>
      <div className="color-palette">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-swatch ${
              strokeColor === color && isCurrentTurn ? "selected" : ""
            }`}
            style={{
              backgroundColor: color,
              cursor: isCurrentTurn ? "pointer" : "",
            }}
            onClick={() => {
              setStrokeColor(color);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Toolbox;
