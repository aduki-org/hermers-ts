import type { HttpClient } from '../http/client.js';
import type { Contact, ContactDetail, ListQuery, Page } from '../types/index.js';

/** CardDAV contacts (`/user/contacts`). */
export class ContactsResource {
  constructor(private readonly http: HttpClient) {}

  create(data: {
    vcard: string;
    name?: string;
    emails?: string[];
    phones?: string[];
    groups?: string[];
    meta?: Record<string, unknown>;
  }): Promise<ContactDetail> {
    return this.http.post<ContactDetail>('/user/contacts', {
      ...data,
      meta: data.meta ?? {},
    });
  }

  list(query?: ListQuery): Promise<Page<Contact>> {
    return this.http.get<Page<Contact>>('/user/contacts', { query });
  }

  group(group: string): Promise<Page<Contact>> {
    return this.http.get<Page<Contact>>(`/user/contacts/group/${encodeURIComponent(group)}`);
  }

  search(q: string): Promise<Page<Contact>> {
    return this.http.get<Page<Contact>>(`/user/contacts/search/${encodeURIComponent(q)}`);
  }

  retrieve(hex: string): Promise<ContactDetail> {
    return this.http.get<ContactDetail>(`/user/contacts/${hex}`);
  }

  updateVcard(hex: string, vcard: string): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/user/contacts/${hex}/vcard`, { vcard });
  }

  updateEmails(hex: string, emails: string[]): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/user/contacts/${hex}/emails`, { emails });
  }

  updatePhones(hex: string, phones: string[]): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/user/contacts/${hex}/phones`, { phones });
  }

  updateGroups(hex: string, groups: string[]): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/user/contacts/${hex}/groups`, { groups });
  }

  updateMeta(hex: string, meta: Record<string, unknown>): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/user/contacts/${hex}/meta`, { meta });
  }

  del(hex: string): Promise<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`/user/contacts/${hex}`);
  }
}
