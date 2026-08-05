export type ExampleLayout = "compact" | "form" | "overlay" | "expanding" | "collection" | "structural" | "utility";

export type ExampleProps = {
  slug: string;
  title: string;
  onSignal: (signal: string) => void;
};

export type ExampleConfig = {
  layout: ExampleLayout;
  prompt: string;
  initialSignal: string;
};
