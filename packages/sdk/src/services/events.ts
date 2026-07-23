import { Client } from '../utils/client.js';
import { Event, Page } from '../types/index.js';

export class Events {
  constructor(private client: Client) {}

  async list(query?: { after?: string; limit?: number }): Promise<Page<Event>> {
    return this.client.get<Page<Event>>('/user/events', { query });
  }

  async range(start: string, end: string): Promise<Page<Event>> {
    return this.client.get<Page<Event>>(`/user/events/range/${start}/${end}`);
  }

  async recurring(): Promise<Page<Event>> {
    return this.client.get<Page<Event>>('/user/events/recurring');
  }

  async search(q: string): Promise<Page<Event>> {
    return this.client.get<Page<Event>>(`/user/events/search/${q}`);
  }

  async upcoming(): Promise<Page<Event>> {
    return this.client.get<Page<Event>>('/user/events/upcoming');
  }

  async past(): Promise<Page<Event>> {
    return this.client.get<Page<Event>>('/user/events/past');
  }

  async create(data: {
    calendar: string;
    uid: string;
    ical: string;
    href?: string;
    start?: string;
    end?: string;
    summary?: string;
    description?: string;
    location?: string;
    attendees?: string[];
    recurring?: boolean;
    kind?: string;
    rrule?: string;
    timezone?: string;
  }): Promise<{ hex: string; etag: string; uid: string }> {
    return this.client.post('/user/events', data);
  }

  async update(hex: string, data: {
    ical?: string;
    summary?: string;
    description?: string;
    location?: string;
  }): Promise<{ hex: string; etag: string; uid: string }> {
    return this.client.patch(`/user/events/${hex}`, data);
  }

  async remove(hex: string): Promise<void> {
    return this.client.remove<void>(`/user/events/${hex}`);
  }
}
