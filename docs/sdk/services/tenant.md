# Tenant (`hermes.tenant`)

Tenant administration under `/tenant/*`. API keys: [`hermes.keys`](auth.md).

```ts
const tenant = await hermes.tenant.retrieve();
const members = await hermes.tenant.members({ limit: 50 });
```

## Profile

| SDK | HTTP | Returns |
| --- | --- | --- |
| `retrieve()` | `GET /tenant` | `TenantProfile` |
| `update({ name })` | `PATCH /tenant/edit` | full `Tenant` model |
| `view(hex)` | `GET /tenant/view/{hex}` | `TenantProfile` |
| `bySlug(slug)` | `GET /tenant/view/slug/{slug}` | `TenantSummary` |

### `TenantProfile`

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` / `kind` / `name` / `slug` / `plan` / `state` | string | no |
| `domain` / `customer` / `subscription` | string | yes |
| `trial` | datetime | yes |
| `meta` | object | no |
| `created` | datetime | no |
| `users` / `domains` / `storage` | number | no |

`kind`: `personal`\|`team`. `plan`: `free`\|`starter`\|`pro`\|`business`\|`enterprise`. `state`: `active`\|`suspended`\|`pending`\|`deleted`.

## Members — `Page<Members>`

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` / `email` / `name` / `state` | string | no |
| `avatar` | string | yes |
| `owner` | boolean | no |
| `last` | datetime | yes |
| `created` | datetime | no |
| `tenant` | `{ hex, name, slug }` | no |
| `role` | `{ label, kind }` or `{}` | no |
| `total` | number | no |

```json
{
  "hex": "U0X…",
  "email": "ada@example.com",
  "name": "Ada",
  "avatar": null,
  "owner": false,
  "state": "active",
  "last": null,
  "created": "2026-01-01T00:00:00",
  "tenant": { "hex": "T0X…", "name": "Acme", "slug": "acme" },
  "role": { "label": "member", "kind": "permanent" },
  "total": 3
}
```

| SDK | Returns |
| --- | --- |
| `members` / `activeMembers` / `owners` / `searchMembers` | `Page<Members>` |
| `invite({ email, role? })` | `{ invite: string, token: string }` |
| `removeMember(user)` | typically `null` / ack |

## Invitations — `Page<Invitations>`

| Field | Type |
| --- | --- |
| `hex` / `email` / `label` / `status` | string |
| `expires` / `created` | datetime |
| `inviter` | `{ hex, name, email }` |
| `total` | number |

`status`: `pending`\|`accepted`\|`rejected`\|`expired`.

## Domains

**Create body:** `{ name, kind?, selector?, meta? }` → `{ hex }`.  
`kind`: `primary`\|`sending`\|`receiving`\|`alias`.

**List row:** `hex`, `name`, `kind`, `status`, `verified?`, `created`, `tenant: { hex, name, slug }`, `total`.

## Quotas — `Page<Quotas>`

| Field | Type |
| --- | --- |
| `tenant` / `metric` | string |
| `ceiling` | number |
| `expires` | datetime? |
| `created` | datetime |
| `total` | number |

Create body: `{ metric, ceiling, reason?, granted?, expires? }` → full quota model.

## Rules — `Page<Rules>`

| Field | Type |
| --- | --- |
| `hex` / `target` / `pattern` / `name` | string |
| `score` | number |
| `active` | boolean |
| `created` | datetime |
| `tenant` | `{ hex, name }` \| null |
| `total` | number |

`target` values include `header.from`, `header.to`, `body.text`, `envelope.from`, … (see API data validation).

Detail (`RuleDetail`) adds `meta` object.

## Webhooks (`hermes.tenant`)

Scopes: `webhooks:read` / `webhooks:write`. Signing: HMAC-SHA256 via `X-Webhook-Signature`.

```ts
const { hex } = await hermes.tenant.createWebhook({
  url: 'https://api.example.com/hooks/hermes',
  secret: 'whsec_xxxxxxxxxxxxxxxx',
  events: ['message.sent', 'message.received'],
  domains: ['example.com'],
  active: true,
});

const page = await hermes.tenant.webhooks({ limit: 50 });
await hermes.tenant.updateWebhookUrl(hex, 'https://api.example.com/hooks/v2');
await hermes.tenant.deleteWebhook(hex);
```

