export type testModules = "reading1" | "reading2" | "math1" | "math2";

export type testQuestionOption = {
  option: "A" | "B" | "C" | "D";
  text: string;
};
export type Answer = {
  order: number;
  question_id: number;
  answer: string;
  time_spent: number;
  second: number;
};

export type testQuestion = {
  order: number;
  question_id: number;
  content: string | null;
  task: string | null;
  A: string | null;
  B: string | null;
  C: string | null;
  D: string | null;
  correct_answer?: string | null;
  explanation?: string | null;
};

export type PracticeResult = {
  correct_answer: testQuestion["correct_answer"];
  originCorrectness?: boolean | null;
  correctness: boolean | null;
  order?: number;
  explanations: {
    A: string | null;
    B: string | null;
    C: string | null;
    D: string | null;
    summary: string | null;
  };
};

export type TestExplanation = {
  option: "A" | "B" | "C" | "D" | null;
  explanation: string;
};

export type PracticeAnswerResponse = {
  correct_answer: "A" | "B" | "C" | "D" | string;
  correctness: boolean | null;
  explanations: TestExplanation[];
};
