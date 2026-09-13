/** The consultation request payload submitted by the contact form. */
export type ConsultationRequest = {
  name: string;
  phone: string;
  email?: string;
  consultationType: string;
  details: string;
};

/** Result returned by the contact API, shared by client and server. */
export type ContactResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Partial<Record<keyof ConsultationRequest, string>> };
