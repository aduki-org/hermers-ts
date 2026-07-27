/** Structured API error matching Hermes `{ error: { code, message, ... } }` envelopes. */
export class HermesError extends Error {
  readonly status: number;
  readonly code: string;
  readonly field?: string;
  readonly requestId?: string;
  readonly body?: unknown;

  constructor(opts: {
    message: string;
    status: number;
    code?: string;
    field?: string;
    requestId?: string;
    body?: unknown;
  }) {
    super(opts.message);
    this.name = 'HermesError';
    this.status = opts.status;
    this.code = opts.code ?? 'unknown_error';
    this.field = opts.field;
    this.requestId = opts.requestId;
    this.body = opts.body;
  }

  static fromResponse(status: number, statusText: string, body: unknown): HermesError {
    if (body && typeof body === 'object' && 'error' in body) {
      const err = (body as { error?: Record<string, unknown> }).error ?? {};
      return new HermesError({
        message: String(err.message ?? (statusText || `HTTP ${status}`)),
        status,
        code: String(err.code ?? 'http_error'),
        field: err.field != null ? String(err.field) : undefined,
        requestId:
          err.request_id != null
            ? String(err.request_id)
            : err.request != null
              ? String(err.request)
              : undefined,
        body,
      });
    }
    return new HermesError({
      message: typeof body === 'string' && body ? body : statusText || `HTTP ${status}`,
      status,
      code: 'http_error',
      body,
    });
  }
}
