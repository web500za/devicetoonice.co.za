"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import AnimateIn from "@/components/AnimateIn";
import { getProduct, findVariant, findColor, formatPrice } from "@/lib/products";
import type { CheckoutFormData } from "@/lib/types";

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
  } else if (!/^(0[6-8][0-9]{8}|\+27[6-8][0-9]{8})$/.test(form.phone.replace(/\s/g, ""))) {
    errors.phone = "Enter a valid SA mobile number";
  }

  if (!form.streetAddress.trim()) errors.streetAddress = "Street address is required";
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
  const searchParams = useSearchParams();

  const productSlug = searchParams.get("product") || "oneplus15";
  const product = getProduct(productSlug);

  // Fallback to first product if invalid slug
  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-white text-lg font-[family-name:var(--font-display)]">Product not found</p>
          <a href="/" className="text-apple-gray hover:text-white transition-colors text-sm mt-4 inline-block font-[family-name:var(--font-body)]">
            &larr; Back to home
          </a>
        </div>
      </div>
    );
  }

  const { r, g, b } = hexToRgb(product.accentColor);

  const ramParam = searchParams.get("ram");
  const storageParam = searchParams.get("storage");
  const colorParam = searchParams.get("color");

  const ram = ramParam && product.ramOptions.includes(ramParam) ? ramParam : product.ramOptions[0];
  const storage = storageParam && product.storageOptions.includes(storageParam) ? storageParam : product.storageOptions[0];

  const variant = findVariant(product, ram, storage);
  const effectiveVariant = variant || findVariant(product, product.ramOptions[0], product.storageOptions[0])!;
  const effectiveRam = variant ? ram : product.ramOptions[0];
  const effectiveStorage = variant ? storage : product.storageOptions[0];

  const color =
    colorParam && effectiveVariant.colors.includes(colorParam)
      ? colorParam
      : effectiveVariant.colors[0];
  const colorInfo = findColor(product, color)!;

  return (
    <CheckoutForm
      product={product}
      effectiveRam={effectiveRam}
      effectiveStorage={effectiveStorage}
      effectiveVariant={effectiveVariant}
      colorInfo={colorInfo}
      color={color}
      accentRgb={{ r, g, b }}
    />
  );
}

