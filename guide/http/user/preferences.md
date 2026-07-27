# Preferences

## PATCH /user/preferences/info

Auth: Key or Bearer

Body: `{ "language": "string?", "timezone": "string?", "currency": "string?", "theme": "string?" }`

Response: `PreferenceDetail` — hex, user, language?, timezone?, currency?, theme?, notifications, communication, privacy, display, regional, created, updated

## PATCH /user/preferences/notifications

Body: JSON object. Response: `PreferenceDetail`

## PATCH /user/preferences/communication

Body: JSON object. Response: `PreferenceDetail`

## PATCH /user/preferences/privacy

Body: JSON object. Response: `PreferenceDetail`

## PATCH /user/preferences/display

Body: JSON object. Response: `PreferenceDetail`

## PATCH /user/preferences/regional

Body: JSON object. Response: `PreferenceDetail`