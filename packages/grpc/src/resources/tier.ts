import type { GrpcTransport } from '../transport.js';
import type { ChangeResp, Plan, TierInfo } from '../generated/tier.js';

/** TierService — types generated from `proto/tier.proto`. */
export class TierResource {
  constructor(private readonly transport: GrpcTransport) {}

  async resolve(): Promise<TierInfo> {
    const tenant = await this.transport.requireTenant();
    return this.transport.unary(this.transport.tier.resolve.bind(this.transport.tier), {
      tenant,
    });
  }

  async change(data: { plan: Plan; paymentMethod?: string }): Promise<ChangeResp> {
    const tenant = await this.transport.requireTenant();
    return this.transport.unary(this.transport.tier.change.bind(this.transport.tier), {
      tenant,
      plan: data.plan,
      paymentMethod: data.paymentMethod ?? '',
    });
  }
}
