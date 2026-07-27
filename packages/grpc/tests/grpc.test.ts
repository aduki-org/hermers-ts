import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';
import { Metadata, status as GrpcStatus, type ServiceError } from '@grpc/grpc-js';
import HermesGrpc, { BASE_ENDPOINT, HermesGrpcError } from '../src/index.js';

/**
 * Unit tests — mocked transport. Always run.
 * Live integration lives in `live.test.ts` (requires HERMERS_API_KEY).
 */
describe('@hermers/grpc unit', () => {
  it('defaults to production TLS endpoint and requires an API key', () => {
    const client = new HermesGrpc('hm_live_testkey');
    assert.equal(client.transport.endpoint, BASE_ENDPOINT);
    assert.equal(BASE_ENDPOINT, 'grpc.aduki.pro:443');
    assert.equal(client.transport.metadata.get('authorization')[0], 'Key hm_live_testkey');
    assert.throws(() => new HermesGrpc(''), /API key is required/);
    client.close();
  });

  it('maps ServiceError into HermesGrpcError', () => {
    const err = Object.assign(new Error('boom'), {
      code: GrpcStatus.NOT_FOUND,
      details: 'contact not found',
      metadata: new Metadata(),
    }) as ServiceError;
    const mapped = HermesGrpcError.fromServiceError(err);
    assert.equal(mapped.code, 'NOT_FOUND');
    assert.equal(mapped.grpcCode, GrpcStatus.NOT_FOUND);
  });

  it('injects tenant from whoami cache without caller hex', async () => {
    const client = new HermesGrpc('hm_live_test', { insecure: true, endpoint: '127.0.0.1:9' });
    mock.method(client.transport, 'whoami', async () => {
      const identity = {
        hex: 'A0Ssession',
        user: 'U0Xuser',
        tenant: 'T0Xtenant',
        owner: true,
        scopes: [] as string[],
        deny: [] as string[],
        tier: 'free',
      };
      (client.transport as unknown as { identityCache: typeof identity }).identityCache = identity;
      return identity;
    });

    const captured: unknown[] = [];
    mock.method(client.transport.contacts, 'list', (req: unknown, _md: Metadata, cb: Function) => {
      captured.push(req);
      cb(null, { items: [], next: '' });
    });

    await client.contacts.list({ limit: 5 });
    assert.deepEqual(captured[0], { tenant: 'T0Xtenant', cursor: '', limit: 5 });
    client.close();
  });
});
