import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offset: 0,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      action.payload.serverChatOffset
        ? (state.offset = action.payload.serverChatOffset)
        : (state.offset += 1);
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
});

export const { addMessage, setOffset } = chatSlice.actions;
export default chatSlice.reducer;
