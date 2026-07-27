import type { GrpcTransport } from '../transport.js';
import type { StatusResp } from '../generated/security.js';

/** SecurityService — types generated from `proto/security.proto`. */
export class SecurityResource {
  constructor(private readonly transport: GrpcTransport) {}

  status(): Promise<StatusResp> {
    return this.transport.unary(this.transport.security.status.bind(this.transport.security), {});
  }
}
