"use client"

import {
  useEffect,
  useState
} from "react"

import {
  AnimatePresence,
  motion
} from "framer-motion"



interface AppSplashProps {

  children: React.ReactNode

}



export default function AppSplash({

  children

}: AppSplashProps) {


  const [

    showSplash,

    setShowSplash

  ] = useState(true)



  useEffect(() => {

    const timer = setTimeout(() => {

      setShowSplash(false)

    }, 2200)


    return () => {

      clearTimeout(timer)

    }

  }, [])



  return (

    <>


      <AnimatePresence>


        {
          showSplash && (

            <motion.div

              initial={{
                opacity:1
              }}

              exit={{
                opacity:0
              }}

              transition={{
                duration:0.8,
                ease:"easeOut"
              }}

              className="
                fixed
                inset-0
                z-[999]
                flex
                h-screen
                w-screen
                flex-col
                items-center
                justify-center
                bg-[#111111]
              "

            >


              <motion.div

                initial={{
                  opacity:0,
                  y:15
                }}

                animate={{
                  opacity:1,
                  y:0
                }}

                transition={{
                  duration:1,
                  ease:"easeOut"
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
                    text-[#F5F1E8]
                  "

                >

                  DOMUSAI

                </h1>



                <p

                  className="
                    mt-6
                    text-[10px]
                    uppercase
                    tracking-[0.35em]
                    text-[#C8AD7F]
                  "

                >

                  Real Estate Intelligence

                </p>


              </motion.div>




              <motion.div

                initial={{
                  scale:0
                }}

                animate={{
                  scale:1
                }}

                transition={{
                  duration:1,
                  delay:0.3
                }}

                className="
                  absolute
                  bottom-16
                  h-1
                  w-1
                  rounded-full
                  bg-[#C8AD7F]
                "

              />


            </motion.div>

          )

        }


      </AnimatePresence>



      <motion.div

        initial={{
          opacity:0
        }}

        animate={{
          opacity:
            showSplash
              ? 0
              : 1
        }}

        transition={{
          duration:0.5
        }}

      >

        {children}

      </motion.div>


    </>

  )

}