import type { HttpClient } from '../http/client.js';
import type { Calendar, Event, ListQuery, Page } from '../types/index.js';

export class CalendarResource {
  constructor(private readonly http: HttpClient) {}

  list(query?: ListQuery): Promise<Page<Calendar>> {
    return this.http.get<Page<Calendar>>('/user/calendars', { query });
  }

  search(q: string): Promise<Page<Calendar>> {
    return this.http.get<Page<Calendar>>(`/user/calendars/search/${encodeURIComponent(q)}`);
  }

  create(data: { name: string; color?: string }): Promise<{ hex: string }> {
    return this.http.post<{ hex: string }>('/user/calendars', data);
  }

  events(query?: ListQuery): Promise<Page<Event>> {
    return this.http.get<Page<Event>>('/user/calendars/events', { query });
  }
}
