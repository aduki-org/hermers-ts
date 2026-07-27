import type { HttpClient } from '../http/client.js';
import type {
  ListQuery,
  Mailbox,
  MailboxCreate,
  MailboxModel,
  MailboxUpdate,
  Message,
  Page,
  Thread,
} from '../types/index.js';

/**
 * Mail + mailbox endpoints under `/user/mail` and `/user/mailbox`.
 * REST list rows use `internaldate` and `mailbox: { hex, name }` — not gRPC Message.
 * There is no `GET /user/mail/{hex}` on the HTTP API (gRPC has GetMessage).
 */
export class MailResource {
  constructor(private readonly http: HttpClient) {}

  send(data: { from: string; to: string; subject: string; text: string }): Promise<{ hex: string }> {
    return this.http.post<{ hex: string }>('/user/mail/send', data);
  }

  inbox(query?: ListQuery): Promise<Page<Message>> {
    return this.http.get<Page<Message>>('/user/mail/inbox', { query });
  }

  unread(query?: ListQuery): Promise<Page<Message>> {
    return this.http.get<Page<Message>>('/user/mail/inbox/unread', { query });
  }

  flagged(query?: ListQuery): Promise<Page<Message>> {
    return this.http.get<Page<Message>>('/user/mail/inbox/flagged', { query });
  }

  attachments(query?: ListQuery): Promise<Page<Message>> {
    return this.http.get<Page<Message>>('/user/mail/inbox/attachments', { query });
  }

  bySender(sender: string, query?: ListQuery): Promise<Page<Message>> {
    return this.http.get<Page<Message>>(`/user/mail/inbox/sender/${encodeURIComponent(sender)}`, {
      query,
    });
  }

  sent(query?: ListQuery): Promise<Page<Message>> {
    return this.http.get<Page<Message>>('/user/mail/sent', { query });
  }

  byRecipient(recipient: string, query?: ListQuery): Promise<Page<Message>> {
    return this.http.get<Page<Message>>(
      `/user/mail/sent/recipient/${encodeURIComponent(recipient)}`,
      { query }
    );
  }

  drafts(query?: ListQuery): Promise<Page<Message>> {
    return this.http.get<Page<Message>>('/user/mail/draft', { query });
  }

  trash(query?: ListQuery): Promise<Page<Message>> {
    return this.http.get<Page<Message>>('/user/mail/trash', { query });
  }

  starred(query?: ListQuery): Promise<Page<Message>> {
    return this.http.get<Page<Message>>('/user/mail/starred', { query });
  }

  spam(query?: ListQuery): Promise<Page<Message>> {
    return this.http.get<Page<Message>>('/user/mail/spam', { query });
  }

  scored(score: number): Promise<Page<Message>> {
    return this.http.get<Page<Message>>(`/user/mail/spam/scored/${score}`);
  }

  folder(folder: string, query?: ListQuery): Promise<Page<Message>> {
    return this.http.get<Page<Message>>(`/user/mail/folder/${encodeURIComponent(folder)}`, {
      query,
    });
  }

  search(q: string): Promise<Page<Message>> {
    return this.http.get<Page<Message>>(`/user/mail/search/${encodeURIComponent(q)}`);
  }

  searchAdvanced(
    q: string,
    data: { mailbox?: string; sender?: string }
  ): Promise<Page<Message>> {
    return this.http.post<Page<Message>>(`/user/mail/search/${encodeURIComponent(q)}/advanced`, data);
  }

  threads(query?: ListQuery): Promise<Page<Thread>> {
    return this.http.get<Page<Thread>>('/user/mail/threads', { query });
  }

  thread(thread: string): Promise<Page<Message>> {
    return this.http.get<Page<Message>>(`/user/mail/thread/${thread}`);
  }

  del(hex: string): Promise<null> {
    return this.http.delete<null>(`/user/mail/${hex}`);
  }

  clearMailbox(mailbox: string): Promise<null> {
    return this.http.delete<null>(`/user/mail/mailbox/${mailbox}`);
  }

  updateFlags(hex: string, data: { add?: string[]; remove?: string[] }): Promise<null> {
    return this.http.patch<null>(`/user/mail/${hex}/flags`, data);
  }

  // —— Mailboxes ——

  createMailbox(data: MailboxCreate): Promise<MailboxModel> {
    return this.http.post<MailboxModel>('/user/mailbox', data);
  }

  listMailboxes(query?: ListQuery): Promise<Page<Mailbox>> {
    return this.http.get<Page<Mailbox>>('/user/mailbox', { query });
  }

  unreadMailboxes(): Promise<Page<Mailbox>> {
    return this.http.get<Page<Mailbox>>('/user/mailbox/unread');
  }

  emptyMailboxes(): Promise<Page<Mailbox>> {
    return this.http.get<Page<Mailbox>>('/user/mailbox/empty');
  }

  mailboxByName(name: string): Promise<Page<Mailbox>> {
    return this.http.get<Page<Mailbox>>(`/user/mailbox/name/${encodeURIComponent(name)}`);
  }

  searchMailboxes(q: string): Promise<Page<Mailbox>> {
    return this.http.get<Page<Mailbox>>(`/user/mailbox/search/${encodeURIComponent(q)}`);
  }

  updateMailbox(hex: string, data: MailboxUpdate): Promise<MailboxModel> {
    return this.http.patch<MailboxModel>(`/user/mailbox/${hex}/basic`, data);
  }

  renameMailbox(hex: string, name: string): Promise<MailboxModel> {
    return this.http.patch<MailboxModel>(`/user/mailbox/${hex}/name`, { name });
  }

  deleteMailbox(hex: string): Promise<null> {
    return this.http.delete<null>(`/user/mailbox/${hex}`);
  }
}
