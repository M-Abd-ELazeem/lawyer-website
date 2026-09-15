export type { ConsultationRequest, ContactResult } from "./model/types";
export { buildConsultationMessage } from "./lib/build-message";
export { ConsultationForm } from "./ui/ConsultationForm";
export { validateConsultationRequest, isValid } from "./model/schema";
export type { FieldErrors } from "./model/schema";
