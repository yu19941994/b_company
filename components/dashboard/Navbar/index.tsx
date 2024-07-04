"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { animated, useSpring, config } from "@react-spring/web";
import _ from "lodash";
// imagesp
import LogoIcon from "/public/logo/logo_color.webp";
import HomeActiveIcon from "@/public/icons/dashboard/navbar/home_active.svg";
import HomeDisabledIcon from "@/public/icons/dashboard/navbar/home_disabled.svg";
import MathActiveIcon from "@/public/icons/dashboard/navbar/math_active.svg";
import MathDisabledIcon from "@/public/icons/dashboard/navbar/math_disabled.svg";
import ReadingActiveIcon from "@/public/icons/dashboard/navbar/reading_active.svg";
import ReadingDisabledIcon from "@/public/icons/dashboard/navbar/reading_disabled.svg";
import WritingActiveIcon from "@/public/icons/dashboard/navbar/writing_active.svg";
import WritingDisabledIcon from "@/public/icons/dashboard/navbar/writing_disabled.svg";
import ReViewActiveIcon from "@/public/icons/dashboard/navbar/review-report_active.svg";
import ReViewDisabledIcon from "@/public/icons/dashboard/navbar/review-report_disabled.svg";
import TestCenterActiveIcon from "@/public/icons/dashboard/navbar/test-center_active.svg";
import TestCenterDisabledIcon from "@/public/icons/dashboard/navbar/test-center_disabled.svg";
import VocabActiveIcon from "@/public/icons/dashboard/navbar/vocab_active.svg";
import VocabDisabledIcon from "@/public/icons/dashboard/navbar/vocab_disabled.svg";
import MoreHorizIcon from "@/public/icons/dashboard/more_horiz.svg";
import AvatarIcon from "@/public/icons/avatar/avatar_yellow.svg";
import SunIcon from "@/public/theme/sun.svg";
import MoonIcon from "@/public/theme/moon.svg";
//new icon
import OverviewIcon from "/public/icons/navbar/overview.svg";
import ClassIcon from "/public/icons/navbar/class.svg";
// redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setNavbarTab } from "@/redux/features/dashboard/dashboardSlice";

// components
import * as Switch from "@radix-ui/react-switch";

// type
import { NavbarTabs } from "@/types/dashboard";
type Props = {};

