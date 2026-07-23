import { Client } from '../utils/client.js';
import { Contact, ContactDetail, Page } from '../types/index.js';

export class Contacts {
  constructor(private client: Client) {}

  async create(data: {
    vcard: string;
    name?: string;
    emails?: string[];
    phones?: string[];
    groups?: string[];
  }): Promise<ContactDetail> {
    return this.client.post<ContactDetail>('/user/contacts', data);
  }

  async list(query?: { after?: string; limit?: number; group?: string; search?: string }): Promise<Page<Contact>> {
    return this.client.get<Page<Contact>>('/user/contacts', { query });
  }

  async group(group: string): Promise<Page<Contact>> {
    return this.client.get<Page<Contact>>(`/user/contacts/group/${group}`);
  }

  async search(q: string): Promise<Page<Contact>> {
    return this.client.get<Page<Contact>>(`/user/contacts/search/${q}`);
  }

  async get(hex: string): Promise<ContactDetail> {
    return this.client.get<ContactDetail>(`/user/contacts/${hex}`);
  }

  async vcard(hex: string, vcard: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/user/contacts/${hex}/vcard`, { vcard });
  }

  async emails(hex: string, emails: string[]): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/user/contacts/${hex}/emails`, { emails });
  }

  async phones(hex: string, phones: string[]): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/user/contacts/${hex}/phones`, { phones });
  }

  async groups(hex: string, groups: string[]): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/user/contacts/${hex}/groups`, { groups });
  }

  async meta(hex: string, meta: Record<string, unknown>): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/user/contacts/${hex}/meta`, { meta });
  }

  async remove(hex: string): Promise<{ ok: boolean }> {
    return this.client.remove<{ ok: boolean }>(`/user/contacts/${hex}`);
  }
}
