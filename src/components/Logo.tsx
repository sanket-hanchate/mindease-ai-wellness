import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-display font-bold text-lg ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-white shadow-soft">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-7-4.5-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-7 10-7 10z" />
        </svg>
      </span>
      <span className="tracking-tight">MindEase</span>
    </Link>
  );
}
