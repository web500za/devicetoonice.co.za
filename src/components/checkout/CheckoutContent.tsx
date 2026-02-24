"use client";

import { useState } from "react";
import { getProduct, findVariant, findColor, formatPrice } from "@/lib/products";
import type { CheckoutFormData } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const SA_PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
] as const;

function validateForm(form: CheckoutFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!form.firstName.trim()) errors.firstName = "First name is required";
  if (!form.lastName.trim()) errors.lastName = "Last name is required";

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email address";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (
    !/^(0[6-8][0-9]{8}|\+27[6-8][0-9]{8})$/.test(
      form.phone.replace(/\s/g, "")
    )
  ) {
    errors.phone = "Enter a valid SA mobile number";
  }

  if (!form.streetAddress.trim())
    errors.streetAddress = "Street address is required";
  if (!form.city.trim()) errors.city = "City is required";
  if (!form.province) errors.province = "Province is required";

  if (!form.postalCode.trim()) {
    errors.postalCode = "Postal code is required";
  } else if (!/^\d{4}$/.test(form.postalCode.trim())) {
    errors.postalCode = "Enter a valid 4-digit postal code";
  }

  return errors;
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export default function CheckoutContent() {
  const product = getProduct("oneplus15");

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">
          <p
            className="text-white text-lg"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Product not found
          </p>
          <a
            href="/"
            className="text-apple-gray hover:text-white transition-colors text-sm mt-4 inline-block"
          >
            &larr; Back to home
          </a>
        </div>
      </div>
    );
  }

  return <CheckoutPage product={product} />;
}

