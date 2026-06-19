import { firestore } from "@/shared/lib/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const bookingId = searchParams.get("bookingId");
  if (!bookingId) {
    return new Response(JSON.stringify({ error: "Missing bookingId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const docRef = doc(collection(firestore, "booking"), bookingId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return new Response(
        JSON.stringify({ id: bookingId, ...docSnap.data() }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      return new Response("Booking not found", { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}
