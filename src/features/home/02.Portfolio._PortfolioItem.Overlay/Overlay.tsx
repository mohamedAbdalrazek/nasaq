import Link from "next/link";
import type { OverlayProps } from "./types";

export function Overlay({ href, label, className }: OverlayProps) {
  return (
    <div className={className}>
      <Link target="blank" href={href} className="btn btn-primary">
        {label}
      </Link>
    </div>
  );
}
