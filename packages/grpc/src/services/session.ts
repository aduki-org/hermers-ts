import { Client } from '../utils/client.js';
import { email as validateEmail, hex as validateHex, limit as validateLimit } from '../data/index.js';
import { Session } from '../types/index.js';

export class SessionService {
  constructor(private client: Client) {}

  async login(data: { email: string; password: string; ip?: string; agent?: string }): Promise<{ token: string; refresh: string; session: Session }> {
    validateEmail(data.email, 'email');
    if (!data.password) {
      throw new Error("Missing password for 'login'");
    }
    return this.client.call('hermes.session', 'SessionService', 'Login', data);
  }

  async issue(data: { user: string; tenant: string; ip?: string; agent?: string }): Promise<{ token: string; refresh: string; session: Session }> {
    validateHex(data.user, 'user');
    validateHex(data.tenant, 'tenant');
    return this.client.call('hermes.session', 'SessionService', 'Issue', data);
  }

  async refresh(token: string): Promise<{ token: string; refresh: string; session: Session }> {
    if (!token) {
      throw new Error("Missing token for 'refresh'");
    }
    return this.client.call('hermes.session', 'SessionService', 'Refresh', { token });
  }

  async load(jti: string): Promise<Session> {
    validateHex(jti, 'jti');
    return this.client.call('hermes.session', 'SessionService', 'Load', { jti });
  }

  async revoke(jti: string): Promise<void> {
    validateHex(jti, 'jti');
    return this.client.call('hermes.session', 'SessionService', 'Revoke', { jti });
  }

  async patch(data: { user: string; tenant: string; scopes: string[]; deny: string[] }): Promise<void> {
    validateHex(data.user, 'user');
    validateHex(data.tenant, 'tenant');
    return this.client.call('hermes.session', 'SessionService', 'Patch', data);
  }

  async list(data: { user: string; page: number; limit: number; after?: string }): Promise<{ items: Session[]; total: number; page: number; pages: number }> {
    validateHex(data.user, 'user');
    const lim = validateLimit(data.limit);
    return this.client.call('hermes.session', 'SessionService', 'List', { ...data, limit: lim });
  }

  async whoami(): Promise<Session> {
    return this.client.call('hermes.session', 'SessionService', 'Whoami', {});
  }
}
