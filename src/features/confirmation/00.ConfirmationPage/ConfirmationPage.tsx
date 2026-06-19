"use client";

import { useParams } from "next/navigation";
import { Loading } from "@/shared/components/Loading";
import { useBooking } from "@/shared/hooks/useBooking";
import { Confirmation } from "..";

export default function ConfirmationPage() {
  const { id } = useParams();
  const { error, loading, booking } = useBooking(id);

  if (loading) return <Loading size="large" />;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!booking) return <p>No booking found.</p>;

  return <Confirmation booking={booking} />;
}
