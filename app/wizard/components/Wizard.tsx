"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import Question from "./Question"
import Progress from "./Progress"
import BottomActions from "./BottomActions"
import Splash from "./Splash"
import Summary from "./Summary"
import Completion from "./Completion"

import { useWizard } from "../hooks/useWizard"

import type {
  WizardConfig
} from "../types"



interface WizardProps {

  config: WizardConfig

}



export default function Wizard({

  config

}: WizardProps) {


  const [showSplash, setShowSplash] =
    useState(true)


  const [stage, setStage] =
    useState<
      "assessment" | "summary" | "complete"
    >(
      "assessment"
    )



  const {

    currentQuestion,

    currentStep,

    totalSteps,

    answers,

    isFirstStep,

    isLastStep,

    canContinue,

    setAnswer,

    next,

    back,

    reset,

    getSummary

  } = useWizard(config)



  function handleNext() {


    if (isLastStep) {

      setStage(
        "summary"
      )

      return

    }


    next()

  }



  function handleSubmit() {


    const assessment =
      getSummary()



    console.log(
      "DOMUSAI Assessment",
      assessment
    )


    /*
      Future:

      await fetch(
        "/api/leads",
        {
          method:"POST",
          body:
            JSON.stringify(
              assessment
            )
        }
      )

    */


    setStage(
      "complete"
    )

  }



  function handleRestart() {

    reset()

    setStage(
      "assessment"
    )

  }



  return (

    <main

      className="
        relative
        flex
        h-[100dvh]
        w-full
        flex-col
        overflow-hidden
        bg-[#F8F7F3]
      "

    >



      {
        showSplash && (

          <Splash

            onComplete={() =>
              setShowSplash(false)
            }

          />

        )
      }





      {
        stage === "assessment" && (

          <>

            <Progress

              current={
                currentStep + 1
              }

              total={
                totalSteps
              }

            />



            <div

              className="
                flex-1
                overflow-hidden
              "

            >

              <AnimatePresence
                mode="wait"
              >

                {
                  currentQuestion && (

                    <motion.div

                      key={
                        currentQuestion.id
                      }

                      initial={{
                        opacity:0,
                        x:30
                      }}

                      animate={{
                        opacity:1,
                        x:0
                      }}

                      exit={{
                        opacity:0,
                        x:-30
                      }}

                      transition={{
                        duration:0.35
                      }}

                      className="
                        h-full
                      "

                    >

                      <Question

                        question={
                          currentQuestion
                        }

                        value={
                          answers[
                            currentQuestion.id
                          ]?.value
                        }

                        onChange={
                          value =>
                            setAnswer(
                              currentQuestion.id,
                              value
                            )
                        }

                      />

                    </motion.div>

                  )
                }

              </AnimatePresence>


            </div>



            <BottomActions

              onBack={
                back
              }

              onNext={
                handleNext
              }

              showBack={
                !isFirstStep
              }

              disabled={
                !canContinue
              }

              isLastStep={
                isLastStep
              }

            />


          </>

        )
      }





      {
        stage === "summary" && (

          <Summary

            questions={
              config.questions
            }

            answers={
              answers
            }

            onSubmit={
              handleSubmit
            }

          />

        )
      }





      {
        stage === "complete" && (

          <Completion

            onRestart={
              handleRestart
            }

          />

        )
      }



    </main>

  )

}