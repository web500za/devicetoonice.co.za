import { Suspense } from "react";
import { getStock } from "@/lib/stock";
import CheckoutContent from "@/components/checkout/CheckoutContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Checkout — Device Too Nice",
  description: "Complete your OnePlus 15 order",
};

function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-apple-gray text-sm font-[family-name:var(--font-body)]">
        Loading checkout...
      </div>
    </div>
  );
}

export default async function CheckoutPage() {
  const stock = await getStock();

  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent stock={stock} />
    </Suspense>
  );
}
