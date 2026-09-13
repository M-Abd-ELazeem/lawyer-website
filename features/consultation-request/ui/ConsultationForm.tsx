"use client";

import { useState } from "react";
import { buildWhatsAppUrl } from "@/entities/office";
import type { Service } from "@/entities/service";
import { Alert, ButtonExternalLink, Field, Input, Select, SubmitButton, Textarea } from "@/shared/ui";
import { SendIcon } from "@/shared/ui/icons";
import { submitConsultationRequest } from "../api/submit";
import { buildConsultationMessage } from "../lib/build-message";
import { isValid, validateConsultationRequest, type FieldErrors } from "../model/schema";
import type { ConsultationRequest } from "../model/types";

const EMPTY: ConsultationRequest = {
  name: "",
  phone: "",
  email: "",
  consultationType: "",
  details: "",
};

type Status = "idle" | "submitting" | "success" | "error";

type ConsultationFormProps = {
  /** Drives the consultation-type options, so values reaching the backend are clean. */
  services: Service[];
};

export function ConsultationForm({ services }: ConsultationFormProps) {
  const [values, setValues] = useState<ConsultationRequest>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const update = (field: keyof ConsultationRequest) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear a field's error as soon as the user edits it.
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const nextErrors = validateConsultationRequest(values);
    setErrors(nextErrors);
    if (!isValid(nextErrors)) {
      setStatus("error");
      setMessage("يرجى تصحيح الحقول المميزة أدناه.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    const result = await submitConsultationRequest(values);

    if (result.ok) {
      setStatus("success");
      setMessage("تم استلام طلبك بنجاح. سنعاود التواصل معك في أقرب وقت.");
      setValues(EMPTY);
    } else {
      setStatus("error");
      setMessage(result.message);
      if (result.fieldErrors) setErrors(result.fieldErrors);
    }
  }

  const pending = status === "submitting";

  return (
    <div className="bg-dark-card border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-bold text-c-white">احجز استشارة</h2>
        <p className="text-c-foreground text-xs">
          املأ النموذج وسنعاود التواصل معك، أو أرسل طلبك مباشرةً عبر الواتساب. جميع المعلومات تُعامل بسرية تامة.
        </p>
      </div>

      {status === "success" || status === "error" ? (
        <Alert tone={status === "success" ? "success" : "error"}>{message}</Alert>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="space-y-4 text-right">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field htmlFor="name" label="الاسم الكامل" error={errors.name}>
            <Input
              id="name"
              name="name"
              value={values.name}
              invalid={Boolean(errors.name)}
              onChange={(e) => update("name")(e.target.value)}
            />
          </Field>

          <Field htmlFor="phone" label="رقم الهاتف" error={errors.phone}>
            <Input
              id="phone"
              name="phone"
              type="tel"
              dir="ltr"
              value={values.phone}
              invalid={Boolean(errors.phone)}
              onChange={(e) => update("phone")(e.target.value)}
            />
          </Field>
        </div>

        <Field htmlFor="email" label="البريد الإلكتروني (اختياري)" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            value={values.email}
            invalid={Boolean(errors.email)}
            onChange={(e) => update("email")(e.target.value)}
          />
        </Field>

        <Field htmlFor="consultationType" label="نوع الاستشارة" error={errors.consultationType}>
          <Select
            id="consultationType"
            name="consultationType"
            value={values.consultationType}
            invalid={Boolean(errors.consultationType)}
            onChange={(e) => update("consultationType")(e.target.value)}
          >
            <option value="">اختر نوع الاستشارة</option>
            {services.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="أخرى">أخرى</option>
          </Select>
        </Field>

        <Field htmlFor="details" label="تفاصيل القضية" error={errors.details}>
          <Textarea
            id="details"
            name="details"
            rows={4}
            value={values.details}
            invalid={Boolean(errors.details)}
            onChange={(e) => update("details")(e.target.value)}
          />
        </Field>

        <div className="flex flex-col sm:flex-row justify-start gap-3 pt-2">
          <SubmitButton pending={pending} className="flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold">
            <span>إرسال الطلب</span>
            <SendIcon className="size-4" />
          </SubmitButton>

          {/* Kept as a secondary path so enquiries still land if the backend is down. */}
          <ButtonExternalLink
            href={buildWhatsAppUrl(buildConsultationMessage(values))}
            variant="light"
            className="flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold"
          >
            الإرسال عبر الواتساب
          </ButtonExternalLink>
        </div>
      </form>
    </div>
  );
}