| SDK | HTTP | Returns |
| --- | --- | --- |
| `webhooks` | `GET /tenant/webhooks` | `Page<Webhook>` |
| `activeWebhooks` | `GET /tenant/webhooks/active` | `Page<Webhook>` |
| `webhookSubscribers(event)` | `GET /tenant/webhooks/subscribers/{event}` | `Page<Webhook>` |
| `createWebhook` | `POST /tenant/webhooks` | `{ hex }` |
| `retrieveWebhook` | `GET /tenant/webhooks/{hex}` | `WebhookModel` (includes `secret`) |
| `detailWebhook` | `GET /tenant/webhooks/{hex}/detail` | `WebhookDetail` (no secret) |
| `updateWebhookActive` | `PATCH …/active` | `{ ok: true }` |
| `updateWebhookDomains` | `PATCH …/domains` | `{ ok: true }` |
| `updateWebhookEvents` | `PATCH …/events` | `{ ok: true }` |
| `updateWebhookSecret` | `PATCH …/secret` | `{ ok: true }` |
| `updateWebhookUrl` | `PATCH …/url` | `{ ok: true }` |
| `deleteWebhook` | `DELETE /tenant/webhooks/{hex}` | `{ ok: true }` |

### Create body

| Field | Type | Required |
| --- | --- | --- |
| `url` | string | yes |
| `secret` | string | yes (16–256 chars) |
| `events` | string[] | no |
| `domains` | string[] | no |
| `active` | boolean | no |
| `meta` | object | no |

