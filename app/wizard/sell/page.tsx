"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import Wizard from "../components/Wizard"
import { sellerOnboarding } from "../data/sellerOnboarding"
import { mapSellerAnswersToLead } from "../lib/seller-answers-to-lead"
import { submitSellerLead } from "../actions"
import { useDiscover } from "@/lib/discover/filters-context"
import type { WizardAnswer } from "../types"

export default function SellWizardPage() {
  const router = useRouter()
  const { visitorName } = useDiscover()

  async function handleFinish(summary: Record<string, WizardAnswer>) {
    const { contact, property } = mapSellerAnswersToLead(summary)
    const result = await submitSellerLead(contact, property)

    if (!result.ok) {
      toast.error("No pudimos enviar tu información. Un agente igual puede contactarte si volvés a intentarlo.")
    }
  }

  return (
    <Wizard
      config={sellerOnboarding}
      collectNameOnIntro={false}
      progressLabel="Tu propiedad"
      onFinish={handleFinish}
      processingMessage={(_, name) => (name ? `Enviando tus datos, ${name}...` : "Enviando tus datos...")}
      completion={{
        heading: visitorName ? `¡Gracias, ${visitorName}!` : "¡Gracias!",
        body: "Un agente de WEEGGO va a revisar los datos de tu propiedad y se va a poner en contacto para coordinar los próximos pasos.",
        ctaLabel: "Volver al inicio",
        onCta: () => router.push("/"),
        showRestart: false,
      }}
    />
  )
}
