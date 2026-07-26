"use client"

import {
  useEffect,
  useRef,
  useState
} from "react"

import { useRouter } from "next/navigation"

import Splash from "./Splash"
import Progress from "./Progress"
import ChatHeader from "./ChatHeader"
import AssistantMessage from "./AssistantMessage"
import UserMessage from "./UserMessage"
import AnswerComposer from "./AnswerComposer"
import AssistantAvatar from "./AssistantAvatar"
import TypingIndicator from "./TypingIndicator"

import {
  useWizard
} from "../hooks/useWizard"

import { mapWizardAnswersToFilters } from "../lib/answers-to-filters"
import { formatAnswerAsMessage } from "../lib/answer-to-message"
import { useDiscover } from "@/lib/discover/filters-context"

import type {
  WizardConfig,
  QuestionStep,
  WizardAnswer
} from "../types"

const PROPERTY_TYPE_PLURAL: Record<string, string> = {
  apartment: "apartamentos",
  house: "casas",
  ph: "PHs",
  loft: "lofts",
}

/** Turns the visitor's actual picks into "Juan, buscando apartamentos en Pocitos y Cordón..." instead of a generic corporate placeholder. */
function buildProcessingMessage(answers: Record<string, WizardAnswer>, name: string): string {
  const hoods = Array.isArray(answers.preferred_locations?.value) ? answers.preferred_locations.value : []
  const types = Array.isArray(answers.property_type?.value) ? answers.property_type.value : []

  const typeLabel = types.length === 1 ? PROPERTY_TYPE_PLURAL[types[0]] ?? "propiedades" : "propiedades"
  const hoodsLabel =
    hoods.length === 0
      ? "Uruguay"
      : hoods.length <= 2
        ? hoods.join(" y ")
        : `${hoods.slice(0, 2).join(", ")} y más`

  const lead = name ? `${name}, buscando` : "Buscando"
  return `${lead} ${typeLabel} en ${hoodsLabel}...`
}

function capitalize(name: string): string {
  const trimmed = name.trim()
  return trimmed ? trimmed.charAt(0).toUpperCase() + trimmed.slice(1) : trimmed
}

/**
 * Personalizes a handful of moments once we know the visitor's name — a few
 * spots per flow (not literally every question, which would read like a
 * mail-merge instead of a real touch), including one contextual callback to
 * an earlier answer so it feels like Wee is actually tracking the
 * conversation rather than reciting a fixed script.
 */
function personalizeTitle(
  question: QuestionStep,
  name: string,
  answers: Record<string, WizardAnswer>,
  isSellerFlow: boolean
): string {
  if (!name) return question.title ?? ""

  if (isSellerFlow) {
    switch (question.id) {
      case "property_type":
        return `Contame, ${name} — ¿qué tipo de propiedad querés vender?`
      case "contact_method":
        return `Última pregunta, ${name} — ¿cómo preferís que te contactemos?`
      default:
        return question.title ?? ""
    }
  }

  switch (question.id) {
    case "intent":
      return `Muy bien ${name}, comencemos por saber qué estás buscando`

    case "preferred_locations":
      return `Decime, ${name} — ¿qué zonas te interesan?`

    case "parking": {
      const hoods = Array.isArray(answers.preferred_locations?.value) ? answers.preferred_locations.value : []
      const hoodsHint = hoods.length === 1 ? ` para ${hoods[0]}` : ""
      return `Ya casi terminamos, ${name} — ¿necesitás cochera o garaje${hoodsHint}?`
    }

    default:
      return question.title ?? ""
  }
}

function TypingBubble() {
  return (
    <div className="flex items-start gap-2.5">
      <AssistantAvatar size={36} state="thinking" />
      <div>
        <span className="mb-1 block pl-1 text-[10.5px] font-bold text-muted-foreground">Wee</span>
        <TypingIndicator />
      </div>
    </div>
  )
}

interface WizardCompletionOverride {
  heading?: string
  body?: string
  ctaLabel: string
  onCta: () => void
  showRestart?: boolean
}

interface WizardProps {

  config: WizardConfig

  /** Replaces the default "apply as Discover filters" behavior on finish (e.g. the seller flow submits a lead instead). */
  onFinish?: (summary: Record<string, WizardAnswer>) => void | Promise<void>

