import { Client } from '../utils/client.js';
import { Audit, Key, Page, PreferenceDetail, Session, UserProfile } from '../types/index.js';

export class User {
  constructor(private client: Client) {}

  async get(): Promise<UserProfile> {
    return this.client.get<UserProfile>('/user');
  }

  async email(email: string): Promise<UserProfile> {
    return this.client.post<UserProfile>('/user/lookup/email', { email });
  }

  async profile(profile: string): Promise<UserProfile> {
    return this.client.post<UserProfile>('/user/lookup/profile', { profile });
  }

  async info(data: { name?: string }): Promise<UserProfile> {
    return this.client.patch<UserProfile>('/user/info', data);
  }

  async setemail(email: string): Promise<UserProfile> {
    return this.client.patch<UserProfile>('/user/email', { email });
  }

  async phone(phone: string): Promise<UserProfile> {
    return this.client.patch<UserProfile>('/user/phone', { phone });
  }

  async password(password: string): Promise<UserProfile> {
    return this.client.patch<UserProfile>('/user/password', { password });
  }

  async meta(meta: Record<string, unknown>): Promise<UserProfile> {
    return this.client.patch<UserProfile>('/user/meta', { meta });
  }

  async avatar(avatar: string): Promise<UserProfile> {
    return this.client.patch<UserProfile>('/user/avatar', { avatar });
  }

  async state(state: string): Promise<UserProfile> {
    return this.client.patch<UserProfile>('/user/state', { state });
  }

  async totp(enabled: boolean): Promise<UserProfile> {
    return this.client.patch<UserProfile>('/user/totp', { enabled });
  }

  async login(): Promise<UserProfile> {
    return this.client.patch<UserProfile>('/user/login');
  }

  // Sessions
  async activesessions(): Promise<Page<Session>> {
    return this.client.get<Page<Session>>('/user/sessions/active');
  }

  async methodsessions(method: string): Promise<Page<Session>> {
    return this.client.get<Page<Session>>(`/user/sessions/method/${method}`);
  }

  // Audits
  async audits(): Promise<Page<Audit>> {
    return this.client.get<Page<Audit>>('/user/audits');
  }

  async actionaudits(action: string): Promise<Page<Audit>> {
    return this.client.get<Page<Audit>>(`/user/audits/action/${action}`);
  }

  async failedaudits(): Promise<Page<Audit>> {
    return this.client.get<Page<Audit>>('/user/audits/failed');
  }

  async successaudits(): Promise<Page<Audit>> {
    return this.client.get<Page<Audit>>('/user/audits/successful');
  }

  async ipaudits(ip: string): Promise<Page<Audit>> {
    return this.client.get<Page<Audit>>(`/user/audits/ip/${ip}`);
  }

  // Keys
  async keys(): Promise<Page<Key>> {
    return this.client.get<Page<Key>>('/user/keys');
  }

  // Preferences
  async prefinfo(data: Record<string, unknown>): Promise<PreferenceDetail> {
    return this.client.patch<PreferenceDetail>('/user/preferences/info', data);
  }

  async prefnotifications(data: Record<string, unknown>): Promise<PreferenceDetail> {
    return this.client.patch<PreferenceDetail>('/user/preferences/notifications', data);
  }

  async prefcomm(data: Record<string, unknown>): Promise<PreferenceDetail> {
    return this.client.patch<PreferenceDetail>('/user/preferences/communication', data);
  }

  async prefprivacy(data: Record<string, unknown>): Promise<PreferenceDetail> {
    return this.client.patch<PreferenceDetail>('/user/preferences/privacy', data);
  }

  async prefdisplay(data: Record<string, unknown>): Promise<PreferenceDetail> {
    return this.client.patch<PreferenceDetail>('/user/preferences/display', data);
  }

  async prefregional(data: Record<string, unknown>): Promise<PreferenceDetail> {
    return this.client.patch<PreferenceDetail>('/user/preferences/regional', data);
  }
}
