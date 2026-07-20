"use client"

import { motion } from "framer-motion"


interface SplashProps {

  onComplete?: () => void

}



export default function Splash({

  onComplete

}: SplashProps) {


  return (

    <motion.div

      initial={{
        opacity: 1
      }}

      animate={{
        opacity: 0
      }}

      transition={{
        duration: 0.8,
        delay: 1.2
      }}

      onAnimationComplete={
        onComplete
      }

      className="
        fixed
        inset-0
        z-[100]
        flex
        h-screen
        w-screen
        flex-col
        items-center
        justify-center
        overflow-hidden
        bg-[#F8F7F3]
      "

    >


      <motion.div

        initial={{
          opacity: 0,
          y: 15
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 1,
          ease: "easeOut"
        }}

        className="
          flex
          flex-col
          items-center
        "

      >


        <h1

          className="
            text-4xl
            font-light
            tracking-[0.35em]
            text-neutral-950
          "

        >

          DOMUSAI

        </h1>



        <p

          className="
            mt-6
            text-center
            text-sm
            uppercase
            tracking-[0.3em]
            text-neutral-400
          "

        >

          Real Estate Intelligence

        </p>


      </motion.div>



      <motion.div

        initial={{
          scale: 0
        }}

        animate={{
          scale: 1
        }}

        transition={{
          duration: 1,
          delay: 0.3,
          ease: "easeOut"
        }}

        className="
          absolute
          bottom-16
          h-1
          w-1
          rounded-full
          bg-neutral-900
        "

      />


    </motion.div>

  )

}