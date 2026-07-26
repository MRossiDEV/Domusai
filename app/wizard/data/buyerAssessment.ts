import type {
  WizardConfig
} from "../types"

// Neighborhood/amenity/lifestyle option values are the exact strings used
// elsewhere in the app (lib/discover/constants.ts) — matching Listing.city /
// Listing.tags / LIFESTYLES exactly means answers-to-filters.ts can pass them
// straight through with no slug-to-label lookup table.
//
// This flow is intentionally short and practical — it exists to build a real
// curated deck for an everyday buyer/renter, not to qualify a luxury lead.
// No contact info is collected here; that only happens later, once a listing
// actually gets a strong match (see MatchCelebration/ViewingForm), so nobody
// has to hand over their details just to start browsing.

export const buyerAssessment: WizardConfig = {

  id: "buyer-assessment",

  title:
    "Encontrá tu próximo lugar",

  description:
    "Contanos qué estás buscando y armamos una selección hecha a tu medida.",


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
        "Asistente de búsqueda",

      subtitle:
        "Encontrá tu próximo lugar en Uruguay",

      description:
        "Por favor responde unas preguntas rápidas para entender qué estás buscando y preparar una selección a tu medida.",

      video:
        "/videos/avatar-intro.mp4",

      poster:
        "/images/avatar-poster.jpg",

      cta:
        "Comenzar"

    },


    {
      id: "intent",

      type: "question",

      category: "profile",

      questionType: "single",

      title:
        "¿Qué estás buscando?",

      required: true,

      options: [

        {
          value: "buy",
          label: "Quiero Comprar"
        },

        {
          value: "rent",
          label: "Busco Alquilar"
        },

        {
          value: "invest",
          label: "Pienso Invertir"
        },

        {
          value: "sell",
          label: "Quiero Vender"
        }

      ]

    },


    {
      id: "lifestyle",

      type: "question",

      category: "lifestyle",

      questionType: "multiple",

      title:
        "¿Cómo te gusta vivir?",

      required: false,

      options: [

        { value: "beach", label: "Cerca de la playa" },
        { value: "walkable", label: "Con vida de barrio, todo cerca" },
        { value: "quiet", label: "Tranquilo y residencial" },
        { value: "family", label: "Pensado para la familia" },
        { value: "central", label: "Central y bien conectado" }

      ]

    },


    {
      id:"preferred_locations",

      type:"question",

      category:"location",

      questionType:"multiple",

      title:
        "¿Qué zonas te interesan?",

      required:true,

      options:[

        { value: "Pocitos", label: "Pocitos" },
        { value: "Punta Carretas", label: "Punta Carretas" },
        { value: "Carrasco", label: "Carrasco" },
        { value: "Ciudad Vieja", label: "Ciudad Vieja" },
        { value: "Cordón", label: "Cordón" },
        { value: "Malvín", label: "Malvín" },
        { value: "Buceo", label: "Buceo" }

      ]

    },


    {
      id:"property_type",

      type:"question",

      category:"property",

      questionType:"multiple",

      title:
        "¿Qué tipo de propiedad te interesa?",

      required:false,

      options:[

        { value: "apartment", label: "Apartamento" },
        { value: "house", label: "Casa" },
        { value: "ph", label: "PH" },
        { value: "loft", label: "Loft" }

      ]

    },


    {
      id:"bedrooms",

      type:"question",

      category:"property",

      questionType:"single",

      title:
        "¿Cuántos dormitorios necesitás?",

      required:false,

      options:[

        { value:"0", label:"No tengo preferencia" },
        { value:"1", label:"1 o más" },
        { value:"2", label:"2 o más" },
        { value:"3", label:"3 o más" },
        { value:"4", label:"4 o más" }

      ]

    },


    {
      id:"budget_purchase",

      type:"question",

      category:"financial",

      questionType:"single",

      title:
        "¿Cuál es tu presupuesto?",

      required:false,

      condition:{
        questionId:"intent",
        operator:"not_equals",
        value:"rent"
      },

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
      id:"budget_rent",

      type:"question",

      category:"financial",

      questionType:"single",

      title:
        "¿Cuál es tu presupuesto mensual?",

      required:false,

      condition:{
        questionId:"intent",
        operator:"equals",
        value:"rent"
      },

      options:[

        {
          value:"800",
          label:"Hasta USD 800"
        },

        {
          value:"1500",
          label:"USD 800 - 1.500"
        },

        {
          value:"2500",
          label:"USD 1.500 - 2.500"
        },

        {
          value:"4000",
          label:"USD 2.500 - 4.000"
        },

        {
          value:"8000",
          label:"Más de USD 4.000"
        }

      ]

    },


    {
      id:"target_yield",

      type:"question",

      category:"financial",

      questionType:"single",

      title:
        "¿Qué rentabilidad mínima buscás?",

      required:false,

      condition:{
        questionId:"intent",
        operator:"equals",
        value:"invest"
      },

      options:[

        { value:"0", label:"No tengo un mínimo en mente" },
        { value:"3", label:"3% o más" },
        { value:"5", label:"5% o más" },
        { value:"7", label:"7% o más" }

      ]

    },


    {
      id:"amenities",

      type:"question",

      category:"lifestyle",

      questionType:"multiple",

      title:
        "¿Qué comodidades te gustaría tener?",

      required:false,

      options:[

        { value: "Parking", label: "Garaje" },
        { value: "Balcony", label: "Balcón" },
        { value: "Pet friendly", label: "Acepta mascotas" },
        { value: "Elevator", label: "Ascensor" },
        { value: "Pool", label: "Piscina" },
        { value: "Doorman", label: "Portero" },
        { value: "Renovated", label: "Renovado" }

      ]

    },


    {
      id:"parking",

      type:"question",

      category:"property",

      questionType:"single",

      title:
        "¿Necesitás cochera / garaje?",

      required:true,

      options:[

        { value:"yes", label:"Sí, es imprescindible" },
        { value:"preferred", label:"Prefiero que tenga, no excluyente" },
        { value:"no", label:"No la necesito" }

      ]

    },


    {
      id:"summary",

      type:"summary",

      title:
        "Resumen de tu búsqueda"

    },


    {
      id:"processing",

      type:"processing",

      title:
        "Preparando tu selección"

    },


    {
      id:"completion",

      type:"completion",

      title:
        "Todo listo"

    }


  ]

}
