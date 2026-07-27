import type { HttpClient } from '../http/client.js';
import type { Contact, ContactCreate, ContactModel, ListQuery, Page } from '../types/index.js';

/** CardDAV contacts (`/user/contacts`). REST shapes — not the gRPC Contact message. */
export class ContactsResource {
  constructor(private readonly http: HttpClient) {}

  /** Creates a contact. API requires `name` + `vcard`; returns full Contact model. */
  create(data: ContactCreate): Promise<ContactModel> {
    return this.http.post<ContactModel>('/user/contacts', {
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

  /** PATCH returns JSON `null`. */
  updateVcard(hex: string, vcard: string, name?: string): Promise<null> {
    return this.http.patch<null>(`/user/contacts/${hex}/vcard`, { vcard, name });
  }

  updateEmails(hex: string, emails: string[]): Promise<null> {
    return this.http.patch<null>(`/user/contacts/${hex}/emails`, { emails });
  }

  updatePhones(hex: string, phones: string[]): Promise<null> {
    return this.http.patch<null>(`/user/contacts/${hex}/phones`, { phones });
  }

  updateGroups(hex: string, groups: string[]): Promise<null> {
    return this.http.patch<null>(`/user/contacts/${hex}/groups`, { groups });
  }

  updateMeta(hex: string, meta: Record<string, unknown>): Promise<null> {
    return this.http.patch<null>(`/user/contacts/${hex}/meta`, { meta });
  }

  del(hex: string): Promise<null> {
    return this.http.delete<null>(`/user/contacts/${hex}`);
  }
}
