"use client"

import { useMemo } from "react"

import OptionCard from "./OptionCard"

import type {
  WizardQuestion
} from "../types"


interface QuestionProps {

  question: WizardQuestion

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

      if (
        Array.isArray(value)
      ) {
        return value
      }


      if (
        typeof value === "string"
      ) {
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
      question.type === "multiple"
    ) {

      const current =
        selectedValues


      const exists =
        current.includes(
          optionValue
        )


      const updated =
        exists

          ? current.filter(
              item =>
                item !== optionValue
            )

          : [
              ...current,
              optionValue
            ]


      onChange(updated)

      return

    }



    onChange(optionValue)

  }



  return (

    <div
      className="
        flex
        h-full
        flex-col
        px-6
      "
    >


      <div
        className="
          pt-10
          pb-8
        "
      >

        {
          question.category && (

            <span
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-neutral-400
              "
            >
              {question.category}
            </span>

          )
        }



        <h1
          className="
            mt-5
            max-w-xl
            text-3xl
            font-medium
            leading-tight
            tracking-tight
            text-neutral-950
          "
        >
          {question.title}
        </h1>



        {
          question.subtitle && (

            <p
              className="
                mt-4
                max-w-xl
                text-base
                leading-relaxed
                text-neutral-500
              "
            >
              {question.subtitle}
            </p>

          )
        }


      </div>



      <div
        className="
          flex-1
          space-y-3
          overflow-y-auto
          pb-32
        "
      >


        {
          question.options?.map(
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
                  question.type === "multiple"
                }

                onSelect={
                  handleOptionSelect
                }

              />

            )
          )
        }



        {
          (
            question.type === "text" ||
            question.type === "number"
          ) && (

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
                min-h-40
                w-full
                resize-none
                rounded-2xl
                border
                border-neutral-200
                bg-white
                p-5
                text-base
                outline-none
                transition
                focus:border-neutral-900
              "

            />

          )
        }


      </div>


    </div>

  )

}