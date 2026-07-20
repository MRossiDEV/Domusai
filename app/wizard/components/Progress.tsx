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
          bg-neutral-200
        "
      >

        <div

          className="
            h-full
            rounded-full
            bg-neutral-900
            transition-all
            duration-500
            ease-out
          "

          style={{
            width: `${progress}%`
          }}

        />

      </div>



      {
        showCounter && (

          <div
            className="
              mt-3
              text-right
              text-xs
              uppercase
              tracking-[0.2em]
              text-neutral-400
            "
          >

            {current} / {total}

          </div>

        )
      }


    </div>

  )

}