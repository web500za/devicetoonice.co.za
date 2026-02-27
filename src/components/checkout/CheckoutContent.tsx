"use client";

import { useState } from "react";
import { getProduct, findVariant, findColor, formatPrice } from "@/lib/products";
import type { CheckoutFormData } from "@/lib/types";
import type { StockData } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddressAutocomplete } from "@/components/checkout/AddressAutocomplete";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/ui/waitlist-form";
import Link from "next/link";

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
  if (!form.firstName.trim()) errors.firstName = "Required";
  if (!form.lastName.trim()) errors.lastName = "Required";
  if (!form.email.trim()) {
    errors.email = "Required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email";
  }
  if (!form.phone.trim()) {
    errors.phone = "Required";
  } else if (
    !/^(0[6-8][0-9]{8}|\+27[6-8][0-9]{8})$/.test(form.phone.replace(/\s/g, ""))
  ) {
    errors.phone = "Invalid SA mobile number";
  }
  if (!form.streetAddress.trim()) errors.streetAddress = "Required";
  if (!form.city.trim()) errors.city = "Required";
  if (!form.province) errors.province = "Required";
  if (!form.postalCode.trim()) {
    errors.postalCode = "Required";
  } else if (!/^\d{4}$/.test(form.postalCode.trim())) {
    errors.postalCode = "Invalid postal code";
  }
  return errors;
}

export default function CheckoutContent({ stock }: { stock: StockData }) {
  const product = getProduct("oneplus15");
  const isSoldOut = stock.remaining <= 0;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-lg text-white">Product not found</p>
          <Link href="/" className="text-white/40 hover:text-white text-sm mt-4 inline-block">
            &larr; Back
          </Link>
        </div>
      </div>
    );
  }

  if (isSoldOut) {
    return (
      <div className="min-h-screen bg-black">
        <header className="border-b border-white/[0.08]">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="text-white/40 hover:text-white transition-colors text-sm">
              &larr; Back
            </Link>
            <span className="text-sm font-semibold tracking-tight text-white">Checkout</span>
            <div className="w-10" />
          </div>
        </header>
        <div className="flex flex-col items-center justify-center px-6 py-24">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Sold Out</h2>
          <p className="text-white/40 text-sm mb-8 text-center max-w-md">
            This month&apos;s allocation has sold out. Join the waitlist and we&apos;ll email you when new stock is available.
          </p>
          <WaitlistForm />
        </div>
      </div>
    );
  }

  return <CheckoutForm product={product} />;
}

