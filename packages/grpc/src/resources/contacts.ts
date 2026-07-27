import type { GrpcTransport } from '../transport.js';
import type { Contact, ListResp, SyncResp } from '../generated/contact.js';

/** ContactService — types generated from `proto/contact.proto`. */
export class ContactsResource {
  constructor(private readonly transport: GrpcTransport) {}

  async list(data?: { cursor?: string; limit?: number }): Promise<ListResp> {
    const tenant = await this.transport.requireTenant();
    return this.transport.unary(this.transport.contacts.list.bind(this.transport.contacts), {
      tenant,
      cursor: data?.cursor ?? '',
      limit: data?.limit ?? 50,
    });
  }

  retrieve(hex: string): Promise<Contact> {
    return this.transport.unary(this.transport.contacts.get.bind(this.transport.contacts), { hex });
  }

  async create(data: { vcard: string }): Promise<Contact> {
    const tenant = await this.transport.requireTenant();
    const owner = await this.transport.requireUser();
    return this.transport.unary(this.transport.contacts.create.bind(this.transport.contacts), {
      tenant,
      owner,
      vcard: data.vcard,
    });
  }

  update(data: { hex: string; vcard: string; etag: string }): Promise<Contact> {
    return this.transport.unary(this.transport.contacts.update.bind(this.transport.contacts), data);
  }

  del(hex: string): Promise<void> {
    return this.transport
      .unary(this.transport.contacts.remove.bind(this.transport.contacts), { hex })
      .then(() => undefined);
  }

  async sync(data: { since: Date }): Promise<SyncResp> {
    const tenant = await this.transport.requireTenant();
    return this.transport.unary(this.transport.contacts.sync.bind(this.transport.contacts), {
      tenant,
      since: data.since,
    });
  }
}
