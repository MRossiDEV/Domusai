"use client"

import { motion } from "framer-motion"



interface CompletionProps {

  onRestart?: () => void

}



export default function Completion({

  onRestart

}: CompletionProps) {


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
        duration: 0.6
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

      <div
        className="
          mb-8
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border
          border-neutral-200
          bg-white
        "
      >

        <span
          className="
            text-xl
            text-neutral-900
          "
        >
          ✓
        </span>

      </div>



      <span
        className="
          text-xs
          uppercase
          tracking-[0.3em]
          text-neutral-400
        "
      >
        DOMUSAI
      </span>



      <h1
        className="
          mt-6
          max-w-md
          text-3xl
          font-medium
          leading-tight
          tracking-tight
          text-neutral-950
        "
      >

        Hemos recibido tu evaluación.

      </h1>



      <p
        className="
          mt-5
          max-w-md
          text-base
          leading-relaxed
          text-neutral-500
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
              border-neutral-200
              bg-white
              px-8
              text-sm
              font-medium
              text-neutral-900
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