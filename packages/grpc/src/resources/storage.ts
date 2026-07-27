import type { GrpcTransport } from '../transport.js';
import type { BlobRef, Chunk } from '../generated/storage.js';

/** StorageService — types generated from `proto/storage.proto`. */
export class StorageResource {
  constructor(private readonly transport: GrpcTransport) {}

  async put(data: { key: string; data: Uint8Array }): Promise<{ ref?: BlobRef }> {
    const tenant = await this.transport.requireTenant();
    return this.transport.unary(this.transport.storage.put.bind(this.transport.storage), {
      tenant,
      key: data.key,
      data: Buffer.from(data.data),
    });
  }

  /** Collect a streamed Get into a single buffer. */
  async get(hex: string): Promise<Uint8Array> {
    await this.transport.whoami();
    const chunks: Uint8Array[] = [];
    await new Promise<void>((resolve, reject) => {
      const stream = this.transport.storage.get({ hex }, this.transport.metadata);
      stream.on('data', (chunk: Chunk) => {
        if (chunk.data?.length) chunks.push(chunk.data);
      });
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve());
    });
    const total = chunks.reduce((n, c) => n + c.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const c of chunks) {
      out.set(c, offset);
      offset += c.length;
    }
    return out;
  }

  del(hex: string): Promise<void> {
    return this.transport
      .unary(this.transport.storage.remove.bind(this.transport.storage), { hex })
      .then(() => undefined);
  }
}
