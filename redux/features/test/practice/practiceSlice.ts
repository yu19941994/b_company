import { testQuestion, PracticeResult } from "@/types/test";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

dayjs.extend(objectSupport);

type PracticeState = {
  status: "disable" | "check" | "again" | "next" | "view";
  startTimeStamp: number;
  timer: number;
  isLeaving: boolean;
  current: number;
  practice_id: number;
  questions: testQuestion[];
  questionsCrossedOptions: {
    questionNumber: number;
    crossedOptions: string[];
  }[];
  answers: {
    currentAnswer: string | null;
    answer: string | null;
    time_spent: number;
  }[];
  results: PracticeResult[];
};

const initialState = {
  status: "disable",
  startTimeStamp: 0,
  timer: 0,
  isLeaving: false,
  current: 0,
  practice_id: 0,
  questions: [],
  answers: [],
  results: [],
  questionsCrossedOptions: [],
} as PracticeState;

export const practiceSlice = createSlice({
  name: "practice",
  initialState,
  reducers: {
    resetPractice: (state) => {
      state.status = "disable";
      state.startTimeStamp = 0;
      state.timer = 0;
      state.isLeaving = false;
      state.current = 0;
      state.practice_id = 0;
      state.questions = [];
      state.answers = [];
      state.results = [];
      state.questionsCrossedOptions = [];
    },
    //
    resumePractice: (
      state,
      action: PayloadAction<{
        questions: testQuestion[];
        answers: {
          answer: "A" | "B" | "C" | "D" | string | null;
          order: number;
          time_spent: number;
        }[];
        results: {
          correct_answer: string | null;
          correctness: boolean | null;
          explanation: {
            A: string | null;
            B: string | null;
            C: string | null;
            D: string | null;
            summary: string | null;
          };
          order: number;
        }[];
      }>,
    ) => {
      state.questions = action.payload.questions;
      state.answers = action.payload.answers.map((answer) => ({
        currentAnswer: answer.answer ?? "",
        answer: answer.answer ?? "",
        time_spent: answer.time_spent,
      }));

      let filteredResults = action.payload.results.filter(
        (result) => result.correct_answer !== null,
      );

      state.results = filteredResults.map((result) => ({
        originCorrectness: null,
        correct_answer: result.correct_answer ?? "",
        correctness: result.correctness ?? false,
        order: result.order,
        explanations: {
          A: result.explanation?.A ?? null,
          B: result.explanation?.B ?? null,
          C: result.explanation?.C ?? null,
          D: result.explanation?.D ?? null,
          summary: result.explanation?.summary ?? null,
        },
      }));

      if (action.payload.answers.length >= action.payload.questions.length) {
        state.current = action.payload.questions.length - 1;
      } else {
        state.current = action.payload.answers.length;
      }
    },
    setPracticeStatus: (
      state,
      action: PayloadAction<PracticeState["status"]>,
    ) => {
      state.status = action.payload;
    },
    setPracticeStartTimeStamp: (state, action: PayloadAction<number>) => {
      state.startTimeStamp = action.payload;
    },
    incrementPracticeTimer: (state) => {
      state.timer += 1;
    },
    resetPracticeTimer(state) {
      state.timer = 0;
    },
    setPracticeCurrent: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
    setIsLeaving: (
      state,
      action: PayloadAction<PracticeState["isLeaving"]>,
    ) => {
      state.isLeaving = action.payload;
    },
    setPracticeId: (
      state,
      action: PayloadAction<PracticeState["practice_id"]>,
    ) => {
      state.practice_id = action.payload;
    },
    setPracticeQuestions: (
      state,
      action: PayloadAction<PracticeState["questions"]>,
    ) => {
      state.questions = action.payload;
    },
    setQuestionsCrossedOptions: (
      state,
      action: PayloadAction<{ questionNumber: number; crossOption: string }>,
    ) => {
      const { questionNumber, crossOption } = action.payload;
      const index = _.findIndex(state.questionsCrossedOptions, {
        questionNumber,
      });
      if (index === -1) {
        state.questionsCrossedOptions.push({
          questionNumber,
          crossedOptions: [crossOption],
        });
      } else {
        if (
          state.questionsCrossedOptions[index].crossedOptions.includes(
            crossOption,
          )
        ) {
          state.questionsCrossedOptions[index].crossedOptions =
            state.questionsCrossedOptions[index].crossedOptions.filter(
              (option) => option !== crossOption,
            );
        } else {
          state.questionsCrossedOptions[index].crossedOptions.push(crossOption);
        }
      }
    },
    setPracticeAnswer: (
      state,
      action: PayloadAction<{
        currentAnswer?: string | null;
        answer?: string | null;
      }>,
    ) => {
      state.answers[state.current] = {
        ...state.answers[state.current],
        currentAnswer:
          action.payload.currentAnswer ??
          state.answers[state.current]?.currentAnswer ??
          "",
        answer:
          action.payload.answer ?? state.answers[state.current]?.answer ?? "",
        time_spent: state.timer,
      };
    },
    setPracticeResult: (
      state,
      action: PayloadAction<{
        current: number;
        originCorrectness?: boolean | null;
        correct_answer?: "A" | "B" | "C" | "D" | string;
        correctness?: boolean;
        explanations?: any;
      }>,
    ) => {
      state.results[action.payload.current] = {
        ...state.results[action.payload.current],
        ...action.payload,
        order: state.questions[action.payload.current].order,
      };
    },

    setPracticeExplanation: (
      state,
      action: PayloadAction<PracticeState["results"][number]["explanations"]>,
    ) => {
      if (state.results[state.current] === undefined) {
        state.results[state.current] = {
          originCorrectness: null,
          correct_answer: "",
          correctness: false,
          order: 0,
          explanations: {
            A: action.payload.A ?? null,
            B: action.payload.B ?? null,
            C: action.payload.C ?? null,
            D: action.payload.D ?? null,
            summary: action.payload.summary ?? null,
          },
        };
      }
      state.results[state.current].explanations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      asyncSetPracticeResult.fulfilled,
      (state, action: PayloadAction<PracticeResult>) => {
        state.results[state.current] = {
          ...state.results[state.current],
          ...action.payload,
          order: state.questions[state.current].order,
        };
      },
    );
  },
});

// thunks
export const asyncSetPracticeResult = createAsyncThunk(
  "practice/asyncSetPracticeResult",
  async (payload: PracticeResult, _): Promise<PracticeResult> => payload,
);

export const {
  setPracticeStatus,
  resumePractice,
  setPracticeStartTimeStamp,
  incrementPracticeTimer,
  resetPracticeTimer,
  setIsLeaving,
  setPracticeCurrent,
  setPracticeId,
  setPracticeAnswer,
  setPracticeQuestions,
  setQuestionsCrossedOptions,
  setPracticeResult,
  setPracticeExplanation,
  resetPractice,
} = practiceSlice.actions;

export default practiceSlice.reducer;
