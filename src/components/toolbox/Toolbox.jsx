import { useEffect, useCallback } from "react";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { undo, clear, setOffset } from "../../store/reducers/linesReducer";
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
    dispatch(undo());
    socket.timeout(5000).emit("undo", offset);
  };

  const handleClear = () => {
    dispatch(clear());
    socket.timeout(5000).emit("clear", offset);
  };

  const handleUndoEvent = useCallback(
    (clientOffSet) => {
      if (offset === clientOffSet) return;
      dispatch(undo());
      dispatch(setOffset(clientOffSet));
    },
    [offset, dispatch]
  );

  const handleClearEvent = useCallback(
    (clientOffSet) => {
      dispatch(clear());
      dispatch(setOffset(clientOffSet));
    },
    [dispatch]
  );

  useEffect(() => {
    socket.on("undo", handleUndoEvent);
    socket.on("clear", handleClearEvent);

    return () => {
      socket.off("undo", handleUndoEvent);
      socket.off("clear", handleClearEvent);
    };
  }, []);

  return (
    <div className="toolbox">
      <button
        disabled={!isCurrentTurn}
        className="clear-button"
        onClick={handleClear}
      >
        Clear
      </button>
      <button
        disabled={!isCurrentTurn}
        className="undo-button"
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
            style={{ backgroundColor: color }}
            onClick={() => {
              if (!isCurrentTurn) return;
              setStrokeColor(color);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Toolbox;
