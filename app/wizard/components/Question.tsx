"use client"

import {
  useMemo
} from "react"

import {
  motion
} from "framer-motion"

import OptionCard from "./OptionCard"

import type {
  QuestionStep
} from "../types"



interface QuestionProps {

  question: QuestionStep

  value?:
    | string
    | string[]
    | number

  onChange: (
    value:
      | string
      | string[]
      | number
  ) => void

}





export default function Question({

  question,

  value,

  onChange

}: QuestionProps) {



  const selectedValues =

    useMemo(() => {

      if (Array.isArray(value)) {

        return value

      }


      if (typeof value === "string") {

        return [value]

      }


      return []

    }, [

      value

    ])







  function handleOptionSelect(

    optionValue: string

  ) {


    if (

      question.questionType === "multiple"

    ) {


      const updated =

        selectedValues.includes(

          optionValue

        )

          ? selectedValues.filter(

              item =>
                item !== optionValue

            )

          :

            [

              ...selectedValues,

              optionValue

            ]



      onChange(

        updated

      )


      return

    }



    onChange(

      optionValue

    )

  }







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

        duration:0.45,

        ease:"easeOut"

      }}



      className="
        flex
        h-full
        flex-col
      "

    >






      <div

        className="
          px-6
          pt-8
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

          {
            question.category
          }

        </span>







        <h1

          className="
            mt-6
            max-w-lg
            text-[34px]
            font-light
            leading-[1.12]
            tracking-[-0.04em]
            text-white
          "

        >

          {
            question.title
          }

        </h1>







        {
          question.subtitle && (

            <p

              className="
                mt-5
                max-w-md
                text-[16px]
                leading-relaxed
                text-neutral-500
              "

            >

              {
                question.subtitle
              }

            </p>

          )
        }



      </div>









      <div

        className="
          flex-1
          overflow-y-auto
          px-6
          pb-36
        "

      >






        {
          question.options && (


            <motion.div

              initial={{

                opacity:0

              }}



              animate={{

                opacity:1

              }}



              transition={{

                delay:0.1

              }}



              className="
                space-y-3
              "

            >



              {
                question.options.map(

                  option => (

                    <OptionCard


                      key={
                        option.value
                      }



                      option={
                        option
                      }



                      selected={

                        selectedValues.includes(

                          option.value

                        )

                      }



                      multiple={

                        question.questionType === "multiple"

                      }



                      onSelect={

                        handleOptionSelect

                      }


                    />

                  )

                )

              }



            </motion.div>

          )

        }









        {

          (

            question.questionType === "text" ||

            question.questionType === "number"

          )

          && (

            <textarea


              value={

                String(

                  value ?? ""

                )

              }



              onChange={

                event =>

                  onChange(

                    event.target.value

                  )

              }



              placeholder={

                question.placeholder

              }



              className="
                min-h-[180px]
                w-full
                resize-none
                rounded-[24px]
                border
                border-[#E7E3DA]
                bg-white/80
                p-6
                text-base
                leading-relaxed
                text-neutral-900
                outline-none
                transition
                placeholder:text-neutral-400
                focus:border-neutral-900
              "

            />

          )

        }





      </div>





    </motion.div>

  )

}