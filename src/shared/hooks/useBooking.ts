"use client";

import { FormData } from "@/shared/lib/types";
import { ParamValue } from "next/dist/server/request/params";
import { useEffect, useState } from "react";

export const useBooking = (
    id: ParamValue,
): { error: string | null; loading: boolean; booking: FormData | null } => {
    const [booking, setBooking] = useState<FormData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchBooking = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/booking/get?bookingId=${id}`);

                if (!res.ok) {
                    const errorData = await res.json().catch(() => null);
                    throw new Error(
                        errorData?.error || "Failed to fetch booking",
                    );
                }

                const data = await res.json();
                setBooking(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [id]);

    return { error, loading, booking };
};
