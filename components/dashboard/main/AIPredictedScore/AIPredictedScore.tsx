"use client";
// force branch merge
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Image from "next/image";
import ScoreDisplay from "./scoreDisplay/ScoreDisplay";
import Lottie from "lottie-react";
import NoScoreBright from "@/public/animation/dashboard/no-score_bright.json";
import NoScoreDark from "@/public/animation/dashboard/no-score_dark.json";
import { MdArrowForward } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// animation data
import Low from "@/public/animation/prediction-score/low.json";
import Medium from "@/public/animation/prediction-score/mid.json";
import High from "@/public/animation/prediction-score/high.json";
import Top from "@/public/animation/prediction-score/top.json";
// images
import StarDark from "/public/dashboard/bg/star_dark.webp";
import StarBright from "/public/dashboard/bg/star_bright.webp";
import InfoIcon from "/public/test-center/mock-test/information.svg";
// redux
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  setSAT,
  setACT,
  setMath,
  setReading,
  setWriting,
} from "@/redux/features/user/scoreSlice";
import {
  setIsAssesment,
  setShowMascotAnimation,
  setCurrent,
  resetAssessment,
} from "@/redux/features/user/assesmentSlice";
import { setIsOnBoarding } from "@/redux/features/user/onBoardingSlice";
const AIPredictedScore = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { sat, act } = useAppSelector((state) => state.scoreReducer);
  const { isExpand } = useAppSelector((state) => state.assistantReducer);

  const { data, isLoading } = useQuery({
    queryKey: ["score"],
    queryFn: (): Promise<{
      data: {
        sat: number;
        act: number;
        math: number;
        reading: number;
        writing: number;
      };
    }> =>
      axios.get("/dashboard/score/", {
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }),
  });
  useEffect(() => {
    if (isLoading) return;
    if (data !== undefined) {
      dispatch(setSAT(data.data.sat));
      dispatch(setACT(data.data.act));
      dispatch(setMath(data.data.math));
      dispatch(setReading(data.data.reading));
      dispatch(setWriting(data.data.writing));
    }
  }, [data]);
  return (
    <div
      onClick={() => {
        if (process.env.NEXT_PUBLIC_DEV_MODE === "true") {
          dispatch(resetAssessment());
          dispatch(setIsOnBoarding(true));
        }
      }}
      className="relative flex items-center justify-between overflow-hidden rounded-[20px] bg-gradient-to-r from-[#785FBB] to-[#4C3C78] p-5 transition-all dark:from-[#785FBB]/50 dark:to-[#4C3C78]/50"
    >
      <Image
        src={StarDark}
        alt=""
        className={`absolute left-[25%] top-2/3 w-72 -translate-y-1/2 ${theme === "dark" ? "opacity-100" : "opacity-0"} pointer-events-none`}
      />
      <Image
        src={StarBright}
        alt=""
        className={`absolute left-[25%] top-2/3 w-72 -translate-y-1/2 ${theme === "dark" ? "opacity-0" : "opacity-100"} pointer-events-none`}
      />
      <div className="flex items-center justify-start gap-14">
        <div>
          <div className="mb-1 flex items-center justify-start gap-2 font-semibold text-[#B39BF3]">
            <div className="w-fit whitespace-nowrap text-4xl">
              AI Predicted Score
            </div>
            <div className="group relative w-fit">
              <InfoIcon className="text-2xl [&_*]:fill-[#D1C0FF]" />
              <div
                className={`absolute left-[115%] top-1/2 z-50 rounded-lg bg-white p-3 opacity-0 shadow-sm shadow-[#D9D9D9] transition-all -translate-y-1/2 group-hover:opacity-100 min-[1500px]:bg-transparent min-[1500px]:shadow-none [&>p]:whitespace-nowrap [&>p]:text-start [&>p]:text-sm [&>p]:text-[#785FBB] min-[1500px]:[&>p]:text-[#D1C0FF] ${isExpand && "!bg-white !shadow-[#D9D9D9] [&>p]:!text-[#785FBB]"}`}
              >
                <p className="mb-1">Your actual score might be different.</p>
                <p>*Reference: 2018 ACT/SAT concordance tables.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start text-3xl font-medium text-[#B39BF3]">
            SAT <MdArrowForward /> ACT:{" "}
            {act !== 0 ? (
              <div className="relative ml-3 flex aspect-video w-fit items-center justify-center rounded-full bg-gradient-to-l from-white to-[#856FC2] p-[1.5px]">
                <div className="flex aspect-[2/1] size-full min-w-[2.8rem] items-center justify-center rounded-full bg-[#785FBB] px-2 py-1 text-2xl font-medium text-white dark:bg-[#785FBB7D]">
                  {act}
                </div>
              </div>
            ) : (
              <div className="px-2 text-white">N/A</div>
            )}
          </div>
        </div>
      </div>
      {sat !== 0 ? (
        <div className="relative flex items-center justify-center">
          <ScoreDisplay score={sat} />
          <div className="h-auto w-14 self-start">
            <Lottie
              loop={true}
              animationData={
                sat <= 1190
                  ? Low
                  : sat <= 1390
                    ? Medium
                    : sat <= 1500
                      ? High
                      : Top
              }
            />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setIsAssesment(true));
          }}
        >
          <Lottie
            animationData={theme === "dark" ? NoScoreDark : NoScoreBright}
          />
        </button>
      )}
    </div>
  );
};
// <div className="[&>p]:text-end [&>p]:text-sm [&>p]:text-white">
//   <p className="mb-2">Your actual score might be different.</p>
//   <p>*Reference: 2018 ACT/SAT concordance tables</p>
// </div>
export default AIPredictedScore;
