"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

// import Image from "next/image";
// images
// import MascotBright from "@/public/mascot/mascot_bright.webp";

import AITutorExpand from "@/public/aitutor/expand.svg";
// redux
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  toggleIsExpand,
  toggleIsOpen,
  setIsInPractice,
  setHasNotification,
} from "@/redux/features/assistant/assistantSlice";
// components
import ChatBox from "./chatBox/ChatBox";
import ChatInput from "./ChatInput";

type Props = {};

const AITutor = (props: Props) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const {
    isExpand,
    isInPractice,
    isOpen,
    notifications: { hasNotification, notificationCount },
  } = useAppSelector((state) => state.assistantReducer);

  useEffect(() => {
    dispatch(
      setIsInPractice(
        (pathname.includes("/practice") || pathname.includes("/exp")) &&
          !pathname.includes("/report/"),
      ),
    );
    dispatch(toggleIsExpand(pathname.includes("/report/")));
  }, [pathname]);
  const [practiceAnimationPhase, setPracticeAnimationPhase] =
    useState<number>(0);
  useEffect(() => {
    if (isOpen && isInPractice && hasNotification) {
      setPracticeAnimationPhase(1);
      setTimeout(() => {
        setPracticeAnimationPhase(2);
        dispatch(
          setHasNotification({
            hasNotification: false,
            notificationCount: 0,
          }),
        );
        setTimeout(() => {
          setPracticeAnimationPhase(0);
        }, 1500);
      }, 1800);
    }
  }, [isOpen]);
  return (
    <div
      className={`z-50 h-[99dvh] min-w-[260px] overflow-hidden p-[1%] transition-all duration-75 ease-in-out lg:p-8 print:hidden dark:[&_*]:text-[#CACACA] ${
        isExpand ? "w-[75%] max-w-[1000px]" : "w-[22%] max-w-[500px]"
      } ${pathname === "/practice" && !isOpen ? "!h-0 !w-0 !min-w-0 !p-0" : ""} ${pathname === "/exp-test-report" && "hidden"} `}
    >
      <div className="mb-4 w-full overflow-hidden rounded-[20px] bg-gradientAI p-px">
        <div className="relative flex h-[calc(100dvh-5.5rem)] w-full flex-col items-start justify-end rounded-[19px] bg-white p-2 dark:bg-wisdome-dark-bg">
          {/* header */}
          <div className="grid w-full grid-cols-3 px-1 pb-3 pt-1">
            <button
              className={`relative z-[999] w-fit transition-all duration-1000 ${isInPractice && practiceAnimationPhase === 1 ? "left-[150%] top-[50dvh] -translate-x-1/2 -translate-y-1/2 scale-[200%]" : "left-[0%] top-[0dvh] translate-x-0 translate-y-0 scale-[100%]"}`}
              type="button"
              title="_"
              onClick={() => {
                dispatch(toggleIsOpen());
              }}
            >
              <video
                preload="auto"
                width={56}
                height={56}
                loop={true}
                autoPlay
                muted
                playsInline
                className={`transition-all duration-150`}
              >
                <source
                  src="/practice/mascot/compressed/mascot_body.webm"
                  type="video/webm"
                />
              </video>
              <video
                preload="auto"
                width={22.4}
                loop={true}
                autoPlay
                muted
                playsInline
                className={`absolute left-1/2 top-[30%] -translate-x-1/2 ${isInPractice && practiceAnimationPhase > 0 ? "opacity-0" : "opacity-100"} `}
              >
                <source
                  src="/practice/mascot/compressed/eyes_default.webm"
                  type="video/webm"
                />
              </video>
              {isInPractice && practiceAnimationPhase > 0 && (
                <video
                  preload="auto"
                  width={22.4}
                  loop={true}
                  autoPlay
                  muted
                  playsInline
                  className={`absolute left-1/2 top-[30%] -translate-x-1/2`}
                >
                  <source
                    src="/practice/mascot/compressed/eyes_wink.webm"
                    type="video/webm"
                  />
                </video>
              )}
            </button>

            <div className="flex items-center justify-center text-base font-bold leading-none text-[#1F1F1F]">
              Pixie
            </div>
            <button
              className="flex items-center justify-end"
              type="button"
              title="expand"
              onClick={() => dispatch(toggleIsExpand(!isExpand))}
            >
              <AITutorExpand className="text-xl" />
            </button>
          </div>
          {/* chat box */}
          <ChatBox />
          {/* input */}
          <ChatInput />
        </div>
      </div>
      {/* <div className=" flex h-fit w-full items-center justify-center">
        <div>help</div>
      </div> */}
    </div>
  );
};

export default AITutor;
