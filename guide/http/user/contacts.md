# Contacts

> **Tenant / user:** create and list use the authenticated session’s tenant and user.
> Do not send tenant or user hex in the body — the server takes them from the session
> (fixed; SDK callers never pass them either).

## POST /user/contacts

Auth: Key or Bearer (scope: `contacts:write`)

Body: `Create` — `{ "vcard": "string", "name": "string?", "emails": ["string"]?, "phones": ["string"]?, "groups": ["string"]?, "meta": "object?" }`

Response 200: `ContactDetail` *(hex, etag, vcard?, name?, emails, phones, groups, meta?, created, user)*

## GET /user/contacts

Auth: Key or Bearer

Query: `?after={hex}&limit=N&group={name}&search={q}`

Response 200: `Page<Contacts>`

**Contacts:**
| Field | Type |
|---|---|
| hex | string |
| etag | string |
| name | string? |
| emails | [string?] |
| phones | [string?] |
| groups | [string?] |
| created | datetime |
| total | i64 |

## GET /user/contacts/group/{group}

Same type.

## GET /user/contacts/search/{q}

Same type.

## GET /user/contacts/{hex}

Response 200: `ContactDetail`

## PATCH /user/contacts/{hex}/vcard

Body: `{ "vcard": "string" }`. Response: `{ "ok": true }`

## PATCH /user/contacts/{hex}/emails

Body: `{ "emails": ["string"] }`. Response: `{ "ok": true }`

## PATCH /user/contacts/{hex}/phones

Body: `{ "phones": ["string"] }`. Response: `{ "ok": true }`

## PATCH /user/contacts/{hex}/groups

Body: `{ "groups": ["string"] }`. Response: `{ "ok": true }`

## PATCH /user/contacts/{hex}/meta

Body: `{ "meta": object }`. Response: `{ "ok": true }`

## DELETE /user/contacts/{hex}

Response 200: `{ "ok": true }`