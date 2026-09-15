import type { ConsultationRequest, ContactResult } from "../model/types";

/** POSTs a consultation request to the site's own API route. */
export async function submitConsultationRequest(request: ConsultationRequest): Promise<ContactResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    const result = (await response.json().catch(() => null)) as ContactResult | null;
    if (result) return result;

    return response.ok
      ? { ok: true }
      : { ok: false, message: "تعذّر إرسال الطلب. يرجى المحاولة عبر الواتساب." };
  } catch {
    return { ok: false, message: "تعذّر الاتصال بالخادم. يرجى المحاولة عبر الواتساب." };
  }
}
