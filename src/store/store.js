import { configureStore } from "@reduxjs/toolkit";
import linesReducer from "./reducers/linesReducer";
import chatReducer from "./reducers/chatReducer";
import gameSlice from "./reducers/gameSlice";
import socketSlice from "./reducers/socketSlice";
import socketMiddleware from "./middlewares/socketMiddleware";

const store = configureStore({
  reducer: {
    linesReducer,
    chatReducer,
    gameSlice,
    socketSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(socketMiddleware.middleware),
});

export default store;
