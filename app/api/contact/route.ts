import { isValid, validateConsultationRequest } from "@/features/consultation-request";
import type { ConsultationRequest, ContactResult } from "@/features/consultation-request";

/**
 * Receives a consultation request from the contact form.
 *
 * Route Handlers are not cached by default in Next 16, and POST is never
 * cached, so no cache configuration is needed here.
 *
 * Delivery (email / CRM) is not wired up yet: set CONTACT_WEBHOOK_URL to
 * forward requests, otherwise the handler validates and logs them so the
 * form has a working backend to talk to.
 */
export async function POST(request: Request): Promise<Response> {
  let payload: Partial<ConsultationRequest>;

  try {
    payload = (await request.json()) as Partial<ConsultationRequest>;
  } catch {
    return json({ ok: false, message: "طلب غير صالح." }, 400);
  }

  const fieldErrors = validateConsultationRequest(payload);
  if (!isValid(fieldErrors)) {
    return json({ ok: false, message: "يرجى تصحيح الحقول المميزة.", fieldErrors }, 422);
  }

  const consultation: ConsultationRequest = {
    name: payload.name!.trim(),
    phone: payload.phone!.trim(),
    email: payload.email?.trim() || undefined,
    consultationType: payload.consultationType!.trim(),
    details: payload.details!.trim(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    console.info("[contact] consultation request received", {
      name: consultation.name,
      consultationType: consultation.consultationType,
    });
    return json({ ok: true }, 200);
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(consultation),
    });

    if (!response.ok) {
      console.error("[contact] webhook rejected the request", response.status);
      return json({ ok: false, message: "تعذّر إرسال الطلب. يرجى المحاولة عبر الواتساب." }, 502);
    }

    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[contact] webhook request failed", error);
    return json({ ok: false, message: "تعذّر إرسال الطلب. يرجى المحاولة عبر الواتساب." }, 502);
  }
}

function json(body: ContactResult, status: number): Response {
  return Response.json(body, { status });
}
