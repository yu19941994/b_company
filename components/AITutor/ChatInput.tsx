"use client";
import React, { useState, useRef, useEffect } from "react";
import UAParser from "ua-parser-js";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
// redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addMessage,
  toggleIsMessagePending,
  setQueriedQuestions,
  setContext,
} from "@/redux/features/assistant/assistantSlice";
import TextareaAutosize from "react-textarea-autosize";
// images
import SendIcon from "@/public/aitutor/send.svg";
import MicIcon from "@/public/aitutor/mic.svg";
// types
type Props = {};

const ChatInput = (props: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [disableInput, setDisableInput] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const { messages, isMessagePending, isExpand } = useAppSelector(
    (state) => state.assistantReducer,
  );
  const { questions, current } = useAppSelector(
    (state) => state.practiceRedicer,
  );
  const handleUserMessage = async () => {
    if (message !== "" && message !== "\n") {
      setDisableInput(true);
      dispatch(addMessage({ content: message, sender: "user" }));
      setMessage("");
      dispatch(toggleIsMessagePending(true));
      try {
        const res = await axios.post<{
          content: {
            session_id: string;
            event_name: string | null;
            event: string | null;
            output: string;
          };
          error: string | null;
          user_id: number;
        }>(
          "/ai-tutor/",
          {
            session_id: localStorage.getItem("chat_session_id") ?? null,
            message: message,
            question_id:
              searchParams.get("question_id") !== null &&
              searchParams.get("question_id") !== undefined
                ? searchParams.get("question_id")
                : null,
            user_answer:
              searchParams.get("user_answer") !== null &&
              searchParams.get("user_answer") !== undefined
                ? searchParams.get("user_answer")
                : null,
          },
          {
            baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
          },
        );
        const { data } = res;

        //  hadle response
        dispatch(toggleIsMessagePending(false));
        setDisableInput(false);
        localStorage.setItem("chat_session_id", data.content.session_id);
        dispatch(
          addMessage({ content: data.content.output, sender: "assistant" }),
        );
      } catch (err) {
        dispatch(toggleIsMessagePending(false));
        setDisableInput(false);
        console.error(err);
      }
    }
  };
  // const handleSendMessage = async () => {

  //   if (message !== "" && message !== "\n") {
  //     setDisableInput(true);
  //     setMessage("");
  //     dispatch(addMessage({ content: message, sender: "user" }));

  //     dispatch(toggleIsMessagePending(true));

  //     try {
  //       let res;
  //       if (pathName === "/test-center/practice") {
  //         res = await axios.post(
  //           `/assistant/explanation`,
  //           {
  //             order: questions[current].order,
  //             question_id: questions[current].question_id,
  //             message: message,
  //             thread_id: null,
  //           },
  //           {
  //             baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
  //             headers: {
  //               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //               "Content-Type": "application/json",
  //             },
  //             // withCredentials: true,
  //           },
  //         );
  //       } else {
  //         res = await axios.post(
  //           `/assistant/messages/`,
  //           {
  //             message: message,
  //           },
  //           {
  //             baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
  //             headers: {
  //               Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //               "Content-Type": "application/json",
  //             },
  //             // withCredentials: true,
  //           },
  //         );
  //       }

  //       const { data } = res;
  //       console.log("data", data);
  //       dispatch(setContext(data.assistant_use_case));

  //       // check assistant use case
  //       switch (data.assistant_use_case) {
  //         case "use_case_query_cust_exam":
  //           console.log("use_case_cust_exam");
  //           dispatch(toggleIsMessagePending(false));

  //           dispatch(
  //             addMessage({ content: data.content.text, sender: "assistant" }),
  //           );
  //           dispatch(setQueriedQuestions(data.exam_questions_data));
  //           console.log("data.exam_questions_data", data.exam_questions_data);
  //           break;
  //         case "use_case_query_exam":
  //           dispatch(toggleIsMessagePending(false));
  //           console.log("use_case_query_exam");
  //           dispatch(
  //             addMessage({ content: data.content.text, sender: "assistant" }),
  //           );
  //           dispatch(setQueriedQuestions(data.exam_questions_data));
  //           console.log("data.exam_questions_data", data.exam_questions_data);
  //           break;
  //         case "use_case_response_text":
  //           dispatch(toggleIsMessagePending(false));
  //           dispatch(
  //             addMessage({ content: data.content.text, sender: "assistant" }),
  //           );
  //           break;
  //         case "use_case_redirect_page":
  //           dispatch(toggleIsMessagePending(false));
  //           console.log("use_case_redirect_page");
  //           dispatch(
  //             addMessage({
  //               content: data.content.text,
  //               sender: "assistant",
  //             }),
  //           );
  //           break;
  //         default:
  //           break;
  //       }
  //     } catch (err) {
  //       dispatch(toggleIsMessagePending(false));
  //       console.error(err);
  //     }
  //     setDisableInput(false);
  //     inputRef.current?.focus();
  //     inputRef.current?.focus();
  //     inputRef.current?.focus();
  //   }
  // };
  const [UA, setUA] = useState<null | UAParser.IResult>();
  useEffect(() => {
    const UA = new UAParser(navigator.userAgent);
    // console.log("ua", UA.getResult());
    setUA(UA.getResult());
  }, []);
  function hasSpeechRecognition() {
    return (
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) &&
      UA &&
      UA.browser.name === "Chrome"
    );
  }
  function handleVoiceInput() {
    const speechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();

    recognition.onresult = async function (e) {
      console.log("event", e);
      const current = e.resultIndex;
      const transcript = e.results[current][0].transcript;
      console.log("transcript", transcript);
      setMessage(transcript);
    };
    recognition.start();
  }
  return (
    <div className="group h-fit w-full">
      <div className="h-fit w-full rounded-2xl bg-[#785FBB]/30 p-px group-focus-within:bg-gradient-to-r group-focus-within:from-[#9747FF] group-focus-within:to-[#3B5BEC]">
        <div className="flex h-fit items-center justify-between gap-1 rounded-[0.95rem] bg-white px-1 dark:bg-wisdome-dark-bg">
          <TextareaAutosize
            ref={inputRef}
            wrap="soft"
            placeholder="ask me anything..."
            value={message}
            disabled={disableInput}
            minRows={1}
            maxRows={8}
            className="max-h-[20dvh] min-h-[2.3rem] w-full rounded-2xl border-none bg-white p-2 text-sm text-[#232323] focus:border-none focus:outline-none focus:ring-0 focus:placeholder:text-transparent dark:bg-wisdome-dark-bg"
            onKeyDown={(e) => {
              if (!e.shiftKey && e.key === "Enter" && message === "\n") {
                e.preventDefault();
                setMessage("");
              }
            }}
            onKeyUp={(e) => {
              if (!e.shiftKey && e.key === "Enter" && message === "\n") {
                setMessage("");
              }
              if (
                !e.shiftKey &&
                e.key === "Enter" &&
                message !== "" &&
                message !== "\n"
              ) {
                handleUserMessage();
              }
            }}
            onInput={(e) => setMessage(e.currentTarget.value)}
          />
          {/* button group */}
          <div className="flex items-center justify-center gap-1">
            {hasSpeechRecognition() && (
              <button
                type="button"
                onClick={handleVoiceInput}
                title="send"
                className="group"
              >
                <MicIcon className="text-xl leading-none transition-all group-disabled:[&_*]:!fill-[#d6cfeb]" />
              </button>
            )}
            <button
              type="button"
              onClick={handleUserMessage}
              title="send"
              disabled={disableInput || message === "" || message === "\n"}
              className="group"
            >
              <SendIcon className="text-xl leading-none transition-all group-disabled:[&_*]:!fill-[#d6cfeb]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
