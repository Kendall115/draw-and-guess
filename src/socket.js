import { io } from "socket.io-client";

const URL = "http://localhost:3000";

export let socket = null;

export const initSocket = (roomID) => {
  socket = io(URL, {
    auth: {
      roomID,
      serverChatOffset: 0,
    },
  });
  return socket;
};
