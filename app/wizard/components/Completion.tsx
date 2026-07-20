"use client"

import { motion } from "framer-motion"

import {
  Check
} from "lucide-react"



interface CompletionProps {

  // redirect to homepage @/
  onRestart?: () => void


}



export default function Completion({

  onRestart

}: CompletionProps) {


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

        duration:0.7,

        ease:"easeOut"

      }}



      className="

        flex

        h-full

        flex-col

        items-center

        justify-center

        px-6

        text-center

      "


    >






      <motion.div


        initial={{

          scale:0.7,

          opacity:0

        }}


        animate={{

          scale:1,

          opacity:1

        }}


        transition={{

          duration:0.5,

          delay:0.2

        }}



        className="

          relative

          mb-10

          flex

          h-20

          w-20

          items-center

          justify-center

          rounded-full

          border

          border-[#C8AD7F]/40

          bg-[#181818]

          shadow-[0_15px_50px_rgba(0,0,0,0.45)]

        "

      >



        <div

          className="

            absolute

            inset-2

            rounded-full

            border

            border-[#C8AD7F]/10

          "

        />



        <Check

          size={28}

          strokeWidth={1.5}

          className="

            text-[#C8AD7F]

          "

        />


      </motion.div>









      <span


        className="

          text-[10px]

          uppercase

          tracking-[0.45em]

          text-[#C8AD7F]

        "


      >

        DOMUSAI

      </span>







      <h1


        className="

          mt-6

          max-w-md

          text-[34px]

          font-light

          leading-[1.15]

          tracking-[-0.04em]

          text-[#F5F1E8]

        "


      >

        Hemos recibido tu evaluación.


      </h1>








      <p


        className="

          mt-6

          max-w-md

          text-base

          leading-relaxed

          text-[#9A9488]

        "


      >

        Nuestro equipo revisará la información
        para preparar una selección alineada
        con tus objetivos antes del primer contacto.


      </p>







      {
        onRestart && (

          <button


            type="button"


            onClick={onRestart}



            className="

              mt-10

              h-14

              rounded-full

              border

              border-white/[0.12]

              bg-white/[0.04]

              px-8

              text-sm

              font-medium

              text-[#F5F1E8]

              backdrop-blur-xl

              transition

              active:scale-95

            "


          >

            Volver al inicio


          </button>

        )
      }




    </motion.div>

  )

}