function CheckoutPage({
  product,
}: {
  product: NonNullable<ReturnType<typeof getProduct>>;
}) {
  const { r, g, b } = hexToRgb(product.accentColor);

  // ── Config State ──
  const [selectedRam, setSelectedRam] = useState(product.ramOptions[0]);
  const [selectedStorage, setSelectedStorage] = useState(
    product.storageOptions[0]
  );
  const [selectedColorKey, setSelectedColorKey] = useState(
    product.colors[0].key
  );

  const availableStorage = product.storageOptions.filter(
    (s) => findVariant(product, selectedRam, s) !== undefined
  );
  const effectiveStorage = availableStorage.includes(selectedStorage)
    ? selectedStorage
    : availableStorage[0];
  const effectiveVariant = findVariant(product, selectedRam, effectiveStorage)!;
  const availableColors = effectiveVariant.colors.map(
    (key) => findColor(product, key)!
  );
  const activeColorKey = effectiveVariant.colors.includes(selectedColorKey)
    ? selectedColorKey
    : effectiveVariant.colors[0];
  const activeColor = findColor(product, activeColorKey)!;

  // ── Form State ──
  const [form, setForm] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function updateField(field: keyof CheckoutFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: product.slug,
          ram: selectedRam,
          storage: effectiveStorage,
          color: activeColorKey,
          amountInCents: effectiveVariant.price * 100,
          customer: form,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const { redirectUrl } = await res.json();
      window.location.href = redirectUrl;
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong"
      );
      setSubmitting(false);
    }
  }

  // ── Pay Now Button (shared) ──
  function PayNowButton({ className }: { className?: string }) {
    return (
      <Button
        type="submit"
        disabled={submitting}
        className={`w-full text-white py-4 h-auto rounded-full font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className ?? ""}`}
        style={{ backgroundColor: product.accentColor }}
        onMouseEnter={(e) => {
          if (!submitting) {
            e.currentTarget.style.backgroundColor = product.accentHover;
            e.currentTarget.style.boxShadow = `0 0 30px rgba(${r}, ${g}, ${b}, 0.3)`;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = product.accentColor;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {submitting
          ? "Redirecting to payment..."
          : `Pay ${formatPrice(effectiveVariant.price)}`}
      </Button>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* ── Header Bar ── */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/80">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <a
            href="/"
            className="text-apple-gray hover:text-white transition-colors text-sm inline-flex items-center gap-2"
          >
            <span>&larr;</span> Back to Home
          </a>
          <span
            className="text-white text-sm font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Device Too Nice
          </span>
        </div>
      </header>

      {/* ── Mobile Product Hero Strip ── */}
      <div className="lg:hidden px-6 py-6 flex items-center gap-4 border-b border-white/5">
        <img
          src={activeColor.image}
          alt={`${product.name} ${activeColor.name}`}
          className="w-16"
          style={{
            filter: `drop-shadow(0 10px 30px rgba(${r}, ${g}, ${b}, 0.1))`,
          }}
        />
        <div>
          <h1
            className="text-white font-bold text-lg tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {product.name}
          </h1>
          <p className="text-apple-gray text-sm">{product.tagline}</p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* ── Left Column ── */}
            <div className="lg:col-span-3">
              {/* ── Configure Your Device ── */}
              <section>
                <h2
                  className="font-bold text-2xl text-white tracking-tight mb-8"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Configure Your Device
                </h2>

                {/* RAM Selector */}
                <div className="mb-6">
                  <p className="text-apple-gray text-xs uppercase tracking-widest mb-4">
                    Memory
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {product.ramOptions.map((ram) => (
                      <button
                        key={ram}
                        type="button"
                        onClick={() => {
                          setSelectedRam(ram);
                          if (!findVariant(product, ram, selectedStorage)) {
                            const firstAvailable = product.storageOptions.find(
                              (s) =>
                                findVariant(product, ram, s) !== undefined
                            );
                            if (firstAvailable)
                              setSelectedStorage(firstAvailable);
                          }
                        }}
                        className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border cursor-pointer"
                        style={
                          selectedRam === ram
                            ? {
                                borderColor: product.accentColor,
                                backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
                                color: "#ffffff",
                              }
                            : {
                                borderColor: "rgba(255,255,255,0.1)",
                                color: "#86868b",
                              }
                        }
                      >
                        {ram}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage Selector */}
                <div className="mb-6">
                  <p className="text-apple-gray text-xs uppercase tracking-widest mb-4">
                    Storage
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {product.storageOptions.map((storage) => {
                      const available =
                        findVariant(product, selectedRam, storage) !== undefined;
                      return (
                        <button
                          key={storage}
                          type="button"
                          onClick={() => available && setSelectedStorage(storage)}
                          disabled={!available}
                          className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border"
                          style={
                            effectiveStorage === storage
                              ? {
                                  borderColor: product.accentColor,
                                  backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
                                  color: "#ffffff",
                                  cursor: "pointer",
                                }
                              : available
                                ? {
                                    borderColor: "rgba(255,255,255,0.1)",
                                    color: "#86868b",
                                    cursor: "pointer",
                                  }
                                : {
                                    borderColor: "rgba(255,255,255,0.05)",
                                    color: "rgba(255,255,255,0.2)",
                                    cursor: "not-allowed",
                                    opacity: 0.2,
                                  }
                          }
                        >
                          {storage}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Picker */}
                <div className="mb-8">
                  <p className="text-apple-gray text-xs uppercase tracking-widest mb-3">
                    Colour
                  </p>
                  <div className="flex items-center gap-4">
                    {availableColors.map((c) => (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => setSelectedColorKey(c.key)}
                        className={`w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${
                          activeColorKey === c.key
                            ? "scale-110"
                            : "hover:scale-105"
                        }`}
                        style={{
                          backgroundColor: c.hex,
                          boxShadow:
                            activeColorKey === c.key
                              ? `0 0 0 2px black, 0 0 0 4px ${product.accentColor}`
                              : undefined,
                        }}
                        aria-label={c.name}
                      />
                    ))}
                  </div>
                  <p className="text-apple-gray text-sm mt-2">
                    {activeColor.name}
                  </p>
                </div>

                {/* Product Image */}
                <div className="flex justify-center mb-4">
                  <img
                    src={activeColor.image}
                    alt={`${product.name} ${activeColor.name}`}
                    className="w-40 md:w-52 transition-all duration-500"
                    style={{
                      filter: `drop-shadow(0 20px 60px rgba(${r}, ${g}, ${b}, 0.12))`,
                    }}
                    loading="lazy"
                  />
                </div>
              </section>

              <Separator className="bg-white/10 my-8" />

              {/* ── Delivery Details ── */}
              <section>
                <h2
                  className="font-bold text-2xl text-white tracking-tight mb-8"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Delivery Details
                </h2>

                {/* First Name / Last Name */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-apple-gray text-xs uppercase tracking-widest mb-2">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="John"
                      value={form.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-11 focus-visible:ring-0"
                      style={
                        errors.firstName
                          ? { borderColor: "#ef4444" }
                          : undefined
                      }
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor =
                          product.accentColor)
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          errors.firstName
                            ? "#ef4444"
                            : "rgba(255,255,255,0.1)")
                      }
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-apple-gray text-xs uppercase tracking-widest mb-2">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-11 focus-visible:ring-0"
                      style={
                        errors.lastName
                          ? { borderColor: "#ef4444" }
                          : undefined
                      }
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor =
                          product.accentColor)
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor =
                          errors.lastName
                            ? "#ef4444"
                            : "rgba(255,255,255,0.1)")
                      }
                    />
                    {errors.lastName && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <Label className="text-apple-gray text-xs uppercase tracking-widest mb-2">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-11 focus-visible:ring-0"
                    style={
                      errors.email ? { borderColor: "#ef4444" } : undefined
                    }
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = product.accentColor)
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = errors.email
                        ? "#ef4444"
                        : "rgba(255,255,255,0.1)")
                    }
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <Label className="text-apple-gray text-xs uppercase tracking-widest mb-2">
                    Phone
                  </Label>
                  <Input
                    type="tel"
                    placeholder="072 123 4567"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-11 focus-visible:ring-0"
                    style={
                      errors.phone ? { borderColor: "#ef4444" } : undefined
                    }
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = product.accentColor)
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = errors.phone
                        ? "#ef4444"
                        : "rgba(255,255,255,0.1)")
                    }
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Street Address */}
                <div className="mb-4">
                  <Label className="text-apple-gray text-xs uppercase tracking-widest mb-2">
                    Street Address
                  </Label>
                  <Input
                    type="text"
                    placeholder="123 Main Street, Apt 4"
                    value={form.streetAddress}
                    onChange={(e) =>
                      updateField("streetAddress", e.target.value)
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-11 focus-visible:ring-0"
                    style={
                      errors.streetAddress
                        ? { borderColor: "#ef4444" }
                        : undefined
                    }
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = product.accentColor)
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        errors.streetAddress
                          ? "#ef4444"
                          : "rgba(255,255,255,0.1)")
                    }
                  />
                  {errors.streetAddress && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.streetAddress}
                    </p>
                  )}
                </div>

                {/* City / Province */}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-apple-gray text-xs uppercase tracking-widest mb-2">
                      City
                    </Label>
                    <Input
                      type="text"
                      placeholder="Cape Town"
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-11 focus-visible:ring-0"
                      style={
                        errors.city ? { borderColor: "#ef4444" } : undefined
                      }
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor =
                          product.accentColor)
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = errors.city
                          ? "#ef4444"
                          : "rgba(255,255,255,0.1)")
                      }
                    />
                    {errors.city && (
                      <p className="text-red-400 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-apple-gray text-xs uppercase tracking-widest mb-2">
                      Province
                    </Label>
                    <Select
                      value={form.province || undefined}
                      onValueChange={(value) => updateField("province", value)}
                    >
                      <SelectTrigger
                        className="w-full bg-white/5 border-white/10 text-white rounded-xl h-11 focus-visible:ring-0 data-[placeholder]:text-white/30"
                        style={
                          errors.province
                            ? { borderColor: "#ef4444" }
                            : undefined
                        }
                      >
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/10">
                        {SA_PROVINCES.map((p) => (
                          <SelectItem
                            key={p}
                            value={p}
                            className="text-white focus:bg-white/10 focus:text-white"
                          >
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.province && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.province}
                      </p>
                    )}
                  </div>
                </div>

                {/* Postal Code */}
                <div className="mb-8">
                  <Label className="text-apple-gray text-xs uppercase tracking-widest mb-2">
                    Postal Code
                  </Label>
                  <Input
                    type="text"
                    placeholder="8001"
                    maxLength={4}
                    value={form.postalCode}
                    onChange={(e) => updateField("postalCode", e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl h-11 max-w-[140px] focus-visible:ring-0"
                    style={
                      errors.postalCode
                        ? { borderColor: "#ef4444" }
                        : undefined
                    }
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = product.accentColor)
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = errors.postalCode
                        ? "#ef4444"
                        : "rgba(255,255,255,0.1)")
                    }
                  />
                  {errors.postalCode && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.postalCode}
                    </p>
                  )}
                </div>

                {/* Submit Error Banner */}
                {submitError && (
                  <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </div>
                )}

                {/* Mobile Pay Now */}
                <div className="lg:hidden">
                  <PayNowButton />
                  <p className="text-apple-gray text-xs text-center mt-4">
                    You&apos;ll be redirected to Yoco&apos;s secure payment page
                  </p>
                </div>
              </section>
            </div>

            {/* ── Right Column: Order Summary ── */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-20">
                <Card className="bg-white/[0.03] border-white/10 rounded-2xl">
                  <CardContent className="p-6 md:p-8">
                    <h2
                      className="font-semibold text-white text-lg tracking-tight mb-6"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Order Summary
                    </h2>

                    {/* Product Image */}
                    <div className="flex justify-center mb-6">
                      <img
                        src={activeColor.image}
                        alt={`${product.name} ${activeColor.name}`}
                        className="w-32 transition-all duration-500"
                        style={{
                          filter: `drop-shadow(0 10px 30px rgba(${r}, ${g}, ${b}, 0.1))`,
                        }}
                      />
                    </div>

                    {/* Product Name */}
                    <p
                      className="text-white font-semibold text-center mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {product.name}
                    </p>

                    {/* Config Summary */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-apple-gray">RAM</span>
                        <span className="text-white font-medium">
                          {selectedRam}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-apple-gray">Storage</span>
                        <span className="text-white font-medium">
                          {effectiveStorage}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-apple-gray">Colour</span>
                        <span className="text-white font-medium flex items-center gap-2">
                          <span
                            className="inline-block w-3 h-3 rounded-full"
                            style={{ backgroundColor: activeColor.hex }}
                          />
                          {activeColor.name}
                        </span>
                      </div>
                    </div>

                    <Separator className="bg-white/10 my-5" />

                    {/* Pricing */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-apple-gray">Subtotal</span>
                        <span className="text-white font-medium">
                          {formatPrice(effectiveVariant.price)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-apple-gray">Delivery</span>
                        <span className="text-green-400 font-medium">FREE</span>
                      </div>
                      <Separator className="bg-white/10" />
                      <div className="flex justify-between">
                        <span className="text-white font-semibold">Total</span>
                        <span
                          className="font-bold text-lg"
                          style={{ color: product.accentColor }}
                        >
                          {formatPrice(effectiveVariant.price)}
                        </span>
                      </div>
                    </div>

                    {/* Trust Signals */}
                    <div className="mt-6 space-y-2.5">
                      <TrustSignal
                        icon={
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.747L15.47 4.397A2.25 2.25 0 0 0 13.643 3.5H9.75v10.75h10.5"
                            />
                          </svg>
                        }
                        text="Free delivery nationwide"
                      />
                      <TrustSignal
                        icon={
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                            />
                          </svg>
                        }
                        text="No customs fees"
                      />
                      <TrustSignal
                        icon={
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        }
                        text="7-10 day delivery"
                      />
                      <TrustSignal
                        icon={
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                            />
                          </svg>
                        }
                        text="Warranty included"
                      />
                    </div>

                    {/* Desktop Pay Now */}
                    <div className="hidden lg:block mt-6">
                      <PayNowButton />
                      <p className="text-apple-gray text-xs text-center mt-4">
                        You&apos;ll be redirected to Yoco&apos;s secure payment
                        page
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function TrustSignal({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-apple-gray text-xs">
      {icon}
      <span>{text}</span>
    </div>
  );
}
