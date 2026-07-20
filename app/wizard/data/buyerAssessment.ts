import type {
  WizardConfig
} from "../types"

export const buyerAssessment: WizardConfig = {

  id: "buyer-assessment",

  title:
    "Solicitud de Representación como Comprador",

  description:
    "Complete la siguiente evaluación para que nuestro equipo pueda analizar su perfil y asignarle un asesor especializado.",

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
        "Antes de comenzar, uno de nuestros asistentes virtuales le explicará brevemente cómo funciona el proceso de evaluación y cómo utilizaremos la información proporcionada para preparar una búsqueda personalizada.",

      video: "/videos/avatar-intro.mp4",

      poster: "/images/avatar-poster.jpg",

      cta: "Comenzar evaluación"
    },

    {
      id: "buyer_objective",

      type: "question",

      category: "profile",

      questionType: "single",

      title:
        "¿Cuál es el objetivo principal de esta adquisición?",

      subtitle:
        "Seleccione la opción que mejor describa su intención.",

      required: true,

      options: [

        {
          value: "primary_residence",
          label: "Residencia principal"
        },

        {
          value: "investment",
          label: "Inversión patrimonial"
        },

        {
          value: "relocation",
          label: "Relocalización a Uruguay"
        },

        {
          value: "second_home",
          label: "Segunda residencia"
        },

        {
          value: "corporate",
          label: "Compra corporativa"
        }

      ]

    },

    {
      id: "purchase_stage",

      type: "question",

      category: "profile",

      questionType: "single",

      title:
        "¿En qué etapa se encuentra actualmente?",

      required: true,

      options: [

        {
          value: "ready",
          label: "Listo para comprar"
        },

        {
          value: "shortlist",
          label: "Evaluando opciones concretas"
        },

        {
          value: "planning",
          label: "Planificando la compra"
        },

        {
          value: "research",
          label: "Investigación inicial"
        }

      ]

    },

    {
      id: "decision_makers",

      type: "question",

      category: "profile",

      questionType: "single",

      title:
        "¿Quién participa en la decisión de compra?",

      required: true,

      options: [

        {
          value: "self",
          label: "Solo yo"
        },

        {
          value: "couple",
          label: "Pareja"
        },

        {
          value: "family",
          label: "Familia"
        },

        {
          value: "partners",
          label: "Socios o inversionistas"
        }

      ]

    },

    {
      id: "current_country",

      type: "question",

      category: "location",

      questionType: "single",

      title:
        "¿Dónde reside actualmente?",

      required: true,

      options: [

        {
          value: "uruguay",
          label: "Uruguay"
        },

        {
          value: "latin_america",
          label: "Latinoamérica"
        },

        {
          value: "north_america",
          label: "Norteamérica"
        },

        {
          value: "europe",
          label: "Europa"
        },

        {
          value: "other",
          label: "Otro"
        }

      ]

    },

    {
      id: "property_type",

      type: "question",

      category: "property",

      questionType: "multiple",

      title:
        "¿Qué tipo de propiedad desea evaluar?",

      required: true,

      options: [

        {
          value: "apartment",
          label: "Apartamento"
        },

        {
          value: "house",
          label: "Casa"
        },

        {
          value: "penthouse",
          label: "Penthouse"
        },

        {
          value: "land",
          label: "Terreno"
        },

        {
          value: "rural",
          label: "Propiedad rural"
        }

      ]

    },

    {
      id: "preferred_locations",

      type: "question",

      category: "location",

      questionType: "multiple",

      title:
        "¿Qué mercados desea que analicemos?",

      subtitle:
        "Puede seleccionar varias opciones.",

      required: true,

      options: [

        {
          value: "carrasco",
          label: "Carrasco"
        },

        {
          value: "punta_gorda",
          label: "Punta Gorda"
        },

        {
          value: "pocitos",
          label: "Pocitos"
        },

        {
          value: "punta_carretas",
          label: "Punta Carretas"
        },

        {
          value: "punta_del_este",
          label: "Punta del Este"
        },

        {
          value: "jose_ignacio",
          label: "José Ignacio"
        },

        {
          value: "other",
          label: "Otra ubicación"
        }

      ]

    },

    {
      id: "investment_range",

      type: "question",

      category: "financial",

      questionType: "single",

      title:
        "¿Cuál es el rango estimado de inversión?",

      required: true,

      options: [

        {
          value: "300k",
          label: "Hasta USD 300.000"
        },

        {
          value: "600k",
          label: "USD 300.000 - 600.000"
        },

        {
          value: "1m",
          label: "USD 600.000 - 1.000.000"
        },

        {
          value: "3m",
          label: "USD 1.000.000 - 3.000.000"
        },

        {
          value: "3m_plus",
          label: "Más de USD 3.000.000"
        },

        {
          value: "private",
          label: "Prefiero conversarlo personalmente"
        }

      ]

    },

    {
      id: "funding",

      type: "question",

      category: "financial",

      questionType: "single",

      title:
        "¿Cómo prevé financiar la adquisición?",

      required: true,

      options: [

        {
          value: "cash",
          label: "Fondos propios"
        },

        {
          value: "mortgage_approved",
          label: "Financiación aprobada"
        },

        {
          value: "mortgage_process",
          label: "Financiación en proceso"
        },

        {
          value: "corporate",
          label: "Compra corporativa"
        },

        {
          value: "private",
          label: "Prefiero conversarlo"
        }

      ]

    },

    {
      id: "timeline",

      type: "question",

      category: "timeline",

      questionType: "single",

      title:
        "¿En qué plazo espera concretar la compra?",

      required: true,

      options: [

        {
          value: "30_days",
          label: "Dentro de 30 días"
        },

        {
          value: "90_days",
          label: "Dentro de 3 meses"
        },

        {
          value: "6_months",
          label: "Dentro de 6 meses"
        },

        {
          value: "flexible",
          label: "Sin fecha definida"
        }

      ]

    },

    {
      id: "lifestyle",

      type: "question",

      category: "lifestyle",

      questionType: "multiple",

      title:
        "¿Qué características son prioritarias para usted?",

      options: [

        {
          value: "security",
          label: "Seguridad"
        },

        {
          value: "architecture",
          label: "Arquitectura"
        },

        {
          value: "waterfront",
          label: "Vista al agua"
        },

        {
          value: "garden",
          label: "Jardín"
        },

        {
          value: "privacy",
          label: "Privacidad"
        },

        {
          value: "office",
          label: "Home Office"
        },

        {
          value: "garage",
          label: "Garage"
        },

        {
          value: "smart_home",
          label: "Tecnología Smart Home"
        }

      ]

    },

    {
      id: "additional_notes",

      type: "question",

      category: "additional",

      questionType: "text",

      title:
        "¿Hay algún requerimiento importante que nuestro equipo deba conocer?",

      placeholder:
        "Comparta cualquier detalle que considere relevante para la búsqueda.",

      validation: {

        maxLength: 1000

      },

      ui: {

        layout: "input",

        animation: "fade",

        allowSkip: true

      }

    },

    {
      id: "summary",

      type: "summary"

    },

    {
      id: "contact",

      type: "contact"

    },

    {
      id: "processing",

      type: "processing",

      title:
        "Preparando su perfil de adquisición"

    },

    {
      id: "completed",

      type: "completion"

    }

  ]

}