import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="document-eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The documentation page you requested does not exist.</p>
      <Link href="/" className="text-button">
        Return to the documentation
      </Link>
    </main>
  );
}
