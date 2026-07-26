"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

import { createEmptyFilters, type AppNotification, type Filters, type Mode } from "./types";

interface PersistedState {
  mode: Mode;
  filters: Filters;
  liked: string[];
  superliked: string[];
  passed: string[];
  compareSelection: string[];
  notifications: AppNotification[];
  /** Has this visitor completed the landing → wizard onboarding flow at least once? */
  onboarded: boolean;
  /**
   * First name only, given in the wizard for personalization — local to this
   * browser only. Never written to the DB on its own; it only reaches the
   * server if the visitor later submits a real lead (viewing request), which
   * carries its own name field.
   */
  visitorName: string;
}

interface DiscoverState extends PersistedState {
  hydrated: boolean;
}

const initialPersistedState: PersistedState = {
  mode: "buy",
  filters: createEmptyFilters(),
  liked: [],
  superliked: [],
  passed: [],
  compareSelection: [],
  notifications: [],
  onboarded: false,
  visitorName: "",
};

const initialState: DiscoverState = {
  ...initialPersistedState,
  hydrated: false,
};

type Action =
  | { type: "SET_MODE"; mode: Mode }
  | { type: "SET_FILTERS"; filters: Filters }
  | { type: "LIKE"; id: string }
  | { type: "SUPERLIKE"; id: string }
  | { type: "PASS"; id: string }
  | { type: "TOGGLE_COMPARE"; id: string }
  | { type: "ADD_NOTIFICATION"; message: string }
  | { type: "MARK_NOTIFICATIONS_READ" }
  | { type: "COMPLETE_ONBOARDING" }
  | { type: "SET_VISITOR_NAME"; name: string }
  | { type: "RESET" }
  | { type: "HYDRATE"; state: Partial<PersistedState> | null };

/**
 * Fills in any fields missing from `partial` with defaults. Needed because
 * `partial` can come straight from localStorage, which may hold a shape from
 * before a field was added or removed (e.g. an old blob has no
 * `notifications` array at all) — without this, spreading it directly into
 * state produces `undefined` for new fields and crashes the first thing that
 * calls .filter()/.map() on them.
 */
function mergePersistedState(partial: Partial<PersistedState> | null): PersistedState {
  const safe = partial ?? {};
  return {
    mode: safe.mode ?? initialPersistedState.mode,
    filters: { ...initialPersistedState.filters, ...(safe.filters ?? {}) },
    liked: Array.isArray(safe.liked) ? safe.liked : [],
    superliked: Array.isArray(safe.superliked) ? safe.superliked : [],
    passed: Array.isArray(safe.passed) ? safe.passed : [],
    compareSelection: Array.isArray(safe.compareSelection) ? safe.compareSelection : [],
    notifications: Array.isArray(safe.notifications) ? safe.notifications : [],
    onboarded: safe.onboarded ?? initialPersistedState.onboarded,
    visitorName: typeof safe.visitorName === "string" ? safe.visitorName : "",
  };
}

function reducer(state: DiscoverState, action: Action): DiscoverState {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.mode };

    case "SET_FILTERS":
      return { ...state, filters: action.filters };

    case "LIKE":
      return state.liked.includes(action.id)
        ? state
        : { ...state, liked: [...state.liked, action.id] };

    case "SUPERLIKE":
      return {
        ...state,
        liked: state.liked.includes(action.id) ? state.liked : [...state.liked, action.id],
        superliked: state.superliked.includes(action.id)
          ? state.superliked
          : [...state.superliked, action.id],
      };

    case "PASS":
      return state.passed.includes(action.id)
        ? state
        : { ...state, passed: [...state.passed, action.id] };

    case "TOGGLE_COMPARE": {
      if (state.compareSelection.includes(action.id)) {
        return {
          ...state,
          compareSelection: state.compareSelection.filter((id) => id !== action.id),
        };
      }
      if (state.compareSelection.length >= 3) return state;
      return { ...state, compareSelection: [...state.compareSelection, action.id] };
    }

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          { id: crypto.randomUUID(), message: action.message, createdAt: Date.now(), read: false },
          ...state.notifications,
        ].slice(0, 50),
      };

    case "MARK_NOTIFICATIONS_READ":
      return state.notifications.some((n) => !n.read)
        ? { ...state, notifications: state.notifications.map((n) => ({ ...n, read: true })) }
        : state;

    case "COMPLETE_ONBOARDING":
      return state.onboarded ? state : { ...state, onboarded: true };

    case "SET_VISITOR_NAME":
      return { ...state, visitorName: action.name };

    case "RESET":
      return { ...initialPersistedState, hydrated: true };

    case "HYDRATE":
      return { ...mergePersistedState(action.state), hydrated: true };

    default:
      return state;
  }
}

