"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ScrollToBottom, {
  useScrollToBottom,
  useAtBottom,
} from "react-scroll-to-bottom";
import ScrollToBottomComponent from "./ScrollToBottom";
// redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addMessage,
  toggleIsMessagePending,
  setQueriedQuestions,
  setContext,
  toggleIsExpand,
} from "@/redux/features/assistant/assistantSlice";
// components
import TypewriterBox from "./TypewriterBox";

type Props = {};

const  ChatBox = (props: Props) => {
  return (
    <div className=" flex h-[calc(100%-3rem)] w-full flex-col items-start justify-stretch  gap-3 overflow-y-auto   ">
      <ScrollToBottomComponent />
    </div>
  );
};

export default ChatBox;
