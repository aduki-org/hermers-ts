import { Client } from '../utils/client.js';
import { Page, Session, Token } from '../types/index.js';

export class Auth {
  constructor(private client: Client) {}

  async login(credentials: { email: string; password: string }): Promise<Token> {
    const res = await this.client.post<Token>('/auth/login', credentials);
    if (res.token) {
      this.client.setToken(res.token);
    }
    return res;
  }

  async refresh(token: string): Promise<Token> {
    const res = await this.client.post<Token>('/auth/refresh', { token });
    if (res.token) {
      this.client.setToken(res.token);
    }
    return res;
  }

  async logout(): Promise<{ ok: boolean }> {
    return this.client.post<{ ok: boolean }>('/auth/logout');
  }

  async sessions(query?: { after?: string; limit?: number; page?: number }): Promise<Page<Session>> {
    return this.client.get<Page<Session>>('/auth/sessions', { query });
  }
}
