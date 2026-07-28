import type { HttpClient } from '../http/client.js';
import type {
  Appointment,
  AppointmentCreate,
  Availability,
  Guest,
  ListQuery,
  Override,
  Page,
  Service,
  Window,
} from '../types/index.js';

/** Booking + appointments + availability (REST JSON shapes). */
export class SchedulingResource {
  constructor(private readonly http: HttpClient) {}

  view(slug: string): Promise<Service> {
    return this.http.get<Service>(`/book/${slug}`);
  }

  book(
    slug: string,
    data: { name: string; email: string; start: string; end: string }
  ): Promise<{ appointment: Appointment; guest: Guest }> {
    return this.http.post<{ appointment: Appointment; guest: Guest }>(`/book/${slug}`, data);
  }

  guest(token: string): Promise<{ guest: Guest; appointment: Appointment }> {
    return this.http.get<{ guest: Guest; appointment: Appointment }>(`/book/guest/${token}`);
  }

  cancelGuest(token: string): Promise<{ status: string }> {
    return this.http.post<{ status: string }>(`/book/guest/${token}/cancel`);
  }

  createAppointment(data: AppointmentCreate): Promise<Appointment> {
    return this.http.post<Appointment>('/user/appointments', data);
  }

  appointments(query?: ListQuery): Promise<Page<Appointment>> {
    return this.http.get<Page<Appointment>>('/user/appointments', { query });
  }

  activeAppointments(query?: ListQuery): Promise<Page<Appointment>> {
    return this.http.get<Page<Appointment>>('/user/appointments/active', { query });
  }

  retrieveAppointment(hex: string): Promise<Appointment> {
    return this.http.get<Appointment>(`/user/appointments/${hex}`);
  }

  guests(hex: string): Promise<Guest[]> {
    return this.http.get<Guest[]>(`/user/appointments/${hex}/guests`);
  }

  updateAppointmentStatus(
    hex: string,
    status: 'confirmed' | 'canceled' | 'completed' | 'no_show' | 'pending'
  ): Promise<Appointment> {
    return this.http.patch<Appointment>(`/user/appointments/${hex}/status`, { status });
  }

  cancelAppointment(hex: string): Promise<null> {
    return this.http.patch<null>(`/user/appointments/${hex}/cancel`, {});
  }

  deleteAppointment(hex: string): Promise<null> {
    return this.http.delete<null>(`/user/appointments/${hex}`);
  }

  createService(data: {
    name: string;
    slug: string;
    duration?: number;
    buffer?: number;
    notice?: number;
    horizon?: number;
    increment?: number;
    max?: number;
    location?: Record<string, unknown>;
    questions?: unknown;
    meta?: Record<string, unknown>;
  }): Promise<Service> {
    return this.http.post<Service>('/user/services', data);
  }

  services(): Promise<Service[]> {
    return this.http.get<Service[]>('/user/services');
  }

  retrieveService(hex: string): Promise<Service> {
    return this.http.get<Service>(`/user/services/${hex}`);
  }

  deleteService(hex: string): Promise<null> {
    return this.http.delete<null>(`/user/services/${hex}`);
  }

  windows(): Promise<Window[]> {
    return this.http.get<Window[]>('/user/windows');
  }

  overrides(): Promise<Override[]> {
    return this.http.get<Override[]>('/user/overrides');
  }

  availability(start: string, end: string): Promise<Availability> {
    return this.http.get<Availability>(`/user/availability/${start}/${end}`);
  }
}
