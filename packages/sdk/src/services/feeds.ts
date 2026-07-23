import { Client } from '../utils/client.js';
import { Feed } from '../types/index.js';

export class Feeds {
  constructor(private client: Client) {}

  async create(data: { connection: string; remote: string; name: string; color?: string; block?: boolean }): Promise<Feed> {
    return this.client.post<Feed>('/user/feeds', data);
  }

  async list(): Promise<Feed[]> {
    return this.client.get<Feed[]>('/user/feeds');
  }

  async get(hex: string): Promise<Feed> {
    return this.client.get<Feed>(`/user/feeds/${hex}`);
  }

  async remove(hex: string): Promise<void> {
    return this.client.remove<void>(`/user/feeds/${hex}`);
  }
}
