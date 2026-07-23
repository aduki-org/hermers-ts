import { Client } from '../utils/client.js';
import { bytes as validateBytes, hex as validateHex, limit as validateLimit } from '../data/index.js';
import { Flag, Mailbox, Message } from '../types/index.js';

export class MailService {
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

  async listMailboxes(data?: { tenant?: string; owner?: string }): Promise<{ items: Mailbox[] }> {
    const { tenant, owner } = await this.resolveTenantAndUser(data?.tenant, data?.owner);
    return this.client.call('hermes.mail', 'MailService', 'ListMailboxes', { tenant, owner });
  }

  async listMessages(data: { mailbox: string; cursor?: string; limit?: number }): Promise<{ items: Message[]; next: string }> {
    validateHex(data.mailbox, 'mailbox');
    const lim = validateLimit(data.limit);
    return this.client.call('hermes.mail', 'MailService', 'ListMessages', { ...data, limit: lim });
  }

  async getMessage(hex: string): Promise<Message> {
    validateHex(hex, 'hex');
    return this.client.call('hermes.mail', 'MailService', 'GetMessage', { hex });
  }

  async send(data: { tenant?: string; from: string; to: string[]; raw: Uint8Array | string }): Promise<{ hex: string }> {
    const { tenant } = await this.resolveTenantAndUser(data.tenant);
    const rawBytes = validateBytes(data.raw, 'raw');
    return this.client.call('hermes.mail', 'MailService', 'Send', { ...data, tenant, raw: Array.from(rawBytes) });
  }

  async move(data: { hex: string; dest: string }): Promise<{ hex: string; uid: number }> {
    validateHex(data.hex, 'hex');
    validateHex(data.dest, 'dest');
    return this.client.call('hermes.mail', 'MailService', 'Move', data);
  }

  async setFlags(data: { hex: string; add: Flag[]; remove: Flag[] }): Promise<void> {
    validateHex(data.hex, 'hex');
    return this.client.call('hermes.mail', 'MailService', 'SetFlags', data);
  }

  async expunge(data: { mailbox: string; uids: number[] }): Promise<void> {
    validateHex(data.mailbox, 'mailbox');
    return this.client.call('hermes.mail', 'MailService', 'Expunge', data);
  }

  async createMailbox(data: { tenant?: string; owner?: string; name: string; role?: string }): Promise<Mailbox> {
    const { tenant, owner } = await this.resolveTenantAndUser(data.tenant, data.owner);
    if (!data.name) {
      throw new Error("Mailbox name is required for 'createMailbox'");
    }
    return this.client.call('hermes.mail', 'MailService', 'CreateMailbox', { ...data, tenant, owner });
  }

  async deleteMailbox(hex: string): Promise<void> {
    validateHex(hex, 'hex');
    return this.client.call('hermes.mail', 'MailService', 'DeleteMailbox', { hex });
  }

  async updateMailbox(data: { hex: string; name?: string; role?: string }): Promise<Mailbox> {
    validateHex(data.hex, 'hex');
    return this.client.call('hermes.mail', 'MailService', 'UpdateMailbox', data);
  }
}
