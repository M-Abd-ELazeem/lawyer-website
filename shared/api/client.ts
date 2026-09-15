import { env } from "@/shared/config/env";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly url: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = {
  /**
   * Seconds before the cached response is revalidated.
   *
   * Next 16 does not cache fetch by default, so caching is opt-in per call.
   * Omit for always-fresh data.
   */
  revalidate?: number;
  /** Cache tags for on-demand revalidation. */
  tags?: string[];
  signal?: AbortSignal;
};

/**
 * Thin typed wrapper around fetch for talking to the CMS / backend.
 *
 * Callers get parsed JSON or an ApiError; they never see a Response.
 */
export async function apiGet<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!env.apiBaseUrl) {
    throw new ApiError("API_BASE_URL is not configured", 500, path);
  }

  const url = `${env.apiBaseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: options.signal,
    ...(options.revalidate !== undefined || options.tags
      ? { next: { revalidate: options.revalidate, tags: options.tags } }
      : {}),
  });

  if (!response.ok) {
    throw new ApiError(`Request failed with ${response.status}`, response.status, url);
  }

  return (await response.json()) as T;
}
