export type FlowStepType =
  | "intro"
  | "question"
  | "summary"
  | "contact"
  | "processing"
  | "completion"



export type QuestionType =
  | "single"
  | "multiple"
  | "text"
  | "email"
  | "phone"
  | "number"
  | "range"
  | "select"
  | "location"
  | "currency"



export type QuestionCategory =
  | "profile"
  | "contact"
  | "situation"
  | "property"
  | "lifestyle"
  | "location"
  | "financial"
  | "timeline"
  | "additional"



export interface WizardOption {

  value:string

  label:string

  description?:string

  icon?:string

  score?:number

  tags?:string[]

}



export interface ValidationRules {

  required?:boolean

  minLength?:number

  maxLength?:number

  min?:number

  max?:number

  pattern?:string

}



export interface ConditionalRule {

  questionId:string

  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "greater_than"
    | "less_than"

  value:
    | string
    | number
    | boolean

}



export interface BaseStep {

  id:string

  type:FlowStepType

  title?:string

  subtitle?:string

  description?:string

}



export interface IntroStep extends BaseStep {

  type:"intro"

  video?:string

  poster?:string

  cta?:string

}



export interface QuestionUI {

  layout?:
    | "cards"
    | "list"
    | "grid"
    | "input"

  image?:string

  animation?:
    | "fade"
    | "slide"
    | "scale"

  allowSkip?:boolean

}



export interface QuestionStep extends BaseStep {

  type:"question"

  category:QuestionCategory

  questionType:QuestionType

  placeholder?:string

  options?:WizardOption[]

  validation?:ValidationRules

  condition?:ConditionalRule

  required?:boolean


  ui?:QuestionUI


  aiContext?:{

    importance:
      | "low"
      | "medium"
      | "high"

    purpose:
      | "qualification"
      | "recommendation"
      | "segmentation"
      | "personalization"

    tags?:string[]

  }


  analytics?:{

    eventName?:string

  }

}



export interface SummaryStep extends BaseStep {

  type:"summary"

}



export interface ContactStep extends BaseStep {

  type:"contact"

}



export interface ProcessingStep extends BaseStep {

  type:"processing"

}



export interface CompletionStep extends BaseStep {

  type:"completion"

}



export type FlowStep =
  | IntroStep
  | QuestionStep
  | SummaryStep
  | ContactStep
  | ProcessingStep
  | CompletionStep





export interface WizardAnswer {

  questionId:string

  value:
    | string
    | string[]
    | number

  timestamp?:number

}





export interface ContactInformation {

  fullName:string

  email:string

  phone:string

  contactMethod:
    | "WhatsApp"
    | "Email"
    | "Llamada"

  message?:string

}





export interface WizardSubmission {

  assessment:
    Record<string,WizardAnswer>

  contact:ContactInformation

  startedAt?:number

  completedAt?:number

}





export interface WizardState {

  currentStep:number

  answers:
    Record<string,WizardAnswer>

  startedAt?:number

  completedAt?:number

  contact?:ContactInformation

}





export interface WizardConfig {

  id:string

  title:string

  description?:string

  steps:FlowStep[]

  settings?:{

    showProgress?:boolean

    allowBack?:boolean

    saveProgress?:boolean

    autoSave?:boolean

    showStepCounter?:boolean

    mobileAppMode?:boolean

  }

}