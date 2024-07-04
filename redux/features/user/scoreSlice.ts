import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type scoreState = {
  sat: number;
  act: number;
  reading: number;
  writing: number;
  math: number;
};

const initialState = {
  sat: 0,
  act: 0,
  reading: 0,
  writing: 0,
  math: 0,
} as scoreState;

export const scoreSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setSAT: (state, action: PayloadAction<number>) => {
      state.sat = action.payload;
    },
    setACT: (state, action: PayloadAction<number>) => {
      state.act = action.payload;
    },
    setReading: (state, action: PayloadAction<number>) => {
      state.reading = action.payload;
    },
    setWriting: (state, action: PayloadAction<number>) => {
      state.writing = action.payload;
    },
    setMath: (state, action: PayloadAction<number>) => {
      state.math = action.payload;
    },
  },
});

export const { setSAT, setACT, setReading, setWriting, setMath } =
  scoreSlice.actions;
export default scoreSlice.reducer;
