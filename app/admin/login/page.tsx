"use client";

import { useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    });

    if (signInError) {
      setStatus("error");
      setError(signInError.message);
      return;
    }

    setStatus("sent");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8">
        <h1 className="font-serif text-2xl text-foreground">
          WEEGG<span className="text-accent">O</span> Admin
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your admin email to receive a sign-in link.
        </p>

        {status === "sent" ? (
          <p className="mt-6 text-sm text-accent">Check your email — we sent you a sign-in link.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <FieldContent>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </FieldContent>
              </Field>

              {status === "error" && <FieldError>{error}</FieldError>}

              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send sign-in link"}
              </Button>
            </FieldGroup>
          </form>
        )}
      </div>
    </div>
  );
}
