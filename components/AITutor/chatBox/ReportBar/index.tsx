"use client";
import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { useDebounceValue } from "usehooks-ts";
// redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { setIsExplanationIsExpanded } from "@/redux/features/assistant/assistantSlice";
import FlagIcon from "@/public/aitutor/flag.svg";
import ThumbsupIcon from "@/public/aitutor/thumbsup.svg";
import { PiThumbsUpBold, PiThumbsUpFill } from "react-icons/pi";
import { Message } from "@/types/assistant";
type Props = {
  msg?: Message;
  key?: "A" | "B" | "C" | "D" | "summary";
  isReportOpen: boolean;
  setIsReportOpen: React.Dispatch<React.SetStateAction<boolean>>;
  index?: number;
  setReportOpenedIndex?: React.Dispatch<React.SetStateAction<number>>;
};

const ReportBar = ({
  msg,
  key,
  isReportOpen,
  setIsReportOpen,
  index,
  setReportOpenedIndex,
}: Props) => {
  const isLoaded = useRef(false);
  const axios = Axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  const dispatch = useAppDispatch();
  const [thumbsuped, setThumbsuped] = useState(false);

  const [debounceIsthumbsUp, setIsthumbsUp] = useDebounceValue(false, 300);

  useEffect(() => {
    if (isLoaded.current && thumbsuped) {
      axios.post("/feedback/ai-tutor/like/", {
        question: msg?.question_id,
        explanation_part: key ?? "ai-tutor",
        detail: debounceIsthumbsUp ? "like" : "unlike",
      });
    } else {
      isLoaded.current = true;
    }
  }, [debounceIsthumbsUp, isLoaded.current]);
  function handleThumbUp() {
    setThumbsuped(!thumbsuped);
    setIsthumbsUp(!thumbsuped);
  }

  return (
    <div className="relative">
      <div className="mb-0 flex !h-0 w-full items-center justify-start gap-2 overflow-hidden opacity-0 transition-all group-hover:mb-3 group-hover:!h-fit group-hover:opacity-100">
        <button onClick={handleThumbUp} className="transition active:scale-90">
          {thumbsuped ? (
            <PiThumbsUpFill className="text-xl text-[#785FBB]" />
          ) : (
            <PiThumbsUpBold className="text-xl text-[#6a6a6a]" />
          )}
        </button>

        {!debounceIsthumbsUp && (
          <button
            onClick={() => {
              index !== undefined &&
                setReportOpenedIndex !== undefined &&
                setReportOpenedIndex(index);
              setIsReportOpen(!isReportOpen);
              // msg &&
              //   key &&
              //   dispatch(
              //     setIsExplanationIsExpanded({
              //       messageId: msg.id,
              //       key: key as "A" | "B" | "C" | "D" | "summary",
              //       isExpanded: true,
              //     }),
              //   );
            }}
          >
            <FlagIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReportBar;
