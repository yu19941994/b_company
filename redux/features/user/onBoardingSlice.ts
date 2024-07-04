import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
type onBoardingState = {
  isOnBoarding: boolean;
  step: 1 | 2 | 3;
  userName: string;
  grade: 9 | 10 | 11 | 12 | 0 | null;
  country: string;
};

const initialState: onBoardingState = {
  isOnBoarding: false,
  step: 1,
  userName: "",
  grade: null,
  country: "",
};

export const onBoardingSlice = createSlice({
  name: "onBoarding",
  initialState,
  reducers: {
    setIsOnBoarding: (state, action: PayloadAction<boolean>) => {
      state.isOnBoarding = action.payload;
    },
    setStep: (state, action: PayloadAction<1 | 2 | 3>) => {
      state.step = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setGrade: (state, action: PayloadAction<9 | 10 | 11 | 12 | 0>) => {
      state.grade = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
  },
});

export const { setIsOnBoarding, setStep, setUserName, setGrade, setCountry } =
  onBoardingSlice.actions;
export default onBoardingSlice.reducer;
