import { io } from "socket.io-client";

const URL = "http://localhost:3000";

export let socket = null;

export const initSocket = (roomID, userName) => {
  socket = io(URL, {
    auth: {
      roomID,
      userName,
      isCurrentTurn: false,
      serverChatOffset: 0,
    },
  });
  return socket;
};
