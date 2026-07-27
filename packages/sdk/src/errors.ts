/** Structured API error matching Hermes flat `{ error, message }` envelopes. */
export class HermesError extends Error {
  readonly status: number;
  readonly code: string;
  readonly body?: unknown;

  constructor(opts: {
    message: string;
    status: number;
    code?: string;
    body?: unknown;
  }) {
    super(opts.message);
    this.name = 'HermesError';
    this.status = opts.status;
    this.code = opts.code ?? 'unknown_error';
    this.body = opts.body;
  }

  /**
   * Parse API crate errors: `{ "error": "forbidden", "message": "…" }`.
   * Also tolerates a nested `{ error: { code, message } }` if seen historically.
   */
  static fromResponse(status: number, statusText: string, body: unknown): HermesError {
    const fallback = statusText || `HTTP ${status}`;
    if (body && typeof body === 'object' && 'error' in body) {
      const envelope = body as { error?: unknown; message?: unknown };
      const raw = envelope.error;
      const topMessage =
        typeof envelope.message === 'string' && envelope.message ? envelope.message : undefined;

      if (typeof raw === 'string') {
        return new HermesError({
          message: topMessage ?? fallback,
          status,
          code: raw,
          body,
        });
      }

      if (raw && typeof raw === 'object') {
        const err = raw as Record<string, unknown>;
        return new HermesError({
          message:
            (typeof err.message === 'string' && err.message) || topMessage || fallback,
          status,
          code: typeof err.code === 'string' ? err.code : 'http_error',
          body,
        });
      }
    }
    return new HermesError({
      message: typeof body === 'string' && body ? body : fallback,
      status,
      code: 'http_error',
      body,
    });
  }
}
