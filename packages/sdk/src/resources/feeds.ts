import type { HttpClient } from '../http/client.js';
import type { Feed } from '../types/index.js';

export class FeedsResource {
  constructor(private readonly http: HttpClient) {}

  create(data: {
    connection: string;
    remote: string;
    name: string;
    color?: string;
    block?: boolean;
  }): Promise<Feed> {
    return this.http.post<Feed>('/user/feeds', data);
  }

  list(): Promise<Feed[]> {
    return this.http.get<Feed[]>('/user/feeds');
  }

  retrieve(hex: string): Promise<Feed> {
    return this.http.get<Feed>(`/user/feeds/${hex}`);
  }

  del(hex: string): Promise<void> {
    return this.http.delete<void>(`/user/feeds/${hex}`);
  }
}
