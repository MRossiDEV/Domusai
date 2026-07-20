"use client"

import { motion } from "framer-motion"

import type {
  WizardAnswer,
  WizardQuestion
} from "../types"


interface SummaryProps {

  questions: WizardQuestion[]

  answers: Record<string, WizardAnswer>

  onSubmit: () => void

}



export default function Summary({

  questions,

  answers,

  onSubmit

}: SummaryProps) {


  function getLabel(
    question: WizardQuestion,
    value: string | string[] | number
  ) {


    if (!question.options) {
      return String(value)
    }


    if (Array.isArray(value)) {

      return value
        .map(item =>
          question.options?.find(
            option =>
              option.value === item
          )?.label ?? item
        )
        .join(", ")

    }


    return (
      question.options.find(
        option =>
          option.value === value
      )?.label
      ??
      String(value)
    )

  }



  const completedAnswers =
    questions.filter(
      question =>
        answers[question.id]
    )



  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.5
      }}

      className="
        flex
        min-h-full
        flex-col
        px-6
        pb-36
      "

    >

      <div
        className="
          pt-10
          pb-8
        "
      >

        <span
          className="
            text-xs
            uppercase
            tracking-[0.25em]
            text-neutral-400
          "
        >
          Perfil inmobiliario
        </span>


        <h1
          className="
            mt-5
            text-3xl
            font-medium
            leading-tight
            tracking-tight
            text-neutral-950
          "
        >

          Tu búsqueda personalizada

        </h1>


        <p
          className="
            mt-4
            text-base
            leading-relaxed
            text-neutral-500
          "
        >

          Revisá la información antes de enviar
          tu evaluación.

        </p>


      </div>



      <div
        className="
          space-y-3
        "
      >

        {
          completedAnswers.map(
            answer => {

              const question =
                questions.find(
                  item =>
                    item.id === answer.questionId
                )


              if (!question) {
                return null
              }


              return (

                <div

                  key={
                    answer.questionId
                  }

                  className="
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-white
                    p-5
                  "

                >

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.2em]
                      text-neutral-400
                    "
                  >

                    {question.category}

                  </p>


                  <h3
                    className="
                      mt-2
                      text-sm
                      text-neutral-500
                    "
                  >

                    {question.title}

                  </h3>


                  <p
                    className="
                      mt-2
                      text-base
                      font-medium
                      text-neutral-900
                    "
                  >

                    {
                      getLabel(
                        question,
                        answer.value
                      )
                    }

                  </p>


                </div>

              )

            }
          )
        }


      </div>



      <button

        type="button"

        onClick={onSubmit}

        className="
          mt-8
          h-14
          w-full
          rounded-full
          bg-neutral-900
          text-sm
          font-medium
          tracking-wide
          text-white
          transition
          active:scale-[0.98]
        "

      >

        Enviar evaluación

      </button>


    </motion.div>

  )

}