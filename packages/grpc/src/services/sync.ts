import { Client } from '../utils/client.js';
import { hex as validateHex, timestamp as validateTimestamp } from '../data/index.js';

export class SyncService {
  constructor(private client: Client) {}

  async contacts(data: { tenant?: string; since: string }): Promise<{ changed: string[]; removed: string[]; ctag: string }> {
    const t = await this.client.resolveTenant(data.tenant);
    if (t) validateHex(t, 'tenant');
    const sinceTs = validateTimestamp(data.since, 'since');
    return this.client.call('hermes.sync', 'SyncService', 'Contacts', { ...data, tenant: t, since: sinceTs });
  }

  async mailboxes(data: { mailbox: string; known_uidvalidity: number; known_modseq: number }): Promise<{
    new_uids: number[];
    changed_uids: number[];
    removed_uids: number[];
    modseq: number;
    uidvalidity: number;
  }> {
    validateHex(data.mailbox, 'mailbox');
    return this.client.call('hermes.sync', 'SyncService', 'Mailboxes', data);
  }
}
