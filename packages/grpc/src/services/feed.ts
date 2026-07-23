import { Client } from '../utils/client.js';
import { hex as validateHex } from '../data/index.js';
import { Feed } from '../types/index.js';

export class FeedService {
  constructor(private client: Client) {}

  async create(data: { connection: string; remote: string; name: string; color?: string; block: boolean }): Promise<Feed> {
    if (!data.connection || !data.remote || !data.name) {
      throw new Error("Missing required fields for feed 'create'");
    }
    return this.client.call('hermes.feeds', 'FeedService', 'Create', data);
  }

  async list(): Promise<{ items: Feed[] }> {
    return this.client.call('hermes.feeds', 'FeedService', 'List', {});
  }

  async get(hex: string): Promise<Feed> {
    validateHex(hex, 'hex');
    return this.client.call('hermes.feeds', 'FeedService', 'Get', { hex });
  }

  async update(data: { hex: string; color?: string; block?: boolean; active?: boolean; name?: string }): Promise<Feed> {
    validateHex(data.hex, 'hex');
    return this.client.call('hermes.feeds', 'FeedService', 'Update', data);
  }

  async remove(hex: string): Promise<{ removed: boolean }> {
    validateHex(hex, 'hex');
    return this.client.call('hermes.feeds', 'FeedService', 'Remove', { hex });
  }

  async sync(hex: string): Promise<{ ok: boolean; inserted: number; updated: number }> {
    validateHex(hex, 'hex');
    return this.client.call('hermes.feeds', 'FeedService', 'Sync', { hex });
  }
}
