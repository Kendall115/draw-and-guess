import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGameStarted: false,
  isHost: false,
  isCurrentTurn: false,
  isWaiting: true,
  guessWord: "",
  timeLeft: -1,
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
    setCurrentTurn: (state, action) => {
      state.isCurrentTurn = action.payload.isCurrentTurn;
      state.guessWord = action.payload.guessWord;
    },
    setIsWaiting: (state, action) => {
      state.isWaiting = action.payload;
    },
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
  },
});

export const {
  setIsGameStarted,
  setIsHost,
  setCurrentTurn,
  setIsWaiting,
  setTimeLeft,
} = gameSlice.actions;
export default gameSlice.reducer;
