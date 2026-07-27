import type { GrpcTransport } from '../transport.js';
import type { CheckResp, IncrResp, Usage } from '../generated/usage.js';

/** Usageervice — types generated from `proto/usage.proto` (service name as in proto). */
export class UsageResource {
  constructor(private readonly transport: GrpcTransport) {}

  async increment(data: { metric: string; by?: number }): Promise<IncrResp> {
    const tenant = await this.transport.requireTenant();
    return this.transport.unary(this.transport.usage.increment.bind(this.transport.usage), {
      tenant,
      metric: data.metric,
      by: data.by ?? 1,
    });
  }

  async check(data: { metric: string }): Promise<CheckResp> {
    const tenant = await this.transport.requireTenant();
    return this.transport.unary(this.transport.usage.check.bind(this.transport.usage), {
      tenant,
      metric: data.metric,
    });
  }

  async get(data: { metric: string; window: string }): Promise<Usage> {
    const tenant = await this.transport.requireTenant();
    return this.transport.unary(this.transport.usage.get.bind(this.transport.usage), {
      tenant,
      metric: data.metric,
      window: data.window,
    });
  }

  async reset(data: { metric: string; window: string }): Promise<void> {
    const tenant = await this.transport.requireTenant();
    await this.transport.unary(this.transport.usage.reset.bind(this.transport.usage), {
      tenant,
      metric: data.metric,
      window: data.window,
    });
  }
}
