/** Production REST API base (includes `/v1`). */
export const BASE_URL = 'https://hermers.aduki.pro/v1';

export interface HermesOptions {
  /**
   * Override the API base URL. Defaults to the production Hermes endpoint.
   * Use only for local/dev/test against a non-production stack.
   */
  apiBase?: string;
  /** Optional custom `fetch` implementation (tests / edge runtimes). */
  fetch?: typeof globalThis.fetch;
}
