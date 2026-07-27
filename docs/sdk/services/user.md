# User (`hermes.user`)

Authenticated user profile under `/user`.

## Methods

| Method | HTTP |
| --- | --- |
| `retrieve()` | `GET /user` |
| `lookupByEmail(email)` | `POST /user/lookup/email` |
| `updateInfo({ name? })` | `PATCH /user/info` |
| `updateEmail(email)` | `PATCH /user/email` |
| `updatePhone(phone)` | `PATCH /user/phone` |
| `updateMeta(meta)` | `PATCH /user/meta` |
| `updateAvatar(avatar)` | `PATCH /user/avatar` |
| `activeSessions(query?)` | `GET /user/sessions/active` |
| `audits(query?)` | `GET /user/audits` |
| `updatePreferences(section, data)` | `PATCH /user/preferences/{section}` |

```ts
const profile = await hermes.user.retrieve();
await hermes.user.updateInfo({ name: 'Ada' });
```
