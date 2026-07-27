import type { GrpcTransport } from '../transport.js';
import type { ContactSyncResp, MailboxSyncResp } from '../generated/sync.js';

/** SyncService — types generated from `proto/sync.proto`. */
export class SyncResource {
  constructor(private readonly transport: GrpcTransport) {}

  async contacts(data: { since: Date }): Promise<ContactSyncResp> {
    const tenant = await this.transport.requireTenant();
    return this.transport.unary(this.transport.sync.contacts.bind(this.transport.sync), {
      tenant,
      since: data.since,
    });
  }

  mailboxes(data: {
    mailbox: string;
    knownUidvalidity?: number;
    knownModseq?: number;
  }): Promise<MailboxSyncResp> {
    return this.transport.unary(this.transport.sync.mailboxes.bind(this.transport.sync), {
      mailbox: data.mailbox,
      knownUidvalidity: data.knownUidvalidity ?? 0,
      knownModseq: data.knownModseq ?? 0,
    });
  }
}
