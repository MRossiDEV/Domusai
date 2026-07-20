"use client"

import { useCallback, useMemo, useState } from "react"

import type {
  WizardAnswer,
  WizardConfig,
  WizardQuestion,
  WizardState
} from "../types"


interface UseWizardReturn {

  currentQuestion: WizardQuestion | undefined

  currentStep: number

  totalSteps: number

  progress: number

  answers: Record<string, WizardAnswer>

  isFirstStep: boolean

  isLastStep: boolean

  canContinue: boolean

  setAnswer: (
    questionId: string,
    value: string | string[] | number
  ) => void

  next: () => void

  back: () => void

  reset: () => void

  getAnswer: (
    questionId: string
  ) => WizardAnswer | undefined

  getSummary: () => Record<string, WizardAnswer>

}



export function useWizard(
  config: WizardConfig
): UseWizardReturn {


  const [state, setState] = useState<WizardState>({

    currentStep: 0,

    answers: {},

    startedAt:
      Date.now()

  })


  const questions = useMemo(() => {

    return config.questions.filter(
      (question) => {

        if (!question.condition) {
          return true
        }


        const dependency =
          state.answers[
            question.condition.questionId
          ]


        if (!dependency) {
          return false
        }


        const answer =
          dependency.value


        switch (
          question.condition.operator
        ) {

          case "equals":

            return (
              answer ===
              question.condition.value
            )


          case "not_equals":

            return (
              answer !==
              question.condition.value
            )


          case "contains":

            return Array.isArray(answer)
              ? answer.includes(
                  question.condition.value as string
                )
              : String(answer).includes(
                  String(question.condition.value)
                )


          case "greater_than":

            return (
              Number(answer) >
              Number(question.condition.value)
            )


          case "less_than":

            return (
              Number(answer) <
              Number(question.condition.value)
            )


          default:

            return true
        }

      }
    )

  }, [
    config.questions,
    state.answers
  ])



  const currentQuestion =
    questions[
      state.currentStep
    ]



  const totalSteps =
    questions.length



  const progress =
    totalSteps === 0
      ? 0
      :
        (
          (state.currentStep + 1)
          /
          totalSteps
        ) * 100



  const isFirstStep =
    state.currentStep === 0



  const isLastStep =
    state.currentStep === totalSteps - 1



  const currentAnswer =
    currentQuestion
      ? state.answers[
          currentQuestion.id
        ]
      : undefined



  const canContinue =
    currentQuestion?.required
      ? Boolean(
          currentAnswer?.value &&
          (
            Array.isArray(
              currentAnswer.value
            )
              ? currentAnswer.value.length > 0
              : true
          )
        )
      :
        true



  const setAnswer = useCallback(
    (
      questionId: string,
      value: string | string[] | number
    ) => {

      setState(
        previous => ({

          ...previous,

          answers: {

            ...previous.answers,

            [questionId]: {

              questionId,

              value,

              timestamp:
                Date.now()

            }

          }

        })
      )

    },
    []
  )



  const next = useCallback(
    () => {

      if (!canContinue) {
        return
      }


      setState(
        previous => ({

          ...previous,

          currentStep:
            Math.min(
              previous.currentStep + 1,
              totalSteps - 1
            )

        })
      )

    },
    [
      canContinue,
      totalSteps
    ]
  )



  const back = useCallback(
    () => {

      setState(
        previous => ({

          ...previous,

          currentStep:
            Math.max(
              previous.currentStep - 1,
              0
            )

        })
      )

    },
    []
  )



  const reset = useCallback(
    () => {

      setState({

        currentStep: 0,

        answers: {},

        startedAt:
          Date.now()

      })

    },
    []
  )



  const getAnswer = useCallback(
    (
      questionId: string
    ) => {

      return state.answers[
        questionId
      ]

    },
    [
      state.answers
    ]
  )



  const getSummary = useCallback(
    () => {

      return state.answers

    },
    [
      state.answers
    ]
  )



  return {

    currentQuestion,

    currentStep:
      state.currentStep,

    totalSteps,

    progress,

    answers:
      state.answers,

    isFirstStep,

    isLastStep,

    canContinue,

    setAnswer,

    next,

    back,

    reset,

    getAnswer,

    getSummary

  }

}