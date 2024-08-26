import { configureStore } from "@reduxjs/toolkit";
import linesReducer from "./reducers/linesReducer";
import chatReducer from "./reducers/chatReducer";
import gameSlice from "./reducers/gameSlice";

const store = configureStore({
  reducer: {
    linesReducer,
    chatReducer,
    gameSlice,
  },
});

export default store;
