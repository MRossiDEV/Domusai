"use client"

import {
  useState
} from "react"

import {
  motion
} from "framer-motion"

import {
  Mail,
  Phone,
  User,
  MessageCircle,
  FileText
} from "lucide-react"



interface ContactFormProps {

  onSubmit: (
    data: Record<string, string>
  ) => void

}



export default function ContactForm({

  onSubmit

}: ContactFormProps) {



  const [form, setForm] = useState({

    fullName: "",

    email: "",

    phone: "",

    contactMethod: "WhatsApp",

    message: ""

  })



  const [error, setError] =
    useState("")





  function updateField(

    field: string,

    value: string

  ) {

    setForm(previous => ({

      ...previous,

      [field]: value

    }))

  }





  function handleSubmit() {


    if (

      !form.fullName ||

      !form.email ||

      !form.phone

    ) {

      setError(
        "Completá tus datos para continuar."
      )

      return

    }



    setError("")



    onSubmit({

      fullName:
        form.fullName,

      email:
        form.email,

      phone:
        form.phone,

      contactMethod:
        form.contactMethod,

      message:
        form.message

    })


  }





  return (

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

        duration:0.5

      }}

      className="
        flex
        h-full
        flex-col
        overflow-y-auto
        px-6
        pb-32
      "

    >



      <div

        className="
          pt-10
          pb-8
        "

      >

        <span

          className="
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-[#C8AD7F]
          "

        >

          Datos de contacto

        </span>



        <h1

          className="
            mt-6
            text-[34px]
            font-light
            leading-tight
            tracking-[-0.04em]
            text-[#F5F1E8]
          "

        >

          ¿Cómo podemos acompañarte?

        </h1>



        <p

          className="
            mt-5
            text-base
            leading-relaxed
            text-[#9A9488]
          "

        >

          Usaremos esta información para preparar
          tu selección personalizada y contactarte.

        </p>


      </div>





      <div

        className="
          space-y-4
        "

      >



        <InputField

          icon={<User size={18}/>}

          placeholder="Nombre completo"

          value={form.fullName}

          onChange={(value) =>
            updateField(
              "fullName",
              value
            )
          }

        />




        <InputField

          icon={<Mail size={18}/>}

          placeholder="Email"

          type="email"

          value={form.email}

          onChange={(value) =>
            updateField(
              "email",
              value
            )
          }

        />




        <InputField

          icon={<Phone size={18}/>}

          placeholder="WhatsApp / Teléfono"

          value={form.phone}

          onChange={(value) =>
            updateField(
              "phone",
              value
            )
          }

        />





        <InputField

          icon={<FileText size={18}/>}

          placeholder="Mensaje adicional (opcional)"

          value={form.message}

          onChange={(value) =>
            updateField(
              "message",
              value
            )
          }

        />






        <div

          className="
            rounded-[22px]
            border
            border-white/[0.08]
            bg-[#181818]
            p-5
          "

        >


          <div

            className="
              flex
              items-center
              gap-3
              text-[#F5F1E8]
            "

          >

            <MessageCircle size={18}/>


            <span className="text-sm">

              Preferencia de contacto

            </span>


          </div>





          <div

            className="
              mt-4
              grid
              grid-cols-3
              gap-3
            "

          >

            {

              [

                {
                  value:"WhatsApp",
                  label:"WhatsApp"
                },

                {
                  value:"Email",
                  label:"Email"
                },

                {
                  value:"Llamada",
                  label:"Llamada"
                }

              ].map(option => (

                <button

                  key={
                    option.value
                  }

                  type="button"

                  onClick={() =>
                    updateField(
                      "contactMethod",
                      option.value
                    )
                  }

                  className={`

                    h-12

                    rounded-full

                    border

                    text-sm

                    transition

                    ${
                      form.contactMethod === option.value

                      ?

                      "border-[#C8AD7F] bg-[#C8AD7F] text-[#111111]"

                      :

                      "border-white/[0.08] bg-[#111111] text-[#F5F1E8]"

                    }

                  `}

                >

                  {option.label}

                </button>

              ))

            }


          </div>


        </div>






        {
          error && (

            <p className="
              text-sm
              text-red-400
            ">

              {error}

            </p>

          )
        }


      </div>






      <button

        type="button"

        onClick={handleSubmit}

        className="
          mt-auto
          h-14
          w-full
          rounded-full
          bg-[#C8AD7F]
          text-sm
          font-medium
          tracking-wide
          text-[#111111]
          shadow-[0_12px_35px_rgba(200,173,127,0.18)]
          transition
          active:scale-[0.98]
        "

      >

        Enviar evaluación


      </button>





    </motion.div>

  )

}





interface InputFieldProps {

  icon: React.ReactNode

  placeholder: string

  value: string

  type?: string

  onChange: (
    value:string
  ) => void

}





function InputField({

  icon,

  placeholder,

  value,

  type="text",

  onChange

}: InputFieldProps) {


  return (

    <div

      className="
        flex
        items-center
        gap-4
        rounded-[22px]
        border
        border-white/[0.08]
        bg-[#181818]
        px-5
        py-4
        text-[#F5F1E8]
      "

    >


      <div className="
        text-[#C8AD7F]
      ">

        {icon}

      </div>




      <input

        type={type}

        value={value}

        onChange={(event) =>
          onChange(
            event.target.value
          )
        }

        placeholder={placeholder}

        className="
          w-full
          bg-transparent
          text-base
          outline-none
          placeholder:text-[#77736B]
        "

      />


    </div>

  )

}