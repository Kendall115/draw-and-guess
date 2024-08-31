import { Stage, Layer, Line } from "react-konva";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { addLine, addPoint } from "../../store/slices/linesSlice";
import "./DrawingBoard.css";

const DrawingBoard = ({ strokeColor }) => {
  const tool = "pen";
  const isDrawing = useRef(false);

  const [stageWidth, setStageWidth] = useState(window.innerWidth * 0.75);
  const [stageHeight, setStageHeight] = useState(window.innerHeight * 0.75);
  const [scale, setScale] = useState(1);
  const [initialStageWidth] = useState(window.innerWidth * 0.75);
  const [initialStageHeight] = useState(window.innerHeight * 0.75);

  const dispatch = useDispatch();
  const lines = useSelector((state) => state.linesSlice.lines);
  const offset = useSelector((state) => state.linesSlice.offset);
  const isCurrentTurn = useSelector((state) => state.gameSlice.isCurrentTurn);
  const gameStatus = useSelector((state) => state.gameSlice.gameStatus);

  const handleMouseDown = (e) => {
    if (!isCurrentTurn || gameStatus !== "playing") return;

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
    const handleResize = () => {
      const width = window.innerWidth * 0.75;
      const height = window.innerHeight * 0.75;
      const scaleX = width / initialStageWidth;
      const scaleY = height / initialStageHeight;
      setStageWidth(width);
      setStageHeight(height);
      setScale(Math.min(scaleX, scaleY)); // Keep aspect ratio
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="drawing-board">
      <Stage
        width={stageWidth}
        height={stageHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points.map((point) => point * scale)}
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
