import { hex, window as validateWindow } from '../data/index.js';
import { CheckResp, IncrResp, ResetResp, Usage } from '../types/index.js';
import { Client } from '../utils/client.js';

export class UsageService {
  constructor(private client: Client) {}

  private async resolveTenant(tenant?: string): Promise<string> {
    let t = tenant ?? this.client.cachedTenant;
    if (!t) {
      const id = await this.client.whoami();
      t = id.tenant;
    }
    return hex(t, 'tenant');
  }

  async incr(data: { tenant?: string; metric: string; by?: number }): Promise<IncrResp> {
    const tenant = await this.resolveTenant(data.tenant);
    const payload = {
      tenant,
      metric: data.metric,
      by: data.by ?? 1,
    };
    return this.client.call<typeof payload, IncrResp>('hermes.usage', 'UsageService', 'Increment', payload);
  }

  async check(data: { tenant?: string; metric: string }): Promise<CheckResp> {
    const tenant = await this.resolveTenant(data.tenant);
    const payload = {
      tenant,
      metric: data.metric,
    };
    return this.client.call<typeof payload, CheckResp>('hermes.usage', 'UsageService', 'Check', payload);
  }

  async get(data: { tenant?: string; metric: string; window: string }): Promise<Usage> {
    const tenant = await this.resolveTenant(data.tenant);
    const payload = {
      tenant,
      metric: data.metric,
      window: validateWindow(data.window, 'window'),
    };
    return this.client.call<typeof payload, Usage>('hermes.usage', 'UsageService', 'Get', payload);
  }

  async reset(data: { tenant?: string; metric: string; window: string }): Promise<ResetResp> {
    const tenant = await this.resolveTenant(data.tenant);
    const payload = {
      tenant,
      metric: data.metric,
      window: validateWindow(data.window, 'window'),
    };
    return this.client.call<typeof payload, ResetResp>('hermes.usage', 'UsageService', 'Reset', payload);
  }
}
