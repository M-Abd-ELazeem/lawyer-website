/**
 * Format an ISO date for display.
 *
 * Pinned to UTC and Latin digits: a date-only ISO string parses as UTC
 * midnight, so formatting in the server's local zone could render the
 * previous day, and the rest of the site uses Latin numerals throughout.
 */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ar-AE-u-nu-latn", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
