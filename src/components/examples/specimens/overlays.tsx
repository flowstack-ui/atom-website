"use client";

import { useId } from "react";
import { AlertDialog } from "@flowstack-ui/atom/alert-dialog";
import { Dialog } from "@flowstack-ui/atom/dialog";
import { Drawer } from "@flowstack-ui/atom/drawer";
import { HoverCard } from "@flowstack-ui/atom/hover-card";
import { Modal, useModalContent } from "@flowstack-ui/atom/modal";
import { Popover } from "@flowstack-ui/atom/popover";
import { Toast, toast } from "@flowstack-ui/atom/toast";
import { Tooltip } from "@flowstack-ui/atom/tooltip";
import type { ExampleProps } from "../example-types";
import { ContractSpecimen, DemoButton, DemoSurface } from "../example-shared";

function DialogSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Dialog.Root onOpenChange={(open, reason) => onSignal(`dialog: ${open ? "open" : `closed · ${reason ?? "external"}`}`)}><Dialog.Trigger className="atom-demo-button">Review launch</Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="atom-demo-overlay" /><Dialog.Content className="atom-demo-dialog"><Dialog.Title>Ready for launch?</Dialog.Title><Dialog.Description>Review the final behavior contract before publishing.</Dialog.Description><div className="atom-demo-dialog__actions"><Dialog.Close className="atom-demo-button atom-demo-button--quiet">Keep editing</Dialog.Close><Dialog.Close className="atom-demo-button">Confirm review</Dialog.Close></div></Dialog.Content></Dialog.Portal></Dialog.Root>;
}

function AlertDialogSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <AlertDialog.Root onOpenChange={(open, reason) => onSignal(`decision: ${open ? "open" : reason ?? "closed"}`)}><AlertDialog.Trigger className="atom-demo-button atom-demo-button--danger">Archive launch</AlertDialog.Trigger><AlertDialog.Portal><AlertDialog.Overlay className="atom-demo-overlay" /><AlertDialog.Content className="atom-demo-dialog"><AlertDialog.Title>Archive Northstar?</AlertDialog.Title><AlertDialog.Description>The launch leaves the active mission list.</AlertDialog.Description><div className="atom-demo-dialog__actions"><AlertDialog.Cancel className="atom-demo-button atom-demo-button--quiet">Cancel</AlertDialog.Cancel><AlertDialog.Action className="atom-demo-button atom-demo-button--danger">Archive</AlertDialog.Action></div></AlertDialog.Content></AlertDialog.Portal></AlertDialog.Root>;
}

function FoundationContent() {
  const titleId = useId();
  const descriptionId = useId();
  // This is Atom's documented low-level Modal composition. The returned object
  // includes both reactive state and a callback ref, which React's refs lint
  // currently treats as ref-only even though these fields are render contracts.
  const modal = useModalContent({ "aria-labelledby": titleId, "aria-describedby": descriptionId });
  /* eslint-disable react-hooks/refs -- documented useModalContent render contract */
  if (!modal.isPresent) return null;
  return <Modal.Portal><div {...modal.contentProps} className="atom-demo-dialog" data-positioned={modal.isPositioned ? "" : undefined} data-state={modal.dataState} hidden={modal.isHidden} ref={modal.presenceRef}><h2 id={titleId}>Modal foundation</h2><p id={descriptionId}>Focus containment and dismissal without a prescribed surface.</p><Modal.Close className="atom-demo-button">Close foundation</Modal.Close></div></Modal.Portal>;
  /* eslint-enable react-hooks/refs */
}

function ModalSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Modal.Root onOpenChange={(open, reason) => onSignal(`modal foundation: ${open ? "open" : reason ?? "closed"}`)}><Modal.Trigger className="atom-demo-button">Open foundation</Modal.Trigger><FoundationContent /></Modal.Root>;
}

function DrawerSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Drawer.Root onOpenChange={(open, reason) => onSignal(`drawer: ${open ? "open" : reason ?? "closed"}`)}><Drawer.Trigger className="atom-demo-button">Open mission details</Drawer.Trigger><Drawer.Portal><Drawer.Overlay className="atom-demo-overlay" /><Drawer.Content className="atom-demo-drawer" placement="right"><Drawer.Title>Mission details</Drawer.Title><Drawer.Description>Inspect launch ownership without leaving the current page.</Drawer.Description><dl><div><dt>Owner</dt><dd>Flight team</dd></div><div><dt>Status</dt><dd>Ready</dd></div></dl><Drawer.Close className="atom-demo-button">Done</Drawer.Close></Drawer.Content></Drawer.Portal></Drawer.Root>;
}

function PopoverSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Popover.Root onOpenChange={(open) => onSignal(`popover open: ${open}`)}><Popover.Trigger className="atom-demo-button">Launch settings</Popover.Trigger><Popover.Portal><Popover.Content className="atom-demo-popover"><div className="atom-demo-popover__header"><Popover.Title>Launch settings</Popover.Title><Popover.Description>Choose how this launch reports its completion state.</Popover.Description></div><label className="atom-demo-choice atom-demo-popover__option"><input type="checkbox" defaultChecked /><span><strong>Announce completion</strong><small>Send a polite status update when validation finishes.</small></span></label><div className="atom-demo-popover__footer"><Popover.Close className="atom-demo-button">Apply settings</Popover.Close></div><Popover.Arrow className="atom-demo-arrow" /></Popover.Content></Popover.Portal></Popover.Root>;
}

function HoverCardSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <HoverCard.Root onOpenChange={(open) => onSignal(`hover card open: ${open}`)} openDelay={120}><HoverCard.Trigger asChild><a className="atom-demo-profile-trigger" href="#maya"><span className="atom-demo-avatar">MD</span><span><strong>Maya Donin</strong><small>Flight systems</small></span></a></HoverCard.Trigger><HoverCard.Portal><HoverCard.Content className="atom-demo-popover atom-demo-profile-card"><strong>Maya Donin</strong><p>Coordinates keyboard, touch, and voice validation for Northstar.</p><small>12 systems reviewed</small><HoverCard.Arrow className="atom-demo-arrow" /></HoverCard.Content></HoverCard.Portal></HoverCard.Root>;
}

function TooltipSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Tooltip.Provider openDelay={150}><Tooltip.Root onOpenChange={(open) => onSignal(`tooltip open: ${open}`)}><Tooltip.Trigger className="atom-demo-icon-button" aria-label="Inspect signal">?</Tooltip.Trigger><Tooltip.Portal><Tooltip.Content className="atom-demo-tooltip">Inspect signal details<Tooltip.Arrow className="atom-demo-arrow" /></Tooltip.Content></Tooltip.Portal></Tooltip.Root></Tooltip.Provider>;
}

function ToastSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Toast.Provider closeButton><DemoSurface className="atom-demo-toast-stage"><div><strong>Mission notifications</strong><p>Trigger a polite, dismissible status message.</p></div><DemoButton onClick={() => { toast.success("Mission saved", { description: "Northstar is ready for the next review.", duration: Infinity }); onSignal("toast announced politely"); }}>Save mission</DemoButton><Toast.Viewport className="atom-demo-toast-viewport" renderToast={({ toast: toastData, index, expanded }) => <Toast.Root className="atom-demo-toast" toast={toastData} index={index} expanded={expanded}><div><Toast.Title /><Toast.Description /></div><Toast.Close className="atom-demo-icon-button" aria-label="Dismiss notification">×</Toast.Close></Toast.Root>} /></DemoSurface></Toast.Provider>;
}

export default function OverlaySpecimens(props: ExampleProps) {
  switch (props.slug) {
    case "dialog": return <DialogSpecimen onSignal={props.onSignal} />;
    case "alert-dialog": return <AlertDialogSpecimen onSignal={props.onSignal} />;
    case "modal": return <ModalSpecimen onSignal={props.onSignal} />;
    case "drawer": return <DrawerSpecimen onSignal={props.onSignal} />;
    case "popover": return <PopoverSpecimen onSignal={props.onSignal} />;
    case "hover-card": return <HoverCardSpecimen onSignal={props.onSignal} />;
    case "tooltip": return <TooltipSpecimen onSignal={props.onSignal} />;
    case "toast": return <ToastSpecimen onSignal={props.onSignal} />;
    default: return <ContractSpecimen {...props} />;
  }
}
