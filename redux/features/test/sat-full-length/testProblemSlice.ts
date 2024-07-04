import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  BASIC_BREAK_TIME,
  BASIC_READING_AND_WRITING_TEST_TIME,
  BASIC_MATH_TEST_TIME,
} from "@/util/CONSTANT";
import { testModules, testQuestion } from "@/types/test";
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
dayjs.extend(objectSupport);

type TestProblemState = {
  mockTestId: number;
  currentModule: testModules;
  currentQuestion: number;
  pausedStatus: {
    isPaused: boolean;
    puasedType: "break" | "pause";
  };

  testTimer: number;
  moduleEndTime: number;
  breakTimer: number;
  extraBreakTimer: number;
  questions: {
    [keys in testModules]: testQuestion[];
  };
  answers: {
    order: number;
    // question_id: number;
    time_spent: number;
    answer: string | null;
  }[];
  crossedOptions: {
    order: number;
    crossOptions: ("A" | "B" | "C" | "D")[];
  }[];
  bookMarks: number[];
  selection: {
    order: number;
    selectionText: string;
    leftOrRight: "left" | "right";
  };
  annotations: {
    isAnnotationEnabled: boolean;
    saved: {
      [keys in testModules]: {
        order: number;
        selectionText: string;
        annotation: string;
        leftOrRight: "left" | "right";
      }[];
    };
  };
};

const initialState = {
  mockTestId: -1,
  currentModule: "reading1",
  currentQuestion: 0,
  pausedStatus: {
    isPaused: false,
    puasedType: "pause",
  },
  testTimer: BASIC_READING_AND_WRITING_TEST_TIME,
  moduleEndTime: 0,
  breakTimer: BASIC_BREAK_TIME,
  extraBreakTimer: BASIC_BREAK_TIME / 2,
  questions: {
    reading1: [],
    reading2: [],
    math1: [],

    math2: [],
  },
  answers: [],
  crossedOptions: [],
  selection: {
    order: -1,
    selectionText: "",
    leftOrRight: "left",
  },
  annotations: {
    isAnnotationEnabled: false,
    saved: {
      reading1: [],
      reading2: [],
      math1: [],
      math2: [],
    },
  },
  bookMarks: [],
} as TestProblemState;

