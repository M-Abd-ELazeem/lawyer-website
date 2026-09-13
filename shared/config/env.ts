/**
 * Environment access in one place, so a missing variable surfaces here
 * rather than as a confusing failure deep in a request.
 *
 * Nothing is required yet: the content layer serves local seed data until
 * a CMS is connected. Add required vars to `assertEnv` as they become real.
 */
export const env = {
  /** Base URL of the CMS / backend. When unset, getters fall back to seed data. */
  apiBaseUrl: process.env.API_BASE_URL,
  /** Public site origin, used for metadata and absolute URLs. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahmoud-hassan.ae",
  /** Where consultation requests are forwarded. When unset, the route logs them. */
  contactWebhookUrl: process.env.CONTACT_WEBHOOK_URL,
} as const;

/** True once a real backend is configured. */
export const hasApi = Boolean(env.apiBaseUrl);
