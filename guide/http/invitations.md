# Invitations

## GET /tenant/invitations

Auth: Key or Bearer (scope: `invitations:read`)

Query: `?after={hex}&limit=N`

Response: `Page<Invitations>` — hex, email, label, status, expires (datetime), created (datetime), inviter (object), total (i64)

## GET /tenant/invitations/pending

Same type.

## GET /tenant/invitations/expired

Same type.

## GET /tenant/invitations/status/{status}

Same type.