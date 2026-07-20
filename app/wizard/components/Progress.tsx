"use client"


interface ProgressProps {

  current: number

  total: number

  showCounter?: boolean

}



export default function Progress({

  current,

  total,

  showCounter = false

}: ProgressProps) {


  const progress =
    total === 0
      ? 0
      :
      (
        current / total
      ) * 100




  return (

    <div

      className="
        w-full
        px-6
        pt-6
      "

    >


      <div

        className="
          h-[2px]
          w-full
          overflow-hidden
          rounded-full
          bg-white/[0.08]
        "

      >


        <div

          className="
            h-full
            rounded-full
            bg-[#C8AD7F]
            transition-all
            duration-700
            ease-out
          "

          style={{

            width:
              `${progress}%`

          }}

        />


      </div>





      {
        showCounter && (

          <div

            className="
              mt-4
              flex
              justify-between
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-[#8F897D]
            "

          >

            <span>

              Evaluación

            </span>


            <span>

              {current} / {total}

            </span>


          </div>

        )
      }



    </div>

  )

}