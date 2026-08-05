"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { Orbit } from "lucide-react";
import type { ExampleProps } from "./example-types";

export function DemoSurface({ children, className = "", ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return <div className={`atom-demo-surface ${className}`.trim()} {...props}>{children}</div>;
}

export function DemoButton({ children, onClick, type = "button", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="atom-demo-button" onClick={onClick} type={type} {...props}>{children}</button>;
}

export function DemoSignal({ children }: { children: ReactNode }) {
  return <span className="atom-demo-inline-signal"><Orbit size={12} aria-hidden="true" />{children}</span>;
}

export function ContractSpecimen({ title, slug, onSignal }: ExampleProps & { detail?: string }) {
  return (
    <DemoSurface className="atom-demo-contract">
      <span className="atom-demo-contract__orbit" aria-hidden="true" />
      <Orbit size={24} aria-hidden="true" />
      <strong>{title}</strong>
      <p>The public <code>{slug}</code> contract is active without prescribing visual appearance.</p>
      <DemoButton onClick={() => onSignal(`${slug}: contract inspected`)}>Inspect contract</DemoButton>
    </DemoSurface>
  );
}