### List row — `Webhook`

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` / `url` | string | no |
| `active` | boolean | no |
| `created` | datetime | no |
| `tenant` | `{ hex, name }` | no |
| `total` | number | no |

### Model — `WebhookModel` (`retrieveWebhook`)

| Field | Type |
| --- | --- |
| `id` | number |
| `hex` / `tenant` / `url` / `secret` | string (`tenant` is hex, not nested) |
| `events` / `domains` | `(string\|null)[]` |
| `active` | boolean |
| `meta` | object |
| `created` / `updated` | datetime |

### Detail — `WebhookDetail` (`detailWebhook`)

`hex`, `url`, `events` (jsonb), `active`, `created`, `tenant: { hex, name }` — no `secret`.

## Usage — `Page<Usages>` / summary array

| Field | Type |
| --- | --- |
| `tenant` / `metric` | string |
| `window` | date (`YYYY-MM-DD`) |
| `value` / `ceiling` / `total` | number |

## Security — `GET /tenant/security`

```json
{
  "mtasts": [{ "domain": "…", "policy": {}, "expires": "…" }],
  "tlsa": [{ "host": "…", "port": 25, "records": {}, "expires": "…" }],
  "bimi": [{ "domain": "…", "location": null, "vmc": null, "expires": "…" }],
  "reports": [{ "hex": "…", "kind": "…", "domain": "…", "period": "2026-07-01", "received": "…" }]
}
```

Note REST uses `policy` / `records` objects (not `policyJson` / `recordsJson` — those names are gRPC-generated).


## Admin actions

| SDK | HTTP | Returns |
| --- | --- | --- |
| `promote()` | `POST /tenant/promote` | `{ ok: true }` (owner-only) |
| `transfer(tenant, from, to)` | `POST /tenant/transfer/{tenant}/{from}/{to}` | `null` / empty |
| `viewAudit(hex)` | `GET /tenant/view/audit/{hex}` | `AuditDetail` |

### `AuditDetail`

| Field | Type | Nullable |
| --- | --- | --- |
| `hex` / `action` | string | no |
| `success` | boolean | no |
| `reason` / `ip` / `agent` | string | yes |
| `device` / `meta` / `actor` | object | yes |
| `created` | datetime | no |

## Tenant audits — `Page<Audit>`

| SDK | HTTP |
| --- | --- |
| `audits(query?)` | `GET /tenant/audits` |
| `auditsByAction(action, query?)` | `GET /tenant/audits/action/{action}` |
| `failedAudits` / `successfulAudits` | `GET /tenant/audits/failed` / `…/successful` |
| `auditsByIp(ip, query?)` | `GET /tenant/audits/ip/{ip}` |
| `auditsByUser(user, query?)` | `GET /tenant/audits/user/{user}` |
| `auditsByUserAction(user, action, query?)` | `GET /tenant/audits/user/{user}/action/{action}` |
| `failedAuditsByUser` / `successfulAuditsByUser` | `GET …/user/{user}/failed` / `…/successful` |
| `auditsByUserIp(user, ip, query?)` | `GET /tenant/audits/user/{user}/ip/{ip}` |

List row fields match user audits (`hex`, `action`, `success`, `reason?`, `ip?`, `agent?`, `device?`, `created`, `actor?`, `total`).

## Domain filters & patches

| SDK | HTTP | Returns |
| --- | --- | --- |
| `activeDomains(query?)` | `GET /tenant/domains/active` | `Page<Domain>` |
| `pendingDomains(query?)` | `GET /tenant/domains/pending` | `Page<Domain>` |
| `domainsByStatus(status, query?)` | `GET /tenant/domains/status` with JSON body `{ status }` | `Page<Domain>` |
| `domainByName(name)` | `GET /tenant/domains/name/{name}` | `Domain` |
| `lookupDomainByName(name)` | `GET /tenant/domains/lookup/name` with JSON body `{ name }` | `Domain` |
| `updateDomainKind(hex, kind)` | `PATCH …/{hex}/kind` `{ kind }` | `{ ok: true }` |
| `updateDomainName(hex, name)` | `PATCH …/{hex}/name` `{ name }` | `{ ok: true }` |
| `updateDomainStatus(hex, { status, verified? })` | `PATCH …/{hex}/status` | `{ ok: true }` |
| `updateDomainDkim(hex, dkim)` | `PATCH …/{hex}/dkim` `{ dkim }` | `{ ok: true }` |
| `updateDomainSelector(hex, selector)` | `PATCH …/{hex}/selector` `{ selector }` | `{ ok: true }` |
| `updateDomainAuth(hex, { spf, dmarc, mta_sts, bimi })` | `PATCH …/{hex}/auth` | `{ ok: true }` |
| `updateDomainMeta(hex, meta)` | `PATCH …/{hex}/meta` `{ meta }` | `{ ok: true }` |

`status` values: `pending`\|`verified`\|`active`\|`suspended`\|`failed`.

## Invitation filters

| SDK | HTTP | Returns |
| --- | --- | --- |
| `pendingInvitations(query?)` | `GET /tenant/invitations/pending` | `Page<Invitation>` |
| `expiredInvitations(query?)` | `GET /tenant/invitations/expired` | `Page<Invitation>` |
| `invitationsByStatus(status, query?)` | `GET /tenant/invitations/status/{status}` | `Page<Invitation>` |

## Quota by metric

| SDK | HTTP | Returns |
| --- | --- | --- |
| `retrieveQuota(metric)` | `GET /tenant/quotas/{metric}` | `Quota` |
| `updateQuotaCeiling(metric, ceiling)` | `PATCH …/{metric}/ceiling` `{ ceiling }` | `{ ok: true }` |
| `updateQuotaExpires(metric, expires)` | `PATCH …/{metric}/expires` `{ expires }` | `{ ok: true }` |
| `updateQuotaReason(metric, reason)` | `PATCH …/{metric}/reason` `{ reason }` | `{ ok: true }` |
| `deleteQuota(metric)` | `DELETE /tenant/quotas/{metric}` | `{ ok: true }` |

## Rule filters & patches

| SDK | HTTP | Returns |
| --- | --- | --- |
| `activeRules(query?)` | `GET /tenant/rules/active` | `Page<Rule>` |
| `rulesByTarget(target, query?)` | `GET /tenant/rules/target/{target}` | `Page<Rule>` |
| `getRule(hex)` | `GET /tenant/rules/{hex}` | `Rule` |
| `ruleByName(name)` | `GET /tenant/rules/name/{name}` | `Rule` |
| `retrieveRule(hex)` | `GET /tenant/rules/{hex}/detail` | `RuleDetail` |
| `updateRuleActive(hex, active)` | `PATCH …/{hex}/active` `{ active }` | `{ ok: true }` |
| `updateRuleName(hex, name)` | `PATCH …/{hex}/name` `{ name }` | `{ ok: true }` |
| `updateRulePattern(hex, pattern)` | `PATCH …/{hex}/pattern` `{ pattern }` | `{ ok: true }` |
| `updateRuleScore(hex, score)` | `PATCH …/{hex}/score` `{ score }` | `{ ok: true }` |
| `updateRuleTarget(hex, target)` | `PATCH …/{hex}/target` `{ target }` | `{ ok: true }` |
| `deleteRule(hex)` | `DELETE /tenant/rules/{hex}` | `{ ok: true }` |

## Usage by metric

| SDK | HTTP | Returns |
| --- | --- | --- |
| `usageByMetric(metric, query?)` | `GET /tenant/usage/metric/{metric}` | `Page<Usage>` |

## Errors

`{ "error": "…", "message": "…" }` — see [Types](../../types/index.md).
