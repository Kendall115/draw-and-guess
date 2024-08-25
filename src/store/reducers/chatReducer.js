import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offset: 0,
  messages: [],
  userName: "",
  roomID: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      state.offset += 1;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.userName = action.payload;
    },
    setRoomID: (state, action) => {
      state.roomID = action.payload;
    },
  },
});

export const { addMessage, setOffset, setCurrentUser, setRoomID } =
  chatSlice.actions;
export default chatSlice.reducer;
