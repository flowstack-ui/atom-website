"use client";

import { useState } from "react";

import { Checkbox } from "@flowstack-ui/atom/checkbox";
import { CheckboxGroup } from "@flowstack-ui/atom/checkbox-group";
import { Combobox } from "@flowstack-ui/atom/combobox";
import { Listbox } from "@flowstack-ui/atom/listbox";
import { MultiSelect } from "@flowstack-ui/atom/multi-select";
import { RadioGroup } from "@flowstack-ui/atom/radio-group";
import { Rating } from "@flowstack-ui/atom/rating";
import { Select } from "@flowstack-ui/atom/select";
import { Slider } from "@flowstack-ui/atom/slider";
import { Switch } from "@flowstack-ui/atom/switch";
import type { ExampleProps } from "../example-types";
import { ContractSpecimen, DemoSurface } from "../example-shared";

const destinations = [
  { value: "moon", label: "Moon base" },
  { value: "orbital", label: "Orbital station" },
  { value: "mars", label: "Mars relay" },
];

function CheckboxSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <label className="atom-demo-choice"><Checkbox.Root className="atom-demo-checkbox" onCheckedChange={(checked) => onSignal(`aria-checked: ${checked}`)}><Checkbox.Indicator>✓</Checkbox.Indicator></Checkbox.Root><span><strong>Automatic launch window</strong><small>Atom keeps native form and checkbox semantics synchronized.</small></span></label>;
}

function CheckboxGroupSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  const values = ["keyboard", "voice", "touch"];
  return <DemoSurface className="atom-demo-field"><strong>Validation channels</strong><CheckboxGroup.Root allValues={values} aria-label="Validation channels" className="atom-demo-choice-list" defaultValue={["keyboard"]} onValueChange={(value) => onSignal(`selected: ${value.join(", ") || "none"}`)}><CheckboxGroup.Parent className="atom-demo-parent-choice">Select every channel</CheckboxGroup.Parent>{values.map((value) => <CheckboxGroup.Item className="atom-demo-choice" key={value} value={value}><span className="atom-demo-checkbox" aria-hidden="true">✓</span><span><CheckboxGroup.ItemLabel>{value[0].toUpperCase() + value.slice(1)}</CheckboxGroup.ItemLabel><CheckboxGroup.ItemDescription>{value === "keyboard" ? "Roving and activation keys" : value === "voice" ? "Announced relationships" : "Pointer-sized targets"}</CheckboxGroup.ItemDescription></span></CheckboxGroup.Item>)}</CheckboxGroup.Root></DemoSurface>;
}

function RadioSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <DemoSurface className="atom-demo-field"><strong id="mission-priority">Mission priority</strong><RadioGroup.Root aria-labelledby="mission-priority" className="atom-demo-choice-list" defaultValue="balanced" onValueChange={(value) => onSignal(`priority: ${value}`)}>{["speed", "balanced", "precision"].map((value) => <label className="atom-demo-choice" key={value}><RadioGroup.Radio className="atom-demo-radio" value={value}><span /></RadioGroup.Radio><span>{value[0].toUpperCase() + value.slice(1)}</span></label>)}</RadioGroup.Root></DemoSurface>;
}

function SwitchSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <label className="atom-demo-choice"><Switch.Root aria-label="Auto publish" className="atom-demo-switch" defaultChecked onCheckedChange={(checked) => onSignal(`aria-checked: ${checked}`)}><Switch.Thumb /></Switch.Root><span><strong>Auto publish</strong><small>Ship when every validation signal passes.</small></span></label>;
}

function SliderSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  const [value, setValue] = useState(62);
  return <DemoSurface className="atom-demo-field"><div className="atom-demo-label-row"><strong>Signal threshold</strong><output>{value}%</output></div><Slider.Root aria-label="Signal threshold" className="atom-demo-slider" value={value} onValueChange={(next) => { const resolved = Array.isArray(next) ? next[0] : next; setValue(resolved); onSignal(`threshold: ${resolved}`); }}><Slider.Track><Slider.Range /><Slider.Thumb /></Slider.Track></Slider.Root><div className="atom-demo-slider-scale" aria-hidden="true"><span>Quiet</span><span>Balanced</span><span>Strict</span></div></DemoSurface>;
}

function RatingSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <DemoSurface className="atom-demo-field"><strong>Rate the interaction</strong><Rating.Root aria-label="Interaction rating" className="atom-demo-rating" defaultValue={3} onValueChange={(value) => onSignal(`rating: ${value} of 5`)}>{[1, 2, 3, 4, 5].map((value) => <Rating.Item key={value} value={value}>★</Rating.Item>)}</Rating.Root></DemoSurface>;
}

function SelectSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <DemoSurface className="atom-demo-field"><label id="destination-label">Destination</label><Select.Root defaultValue="orbital" onValueChange={(value) => onSignal(`destination: ${value}`)}><Select.Trigger aria-labelledby="destination-label" className="atom-demo-select-trigger"><Select.Value /><Select.Icon>⌄</Select.Icon></Select.Trigger><Select.Portal><Select.Content className="atom-demo-popover"><Select.Viewport>{destinations.map((item) => <Select.Item className="atom-demo-option" key={item.value} value={item.value}><Select.ItemText>{item.label}</Select.ItemText><Select.ItemIndicator>✓</Select.ItemIndicator></Select.Item>)}</Select.Viewport></Select.Content></Select.Portal></Select.Root></DemoSurface>;
}

function MultiSelectSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <DemoSurface className="atom-demo-field"><label id="systems-label">Systems</label><MultiSelect.Root defaultValue={["navigation"]} onValueChange={(value) => onSignal(`systems: ${value.join(", ") || "none"}`)}><MultiSelect.Trigger aria-labelledby="systems-label" className="atom-demo-select-trigger"><MultiSelect.Value placeholder="Choose systems" /><MultiSelect.Icon>⌄</MultiSelect.Icon></MultiSelect.Trigger><MultiSelect.Content className="atom-demo-popover"><MultiSelect.Viewport>{["navigation", "telemetry", "communications"].map((value) => <MultiSelect.Item className="atom-demo-option" key={value} value={value}><MultiSelect.ItemText>{value[0].toUpperCase() + value.slice(1)}</MultiSelect.ItemText><MultiSelect.ItemIndicator>✓</MultiSelect.ItemIndicator></MultiSelect.Item>)}</MultiSelect.Viewport></MultiSelect.Content></MultiSelect.Root></DemoSurface>;
}

function ComboboxSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <DemoSurface className="atom-demo-field"><Combobox.Root options={destinations} onValueChange={(value) => onSignal(`destination: ${value ?? "none"}`)}><Combobox.Label>Search destination</Combobox.Label><Combobox.Control className="atom-demo-input-row"><Combobox.Input className="atom-demo-input" /><Combobox.Clear className="atom-demo-icon-button">×</Combobox.Clear><Combobox.Trigger className="atom-demo-icon-button">⌄</Combobox.Trigger></Combobox.Control><Combobox.Portal><Combobox.Content className="atom-demo-popover"><Combobox.Listbox>{destinations.map((item) => <Combobox.Item className="atom-demo-option" key={item.value} value={item.value}>{item.label}</Combobox.Item>)}<Combobox.Empty>No destination found</Combobox.Empty></Combobox.Listbox></Combobox.Content></Combobox.Portal></Combobox.Root></DemoSurface>;
}

function ListboxSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <DemoSurface className="atom-demo-field"><span id="crew-label">Assign crew</span><Listbox.Root aria-labelledby="crew-label" className="atom-demo-listbox" defaultValue="maya" onValueChange={(value) => onSignal(`crew: ${String(value)}`)}><Listbox.Group><Listbox.Label>Flight team</Listbox.Label>{["Maya", "Noah", "Will"].map((label) => <Listbox.Option className="atom-demo-option" key={label} value={label.toLowerCase()}><Listbox.OptionText>{label}</Listbox.OptionText></Listbox.Option>)}</Listbox.Group></Listbox.Root></DemoSurface>;
}

export default function SelectionSpecimens(props: ExampleProps) {
  switch (props.slug) {
    case "checkbox": return <CheckboxSpecimen onSignal={props.onSignal} />;
    case "checkbox-group": return <CheckboxGroupSpecimen onSignal={props.onSignal} />;
    case "radio-group": return <RadioSpecimen onSignal={props.onSignal} />;
    case "switch": return <SwitchSpecimen onSignal={props.onSignal} />;
    case "slider": return <SliderSpecimen onSignal={props.onSignal} />;
    case "rating": return <RatingSpecimen onSignal={props.onSignal} />;
    case "select": return <SelectSpecimen onSignal={props.onSignal} />;
    case "multi-select": return <MultiSelectSpecimen onSignal={props.onSignal} />;
    case "combobox": return <ComboboxSpecimen onSignal={props.onSignal} />;
    case "listbox": return <ListboxSpecimen onSignal={props.onSignal} />;
    default: return <ContractSpecimen {...props} />;
  }
}
