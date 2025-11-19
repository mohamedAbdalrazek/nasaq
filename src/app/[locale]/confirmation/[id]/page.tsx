"use client";
import { useParams } from "next/navigation";
import React from "react";

import LoadingPage from "@/components/loading/Loading";
import Confirmation from "./Confirmation";
import { useBooking } from "@/hooks/useBooking";
export default function Page() {
    const { id } = useParams();
    
    const {error , loading, booking} = useBooking(id)

    if (loading) return <LoadingPage size="large" />;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!booking) return <p>No booking found.</p>;

    return <Confirmation booking={booking} />;
}
