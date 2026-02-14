import { Link } from "@tanstack/react-router";

/** Pixel/terminal-style Watchtower logo for the header */
export function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-foreground no-underline hover:opacity-90"
      aria-label="Watchtower home"
    >
      <WatchtowerIcon className="size-7 shrink-0 text-primary" />
      <span className="font-logo text-sm tracking-wider text-foreground">
        WATCHTOWER
      </span>
    </Link>
  );
}

/** Blocky/pixel-style watchtower icon (tower with base and top) */
function WatchtowerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      role="img"
    >
      <title>Watchtower</title>
      {/* Base block */}
      <rect x="8" y="16" width="8" height="4" />
      {/* Tower body - stacked blocks */}
      <rect x="9" y="10" width="6" height="6" />
      <rect x="10" y="4" width="4" height="6" />
      {/* Top / beacon */}
      <rect x="11" y="0" width="2" height="4" />
    </svg>
  );
}
