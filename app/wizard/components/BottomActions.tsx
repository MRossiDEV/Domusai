"use client"

import {
  ArrowLeft,
  ArrowRight,
  Check
} from "lucide-react"



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
        border-white/[0.08]
        bg-[#111111]/85
        px-6
        pt-4
        backdrop-blur-2xl
        pb-[calc(env(safe-area-inset-bottom)+1rem)]
      "

    >



      <div

        className="
          mx-auto
          flex
          max-w-xl
          items-center
          gap-3
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
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.12]
                bg-white/[0.04]
                text-[#F5F1E8]
                backdrop-blur-xl
                transition-all
                active:scale-95
              "

            >

              <ArrowLeft

                size={20}

                strokeWidth={1.6}

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
            bg-[#C8AD7F]
            px-6
            text-sm
            font-medium
            tracking-wide
            text-[#111111]
            shadow-[0_10px_35px_rgba(200,173,127,0.18)]
            transition-all
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



          {
            isLastStep

              ? (

                <Check

                  size={18}

                  strokeWidth={1.8}

                />

              )

              : (

                <ArrowRight

                  size={18}

                  strokeWidth={1.8}

                />

              )

          }



        </button>




      </div>




    </div>

  )

}