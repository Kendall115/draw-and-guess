import { createListenerMiddleware } from "@reduxjs/toolkit";

import { setAuthSocket } from "../reducers/socketSlice";
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

export default socketMiddleware;
