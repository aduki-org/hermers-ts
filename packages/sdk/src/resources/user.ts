import type { HttpClient } from '../http/client.js';
import type {
  Audit,
  ListQuery,
  Page,
  PreferenceDetail,
  Session,
  UserProfile,
} from '../types/index.js';

/** Authenticated user profile and related resources (`/user`). */
export class UserResource {
  constructor(private readonly http: HttpClient) {}

  retrieve(): Promise<UserProfile> {
    return this.http.get<UserProfile>('/user');
  }

  lookupByEmail(email: string): Promise<UserProfile> {
    return this.http.post<UserProfile>('/user/lookup/email', { email });
  }

  updateInfo(data: { name?: string }): Promise<UserProfile> {
    return this.http.patch<UserProfile>('/user/info', data);
  }

  updateEmail(email: string): Promise<UserProfile> {
    return this.http.patch<UserProfile>('/user/email', { email });
  }

  updatePhone(phone: string): Promise<UserProfile> {
    return this.http.patch<UserProfile>('/user/phone', { phone });
  }

  updateMeta(meta: Record<string, unknown>): Promise<UserProfile> {
    return this.http.patch<UserProfile>('/user/meta', { meta });
  }

  updateAvatar(avatar: string): Promise<UserProfile> {
    return this.http.patch<UserProfile>('/user/avatar', { avatar });
  }

  activeSessions(query?: ListQuery): Promise<Page<Session>> {
    return this.http.get<Page<Session>>('/user/sessions/active', { query });
  }

  audits(query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>('/user/audits', { query });
  }

  updatePreferences(
    section: 'info' | 'notifications' | 'communication' | 'privacy' | 'display' | 'regional',
    data: Record<string, unknown>
  ): Promise<PreferenceDetail> {
    return this.http.patch<PreferenceDetail>(`/user/preferences/${section}`, data);
  }
}
