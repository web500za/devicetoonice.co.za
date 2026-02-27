import { supabaseAdmin, supabase } from "./supabase";

const PRODUCT_ID = "oneplus15";

// In-memory cache for stock data (short TTL to survive brief Supabase outages)
let stockCache: { remaining: number; total: number; timestamp: number } | null = null;
const CACHE_TTL_MS = 60_000; // 60 seconds

async function fetchStockWithRetry(retries = 2, delayMs = 500) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const { data, error } = await supabase
      .from("stock")
      .select("remaining, total")
      .eq("id", PRODUCT_ID)
      .single();

    if (!error && data) {
      // Update cache on success
      stockCache = { remaining: data.remaining, total: data.total, timestamp: Date.now() };
      return { remaining: data.remaining, total: data.total };
    }

    if (attempt < retries) {
      console.warn(`Stock fetch attempt ${attempt + 1} failed, retrying in ${delayMs}ms...`);
      await new Promise((r) => setTimeout(r, delayMs));
    } else {
      console.error("Stock fetch failed after all retries:", error);
    }
  }

  // All retries failed — use cached value if fresh enough
  if (stockCache && Date.now() - stockCache.timestamp < CACHE_TTL_MS) {
    console.warn("Using cached stock data (Supabase unreachable)");
    return { remaining: stockCache.remaining, total: stockCache.total };
  }

  // No cache or cache too old — default to sold out (safe fallback)
  console.error("No cached stock available — defaulting to sold out");
  return { remaining: 0, total: 0 };
}

export async function getStock() {
  return fetchStockWithRetry();
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
