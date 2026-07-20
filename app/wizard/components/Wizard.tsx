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
  WizardConfig,
  QuestionStep
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







  function handleNext() {

    if (
      currentStepData?.type === "contact"
    ) {

      return

    }


    next()

  }








  function handleContactSubmit(

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







  const questionSteps =

    config.steps.filter(

      (step): step is QuestionStep =>

        step.type === "question"

    )








  if (!currentStepData) {

    return null

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
              currentStepData.type === "intro" && (

                <motion.div

                  key="intro"

                  initial={{
                    opacity:0
                  }}

                  animate={{
                    opacity:1
                  }}

                  className="
                    relative
                    h-full
                    w-full
                    overflow-hidden
                  "

                >





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

                        loop

                        playsInline

                        className="
                          absolute
                          inset-0
                          h-full
                          w-full
                          object-cover
                        "

                      />

                    )
                  }







                  <div

                    className="
                      absolute
                      inset-0
                      bg-black/60
                    "

                  />








                  <div

                    className="
                      relative
                      z-10
                      flex
                      h-full
                      flex-col
                      items-center
                      justify-end
                      px-6
                      pb-12
                      text-center
                    "

                  >





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
                        max-w-lg
                        text-4xl
                        font-light
                        leading-tight
                        tracking-[-0.04em]
                        text-white
                      "

                    >

                      {
                        currentStepData.title
                      }

                    </h1>








                    {
                      currentStepData.description && (

                        <p

                          className="
                            mt-5
                            max-w-md
                            text-base
                            leading-relaxed
                            text-white/70
                          "

                        >

                          {
                            currentStepData.description
                          }

                        </p>

                      )
                    }









                    <button

                      type="button"

                      onClick={handleNext}

                      className="
                        mt-10
                        h-14
                        w-full
                        max-w-md
                        rounded-full
                        bg-[#C8AD7F]
                        text-sm
                        font-medium
                        text-[#111111]
                        transition
                        active:scale-[0.98]
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








                  <div

                    className="
                      flex-1
                      overflow-hidden
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


                  </div>








                  <BottomActions

                    onBack={back}

                    onNext={handleNext}

                    showBack={
                      !isFirstStep
                    }

                    disabled={
                      !canContinue
                    }

                    isLastStep={
                      false
                    }

                  />






                </motion.div>

              )

            }













            {
              currentStepData.type === "summary" && (

                <motion.div

                  key="summary"

                  className="h-full"

                >

                  <Summary

                    questions={
                      questionSteps
                    }

                    answers={
                      answers
                    }

                    onContinue={
                      handleNext
                    }

                  />


                </motion.div>

              )

            }












            {
              currentStepData.type === "contact" && (

                <motion.div

                  key="contact"

                  className="h-full"

                >

                  <ContactForm

                    onSubmit={
                      handleContactSubmit
                    }

                  />

                </motion.div>

              )

            }












            {
              currentStepData.type === "processing" && (

                <motion.div

                  key="processing"

                  initial={{
                    opacity:0
                  }}

                  animate={{
                    opacity:1
                  }}

                  className="
                    flex
                    h-full
                    items-center
                    justify-center
                  "

                >

                  <p

                    className="
                      text-[#9A9488]
                    "

                  >

                    Preparando su perfil de adquisición...

                  </p>


                </motion.div>

              )

            }












            {
              currentStepData.type === "completion" && (

                <motion.div

                  key="completion"

                  className="h-full"

                >

                  <Completion

                    onRestart={
                      handleRestart
                    }

                  />

                </motion.div>

              )

            }






          </AnimatePresence>

        )

      }







    </main>

  )

}