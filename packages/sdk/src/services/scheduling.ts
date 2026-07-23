import { Client } from '../utils/client.js';
import { Appointment, Availability, Guest, Override, Page, Service, Window } from '../types/index.js';

export class Scheduling {
  constructor(private client: Client) {}

  // Booking (public)
  async view(slug: string): Promise<Service> {
    return this.client.get<Service>(`/book/${slug}`);
  }

  async book(slug: string, data: { name: string; email: string; start: string; end: string }): Promise<{ appt: Appointment; guest: Guest }> {
    return this.client.post<{ appt: Appointment; guest: Guest }>(`/book/${slug}`, data);
  }

  async guest(token: string): Promise<{ appt: Appointment; guest: Guest }> {
    return this.client.get<{ appt: Appointment; guest: Guest }>(`/book/guest/${token}`);
  }

  async cancel(token: string): Promise<{ status: string }> {
    return this.client.post<{ status: string }>(`/book/guest/${token}/cancel`);
  }

  // Appointments (user)
  async create(data: {
    service: string;
    start: string;
    end: string;
    timezone?: string;
    uid?: string;
    method?: string;
    event?: string;
    location?: string;
    notes?: string;
    rescheduled?: string;
    meta?: Record<string, unknown>;
  }): Promise<Appointment> {
    return this.client.post<Appointment>('/user/appointments', data);
  }

  async appointments(query?: { after?: string; limit?: number }): Promise<Page<Appointment>> {
    return this.client.get<Page<Appointment>>('/user/appointments', { query });
  }

  async active(): Promise<Page<Appointment>> {
    return this.client.get<Page<Appointment>>('/user/appointments/active');
  }

  async get(hex: string): Promise<Appointment> {
    return this.client.get<Appointment>(`/user/appointments/${hex}`);
  }

  async status(hex: string, status: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/user/appointments/${hex}/status`, { status });
  }

  async cancelappointment(hex: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/user/appointments/${hex}/cancel`, {});
  }

  async remove(hex: string): Promise<{ ok: boolean }> {
    return this.client.remove<{ ok: boolean }>(`/user/appointments/${hex}`);
  }

  async guests(hex: string): Promise<Guest[]> {
    return this.client.get<Guest[]>(`/user/appointments/${hex}/guests`);
  }

  // Services (user)
  async createservice(data: {
    name: string;
    slug: string;
    duration: number;
    buffer?: number;
    notice?: number;
    horizon?: number;
    increment?: number;
    max?: number;
    location?: Record<string, unknown>;
    questions?: string[];
    meta?: Record<string, unknown>;
  }): Promise<Service> {
    return this.client.post<Service>('/user/services', data);
  }

  async services(): Promise<Service[]> {
    return this.client.get<Service[]>('/user/services');
  }

  async getservice(hex: string): Promise<Service> {
    return this.client.get<Service>(`/user/services/${hex}`);
  }

  async removeservice(hex: string): Promise<void> {
    return this.client.remove<void>(`/user/services/${hex}`);
  }

  // Windows & Availability
  async windows(): Promise<Window[]> {
    return this.client.get<Window[]>('/user/windows');
  }

  async overrides(): Promise<Override[]> {
    return this.client.get<Override[]>('/user/overrides');
  }

  async availability(start: string, end: string): Promise<Availability> {
    return this.client.get<Availability>(`/user/availability/${start}/${end}`);
  }
}
