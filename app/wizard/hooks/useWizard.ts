"use client"

import {
  useCallback,
  useEffect,
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

interface PersistedWizardProgress {
  currentStep: number
  answers: Record<string, WizardAnswer>
}

function wizardStorageKey(configId: string): string {
  return `weeggo.wizard.${configId}.v1`
}


interface UseWizardReturn {

  currentStepData: FlowStep | undefined

  currentQuestion: QuestionStep | undefined

  /** All question steps that pass their condition given the current answers, in order — lets a caller render transcript history for everything up through currentQuestionNumber - 1. */
  questionSteps: QuestionStep[]

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

  config: WizardConfig,

  initialAnswers?: Record<string, string | string[] | number>

): UseWizardReturn {



  const [

    state,

    setState

  ] = useState<WizardState>(() => ({

    currentStep: 0,

    answers: Object.fromEntries(
      Object.entries(initialAnswers ?? {}).map(([questionId, value]) => [
        questionId,
        { questionId, value, timestamp: Date.now() }
      ])
    ),

    startedAt: Date.now()

  }))

  // Resumes an in-progress session (localStorage, per config.id) if the
  // config opts into it via settings.saveProgress — a refresh or a
  // backgrounded tab mid-conversation shouldn't throw away everything
  // already answered. Hydration only ever runs once, right after mount
  // (client-only — localStorage doesn't exist during SSR).
  //
  // This is state, not a ref: the persist effect below needs to wait until
  // a render has actually committed with the restored answers before it's
  // safe to write — otherwise, within the same effect-flush as hydration,
  // it would read the stale pre-hydration state (a ref updates
  // synchronously, but `state` in the persist effect's closure wouldn't be
  // fresh yet) and immediately overwrite the just-restored progress.
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (!config.settings?.saveProgress) {
      setHydrated(true)
      return
    }

    try {
      const raw = window.localStorage.getItem(wizardStorageKey(config.id))
      const parsed = raw ? (JSON.parse(raw) as Partial<PersistedWizardProgress> | null) : null

      if (parsed && typeof parsed.currentStep === "number" && typeof parsed.answers === "object") {
        setState(previous => ({
          ...previous,
          currentStep: parsed.currentStep as number,
          // Freshly-supplied initialAnswers (e.g. a visitorName already
          // known this session) win over whatever was previously stored for
          // the same question, since they're more current.
          answers: { ...parsed.answers, ...previous.answers }
        }))
      }
    } catch {
      // Corrupt or unavailable storage — fall through and start fresh.
    }

    setHydrated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs exactly once, right after mount
  }, [])







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

  // Persists progress on every change, once past the initial hydration
  // check above (otherwise this would immediately overwrite a just-restored
  // session with the pre-hydration blank state). Reaching "completion"
  // clears it instead — a finished conversation has nothing left to resume.
  useEffect(() => {
    if (!hydrated) return
    if (!config.settings?.saveProgress) return

    try {
      if (currentStepData?.type === "completion") {
        window.localStorage.removeItem(wizardStorageKey(config.id))
      } else {
        const progress: PersistedWizardProgress = {
          currentStep: state.currentStep,
          answers: state.answers
        }
        window.localStorage.setItem(wizardStorageKey(config.id), JSON.stringify(progress))
      }
    } catch {
      // Storage unavailable/full — progress just won't survive a refresh.
    }
  }, [hydrated, config.id, config.settings?.saveProgress, currentStepData?.type, state.currentStep, state.answers])





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

    try {
      window.localStorage.removeItem(wizardStorageKey(config.id))
    } catch {
      // Storage unavailable — nothing to clean up.
    }


  }, [config.id])










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


    questionSteps,


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