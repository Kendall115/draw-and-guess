import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offset: 0,
  lines: [],
};

const linesSlice = createSlice({
  name: "lines",
  initialState,
  reducers: {
    addLine: (state, action) => {
      state.lines.push(action.payload);
      state.offset += 1;
    },
    addPoint: (state, action) => {
      const lastLineIndex = state.lines.length - 1;
      const lastLine = state.lines[lastLineIndex] || null;

      if (lastLine) {
        lastLine.points.push(action.payload.x, action.payload.y);
        state.lines.splice(lastLineIndex, 1, lastLine);
        state.offset += 1;
      }
    },
    setLines: (state, action) => {
      state.lines = action.payload;
    },
    undo: (state) => {
      if (state.lines.length > 0) {
        state.lines.pop();
        state.offset += 1;
      }
    },
    clear: (state) => {
      state.lines = [];
      state.offset += 1;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
});

export const { addLine, addPoint, undo, clear, setOffset, setLines } =
  linesSlice.actions;
export default linesSlice.reducer;
