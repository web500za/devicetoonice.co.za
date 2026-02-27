"use client";

import { useState } from "react";

interface WaitlistFormProps {
  variant?: "dark" | "light";
}

export function WaitlistForm({ variant = "dark" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  const isDark = variant === "dark";

  if (status === "success") {
    return (
      <p className={`text-sm ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
        You're on the list — we'll email you when stock is back.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={`flex-1 h-11 rounded-full px-5 text-sm outline-none ${
          isDark
            ? "bg-white/10 text-white placeholder:text-white/30 border border-white/10 focus:border-white/30"
            : "bg-muted text-foreground placeholder:text-muted-foreground border border-border focus:border-foreground/30"
        }`}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="h-11 rounded-full px-6 text-sm font-medium bg-[var(--cta)] text-white hover:bg-[var(--cta)]/90 transition-colors disabled:opacity-50"
      >
        {status === "submitting" ? "Joining..." : "Notify Me"}
      </button>
      {status === "error" && (
        <p className={`text-xs mt-1 ${isDark ? "text-red-400" : "text-destructive"}`}>
          {errorMsg}
        </p>
      )}
    </form>
  );
}
