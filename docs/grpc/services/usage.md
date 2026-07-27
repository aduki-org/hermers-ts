# Usage (`client.usage`)

Wraps `hermes.usage.Usageervice` (proto service name spelling). Tenant is injected from whoami on every call.

```ts
const check = await client.usage.check({ metric: 'sends' });
const incr = await client.usage.increment({ metric: 'sends', by: 1 });
const row = await client.usage.get({ metric: 'sends', window: '2026-07' });
```

## Methods

| Method | Signature | Returns |
| --- | --- | --- |
| `increment` | `({ metric, by? }) => Promise<IncrResp>` | New value + over-limit flag |
| `check` | `({ metric }) => Promise<CheckResp>` | Used vs limit |
| `get` | `({ metric, window }) => Promise<Usage>` | Usage row |
| `reset` | `({ metric, window }) => Promise<void>` | Empty |

### Params

| Method | You pass | Injected | Notes |
| --- | --- | --- | --- |
| `increment` | `metric`, optional `by` (default `1`) | `tenant` | |
| `check` | `metric` | `tenant` | |
| `get` / `reset` | `metric`, `window` (`YYYY-MM-DD` or `YYYY-MM`) | `tenant` | |

## Return types

### `Usage`

| Field | Type | Description |
| --- | --- | --- |
| `tenant` | `string` | |
| `metric` | `string` | Metric name |
| `value` | `number` | Current counter |
| `window` | `string` | `YYYY-MM-DD` or `YYYY-MM` |

### `IncrResp`

| Field | Type |
| --- | --- |
| `value` | `number` |
| `overLimit` | `boolean` |

### `CheckResp`

| Field | Type |
| --- | --- |
| `used` | `number` |
| `limit` | `number` |
| `over` | `boolean` |

```ts
// check
{ used: 42, limit: 100, over: false }

// increment
{ value: 43, overLimit: false }

// get
{ tenant: 'T0X…', metric: 'sends', value: 43, window: '2026-07' }
```

## Errors

Unknown metric → `INVALID_ARGUMENT`. Throws `HermesGrpcError`.
