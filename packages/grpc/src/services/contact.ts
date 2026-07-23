import { Client } from '../utils/client.js';
import { hex as validateHex, limit as validateLimit, timestamp as validateTimestamp } from '../data/index.js';
import { Contact } from '../types/index.js';

export class ContactService {
  constructor(private client: Client) {}

  private async resolveTenantAndUser(tenant?: string, owner?: string): Promise<{ tenant: string; owner: string }> {
    let t = tenant ?? this.client.cachedTenant;
    let u = owner ?? this.client.cachedUser;

    if (!t || !u) {
      const id = await this.client.whoami();
      if (!t && id.tenant) t = id.tenant;
      if (!u && id.user) u = id.user;
    }

    return {
      tenant: validateHex(t ?? 'T0X000000000', 'tenant'),
      owner: validateHex(u ?? 'U0X000000000', 'owner'),
    };
  }

  async list(data?: { tenant?: string; cursor?: string; limit?: number }): Promise<{ items: Contact[]; next: string }> {
    const { tenant } = await this.resolveTenantAndUser(data?.tenant);
    const lim = validateLimit(data?.limit);
    return this.client.call('hermes.contact', 'ContactService', 'List', { ...data, tenant, limit: lim });
  }

  async get(hex: string): Promise<Contact> {
    validateHex(hex, 'hex');
    return this.client.call('hermes.contact', 'ContactService', 'Get', { hex });
  }

  async create(data: { tenant?: string; owner?: string; vcard: string }): Promise<Contact> {
    const { tenant, owner } = await this.resolveTenantAndUser(data.tenant, data.owner);
    if (!data.vcard) {
      throw new Error("vCard content required for 'create'");
    }
    return this.client.call('hermes.contact', 'ContactService', 'Create', { ...data, tenant, owner });
  }

  async update(data: { hex: string; vcard: string; etag: string }): Promise<Contact> {
    validateHex(data.hex, 'hex');
    return this.client.call('hermes.contact', 'ContactService', 'Update', data);
  }

  async remove(hex: string): Promise<void> {
    validateHex(hex, 'hex');
    return this.client.call('hermes.contact', 'ContactService', 'Remove', { hex });
  }

  async sync(data: { tenant?: string; since: string }): Promise<{ changed: Contact[]; removed: string[] }> {
    const { tenant } = await this.resolveTenantAndUser(data.tenant);
    const sinceTs = validateTimestamp(data.since, 'since');
    return this.client.call('hermes.contact', 'ContactService', 'Sync', { ...data, tenant, since: sinceTs });
  }
}
