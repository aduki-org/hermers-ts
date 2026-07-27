import type { GrpcTransport } from '../transport.js';
import type { Session } from '../generated/session.js';

/**
 * Session helpers for API-key clients.
 * Login / password / refresh JWT flows are intentionally omitted.
 * Proto `Session` differs from REST whoami (timestamps; no always-empty ip/agent guarantee).
 */
export class SessionResource {
  constructor(private readonly transport: GrpcTransport) {}

  /** Identity of the current API key (uses cached whoami). */
  whoami(): Promise<Session> {
    return this.transport.whoami().then((id) => {
      if (id.raw) return id.raw;
      return this.transport.unary(this.transport.session.whoami.bind(this.transport.session), {
        token: '',
      });
    });
  }

  load(jti: string): Promise<Session> {
    return this.transport.unary(this.transport.session.load.bind(this.transport.session), { jti });
  }

  revoke(jti: string): Promise<void> {
    return this.transport
      .unary(this.transport.session.revoke.bind(this.transport.session), { jti })
      .then(() => undefined);
  }

  async list(data?: {
    page?: number;
    limit?: number;
    after?: string;
  }): Promise<{ items: Session[]; total: number; page: number; pages: number }> {
    const user = await this.transport.requireUser();
    return this.transport.unary(this.transport.session.list.bind(this.transport.session), {
      user,
      page: data?.page ?? 1,
      limit: data?.limit ?? 50,
      after: data?.after ?? '',
    });
  }
}
