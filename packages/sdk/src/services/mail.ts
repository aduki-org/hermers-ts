import { Client } from '../utils/client.js';
import { Mailbox, Message, MessageDetail, Page, Thread } from '../types/index.js';

export class Mail {
  constructor(private client: Client) {}

  async send(data: { from: string; to: string; subject: string; text: string }): Promise<{ hex: string }> {
    return this.client.post<{ hex: string }>('/user/mail/send', data);
  }

  async inbox(query?: { after?: string; limit?: number }): Promise<Page<Message>> {
    return this.client.get<Page<Message>>('/user/mail/inbox', { query });
  }

  async unread(query?: { after?: string; limit?: number }): Promise<Page<Message>> {
    return this.client.get<Page<Message>>('/user/mail/inbox/unread', { query });
  }

  async flagged(query?: { after?: string; limit?: number }): Promise<Page<Message>> {
    return this.client.get<Page<Message>>('/user/mail/inbox/flagged', { query });
  }

  async attachments(query?: { after?: string; limit?: number }): Promise<Page<Message>> {
    return this.client.get<Page<Message>>('/user/mail/inbox/attachments', { query });
  }

  async sender(sender: string, query?: { after?: string; limit?: number }): Promise<Page<Message>> {
    return this.client.get<Page<Message>>(`/user/mail/inbox/sender/${sender}`, { query });
  }

  async sent(query?: { after?: string; limit?: number }): Promise<Page<Message>> {
    return this.client.get<Page<Message>>('/user/mail/sent', { query });
  }

  async recipient(recipient: string, query?: { after?: string; limit?: number }): Promise<Page<Message>> {
    return this.client.get<Page<Message>>(`/user/mail/sent/recipient/${recipient}`, { query });
  }

  async draft(query?: { after?: string; limit?: number }): Promise<Page<Message>> {
    return this.client.get<Page<Message>>('/user/mail/draft', { query });
  }

  async trash(query?: { after?: string; limit?: number }): Promise<Page<Message>> {
    return this.client.get<Page<Message>>('/user/mail/trash', { query });
  }

  async starred(query?: { after?: string; limit?: number }): Promise<Page<Message>> {
    return this.client.get<Page<Message>>('/user/mail/starred', { query });
  }

  async spam(query?: { after?: string; limit?: number }): Promise<Page<Message>> {
    return this.client.get<Page<Message>>('/user/mail/spam', { query });
  }

  async scored(score: number): Promise<Page<Message>> {
    return this.client.get<Page<Message>>(`/user/mail/spam/scored/${score}`);
  }

  async folder(folder: string, query?: { after?: string; limit?: number }): Promise<Page<Message>> {
    return this.client.get<Page<Message>>(`/user/mail/folder/${folder}`, { query });
  }

  async folderunread(folder: string): Promise<Page<Message>> {
    return this.client.get<Page<Message>>(`/user/mail/folder/${folder}/unread`);
  }

  async folderflagged(folder: string): Promise<Page<Message>> {
    return this.client.get<Page<Message>>(`/user/mail/folder/${folder}/flagged`);
  }

  async search(q: string): Promise<Page<Message>> {
    return this.client.get<Page<Message>>(`/user/mail/search/${q}`);
  }

  async advanced(q: string, data: { mailbox?: string; sender?: string }): Promise<Page<Message>> {
    return this.client.post<Page<Message>>(`/user/mail/search/${q}/advanced`, data);
  }

  async threads(query?: { after?: string; limit?: number }): Promise<Page<Thread>> {
    return this.client.get<Page<Thread>>('/user/mail/threads', { query });
  }

  async thread(thread: string): Promise<Page<Message>> {
    return this.client.get<Page<Message>>(`/user/mail/thread/${thread}`);
  }

  async get(hex: string): Promise<MessageDetail> {
    return this.client.get<MessageDetail>(`/user/mail/${hex}`);
  }

  async remove(hex: string): Promise<void> {
    return this.client.remove<void>(`/user/mail/${hex}`);
  }

  async clear(mailbox: string): Promise<void> {
    return this.client.remove<void>(`/user/mail/mailbox/${mailbox}`);
  }

  async flags(hex: string, data: { add?: string[]; remove?: string[] }): Promise<void> {
    return this.client.patch<void>(`/user/mail/${hex}/flags`, data);
  }

  // Mailbox
  async create(data: Record<string, unknown>): Promise<Mailbox> {
    return this.client.post<Mailbox>('/user/mailbox', data);
  }

  async mailboxes(query?: { after?: string; limit?: number }): Promise<Page<Mailbox>> {
    return this.client.get<Page<Mailbox>>('/user/mailbox', { query });
  }

  async unreadmailboxes(): Promise<Page<Mailbox>> {
    return this.client.get<Page<Mailbox>>('/user/mailbox/unread');
  }

  async emptymailboxes(): Promise<Page<Mailbox>> {
    return this.client.get<Page<Mailbox>>('/user/mailbox/empty');
  }

  async namemailbox(name: string): Promise<Page<Mailbox>> {
    return this.client.get<Page<Mailbox>>(`/user/mailbox/name/${name}`);
  }

  async messages(mailbox: string): Promise<Page<Mailbox>> {
    return this.client.get<Page<Mailbox>>(`/user/mailbox/messages/${mailbox}`);
  }

  async searchmailbox(q: string): Promise<Page<Mailbox>> {
    return this.client.get<Page<Mailbox>>(`/user/mailbox/search/${q}`);
  }

  async basic(hex: string, data: Record<string, unknown>): Promise<Mailbox> {
    return this.client.patch<Mailbox>(`/user/mailbox/${hex}/basic`, data);
  }

  async role(hex: string, role: string): Promise<Mailbox> {
    return this.client.patch<Mailbox>(`/user/mailbox/${hex}/role`, { role });
  }

  async rename(hex: string, name: string): Promise<Mailbox> {
    return this.client.patch<Mailbox>(`/user/mailbox/${hex}/name`, { name });
  }

  async uidnext(hex: string, uidnext: number): Promise<Mailbox> {
    return this.client.patch<Mailbox>(`/user/mailbox/${hex}/uidnext`, { uidnext });
  }

  async setflags(hex: string, flags: string[]): Promise<Mailbox> {
    return this.client.patch<Mailbox>(`/user/mailbox/${hex}/flags`, { flags });
  }

  async subscribed(hex: string, subscribed: boolean): Promise<Mailbox> {
    return this.client.patch<Mailbox>(`/user/mailbox/${hex}/subscribed`, { subscribed });
  }

  async parent(hex: string, parent: string): Promise<Mailbox> {
    return this.client.patch<Mailbox>(`/user/mailbox/${hex}/parent`, { parent });
  }

  async quota(hex: string, quota: number): Promise<Mailbox> {
    return this.client.patch<Mailbox>(`/user/mailbox/${hex}/quota`, { quota });
  }

  async acl(hex: string, acl: Record<string, unknown>): Promise<Mailbox> {
    return this.client.patch<Mailbox>(`/user/mailbox/${hex}/acl`, { acl });
  }

  async meta(hex: string, meta: Record<string, unknown>): Promise<Mailbox> {
    return this.client.patch<Mailbox>(`/user/mailbox/${hex}/meta`, { meta });
  }

  async removemailbox(hex: string): Promise<void> {
    return this.client.remove<void>(`/user/mailbox/${hex}`);
  }
}
