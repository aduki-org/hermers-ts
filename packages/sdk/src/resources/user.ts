import type { HttpClient } from '../http/client.js';
import type {
  Audit,
  ListQuery,
  Page,
  Preference,
  PreferenceInfoBody,
  Session,
  User,
  UserProfile,
} from '../types/index.js';

/** Authenticated user profile and related resources (`/user`). */
export class UserResource {
  constructor(private readonly http: HttpClient) {}

  /** `GET /user` — full User model (not UserProfile view). */
  retrieve(): Promise<User> {
    return this.http.get<User>('/user');
  }

  /** `POST /user/lookup/email` — full User model. */
  lookupByEmail(email: string): Promise<User> {
    return this.http.post<User>('/user/lookup/email', { email });
  }

  /** `POST /user/lookup/profile` — UserProfile view with nested tenant/role. */
  lookupProfile(hex: string): Promise<UserProfile> {
    return this.http.post<UserProfile>('/user/lookup/profile', { hex });
  }

  /** API requires both `name` and `bio`. */
  updateInfo(data: { name: string; bio: string }): Promise<User> {
    return this.http.patch<User>('/user/info', data);
  }

  /** Body is a raw JSON string (not `{ email }`). */
  updateEmail(email: string): Promise<User> {
    return this.http.patch<User>('/user/email', email);
  }

  /** Body is a raw JSON string. */
  updatePhone(phone: string): Promise<User> {
    return this.http.patch<User>('/user/phone', phone);
  }

  /** Body is the meta object itself (not wrapped). */
  updateMeta(meta: Record<string, unknown>): Promise<User> {
    return this.http.patch<User>('/user/meta', meta);
  }

  /** Body is a raw JSON string. */
  updateAvatar(avatar: string): Promise<User> {
    return this.http.patch<User>('/user/avatar', avatar);
  }

  /** Active sessions for the authenticated user (`GET /user/sessions`). */
  activeSessions(query?: ListQuery): Promise<Page<Session>> {
    return this.http.get<Page<Session>>('/user/sessions', { query });
  }

  sessionsByMethod(method: string, query?: ListQuery): Promise<Page<Session>> {
    return this.http.get<Page<Session>>(
      `/user/sessions/method/${encodeURIComponent(method)}`,
      { query }
    );
  }

  audits(query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>('/user/audits', { query });
  }

  auditsByAction(action: string, query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>(
      `/user/audits/action/${encodeURIComponent(action)}`,
      { query }
    );
  }

  failedAudits(query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>('/user/audits/failed', { query });
  }

  successfulAudits(query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>('/user/audits/successful', { query });
  }

  auditsByIp(ip: string, query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>(`/user/audits/ip/${encodeURIComponent(ip)}`, {
      query,
    });
  }

  /**
   * Preference PATCH returns the full Preference row.
   * `info` accepts a typed body; other sections are freeform jsonb.
   */
  updatePreferences(
    section: 'info',
    data: PreferenceInfoBody
  ): Promise<Preference>;
  updatePreferences(
    section: 'notifications' | 'communication' | 'privacy' | 'display' | 'regional',
    data: Record<string, unknown>
  ): Promise<Preference>;
  updatePreferences(
    section: 'info' | 'notifications' | 'communication' | 'privacy' | 'display' | 'regional',
    data: PreferenceInfoBody | Record<string, unknown>
  ): Promise<Preference> {
    return this.http.patch<Preference>(`/user/preferences/${section}`, data);
  }
}
