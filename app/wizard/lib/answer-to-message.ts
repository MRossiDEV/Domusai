import type { QuestionStep, WizardAnswer } from "../types"

function optionLabel(question: QuestionStep, value: string): string {
  return question.options?.find((o) => o.value === value)?.label ?? value
}

/** Renders a stored answer as a natural-sounding sent message, e.g. "Pocitos, Cordón y Buceo" instead of a raw array of option values. */
export function formatAnswerAsMessage(question: QuestionStep, answer: WizardAnswer | undefined): string {
  if (!answer) return ""
  const { value } = answer

  if (Array.isArray(value)) {
    if (value.length === 0) return "No tengo una preferencia en particular."
    const labels = value.map((v) => optionLabel(question, v))
    if (labels.length === 1) return labels[0]
    return `${labels.slice(0, -1).join(", ")} y ${labels[labels.length - 1]}`
  }

  if (typeof value === "number") {
    return new Intl.NumberFormat("es-UY").format(value)
  }

  if (question.questionType === "single" || question.questionType === "select") {
    return optionLabel(question, value)
  }

  return value
}
