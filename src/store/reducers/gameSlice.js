import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGameStarted: false,
  isHost: false,
  isCurrentTurn: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIsGameStarted: (state, action) => {
      state.isGameStarted = action.payload;
    },
    setIsHost: (state, action) => {
      state.isHost = action.payload;
    },
    setIsCurrentTurn: (state, action) => {
      state.isCurrentTurn = action.payload;
    },
  },
});

export const { setIsGameStarted, setIsHost, setIsCurrentTurn } =
  gameSlice.actions;
export default gameSlice.reducer;