  /** Replaces the default "Buscando apartamentos en..." processing copy. */
  processingMessage?: (answers: Record<string, WizardAnswer>, name: string) => string

  /** Replaces the default "Ver mi selección" completion screen. */
  completion?: WizardCompletionOverride

  /**
   * Whether the welcome screen asks for the visitor's name and offers a
   * "skip to profile" link. Defaults to true (the buyer flow). Flows that
   * already ask for a full name later as a regular question (like the
   * seller flow) should set this to false to avoid asking twice.
   */
  collectNameOnIntro?: boolean

  /** Overrides the "Tu búsqueda" progress-bar label. */
  progressLabel?: string

}

type MessagePhase = "typing" | "message" | "action"

/** References the neighborhoods they actually picked, when there are any, instead of a flat generic sentence every time. */
function buildCompletionBody(answers: Record<string, WizardAnswer>): string {
  const hoods = Array.isArray(answers.preferred_locations?.value) ? answers.preferred_locations.value : []
  const hoodsClause =
    hoods.length === 0
      ? ""
      : hoods.length === 1
        ? ` en ${hoods[0]}`
        : ` en ${hoods.slice(0, -1).join(", ")} y ${hoods[hoods.length - 1]}`

  return `Armamos una selección curada${hoodsClause} según lo que nos contaste. Cuando encuentres algo que te encante, coordinamos la visita con un asesor.`
}

