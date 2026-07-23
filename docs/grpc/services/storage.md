# Storage Service (`@hermers/grpc`)

Package: `hermes.storage`  
Property: `grpc.storage`

Provides binary file/blob upload, streaming download, and deletion.

---

## Methods & Signatures

### `put(data: { tenant?: string; key: string; data: Uint8Array | string }): Promise<{ ref: BlobRef }>`

Uploads a file or binary payload. `tenant` is auto-filled from identity cache when omitted.

- **RPC Method:** `rpc Put(PutReq) returns (PutResp)`
- **Return Type:** `Promise<{ ref: BlobRef }>`

```ts
export interface BlobRef {
  hex: string;
  tenant: string;
  backend: string;
  bucket: string;
  key: string;
  size: number;
  hash: string;
}
```

- **Example:**
```ts
const res = await grpc.storage.put({
  key: 'documents/invoice.pdf',
  data: pdfBuffer
});
console.log('Blob Hex:', res.ref.hex);
```

---

### `get(hex: string): Promise<AsyncIterable<{ data: Uint8Array }>>`

Streams binary blob chunks for a file hex ID.

- **RPC Method:** `rpc Get(GetReq) returns (stream Chunk)`
- **Return Type:** `Promise<AsyncIterable<{ data: Uint8Array }>>`

- **Example:**
```ts
const stream = await grpc.storage.get('blob_hex_123');
for await (const chunk of stream) {
  console.log('Received chunk bytes:', chunk.data.length);
}
```

---

### `remove(hex: string): Promise<void>`

Deletes a binary blob by hex ID.

- **RPC Method:** `rpc Remove(RemoveReq) returns (RemoveResp)`
- **Return Type:** `Promise<void>`