function CheckoutForm({
  product,
  effectiveRam,
  effectiveStorage,
  effectiveVariant,
  colorInfo,
  color,
  accentRgb,
}: {
  product: NonNullable<ReturnType<typeof getProduct>>;
  effectiveRam: string;
  effectiveStorage: string;
  effectiveVariant: { price: number; colors: string[] };
  colorInfo: { key: string; name: string; hex: string; image: string };
  color: string;
  accentRgb: { r: number; g: number; b: number };
}) {
  const { r, g, b } = accentRgb;
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
          ram: effectiveRam,
          storage: effectiveStorage,
          color,
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
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-[family-name:var(--font-body)] placeholder:text-white/30 focus:outline-none transition-colors";
  const errorClass = "text-red-400 text-xs mt-1 font-[family-name:var(--font-body)]";
  const labelClass =
    "text-apple-gray text-xs uppercase tracking-widest mb-2 block font-[family-name:var(--font-body)]";

  return (
    <div className="min-h-screen bg-black px-6 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <AnimateIn>
          <a
            href={`/${product.slug}#order`}
            className="text-apple-gray hover:text-white transition-colors text-sm font-[family-name:var(--font-body)] inline-flex items-center gap-2 mb-10"
          >
            <span>&larr;</span> Back to {product.name}
          </a>
        </AnimateIn>

        <AnimateIn delay={100}>
          <h1 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2rem,5vw,3rem)] text-white tracking-[-0.03em] leading-[1.05] mb-12">
            Checkout
          </h1>
        </AnimateIn>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <AnimateIn delay={200}>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 sticky top-8">
                <h2 className="font-[family-name:var(--font-display)] font-semibold text-white text-lg tracking-tight mb-6">
                  Order Summary
                </h2>

                <div className="flex justify-center mb-6">
                  <img
                    src={colorInfo.image}
                    alt={`${product.name} ${colorInfo.name}`}
                    className="w-36"
                    style={{ filter: `drop-shadow(0 10px 30px rgba(${r}, ${g}, ${b}, 0.1))` }}
                  />
                </div>

                <div className="space-y-3 text-sm font-[family-name:var(--font-body)]">
                  <div className="flex justify-between">
                    <span className="text-apple-gray">Product</span>
                    <span className="text-white font-medium">{product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-apple-gray">Memory</span>
                    <span className="text-white font-medium">{effectiveRam}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-apple-gray">Storage</span>
                    <span className="text-white font-medium">{effectiveStorage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-apple-gray">Colour</span>
                    <span className="text-white font-medium flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ backgroundColor: colorInfo.hex }}
                      />
                      {colorInfo.name}
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-white font-semibold">Total</span>
                      <span className="font-bold text-lg" style={{ color: product.accentColor }}>
                        {formatPrice(effectiveVariant.price)}
                      </span>
                    </div>
                    <p className="text-apple-gray-text text-xs mt-2">
                      Free delivery nationwide · No customs · 7–10 days
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>

          <div className="lg:col-span-3">
            <AnimateIn delay={300}>
              <form onSubmit={handleSubmit} noValidate>
                <h2 className="font-[family-name:var(--font-display)] font-semibold text-white text-lg tracking-tight mb-6">
                  Delivery Details
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      value={form.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className={inputClass}
                      style={{ borderColor: errors.firstName ? undefined : undefined }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = product.accentColor)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className={inputClass}
                      onFocus={(e) => (e.currentTarget.style.borderColor = product.accentColor)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={inputClass}
                    onFocus={(e) => (e.currentTarget.style.borderColor = product.accentColor)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>

                <div className="mb-4">
                  <label className={labelClass}>Phone</label>
                  <input
                    type="tel"
                    placeholder="072 123 4567"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={inputClass}
                    onFocus={(e) => (e.currentTarget.style.borderColor = product.accentColor)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                  {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                </div>

                <div className="mb-4">
                  <label className={labelClass}>Street Address</label>
                  <input
                    type="text"
                    placeholder="123 Main Street, Apt 4"
                    value={form.streetAddress}
                    onChange={(e) => updateField("streetAddress", e.target.value)}
                    className={inputClass}
                    onFocus={(e) => (e.currentTarget.style.borderColor = product.accentColor)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                  {errors.streetAddress && <p className={errorClass}>{errors.streetAddress}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>City</label>
                    <input
                      type="text"
                      placeholder="Cape Town"
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className={inputClass}
                      onFocus={(e) => (e.currentTarget.style.borderColor = product.accentColor)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    {errors.city && <p className={errorClass}>{errors.city}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Province</label>
                    <select
                      value={form.province}
                      onChange={(e) => updateField("province", e.target.value)}
                      className={`${inputClass} ${!form.province ? "text-white/30" : ""}`}
                    >
                      <option value="" disabled>
                        Select province
                      </option>
                      {SA_PROVINCES.map((p) => (
                        <option key={p} value={p} className="bg-black text-white">
                          {p}
                        </option>
                      ))}
                    </select>
                    {errors.province && <p className={errorClass}>{errors.province}</p>}
                  </div>
                </div>

                <div className="mb-8">
                  <label className={labelClass}>Postal Code</label>
                  <input
                    type="text"
                    placeholder="8001"
                    maxLength={4}
                    value={form.postalCode}
                    onChange={(e) => updateField("postalCode", e.target.value)}
                    className={`${inputClass} max-w-[140px]`}
                    onFocus={(e) => (e.currentTarget.style.borderColor = product.accentColor)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                  {errors.postalCode && <p className={errorClass}>{errors.postalCode}</p>}
                </div>

                {submitError && (
                  <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p className="text-red-400 text-sm font-[family-name:var(--font-body)]">
                      {submitError}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full text-white py-4 rounded-full font-semibold text-lg transition-all duration-300 font-[family-name:var(--font-body)] disabled:opacity-50 disabled:cursor-not-allowed"
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
                  {submitting ? "Redirecting to payment..." : `Pay ${formatPrice(effectiveVariant.price)}`}
                </button>

                <p className="text-apple-gray-text text-xs text-center mt-4 font-[family-name:var(--font-body)]">
                  You&apos;ll be redirected to Yoco&apos;s secure payment page
                </p>
              </form>
            </AnimateIn>
          </div>
        </div>
      </div>
    </div>
  );
}
