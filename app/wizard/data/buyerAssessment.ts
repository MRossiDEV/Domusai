import type { WizardConfig } from "../types"


export const buyerAssessment: WizardConfig = {

  id: "buyer-assessment",

  title: "Encontrá una propiedad alineada con tu forma de vivir.",

  description:
    "Una evaluación personalizada para comprender tus necesidades y preparar una selección relevante.",


  settings: {
    showProgress: true,
    allowBack: true,
    saveProgress: true,
    autoSave: true,
    mobileAppMode: true,
    showStepCounter: false
  },


  questions: [

    {
      id: "buyer_intention",

      category: "profile",

      type: "single",

      title:
        "¿En qué etapa te encontrás actualmente?",

      subtitle:
        "Esto nos ayuda a entender cómo acompañarte.",


      required: true,


      options: [

        {
          value: "primary_home",

          label:
            "Busco mi próxima vivienda",

          description:
            "Un lugar pensado para mi vida diaria.",

          tags: [
            "living",
            "personal"
          ],

          score: 3
        },


        {
          value: "investment",

          label:
            "Quiero invertir en una propiedad",

          description:
            "Busco una oportunidad con potencial.",

          tags: [
            "investment"
          ],

          score: 4
        },


        {
          value: "relocation",

          label:
            "Estoy evaluando mudarme",

          description:
            "Un cambio de zona o estilo de vida.",

          tags: [
            "relocation"
          ],

          score: 3
        },


        {
          value: "second_home",

          label:
            "Busco una segunda residencia",

          description:
            "Un espacio para disfrutar nuevos momentos.",

          tags: [
            "lifestyle"
          ],

          score: 3
        }

      ],


      aiContext: {

        importance:
          "high",

        purpose:
          "segmentation",

        tags: [
          "buyer_type"
        ]

      },


      ui: {

        layout:
          "cards",

        animation:
          "slide",

        fullScreen:
          true

      }

    },


    {
      id: "household",

      category: "profile",

      type: "single",

      title:
        "¿Quién disfrutará principalmente de esta propiedad?",


      required: true,


      options: [

        {
          value: "alone",

          label:
            "Solo yo",

          score: 1
        },


        {
          value: "couple",

          label:
            "Pareja",

          score: 2
        },


        {
          value: "family",

          label:
            "Familia",

          score: 3
        },


        {
          value: "rental",

          label:
            "Renta o inversión",

          score: 4
        }

      ],


      aiContext: {

        importance:
          "medium",

        purpose:
          "personalization",

        tags: [
          "household"
        ]

      },


      ui: {

        layout:
          "cards",

        animation:
          "slide",

        fullScreen:
          true

      }

    },


    {
      id: "current_location",

      category: "situation",

      type: "location",

      title:
        "¿Dónde estás viviendo actualmente?",


      required: true,


      options: [

        {
          value: "montevideo",

          label:
            "Montevideo"
        },


        {
          value: "interior",

          label:
            "Interior del país"
        },


        {
          value: "abroad",

          label:
            "Exterior"
        },


        {
          value: "other",

          label:
            "Otra situación"
        }

      ],


      aiContext: {

        importance:
          "high",

        purpose:
          "qualification",

        tags: [
          "origin",
          "relocation"
        ]

      },


      ui: {

        layout:
          "cards",

        animation:
          "slide",

        fullScreen:
          true

      }

    },


    {
      id: "property_type",

      category: "property",

      type: "multiple",

      title:
        "¿Qué tipo de propiedad estás buscando?",


      required: true,


      options: [

        {
          value: "apartment",

          label:
            "Apartamento"
        },


        {
          value: "house",

          label:
            "Casa"
        },


        {
          value: "land",

          label:
            "Terreno"
        },


        {
          value: "rural",

          label:
            "Propiedad rural"
        },


        {
          value: "open",

          label:
            "Estoy abierto a recomendaciones"
        }

      ],


      aiContext: {

        importance:
          "high",

        purpose:
          "recommendation",

        tags: [
          "property_type"
        ]

      },


      ui: {

        layout:
          "cards",

        animation:
          "slide",

        fullScreen:
          true

      }

    },


    {
      id: "lifestyle_preferences",

      category: "lifestyle",

      type: "multiple",

      title:
        "¿Qué características son importantes para vos?",


      options: [

        {
          value: "natural_light",

          label:
            "Luz natural"
        },


        {
          value: "open_spaces",

          label:
            "Espacios amplios"
        },


        {
          value: "garden",

          label:
            "Exterior o jardín"
        },


        {
          value: "view",

          label:
            "Vista"
        },


        {
          value: "security",

          label:
            "Seguridad"
        },


        {
          value: "garage",

          label:
            "Garage"
        },


        {
          value: "services",

          label:
            "Cerca de servicios"
        }

      ],


      aiContext: {

        importance:
          "medium",

        purpose:
          "recommendation",

        tags: [
          "lifestyle"
        ]

      },


      ui: {

        layout:
          "grid",

        animation:
          "scale",

        fullScreen:
          true

      }

    },


    {
      id: "budget",

      category: "financial",

      type: "currency",

      title:
        "¿Cuál es tu rango de inversión?",


      required: true,


      options: [

        {
          value: "under_100k",

          label:
            "Hasta USD 100.000"
        },


        {
          value: "100_250k",

          label:
            "USD 100.000 - 250.000"
        },


        {
          value: "250_500k",

          label:
            "USD 250.000 - 500.000"
        },


        {
          value: "500k_plus",

          label:
            "Más de USD 500.000"
        },


        {
          value: "unknown",

          label:
            "Prefiero conversarlo"
        }

      ],


      aiContext: {

        importance:
          "high",

        purpose:
          "qualification",

        tags: [
          "budget"
        ]

      },


      ui: {

        layout:
          "cards",

        animation:
          "slide",

        fullScreen:
          true

      }

    },


    {
      id: "timeline",

      category: "timeline",

      type: "single",

      title:
        "¿Cuándo te gustaría avanzar?",


      options: [

        {
          value: "immediate",

          label:
            "Estoy listo para comprar"
        },


        {
          value: "months",

          label:
            "En los próximos meses"
        },


        {
          value: "exploring",

          label:
            "Estoy explorando opciones"
        }

      ],


      aiContext: {

        importance:
          "high",

        purpose:
          "qualification",

        tags: [
          "urgency"
        ]

      },


      ui: {

        layout:
          "cards",

        animation:
          "slide",

        fullScreen:
          true

      }

    },


    {
      id: "additional_notes",

      category: "additional",

      type: "text",

      title:
        "¿Hay algo más que deberíamos saber?",


      placeholder:
        "Contanos cualquier detalle importante sobre tu búsqueda...",


      validation: {

        maxLength:
          500

      },


      aiContext: {

        importance:
          "high",

        purpose:
          "personalization",

        tags: [
          "free_context"
        ]

      },


      ui: {

        layout:
          "input",

        animation:
          "fade",

        fullScreen:
          true,

        allowSkip:
          true

      }

    }

  ]

}