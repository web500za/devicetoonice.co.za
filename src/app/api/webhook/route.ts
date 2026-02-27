import { NextResponse } from "next/server";
import { Resend } from "resend";
import { decrementStock } from "@/lib/stock";

const resend = new Resend(process.env.RESEND_API_KEY);

function buildConfirmationEmail(metadata: Record<string, string>, paymentId: string, amount: number) {
  const formattedAmount = `R${(amount / 100).toLocaleString("en-ZA")}`;
  const productName = metadata.product || "Device";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="padding:30px 40px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.1);">
          <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">Device Too Nice</h1>
        </td></tr>

        <!-- Confirmation -->
        <tr><td style="padding:40px 40px 20px;">
          <div style="text-align:center;margin-bottom:30px;">
            <div style="display:inline-block;width:60px;height:60px;border-radius:50%;background-color:rgba(227,25,55,0.15);line-height:60px;font-size:28px;">&#10003;</div>
          </div>
          <h2 style="margin:0 0 8px;font-size:28px;font-weight:700;color:#ffffff;text-align:center;letter-spacing:-0.02em;">Payment Confirmed</h2>
          <p style="margin:0;font-size:15px;color:#86868b;text-align:center;">Thank you for your order, ${metadata.firstName}!</p>
        </td></tr>

        <!-- Order Summary -->
        <tr><td style="padding:20px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;">
            <tr><td>
              <h3 style="margin:0 0 16px;font-size:14px;font-weight:600;color:#e31937;text-transform:uppercase;letter-spacing:0.1em;">Order Summary</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#86868b;">Product</td>
                  <td style="padding:8px 0;font-size:14px;color:#ffffff;text-align:right;font-weight:500;">${productName}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#86868b;">Configuration</td>
                  <td style="padding:8px 0;font-size:14px;color:#ffffff;text-align:right;font-weight:500;">${metadata.ram} / ${metadata.storage}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#86868b;">Colour</td>
                  <td style="padding:8px 0;font-size:14px;color:#ffffff;text-align:right;font-weight:500;">${metadata.color}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:12px 0 0;border-top:1px solid rgba(255,255,255,0.1);"></td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:16px;color:#ffffff;font-weight:600;">Total</td>
                  <td style="padding:8px 0;font-size:16px;color:#e31937;text-align:right;font-weight:700;">${formattedAmount}</td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- Delivery Address -->
        <tr><td style="padding:10px 40px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;">
            <tr><td>
              <h3 style="margin:0 0 12px;font-size:14px;font-weight:600;color:#e31937;text-transform:uppercase;letter-spacing:0.1em;">Delivery Address</h3>
              <p style="margin:0;font-size:14px;color:#ffffff;line-height:1.6;">
                ${metadata.firstName} ${metadata.lastName}<br>
                ${metadata.streetAddress}<br>
                ${metadata.city}, ${metadata.province} ${metadata.postalCode}<br>
                ${metadata.phone}
              </p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Reference -->
        <tr><td style="padding:10px 40px 30px;">
          <p style="margin:0;font-size:12px;color:#6e6e73;text-align:center;">
            Payment Reference: ${paymentId}
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.1);text-align:center;">
          <p style="margin:0;font-size:12px;color:#6e6e73;">
            &copy; ${new Date().getFullYear()} Device Too Nice. All rights reserved.<br>
            Free delivery &amp; customs included. No hidden fees.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.type !== "payment.succeeded") {
      return NextResponse.json({ received: true });
    }

    const { metadata, id: paymentId, amount } = body.payload;

    if (!metadata?.email) {
      console.error("Webhook: no email in metadata");
      return NextResponse.json({ received: true });
    }

    // Decrement stock atomically
    try {
      const newRemaining = await decrementStock();
      if (newRemaining === null) {
        console.error("OVERSELL DETECTED — stock was already 0. Payment:", paymentId);
      } else {
        console.log(`Stock decremented to ${newRemaining} for payment ${paymentId}`);
      }
    } catch (error) {
      console.error("Stock decrement failed:", error, "Payment:", paymentId);
    }

    const html = buildConfirmationEmail(metadata, paymentId, amount);
    const productName = metadata.product || "Device";

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: metadata.email,
      cc: "jared.january@gmail.com",
      subject: `Order Confirmed - ${productName} (${metadata.ram}/${metadata.storage})`,
      html,
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ received: true });
  }
}
