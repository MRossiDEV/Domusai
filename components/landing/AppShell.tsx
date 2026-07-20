"use client"

import {
  useState
} from "react"

import {
  AnimatePresence,
  motion
} from "framer-motion"

import Splash from "@/components/landing/Splash"


interface AppShellProps {

  children: React.ReactNode

}



export default function AppShell({

  children

}: AppShellProps) {


  const [

    showSplash,

    setShowSplash

  ] = useState(true)



  return (

    <main

      className="
        relative
        min-h-[100dvh]
        overflow-hidden
        bg-[#111111]
        text-[#F5F1E8]
      "

    >


      <AnimatePresence>


        {
          showSplash && (

            <Splash

              onComplete={() =>
                setShowSplash(false)
              }

            />

          )
        }


      </AnimatePresence>





      <motion.div

        initial={{
          opacity:0
        }}

        animate={{
          opacity:1
        }}

        transition={{
          duration:0.6,
          delay:1
        }}

        className="
          flex
          min-h-[100dvh]
          flex-col
        "

      >


        {children}


      </motion.div>



    </main>

  )

}