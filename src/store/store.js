import { configureStore } from "@reduxjs/toolkit";
import linesSlice from "./slices/linesSlice";
import chatSlice from "./slices/chatSlice";
import gameSlice from "./slices/gameSlice";
import socketSlice from "./slices/socketSlice";
import socketMiddleware from "./middlewares/socketMiddleware";

const store = configureStore({
  reducer: {
    linesSlice,
    chatSlice,
    gameSlice,
    socketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(socketMiddleware.middleware),
});

export default store;
