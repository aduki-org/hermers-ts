import type { GrpcTransport } from '../transport.js';
import type { Feed, ListResp, SyncResp } from '../generated/feeds.js';

/** FeedService — types from `proto/feeds.proto` (no `id`/`meta`/`sync` like REST Feed model). */
export class FeedsResource {
  constructor(private readonly transport: GrpcTransport) {}

  create(data: {
    connection: string;
    remote: string;
    name: string;
    color?: string;
    block?: boolean;
  }): Promise<Feed> {
    return this.transport.unary(this.transport.feeds.create.bind(this.transport.feeds), {
      connection: data.connection,
      remote: data.remote,
      name: data.name,
      color: data.color,
      block: data.block ?? false,
    });
  }

  list(): Promise<ListResp> {
    return this.transport.unary(this.transport.feeds.list.bind(this.transport.feeds), {});
  }

  retrieve(hex: string): Promise<Feed> {
    return this.transport.unary(this.transport.feeds.get.bind(this.transport.feeds), { hex });
  }

  update(data: {
    hex: string;
    color?: string;
    block?: boolean;
    active?: boolean;
    name?: string;
  }): Promise<Feed> {
    return this.transport.unary(this.transport.feeds.update.bind(this.transport.feeds), data);
  }

  del(hex: string): Promise<{ removed: boolean }> {
    return this.transport.unary(this.transport.feeds.remove.bind(this.transport.feeds), { hex });
  }

  sync(hex: string): Promise<SyncResp> {
    return this.transport.unary(this.transport.feeds.sync.bind(this.transport.feeds), { hex });
  }
}
