"use client"

import { motion } from "framer-motion"

import type { WizardOption } from "../types"


interface OptionCardProps {

  option: WizardOption

  selected: boolean

  multiple?: boolean

  onSelect: (
    value: string
  ) => void

}



export default function OptionCard({
  option,
  selected,
  multiple = false,
  onSelect
}: OptionCardProps) {


  return (

    <motion.button

      type="button"

      onClick={() =>
        onSelect(option.value)
      }


      whileTap={{
        scale: 0.97
      }}


      animate={{

        scale:
          selected
            ? 1.01
            : 1

      }}


      transition={{
        duration: 0.2
      }}


      className={`
        relative
        w-full
        text-left
        rounded-2xl
        border
        px-6
        py-5
        transition-all
        duration-300
        ${
          selected
            ? "border-black bg-black text-white"
            : "border-neutral-200 bg-white text-neutral-900"
        }
      `}

    >

      <div className="flex items-start gap-4">


        {
          option.icon && (

            <span
              className="
                text-xl
                opacity-80
              "
            >
              {option.icon}
            </span>

          )
        }


        <div className="flex-1">


          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >

            <h3
              className="
                text-base
                font-medium
                tracking-tight
              "
            >
              {option.label}
            </h3>


            {
              selected && (

                <span
                  className="
                    text-xs
                    uppercase
                    tracking-widest
                    opacity-70
                  "
                >
                  {multiple
                    ? "✓"
                    : "Seleccionado"
                  }
                </span>

              )
            }


          </div>



          {
            option.description && (

              <p
                className={`
                  mt-2
                  text-sm
                  leading-relaxed
                  ${
                    selected
                      ? "text-neutral-300"
                      : "text-neutral-500"
                  }
                `}
              >
                {option.description}
              </p>

            )
          }


        </div>


      </div>


    </motion.button>

  )

}