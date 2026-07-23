import { Client } from '../utils/client.js';
import { bytes as validateBytes, hex as validateHex } from '../data/index.js';
import { BlobRef } from '../types/index.js';

export class StorageService {
  constructor(private client: Client) {}

  async put(data: { tenant?: string; key: string; data: Uint8Array | string }): Promise<{ ref: BlobRef }> {
    let tenantHex = data.tenant ?? this.client.cachedTenant;
    if (!tenantHex) {
      const id = await this.client.whoami();
      tenantHex = id.tenant;
    }
    validateHex(tenantHex, 'tenant');
    const dataBytes = validateBytes(data.data, 'data');
    return this.client.call('hermes.storage', 'StorageService', 'Put', { ...data, tenant: tenantHex, data: Array.from(dataBytes) });
  }

  async get(hex: string): Promise<AsyncIterable<{ data: Uint8Array }>> {
    validateHex(hex, 'hex');
    const resp = await this.client.call<{ hex: string }, { chunks: number[][] }>('hermes.storage', 'StorageService', 'Get', { hex });
    const chunks = resp.chunks ?? [];

    return (async function* () {
      for (const chunk of chunks) {
        yield { data: new Uint8Array(chunk) };
      }
    })();
  }

  async remove(hex: string): Promise<void> {
    validateHex(hex, 'hex');
    return this.client.call('hermes.storage', 'StorageService', 'Remove', { hex });
  }
}
