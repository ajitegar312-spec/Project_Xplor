import type { LeadPayload } from "@/types";

// Frontend talks ONLY to this client. Swap baseUrl to a real backend later
// without touching any UI component. See API_CONTRACT.md.
const base = "";
const TIMEOUT_MS = 10000;

export class ApiError extends Error {
  status: number;
  retryAfter?: number;
  constructor(message: string, status: number, retryAfter?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    if (retryAfter !== undefined) this.retryAfter = retryAfter;
  }
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${base}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError("Request timed out", 408);
    }
    throw new ApiError(err instanceof Error ? err.message : "Network error", 0);
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const data = (await res.json()) as { error?: unknown };
      if (typeof data.error === "string" && data.error) message = data.error;
    } catch {
      // Keep default message when body is not JSON.
    }
    const retryAfterHeader = res.headers.get("Retry-After");
    const retryAfter = retryAfterHeader ? Number(retryAfterHeader) || undefined : undefined;
    throw new ApiError(message, res.status, retryAfter);
  }
  return res.json() as Promise<T>;
}

export const apiClient = {
  sendLead: (payload: LeadPayload) => post<{ ok: true }>("/api/contact", payload),
  subscribe: (email: string) => post<{ ok: true }>("/api/newsletter", { email }),
};
