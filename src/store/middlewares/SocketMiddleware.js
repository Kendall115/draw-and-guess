import { createListenerMiddleware } from "@reduxjs/toolkit";

import { setAuthSocket } from "../slices/socketSlice";
import { newGame, setCurrentTurn } from "../slices/gameSlice";
import { socketListeners } from "../socketConfig";
import { initSocket, socket } from "../../socket";

const socketMiddleware = createListenerMiddleware();

socketMiddleware.startListening({
  actionCreator: setAuthSocket,
  effect: async (action, listenerApi) => {
    const { userName, roomID } = action.payload;
    initSocket(roomID, userName);

    // Dynamically register socket listeners
    socketListeners.forEach(({ name, dispatchName }) => {
      socket.on(name, (data) => {
        listenerApi.dispatch({ type: dispatchName, payload: data });
      });
    });
  },
});

socketMiddleware.startListening({
  actionCreator: setCurrentTurn,
  effect: async (action) => {
    socket.auth.isCurrentTurn = action.payload.isCurrentTurn;
    socket.emit("auth update", socket.auth);
  },
});

socketMiddleware.startListening({
  actionCreator: newGame,
  effect: async () => {
    socket.auth.isCurrentTurn = false;
    socket.emit("auth update", socket.auth);
  },
});

export default socketMiddleware;
