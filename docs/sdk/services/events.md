# Events Service (`@hermers/sdk`)

Package: `@hermers/sdk`  
Property: `hermes.events`

Manages CalDAV events, single and recurring iCalendar objects.

---

## Methods & Signatures

### `list(options?: { calendar?: string; start?: string; end?: string }): Promise<{ items: Event[] }>`

Lists events across calendars within an optional date range.

- **Parameters:**
  - `options.calendar` (`string`, optional): Target calendar hex ID filter.
  - `options.start` (`string`, optional): ISO 8601 start time threshold.
  - `options.end` (`string`, optional): ISO 8601 end time threshold.
- **Return Type:** `Promise<{ items: Event[] }>`

```ts
export interface Event {
  hex: string;
  uid: string;
  start?: string;
  end?: string;
  summary?: string;
  description?: string;
  location?: string;
  attendees?: string[];
  recurring?: boolean;
  ical?: string;
  created: string;
}
```

---

### `get(hex: string): Promise<Event>`

Retrieves event detail by hex ID.

- **Parameters:**
  - `hex` (`string`): Target event hex ID.
- **Return Type:** `Promise<Event>`

---

### `create(data: { calendar: string; summary: string; start: string; end: string; location?: string; description?: string }): Promise<Event>`

Creates a new calendar event.

- **Parameters:**
  - `data.calendar` (`string`): Target calendar hex ID.
  - `data.summary` (`string`): Event title/summary.
  - `data.start` (`string`): ISO 8601 start timestamp.
  - `data.end` (`string`): ISO 8601 end timestamp.
  - `data.location` (`string`, optional): Event location string.
  - `data.description` (`string`, optional): Event description text.
- **Return Type:** `Promise<Event>`

---

### `remove(hex: string): Promise<void>`

Deletes an event by hex ID.

- **Parameters:**
  - `hex` (`string`): Target event hex ID.
- **Return Type:** `Promise<void>`
