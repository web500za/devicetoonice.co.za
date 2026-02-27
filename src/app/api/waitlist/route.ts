import { NextResponse } from "next/server";
import { getStock, addToWaitlist } from "@/lib/stock";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { remaining } = await getStock();
    if (remaining > 0) {
      return NextResponse.json(
        { error: "Stock is still available — no need to join the waitlist" },
        { status: 400 }
      );
    }

    await addToWaitlist(email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
