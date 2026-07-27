# Types & enums

Shared shapes used by `@hermers/sdk` and `@hermers/grpc`. Prefer TypeScript types exported from each package over copying these snippets.

## Identity (both clients)

```ts
interface Identity {
  hex?: string;      // session / JTI
  user: string;      // user hex
  tenant: string;    // tenant hex
  owner?: boolean;
  scopes?: string[];
  deny?: string[];
  tier?: string;
  email?: string;
  name?: string;
}
```

Cached on `client.me` after `ready()` / `whoami()`.

## Page envelope (REST)

```ts
interface Page<T> {
  items: T[];
  total: number;
  next?: string;
  page?: number;
  pages?: number;
}
```

## Mail flags (gRPC)

```ts
enum Flag {
  SEEN = 0,
  ANSWERED = 1,
  FLAGGED = 2,
  DELETED = 3,
  DRAFT = 4,
}
```

Exported as `MailFlag` from `@hermers/grpc`.

## Spam verdict (gRPC)

```ts
enum Verdict {
  CLEAN = 0,
  SPAM = 1,
  BULK = 2,
}
```

Exported as `SpamVerdict` from `@hermers/grpc`.

## Tier plan (gRPC)

```ts
enum Plan {
  FREE = 0,
  STARTER = 1,
  PRO = 2,
  BUSINESS = 3,
  ENTERPRISE = 4,
}
```

Exported as `TierPlan` from `@hermers/grpc`.

## Errors

- REST: `HermesError` — `status`, `code`, `message`, `field?`, `requestId?`
- gRPC: `HermesGrpcError`

There is **no** SDK `Token` type for login/refresh — API keys only.
