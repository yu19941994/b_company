"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { MdOutlineClose } from "react-icons/md";
import Image from "next/image";
import ReportSuccessImage from "/public/aitutor/report/report_success.webp";
import axios from "axios";
import { Message } from "@/types/assistant";

type Props = {
  msg: Message;
  explanation_part: string | null;
  setShow: (val: boolean) => void;
  show: boolean;
};

const options = [
  "The explanation is unclear.",
  "The explanation is incorrect.",
  "Something else is wrong.",
];
const ReportPopup = ({ msg, explanation_part, show, setShow }: Props) => {
  const axios = Axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showTextArea, setShowTextArea] = useState(false);
  const [textareaInput, setTextAreaInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [afterSubmittedTime, setAfterSubmittedTime] = useState(3);
  function handleSubmit() {
    console.log("submitted", errorMessage, textareaInput, explanation_part);
    axios
      .post("/feedback/ai-tutor/", {
        question: msg.question_id ? msg.question_id : null,
        explanation_part: explanation_part ?? "ai-tutor",
        error: errorMessage,
        detail: textareaInput === "" ? null : textareaInput,
      })
      .then((res) => {
        console.log(res);
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitted(true);
      });
  }
  useEffect(() => {
    if (isSubmitted) {
      setInterval(() => {
        setAfterSubmittedTime((prev) => prev - 1);
      }, 1000);
      setTimeout(() => {
        setIsSubmitted(false);
        setShow(false);
      }, 3000);
    }
  }, [isSubmitted]);
  return (
    //   box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
    // box-shadow: 0px 0px 2px 0px #785FBB80;

    <div
      className={`absolute bottom-full  left-0 z-[9999999] w-1/3 min-w-fit rounded bg-white p-3.5   drop-shadow-[0_0_2px_rgba(0,0,0,0.25)] dark:bg-[#232123] dark:drop-shadow-[0_0_2px_#785FBB80] ${show ? "block" : "hidden"}`}
    >
      <div className="absolute right-1.5 top-1.5 flex items-center justify-end gap-2">
        {isSubmitted && (
          <div className="text-sm font-medium leading-none text-[#856FC2]">
            Close in {afterSubmittedTime}
          </div>
        )}
        <button
          className=" aspect-square h-fit w-fit rounded bg-[#F6F8F8] p-0.5 leading-none text-[#785FBB5C] dark:bg-[#785FBB26]"
          onClick={() => {
            setShow(false);
          }}
        >
          <MdOutlineClose />
        </button>
      </div>

      {/* sucess image */}
      <div
        className={`z-[-1] ${isSubmitted ? "h-auto w-full opacity-100" : "pointer-events-none size-0 select-none opacity-0"}`}
      >
        <h3 className="my-5 text-center text-sm font-light leading-none text-[#856FC2]">
          Thank you for your feedback!
        </h3>
        <Image
          src={ReportSuccessImage}
          alt=""
          width={180}
          loading="eager"
          className={`z-[-1] ${isSubmitted ? "h-auto w-full opacity-100" : "size-0 opacity-0"}`}
        />
      </div>

      {!isSubmitted && (
        <>
          <form>
            <RadioGroup.Root
              onValueChange={(val) => {
                setErrorMessage(val);
                console.log("value changed", val);
                val === "Something else is wrong."
                  ? setShowTextArea(true)
                  : setShowTextArea(false);
              }}
              className="z-50"
            >
              {options.map((option, index) => (
                <label
                  htmlFor={`option-${index}`}
                  onClick={() => {
                    console.log("clicked", option);
                  }}
                  key={option}
                  className={`${index !== options.length - 1 ? "mb-2" : showTextArea && "mb-2"} flex cursor-pointer select-none items-center justify-start gap-2`}
                >
                  <RadioGroup.Item
                    id={`option-${index}`}
                    value={option}
                    className="flex size-3 cursor-pointer items-center justify-center rounded-sm border border-[#27272780] dark:border-[#CACACA80]"
                  >
                    <RadioGroup.Indicator className="flex size-3 cursor-pointer items-center justify-center  rounded-sm bg-[#856FC2]" />
                  </RadioGroup.Item>
                  <label
                    htmlFor={`option-${index}`}
                    className="cursor-pointer text-xs font-medium leading-none text-[#232123E5] dark:text-[#CACACAE5]"
                  >
                    {option}
                  </label>
                </label>
              ))}
            </RadioGroup.Root>
          </form>

          {showTextArea && (
            <textarea
              placeholder="write down the issue..."
              onChange={(e) => setTextAreaInput(e.target.value)}
              name=""
              id=""
              className="mb-3 ml-5 aspect-video w-[calc(100%-1.3rem)] max-w-full resize-none rounded-lg border border-[#785FBB94] p-0.5 text-xs dark:bg-[#232123]"
            ></textarea>
          )}
          <div className="mt-2 flex items-center justify-end">
            <button
              type="button"
              className="rounded-full bg-[#785FBB] px-3 py-2 text-xs font-medium text-[#E7DAEC]"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportPopup;
