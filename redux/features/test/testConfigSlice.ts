import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
type TestConfigState = {
  combination: { [key: string]: string[] };
  type: "practice" | "test" | "";
  subject: "Math" | "Reading" | "Writing" | "Full" | "";
  units: string[];
  numsOfQuestions: number;
};

const initialState = {
  combination: {},
  type: "practice",
  subject: "Full",
  units: ["All"],
  numsOfQuestions: 3,
} as TestConfigState;

export const testConfigSlice = createSlice({
  name: "test-config",
  initialState,
  reducers: {
    setCombination: (
      state,
      action: PayloadAction<TestConfigState["combination"]>,
    ) => {
      state.combination = action.payload;
    },
    setType: (state, action: PayloadAction<TestConfigState["type"]>) => {
      state.type = action.payload;
      state.subject = "Math";
      state.units = ["All"];
    },
    setSubject: (state, action: PayloadAction<TestConfigState["subject"]>) => {
      state.subject = action.payload;
      state.units = ["All"];
    },
    setUnit: (state, action: PayloadAction<string>) => {
      state.units = [action.payload];
      // if (action.payload === "All") {
      // 	state.units = ["All"];
      // } else {
      // 	const index = state.units.indexOf("All");
      // 	if (index !== -1) {
      // 		state.units.splice(index, 1);
      // 	} else {
      // 		state.units.push(action.payload);
      // 	}
      // }
    },
    setNumsOfQuestions: (
      state,
      action: PayloadAction<TestConfigState["numsOfQuestions"]>,
    ) => {
      state.numsOfQuestions = action.payload;
    },
  },
});

export const {
  setCombination,
  setType,
  setSubject,
  setUnit,
  setNumsOfQuestions,
} = testConfigSlice.actions;
export default testConfigSlice.reducer;
