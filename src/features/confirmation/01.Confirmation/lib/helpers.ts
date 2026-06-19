const URGENCY_CLASS_MAP = {
  urgent: "urgencyHigh",
  moderate: "urgencyMedium",
  planning: "urgencyLow",
} as const;

export function getUrgencyBadgeClass(urgency?: string) {
  if (!urgency) return null;

  return (
    URGENCY_CLASS_MAP[urgency as keyof typeof URGENCY_CLASS_MAP] ??
    "urgencyMedium"
  );
}

export function formatUrgencyLabel(urgency: string) {
  return urgency.charAt(0).toUpperCase() + urgency.slice(1);
}
