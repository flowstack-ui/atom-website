"use client";

import { useState } from "react";
import { Button } from "@flowstack-ui/atom/button";
import { Clipboard } from "@flowstack-ui/atom/clipboard";
import { Field } from "@flowstack-ui/atom/field";
import { Fieldset } from "@flowstack-ui/atom/fieldset";
import { FileUpload } from "@flowstack-ui/atom/file-upload";
import { Form } from "@flowstack-ui/atom/form";
import { Input } from "@flowstack-ui/atom/input";
import { Label } from "@flowstack-ui/atom/label";
import { NumberInput } from "@flowstack-ui/atom/number-input";
import { OTPField } from "@flowstack-ui/atom/otp-field";
import { PasswordToggleField } from "@flowstack-ui/atom/password-toggle-field";
import { Pressable } from "@flowstack-ui/atom/pressable";
import { Textarea } from "@flowstack-ui/atom/textarea";
import { Toggle } from "@flowstack-ui/atom/toggle";
import { ToggleGroup } from "@flowstack-ui/atom/toggle-group";
import type { ExampleProps } from "../example-types";
import { ContractSpecimen, DemoSurface } from "../example-shared";

function ActionButton({ onSignal, pressable = false }: { onSignal: (value: string) => void; pressable?: boolean }) {
  const [count, setCount] = useState(0);
  const activate = () => { const next = count + 1; setCount(next); onSignal(`activation count: ${next}`); };
  return pressable
    ? <Pressable.Root className="atom-demo-pressable" onPress={activate}><strong>Launch sequence</strong><span>Custom surface · {count} activations</span></Pressable.Root>
    : <Button.Root className="atom-demo-button" onPress={activate}>Launch sequence <span>{count}</span></Button.Root>;
}

function TextControl({ slug, onSignal }: Pick<ExampleProps, "slug" | "onSignal">) {
  if (slug === "textarea") return <DemoSurface className="atom-demo-field"><label htmlFor="demo-message">Mission note</label><Textarea.Root id="demo-message" className="atom-demo-textarea" defaultValue="Behavior before appearance." maxLength={80} onValueChange={(value) => onSignal(`${value.length} / 80 characters`)}><Textarea.Count className="atom-demo-count" /></Textarea.Root></DemoSurface>;
  if (slug === "number-input") return <DemoSurface className="atom-demo-field"><label id="demo-crew-label">Crew</label><NumberInput.Root aria-labelledby="demo-crew-label" className="atom-demo-stepper" defaultValue={3} min={1} max={8} onValueChange={(value) => onSignal(`crew: ${value ?? "empty"}`)}><NumberInput.Decrement className="atom-demo-icon-button">−</NumberInput.Decrement><NumberInput.Input className="atom-demo-input" /><NumberInput.Increment className="atom-demo-icon-button">+</NumberInput.Increment></NumberInput.Root></DemoSurface>;
  if (slug === "otp-field") return <DemoSurface className="atom-demo-field"><span>Access code</span><OTPField.Root className="atom-demo-otp" length={4} onValueChange={(value) => onSignal(`code cells filled: ${value.length} / 4`)}>{[0, 1].map((index) => <OTPField.Input className="atom-demo-otp-cell" index={index} key={index} />)}<OTPField.Separator>·</OTPField.Separator>{[2, 3].map((index) => <OTPField.Input className="atom-demo-otp-cell" index={index} key={index} />)}</OTPField.Root></DemoSurface>;
  if (slug === "password-toggle-field") return <DemoSurface className="atom-demo-field"><label htmlFor="demo-password">Access phrase</label><PasswordToggleField.Root onVisibleChange={(visible) => onSignal(`password visible: ${visible}`)}><div className="atom-demo-input-row"><PasswordToggleField.Input className="atom-demo-input" id="demo-password" defaultValue="north-star" /><PasswordToggleField.Toggle className="atom-demo-icon-button"><PasswordToggleField.Icon visible="Hide" hidden="Show" /></PasswordToggleField.Toggle></div></PasswordToggleField.Root></DemoSurface>;
  return <DemoSurface className="atom-demo-field"><label htmlFor="demo-call-sign">Call sign</label><div className="atom-demo-input-row"><Input.Root className="atom-demo-input" id="demo-call-sign" defaultValue="Northstar" onValueChange={(value) => onSignal(`value: ${value || "empty"}`)}><Input.Clear className="atom-demo-icon-button">×</Input.Clear></Input.Root></div><small>Clear remains synchronized with the native input.</small></DemoSurface>;
}

