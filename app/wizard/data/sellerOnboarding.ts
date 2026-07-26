import type {
  WizardConfig
} from "../types"

// Property/amenity option values here don't need to match lib/discover/
// constants.ts exactly the way buyerAssessment.ts's do — this flow doesn't
// feed the Discover filters, it feeds a lead (weeggo_leads, source "sell")
// for a staff agent to review and manually list the property.

export const sellerOnboarding: WizardConfig = {

  id: "seller-onboarding",

  title:
    "Vendé tu propiedad",

  description:
    "Contanos sobre tu propiedad y tus datos de contacto — un agente de WEEGGO se pone en contacto para coordinar los próximos pasos.",


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
        "Vendamos tu propiedad",

      subtitle:
        "Contanos los detalles y un agente te contacta",

      description:
        "Excelente {{NAME}}! Si queres vender, voy a necesitar hacerte un par de preguntas rápidas sobre la propiedad y tus datos de contacto.",

      cta:
        "Comenzar"

    },


    {
      id:"property_type",

      type:"question",

      category:"property",

      questionType:"single",

      title:
        "¿Qué tipo de propiedad es?",

      required:true,

      options:[

        { value: "apartment", label: "Apartamento" },
        { value: "house", label: "Casa" },
        { value: "ph", label: "PH" },
        { value: "loft", label: "Loft" }

      ]

    },


    {
      id:"property_location",

      type:"question",

      category:"location",

      questionType:"single",

      title:
        "¿En qué zona está ubicada?",

      required:true,

      options:[

        { value: "Pocitos", label: "Pocitos" },
        { value: "Punta Carretas", label: "Punta Carretas" },
        { value: "Carrasco", label: "Carrasco" },
        { value: "Ciudad Vieja", label: "Ciudad Vieja" },
        { value: "Cordón", label: "Cordón" },
        { value: "Malvín", label: "Malvín" },
        { value: "Buceo", label: "Buceo" },
        { value: "Otra", label: "Otra zona" }

      ]

    },


    {
      id:"bedrooms",

      type:"question",

      category:"property",

      questionType:"single",

      title:
        "¿Cuántos dormitorios tiene?",

      required:true,

      options:[

        { value:"0", label:"Monoambiente" },
        { value:"1", label:"1" },
        { value:"2", label:"2" },
        { value:"3", label:"3" },
        { value:"4", label:"4 o más" }

      ]

    },


    {
      id:"bathrooms",

      type:"question",

      category:"property",

      questionType:"single",

      title:
        "¿Cuántos baños tiene?",

      required:true,

      options:[

        { value:"1", label:"1" },
        { value:"2", label:"2" },
        { value:"3", label:"3 o más" }

      ]

    },


    {
      id:"area_m2",

      type:"question",

      category:"property",

      questionType:"number",

      title:
        "¿Cuántos m² tiene la propiedad?",

      placeholder:
        "Superficie en m²",

      required:true,

      ui:{
        layout:"input"
      }

    },


    {
      id:"asking_price",

      type:"question",

      category:"financial",

      questionType:"number",

      title:
        "¿Cuánto esperás obtener por la propiedad?",

      subtitle:
        "En dólares (USD). Si no estás seguro, poné un valor estimado.",

      placeholder:
        "Precio estimado en USD",

      required:true,

      ui:{
        layout:"input"
      }

    },


    {
      id:"amenities",

      type:"question",

      category:"lifestyle",

      questionType:"multiple",

      title:
        "¿Qué características tiene?",

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
      id:"property_notes",

      type:"question",

      category:"additional",

      questionType:"text",

      title:
        "Contanos más sobre la propiedad",

      placeholder:
        "Estado, antigüedad, algo que la haga especial...",

      required:false,

      ui:{
        allowSkip:true
      }

    },


    {
      id:"full_name",

      type:"question",

      category:"contact",

      questionType:"text",

      title:
        "¿Cuál es tu nombre completo?",

      placeholder:
        "Nombre y apellido",

      required:true,

      ui:{
        layout:"input"
      }

    },


    {
      id:"email",

      type:"question",

      category:"contact",

      questionType:"email",

      title:
        "¿Cuál es tu email?",

      placeholder:
        "tu@email.com",

      required:true,

      ui:{
        layout:"input"
      }

    },


    {
      id:"phone",

      type:"question",

      category:"contact",

      questionType:"phone",

      title:
        "¿Cuál es tu teléfono?",

      placeholder:
        "+598 99 123 456",

      required:true,

      ui:{
        layout:"input"
      }

    },


    {
      id:"contact_method",

      type:"question",

      category:"contact",

      questionType:"single",

      title:
        "¿Cómo preferís que te contactemos?",

      required:true,

      options:[

        { value:"WhatsApp", label:"WhatsApp" },
        { value:"Email", label:"Email" },
        { value:"Llamada", label:"Llamada" }

      ]

    },


    {
      id:"summary",

      type:"summary",

      title:
        "Resumen"

    },


    {
      id:"processing",

      type:"processing",

      title:
        "Enviando tus datos"

    },


    {
      id:"completion",

      type:"completion",

      title:
        "Listo"

    }


  ]

}
