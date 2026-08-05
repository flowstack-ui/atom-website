"use client";

import { useState } from "react";
import { Activity, Bold, ChevronLeft, ChevronRight, Home, Italic, LayoutDashboard, Link2, Menu as MenuIcon, MoreHorizontal, Orbit, Radio, Redo2, Settings, Undo2, Users } from "lucide-react";
import { AppBar } from "@flowstack-ui/atom/app-bar";
import { BottomNavigation } from "@flowstack-ui/atom/bottom-navigation";
import { Breadcrumb } from "@flowstack-ui/atom/breadcrumb";
import { ContextMenu } from "@flowstack-ui/atom/context-menu";
import { DropdownMenu } from "@flowstack-ui/atom/dropdown-menu";
import { Link } from "@flowstack-ui/atom/link";
import { Menu } from "@flowstack-ui/atom/menu";
import { Menubar } from "@flowstack-ui/atom/menubar";
import { NavigationMenu } from "@flowstack-ui/atom/navigation-menu";
import { NavList } from "@flowstack-ui/atom/nav-list";
import { Pagination } from "@flowstack-ui/atom/pagination";
import { Sidebar } from "@flowstack-ui/atom/sidebar";
import { Tabs } from "@flowstack-ui/atom/tabs";
import { Toolbar } from "@flowstack-ui/atom/toolbar";
import type { ExampleProps } from "../example-types";
import { ContractSpecimen, DemoSurface } from "../example-shared";

const menuItems = ["New project", "Open launch", "Save snapshot"];

function AppBarSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <AppBar.Root aria-label="Northstar workspace" className="atom-demo-appbar"><AppBar.Toolbar><AppBar.Start><span className="atom-demo-appbar__brand"><span className="atom-demo-logo"><Orbit size={16} /></span><span><strong>Northstar</strong><small>Mission control</small></span></span></AppBar.Start><AppBar.Center><span className="atom-demo-appbar__status"><i /> All systems nominal</span></AppBar.Center><AppBar.End><button className="atom-demo-icon-button" onClick={() => onSignal("settings activated")} type="button" aria-label="Open settings"><Settings size={16} /></button></AppBar.End></AppBar.Toolbar></AppBar.Root>;
}

function BottomNavigationSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  const items = [{ value: "home", label: "Home", Icon: Home }, { value: "signals", label: "Signals", Icon: Radio }, { value: "crew", label: "Crew", Icon: Users }];
  return <BottomNavigation.Root ariaLabel="Mission" className="atom-demo-bottom-nav" defaultValue="signals" onChange={(value) => onSignal(`destination: ${value}`)}>{items.map(({ value, label, Icon }) => <BottomNavigation.Item key={value} value={value}><Icon aria-hidden="true" size={18} /><span>{label}</span></BottomNavigation.Item>)}</BottomNavigation.Root>;
}

function BreadcrumbSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Breadcrumb.Root aria-label="Mission path" className="atom-demo-breadcrumb"><Breadcrumb.List><Breadcrumb.Item><Breadcrumb.Link href="#mission" onClick={() => onSignal("path: Mission")}>Mission</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator>/</Breadcrumb.Separator><Breadcrumb.Item><Breadcrumb.Link href="#launch" onClick={() => onSignal("path: Launches")}>Launches</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator>/</Breadcrumb.Separator><Breadcrumb.Item><Breadcrumb.Page>Northstar</Breadcrumb.Page></Breadcrumb.Item></Breadcrumb.List></Breadcrumb.Root>;
}

function NavListSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  const [active, setActive] = useState("Overview");
  return <NavList.Root aria-label="Mission sections" className="atom-demo-nav-list"><NavList.List>{[["Overview", LayoutDashboard], ["Telemetry", Activity], ["Crew", Users]].map(([label, Icon]) => <NavList.Item key={label as string}><NavList.Link active={active === label} href={`#${String(label).toLowerCase()}`} onClick={(event) => { event.preventDefault(); setActive(label as string); onSignal(`section: ${label}`); }}><Icon aria-hidden="true" size={16} /><span>{label as string}</span><span className="atom-demo-nav-list__current" aria-hidden="true" /></NavList.Link></NavList.Item>)}</NavList.List></NavList.Root>;
}

function NavigationMenuSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <NavigationMenu.Root aria-label="Product" className="atom-demo-navigation-menu" onValueChange={(value) => onSignal(`panel: ${value ?? "closed"}`)}><NavigationMenu.List><NavigationMenu.Item value="learn"><NavigationMenu.Trigger>Learn</NavigationMenu.Trigger><NavigationMenu.Content><div className="atom-demo-nav-panel"><NavigationMenu.Link href="#guides">Guides <small>Build from behavior.</small></NavigationMenu.Link><NavigationMenu.Link href="#accessibility">Accessibility <small>Validate every input.</small></NavigationMenu.Link></div></NavigationMenu.Content></NavigationMenu.Item><NavigationMenu.Item value="primitives"><NavigationMenu.Link href="#primitives">Primitives</NavigationMenu.Link></NavigationMenu.Item></NavigationMenu.List><NavigationMenu.Viewport className="atom-demo-navigation-viewport" /></NavigationMenu.Root>;
}

function StaticMenuSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Menu.Root defaultOpen modal={false}><Menu.Portal disabled><Menu.Content className="atom-demo-menu atom-demo-menu--static">{menuItems.map((item) => <Menu.Item key={item} onSelect={() => onSignal(`command: ${item}`)} value={item.toLowerCase().replaceAll(" ", "-")}>{item}<span>⌘</span></Menu.Item>)}<Menu.Separator /><Menu.CheckboxItem defaultChecked onCheckedChange={(checked) => onSignal(`autosave: ${checked}`)} value="autosave">Autosave<Menu.ItemIndicator>✓</Menu.ItemIndicator></Menu.CheckboxItem></Menu.Content></Menu.Portal></Menu.Root>;
}

function DropdownSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <DropdownMenu.Root onOpenChange={(open) => onSignal(`menu open: ${open}`)}><DropdownMenu.Trigger className="atom-demo-button">Mission actions <span>⌄</span></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="atom-demo-menu">{menuItems.map((item) => <DropdownMenu.Item key={item} onSelect={() => onSignal(`command: ${item}`)} value={item.toLowerCase().replaceAll(" ", "-")}>{item}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>;
}

function ContextMenuSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <ContextMenu.Root onOpenChange={(open) => onSignal(`context menu open: ${open}`)}><ContextMenu.Trigger asChild><div aria-label="Northstar launch context actions" className="atom-demo-context-target" tabIndex={0}><span className="atom-demo-context-target__eyebrow"><MenuIcon size={14} /> Context menu area</span><span className="atom-demo-context-target__icon"><MenuIcon size={22} /></span><strong>Northstar launch</strong><span className="atom-demo-context-target__copy">Right-click anywhere inside this rectangle to open the available actions.</span><span className="atom-demo-context-target__hint"><kbd>Shift</kbd><b>+</b><kbd>F10</kbd><i>or long-press</i></span></div></ContextMenu.Trigger><ContextMenu.Portal><ContextMenu.Content className="atom-demo-menu"><ContextMenu.Item onSelect={() => onSignal("command: Review")} value="review">Review launch</ContextMenu.Item><ContextMenu.Item onSelect={() => onSignal("command: Duplicate")} value="duplicate">Duplicate</ContextMenu.Item><ContextMenu.Item onSelect={() => onSignal("command: Archive")} value="archive">Archive</ContextMenu.Item></ContextMenu.Content></ContextMenu.Portal></ContextMenu.Root>;
}

function MenubarSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Menubar.Root aria-label="Mission commands" className="atom-demo-menubar"><Menubar.Menu value="file"><Menubar.Trigger>File</Menubar.Trigger><Menubar.Content className="atom-demo-menu"><Menubar.Item onSelect={() => onSignal("file: New mission")} value="new">New mission</Menubar.Item><Menubar.Item onSelect={() => onSignal("file: Open")} value="open">Open</Menubar.Item></Menubar.Content></Menubar.Menu><Menubar.Menu value="view"><Menubar.Trigger>View</Menubar.Trigger><Menubar.Content className="atom-demo-menu"><Menubar.Item onSelect={() => onSignal("view: Telemetry")} value="telemetry">Telemetry</Menubar.Item><Menubar.Item onSelect={() => onSignal("view: Console")} value="console">Console</Menubar.Item></Menubar.Content></Menubar.Menu></Menubar.Root>;
}

function PaginationSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  const [page, setPage] = useState(2);
  return <div className="atom-demo-pagination-wrap"><span>Page {page} of 7</span><Pagination.Root aria-label="Mission pages" className="atom-demo-pagination" page={page} onPageChange={(next) => { setPage(next); onSignal(`page: ${next}`); }} totalPages={7}><Pagination.List><Pagination.Previous><ChevronLeft size={16} /><span className="atom-demo-sr-label">Previous</span></Pagination.Previous><Pagination.Items /><Pagination.Next><span className="atom-demo-sr-label">Next</span><ChevronRight size={16} /></Pagination.Next></Pagination.List></Pagination.Root></div>;
}

function SidebarSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  const [active, setActive] = useState("Overview");
  const items = [["Overview", LayoutDashboard], ["Signals", Radio], ["Settings", Settings]] as const;
  return <Sidebar.Root className="atom-demo-sidebar" collapsedState="rail" defaultState="expanded" onStateChange={(state) => onSignal(`sidebar: ${state}`)}><Sidebar.Panel aria-label="Mission navigation"><strong className="atom-demo-sidebar__brand"><span><Orbit size={15} /></span><em>Atom</em></strong><nav aria-label="Demo sidebar">{items.map(([label, Icon]) => <a data-active={active === label ? "" : undefined} href={`#${label.toLowerCase()}`} key={label} onClick={(event) => { event.preventDefault(); setActive(label); onSignal(`section: ${label}`); }}><Icon size={16} /><span>{label}</span></a>)}</nav></Sidebar.Panel><Sidebar.Main><div className="atom-demo-sidebar__main-head"><Sidebar.Trigger className="atom-demo-icon-button"><MenuIcon size={16} /><span className="atom-demo-sr-label">Toggle navigation</span></Sidebar.Trigger><div><strong>Mission workspace</strong><small>Northstar / {active}</small></div></div><div className="atom-demo-sidebar__metric"><span>Readiness</span><strong>94%</strong></div><p>The panel owns layout state while this application owns routes and content.</p></Sidebar.Main></Sidebar.Root>;
}

function TabsSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Tabs.Root className="atom-demo-tabs" defaultValue="keyboard" onValueChange={(value) => onSignal(`tab: ${value}`)}><Tabs.List aria-label="Behavior channel"><Tabs.Trigger value="keyboard">Keyboard</Tabs.Trigger><Tabs.Trigger value="voice">Voice</Tabs.Trigger><Tabs.Trigger value="touch">Touch</Tabs.Trigger><Tabs.Indicator /></Tabs.List><Tabs.Content value="keyboard"><strong>Roving focus</strong><p>Arrow keys move between the available channels.</p></Tabs.Content><Tabs.Content value="voice"><strong>Named relationships</strong><p>Roles, labels, and states remain available to assistive technology.</p></Tabs.Content><Tabs.Content value="touch"><strong>Pointer parity</strong><p>Touch and mouse activation use the same state contract.</p></Tabs.Content></Tabs.Root>;
}

function ToolbarSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Toolbar.Root aria-label="Text controls" className="atom-demo-toolbar"><Toolbar.Button aria-label="Undo" onClick={() => onSignal("undo")}><Undo2 size={16} /></Toolbar.Button><Toolbar.Button aria-label="Redo" onClick={() => onSignal("redo")}><Redo2 size={16} /></Toolbar.Button><Toolbar.Separator /><Toolbar.ToggleGroup aria-label="Formatting" defaultValue={["bold"]} type="multiple"><Toolbar.ToggleItem aria-label="Bold" value="bold" onClick={() => onSignal("format: bold")}><Bold size={16} /></Toolbar.ToggleItem><Toolbar.ToggleItem aria-label="Italic" value="italic" onClick={() => onSignal("format: italic")}><Italic size={16} /></Toolbar.ToggleItem></Toolbar.ToggleGroup><Toolbar.Separator /><Toolbar.Link href="#share" onClick={(event) => { event.preventDefault(); onSignal("share link"); }}><Link2 size={15} /> Share</Toolbar.Link><Toolbar.Button aria-label="More formatting options" onClick={() => onSignal("more options")}><MoreHorizontal size={16} /></Toolbar.Button></Toolbar.Root>;
}

function LinkSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <DemoSurface className="atom-demo-link-card"><span>Continue through the system</span><Link.Root className="atom-demo-link" href="#guides" onClick={() => onSignal("link destination preserved")}>Read the guides →</Link.Root></DemoSurface>;
}

export default function NavigationSpecimens(props: ExampleProps) {
  switch (props.slug) {
    case "app-bar": return <AppBarSpecimen onSignal={props.onSignal} />;
    case "bottom-navigation": return <BottomNavigationSpecimen onSignal={props.onSignal} />;
    case "breadcrumb": return <BreadcrumbSpecimen onSignal={props.onSignal} />;
    case "nav-list": return <NavListSpecimen onSignal={props.onSignal} />;
    case "navigation-menu": return <NavigationMenuSpecimen onSignal={props.onSignal} />;
    case "menu": return <StaticMenuSpecimen onSignal={props.onSignal} />;
    case "dropdown-menu": return <DropdownSpecimen onSignal={props.onSignal} />;
    case "context-menu": return <ContextMenuSpecimen onSignal={props.onSignal} />;
    case "menubar": return <MenubarSpecimen onSignal={props.onSignal} />;
    case "pagination": return <PaginationSpecimen onSignal={props.onSignal} />;
    case "sidebar": return <SidebarSpecimen onSignal={props.onSignal} />;
    case "tabs": return <TabsSpecimen onSignal={props.onSignal} />;
    case "toolbar": return <ToolbarSpecimen onSignal={props.onSignal} />;
    case "link": return <LinkSpecimen onSignal={props.onSignal} />;
    default: return <ContractSpecimen {...props} />;
  }
}
