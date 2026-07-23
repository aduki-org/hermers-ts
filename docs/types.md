# Types & Data Models Reference

Reference guide for core models, DTOs, and enums across `@hermers/sdk` and `@hermers/grpc`.

## Enums

### `Flag` (gRPC / Mail)
- `SEEN = 0`
- `ANSWERED = 1`
- `FLAGGED = 2`
- `DELETED = 3`
- `DRAFT = 4`

### `Verdict` (Spam)
- `CLEAN = 0`
- `SPAM = 1`
- `BULK = 2`

### `Plan` (Tier)
- `FREE = 0`
- `STARTER = 1`
- `PRO = 2`
- `BUSINESS = 3`
- `ENTERPRISE = 4`

## Data Models

### `Page<T>`
Pagination envelope returned by list endpoints:
- `items`: `T[]`
- `total`: `number`
- `next?`: `string`
- `page?`: `number`
- `pages?`: `number`

### `Token`
- `token`: `string`
- `refresh`: `string`
- `expires`: `string`

### `TenantProfile`
- `hex`: `string`
- `kind`: `string`
- `name`: `string`
- `slug`: `string`
- `plan`: `string`
- `state`: `string`
- `created`: `string`
- `users`: `number`
- `domains`: `number`
- `storage`: `number`

### `Member`
- `hex`: `string`
- `email`: `string`
- `name`: `string`
- `owner`: `boolean`
- `state`: `string`
- `created`: `string`

### `Message`
- `hex`: `string`
- `uid`: `number`
- `subject?`: `string`
- `sender?`: `string`
- `size`: `number`
- `flags?`: `string[]`
- `date`: `string`

### `Mailbox`
- `hex`: `string`
- `name`: `string`
- `delimiter`: `string`
- `uidvalidity`: `number`
- `uidnext`: `number`
- `messages`: `number`
- `unread`: `number`
- `size`: `number`
- `created`: `string`

### `Contact`
- `hex`: `string`
- `etag`: `string`
- `name?`: `string`
- `emails?`: `string[]`
- `phones?`: `string[]`
- `groups?`: `string[]`
- `created`: `string`

### `Appointment`
- `hex`: `string`
- `tenant`: `string`
- `service`: `string`
- `host`: `string`
- `start`: `string`
- `end`: `string`
- `timezone`: `string`
- `status`: `string`
- `created`: `string`

### `Service`
- `hex`: `string`
- `name`: `string`
- `slug`: `string`
- `duration`: `number`
- `active?`: `boolean`
- `created?`: `string`
