import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Answer, testQuestion } from "@/types/test";

const scores = ["sat", "act", "math", "writing", "reading"] as const;
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const;

type AssesmentState = {
  startTimeStamp: number;
  timer: number;
  isAssesment: boolean;
  showMascotAnimation: boolean;
  current: number;
  questions: testQuestion[];
  answers: Answer[];
  results: {
    testResult: {
      order: number;
      question_id: number;
      correctness: boolean;
    }[];
  };
};

const initialState: AssesmentState = {
  startTimeStamp: 0,
  timer: 0,
  isAssesment: false,
  showMascotAnimation: true,
  current: 0,
  questions: [],
  answers: [],
  results: {
    testResult: [],
  },
};

export const assesmentSlice = createSlice({
  name: "assesment",
  initialState,
  reducers: {
    resetAssessment: (state) => {
      state.startTimeStamp = 0;
      state.timer = 0;
      state.isAssesment = false;
      state.showMascotAnimation = true;
      state.current = 0;
      state.questions = [];
      state.answers = [];
      state.results.testResult = [];
    },
    setStartTimeStamp: (state, action: PayloadAction<number>) => {
      state.startTimeStamp = action.payload;
    },
    incrementTimer: (state) => {
      state.isAssesment && (state.timer += 1);
    },
    resetTimer(state) {
      state.timer = 0;
    },
    setIsAssesment: (state, action: PayloadAction<boolean>) => {
      state.isAssesment = action.payload;
    },
    setShowMascotAnimation: (state, action: PayloadAction<boolean>) => {
      state.showMascotAnimation = action.payload;
    },
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
    setAssesmentQuestions: (state, action: PayloadAction<testQuestion[]>) => {
      state.questions = action.payload;
    },
    setAssesmentAnswer: (
      state,
      action: PayloadAction<{
        answer: Answer;
      }>,
    ) => {
      state.answers[state.current] = action.payload.answer;
    },
    setTestResults: (
      state,
      action: PayloadAction<AssesmentState["results"]["testResult"]>,
    ) => {
      state.results.testResult = action.payload;
    },
  },
});

export const {
  resetAssessment,
  setStartTimeStamp,
  incrementTimer,
  resetTimer,
  setIsAssesment,
  setCurrent,
  setAssesmentQuestions,
  setAssesmentAnswer,
  setShowMascotAnimation,
  setTestResults,
} = assesmentSlice.actions;
export default assesmentSlice.reducer;