const Navbar = (props: Props) => {
  const { theme, setTheme } = useTheme();
  // router
  const router = useRouter();
  const pathName = usePathname();
  const { pathname } = useAppSelector((state) => state.routeReducer);
  const animateProps = useSpring({
    height: pathname.includes("/dashboard") ? 195 : 0,
    opacity: pathname.includes("/dashboard") ? 1 : 0,
  });

  // redux
  const dispatch = useAppDispatch();
  const newNavbarTabs = [
    {
      icon: <OverviewIcon className="text-lg" />,
      route: "/dashboard",
      name: "overview",
    },
    {
      icon: <TestCenterActiveIcon className="text-lg" />,
      route: "/test-center",
      name: "test",
    },
    {
      icon: <ReViewActiveIcon className="text-lg" />,
      route: "/report-center",
      name: "report",
    },
  ];
  const subjectTabs = [
    {
      icon: <MathActiveIcon className="text-lg" />,
      route: "/dashboard/math",
      name: "math",
    },
    {
      icon: <ReadingActiveIcon className="text-lg" />,
      route: "/dashboard/reading",
      name: "reading",
    },
    {
      icon: <WritingActiveIcon className="text-lg" />,
      route: "/dashboard/writing",
      name: "writing",
    },
  ];
  return (
    <div className="flex h-full min-h-screen min-w-[76px] flex-col items-center justify-between overflow-x-hidden border-r border-r-[#785FBB80] bg-[#F6F8F8] pb-8 pt-7 dark:bg-wisdome-gray-700/90 print:!hidden">
      <div className="">
        <button
          onClick={() => router.push("/dashboard")}
          className="mx-auto mb-10 flex aspect-square size-10 cursor-pointer items-center justify-center rounded-full"
        >
          <Image
            src={LogoIcon}
            alt=""
            width={32}
            height={32}
            priority
            loading="eager"
          />
        </button>
        <div className="relative flex flex-col items-center justify-start">
          {newNavbarTabs.map((item, index) => (
            <>
              <Link
                prefetch={true}
                href={`${item.route}`}
                onClick={(e) => {
                  dispatch(setNavbarTab(item.route));
                  if (pathName === "/practice") {
                    e.preventDefault();
                    return;
                  }
                }}
                key={item.name + index}
                title="dashboard"
                type="button"
                className={`group flex w-full flex-col items-stretch justify-center p-3`}
              >
                <div
                  className={`mb-[2px] flex w-full flex-1 items-center justify-center rounded-full bg-transparent px-2 py-[0.150rem] transition-all duration-300 group-hover:bg-[#E7DAEC] group-hover:[&_svg_*]:fill-[#785FBB] ${
                    pathName === item.name ? "!bg-[#E7DAEC]" : ""
                  }`}
                >
                  {item.icon}
                </div>
                <div
                  className={`leadding-none w-full flex-1 text-center text-xs transition-all duration-300 group-hover:text-[#E7DAEC] ${
                    pathName === item.name
                      ? "!text-[#785FBB]"
                      : "text-[#A2A2A2]"
                  }`}
                >
                  {_.upperFirst(item.name)}
                </div>
              </Link>
              {/* subjects */}
              {index === 0 && (
                <animated.div
                  style={animateProps}
                  className={`relative flex w-full flex-col items-center justify-start overflow-hidden bg-[#CDC2EB]`}
                >
                  {subjectTabs.map((item, index) => (
                    <Link
                      prefetch={true}
                      href={`${item.route}`}
                      onClick={(e) => {
                        dispatch(setNavbarTab(item.route));
                        if (pathName === "/practice") {
                          e.preventDefault();
                          return;
                        }
                      }}
                      key={item.name + index}
                      title="dashboard"
                      type="button"
                      className={`group flex w-full flex-col items-stretch justify-center p-3`}
                    >
                      <div
                        className={`mb-[2px] flex w-full flex-1 items-center justify-center rounded-full bg-transparent px-2 py-[0.150rem] transition-all duration-300 group-hover:bg-[#E7DAEC] group-hover:[&_svg_*]:fill-[#785FBB] ${
                          pathName === item.name ? "!bg-[#E7DAEC]" : ""
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div
                        className={`leadding-none w-full flex-1 text-center text-xs transition-all duration-300 group-hover:text-[#E7DAEC] ${
                          pathName === item.name
                            ? "!text-[#785FBB]"
                            : "text-[#A2A2A2]"
                        }`}
                      >
                        {_.upperFirst(item.name)}
                      </div>
                    </Link>
                  ))}
                </animated.div>
              )}
            </>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <Link
          prefetch
          href={"/profile"}
          type="button"
          title="user"
          className={`rounded-full border-4 border-transparent ${pathName.includes("profile") && "!border-[#8A72CA]"}`}
        >
          <AvatarIcon className="text-4xl" />
        </Link>
        <Switch.Root
          checked={theme === "light"}
          onCheckedChange={(e) => {
            setTheme(e ? "light" : "dark");
          }}
          className="relative h-5 w-full cursor-pointer rounded-full bg-[#4F3791] outline-none transition-all data-[state=checked]:bg-[#8A72CA]"
          id="theme-toggle"
        >
          <Switch.Thumb className="flex size-5 items-center justify-center rounded-full bg-white bg-themeSwitchDark p-px transition-transform duration-100 will-change-transform translate-x-0 data-[state=checked]:bg-themeSwitchLight data-[state=checked]:translate-x-[120%]">
            <div className="">
              {" "}
              {theme === "light" ? (
                <SunIcon className="text-xl" />
              ) : (
                <MoonIcon className="text-xl" />
              )}
            </div>
          </Switch.Thumb>
        </Switch.Root>
        {/* <button
					type="button"
					title="more">
					<MoreHorizIcon />
				</button> */}
      </div>
    </div>
  );
};

export default Navbar;
