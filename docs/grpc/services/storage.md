# Storage (`client.storage`)

Wraps `hermes.storage.StorageService`. `put` injects `tenant` from whoami. `get` collects the server stream into one buffer.

```ts
const { ref } = await client.storage.put({
  key: 'file.txt',
  data: new Uint8Array([1, 2, 3]),
});
const bytes = await client.storage.get(ref!.hex);
await client.storage.del(ref!.hex);
```

## Methods

| Method | Signature | RPC | Returns |
| --- | --- | --- | --- |
| `put` | `({ key, data }) => Promise<{ ref?: BlobRef }>` | `Put` | Blob reference |
| `get` | `(hex: string) => Promise<Uint8Array>` | `Get` (stream) | Concatenated bytes |
| `del` | `(hex: string) => Promise<void>` | `Remove` | Empty |

### `put` params

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `key` | `string` | yes | Object key |
| `data` | `Uint8Array` | yes | Payload |

SDK adds `tenant` from whoami.

## Return types

### `BlobRef`

| Field | Type | Description |
| --- | --- | --- |
| `hex` | `string` | Blob id |
| `tenant` | `string` | |
| `backend` | `string` | Storage backend id |
| `bucket` | `string` | |
| `key` | `string` | |
| `size` | `number` | Bytes |
| `hash` | `Buffer` / `Uint8Array` | Content hash |

### Put response

```ts
{ ref?: BlobRef }
```

### Get

Returns a single `Uint8Array` assembled from streamed `Chunk { data: Buffer }` messages.

## Errors

Missing blob → `NOT_FOUND`. Over quota → `RESOURCE_EXHAUSTED`. Throws `HermesGrpcError`.
