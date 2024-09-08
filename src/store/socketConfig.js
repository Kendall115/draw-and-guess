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
    name: "start game",
    dispatchName: "lines/clear",
  },
  {
    name: "start countdown",
    dispatchName: "game/gameCountdown",
  },
  {
    name: "timer update",
    dispatchName: "game/setTimeLeft",
  },
  {
    name: "user name drawing",
    dispatchName: "game/setUserNameDrawing",
  },
  { name: "clear", dispatchName: "lines/clear" },
  { name: "undo", dispatchName: "lines/undo" },
  {
    name: "recover game status",
    dispatchName: "game/setGameStatus",
  },
  {
    name: "time is up",
    dispatchName: "game/timeIsUp",
  },
  {
    name: "play again",
    dispatchName: "game/newGame",
  },
  {
    name: "update player list",
    dispatchName: "game/setConnectedPlayers",
  },
];
