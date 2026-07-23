import { Client } from '../utils/client.js';

export interface SecurityStatus {
  mtasts: Array<{ domain: string; policy: string; expires: string }>;
  tlsa: Array<{ host: string; port: number; records: string; expires: string }>;
  bimi: Array<{ domain: string; location?: string; vmc?: string; expires: string }>;
  reports: Array<{ hex: string; kind: string; domain: string; period: string; received: string }>;
}

export class SecurityService {
  constructor(private client: Client) {}

  async status(): Promise<SecurityStatus> {
    return this.client.call('hermes.security', 'SecurityService', 'Status', {});
  }
}
