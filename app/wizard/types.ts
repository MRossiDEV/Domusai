export type QuestionType =
  | "single"
  | "multiple"
  | "text"
  | "number"
  | "range"
  | "select"
  | "location"
  | "currency"

export type QuestionCategory =
  | "profile"
  | "situation"
  | "property"
  | "lifestyle"
  | "location"
  | "financial"
  | "timeline"
  | "additional"


export interface WizardOption {
  value: string
  label: string
  description?: string
  icon?: string
  score?: number
  tags?: string[]
}


export interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}


export interface ConditionalRule {
  questionId: string
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "greater_than"
    | "less_than"

  value: string | number | boolean
}


export interface WizardQuestion {
  id: string

  category: QuestionCategory

  type: QuestionType

  title: string

  subtitle?: string

  placeholder?: string

  description?: string


  options?: WizardOption[]


  validation?: ValidationRules


  condition?: ConditionalRule


  required?: boolean


  aiContext?: {
    importance:
      | "low"
      | "medium"
      | "high"

    purpose:
      | "qualification"
      | "recommendation"
      | "segmentation"
      | "personalization"

    tags?: string[]
  }


  analytics?: {
    eventName?: string
  }


  ui?: {
    layout?:
      | "cards"
      | "list"
      | "grid"
      | "input"

    image?: string

    animation?:
      | "fade"
      | "slide"
      | "scale"

    allowSkip?: boolean
  }
}



export interface WizardAnswer {
  questionId: string

  value:
    | string
    | string[]
    | number

  timestamp?: number
}



export interface WizardState {

  currentStep: number

  answers: Record<
    string,
    WizardAnswer
  >

  startedAt?: number

  completedAt?: number
}



export interface WizardConfig {

  id: string

  title: string

  description?: string


  questions: WizardQuestion[]


  settings?: {

    showProgress?: boolean

    allowBack?: boolean

    saveProgress?: boolean

    autoSave?: boolean

  }
}