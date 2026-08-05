export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="atom-brand" role="img" aria-label="Atom">
      <span className="atom-mark" aria-hidden="true">
        <span className="atom-mark__orbit" />
        <span className="atom-mark__particle" />
        <span className="atom-mark__signal" />
      </span>
      {!compact ? <span className="atom-word">Atom</span> : null}
    </span>
  );
}
