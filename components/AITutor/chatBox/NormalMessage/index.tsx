"use client";
import React, { useState } from "react";
import MdxDisplay from "@/components/common/mdx/MdxDisplay";
import ReportBar from "../ReportBar";
import ReportPopup from "../ReportPopup";
import { Message } from "@/types/assistant";

type Props = {
  msg: Message;
  index?: number;
};

const NormalMessage = ({ msg, index }: Props) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  return (
    <div
      id={`${msg.content}-${msg.sender}-${index}`}
      key={`${msg.content}-${msg.sender}-${index}`}
      className={` group relative  flex flex-col justify-start gap-2  ${
        msg.sender === "assistant" ? "items-start" : "items-end"
      }`}
    >
      <ReportPopup
        msg={msg}
        explanation_part={null}
        show={isReportOpen}
        setShow={setIsReportOpen}
      />
      {msg.title !== "" && msg.title !== null && msg.title && (
        <div className="aitutorChatBox absolute -top-2 left-[0.05rem] z-50 w-fit overflow-hidden rounded-[5px] rounded-bl-none p-px">
          <div className=" rounded-[4px] rounded-bl-none bg-white px-2 py-1 text-sm  font-bold leading-none text-[#252525] dark:bg-[#252525]">
            {msg.title}
          </div>
        </div>
      )}
      {/* content */}
      <div
        className={` m-px my-1 h-fit w-fit overflow-hidden rounded-xl   p-px dark:border-[#CACACA] dark:bg-wisdome-dark-bg       ${msg.sender === "assistant" ? "aitutorChatBox rounded-bl-none" : "rounded-br-none !bg-[#8572C6] text-white dark:!bg-[#4B4465]"}  ${msg.title !== "" && msg.title !== null && msg.title && "rounded-tl-none !pt-[1.5px]"}`}
      >
        <div
          className={`h-fit w-full rounded-[0.7rem] bg-white p-2.5 text-sm  [&_*]:break-words ${msg.title !== "" && msg.title !== null && msg.title && "pt-4"} text-[#232323] dark:bg-wisdome-dark-bg    ${msg.sender === "assistant" ? "rounded-bl-none " : "rounded-br-none !bg-[#8572C6] !text-white dark:!bg-[#4B4465]  dark:text-white"}`}
        >
          <MdxDisplay mdxString={msg.content as string} />
        </div>
      </div>
      {msg.sender === "assistant" && (
        <ReportBar
          isReportOpen={isReportOpen}
          setIsReportOpen={setIsReportOpen}
        />
      )}
    </div>
  );
};

export default NormalMessage;
