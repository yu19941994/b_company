import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const testTypes = [
  { id: 1, name: "PSAT-Related Assessments" },
  { id: 2, name: "SAT" },
] as const;

const satSubjects = [
  { id: 1, name: "SAT Practice 1" },
  { id: 2, name: "SAT Practice 2" },
  { id: 3, name: "SAT Practice 3" },
  { id: 4, name: "SAT Practice 4" },
] as const;

const psatSubject = [
  { id: 1, name: "PSAT 8/9" },
  { id: 2, name: "PSAT/NMSQT and PSAT 10" },
] as const;

const readingExtendedTime = [
  { id: 1, name: "Reading: time and one-half (+50%)" },
  { id: 2, name: "Reading: double time (+100%)" },
  { id: 3, name: "Reading: more than double time (>+100%)" },
] as const;

const mathExtendedTime = [
  { id: 1, name: "Math: time and one-half (+50%)" },
  { id: 2, name: "Math: double time (+100%)" },
  { id: 3, name: "Math: more than double time (>+100%)" },
] as const;

type testModules = "reading1" | "reading2" | "math1" | "math2";

type testQuestion = {};

type TestState = {
  testStatus:
    | "warning"
    | "setting"
    | "loading"
    | "information"
    | "test"
    | "beforeSubmitReview"
    | "complete"
    | "moduleTransition"
    | "uploading"
    | "finished"
    | "review";

  testType: (typeof testTypes)[number]["name"] | "";
  SATSubject: (typeof satSubjects)[number]["name"] | "";
  PSATSubject: (typeof psatSubject)[number]["name"] | "";
  accommodations: {
    enabled: boolean;
    readingExtendedTime: "1" | "1.5" | "2" | "2.5";
    mathExtendedTime: "1" | "1.5" | "2" | "2.5";
    breaks: {
      isExtraBreak: boolean;
      isExtendedBreak: boolean;
      isBreakASneeded: boolean;
    };
    other: {
      isRaisedLineDrawing: boolean;
    };
  };
};

const initialState = {
  testStatus: "information",
  testType: "",
  SATSubject: "",
  PSATSubject: "",
  accommodations: {
    enabled: false,
    readingExtendedTime: "1",
    mathExtendedTime: "1",
    breaks: {
      isExtraBreak: false,
      isExtendedBreak: false,
      isBreakASneeded: false,
    },
    other: {
      isRaisedLineDrawing: false,
    },
  },
} as TestState;

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    resetTestSlice: () => initialState,

    changeStatus: (state, action: PayloadAction<TestState["testStatus"]>) => {
      state.testStatus = action.payload;
    },

    toggleAccommdations: (state, action: PayloadAction<boolean>) => {
      state.accommodations.enabled = action.payload;
    },
    setTestType: (state, action: PayloadAction<TestState["testType"]>) => {
      state.testType = action.payload;
    },
    setSATSubject: (state, action: PayloadAction<TestState["SATSubject"]>) => {
      state.SATSubject = action.payload;
    },
    setPSATSubject: (
      state,
      action: PayloadAction<TestState["PSATSubject"]>,
    ) => {
      state.PSATSubject = action.payload;
    },
    setReadingExtendedTime: (
      state,
      action: PayloadAction<typeof state.accommodations.readingExtendedTime>,
    ) => {
      state.accommodations.readingExtendedTime = action.payload;
    },
    setMathExtendedTime: (
      state,
      action: PayloadAction<typeof state.accommodations.mathExtendedTime>,
    ) => {
      state.accommodations.mathExtendedTime = action.payload;
    },
    setBreaks: (
      state,
      action: PayloadAction<{
        key: keyof typeof state.accommodations.breaks;
        value: boolean;
      }>,
    ) => {
      const { key, value } = action.payload;
      state.accommodations.breaks[key] = value;
    },
    setOther: (
      state,
      action: PayloadAction<{
        key: keyof typeof state.accommodations.other;
        value: boolean;
      }>,
    ) => {
      const { key, value } = action.payload;
      state.accommodations.other[key] = value;
    },
  },
});

export const {
  resetTestSlice,
  toggleAccommdations,
  setTestType,
  setReadingExtendedTime,
  setSATSubject,
  setPSATSubject,
  setMathExtendedTime,
  setBreaks,
  setOther,
  changeStatus,
} = testSlice.actions;
export default testSlice.reducer;
