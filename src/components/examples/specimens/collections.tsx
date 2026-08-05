"use client";

import { Archive, ChevronRight, Folder, Pin, Radio, Rocket } from "lucide-react";
import { DataGrid } from "@flowstack-ui/atom/data-grid";
import { Feed } from "@flowstack-ui/atom/feed";
import { List } from "@flowstack-ui/atom/list";
import { ScrollArea } from "@flowstack-ui/atom/scroll-area";
import { SwipeableItem } from "@flowstack-ui/atom/swipeable-item";
import { Table } from "@flowstack-ui/atom/table";
import { Tree } from "@flowstack-ui/atom/tree";
import { TreeGrid } from "@flowstack-ui/atom/tree-grid";
import type { ExampleProps } from "../example-types";
import { ContractSpecimen } from "../example-shared";

const rows = [
  ["Northstar", "Ready", "Keyboard"],
  ["Horizon", "Review", "Touch"],
  ["Polaris", "Draft", "Voice"],
];

function DataGridSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <DataGrid.Root aria-label="Mission validation" className="atom-demo-data-table" columnCount={3} defaultValue="Northstar" onValueChange={(value) => onSignal(`selected row: ${String(value)}`)} rowCount={rows.length + 1} selectionMode="single" selectOnRowClick><DataGrid.Header><DataGrid.Row rowIndex={1} selectable={false}><DataGrid.ColumnHeader columnIndex={1}>Mission</DataGrid.ColumnHeader><DataGrid.ColumnHeader columnIndex={2}>Status</DataGrid.ColumnHeader><DataGrid.ColumnHeader columnIndex={3}>Channel</DataGrid.ColumnHeader></DataGrid.Row></DataGrid.Header><DataGrid.Body>{rows.map((row, index) => <DataGrid.Row key={row[0]} rowIndex={index + 2} value={row[0]}><DataGrid.Cell columnIndex={1}>{row[0]}</DataGrid.Cell><DataGrid.Cell columnIndex={2}>{row[1]}</DataGrid.Cell><DataGrid.Cell columnIndex={3}>{row[2]}</DataGrid.Cell></DataGrid.Row>)}</DataGrid.Body></DataGrid.Root>;
}

function TableSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Table.Root className="atom-demo-data-table" onClick={() => onSignal("native table semantics preserved")}><Table.Caption>Mission readiness</Table.Caption><Table.Header><Table.Row><Table.Head>Mission</Table.Head><Table.Head>Status</Table.Head><Table.Head>Channel</Table.Head></Table.Row></Table.Header><Table.Body>{rows.map((row) => <Table.Row key={row[0]}>{row.map((cell) => <Table.Cell key={cell}>{cell}</Table.Cell>)}</Table.Row>)}</Table.Body></Table.Root>;
}

function FeedSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Feed.Root aria-label="Mission updates" className="atom-demo-feed" setSize={3}>{rows.map((row, index) => <Feed.Item index={index} key={row[0]} onFocus={() => onSignal(`feed item: ${index + 1} of 3`)}><span className="atom-demo-avatar">{row[0].slice(0, 2)}</span><div><strong>{row[0]} moved to {row[1]}</strong><small>{index + 2} minutes ago · {row[2]} validation</small></div></Feed.Item>)}</Feed.Root>;
}

function ListSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <List.Root className="atom-demo-list">{rows.map((row, index) => <List.Item key={row[0]} onClick={() => onSignal(`list item: ${row[0]}`)}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{row[0]}</strong><small>{row[1]} · {row[2]}</small></div></List.Item>)}</List.Root>;
}

function TreeSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Tree.Root aria-label="Mission files" className="atom-demo-tree" defaultExpandedValue={["northstar"]} defaultValue="brief" onExpandedValueChange={(value) => onSignal(`expanded: ${value.join(", ") || "none"}`)} onValueChange={(value) => onSignal(`selected: ${String(value)}`)}><Tree.Item expandable value="northstar"><Tree.ItemText><span className="atom-demo-tree__label"><ChevronRight className="atom-demo-tree__chevron" size={15} /><Folder size={15} /> Northstar</span></Tree.ItemText><Tree.Group><Tree.Item value="brief"><Tree.ItemText><span className="atom-demo-tree__label atom-demo-tree__leaf"><Rocket size={14} /> Mission brief</span></Tree.ItemText></Tree.Item><Tree.Item value="telemetry"><Tree.ItemText><span className="atom-demo-tree__label atom-demo-tree__leaf"><Radio size={14} /> Telemetry</span></Tree.ItemText></Tree.Item></Tree.Group></Tree.Item><Tree.Item expandable value="horizon"><Tree.ItemText><span className="atom-demo-tree__label"><ChevronRight className="atom-demo-tree__chevron" size={15} /><Folder size={15} /> Horizon</span></Tree.ItemText><Tree.Group><Tree.Item value="horizon-brief"><Tree.ItemText><span className="atom-demo-tree__label atom-demo-tree__leaf"><Rocket size={14} /> Mission brief</span></Tree.ItemText></Tree.Item></Tree.Group></Tree.Item></Tree.Root>;
}

function TreeGridSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <TreeGrid.Root aria-label="Mission systems" className="atom-demo-data-table atom-demo-tree-grid" columnCount={2} defaultExpandedValue={["flight"]} onExpandedValueChange={(value) => onSignal(`expanded: ${value.join(", ") || "none"}`)} rowCount={3}><TreeGrid.Header><TreeGrid.Row selectable={false} value="header"><TreeGrid.ColumnHeader columnIndex={1}>System</TreeGrid.ColumnHeader><TreeGrid.ColumnHeader columnIndex={2}>Status</TreeGrid.ColumnHeader></TreeGrid.Row></TreeGrid.Header><TreeGrid.Body><TreeGrid.Row expandable rowIndex={1} selectable={false} value="flight"><TreeGrid.RowHeader columnIndex={1}><span className="atom-demo-tree__label"><ChevronRight className="atom-demo-tree__chevron" size={15} /><Folder size={15} /> Flight systems</span></TreeGrid.RowHeader><TreeGrid.Cell columnIndex={2}><span className="atom-demo-system-status"><i /> Ready</span></TreeGrid.Cell></TreeGrid.Row><TreeGrid.Row parentValue="flight" rowIndex={2} value="navigation"><TreeGrid.RowHeader columnIndex={1}>Navigation</TreeGrid.RowHeader><TreeGrid.Cell columnIndex={2}>Online</TreeGrid.Cell></TreeGrid.Row><TreeGrid.Row parentValue="flight" rowIndex={3} value="telemetry"><TreeGrid.RowHeader columnIndex={1}>Telemetry</TreeGrid.RowHeader><TreeGrid.Cell columnIndex={2}>Online</TreeGrid.Cell></TreeGrid.Row></TreeGrid.Body></TreeGrid.Root>;
}

function ScrollAreaSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <ScrollArea.Root className="atom-demo-scroll-area"><ScrollArea.Viewport onScroll={(event) => onSignal(`scrollTop: ${Math.round(event.currentTarget.scrollTop)}px`)} tabIndex={0}><div className="atom-demo-scroll-content">{Array.from({ length: 8 }, (_, index) => <div key={index}><span>{String(index + 1).padStart(2, "0")}</span><p><strong>Validation signal {index + 1}</strong><small>Behavior remains available inside a native scroll boundary.</small></p></div>)}</div></ScrollArea.Viewport></ScrollArea.Root>;
}

function SwipeableSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <div className="atom-demo-swipe-stage"><div className="atom-demo-swipe-hint"><span>Swipe or use ← / →</span><small>Escape closes the actions</small></div><SwipeableItem.Root className="atom-demo-swipe" onFullSwipe={(side) => onSignal(`full swipe: ${side}`)} onOpenSideChange={(side) => onSignal(`open side: ${side ?? "none"}`)}><SwipeableItem.Actions className="atom-demo-swipe-actions" side="start"><button type="button"><Pin size={15} /> Pin</button></SwipeableItem.Actions><SwipeableItem.Content className="atom-demo-swipe-content"><span className="atom-demo-avatar">NS</span><div><strong>Northstar review</strong><small>Ready for launch approval</small></div><ChevronRight aria-hidden="true" size={17} /></SwipeableItem.Content><SwipeableItem.Actions className="atom-demo-swipe-actions atom-demo-swipe-actions--end" side="end"><button type="button"><Archive size={15} /> Archive</button></SwipeableItem.Actions></SwipeableItem.Root></div>;
}

export default function CollectionSpecimens(props: ExampleProps) {
  switch (props.slug) {
    case "data-grid": return <DataGridSpecimen onSignal={props.onSignal} />;
    case "table": return <TableSpecimen onSignal={props.onSignal} />;
    case "feed": return <FeedSpecimen onSignal={props.onSignal} />;
    case "list": return <ListSpecimen onSignal={props.onSignal} />;
    case "tree": return <TreeSpecimen onSignal={props.onSignal} />;
    case "tree-grid": return <TreeGridSpecimen onSignal={props.onSignal} />;
    case "scroll-area": return <ScrollAreaSpecimen onSignal={props.onSignal} />;
    case "swipeable-item": return <SwipeableSpecimen onSignal={props.onSignal} />;
    default: return <ContractSpecimen {...props} />;
  }
}
