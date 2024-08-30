import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameStatus: "waiting",
  isHost: false,
  isCurrentTurn: false,
  isWaiting: true,
  guessWord: "",
  userNameDrawing: "",
  timeLeft: 0,
  countdown: 5,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
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
      state.userNameDrawing = action.payload;
    },
    setTimeLeft: (state, action) => {
      if (action.payload === 0) state.gameStatus = "finished";
      state.timeLeft = action.payload;
    },
    timeIsUp: (state, action) => {
      state.guessWord = action.payload;
    },
    setCountdown: (state, action) => {
      state.countdown = action.payload;
    },
    gameCountdown(state) {
      state.gameStatus = "countdown";
      // if (state.countdown > 0) {
      //   state.countdown -= 1;
      // }
      // if (state.countdown === 0) {
      //   state.gameStatus = "playing";
      // }
    },
    gamePlaying(state) {
      state.gameStatus = "playing";
    },
    gameFinished(state) {
      state.gameStatus = "finished";
    },
    gameWaiting(state) {
      state.gameStatus = "waiting";
    },
    newGame(state) {
      state.gameStatus = "countdown";
      state.isCurrentTurn = false;
      state.guessWord = "";
      state.userNameDrawing = "";
      state.timeLeft = -1;
      state.countdown = 5;
    },
  },
});

export const {
  setIsHost,
  setCurrentTurn,
  setIsWaiting,
  setTimeLeft,
  setUserNameDrawing,
  timeIsUp,
  newGame,
  setCountdown,
  gameCountdown,
  gamePlaying,
  gameFinished,
  gameWaiting,
} = gameSlice.actions;
export default gameSlice.reducer;
