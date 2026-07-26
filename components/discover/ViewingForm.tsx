"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { useDiscover } from "@/lib/discover/filters-context";
import type { Listing } from "@/lib/discover/types";
import type { ContactInformation } from "@/app/wizard/types";
import { requestViewing } from "@/app/(app)/actions";

const CONTACT_METHODS: ContactInformation["contactMethod"][] = ["WhatsApp", "Email", "Llamada"];

export function ViewingForm({ listing, onDone }: { listing: Listing; onDone: () => void }) {
  const { filters, addNotification } = useDiscover();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    contactMethod: "WhatsApp" as ContactInformation["contactMethod"],
    message: "",
  });
  const [error, setError] = useState("");

  function submit() {
    if (!form.fullName || !form.email || !form.phone) {
      setError("Fill in your name, email, and phone to continue.");
      return;
    }
    setError("");
    startTransition(async () => {
      const result = await requestViewing(listing.id, form, filters);
      if (!result.ok) {
        toast.error("Couldn't send your request — try again.");
        return;
      }
      toast.success("Viewing requested — the agent will confirm shortly");
      addNotification(`Viewing requested for ${listing.title} · ${listing.city}`);
      onDone();
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        value={form.fullName}
        onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
        placeholder="Full name"
        className="rounded-xl border border-border bg-card px-3.5 py-3 text-sm font-semibold outline-none focus:border-primary"
      />
      <input
        value={form.email}
        type="email"
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        placeholder="Email"
        className="rounded-xl border border-border bg-card px-3.5 py-3 text-sm font-semibold outline-none focus:border-primary"
      />
      <input
        value={form.phone}
        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        placeholder="Phone / WhatsApp"
        className="rounded-xl border border-border bg-card px-3.5 py-3 text-sm font-semibold outline-none focus:border-primary"
      />
      <div className="flex gap-2">
        {CONTACT_METHODS.map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => setForm((f) => ({ ...f, contactMethod: method }))}
            className={`flex-1 rounded-full border py-2 text-xs font-bold ${
              form.contactMethod === method
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground"
            }`}
          >
            {method}
          </button>
        ))}
      </div>
      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
      <button
        type="button"
        onClick={submit}
        disabled={pending}
        className="rounded-[var(--weeggo-radius-md)] py-[13px] text-[13.5px] font-bold text-white disabled:opacity-60"
        style={{ background: "var(--weeggo-blue)" }}
      >
        {pending ? "Sending…" : "Confirm request"}
      </button>
    </div>
  );
}
