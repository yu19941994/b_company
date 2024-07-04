import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types
import {
  AssistantContext,
  QueriedQuestion,
  Message,
  AssistantExplanation,
} from "@/types/assistant";

type AssistantState = {
  context: AssistantContext;
  hasNotification: boolean;
  notifications: {
    hasNotification: boolean;
    notificationCount: number;
  };

  isMessagePending: boolean;
  isInPractice: boolean;
  isOpen: boolean;

  isExpand: boolean;
  isExplaining: boolean;
  expalnation: string;
  messages: Message[];
  queriedQuestions: {
    currentQuestionId: number;
    questions: QueriedQuestion[];
  };
};

const initialState: AssistantState = {
  context: "",
  hasNotification: false,
  notifications: {
    hasNotification: false,
    notificationCount: 0,
  },
  isMessagePending: false,
  isExpand: false,
  isInPractice: false,
  isOpen: false,
  isExplaining: false,
  queriedQuestions: {
    currentQuestionId: 0,
    questions: [],
  },

  messages: [
    {
      id: 0,
      sender: "assistant",
      content: "Hello! I am your SAT assistant. How can I help you?",
      isTyping: true,
      isExpanded: true,
    },
  ],
  expalnation: "",
};

export const assistantSlice = createSlice({
  name: "assistant",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
    resetMessages: (state) => {
      localStorage.removeItem("chat_session_id");
      state.messages = initialState.messages;
    },
    setContext: (state, action: PayloadAction<AssistantContext>) => {
      state.context = action.payload;
    },
    setHasNotification: (
      state,
      action: PayloadAction<AssistantState["notifications"]>,
    ) => {
      state.notifications = action.payload;
    },
    toggleIsMessagePending: (state, action: PayloadAction<boolean>) => {
      state.isMessagePending = action.payload;
    },
    setIsInPractice: (state, action: PayloadAction<boolean>) => {
      state.isInPractice = action.payload;
    },
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    toggleIsExpand: (state, action: PayloadAction<boolean>) => {
      state.isExpand = action.payload;
    },
    toggleIsExplaining: (state, action: PayloadAction<boolean>) => {
      state.isExplaining = action.payload;
    },
    // queried questions
    setQueriedQuestions: (state, action: PayloadAction<QueriedQuestion[]>) => {
      state.queriedQuestions.questions = action.payload;
    },
    setCurrentQuestionId: (state, action: PayloadAction<number>) => {
      state.queriedQuestions.currentQuestionId = action.payload;
    },
    addMessage: (
      state,
      action: PayloadAction<{
        question_id?: number;
        content: Message["content"];
        sender: "assistant" | "user";
        isExpanded?: boolean;
        title?: string;
      }>,
    ) => {
      const { sender, isExpanded, title, question_id } = action.payload;
      state.messages.push({
        ...action.payload,
        isTyping: sender === "assistant" ? true : false,
        id: state.messages.length,
        question_id: question_id ? question_id : 0,
        isExpanded: isExpanded ? isExpanded : true,
        title: title ? title : "",
      });
    },
    setIsExplanationIsExpanded: (
      state,
      action: PayloadAction<{
        messageId: number;
        key: "summary" | "A" | "B" | "C" | "D";
        isExpanded?: boolean;
      }>,
    ) => {
      const { messageId, key, isExpanded } = action.payload;
      if (typeof state.messages[messageId].content !== "string") {
        (state.messages[messageId].content as AssistantExplanation)[
          key
        ].isExpanded = isExpanded
          ? isExpanded
          : !(state.messages[messageId].content as AssistantExplanation)[key]
              .isExpanded;
      }
    },
    setIsMesageTyping: (
      state,
      action: PayloadAction<{ isTyping: boolean; messageId: number }>,
    ) => {
      const { isTyping, messageId } = action.payload;
      state.messages[messageId].isTyping = isTyping;
    },
  },
});

export const {
  clearMessages,
  resetMessages,
  setContext,
  setHasNotification,
  toggleIsMessagePending,
  toggleIsOpen,
  toggleIsExpand,
  toggleIsExplaining,
  setQueriedQuestions,
  setCurrentQuestionId,
  addMessage,
  setIsExplanationIsExpanded,
  setIsMesageTyping,
  setIsInPractice,
} = assistantSlice.actions;
export default assistantSlice.reducer;
