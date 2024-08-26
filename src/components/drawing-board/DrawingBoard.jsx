import { Stage, Layer, Line } from "react-konva";
import { useEffect, useRef } from "react";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import {
  addLine,
  addPoint,
  setOffset,
} from "../../store/reducers/linesReducer";
import "./DrawingBoard.css";

const DrawingBoard = ({ strokeColor }) => {
  const tool = "pen";
  const isDrawing = useRef(false);

  const dispatch = useDispatch();
  const lines = useSelector((state) => state.linesReducer.lines);
  const offset = useSelector((state) => state.linesReducer.offset);
  const isCurrentTurn = useSelector((state) => state.gameSlice.isCurrentTurn);

  const handleMouseDown = (e) => {
    if (!isCurrentTurn) return;

    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();

    const newLine = {
      tool,
      points: [pos.x, pos.y],
      color: strokeColor,
    };

    dispatch(addLine(newLine));
    socket.timeout(5000).emit("drawingNewLine", newLine, offset);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || !isCurrentTurn) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    dispatch(addPoint(point));

    socket.timeout(5000).emit("drawing", point, offset);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  useEffect(() => {
    const handleSocketDrawing = async (newLine, clientOffSet) => {
      if (
        lines.length > 0 &&
        newLine.linesOffSet === lines[lines.length - 1].linesOffSet
      ) {
        return;
      }

      dispatch(addLine(newLine));
      dispatch(setOffset(clientOffSet));
    };

    const handleDrawing = async (point, clientOffSet) => {
      dispatch(addPoint(point));
      dispatch(setOffset(clientOffSet));
    };

    socket.on("drawingNewLine", handleSocketDrawing);
    socket.on("drawing", handleDrawing);

    return () => {
      socket.off("drawingNewLine", handleSocketDrawing);
      socket.off("drawing", handleSocketDrawing);
    };
  }, []);

  return (
    <div className="drawing-board">
      <Stage
        width={window.innerWidth * 0.75}
        height={window.innerHeight * 0.85}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              strokeWidth={5}
              stroke={line.color}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawingBoard;