export default function Wizard({
  config,
  onFinish,
  processingMessage,
  completion,
  collectNameOnIntro = true,
  progressLabel
}: WizardProps) {
  const router = useRouter()
  const { setMode, setFilters, completeOnboarding, visitorName, setVisitorName } = useDiscover()

  // Same question id ("property_type") means something different in each
  // config, so personalizeTitle needs to know which flow it's phrasing for.
  const isSellerFlow = config.id === "seller-onboarding"

  const [showSplash, setShowSplash] = useState(true)

  const {
    currentStepData,
    currentQuestion,
    questionSteps,
    currentQuestionNumber,
    totalQuestions,
    answers,
    isFirstStep,
    setAnswer,
    next,
    back,
    reset,
    getSummary
  } = useWizard(
    config,
    // Pre-fills a "full_name"-style question (e.g. the seller flow) when the
    // visitor already gave their name earlier in this session. Harmless for
    // configs with no such question — it just sits unused in the answers map.
    visitorName ? { full_name: visitorName } : undefined
  )

  // Name is captured right on the welcome screen (unless collectNameOnIntro
  // is false, e.g. the seller flow asks for it later as a regular
  // question) — local-only state until submitted as part of a real lead.
  const [nameInput, setNameInput] = useState(() => visitorName)

  // Flows that don't collect the name on intro (the seller flow) ask for it
  // later as a plain "full_name" question — propagate that into the same
  // shared visitorName as soon as it's answered, so later moments in THIS
  // pass (and other pages, once they navigate away) can address them by name.
  useEffect(() => {
    const answer = answers.full_name?.value
    if (typeof answer !== "string") return

    const name = capitalize(answer)
    if (name && name !== visitorName) {
      setVisitorName(name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- visitorName/setVisitorName intentionally excluded, only re-run when the answer itself changes
  }, [answers.full_name?.value])

  // Every step (intro/question/summary/completion) goes through the same
  // beat: a short "typing" pause, then Wee's message types itself out, then
  // — once done — the interactive part (options/input/CTA) slides in.
  // "processing" reuses typing→message for display only; its actual
  // advance is driven by the async effect below.
  const [phase, setPhase] = useState<MessagePhase>("typing")

  // Distinguishes "just answered this question, about to auto-advance" (~600ms,
  // composer should hide) from "revisited an old answer via Back" (composer
  // should stay, pre-filled, so editing it is possible) — both have
  // answers[id] set, but only the first should suppress the composer.
  const [justAnswered, setJustAnswered] = useState(false)

  // Tracks which step `phase` currently belongs to. Resetting phase in a
  // useEffect (keyed on currentStepData?.id) left a window where React had
  // already committed a render for the NEW step while phase still held the
  // OLD step's value ("message"/"action") — since effects only run after
  // paint — which let a question's AssistantMessage mount, start typing,
  // then get yanked back to the typing-dots bubble a beat later when the
  // effect finally caught up, sometimes never settling on "action" at all.
  // Adjusting state directly during render (React's documented pattern for
  // "reset state when a prop changes") fixes this — the correction happens
  // before anything paints, so there's no stale intermediate render.
  const [phaseStepId, setPhaseStepId] = useState<string | undefined>(undefined)

  if (currentStepData && currentStepData.id !== phaseStepId) {
    setPhaseStepId(currentStepData.id)
    setJustAnswered(false)
    // Revisiting an already-answered question (e.g. after "Back") skips
    // straight to the interactive state — no need to replay the typing beat.
    setPhase(currentStepData.type === "question" && answers[currentStepData.id] ? "action" : "typing")
  }

  useEffect(() => {
    if (phase !== "typing") return
    const timer = setTimeout(() => setPhase("message"), 2000)
    return () => clearTimeout(timer)
  }, [phase, phaseStepId])

  // Auto-advances shortly after an answer is submitted. This has to be an
  // effect (not a setTimeout called directly inside the submit handler) —
  // `next` is a useCallback that closes over `canContinue`, which is still
  // false at the moment of submission (the answer hasn't been recorded
  // yet). A setTimeout capturing that stale `next` would silently no-op
  // 600ms later since canContinue still reads false inside its closure.
  // Effects re-run with the freshest `next` once canContinue catches up.
  useEffect(() => {
    if (!justAnswered) return
    const timer = setTimeout(() => next(), 600)
    return () => clearTimeout(timer)
  }, [justAnswered, next])

  function handleTypingDone() {
    setTimeout(() => setPhase("action"), 1000)
  }

  // Auto-scroll the transcript to the latest content — on step/phase changes,
  // and continuously while the typewriter is actively growing the message.
  const scrollRef = useRef<HTMLDivElement>(null)

  function scrollToBottom() {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentStepData?.id, phase])

  useEffect(() => {
    if (phase !== "message") return
    const interval = setInterval(scrollToBottom, 200)
    return () => clearInterval(interval)
  }, [phase])

  useEffect(() => {
    if (currentStepData?.type !== "processing") return

    // Entering "processing" means the visitor confirmed their answers on the
    // summary step. Default (buyer) behavior applies them as real Discover
    // filters; a custom onFinish (e.g. the seller flow, submitting a real
    // lead) replaces that entirely. Either way, no contact info reaches the
    // server here unless the flow explicitly collects and submits it itself.
    //
    // Advancing to "completion" waits on BOTH a minimum delay (so the
    // "thinking" animation doesn't just flash by) and the actual async work
    // — a real network submission can take longer than 2s, and we don't
    // want to show "all done!" before it's actually done. onFinish is
    // expected to handle its own errors (e.g. a toast) and still resolve, so
    // this never gets stuck waiting on a rejected promise.
    let cancelled = false

    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 2600))
    const work = onFinish
      ? Promise.resolve(onFinish(getSummary()))
      : Promise.resolve().then(() => {
          const { mode, filters } = mapWizardAnswersToFilters(getSummary())
          setMode(mode)
          setFilters(filters)
        })

    completeOnboarding()

    Promise.all([work, minDelay]).then(() => {
      if (!cancelled) next()
    })

    return () => {
      cancelled = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps -- getSummary/setMode/setFilters/completeOnboarding/onFinish intentionally excluded, only re-run when the step itself changes
  }, [currentStepData, next])

  function handleNext() {
    next()
  }

  function handleIntroContinue() {
    const trimmed = nameInput.trim()
    if (!trimmed) return

    setVisitorName(capitalize(trimmed))
    next()
  }

  function handleSkipAssistant() {
    const trimmed = nameInput.trim()
    if (trimmed) setVisitorName(capitalize(trimmed))

    completeOnboarding()
    router.push("/profile")
  }

  function handleClose() {
    completeOnboarding()
    router.push("/")
  }

  function handleContinueToSelection() {
    router.push("/selection")
  }

  function handleRestart() {
    reset()
  }

  function handleAnswerSubmit(value: string | string[] | number) {
    if (!currentQuestion) return

    // "Vender" branches away entirely — it's a different flow (property +
    // contact info for a staff agent), not another filter value.
    if (currentQuestion.id === "intent" && value === "sell") {
      router.push("/wizard/sell")
      return
    }

    setAnswer(currentQuestion.id, value)
    setJustAnswered(true)
  }

  if (!currentStepData) {
    return null
  }

  // Name capture happens on its own screen, before the chat even mounts —
  // so the very first thing Wee says already addresses the visitor by name,
  // instead of having to ask for it as the opening exchange. Flows that
  // don't collect the name here (the seller flow, which asks later as a
  // regular question) skip straight to the chat UI below.
  if (currentStepData.type === "intro" && collectNameOnIntro) {
    return (
      <main className="theme-weeggo relative flex h-[100dvh] w-full flex-col overflow-hidden bg-background text-foreground">
        {showSplash && <Splash onComplete={() => setShowSplash(false)} />}

        {!showSplash && (
          <div className="relative h-full w-full overflow-hidden">
            {currentStepData.video ? (
              <>
                <video
                  src={currentStepData.video}
                  poster={currentStepData.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
              </>
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(160deg, var(--weeggo-blue), var(--weeggo-blue-dark))" }}
              />
            )}

            <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-12 text-center">
              <AssistantAvatar size={72} />

              <h1 className="mt-4 max-w-lg text-xl font-light leading-tight tracking-[-0.04em] text-white">
                {currentStepData.title}
              </h1>

              {currentStepData.description && (
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
                  {currentStepData.description}
                </p>
              )}

              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleIntroContinue()
                }}
                placeholder="¿Cómo te llamas?"
                autoFocus
                className="mt-6 w-full max-w-md rounded-full border border-white/25 bg-white/10 px-6 py-4 text-center text-base text-white outline-none backdrop-blur-sm transition placeholder:text-white/50 focus:border-white/60"
              />

              <button
                type="button"
                onClick={handleIntroContinue}
                disabled={!nameInput.trim()}
                className="mt-6 h-14 w-full max-w-md rounded-full bg-orange-500 text-md font-medium text-white transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
              >
                {currentStepData.cta ?? "Comenzar"}
              </button>

              <button
                type="button"
                onClick={handleSkipAssistant}
                className="mt-4 text-xs font-semibold text-white/60 underline underline-offset-2"
              >
                Saltar al asistente
              </button>
            </div>
          </div>
        )}
      </main>
    )
  }

  const initials = visitorName ? visitorName.slice(0, 2).toUpperCase() : ""

  // Every question step before the current one (or all of them, once we've
  // moved past questions entirely) renders as settled transcript history.
  const answeredCount =
    currentStepData.type === "intro"
      ? 0
      : currentQuestion
        ? currentQuestionNumber - 1
        : questionSteps.length

  const historyQuestions = questionSteps.slice(0, answeredCount)

  const defaultCompletionHeading = visitorName ? `¡Listo, ${visitorName}!` : "¡Listo!"

  let composeSlot: React.ReactNode = null

  if (currentStepData.type === "intro") {
    // Only reachable when collectNameOnIntro is false (the seller flow) —
    // the name-collecting case returns its own standalone screen above,
    // before the chat UI (and this composeSlot logic) ever mounts.
    if (phase === "action") {
      composeSlot = (
        <div className="flex flex-col gap-2 border-t border-border bg-card px-4 py-3 safe-bottom">
          <button
            type="button"
            onClick={handleNext}
            className="h-12 rounded-full text-[14px] font-bold text-white transition active:scale-[0.98]"
            style={{ background: "var(--weeggo-orange)" }}
          >
            {currentStepData.cta ?? "Comenzar"}
          </button>
        </div>
      )
    }
  } else if (currentQuestion && phase === "action" && !justAnswered) {
    // Shown even when this question already has an answer (revisited via
    // Back) — pre-filled from that answer, so editing it just resubmits.
    // Hidden only during the brief transition right after a fresh answer
    // (justAnswered), while we're about to auto-advance to the next one.
    composeSlot = (
      <AnswerComposer
        key={currentQuestion.id}
        question={currentQuestion}
        value={answers[currentQuestion.id]?.value}
        onSubmit={handleAnswerSubmit}
      />
    )
  } else if (currentStepData.type === "summary" && phase === "action") {
    composeSlot = (
      <div className="border-t border-border bg-card px-4 py-3 safe-bottom">
        <button
          type="button"
          onClick={handleNext}
          className="h-12 w-full rounded-full text-[14px] font-bold text-white transition active:scale-[0.98]"
          style={{ background: "var(--weeggo-orange)" }}
        >
          Continuar
        </button>
      </div>
    )
  } else if (currentStepData.type === "completion" && phase === "action") {
    composeSlot = (
      <div className="flex flex-col gap-2 border-t border-border bg-card px-4 py-3 safe-bottom">
        <button
          type="button"
          onClick={completion?.onCta ?? handleContinueToSelection}
          className="h-12 rounded-full text-[14px] font-bold text-white transition active:scale-[0.98]"
          style={{ background: "var(--weeggo-orange)" }}
        >
          {completion?.ctaLabel ?? "Ver mi selección"}
        </button>
        {completion?.showRestart !== false && (
          <button
            type="button"
            onClick={handleRestart}
            className="text-center text-[13px] font-semibold text-muted-foreground underline"
          >
            Volver a empezar
          </button>
        )}
      </div>
    )
  }

  return (
    <main className="theme-weeggo relative flex h-[100dvh] w-full flex-col overflow-hidden bg-background text-foreground">

      {showSplash && <Splash onComplete={() => setShowSplash(false)} />}

      {!showSplash && (
        <>
          <ChatHeader
            showBack={currentStepData.type === "question" && !isFirstStep}
            onBack={back}
            onClose={handleClose}
          />

          {currentStepData.type === "question" && (
            <Progress
              current={currentQuestionNumber}
              total={totalQuestions}
              label={progressLabel}
              showCounter
            />
          )}

          <div ref={scrollRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5">

            {historyQuestions.map((q) => (
              <div key={q.id} className="space-y-3">
                <AssistantMessage text={personalizeTitle(q, visitorName, answers, isSellerFlow)} />
                <UserMessage text={formatAnswerAsMessage(q, answers[q.id])} initials={initials} />
              </div>
            ))}

            {currentStepData.type === "intro" && (
              <div className="space-y-3">
                {phase === "typing" ? (
                  <TypingBubble />
                ) : (
                  <AssistantMessage
                    key={currentStepData.id}
                    text={currentStepData.description ?? currentStepData.title ?? ""}
                    typewriter={phase === "message"}
                    onTypingDone={handleTypingDone}
                  />
                )}
              </div>
            )}

            {currentQuestion && (
              <div className="space-y-3">
                {phase === "typing" ? (
                  <TypingBubble />
                ) : (
                  <AssistantMessage
                    key={currentQuestion.id}
                    text={personalizeTitle(currentQuestion, visitorName, answers, isSellerFlow)}
                    typewriter={phase === "message"}
                    onTypingDone={handleTypingDone}
                  />
                )}

                {phase === "action" && answers[currentQuestion.id] && (
                  <UserMessage
                    text={formatAnswerAsMessage(currentQuestion, answers[currentQuestion.id])}
                    initials={initials}
                  />
                )}
              </div>
            )}

            {currentStepData.type === "summary" && (
              <div className="space-y-3">
                {phase === "typing" ? (
                  <TypingBubble />
                ) : (
                  <AssistantMessage
                    key={currentStepData.id}
                    text={
                      visitorName
                        ? `¡Buenísimo, ${visitorName}! Ya tengo todo lo que necesito.`
                        : "¡Buenísimo! Ya tengo todo lo que necesito."
                    }
                    typewriter={phase === "message"}
                    onTypingDone={handleTypingDone}
                  />
                )}
              </div>
            )}

            {currentStepData.type === "processing" && (
              <div className="space-y-3">
                {phase === "typing" ? (
                  <TypingBubble />
                ) : (
                  <AssistantMessage
                    key={currentStepData.id}
                    text={(processingMessage ?? buildProcessingMessage)(answers, visitorName)}
                    typewriter={phase === "message"}
                  />
                )}
              </div>
            )}

            {currentStepData.type === "completion" && (
              <div className="space-y-3">
                {phase === "typing" ? (
                  <TypingBubble />
                ) : (
                  <AssistantMessage
                    key={currentStepData.id}
                    text={`${completion?.heading ?? defaultCompletionHeading} ${completion?.body ?? buildCompletionBody(answers)}`}
                    typewriter={phase === "message"}
                    onTypingDone={handleTypingDone}
                  />
                )}
              </div>
            )}

          </div>

          {composeSlot}
        </>
      )}

    </main>
  )
}
