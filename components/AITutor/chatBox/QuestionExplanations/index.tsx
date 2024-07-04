"use client";
import React, { useState } from "react";

import MdxDisplay from "@/components/common/mdx/MdxDisplay";
import ReportBar from "../ReportBar";
import ReportPopup from "../ReportPopup";
// redux
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
// import { setIsExplanationIsExpanded } from "@/redux/features/assistant/assistantSlice";
import { AssistantExplanation, Message } from "@/types/assistant";
type Props = {
  msg: Message;
};

const QuetionExplanations = ({ msg }: Props) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportOpenedIndex, setReportOpenedIndex] = useState(-1);
  const dispatch = useAppDispatch();
  return (
    <>
      {msg.content &&
        sortedKeys(msg.content as AssistantExplanation).map((key, index) => {
          if (
            typeof msg.content === "object" &&
            msg.content !== null &&
            // @ts-ignore
            msg.content[key as keyof typeof msg.content].content !== null &&
            key !== "question" &&
            key !== "correctAnswer" &&
            key !== "userAnswer"
          ) {
            return (
              <div
                id={`aimessage-explanation-${key}-${index}`}
                key={`${key}-${index}`}
                className={`relative flex flex-col justify-start ${
                  msg.content[key as "A" | "B" | "C" | "D" | "summary"]
                    .isExpanded && "group"
                }`}
              >
                {isReportOpen && index === reportOpenedIndex && key && (
                  <ReportPopup
                    explanation_part={key}
                    msg={msg}
                    setShow={setIsReportOpen}
                    show={isReportOpen && index === reportOpenedIndex}
                  />
                )}
                {/* titile */}
                {key && key !== "question" && (
                  <button
                    type="button"
                    className={`${key === msg.content.userAnswer ? (key === msg.content.correctAnswer ? "!bg-green-500" : "!bg-red-500") : key === msg.content.correctAnswer ? "!bg-green-500" : key !== "summary" ? "!bg-red-500" : "aitutorChatBox"} absolute left-0 top-0 z-50 w-fit overflow-hidden rounded-[5px] rounded-bl-none border-transparent bg-clip-padding !p-px text-sm content-['']`}
                    onClick={() => {
                      // dispatch(
                      //   setIsExplanationIsExpanded({
                      //     messageId: msg.id,
                      //     key: key as "A" | "B" | "C" | "D" | "summary",
                      //   }),
                      // );
                    }}
                  >
                    <div
                      className={
                        "size-full rounded-[4px] rounded-bl-none bg-white px-2 py-1 !text-sm font-bold leading-none text-[#252525] dark:bg-wisdome-dark-bg"
                      }
                    >
                      {key !== "summary" && key !== "question" && "Choice"}{" "}
                      {key !== "question" &&
                        key.charAt(0).toUpperCase() + key.slice(1)}
                    </div>
                  </button>
                )}
                {/* content */}
                <div
                  key={`${key}-${index}`}
                  className={`m-px mb-2 mt-4 w-fit overflow-hidden rounded-xl transition-all duration-75 ${msg.sender === "assistant" ? "rounded-bl-none" : "rounded-br-none"} rounded-tl-none p-px dark:border-[#CACACA] dark:bg-wisdome-dark-bg ${key === msg.content.userAnswer ? (key === msg.content.correctAnswer ? "!bg-green-500" : "!bg-red-500") : key === msg.content.correctAnswer ? "!bg-green-500" : key !== "summary" ? "!bg-red-500" : "aitutorChatBox"} ${
                    msg.content[key as "A" | "B" | "C" | "D" | "summary"]
                      .isExpanded
                      ? "h-[calc(100%)] opacity-100"
                      : "h-[calc(0px)] opacity-0"
                  }`}
                >
                  <div
                    className={`h-fit w-full rounded-[0.7rem] bg-white px-2.5 py-2 pt-4 text-[#232323] dark:bg-wisdome-dark-bg [&_p]:!text-sm ${msg.sender === "assistant" ? "rounded-bl-none" : "rounded-br-none"}`}
                  >
                    <MdxDisplay
                      mdxString={
                        // @ts-ignore
                        msg.content[key as keyof typeof msg.content]?.content
                      }
                    />
                  </div>
                </div>
                <ReportBar
                  isReportOpen={isReportOpen}
                  setIsReportOpen={setIsReportOpen}
                  index={index}
                  setReportOpenedIndex={setReportOpenedIndex}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
    </>
  );
};

export default QuetionExplanations;

function sortedKeys(obj: AssistantExplanation) {
  let arr = Object.keys(obj)
    .filter((itm) => itm !== "summary")
    .sort((a, b) => a.localeCompare(b));
  arr.unshift("summary");
  return arr;
}
