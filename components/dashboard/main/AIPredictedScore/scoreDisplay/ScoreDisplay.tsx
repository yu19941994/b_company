"use client";
import React from "react";

// components
import NumberImage from "./NumberImage";
// types
type Props = {
  score: number;
};

const ScoreDisplay = ({ score }: Props) => {
  return (
    <div className="flex h-full flex-1 items-start justify-center gap-1 overflow-hidden ">
      {String(score)
        .split("")
        .map((item, index) => {
          return (
            <NumberImage
              key={index}
              delay={index * 0.1}
              index={parseInt(item)}
            />
          );
        })}
    </div>
  );
};

export default ScoreDisplay;
