export const socketListeners = [
  {
    name: "chat message",
    dispatchName: "chat/addMessage",
  },
  {
    name: "selected player",
    dispatchName: "game/setCurrentTurn",
  },
  {
    name: "recover game status",
    dispatchName: "game/setIsGameStarted",
  },
  {
    name: "recover lines",
    dispatchName: "lines/setLines",
  },
  {
    name: "drawingNewLine",
    dispatchName: "lines/addLine",
  },
  {
    name: "drawing",
    dispatchName: "lines/addPoint",
  },
  {
    name: "start countdown",
    dispatchName: "game/setIsWaiting",
  },
  {
    name: "timer update",
    dispatchName: "game/setTimeLeft",
  },
  {
    name: "user name drawing",
    dispatchName: "game/setUserNameDrawing",
  },
  {
    name: "time is up",
    dispatchName: "game/timeIsUp",
  },
  {
    name: "play again",
    dispatchName: "game/restartStates",
  },
];
