import { supabaseAdmin, supabase } from "./supabase";

const PRODUCT_ID = "oneplus15";

export async function getStock() {
  const { data, error } = await supabase
    .from("stock")
    .select("remaining, total")
    .eq("id", PRODUCT_ID)
    .single();

  if (error || !data) return { remaining: 0, total: 0 };
  return { remaining: data.remaining, total: data.total };
}

/**
 * Atomically decrement stock via raw SQL (service_role).
 * Returns new remaining, or null if already 0.
 */
export async function decrementStock(): Promise<number | null> {
  const { data, error } = await supabaseAdmin.rpc("decrement_stock", {
    product_id: PRODUCT_ID,
  });

  if (error) {
    console.error("decrement_stock RPC error:", error);
    return null;
  }

  // RPC returns -1 if stock was already 0
  return data === -1 ? null : data;
}

export async function addToWaitlist(email: string) {
  const { error } = await supabaseAdmin
    .from("waitlist")
    .upsert({ email, product: PRODUCT_ID }, { onConflict: "email,product" });

  if (error) console.error("Waitlist insert error:", error);
}
