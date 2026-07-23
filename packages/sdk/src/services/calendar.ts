import { Client } from '../utils/client.js';
import { Calendar as CalendarModel, Event, Page } from '../types/index.js';

export class Calendar {
  constructor(private client: Client) {}

  async list(query?: { after?: string; limit?: number }): Promise<Page<CalendarModel>> {
    return this.client.get<Page<CalendarModel>>('/user/calendars', { query });
  }

  async search(q: string): Promise<Page<CalendarModel>> {
    return this.client.get<Page<CalendarModel>>(`/user/calendars/search/${q}`);
  }

  async create(data: { name: string; color?: string }): Promise<{ hex: string }> {
    return this.client.post<{ hex: string }>('/user/calendars', data);
  }

  async events(query?: { after?: string; limit?: number }): Promise<Page<Event>> {
    return this.client.get<Page<Event>>('/user/calendars/events', { query });
  }
}
