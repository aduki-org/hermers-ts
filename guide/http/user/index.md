# User Service (HTTP)

All paths prefixed `/user`. Auth: `Authorization: Key {key}` unless noted.

---

## Profile

`GET /user` — `UserProfile`
`POST /user/lookup/email` — `UserProfile`
`POST /user/lookup/profile` — `UserProfile`
`PATCH /user/info` — `UserProfile`
`PATCH /user/email` — `UserProfile`
`PATCH /user/phone` — `UserProfile`
`PATCH /user/password` — `UserProfile`
`PATCH /user/meta` — `UserProfile`
`PATCH /user/avatar` — `UserProfile`
`PATCH /user/state` — `UserProfile`
`PATCH /user/totp` — `UserProfile`
`PATCH /user/login` — `UserProfile`

## Mail

`POST /user/mail/send` — `{hex}`
`GET /user/mail/inbox` — `Page<Messages>`
`GET /user/mail/inbox/unread` — `Page<Messages>`
`GET /user/mail/inbox/flagged` — `Page<Messages>`
`GET /user/mail/inbox/attachments` — `Page<Messages>`
`GET /user/mail/inbox/sender/{sender}` — `Page<Messages>`
`GET /user/mail/sent` — `Page<Messages>`
`GET /user/mail/sent/recipient/{recipient}` — `Page<Messages>`
`GET /user/mail/draft` — `Page<Messages>`
`GET /user/mail/trash` — `Page<Messages>`
`GET /user/mail/starred` — `Page<Messages>`
`GET /user/mail/spam` — `Page<Messages>`
`GET /user/mail/spam/scored/{score}` — `Page<Messages>`
`GET /user/mail/folder/{folder}` — `Page<Messages>`
`GET /user/mail/folder/{folder}/unread` — `Page<Messages>`
`GET /user/mail/folder/{folder}/flagged` — `Page<Messages>`
`GET /user/mail/search/{q}` — `Page<Messages>`
`POST /user/mail/search/{q}/advanced` — `Page<Messages>`
`GET /user/mail/threads` — `Page<Threads>`
`GET /user/mail/thread/{thread}` — `Page<Messages>`
`GET /user/mail/{hex}` — `MessageDetail`
`DELETE /user/mail/{hex}` — empty
`DELETE /user/mail/mailbox/{mailbox}` — empty
`PATCH /user/mail/{hex}/flags` — empty

## Mailbox

`POST /user/mailbox` — `Mailbox`
`GET /user/mailbox` — `Page<Mailboxes>`
`GET /user/mailbox/unread` — `Page<Mailboxes>`
`GET /user/mailbox/empty` — `Page<Mailboxes>`
`GET /user/mailbox/name/{name}` — `Page<Mailboxes>`
`GET /user/mailbox/messages/{mailbox}` — `Page<Mailboxes>`
`GET /user/mailbox/search/{q}` — `Page<Mailboxes>`
`PATCH /user/mailbox/{hex}/basic` — `Mailbox`
`PATCH /user/mailbox/{hex}/role` — `Mailbox`
`PATCH /user/mailbox/{hex}/name` — `Mailbox`
`PATCH /user/mailbox/{hex}/uidnext` — `Mailbox`
`PATCH /user/mailbox/{hex}/flags` — `Mailbox`
`PATCH /user/mailbox/{hex}/subscribed` — `Mailbox`
`PATCH /user/mailbox/{hex}/parent` — `Mailbox`
`PATCH /user/mailbox/{hex}/quota` — `Mailbox`
`PATCH /user/mailbox/{hex}/acl` — `Mailbox`
`PATCH /user/mailbox/{hex}/meta` — `Mailbox`
`DELETE /user/mailbox/{hex}` — empty

## Contacts

`POST /user/contacts` — `ContactDetail`
`GET /user/contacts` — `Page<Contacts>`
`GET /user/contacts/group/{group}` — `Page<Contacts>`
`GET /user/contacts/search/{q}` — `Page<Contacts>`
`GET /user/contacts/{hex}` — `ContactDetail`
`PATCH /user/contacts/{hex}/vcard` — `{ok: true}`
`PATCH /user/contacts/{hex}/emails` — `{ok: true}`
`PATCH /user/contacts/{hex}/phones` — `{ok: true}`
`PATCH /user/contacts/{hex}/groups` — `{ok: true}`
`PATCH /user/contacts/{hex}/meta` — `{ok: true}`
`DELETE /user/contacts/{hex}` — `{ok: true}`

## Calendars

`GET /user/calendars` — `Page<Calendars>`
`GET /user/calendars/search/{q}` — `Page<Calendars>`
`POST /user/calendars` — `{hex}`
`GET /user/calendars/events` — `Page<Events>`

## Events

`GET /user/events` — `Page<Events>`
`GET /user/events/range/{start}/{end}` — `Page<Events>`
`GET /user/events/recurring` — `Page<Events>`
`GET /user/events/search/{q}` — `Page<Events>`
`GET /user/events/upcoming` — `Page<Events>`
`GET /user/events/past` — `Page<Events>`
`POST /user/events` — `{hex, etag, uid}`
`PATCH /user/events/{hex}` — `{hex, etag, uid}`
`DELETE /user/events/{hex}` — empty

## Feeds

`POST /user/feeds` — `Feed`
`GET /user/feeds` — `Vec<Feed>`
`GET /user/feeds/{hex}` — `Feed`
`DELETE /user/feeds/{hex}` — empty

## Appointments

`POST /user/appointments` — `Appointment`
`GET /user/appointments` — `Page<Appointment>`
`GET /user/appointments/active` — `Page<Appointment>`
`GET /user/appointments/{hex}` — `Appointment`
`PATCH /user/appointments/{hex}/status` — `{ok: true}`
`PATCH /user/appointments/{hex}/cancel` — `{ok: true}`
`DELETE /user/appointments/{hex}` — `{ok: true}`

## Guests

`GET /user/appointments/{hex}/guests` — `Vec<Guest>`

## Services

`POST /user/services` — `Service`
`GET /user/services` — `Vec<Service>`
`GET /user/services/{hex}` — `Service`
`DELETE /user/services/{hex}` — empty

## Windows

`GET /user/windows` — `Vec<Window>`

## Overrides

`GET /user/overrides` — `Vec<Override>`

## Availability

`GET /user/availability/{start}/{end}` — `Availability`

## Sessions

`GET /user/sessions/active` — `Page<Sessions>`
`GET /user/sessions/method/{method}` — `Page<Sessions>`

## Audits

`GET /user/audits` — `Page<Audits>`
`GET /user/audits/action/{action}` — `Page<Audits>`
`GET /user/audits/failed` — `Page<Audits>`
`GET /user/audits/successful` — `Page<Audits>`
`GET /user/audits/ip/{ip}` — `Page<Audits>`

## Keys

`GET /user/keys` — `Page<Keys>`

## Preferences

`PATCH /user/preferences/info` — `PreferenceDetail`
`PATCH /user/preferences/notifications` — `PreferenceDetail`
`PATCH /user/preferences/communication` — `PreferenceDetail`
`PATCH /user/preferences/privacy` — `PreferenceDetail`
`PATCH /user/preferences/display` — `PreferenceDetail`
`PATCH /user/preferences/regional` — `PreferenceDetail`

## JMAP

No JMAP endpoints implemented.
