import type {
  WizardConfig
} from "../types"


export const buyerAssessment: WizardConfig = {

  id: "buyer-assessment",

  title:
    "Solicitud de Representación como Comprador",

  description:
    "Complete la evaluación para que nuestro equipo pueda analizar su perfil y preparar una búsqueda personalizada.",


  settings: {

    showProgress: true,

    allowBack: true,

    saveProgress: true,

    autoSave: true,

    showStepCounter: true,

    mobileAppMode: true

  },


  steps: [

    {
      id: "welcome",

      type: "intro",

      title:
        "Bienvenido a DOMUSAI",

      subtitle:
        "Asistente Privado de Adquisición Inmobiliaria",

      description:
        "Realizaremos una evaluación breve para comprender sus objetivos, preferencias y criterios de adquisición.",

      video:
        "/videos/avatar-intro.mp4",

      poster:
        "/images/avatar-poster.jpg",

      cta:
        "Comenzar evaluación"

    },


    {
      id: "buyer_objective",

      type: "question",

      category: "profile",

      questionType: "single",

      title:
        "¿Cuál es el objetivo principal de esta adquisición?",

      required: true,

      options: [

        {
          value:"primary_residence",
          label:"Residencia principal"
        },

        {
          value:"investment",
          label:"Inversión patrimonial"
        },

        {
          value:"relocation",
          label:"Relocalización a Uruguay"
        },

        {
          value:"second_home",
          label:"Segunda residencia"
        }

      ]

    },


    {
      id:"purchase_stage",

      type:"question",

      category:"profile",

      questionType:"single",

      title:
        "¿En qué etapa se encuentra actualmente?",

      required:true,

      options:[

        {
          value:"ready",
          label:"Listo para comprar"
        },

        {
          value:"shortlist",
          label:"Evaluando propiedades"
        },

        {
          value:"planning",
          label:"Planificando compra"
        },

        {
          value:"research",
          label:"Investigación inicial"
        }

      ]

    },


    {
      id:"current_country",

      type:"question",

      category:"location",

      questionType:"single",

      title:
        "¿Dónde reside actualmente?",

      required:true,

      options:[

        {
          value:"uruguay",
          label:"Uruguay"
        },

        {
          value:"latin_america",
          label:"Latinoamérica"
        },

        {
          value:"north_america",
          label:"Norteamérica"
        },

        {
          value:"europe",
          label:"Europa"
        },

        {
          value:"other",
          label:"Otro"
        }

      ]

    },


    {
      id:"property_type",

      type:"question",

      category:"property",

      questionType:"multiple",

      title:
        "¿Qué tipo de propiedad desea evaluar?",

      required:true,

      options:[

        {
          value:"apartment",
          label:"Apartamento"
        },

        {
          value:"house",
          label:"Casa"
        },

        {
          value:"penthouse",
          label:"Penthouse"
        },

        {
          value:"land",
          label:"Terreno"
        }

      ]

    },


    {
      id:"preferred_locations",

      type:"question",

      category:"location",

      questionType:"multiple",

      title:
        "¿Qué zonas desea analizar?",

      required:true,

      options:[

        {
          value:"carrasco",
          label:"Carrasco"
        },

        {
          value:"punta_gorda",
          label:"Punta Gorda"
        },

        {
          value:"pocitos",
          label:"Pocitos"
        },

        {
          value:"punta_carretas",
          label:"Punta Carretas"
        },

        {
          value:"punta_del_este",
          label:"Punta del Este"
        }

      ]

    },


    {
      id:"investment_range",

      type:"question",

      category:"financial",

      questionType:"single",

      title:
        "¿Cuál es el rango estimado de inversión?",

      required:true,

      options:[

        {
          value:"300k",
          label:"Hasta USD 300.000"
        },

        {
          value:"600k",
          label:"USD 300.000 - 600.000"
        },

        {
          value:"1m",
          label:"USD 600.000 - 1.000.000"
        },

        {
          value:"3m",
          label:"USD 1.000.000 - 3.000.000"
        },

        {
          value:"3m_plus",
          label:"Más de USD 3.000.000"
        }

      ]

    },


    {
      id:"timeline",

      type:"question",

      category:"timeline",

      questionType:"single",

      title:
        "¿En qué plazo espera concretar la compra?",

      required:true,

      options:[

        {
          value:"30_days",
          label:"Dentro de 30 días"
        },

        {
          value:"90_days",
          label:"Dentro de 3 meses"
        },

        {
          value:"6_months",
          label:"Dentro de 6 meses"
        },

        {
          value:"flexible",
          label:"Sin fecha definida"
        }

      ]

    },


    {
      id:"additional_notes",

      type:"question",

      category:"additional",

      questionType:"text",

      title:
        "¿Existe algún requerimiento adicional?",

      placeholder:
        "Indique cualquier detalle importante.",

      ui:{

        layout:"input",

        allowSkip:true

      }

    },


    {
      id:"summary",

      type:"summary",

      title:
        "Resumen de evaluación"

    },


    {
      id:"contact",

      type:"contact",

      title:
        "Datos de contacto"

    },


    {
      id:"processing",

      type:"processing",

      title:
        "Preparando su perfil de adquisición"

    },


    {
      id:"completion",

      type:"completion",

      title:
        "Evaluación completada"

    }


  ]

}