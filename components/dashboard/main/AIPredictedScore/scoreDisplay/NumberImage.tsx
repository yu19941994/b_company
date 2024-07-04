"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useSpring, animated } from "@react-spring/web";
import { useTheme } from "next-themes";

// new
import Bright1 from "@/public/dashboard/score-number/bright/1_bright.webp";
import Bright2 from "@/public/dashboard/score-number/bright/2_bright.webp";
import Bright3 from "@/public/dashboard/score-number/bright/3_bright.webp";
import Bright4 from "@/public/dashboard/score-number/bright/4_bright.webp";
import Bright5 from "@/public/dashboard/score-number/bright/5_bright.webp";
import Bright6 from "@/public/dashboard/score-number/bright/6_bright.webp";
import Bright7 from "@/public/dashboard/score-number/bright/7_bright.webp";
import Bright8 from "@/public/dashboard/score-number/bright/8_bright.webp";
import Bright9 from "@/public/dashboard/score-number/bright/9_bright.webp";
import Bright0 from "@/public/dashboard/score-number/bright/0_bright.webp";

import Dark1 from "@/public/dashboard/score-number/dark/1_dark.webp";
import Dark2 from "@/public/dashboard/score-number/dark/2_dark.webp";
import Dark3 from "@/public/dashboard/score-number/dark/3_dark.webp";
import Dark4 from "@/public/dashboard/score-number/dark/4_dark.webp";
import Dark5 from "@/public/dashboard/score-number/dark/5_dark.webp";
import Dark6 from "@/public/dashboard/score-number/dark/6_dark.webp";
import Dark7 from "@/public/dashboard/score-number/dark/7_dark.webp";
import Dark8 from "@/public/dashboard/score-number/dark/8_dark.webp";
import Dark9 from "@/public/dashboard/score-number/dark/9_dark.webp";
import Dark0 from "@/public/dashboard/score-number/dark/0_dark.webp";

// types

const brights = [
  Bright0,
  Bright1,
  Bright2,
  Bright3,
  Bright4,
  Bright5,
  Bright6,
  Bright7,
  Bright8,
  Bright9,
];

const darks = [
  Dark0,
  Dark1,
  Dark2,
  Dark3,
  Dark4,
  Dark5,
  Dark6,
  Dark7,
  Dark8,
  Dark9,
];

const images: Images = {
  bright: brights,
  dark: darks,
};
type Images = {
  bright: StaticImageData[];
  dark: StaticImageData[];
};
type Props = {
  delay: number;

  index: number;
};

const NumberImage = ({ delay, index }: Props) => {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const props = useSpring({
    y: isLoaded ? 0 : 200,
    rotateY: isLoaded ? 0 : 360,
    delay: delay * 1000,
  });

  const th = theme === "dark" ? "dark" : "bright";
  return (
    <animated.div style={props}>
      <Image
        priority={true}
        quality={100}
        loading="eager"
        className="pointer-events-none select-none object-cover opacity-100 drop-shadow-[2.19px_2.19px_0.73px_rgba(0,0,0,0.25)]  transform-style-3d"
        height={index === 1 || index === 2 ? 76 : 78}
        alt=""
        src={images[th][index]}
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
    </animated.div>
  );
};

export default NumberImage;
