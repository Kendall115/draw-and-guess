import { configureStore } from "@reduxjs/toolkit";
import linesReducer from "./reducers/linesReducer";
import chatReducer from "./reducers/chatReducer";

const store = configureStore({
  reducer: {
    linesReducer,
    chatReducer,
  },
});

export default store;
