"use client"

import { motion } from "framer-motion"

import {
  Check
} from "lucide-react"

import type {
  WizardOption
} from "../types"



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

        y:
          selected
            ? -3
            : 0,

      }}


      transition={{

        duration:
          0.25,

        ease:
          "easeOut"

      }}


      className={`

        group

        relative

        flex

        min-h-[82px]

        w-full

        items-center

        overflow-hidden

        rounded-[24px]

        border

        px-5

        py-5

        text-left

        transition-all

        duration-300


        ${
          selected

            ? `

              border-[#C8AD7F]

              bg-[#242019]

              text-[#F5F1E8]

              shadow-[0_18px_45px_rgba(0,0,0,0.45)]

            `

            :

            `

              border-white/[0.08]

              bg-[#181818]

              text-[#F5F1E8]

              shadow-[0_8px_25px_rgba(0,0,0,0.25)]

              hover:border-white/[0.18]

            `

        }

      `}

    >



      {
        selected && (

          <motion.div

            initial={{
              opacity:0
            }}

            animate={{
              opacity:1
            }}

            className="

              absolute

              inset-0

              bg-gradient-to-r

              from-[#C8AD7F]/10

              via-transparent

              to-transparent

              pointer-events-none

            "

          />

        )
      }





      <div

        className="

          relative

          z-10

          flex

          w-full

          items-center

          gap-4

        "

      >




        {
          option.icon && (

            <div

              className={`

                flex

                h-11

                w-11

                shrink-0

                items-center

                justify-center

                rounded-full


                ${
                  selected

                    ? "bg-[#C8AD7F]/15 text-[#C8AD7F]"

                    : "bg-white/[0.05] text-[#C8AD7F]"

                }

              `}

            >

              <span
                className="
                  text-xl
                "
              >

                {option.icon}

              </span>

            </div>

          )
        }





        <div
          className="
            flex-1
          "
        >


          <h3

            className="

              text-[16px]

              font-medium

              tracking-[-0.02em]

            "

          >

            {option.label}

          </h3>




          {
            option.description && (

              <p

                className="

                  mt-1.5

                  text-sm

                  leading-relaxed

                  text-[#A7A092]

                "

              >

                {option.description}

              </p>

            )
          }



        </div>





        {
          selected && (

            <motion.div

              initial={{
                opacity:0,
                scale:0.5
              }}

              animate={{
                opacity:1,
                scale:1
              }}

              transition={{
                duration:0.25
              }}

              className="

                flex

                h-7

                w-7

                items-center

                justify-center

                rounded-full

                bg-[#C8AD7F]

                text-[#111111]

              "

            >

              <Check

                size={15}

                strokeWidth={3}

              />

            </motion.div>

          )
        }



      </div>



    </motion.button>

  )

}