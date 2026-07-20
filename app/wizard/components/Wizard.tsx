"use client"

import {
  useState
} from "react"

import {
  AnimatePresence,
  motion
} from "framer-motion"

import Question from "./Question"
import Progress from "./Progress"
import BottomActions from "./BottomActions"
import Splash from "../../../components/landing/Splash"
import Summary from "./Summary"
import Completion from "./Completion"
import ContactForm from "./ContactForm"

import {
  useWizard
} from "../hooks/useWizard"

import type {
  WizardConfig
} from "../types"


interface WizardProps {

  config: WizardConfig

}



export default function Wizard({

  config

}: WizardProps) {


  const [

    showSplash,

    setShowSplash

  ] = useState(true)



  const {

    currentStepData,

    currentQuestion,

    currentStep,

    totalSteps,

    answers,

    isFirstStep,

    canContinue,

    setAnswer,

    next,

    back,

    reset,

    getSummary

  } = useWizard(config)



  function handleContinue() {

    next()

  }



  function handleSubmit(

    contactData: Record<string,string>

  ) {


    const submission = {

      assessment:
        getSummary(),

      contact:
        contactData

    }


    console.log(
      "DOMUSAI Submission",
      submission
    )


    next()

  }




  function handleRestart() {

    reset()

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
        bg-[#111111]
        text-[#F5F1E8]
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
        !showSplash && (

          <AnimatePresence mode="wait">


            {
              currentStepData?.type === "intro" && (

                <motion.div

                  key="intro"

                  initial={{
                    opacity:0
                  }}

                  animate={{
                    opacity:1
                  }}

                  className="h-full"

                >

                  <div className="
                    flex
                    h-full
                    flex-col
                    items-center
                    justify-center
                    px-6
                    text-center
                  ">


                    {
                      currentStepData.video && (

                        <video

                          src={
                            currentStepData.video
                          }

                          poster={
                            currentStepData.poster
                          }

                          autoPlay

                          muted

                          playsInline

                          className="
                            mb-8
                            aspect-video
                            w-full
                            max-w-md
                            rounded-3xl
                            object-cover
                          "

                        />

                      )
                    }



                    <h1 className="
                      text-3xl
                      font-light
                    ">

                      {
                        currentStepData.title
                      }

                    </h1>



                    <p className="
                      mt-4
                      max-w-md
                      text-[#9A9488]
                    ">

                      {
                        currentStepData.description
                      }

                    </p>



                    <button

                      onClick={handleContinue}

                      className="
                        mt-10
                        h-14
                        w-full
                        max-w-md
                        rounded-full
                        bg-[#C8AD7F]
                        text-sm
                        font-medium
                        text-black
                      "

                    >

                      {
                        currentStepData.cta ??
                        "Comenzar"
                      }

                    </button>


                  </div>


                </motion.div>

              )
            }







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

                  className="
                    flex
                    h-full
                    flex-col
                  "

                >


                  <Progress

                    current={
                      currentStep + 1
                    }

                    total={
                      totalSteps
                    }

                    showCounter

                  />



                  <div className="
                    flex-1
                    overflow-hidden
                  ">


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


                  </div>




                  <BottomActions

                    onBack={back}

                    onNext={handleContinue}

                    showBack={
                      !isFirstStep
                    }

                    disabled={
                      !canContinue
                    }

                  />


                </motion.div>

              )
            }








            {
              currentStepData?.type === "summary" && (

                <motion.div

                  key="summary"

                  className="h-full"

                >

                  <Summary

                    questions={
                      config.steps
                        .filter(
                          step =>
                            step.type === "question"
                        )
                    }

                    answers={
                      answers
                    }

                    onContinue={
                      handleContinue
                    }

                  />


                </motion.div>

              )
            }








            {
              currentStepData?.type === "contact" && (

                <ContactForm

                  onSubmit={
                    handleSubmit
                  }

                />

              )
            }








            {
              currentStepData?.type === "completion" && (

                <Completion

                  onRestart={
                    handleRestart
                  }

                />

              )
            }



          </AnimatePresence>

        )
      }


    </main>

  )

}