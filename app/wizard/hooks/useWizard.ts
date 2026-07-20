"use client"

import {
  useCallback,
  useMemo,
  useState
} from "react"

import type {
  FlowStep,
  QuestionStep,
  WizardAnswer,
  WizardConfig,
  WizardState
} from "../types"


interface UseWizardReturn {

  currentStepData: FlowStep | undefined

  currentQuestion: QuestionStep | undefined

  currentStep: number

  totalSteps: number

  progress: number

  currentQuestionNumber: number

  totalQuestions: number

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



  const [

    state,

    setState

  ] = useState<WizardState>({

    currentStep: 0,

    answers: {},

    startedAt: Date.now()

  })







  const steps = useMemo(() => {


    return config.steps.filter(step => {


      if (
        step.type !== "question"
      ) {

        return true

      }




      if (
        !step.condition
      ) {

        return true

      }





      const dependency =

        state.answers[
          step.condition.questionId
        ]





      if (!dependency) {

        return false

      }





      const answer = dependency.value





      switch (
        step.condition.operator
      ) {


        case "equals":

          return (

            answer ===
            step.condition.value

          )



        case "not_equals":

          return (

            answer !==
            step.condition.value

          )



        case "contains":

          return Array.isArray(answer)

            ? answer.includes(
                step.condition.value as string
              )

            :

              String(answer).includes(
                String(step.condition.value)
              )



        case "greater_than":

          return (

            Number(answer) >
            Number(step.condition.value)

          )



        case "less_than":

          return (

            Number(answer) <
            Number(step.condition.value)

          )



        default:

          return true

      }


    })


  }, [

    config.steps,

    state.answers

  ])







  const currentStepData =

    steps[
      state.currentStep
    ]







  const currentQuestion =

    currentStepData?.type === "question"

      ? currentStepData

      : undefined








  const totalSteps =

    steps.length








  const questionSteps =

    steps.filter(

      (step): step is QuestionStep =>

        step.type === "question"

    )








  const currentQuestionIndex =

    currentQuestion

      ? questionSteps.findIndex(

          question =>

            question.id === currentQuestion.id

        )

      : -1









  const progress =

    questionSteps.length === 0

      ? 0

      :

        (

          (currentQuestionIndex + 1)

          /

          questionSteps.length

        )

        *

        100








  const isFirstStep =

    state.currentStep === 0








  const isLastStep =

    state.currentStep ===

    steps.length - 1








  const currentAnswer =

    currentQuestion

      ?

        state.answers[

          currentQuestion.id

        ]

      :

        undefined









  const canContinue = useMemo(() => {


    if (!currentQuestion) {

      return true

    }





    if (!currentQuestion.required) {

      return true

    }





    if (!currentAnswer) {

      return false

    }





    if (
      Array.isArray(
        currentAnswer.value
      )
    ) {

      return (

        currentAnswer.value.length > 0

      )

    }





    return (

      String(
        currentAnswer.value
      )
      .trim()
      .length > 0

    )



  }, [

    currentQuestion,

    currentAnswer

  ])










  const setAnswer = useCallback(

    (

      questionId: string,

      value: string | string[] | number

    ) => {


      setState(previous => ({


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


      }))


    },

    []

  )










  const next = useCallback(() => {


    if (!canContinue) {

      return

    }





    setState(previous => ({


      ...previous,


      currentStep:

        Math.min(

          previous.currentStep + 1,

          steps.length - 1

        )


    }))



  }, [

    canContinue,

    steps.length

  ])










  const back = useCallback(() => {


    setState(previous => ({


      ...previous,


      currentStep:

        Math.max(

          previous.currentStep - 1,

          0

        )


    }))



  }, [])










  const reset = useCallback(() => {


    setState({

      currentStep:0,

      answers:{},

      startedAt:Date.now()

    })


  }, [])










  const getAnswer = useCallback(

    (

      questionId:string

    ) => {


      return state.answers[questionId]


    },

    [

      state.answers

    ]

  )










  const getSummary = useCallback(() => {


    return state.answers


  }, [

    state.answers

  ])










  return {


    currentStepData,


    currentQuestion,


    currentStep:

      state.currentStep,


    totalSteps,


    progress,


    currentQuestionNumber:

      currentQuestionIndex + 1,


    totalQuestions:

      questionSteps.length,


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