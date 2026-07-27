/**
 * Live integration against production Hermers REST.
 *
 *   HERMERS_API_KEY=hm_live_… npm test
 *   # or: set -a && source ../../.env.local && set +a && npm test
 *
 * Skips when HERMERS_API_KEY is unset (CI / local without secrets).
 */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import Hermes, { BASE_URL } from '../src/index.js';

const apiKey = process.env.HERMERS_API_KEY?.trim();

if (!apiKey) {
  describe('@hermers/sdk live', () => {
    it('skips — set HERMERS_API_KEY to run against production', { skip: true }, () => {});
  });
} else {
  describe('@hermers/sdk live', () => {
    it('whoami via GET /auth/whoami caches identity on ready/me', async () => {
      assert.equal(BASE_URL, 'https://hermers.aduki.pro/v1');
      const hermes = new Hermes(apiKey);
      assert.equal(hermes.http.apiBase, BASE_URL);
      assert.equal(hermes.me, undefined);

      const id = await hermes.ready();
      assert.ok(id.user && id.user.length > 0, 'user hex present');
      assert.ok(id.tenant && id.tenant.length > 0, 'tenant hex present');
      assert.equal(hermes.me?.user, id.user);
      assert.equal(hermes.me?.tenant, id.tenant);

      const again = await hermes.whoami();
      assert.equal(again.user, id.user);
      assert.equal(again.tenant, id.tenant);
    });

    it('contacts.list works without tenant/user args', async () => {
      const hermes = new Hermes(apiKey);
      await hermes.ready();
      const page = await hermes.contacts.list({ limit: 5 });
      assert.ok(page && typeof page === 'object');
      assert.ok(Array.isArray(page.items), 'items is an array');
      assert.equal(typeof page.total, 'number');
      assert.ok(hermes.me?.tenant);
      assert.ok(hermes.me?.user);
    });

    it('contacts create + cleanup when safe', async () => {
      const hermes = new Hermes(apiKey);
      await hermes.ready();
      const vcard = [
        'BEGIN:VCARD',
        'VERSION:4.0',
        'FN:SDK Live Test',
        'EMAIL:sdk-live-test@example.invalid',
        'END:VCARD',
      ].join('\n');

      let created: { hex?: string } | undefined;
      try {
        created = await hermes.contacts.create({
          vcard,
          name: 'SDK Live Test',
          emails: ['sdk-live-test@example.invalid'],
          meta: {},
        });
        assert.ok(created.hex, 'created contact has hex');
        // REST routes expose list + DELETE by hex (no GET-by-hex on the live server).
        const page = await hermes.contacts.list({ limit: 50 });
        assert.ok(
          page.items.some((c) => c.hex === created!.hex),
          'created contact appears in list'
        );
      } finally {
        if (created?.hex) {
          await hermes.contacts.del(created.hex);
        }
      }
    });
  });
}
