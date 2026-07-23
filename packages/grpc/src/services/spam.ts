import { Client } from '../utils/client.js';
import { bytes as validateBytes, hex as validateHex } from '../data/index.js';
import { Verdict } from '../types/index.js';

export interface Scores {
  rules: number;
  bayes: number;
  ml: number;
  reputation: number;
  composite: number;
}

export class SpamService {
  constructor(private client: Client) {}

  async classify(data: { tenant?: string; msg: string; raw: Uint8Array | string; direction: 'inbound' | 'outbound' }): Promise<{ verdict: Verdict; scores: Scores; reason: string }> {
    const tenant = await this.client.resolveTenant(data.tenant);
    if (tenant) validateHex(tenant, 'tenant');
    const rawBytes = validateBytes(data.raw, 'raw');
    return this.client.call('hermes.spam', 'SpamService', 'Classify', { ...data, tenant, raw: Array.from(rawBytes) });
  }

  async report(data: { tenant?: string; msg: string; user?: string; verdict: Verdict; source: string }): Promise<void> {
    const tenant = await this.client.resolveTenant(data.tenant);
    const user = await this.client.resolveUser(data.user);
    if (tenant) validateHex(tenant, 'tenant');
    if (user) validateHex(user, 'user');
    return this.client.call('hermes.spam', 'SpamService', 'Report', { ...data, tenant, user });
  }
}
