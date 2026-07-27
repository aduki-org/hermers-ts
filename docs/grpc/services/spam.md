# Spam (`client.spam`)

Wraps `hermes.spam.SpamService`. Tenant (and user on report) come from whoami.

```ts
import { SpamVerdict } from '@hermers/grpc';

const result = await client.spam.classify({
  msg: 'M0X…',
  raw: emlBytes,
  direction: 'inbound',
});
await client.spam.report({
  msg: 'M0X…',
  verdict: SpamVerdict.SPAM,
  source: 'user_report',
});
```

## Methods

| Method | Signature | Returns |
| --- | --- | --- |
| `classify` | `({ msg, raw, direction }) => Promise<ClassifyResp>` | Verdict + scores |
| `report` | `({ msg, verdict, source }) => Promise<void>` | Empty |

### Params

| Method | You pass | Injected |
| --- | --- | --- |
| `classify` | `msg` (message hex), `raw` (`Uint8Array` eml), `direction` (`"inbound"` \| `"outbound"`) | `tenant` |
| `report` | `msg`, `verdict` (`SpamVerdict`), `source` (`"user_report"` \| `"dmarc_feedback"` \| `"honeypot"`) | `tenant`, `user` |

## Return types

### `Verdict` (`SpamVerdict`)

| Name | Value |
| --- | --- |
| `CLEAN` | `0` |
| `SPAM` | `1` |
| `BULK` | `2` |

### `Scores`

| Field | Type |
| --- | --- |
| `rules` | `number` |
| `bayes` | `number` |
| `ml` | `number` |
| `reputation` | `number` |
| `composite` | `number` |

### `ClassifyResp`

| Field | Type |
| --- | --- |
| `verdict` | `Verdict` |
| `scores` | `Scores?` |
| `reason` | `string` |

```ts
{
  verdict: 1, // SPAM
  scores: { rules: 2.1, bayes: 0.9, ml: 0.8, reputation: 0.1, composite: 3.9 },
  reason: 'matched bulk template',
}
```

## Errors

Unknown message → `NOT_FOUND`. Throws `HermesGrpcError`.
