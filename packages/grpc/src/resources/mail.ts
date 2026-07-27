import type { GrpcTransport } from '../transport.js';
import type {
  Flag,
  ListMailboxesResp,
  ListMessagesResp,
  Mailbox,
  Message,
  MoveResp,
  SendResp,
} from '../generated/mail.js';

/** MailService — types generated from `proto/mail.proto`. */
export class MailResource {
  constructor(private readonly transport: GrpcTransport) {}

  async listMailboxes(): Promise<ListMailboxesResp> {
    const tenant = await this.transport.requireTenant();
    const owner = await this.transport.requireUser();
    return this.transport.unary(this.transport.mail.listMailboxes.bind(this.transport.mail), {
      tenant,
      owner,
    });
  }

  listMessages(data: {
    mailbox: string;
    cursor?: string;
    limit?: number;
  }): Promise<ListMessagesResp> {
    return this.transport.unary(this.transport.mail.listMessages.bind(this.transport.mail), {
      mailbox: data.mailbox,
      cursor: data.cursor ?? '',
      limit: data.limit ?? 50,
    });
  }

  retrieve(hex: string): Promise<Message> {
    return this.transport.unary(this.transport.mail.getMessage.bind(this.transport.mail), { hex });
  }

  async send(data: { from: string; to: string[]; raw: Uint8Array }): Promise<SendResp> {
    const tenant = await this.transport.requireTenant();
    return this.transport.unary(this.transport.mail.send.bind(this.transport.mail), {
      tenant,
      from: data.from,
      to: data.to,
      raw: Buffer.from(data.raw),
    });
  }

  move(data: { hex: string; dest: string }): Promise<MoveResp> {
    return this.transport.unary(this.transport.mail.move.bind(this.transport.mail), data);
  }

  setFlags(data: { hex: string; add?: Flag[]; remove?: Flag[] }): Promise<void> {
    return this.transport
      .unary(this.transport.mail.setFlags.bind(this.transport.mail), {
        hex: data.hex,
        add: data.add ?? [],
        remove: data.remove ?? [],
      })
      .then(() => undefined);
  }

  expunge(data: { mailbox: string; uids: number[] }): Promise<{ expunged: number[] }> {
    return this.transport.unary(this.transport.mail.expunge.bind(this.transport.mail), data);
  }

  async createMailbox(data: { name: string; role?: string }): Promise<Mailbox> {
    const tenant = await this.transport.requireTenant();
    const owner = await this.transport.requireUser();
    return this.transport.unary(this.transport.mail.createMailbox.bind(this.transport.mail), {
      tenant,
      owner,
      name: data.name,
      role: data.role ?? '',
    });
  }

  deleteMailbox(hex: string): Promise<void> {
    return this.transport
      .unary(this.transport.mail.deleteMailbox.bind(this.transport.mail), { hex })
      .then(() => undefined);
  }

  updateMailbox(data: { hex: string; name?: string; role?: string }): Promise<Mailbox> {
    return this.transport.unary(this.transport.mail.updateMailbox.bind(this.transport.mail), {
      hex: data.hex,
      name: data.name ?? '',
      role: data.role ?? '',
    });
  }
}
