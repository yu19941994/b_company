"use client";
import React, { useState, useEffect, useRef } from "react";
// redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// components
import NormalMessage from "./NormalMessage";
import QuestionExplanations from "./QuestionExplanations";

const ScrollToBottomComponent = () => {
  const aiChatBox = useRef<HTMLDivElement>(null);

  const { messages, isMessagePending } = useAppSelector(
    (state) => state.assistantReducer,
  );

  useEffect(() => {
    if (messages.length) {
      aiChatBox.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, messages.length, isMessagePending]);
  return (
    <div
      ref={aiChatBox}
      id="ai-chat-box"
      className="flex w-full flex-1 flex-col items-stretch justify-end gap-3 bg-white p-1 pt-64 dark:bg-wisdome-dark-bg"
    >
      {messages.map((msg, index) =>
        typeof msg.content === "string" ? (
          <NormalMessage
            msg={msg}
            index={index}
            key={`${msg.content}-${index}`}
          />
        ) : (
          <QuestionExplanations msg={msg} key={`${msg.content}-${index}`} />
        ),
      )}

      <div className="mb-2 flex items-start justify-start">
        {isMessagePending && (
          <div
            className={`aitutorChatBox m-px overflow-hidden rounded-xl p-px dark:border-[#CACACA] dark:bg-wisdome-dark-bg`}
          >
            <div className="size-full rounded-xl bg-white p-3 dark:bg-wisdome-dark-bg">
              <div className="flex items-center justify-center gap-1">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 animate-bounce rounded-full bg-gray-300 ${index == 0 ? "delay-300" : index == 1 ? "delay-500" : "delay-700"} `}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollToBottomComponent;
