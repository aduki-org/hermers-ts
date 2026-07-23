import { Client } from '../utils/client.js';
import { hex as validateHex } from '../data/index.js';
import { Plan, TierInfo } from '../types/index.js';

export class TierService {
  constructor(private client: Client) {}

  async resolve(tenant?: string): Promise<TierInfo> {
    const t = await this.client.resolveTenant(tenant);
    if (t) validateHex(t, 'tenant');
    return this.client.call('hermes.tier', 'TierService', 'Resolve', { tenant: t });
  }

  async change(data: { tenant?: string; plan: Plan; payment_method?: string }): Promise<{ info: TierInfo }> {
    const t = await this.client.resolveTenant(data.tenant);
    if (t) validateHex(t, 'tenant');
    return this.client.call('hermes.tier', 'TierService', 'Change', { ...data, tenant: t });
  }
}
