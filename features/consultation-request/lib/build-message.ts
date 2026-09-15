import type { ConsultationRequest } from "../model/types";

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
