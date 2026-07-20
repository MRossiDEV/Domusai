"use client"

import { motion } from "framer-motion"

import {
  Check
} from "lucide-react"

import type {
  WizardAnswer,
  QuestionStep
} from "../types"



interface SummaryProps {

  questions: QuestionStep[]

  answers: Record<string, WizardAnswer>

  onContinue: () => void

}





export default function Summary({

  questions,

  answers,

  onContinue

}: SummaryProps) {



  function getQuestion(

    questionId: string

  ) {

    return questions.find(

      question =>
        question.id === questionId

    )

  }







  function getLabel(

    question: QuestionStep | undefined,

    value:
      | string
      | string[]
      | number

  ) {


    if (!question?.options) {

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





  const collectedAnswers =

    Object.values(

      answers

    )









  return (

    <motion.div


      initial={{

        opacity:0,

        y:20

      }}



      animate={{

        opacity:1,

        y:0

      }}



      transition={{

        duration:0.4

      }}



      className="
        flex
        h-full
        flex-col
        overflow-hidden
        px-6
      "

    >





      <div

        className="
          shrink-0
          pt-10
          pb-6
        "

      >


        <span

          className="
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-[#C8AD7F]
          "

        >

          Perfil de adquisición

        </span>




        <h1

          className="
            mt-6
            text-[34px]
            font-light
            tracking-[-0.04em]
          "

        >

          Resumen de evaluación

        </h1>




        <p

          className="
            mt-5
            text-base
            leading-relaxed
            text-[#9A9488]
          "

        >

          Revisá los datos recopilados antes
          de continuar con la solicitud.

        </p>


      </div>









      <div

        className="
          flex-1
          overflow-y-auto
          space-y-3
          pb-6
        "

      >





        {
          collectedAnswers.map(

            answer => {


              const question =

                getQuestion(

                  answer.questionId

                )



              return (

                <motion.div


                  key={
                    answer.questionId
                  }



                  initial={{

                    opacity:0,

                    y:10

                  }}



                  animate={{

                    opacity:1,

                    y:0

                  }}



                  className="
                    rounded-[22px]
                    border
                    border-white/[0.08]
                    bg-[#181818]
                    p-5
                  "

                >





                  <div

                    className="
                      flex
                      items-center
                      justify-between
                    "

                  >


                    <span

                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-[#C8AD7F]
                      "

                    >

                      {
                        question?.category ??
                        "Información"
                      }

                    </span>



                    <Check

                      size={14}

                      className="
                        text-[#C8AD7F]
                      "

                    />


                  </div>






                  <h3

                    className="
                      mt-3
                      text-sm
                      text-[#9A9488]
                    "

                  >

                    {
                      question?.title ??
                      answer.questionId
                    }

                  </h3>






                  <p

                    className="
                      mt-2
                      text-base
                      font-medium
                      text-[#F5F1E8]
                    "

                  >

                    {
                      getLabel(

                        question,

                        answer.value

                      )
                    }

                  </p>



                </motion.div>


              )

            }

          )

        }






      </div>







      <button


        type="button"


        onClick={

          onContinue

        }


        className="
          h-14
          shrink-0
          rounded-full
          bg-[#C8AD7F]
          text-sm
          font-medium
          tracking-wide
          text-[#111111]
          transition
          active:scale-[0.98]
        "

      >

        Continuar evaluación


      </button>





    </motion.div>

  )

}