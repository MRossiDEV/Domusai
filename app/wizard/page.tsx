"use client"

import Wizard from "./components/Wizard"

import { buyerAssessment } from "./data/buyerAssessment"



export default function WizardPage() {


  return (

    <Wizard

      config={
        buyerAssessment
      }

    />

  )

}