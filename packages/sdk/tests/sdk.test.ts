import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import Hermes, {
  BASE_URL,
  HermesError,
  generateKey,
  hashKey,
  prefixKey,
} from '../src/index.js';
import { createHash, randomBytes } from 'node:crypto';

/**
 * Unit tests — mocked fetch. Always run.
 * Live integration lives in `live.test.ts` (requires HERMERS_API_KEY).
 */
describe('@hermers/sdk unit', () => {
  it('defaults to production REST base and requires an API key', () => {
    const hermes = new Hermes('hm_live_testkey', {
      fetch: async () =>
        new Response(
          JSON.stringify({
            hex: 'A0S',
            user: 'U0X',
            tenant: 'T0X',
            owner: true,
            scopes: [],
            deny: [],
            tier: 'free',
            ip: '',
            agent: '',
          }),
          { status: 200 }
        ),
    });
    assert.equal(hermes.http.apiBase, BASE_URL);
    assert.equal(BASE_URL, 'https://hermers.aduki.pro/v1');
    assert.throws(() => new Hermes(''), /API key is required/);
  });

  it('hashes API keys client-side', () => {
    const key = generateKey();
    assert.match(key, /^hm_live_[0-9a-f]{64}$/);
    assert.equal(prefixKey(key), key.slice(0, 16));
    assert.equal(hashKey(key), createHash('sha256').update(key).digest('hex'));
  });

  it('throws HermesError from flat API envelope', async () => {
    const fetchMock: typeof fetch = async (input) => {
      const url = String(input);
      if (url.includes('/auth/whoami')) {
        return new Response(
          JSON.stringify({
            hex: 'A0S',
            user: 'U0X',
            tenant: 'T0X',
            owner: true,
            scopes: [],
            deny: [],
            tier: 'free',
            ip: '',
            agent: '',
          }),
          { status: 200 }
        );
      }
      return new Response(JSON.stringify({ error: 'not_found', message: 'missing' }), {
        status: 404,
        statusText: 'Not Found',
      });
    };
    const hermes = new Hermes('hm_live_abc', {
      apiBase: 'https://example.test/v1',
      fetch: fetchMock,
    });
    await assert.rejects(() => hermes.contacts.list(), (err: unknown) => {
      assert.ok(err instanceof HermesError);
      assert.equal(err.code, 'not_found');
      assert.equal(err.message, 'missing');
      return true;
    });
  });

  it('create key posts hash+prefix only', async () => {
    const bodies: unknown[] = [];
    const fetchMock: typeof fetch = async (input, init) => {
      if (String(input).includes('/auth/whoami')) {
        return new Response(
          JSON.stringify({
            hex: 'A0S',
            user: 'U0X',
            tenant: 'T0X',
            owner: true,
            scopes: [],
            deny: [],
            tier: 'free',
            ip: '',
            agent: '',
          }),
          { status: 200 }
        );
      }
      bodies.push(JSON.parse(String(init?.body)));
      return new Response(JSON.stringify({ hex: 'k1' }), { status: 200 });
    };
    const hermes = new Hermes('hm_live_admin', {
      apiBase: 'https://example.test/v1',
      fetch: fetchMock,
    });
    const fixed = `hm_live_${randomBytes(32).toString('hex')}`;
    const created = await hermes.keys.create({
      name: 'ci',
      scopes: ['contacts:read'],
      key: fixed,
    });
    assert.equal(created.key, fixed);
    const body = bodies[0] as Record<string, string>;
    assert.equal(body.hash, hashKey(fixed));
    assert.equal(body.prefix, prefixKey(fixed));
    assert.ok(!('key' in body));
  });

  it('caches whoami ip/agent fields', async () => {
    const hermes = new Hermes('hm_live_abc', {
      apiBase: 'https://example.test/v1',
      fetch: async () =>
        new Response(
          JSON.stringify({
            hex: 'A0S',
            user: 'U0X',
            tenant: 'T0X',
            owner: false,
            scopes: ['user.mail.**'],
            deny: [],
            tier: 'free',
            ip: '',
            agent: '',
          }),
          { status: 200 }
        ),
    });
    const id = await hermes.ready();
    assert.equal(id.ip, '');
    assert.equal(id.agent, '');
    assert.equal(id.owner, false);
  });
});
