"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"


interface BottomActionsProps {

  onBack: () => void

  onNext: () => void

  showBack?: boolean

  disabled?: boolean

  isLastStep?: boolean

}



export default function BottomActions({

  onBack,

  onNext,

  showBack = true,

  disabled = false,

  isLastStep = false

}: BottomActionsProps) {


  return (

    <div

      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-neutral-200
        bg-[#F8F7F3]/90
        px-6
        pt-4
        backdrop-blur-xl
        pb-[calc(env(safe-area-inset-bottom)+1rem)]
      "

    >

      <div

        className="
          flex
          items-center
          gap-3
          max-w-xl
          mx-auto
        "

      >


        {
          showBack && (

            <button

              type="button"

              onClick={onBack}

              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-neutral-200
                bg-white
                text-neutral-900
                transition
                active:scale-95
              "

            >

              <ArrowLeft
                size={20}
                strokeWidth={1.8}
              />

            </button>

          )
        }



        <button

          type="button"

          onClick={onNext}

          disabled={disabled}

          className="
            flex
            h-14
            flex-1
            items-center
            justify-center
            gap-3
            rounded-full
            bg-neutral-900
            px-6
            text-sm
            font-medium
            tracking-wide
            text-white
            transition
            active:scale-[0.98]
            disabled:pointer-events-none
            disabled:opacity-40
          "

        >

          {
            isLastStep
              ? "Enviar evaluación"
              : "Continuar"
          }


          <ArrowRight

            size={18}

            strokeWidth={1.8}

          />

        </button>


      </div>


    </div>

  )

}