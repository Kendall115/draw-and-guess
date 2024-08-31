import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomID: "",
  userName: "",
  serverChatOffset: 0,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setAuthSocket: (state, action) => {
      state.roomID = action.payload.roomID;
      state.userName = action.payload.userName;
    },
    setServerChatOffset: (state, action) => {
      state.serverChatOffset = action.payload;
    },
  },
});

export const { setAuthSocket, setServerChatOffset } = socketSlice.actions;
export default socketSlice.reducer;
