"use client";
import React, { useState, useEffect, Fragment } from "react";
import mdxdispayStyles from "./mdxdisplay-style.module.css";
// import "github-markdown-css/github-markdown.css";
// import "github-markdown-css/github-markdown-dark.css";
// import "github-markdown-css/github-markdown-light.css";
// mdx
import "katex/dist/katex.min.css";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeMathjax from "rehype-mathjax";
type Props = {
  mdxString: string;
  setIsMdxFinishedRendered?: React.Dispatch<React.SetStateAction<boolean>>;
};
/**
 * Replaces newline characters outside of dollar expressions with the HTML <br/> tag.
 * @param text - The input text that may contain newline characters.
 * @returns A string with newline characters outside of dollar expressions replaced with the HTML <br/> tag.
 */
function replaceNewlinesOutsideDollarExpressions(text: string): string {
  let insideDollarExpression = false;

  //  check wether the text includes dollar sign
  return String(text)
    .split("$")
    .map((segment, index) => {
      insideDollarExpression = index % 2 === 1;
      return insideDollarExpression
        ? segment
        : segment.replaceAll(/\\n/g, `\n`);
    })
    .join("$");
}
const MdxDisplay = ({ mdxString, setIsMdxFinishedRendered }: Props) => {
  console.log("mdxModule", mdxString);
  // mdx
  const [mdxModule, setMdxModule] = useState<any>();
  const Content = mdxModule ? mdxModule.default : Fragment;
  let checkString = mdxString ? mdxString : "";
  useEffect(
    function () {
      (async function () {
        const reg = new RegExp(/(?<!\|)\\n(?! *\|)/g);

        let str: string = replaceNewlinesOutsideDollarExpressions(checkString)
          ? replaceNewlinesOutsideDollarExpressions(checkString)
          : checkString.replace(reg, `\n`);

        const code = String(
          await compile(str, {
            outputFormat: "function-body",
            rehypePlugins: [rehypeKatex, rehypeMathjax],
            remarkPlugins: [remarkMath, remarkGfm],
          }),
        );
        // console.log("code and string", code, str);
        setMdxModule(
          await run(code, {
            ...(runtime as any),
            baseUrl: import.meta.url,
            Fragment,
          }),
        );
      })();
    },
    [mdxString],
  );
  useEffect(() => {
    setIsMdxFinishedRendered && setIsMdxFinishedRendered(false);
    if (Content !== Fragment) {
      setIsMdxFinishedRendered && setIsMdxFinishedRendered(true);
    } else {
      setIsMdxFinishedRendered && setIsMdxFinishedRendered(false);
    }
  }, [mdxModule]);
  return (
    <div className={`${mdxdispayStyles.mdxdisplay} justify-start text-start`}>
      <Content />
    </div>
  );
};

export default MdxDisplay;
