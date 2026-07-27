/**
 * Live integration against production Hermers gRPC (TLS).
 *
 *   HERMERS_API_KEY=hm_live_… npm test
 *
 * Skips when HERMERS_API_KEY is unset.
 */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import HermesGrpc, { BASE_ENDPOINT } from '../src/index.js';

const apiKey = process.env.HERMERS_API_KEY?.trim();

if (!apiKey) {
  describe('@hermers/grpc live', () => {
    it('skips — set HERMERS_API_KEY to run against production', { skip: true }, () => {});
  });
} else {
  describe('@hermers/grpc live', () => {
    it('whoami via SessionService.Whoami caches identity', async () => {
      assert.equal(BASE_ENDPOINT, 'grpc.aduki.pro:443');
      const client = new HermesGrpc(apiKey);
      assert.equal(client.transport.endpoint, BASE_ENDPOINT);
      try {
        assert.equal(client.me, undefined);
        const id = await client.ready();
        assert.ok(id.user && id.user.length > 0, 'user hex present');
        assert.ok(id.tenant && id.tenant.length > 0, 'tenant hex present');
        assert.equal(client.me?.user, id.user);
        assert.equal(client.me?.tenant, id.tenant);

        const again = await client.whoami();
        assert.equal(again.user, id.user);
        assert.equal(again.tenant, id.tenant);
      } finally {
        client.close();
      }
    });

    it('contacts.list uses cached tenant without caller hex', async () => {
      const client = new HermesGrpc(apiKey);
      try {
        await client.ready();
        const res = await client.contacts.list({ limit: 5 });
        assert.ok(res && Array.isArray(res.items), 'items is an array');
        assert.ok(client.me?.tenant);
        assert.ok(client.me?.user);
      } finally {
        client.close();
      }
    });

    it('contacts create + cleanup when safe', async () => {
      const client = new HermesGrpc(apiKey);
      let hex: string | undefined;
      try {
        await client.ready();
        const vcard = [
          'BEGIN:VCARD',
          'VERSION:4.0',
          'FN:SDK gRPC Live Test',
          'EMAIL:sdk-grpc-live@example.invalid',
          'END:VCARD',
        ].join('\n');
        const created = await client.contacts.create({ vcard });
        hex = created.hex;
        assert.ok(hex, 'created contact has hex');
        assert.equal(created.tenant, client.me?.tenant);
        assert.equal(created.owner, client.me?.user);
        const got = await client.contacts.retrieve(hex);
        assert.equal(got.hex, hex);
      } finally {
        if (hex) {
          try {
            await client.contacts.del(hex);
          } catch {
            // best-effort cleanup
          }
        }
        client.close();
      }
    });
  });
}
