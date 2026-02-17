import { NextResponse } from "next/server";
import { getProduct, findVariant, findColor } from "@/lib/products";
import type { CheckoutRequest } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: CheckoutRequest = await request.json();
    const { productSlug, ram, storage, color, amountInCents, customer } = body;

    // Look up product
    const product = getProduct(productSlug);
    if (!product) {
      return NextResponse.json(
        { error: "Invalid product" },
        { status: 400 }
      );
    }

    // Validate variant exists
    const variant = findVariant(product, ram, storage);
    if (!variant) {
      return NextResponse.json(
        { error: "Invalid variant selected" },
        { status: 400 }
      );
    }

    // Verify price matches (anti-tampering)
    const expectedCents = variant.price * 100;
    if (amountInCents !== expectedCents) {
      return NextResponse.json(
        { error: "Price mismatch" },
        { status: 400 }
      );
    }

    // Verify color is available for this variant
    if (!variant.colors.includes(color)) {
      return NextResponse.json(
        { error: "Color not available for this variant" },
        { status: 400 }
      );
    }

    // Verify color exists
    const colorInfo = findColor(product, color);
    if (!colorInfo) {
      return NextResponse.json(
        { error: "Invalid color" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Create Yoco checkout session
    const yocoResponse = await fetch("https://payments.yoco.com/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency: "ZAR",
        successUrl: `${baseUrl}/order/success?product=${product.slug}`,
        cancelUrl: `${baseUrl}/order/cancelled?product=${product.slug}`,
        metadata: {
          product: product.name,
          productSlug: product.slug,
          ram,
          storage,
          color: colorInfo.name,
          colorKey: color,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          streetAddress: customer.streetAddress,
          city: customer.city,
          province: customer.province,
          postalCode: customer.postalCode,
        },
      }),
    });

    if (!yocoResponse.ok) {
      const errorData = await yocoResponse.text();
      console.error("Yoco API error:", yocoResponse.status, errorData);
      console.error("Yoco request details:", {
        amount: amountInCents,
        successUrl: `${baseUrl}/order/success?product=${product.slug}`,
        cancelUrl: `${baseUrl}/order/cancelled?product=${product.slug}`,
        hasSecretKey: !!process.env.YOCO_SECRET_KEY,
        secretKeyPrefix: process.env.YOCO_SECRET_KEY?.slice(0, 8),
      });
      return NextResponse.json(
        {
          error: `Failed to create checkout session`,
          debug: {
            yocoStatus: yocoResponse.status,
            yocoError: errorData,
            hasSecretKey: !!process.env.YOCO_SECRET_KEY,
            secretKeyPrefix: process.env.YOCO_SECRET_KEY?.slice(0, 8),
            baseUrl,
          },
        },
        { status: 500 }
      );
    }

    const yocoData = await yocoResponse.json();

    return NextResponse.json({ redirectUrl: yocoData.redirectUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