export const testQuestionSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    resetTestProblemSlice: () => initialState,
    resumeMockTest: (
      state,
      action: PayloadAction<{
        data: {
          answers: {
            math_mode1: {
              order: number;
              answer: string | null;
              time_spent: string | null;
            }[];
            math_mode2: {
              order: number;
              answer: string | null;
              time_spent: string | null;
            }[];
            read_mode1: {
              order: number;
              answer: string | null;
              time_spent: string | null;
            }[];
            read_mode2: {
              order: number;
              answer: string | null;
              time_spent: string | null;
            }[];
          };
          breaks: {
            section: number | null;
            module: number | null;
          };
          questions: {
            math_mode1: testQuestion[];
            math_mode2: testQuestion[];
            read_mode1: testQuestion[];
            read_mode2: testQuestion[];
          };
          remaining_time: {
            math_mode1: number;
            math_mode2: number;
            read_mode1: number;
            read_mode2: number;
          };
        };
        mocktestId: number;
      }>,
    ) => {
      const { answers, breaks, questions, remaining_time } =
        action.payload.data;
      // mockTestId
      state.mockTestId = action.payload.mocktestId;

      // questions
      state.questions.math1 = questions.math_mode1;
      state.questions.math2 = questions.math_mode2;
      state.questions.reading1 = questions.read_mode1;
      state.questions.reading2 = questions.read_mode2;

      // currentmodule
      let theCurrentModule =
        remaining_time.read_mode1 !== 0
          ? "reading1"
          : remaining_time.read_mode2 !== 0
            ? "reading2"
            : remaining_time.math_mode1 !== 0
              ? "math1"
              : "math2";
      state.currentModule = theCurrentModule as testModules;

      // answers
      let theAnswersKey =
        remaining_time.read_mode1 !== 0
          ? "read_mode1"
          : remaining_time.read_mode2 !== 0
            ? "read_mode2"
            : remaining_time.math_mode1 !== 0
              ? "math_mode1"
              : "math_mode2";
      let theAnswers = answers[theAnswersKey as keyof typeof answers].map(
        (ans) =>
          ans.time_spent !== null
            ? {
                ...ans,
                time_spent: parseInt(ans.time_spent),
              }
            : {
                ...ans,
                time_spent: 0,
              },
      );
      state.answers = theAnswers;

      // remaining time
      state.testTimer =
        remaining_time[theAnswersKey as keyof typeof remaining_time] * 1000;
      // break time
      state.breakTimer =
        breaks.section === null
          ? BASIC_BREAK_TIME * 1000
          : breaks.section * 1000;
      state.extraBreakTimer =
        breaks.module === null
          ? (BASIC_BREAK_TIME / 2) * 1000
          : breaks.module * 1000;

      // current question index
      let currentQuestionIndex = 0;
      currentQuestionIndex = theAnswers.findIndex((ans) => ans.answer === null);
      if (currentQuestionIndex === -1) {
        currentQuestionIndex = 0;
      }
      state.currentQuestion = currentQuestionIndex;
    },
    resumeSectionMockTest: (
      state,
      action: PayloadAction<{
        data: {
          answers: {
            order: number;
            answer: string | null;
            time_spent: string | null;
          }[];
          questions: testQuestion[];
          remaining_time: number;
          subject: "Math" | "Reading" | "Writing";
          breaks: {
            module: number | null;
            section: number;
          };
        };
        mocktestId: number;
      }>,
    ) => {
      const { answers, questions, remaining_time, subject } =
        action.payload.data;
      state.mockTestId = action.payload.mocktestId;
      state.questions[subject === "Math" ? "math1" : "reading1"] = questions;
      state.answers = answers.map((ans) => {
        return {
          ...ans,
          time_spent: ans.time_spent ? parseInt(ans.time_spent) : 0,
        };
      });
      state.testTimer = remaining_time * 1000;

      if (subject === "Math") {
        state.currentModule = "math1";
      } else {
        state.currentModule = "reading1";
      }
    },
    setMockTestId: (state, action: PayloadAction<number>) => {
      state.mockTestId = action.payload;
    },
    setCurrentModule: (state, action: PayloadAction<testModules>) => {
      state.currentModule = action.payload;
    },
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestion = action.payload;
    },
    setReading1Questions: (state, action: PayloadAction<testQuestion[]>) => {
      state.questions.reading1 = action.payload;
    },
    setReading2Questions: (state, action: PayloadAction<testQuestion[]>) => {
      state.questions.reading2 = action.payload;
    },
    setMath1Questions: (state, action: PayloadAction<testQuestion[]>) => {
      state.questions.math1 = action.payload;
    },
    setMath2Questions: (state, action: PayloadAction<testQuestion[]>) => {
      state.questions.math2 = action.payload;
    },

    setIsPaused: (
      state,
      action: PayloadAction<{
        isPaused: boolean;
        pauseType: typeof state.pausedStatus.puasedType;
      }>,
    ) => {
      state.pausedStatus.isPaused = action.payload.isPaused;
      state.pausedStatus.puasedType = action.payload.pauseType;
    },
    resetTestTimer: (state) => {
      if (
        state.currentModule === "reading1" ||
        state.currentModule === "reading2"
      ) {
        state.testTimer = BASIC_READING_AND_WRITING_TEST_TIME * 1000;
      } else {
        state.testTimer = BASIC_MATH_TEST_TIME * 1000;
      }
    },
    setTestTime: (state, action: PayloadAction<number>) => {
      state.testTimer = action.payload;
    },
    setEndTime: (state, action: PayloadAction<number>) => {
      state.moduleEndTime = action.payload;
    },

    clearAnswers: (state) => {
      let arr = [];
      for (let i = 0; i < state.questions[state.currentModule].length; i++) {
        arr.push({
          order: i + 1,
          time_spent: 0,
          question_id: state.questions[state.currentModule][i].question_id,
          answer: null,
        });
      }
      state.answers = arr;
    },
    setAnswer: (
      state,
      action: PayloadAction<{
        answer: string | null;
      }>,
    ) => {
      const answer = action.payload.answer;
      const question_id = state.questions[state.currentModule].find(
        (question) => question.order === state.currentQuestion + 1,
      )?.question_id;
      const answerObj = {
        order: state.currentQuestion + 1,
        time_spent: 0,
        question_id: question_id ? question_id : 0,
        answer: answer,
      };
      const index = state.answers.findIndex(
        (ans) => ans.order === state.currentQuestion + 1,
      );
      if (index === -1) {
        state.answers.push(answerObj);
      } else {
        if (state.answers[index].answer !== null && answer === null) {
          answerObj.answer = state.answers[index].answer;
        }
        state.answers[index] = {
          ...answerObj,
          time_spent: state.answers[index].time_spent,
        };
      }
    },
    incrementAnswerTimeSpent: (state) => {
      const order = state.currentQuestion + 1;
      const index = state.answers.findIndex((ans) => ans.order === order);
      if (index !== -1) {
        state.answers[index].time_spent += 1;
      }
    },
    clearCrossedOptions: (state) => {
      state.crossedOptions = [];
    },
    setCrossedOptions: (
      state,
      action: PayloadAction<{
        order: number;
        option: "A" | "B" | "C" | "D";
      }>,
    ) => {
      const { order, option } = action.payload;
      const index = state.crossedOptions.findIndex(
        (ans) => ans.order === order,
      );
      if (index === -1) {
        state.crossedOptions.push({
          order,
          crossOptions: [option],
        });
      } else {
        const crossedOptions = state.crossedOptions[index].crossOptions;
        const optionIndex = crossedOptions.findIndex((opt) => opt === option);
        if (optionIndex === -1) {
          crossedOptions.push(option);
        } else {
          crossedOptions.splice(optionIndex, 1);
        }
      }
    },
    setBookMark: (state) => {
      const id = state.currentQuestion;
      const index = state.bookMarks.findIndex((ans) => ans === id);
      if (index === -1) {
        state.bookMarks.push(id);
      } else {
        state.bookMarks.splice(index, 1);
      }
    },
    clearBookMarks: (state) => {
      state.bookMarks = [];
    },
    setBreakTime: (state, action: PayloadAction<number>) => {
      state.breakTimer = action.payload;
    },
    setExtraBreakTime: (state, action: PayloadAction<number>) => {
      state.extraBreakTimer = action.payload;
    },
    setIsAnnotationEnabled: (state, action: PayloadAction<boolean>) => {
      state.annotations.isAnnotationEnabled = action.payload;
    },
    setSelection: (
      state,
      action: PayloadAction<{
        order: number;
        selectionText: string;
        leftOrRight: "left" | "right";
      }>,
    ) => {
      state.selection = action.payload;
    },
    addAnnotation: (
      state,
      action: PayloadAction<{
        order: number;
        selectionText: string;
        annotation: string;
        leftOrRight: "left" | "right";
      }>,
    ) => {
      const { order, selectionText, annotation, leftOrRight } = action.payload;
      state.annotations.saved[state.currentModule].push({
        order,
        selectionText,
        annotation,
        leftOrRight,
      });
    },
    updateAnnotation: (
      state,
      action: PayloadAction<{
        order: number;
        selectionText: string;
        annotation: string;
        leftOrRight: "left" | "right";
      }>,
    ) => {
      let newArr = state.annotations.saved[state.currentModule];
      const { order, selectionText, annotation, leftOrRight } = action.payload;
      newArr = newArr.map((anno) => {
        if (anno.order === order && anno.selectionText === selectionText) {
          return {
            ...anno,
            annotation,
            leftOrRight,
          };
        } else {
          return anno;
        }
      });
      state.annotations.saved[state.currentModule] = newArr;
    },
    removeAnnotation: (
      state,
      action: PayloadAction<{ order: number; selectionText: string }>,
    ) => {
      const { order, selectionText } = action.payload;

      state.annotations.saved[state.currentModule] = state.annotations.saved[
        state.currentModule
      ].filter((annotation) => {
        return (
          annotation.order !== order ||
          annotation.selectionText !== selectionText
        );
      });
    },
  },
});
// thunks

export const asyncSetCurrentQuestion = createAsyncThunk(
  "test/setCurrentQuestionAsync",
  async (question: number, { dispatch }) => {
    dispatch(setCurrentQuestion(question));
    dispatch(setAnswer({ answer: null }));
  },
);
export const {
  resetTestProblemSlice,
  resumeMockTest,
  resumeSectionMockTest,
  setMockTestId,
  setCurrentModule,
  setCurrentQuestion,
  clearAnswers,
  setAnswer,
  setBookMark,
  clearBookMarks,
  addAnnotation,
  removeAnnotation,
  setIsAnnotationEnabled,
  setSelection,
  updateAnnotation,
  clearCrossedOptions,
  setCrossedOptions,
  resetTestTimer,
  setTestTime,
  setEndTime,
  setBreakTime,
  setExtraBreakTime,
  setIsPaused,
  setReading1Questions,
  setReading2Questions,
  setMath1Questions,
  setMath2Questions,
  incrementAnswerTimeSpent,
} = testQuestionSlice.actions;
export default testQuestionSlice.reducer;
