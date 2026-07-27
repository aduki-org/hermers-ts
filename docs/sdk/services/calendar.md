# Calendar (`hermes.calendar`)

CalDAV calendar collections under `/user/calendars`.

```ts
const page = await hermes.calendar.list();
await hermes.calendar.create({ name: 'Work', color: '#336699' });
```

API reference: [guide/http/user/calendars.md](../../../guide/http/user/calendars.md).
