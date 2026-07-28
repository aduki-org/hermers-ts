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

  it('createWebhook posts body and patches update paths', async () => {
    const calls: { url: string; method: string; body?: unknown }[] = [];
    const fetchMock: typeof fetch = async (input, init) => {
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
      const method = (init?.method ?? 'GET').toUpperCase();
      calls.push({
        url,
        method,
        body: init?.body ? JSON.parse(String(init.body)) : undefined,
      });
      if (method === 'POST') {
        return new Response(JSON.stringify({ hex: 'W0X' }), { status: 200 });
      }
      if (method === 'PATCH' || method === 'DELETE') {
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      }
      return new Response(JSON.stringify({ items: [], total: 0 }), { status: 200 });
    };
    const hermes = new Hermes('hm_live_admin', {
      apiBase: 'https://example.test/v1',
      fetch: fetchMock,
    });
    const created = await hermes.tenant.createWebhook({
      url: 'https://hooks.example/h',
      secret: 'whsec_0123456789abcdef',
      events: ['message.sent'],
    });
    assert.equal(created.hex, 'W0X');
    await hermes.tenant.activeWebhooks();
    await hermes.tenant.webhookSubscribers('message.sent');
    await hermes.tenant.updateWebhookActive('W0X', false);
    await hermes.tenant.updateWebhookUrl('W0X', 'https://hooks.example/v2');
    await hermes.tenant.deleteWebhook('W0X');
    assert.ok(calls.some((c) => c.method === 'POST' && c.url.endsWith('/tenant/webhooks')));
    assert.ok(calls.some((c) => c.url.endsWith('/tenant/webhooks/active')));
    assert.ok(calls.some((c) => c.url.includes('/tenant/webhooks/subscribers/message.sent')));
    assert.ok(calls.some((c) => c.method === 'PATCH' && c.url.endsWith('/active') && (c.body as { active: boolean }).active === false));
    assert.ok(calls.some((c) => c.method === 'DELETE' && c.url.endsWith('/tenant/webhooks/W0X')));
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
  it('covers new tenant/user/mail surfaces with correct paths', async () => {
    const calls: { url: string; method: string; body?: unknown }[] = [];
    const fetchMock: typeof fetch = async (input, init) => {
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
      const method = (init?.method ?? 'GET').toUpperCase();
      calls.push({
        url,
        method,
        body: init?.body ? JSON.parse(String(init.body)) : undefined,
      });
      if (method === 'POST' && url.includes('/feeds/') && url.endsWith('/sync')) {
        return new Response(JSON.stringify({ hex: 'F0X', ok: true }), { status: 200 });
      }
      if (method === 'PATCH' || method === 'DELETE' || method === 'POST') {
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      }
      return new Response(JSON.stringify({ items: [], total: 0 }), { status: 200 });
    };
    const hermes = new Hermes('hm_live_admin', {
      apiBase: 'https://example.test/v1',
      fetch: fetchMock,
    });
    await hermes.user.activeSessions();
    await hermes.user.sessionsByMethod('key');
    await hermes.user.failedAudits();
    await hermes.tenant.audits();
    await hermes.tenant.promote();
    await hermes.tenant.activeDomains();
    await hermes.tenant.updateDomainKind('D0X', 'primary');
    await hermes.tenant.retrieveQuota('storage');
    await hermes.tenant.activeRules();
    await hermes.tenant.usageByMetric('messages');
    await hermes.calendar.update('C0X', { name: 'Work' });
    await hermes.feeds.sync('F0X');
    await hermes.mail.folderUnread('INBOX');
    await hermes.mail.updateMailboxRole('M0X', 'inbox');
    await hermes.scheduling.activeAppointments();
    await hermes.scheduling.updateAppointmentStatus('A0X', 'confirmed');
    await hermes.keys.listExpired();
    await hermes.keys.lookupPrefix('hm_live_abc');

    assert.ok(calls.some((c) => c.url.endsWith('/user/sessions') && !c.url.includes('/active')));
    assert.ok(calls.some((c) => c.url.endsWith('/user/sessions/method/key')));
    assert.ok(calls.some((c) => c.url.endsWith('/tenant/audits')));
    assert.ok(calls.some((c) => c.method === 'POST' && c.url.endsWith('/tenant/promote')));
    assert.ok(calls.some((c) => c.url.endsWith('/tenant/domains/D0X/kind')));
    assert.ok(calls.some((c) => c.url.endsWith('/user/feeds/F0X/sync')));
    assert.ok(calls.some((c) => c.url.endsWith('/user/mail/folder/INBOX/unread')));
    assert.ok(calls.some((c) => c.url.endsWith('/user/appointments/A0X/status')));
    assert.ok(calls.some((c) => c.url.endsWith('/tenant/keys/expired')));
    assert.ok(calls.some((c) => c.method === 'POST' && c.url.endsWith('/tenant/keys/lookup/prefix')));
  });

});
