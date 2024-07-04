"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetPractice } from "@/redux/features/test/practice/practiceSlice";
import {
  addMessage,
  resetMessages,
  toggleIsExpand,
  setIsInPractice,
} from "@/redux/features/assistant/assistantSlice";
import { setPathname, setPrevUrl } from "@/redux/features/route/routeSlice";
import { resetTestProblemSlice } from "@/redux/features/test/sat-full-length/testProblemSlice";
import {
  changeStatus,
  resetTestSlice,
} from "@/redux/features/test/sat-full-length/testSlice";

export default function NavigationEvents() {
  const { theme } = useTheme();
  const router = useRouter();
  const p = usePathname();
  const searchParams = useSearchParams();

  // redux
  const dispatch = useAppDispatch();
  const { prevUrl, pathname } = useAppSelector((state) => state.routeReducer);

  useEffect(() => {
    console.log(
      "NavigationEvents",
      "p",
      p,
      "pathname",
      pathname,
      "prevUrl",
      prevUrl,
    );
    // if (localStorage.getItem("access_token") === null) {
    //   if (p !== "/" && searchParams.get("goToMockTest") === null) {
    //     router.push("/signin");
    //   }
    //   return;
    // }

    dispatch(setPathname(`${p}?${searchParams}`));
    // console.log("pathname", pathname);
    if (
      prevUrl.includes("/report/practice") &&
      !pathname.includes("/report/practice")
    ) {
      dispatch(resetPractice());
    }

    if (
      (prevUrl.includes("/report/mock-test") &&
        !pathname.includes("/report/mock-test")) ||
      (prevUrl.includes("/report/section-mock-test") &&
        !pathname.includes("/report/section-mock-test"))
    ) {
      dispatch(resetTestProblemSlice());
      dispatch(resetTestSlice());
    }

    if (prevUrl.includes("/report/") || prevUrl.includes("/ability-overview")) {
      console.log(`   prevUrl.includes("/report/") ||
      prevUrl.includes("/ability-overview")`);

      dispatch(resetMessages());
      console.log("reset");
      dispatch(resetTestProblemSlice());
      dispatch(resetTestSlice());
    }

    // if (pathname.includes("/mock-test/") && prevUrl.includes("/report/")) {
    //   router.replace("/test-center");
    // }
    // if (pathname.includes("/test-center")) {
    //   dispatch(resetPractice());
    //   dispatch(resetTestProblemSlice());
    // }
    if (pathname.includes("/report/")) {
      dispatch(toggleIsExpand(true));
    } else {
      dispatch(toggleIsExpand(false));
    }

    if (
      pathname === "/practice" ||
      pathname === "/practice?" ||
      pathname === "/practice/exp" ||
      pathname === "/practice/exp?"
    ) {
      dispatch(setIsInPractice(true));
    } else {
      dispatch(setIsInPractice(false));
    }
    if (searchParams.keys.length < 1) {
      dispatch(resetMessages());
    }

    // const url = `${pathname}?${searchParams}`;
    console.log("pathname", pathname);
    console.log("prevUrl", prevUrl);

    dispatch(setPrevUrl(pathname));
  }, [pathname, prevUrl, p]);

  return null;
}
