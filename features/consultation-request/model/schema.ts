import type { ConsultationRequest } from "./types";

export type FieldErrors = Partial<Record<keyof ConsultationRequest, string>>;

/** Loose enough for international formats, strict enough to catch typos. */
const PHONE = /^[+()\d][\d\s()-]{6,19}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates a consultation request.
 *
 * Deliberately dependency-free and shared by the client and the route
 * handler, so the browser and the server can never disagree about what
 * counts as valid.
 */
export function validateConsultationRequest(input: Partial<ConsultationRequest>): FieldErrors {
  const errors: FieldErrors = {};

  const name = input.name?.trim() ?? "";
  if (name.length < 2) errors.name = "يرجى إدخال الاسم الكامل.";

  const phone = input.phone?.trim() ?? "";
  if (!phone) errors.phone = "يرجى إدخال رقم الهاتف.";
  else if (!PHONE.test(phone)) errors.phone = "رقم الهاتف غير صالح.";

  const email = input.email?.trim() ?? "";
  if (email && !EMAIL.test(email)) errors.email = "البريد الإلكتروني غير صالح.";

  if (!input.consultationType?.trim()) errors.consultationType = "يرجى اختيار نوع الاستشارة.";

  const details = input.details?.trim() ?? "";
  if (details.length < 10) errors.details = "يرجى إضافة تفاصيل كافية عن القضية (10 أحرف على الأقل).";

  return errors;
}

export function isValid(errors: FieldErrors): boolean {
  return Object.keys(errors).length === 0;
}
