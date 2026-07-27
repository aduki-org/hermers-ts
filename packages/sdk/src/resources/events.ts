import type { HttpClient } from '../http/client.js';
import type { Event, ListQuery, Page } from '../types/index.js';

export class EventsResource {
  constructor(private readonly http: HttpClient) {}

  list(query?: ListQuery): Promise<Page<Event>> {
    return this.http.get<Page<Event>>('/user/events', { query });
  }

  range(start: string, end: string): Promise<Page<Event>> {
    return this.http.get<Page<Event>>(`/user/events/range/${start}/${end}`);
  }

  recurring(): Promise<Page<Event>> {
    return this.http.get<Page<Event>>('/user/events/recurring');
  }

  search(q: string): Promise<Page<Event>> {
    return this.http.get<Page<Event>>(`/user/events/search/${encodeURIComponent(q)}`);
  }

  upcoming(): Promise<Page<Event>> {
    return this.http.get<Page<Event>>('/user/events/upcoming');
  }

  past(): Promise<Page<Event>> {
    return this.http.get<Page<Event>>('/user/events/past');
  }

  create(data: {
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
    return this.http.post('/user/events', data);
  }

  update(
    hex: string,
    data: {
      ical?: string;
      summary?: string;
      description?: string;
      location?: string;
    }
  ): Promise<{ hex: string; etag: string; uid: string }> {
    return this.http.patch(`/user/events/${hex}`, data);
  }

  del(hex: string): Promise<void> {
    return this.http.delete<void>(`/user/events/${hex}`);
  }
}