function FieldSpecimen({ slug, onSignal }: Pick<ExampleProps, "slug" | "onSignal">) {
  if (slug === "label") return <DemoSurface className="atom-demo-field"><Label.Root className="atom-demo-label" htmlFor="demo-label-input">Project name</Label.Root><input className="atom-demo-input" id="demo-label-input" onChange={(event) => onSignal(`label activates: ${event.currentTarget.value || "empty"}`)} placeholder="Northstar" /></DemoSurface>;
  if (slug === "fieldset") return <Fieldset.Root className="atom-demo-fieldset" required><Fieldset.Legend>Notification channel</Fieldset.Legend><Fieldset.Description>Choose where launch updates should arrive.</Fieldset.Description><label><input name="channel" type="radio" onChange={() => onSignal("channel: email")} /> Email</label><label><input name="channel" type="radio" onChange={() => onSignal("channel: push")} /> Push</label></Fieldset.Root>;
  if (slug === "form") return <Form.Root className="atom-demo-form" preventDefaultOnSubmit onSubmit={() => onSignal("form: submitted successfully")}><Field.Root className="atom-demo-field" id="demo-email" required><Field.Label>Email</Field.Label><Field.Description>Used only for this launch.</Field.Description><Input.Root className="atom-demo-input" name="email" type="email" /></Field.Root><Button.Root className="atom-demo-button" type="submit">Join launch</Button.Root></Form.Root>;
  return <Field.Root className="atom-demo-field" id="demo-project" required><Field.Label requiredIndicator={null}>Project<Field.RequiredIndicator /></Field.Label><Field.Description>The generated relationships connect every part.</Field.Description><Input.Root className="atom-demo-input" onValueChange={(value) => onSignal(`field value: ${value || "empty"}`)} placeholder="Northstar" /><Field.Error>Enter a project name.</Field.Error></Field.Root>;
}

function ClipboardSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Clipboard.Root className="atom-demo-field" defaultValue="npm install @flowstack-ui/atom"><Clipboard.Label>Install command</Clipboard.Label><Clipboard.Control className="atom-demo-input-row"><Clipboard.Input className="atom-demo-input" readOnly /><Clipboard.Trigger className="atom-demo-button" onClick={() => onSignal("clipboard: copy requested")}>Copy</Clipboard.Trigger></Clipboard.Control><Clipboard.Status className="atom-demo-status"><Clipboard.Indicator when="idle">Ready to copy</Clipboard.Indicator><Clipboard.Indicator when="copying">Copying…</Clipboard.Indicator><Clipboard.Indicator when="copied">Copied</Clipboard.Indicator><Clipboard.Indicator when="error">Clipboard unavailable</Clipboard.Indicator></Clipboard.Status></Clipboard.Root>;
}

function ToggleSpecimen({ slug, onSignal }: Pick<ExampleProps, "slug" | "onSignal">) {
  if (slug === "toggle-group") return <ToggleGroup.Root ariaLabel="Text alignment" className="atom-demo-segmented" defaultValue="center" onValueChange={(value) => onSignal(`alignment: ${String(value)}`)} type="single"><ToggleGroup.Item className="atom-demo-segment" value="left">Left</ToggleGroup.Item><ToggleGroup.Item className="atom-demo-segment" value="center">Center</ToggleGroup.Item><ToggleGroup.Item className="atom-demo-segment" value="right">Right</ToggleGroup.Item></ToggleGroup.Root>;
  return <Toggle.Root ariaLabel="Pin release" className="atom-demo-toggle" onPressedChange={(pressed) => onSignal(`aria-pressed: ${pressed}`)}><span aria-hidden="true">◆</span> Pin release</Toggle.Root>;
}

function FileUploadSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <FileUpload.Root accept="image/*" className="atom-demo-upload" onFilesChange={(files) => onSignal(`files accepted: ${files.length}`)}><FileUpload.HiddenInput /><FileUpload.Dropzone className="atom-demo-dropzone"><strong>Drop mission artwork</strong><span>PNG, JPG, or WebP</span><FileUpload.Trigger className="atom-demo-button">Choose file</FileUpload.Trigger></FileUpload.Dropzone><FileUpload.ItemGroup /></FileUpload.Root>;
}

export default function ActionSpecimens(props: ExampleProps) {
  switch (props.slug) {
    case "button": return <ActionButton onSignal={props.onSignal} />;
    case "pressable": return <ActionButton onSignal={props.onSignal} pressable />;
    case "toggle": case "toggle-group": return <ToggleSpecimen slug={props.slug} onSignal={props.onSignal} />;
    case "clipboard": return <ClipboardSpecimen onSignal={props.onSignal} />;
    case "input": case "textarea": case "number-input": case "otp-field": case "password-toggle-field": return <TextControl slug={props.slug} onSignal={props.onSignal} />;
    case "file-upload": return <FileUploadSpecimen onSignal={props.onSignal} />;
    case "form": case "field": case "fieldset": case "label": return <FieldSpecimen slug={props.slug} onSignal={props.onSignal} />;
    default: return <ContractSpecimen {...props} />;
  }
}
