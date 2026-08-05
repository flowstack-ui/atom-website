"use client";

import { useState } from "react";
import { Button } from "@flowstack-ui/brick/button";
import { Check, Copy } from "lucide-react";

const command = "npm install @flowstack-ui/atom";

export function InstallCommand({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className={`install-command${compact ? " is-compact" : ""}`}>
      <span aria-hidden="true">$</span>
      <code>{command}</code>
      <Button aria-label="Copy install command" size="sm" tone="neutral" variant="ghost" onPress={copy}>
        {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
      </Button>
      <span className="sr-only" aria-live="polite">{copied ? "Install command copied" : ""}</span>
    </div>
  );
}
