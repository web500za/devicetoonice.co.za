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
      <div className="light-theme min-h-screen flex items-center justify-center px-6 bg-background">
        <div className="text-center">
          <p className="text-lg text-foreground">Product not found</p>
          <Link href="/" className="text-muted-foreground hover:text-foreground text-sm mt-4 inline-block">
            &larr; Back
          </Link>
        </div>
      </div>
    );
  }

  if (isSoldOut) {
    return (
      <div className="light-theme min-h-screen bg-background">
        <header className="border-b border-border">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              &larr; Back
            </Link>
            <span className="text-sm font-semibold tracking-tight text-foreground">Checkout</span>
            <div className="w-10" />
          </div>
        </header>
        <div className="flex flex-col items-center justify-center px-6 py-24">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">Sold Out</h2>
          <p className="text-muted-foreground text-sm mb-8 text-center max-w-md">
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
      <p className="text-destructive text-xs mt-1">{errors[field]}</p>
    ) : null;
  }

  return (
    <div className="light-theme min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            &larr; Back
          </Link>
          <span className="text-sm font-semibold tracking-tight text-foreground">Checkout</span>
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
                <h2 className="text-lg font-semibold tracking-tight text-foreground mb-6">
                  Configure
                </h2>

                {/* RAM */}
                <div className="mb-5">
                  <Label className="text-muted-foreground text-xs uppercase tracking-widest mb-2.5 block">
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
                            ? "border-foreground bg-foreground text-background"
                            : "border-border text-muted-foreground hover:border-foreground/30"
                        }`}
                      >
                        {ram}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage */}
                <div className="mb-5">
                  <Label className="text-muted-foreground text-xs uppercase tracking-widest mb-2.5 block">
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
                              ? "border-foreground bg-foreground text-background cursor-pointer"
                              : available
                                ? "border-border text-muted-foreground hover:border-foreground/30 cursor-pointer"
                                : "border-border/50 text-muted-foreground/30 cursor-not-allowed"
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
                  <Label className="text-muted-foreground text-xs uppercase tracking-widest mb-2.5 block">
                    Colour &mdash; <span className="text-foreground/60">{activeColor.name}</span>
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
                              ? `0 0 0 2px #fff, 0 0 0 4px ${c.hex === "#1a1a1a" ? "#0a0a0a" : c.hex}`
                              : "inset 0 0 0 1px rgba(0,0,0,0.15)",
                        }}
                        aria-label={c.name}
                      />
                    ))}
                  </div>
                </div>

              </section>

              <div className="h-px bg-border" />

              {/* Delivery */}
              <section>
                <h2 className="text-lg font-semibold tracking-tight text-foreground mb-6">
                  Delivery
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">First name</Label>
                    <Input
                      placeholder="John"
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      className={errors.firstName ? "border-destructive" : ""}
                    />
                    <FieldError field="firstName" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">Last name</Label>
                    <Input
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                    <FieldError field="lastName" />
                  </div>
                </div>

                <div className="mb-4">
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Email</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  <FieldError field="email" />
                </div>

                <div className="mb-4">
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Phone</Label>
                  <Input
                    type="tel"
                    placeholder="081 234 5678"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  <p className="text-muted-foreground text-xs mt-1">South African mobile number</p>
                  <FieldError field="phone" />
                </div>

                <div className="mb-4">
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Street address</Label>
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
                    className={errors.streetAddress ? "border-destructive" : ""}
                  />
                  <FieldError field="streetAddress" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">City</Label>
                    <Input
                      placeholder="Cape Town"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      className={errors.city ? "border-destructive" : ""}
                    />
                    <FieldError field="city" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">Province</Label>
                    <Select
                      value={form.province || undefined}
                      onValueChange={(v) => update("province", v)}
                    >
                      <SelectTrigger className={errors.province ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {SA_PROVINCES.map((p) => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError field="province" />
                  </div>
                </div>

                <div className="mb-6">
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Postal code</Label>
                  <Input
                    placeholder="8001"
                    maxLength={4}
                    value={form.postalCode}
                    onChange={(e) => update("postalCode", e.target.value)}
                    className={`max-w-[120px] ${errors.postalCode ? "border-destructive" : ""}`}
                  />
                  <FieldError field="postalCode" />
                </div>

                {submitError && (
                  <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-destructive text-sm">{submitError}</p>
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
                  <p className="text-muted-foreground text-xs text-center mt-3">
                    Secure payment via Yoco
                  </p>
                  <p className="text-muted-foreground/60 text-xs text-center mt-2">
                    By paying, you agree to our{" "}
                    <Link href="/terms" className="text-muted-foreground hover:text-foreground underline">Terms</Link>
                    {" "}&amp;{" "}
                    <Link href="/privacy" className="text-muted-foreground hover:text-foreground underline">Privacy Policy</Link>
                  </p>
                </div>
              </section>
            </div>

            {/* ── Right: Summary ── */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-6">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex justify-center mb-5">
                    <img
                      src={activeColor.image}
                      alt={`${product.name} ${activeColor.name}`}
                      className="w-24"
                    />
                  </div>

                  <p className="font-semibold text-center text-foreground mb-1">{product.name}</p>
                  <p className="text-muted-foreground text-sm text-center mb-5">
                    {selectedRam} &middot; {effectiveStorage} &middot; {activeColor.name}
                  </p>

                  <div className="h-px bg-border mb-5" />

                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">{formatPrice(effectiveVariant.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-medium text-foreground">Free</span>
                    </div>
                  </div>

                  <div className="h-px bg-border my-5" />

                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-foreground">{formatPrice(effectiveVariant.price)}</span>
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
                    <p className="text-muted-foreground text-xs text-center mt-3">
                      Secure payment via Yoco
                    </p>
                    <p className="text-muted-foreground/60 text-xs text-center mt-2">
                      By paying, you agree to our{" "}
                      <Link href="/terms" className="text-muted-foreground hover:text-foreground underline">Terms</Link>
                      {" "}&amp;{" "}
                      <Link href="/privacy" className="text-muted-foreground hover:text-foreground underline">Privacy Policy</Link>
                    </p>
                  </div>

                  <div className="h-px bg-border my-5" />

                  <div className="text-muted-foreground text-xs space-y-1.5">
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
