import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type reportState = {};

type UserProfile = {
  id: number;
  user_name: string;
  grade: number;
  country: string;
  user: number;
};

const initialState = {} as reportState;

export const userSlice = createSlice({
  name: "report",
  initialState,

  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