const STORAGE_KEY = "weeggo.discover.v1";

interface DiscoverContextValue extends DiscoverState {
  setMode: (mode: Mode) => void;
  setFilters: (filters: Filters) => void;
  like: (id: string) => void;
  superlike: (id: string) => void;
  pass: (id: string) => void;
  toggleCompare: (id: string) => void;
  addNotification: (message: string) => void;
  markNotificationsRead: () => void;
  unreadNotificationCount: number;
  completeOnboarding: () => void;
  setVisitorName: (name: string) => void;
  reset: () => void;

  // Ephemeral UI state — not persisted, so a page refresh always starts closed.
  wizardOpen: boolean;
  openWizard: () => void;
  closeWizard: () => void;
  activeListingId: string | null;
  openListing: (id: string) => void;
  closeListing: () => void;
  compareOpen: boolean;
  openCompare: () => void;
  closeCompare: () => void;
}

const DiscoverContext = createContext<DiscoverContextValue | null>(null);

export function DiscoverProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [wizardOpen, setWizardOpen] = useState(false);
  const [activeListingId, setActiveListingId] = useState<string | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as Partial<PersistedState>) : null;
      dispatch({ type: "HYDRATE", state: parsed });
    } catch {
      // corrupt/unavailable storage — fall through to defaults
      dispatch({ type: "HYDRATE", state: null });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    const persisted: PersistedState = {
      mode: state.mode,
      filters: state.filters,
      liked: state.liked,
      superliked: state.superliked,
      passed: state.passed,
      compareSelection: state.compareSelection,
      notifications: state.notifications,
      onboarded: state.onboarded,
      visitorName: state.visitorName,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  }, [state]);

  const value = useMemo<DiscoverContextValue>(
    () => ({
      ...state,
      setMode: (mode) => dispatch({ type: "SET_MODE", mode }),
      setFilters: (filters) => dispatch({ type: "SET_FILTERS", filters }),
      like: (id) => dispatch({ type: "LIKE", id }),
      superlike: (id) => dispatch({ type: "SUPERLIKE", id }),
      pass: (id) => dispatch({ type: "PASS", id }),
      toggleCompare: (id) => dispatch({ type: "TOGGLE_COMPARE", id }),
      addNotification: (message) => dispatch({ type: "ADD_NOTIFICATION", message }),
      markNotificationsRead: () => dispatch({ type: "MARK_NOTIFICATIONS_READ" }),
      unreadNotificationCount: state.notifications.filter((n) => !n.read).length,
      completeOnboarding: () => dispatch({ type: "COMPLETE_ONBOARDING" }),
      setVisitorName: (name) => dispatch({ type: "SET_VISITOR_NAME", name }),
      reset: () => dispatch({ type: "RESET" }),

      wizardOpen,
      openWizard: () => setWizardOpen(true),
      closeWizard: () => setWizardOpen(false),
      activeListingId,
      openListing: (id) => setActiveListingId(id),
      closeListing: () => setActiveListingId(null),
      compareOpen,
      openCompare: () => setCompareOpen(true),
      closeCompare: () => setCompareOpen(false),
    }),
    [state, wizardOpen, activeListingId, compareOpen]
  );

  return <DiscoverContext.Provider value={value}>{children}</DiscoverContext.Provider>;
}

export function useDiscover(): DiscoverContextValue {
  const ctx = useContext(DiscoverContext);
  if (!ctx) throw new Error("useDiscover must be used within a DiscoverProvider");
  return ctx;
}
