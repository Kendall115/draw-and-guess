import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGameStarted: false,
  isHost: false,
  isCurrentTurn: false,
  isWaiting: true,
  guessWord: "",
  userNameDrawing: "",
  timeLeft: -1,
  countdown: 5,
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
    setUserNameDrawing: (state, action) => {
      console.log("user name drawing", action.payload);
      state.userNameDrawing = action.payload;
    },
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    timeIsUp: (state, action) => {
      state.guessWord = action.payload;
    },
    setCountdown: (state, action) => {
      state.countdown = action.payload;
    },
    restartStates(state) {
      state.isGameStarted = false;
      state.isCurrentTurn = false;
      state.isWaiting = false;
      state.guessWord = "";
      state.userNameDrawing = "";
      state.timeLeft = -1;
      state.countdown = 5;
    },
  },
});

export const {
  setIsGameStarted,
  setIsHost,
  setCurrentTurn,
  setIsWaiting,
  setTimeLeft,
  setUserNameDrawing,
  timeIsUp,
  restartStates,
  setCountdown,
} = gameSlice.actions;
export default gameSlice.reducer;
