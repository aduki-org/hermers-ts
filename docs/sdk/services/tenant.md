# Tenant (`hermes.tenant`)

Tenant administration under `/tenant/*`. No signup/password flows. API keys are created via [`hermes.keys.create()`](auth.md).

```ts
const tenant = await hermes.tenant.retrieve();
const members = await hermes.tenant.members({ limit: 50 });
```

## Profile

| Method | Signature | HTTP | Returns |
| --- | --- | --- | --- |
| `retrieve` | `() => Promise<TenantProfile>` | `GET /tenant` | Profile |
| `update` | `({ name }) => Promise<TenantProfile>` | `PATCH /tenant/edit` | Profile |
| `view` | `(hex) => Promise<TenantProfile>` | `GET /tenant/view/{hex}` | Profile |
| `bySlug` | `(slug) => Promise<TenantSummary>` | `GET /tenant/view/slug/{slug}` | Summary |

### `TenantProfile`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `kind` | `string` |
| `name` | `string` |
| `slug` | `string` |
| `plan` | `string` |
| `state` | `string` |
| `domain` | `string?` |
| `customer` | `string?` |
| `subscription` | `string?` |
| `trial` | `string?` |
| `meta` | `object?` |
| `created` | `string` |
| `users` | `number` |
| `domains` | `number` |
| `storage` | `number` |

### `TenantSummary`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `name` | `string` |
| `slug` | `string` |
| `kind` | `string` |
| `state` | `string` |
| `created` | `string` |

## Members

| Method | Returns |
| --- | --- |
| `members(query?)` | `Promise<Page<Member>>` |
| `activeMembers(query?)` | `Promise<Page<Member>>` |
| `owners(query?)` | `Promise<Page<Member>>` |
| `searchMembers(q)` | `Promise<Page<Member>>` |
| `invite({ email, role? })` | `Promise<{ invite: string; token: string }>` |
| `removeMember(user)` | `Promise<{ ok: boolean }>` |

### `Member`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `email` | `string` |
| `name` | `string` |
| `avatar` | `string?` |
| `owner` | `boolean` |
| `state` | `string` |
| `last` | `string?` |
| `created` | `string` |
| `tenant` | `object` |
| `role` | `object` |

## Domains

| Method | Returns |
| --- | --- |
| `createDomain({ name, kind, selector?, meta? })` | `Promise<{ hex: string }>` |
| `domains(query?)` | `Promise<Page<Domain>>` |
| `retrieveDomain(hex)` | `Promise<Domain>` |
| `deleteDomain(hex)` | `Promise<{ ok: boolean }>` |

### `Domain`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `name` | `string` |
| `kind` | `string` |
| `status` | `string` |
| `selector` | `string?` |
| `dkim` | `string?` |
| `spf` | `object?` |
| `dmarc` | `object?` |
| `verified` | `string?` |
| `created` | `string` |
| `mailboxes` | `number?` |

## Quotas, rules, webhooks, usage, security

| Method | Returns |
| --- | --- |
| `invitations(query?)` | `Promise<Page<Invitation>>` |
| `quotas(query?)` | `Promise<Page<Quota>>` |
| `createQuota({ metric, ceiling, … })` | `Promise<Quota>` |
| `rules(query?)` | `Promise<Page<Rule>>` |
| `createRule({ name, target, pattern, score, active, meta? })` | `Promise<Rule>` |
| `retrieveRule(hex)` | `Promise<RuleDetail>` |
| `webhooks(query?)` | `Promise<Page<Webhook>>` |
| `createWebhook({ url, secret, events, … })` | `Promise<{ hex: string }>` |
| `retrieveWebhook(hex)` | `Promise<WebhookDetail>` |
| `deleteWebhook(hex)` | `Promise<{ ok: boolean }>` |
| `security()` | `Promise<Security>` |
| `usage(query?)` | `Promise<Page<Usage>>` |
| `usageSummary()` | `Promise<Usage[]>` |

### `Quota`

| Field | Type |
| --- | --- |
| `tenant` | `string` |
| `metric` | `string` |
| `ceiling` | `number` |
| `expires` | `string?` |
| `created` | `string` |

### `Usage`

| Field | Type |
| --- | --- |
| `tenant` | `string` |
| `metric` | `string` |
| `window` | `string` |
| `value` | `number` |
| `ceiling` | `number` |

### `Security`

| Field | Type |
| --- | --- |
| `mtasts` | `{ domain, policy, expires }[]` |
| `tlsa` | `{ host, port, records, expires }[]` |
| `bimi` | `{ domain, location?, vmc?, expires }[]` |
| `reports` | `{ hex, kind, domain, period, received }[]` |

### `WebhookDetail`

| Field | Type |
| --- | --- |
| `hex` | `string` |
| `url` | `string` |
| `active` | `boolean` |
| `secret` | `string?` |
| `events` | `string[]?` |
| `domains` | `string[]?` |
| `meta` | `object?` |
| `created` | `string` |

## Errors

Owner/admin scopes required for many mutations. Throws `HermesError` (`403` / `404` / `400`).
