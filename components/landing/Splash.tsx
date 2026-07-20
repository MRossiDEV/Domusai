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
        opacity:1
      }}

      animate={{
        opacity:0
      }}

      transition={{

        duration:1,

        delay:1.6,

        ease:"easeInOut"

      }}

      onAnimationComplete={
        onComplete
      }


      className="

        fixed

        inset-0

        z-[100]

        flex

        h-[100dvh]

        w-screen

        flex-col

        items-center

        justify-center

        overflow-hidden

        bg-[#111111]

      "

    >




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

          duration:1.2,

          ease:"easeOut"

        }}


        className="

          flex

          flex-col

          items-center

        "

      >




        <motion.h1

          initial={{

            letterSpacing:
              "0.6em"

          }}

          animate={{

            letterSpacing:
              "0.35em"

          }}

          transition={{

            duration:1.5,

            ease:"easeOut"

          }}


          className="

            text-4xl

            font-light

            text-[#F5F1E8]

          "

        >

          DOMUSAI

        </motion.h1>





        <p

          className="

            mt-7

            text-center

            text-[10px]

            uppercase

            tracking-[0.45em]

            text-[#9A9488]

          "

        >

          Private Property Intelligence

        </p>



      </motion.div>






      <motion.div

        initial={{

          opacity:0,

          scale:0

        }}

        animate={{

          opacity:1,

          scale:1

        }}

        transition={{

          duration:1,

          delay:0.5,

          ease:"easeOut"

        }}


        className="

          absolute

          bottom-20

          h-1

          w-20

          overflow-hidden

          rounded-full

          bg-white/[0.08]

        "

      >

        <motion.div

          initial={{

            x:"-100%"

          }}

          animate={{

            x:"100%"

          }}

          transition={{

            duration:1.4,

            delay:0.6,

            ease:"easeInOut"

          }}


          className="

            h-full

            w-full

            bg-[#C8AD7F]

          "

        />

      </motion.div>




    </motion.div>

  )

}