function CheckoutForm({
  product,
}: {
  product: NonNullable<ReturnType<typeof getProduct>>;
}) {
  const [selectedRam, setSelectedRam] = useState(product.ramOptions[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions[0]);
  const [selectedColorKey, setSelectedColorKey] = useState(product.colors[0].key);

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

  function update(field: keyof CheckoutFormData, value: string) {
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
        if (data.error === "SOLD_OUT") {
          throw new Error("This item just sold out. Please join the waitlist on the homepage.");
        }
        throw new Error(data.error || "Something went wrong");
      }
      const { redirectUrl } = await res.json();
      window.location.href = redirectUrl;
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  function FieldError({ field }: { field: string }) {
    return errors[field] ? (
      <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
    ) : null;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-white/40 hover:text-white transition-colors text-sm">
            &larr; Back
          </Link>
          <span className="text-sm font-semibold tracking-tight text-white">Checkout</span>
          <div className="w-10" />
        </div>
      </header>

      <form onSubmit={handleSubmit} noValidate>
        <div className="max-w-5xl mx-auto px-6 py-10 lg:py-14">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* ── Left: Form ── */}
            <div className="lg:col-span-3 space-y-10">
              {/* Configure */}
              <section>
                <h2 className="text-lg font-semibold tracking-tight text-white mb-6">
                  Configure
                </h2>

                {/* RAM */}
                <div className="mb-5">
                  <Label className="text-white/40 text-xs uppercase tracking-widest mb-2.5 block">
                    Memory
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {product.ramOptions.map((ram) => (
                      <button
                        key={ram}
                        type="button"
                        onClick={() => {
                          setSelectedRam(ram);
                          if (!findVariant(product, ram, selectedStorage)) {
                            const first = product.storageOptions.find(
                              (s) => findVariant(product, ram, s) !== undefined
                            );
                            if (first) setSelectedStorage(first);
                          }
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                          selectedRam === ram
                            ? "border-white bg-white text-black"
                            : "border-white/[0.12] text-white/50 hover:border-white/30"
                        }`}
                      >
                        {ram}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage */}
                <div className="mb-5">
                  <Label className="text-white/40 text-xs uppercase tracking-widest mb-2.5 block">
                    Storage
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {product.storageOptions.map((storage) => {
                      const available = findVariant(product, selectedRam, storage) !== undefined;
                      return (
                        <button
                          key={storage}
                          type="button"
                          onClick={() => available && setSelectedStorage(storage)}
                          disabled={!available}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                            effectiveStorage === storage
                              ? "border-white bg-white text-black cursor-pointer"
                              : available
                                ? "border-white/[0.12] text-white/50 hover:border-white/30 cursor-pointer"
                                : "border-white/[0.06] text-white/15 cursor-not-allowed"
                          }`}
                        >
                          {storage}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color */}
                <div className="mb-6">
                  <Label className="text-white/40 text-xs uppercase tracking-widest mb-2.5 block">
                    Colour &mdash; <span className="text-white/60">{activeColor.name}</span>
                  </Label>
                  <div className="flex items-center gap-2.5">
                    {availableColors.map((c) => (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => setSelectedColorKey(c.key)}
                        className="w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110"
                        style={{
                          backgroundColor: c.hex,
                          boxShadow:
                            activeColorKey === c.key
                              ? `0 0 0 2px #000, 0 0 0 4px ${c.hex === "#1a1a1a" ? "#ffffff" : c.hex}`
                              : "inset 0 0 0 1px rgba(255,255,255,0.15)",
                        }}
                        aria-label={c.name}
                      />
                    ))}
                  </div>
                </div>

              </section>

              <div className="h-px bg-white/[0.08]" />

              {/* Delivery */}
              <section>
                <h2 className="text-lg font-semibold tracking-tight text-white mb-6">
                  Delivery
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-xs text-white/40 mb-1.5 block">First name</Label>
                    <Input
                      placeholder="John"
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      className={`bg-white/[0.05] border-white/[0.12] text-white placeholder:text-white/25 focus-visible:border-white/30 focus-visible:ring-white/10 ${errors.firstName ? "border-red-400/50" : ""}`}
                    />
                    <FieldError field="firstName" />
                  </div>
                  <div>
                    <Label className="text-xs text-white/40 mb-1.5 block">Last name</Label>
                    <Input
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      className={`bg-white/[0.05] border-white/[0.12] text-white placeholder:text-white/25 focus-visible:border-white/30 focus-visible:ring-white/10 ${errors.lastName ? "border-red-400/50" : ""}`}
                    />
                    <FieldError field="lastName" />
                  </div>
                </div>

                <div className="mb-4">
                  <Label className="text-xs text-white/40 mb-1.5 block">Email</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={`bg-white/[0.05] border-white/[0.12] text-white placeholder:text-white/25 focus-visible:border-white/30 focus-visible:ring-white/10 ${errors.email ? "border-red-400/50" : ""}`}
                  />
                  <FieldError field="email" />
                </div>

                <div className="mb-4">
                  <Label className="text-xs text-white/40 mb-1.5 block">Phone</Label>
                  <Input
                    type="tel"
                    placeholder="081 234 5678"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={`bg-white/[0.05] border-white/[0.12] text-white placeholder:text-white/25 focus-visible:border-white/30 focus-visible:ring-white/10 ${errors.phone ? "border-red-400/50" : ""}`}
                  />
                  <p className="text-white/25 text-xs mt-1">South African mobile number</p>
                  <FieldError field="phone" />
                </div>

                <div className="mb-4">
                  <Label className="text-xs text-white/40 mb-1.5 block">Street address</Label>
                  <AddressAutocomplete
                    placeholder="Start typing your address..."
                    value={form.streetAddress}
                    onChange={(v) => update("streetAddress", v)}
                    onPlaceSelect={(place) => {
                      setForm((prev) => ({
                        ...prev,
                        streetAddress: place.streetAddress,
                        city: place.city || prev.city,
                        province: place.province || prev.province,
                        postalCode: place.postalCode || prev.postalCode,
                      }));
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.streetAddress;
                        if (place.city) delete next.city;
                        if (place.province) delete next.province;
                        if (place.postalCode) delete next.postalCode;
                        return next;
                      });
                    }}
                    className={`bg-white/[0.05] border-white/[0.12] text-white placeholder:text-white/25 focus-visible:border-white/30 focus-visible:ring-white/10 ${errors.streetAddress ? "border-red-400/50" : ""}`}
                  />
                  <FieldError field="streetAddress" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-xs text-white/40 mb-1.5 block">City</Label>
                    <Input
                      placeholder="Cape Town"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      className={`bg-white/[0.05] border-white/[0.12] text-white placeholder:text-white/25 focus-visible:border-white/30 focus-visible:ring-white/10 ${errors.city ? "border-red-400/50" : ""}`}
                    />
                    <FieldError field="city" />
                  </div>
                  <div>
                    <Label className="text-xs text-white/40 mb-1.5 block">Province</Label>
                    <Select
                      value={form.province || undefined}
                      onValueChange={(v) => update("province", v)}
                    >
                      <SelectTrigger className={`bg-white/[0.05] border-white/[0.12] text-white w-full [&_svg]:text-white/30 ${errors.province ? "border-red-400/50" : ""}`}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-white/[0.12]">
                        {SA_PROVINCES.map((p) => (
                          <SelectItem key={p} value={p} className="text-white/70 focus:bg-white/[0.08] focus:text-white">{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError field="province" />
                  </div>
                </div>

                <div className="mb-6">
                  <Label className="text-xs text-white/40 mb-1.5 block">Postal code</Label>
                  <Input
                    placeholder="8001"
                    maxLength={4}
                    value={form.postalCode}
                    onChange={(e) => update("postalCode", e.target.value)}
                    className={`max-w-[120px] bg-white/[0.05] border-white/[0.12] text-white placeholder:text-white/25 focus-visible:border-white/30 focus-visible:ring-white/10 ${errors.postalCode ? "border-red-400/50" : ""}`}
                  />
                  <FieldError field="postalCode" />
                </div>

                {submitError && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-400/20">
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </div>
                )}

                {/* Mobile pay button */}
                <div className="lg:hidden pt-2">
                  <Button
                    type="submit"
                    disabled={submitting}
                    size="lg"
                    className="w-full rounded-full h-12 text-base bg-[#e31937] text-white hover:bg-[#c91530] cursor-pointer"
                  >
                    {submitting ? "Redirecting..." : `Pay ${formatPrice(effectiveVariant.price)}`}
                  </Button>
                  <p className="text-white/30 text-xs text-center mt-3">
                    Secure payment via Yoco
                  </p>
                  <p className="text-white/20 text-xs text-center mt-2">
                    By paying, you agree to our{" "}
                    <Link href="/terms" className="text-white/30 hover:text-white/50 underline">Terms</Link>
                    {" "}&amp;{" "}
                    <Link href="/privacy" className="text-white/30 hover:text-white/50 underline">Privacy Policy</Link>
                  </p>
                </div>
              </section>
            </div>

            {/* ── Right: Summary ── */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-6">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6">
                  <div className="flex justify-center mb-5">
                    <img
                      src={activeColor.image}
                      alt={`${product.name} ${activeColor.name}`}
                      className="w-24"
                    />
                  </div>

                  <p className="font-semibold text-center text-white mb-1">{product.name}</p>
                  <p className="text-white/40 text-sm text-center mb-5">
                    {selectedRam} &middot; {effectiveStorage} &middot; {activeColor.name}
                  </p>

                  <div className="h-px bg-white/[0.08] mb-5" />

                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/40">Subtotal</span>
                      <span className="font-medium text-white">{formatPrice(effectiveVariant.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Delivery</span>
                      <span className="font-medium text-white">Free</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/[0.08] my-5" />

                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-white">Total</span>
                    <span className="text-xl font-bold text-white">{formatPrice(effectiveVariant.price)}</span>
                  </div>

                  {/* Desktop pay button */}
                  <div className="hidden lg:block mt-6">
                    <Button
                      type="submit"
                      disabled={submitting}
                      size="lg"
                      className="w-full rounded-full h-12 text-base bg-[#e31937] text-white hover:bg-[#c91530] cursor-pointer"
                    >
                      {submitting ? "Redirecting..." : `Pay ${formatPrice(effectiveVariant.price)}`}
                    </Button>
                    <p className="text-white/30 text-xs text-center mt-3">
                      Secure payment via Yoco
                    </p>
                    <p className="text-white/20 text-xs text-center mt-2">
                      By paying, you agree to our{" "}
                      <Link href="/terms" className="text-white/30 hover:text-white/50 underline">Terms</Link>
                      {" "}&amp;{" "}
                      <Link href="/privacy" className="text-white/30 hover:text-white/50 underline">Privacy Policy</Link>
                    </p>
                  </div>

                  <div className="h-px bg-white/[0.08] my-5" />

                  <div className="text-white/30 text-xs space-y-1.5">
                    <p>Free delivery nationwide</p>
                    <p>No customs fees</p>
                    <p>7&ndash;10 day delivery</p>
                    <p>Warranty included</p>
                    <p>Charger in the box</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
