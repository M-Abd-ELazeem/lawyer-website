import { siteConfig } from "@/config/site";
import type { ConsultationRequest } from "@/types";

/**
 * The only place that builds a wa.me URL.
 *
 * Always uses `phone.raw` (digits only) and always percent-encodes the
 * message. Hand-written versions of this got both wrong: one link contained
 * literal spaces and a "+", another emitted raw Arabic text with "%0A"
 * separators that were never encoded.
 */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.phone.raw}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Format a consultation request as the WhatsApp message body. */
export function buildConsultationMessage(request: ConsultationRequest): string {
  return [
    "*طلب استشارة جديد*",
    "",
    `*الاسم الكامل:* ${request.name}`,
    `*رقم الهاتف:* ${request.phone}`,
    `*البريد الإلكتروني:* ${request.email || "غير محدد"}`,
    `*نوع الاستشارة:* ${request.consultationType}`,
    "*تفاصيل القضية:*",
    request.details,
  ].join("\n");
}

export function telHref(): string {
  return `tel:+${siteConfig.phone.raw}`;
}

export function mailtoHref(): string {
  return `mailto:${siteConfig.email}`;
}
