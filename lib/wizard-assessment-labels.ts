import { buyerAssessment } from "@/app/wizard/data/buyerAssessment";
import type { QuestionStep } from "@/app/wizard/types";

const questionSteps = buyerAssessment.steps.filter(
  (step): step is QuestionStep => step.type === "question"
);

const questionById = new Map(questionSteps.map((question) => [question.id, question]));

export function getQuestionLabel(questionId: string): string {
  return questionById.get(questionId)?.title ?? questionId;
}

export function getAnswerLabel(
  questionId: string,
  rawValue: string | string[] | number
): string {
  const question = questionById.get(questionId);
  const values = Array.isArray(rawValue) ? rawValue : [rawValue];

  return values
    .map((value) => {
      const stringValue = String(value);
      return (
        question?.options?.find((option) => option.value === stringValue)?.label ?? stringValue
      );
    })
    .join(", ");
}
