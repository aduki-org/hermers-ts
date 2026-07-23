# Scheduling Service (`@hermers/sdk`)

Package: `@hermers/sdk`  
Property: `hermes.scheduling`

Manages public booking services, appointment slots, and guest scheduling.

---

## Methods & Signatures

### `services(): Promise<{ items: Service[] }>`

Lists booking services configured by the user/tenant.

- **Return Type:** `Promise<{ items: Service[] }>`

```ts
export interface Service {
  hex: string;
  name: string;
  slug: string;
  description?: string;
  duration: number;
  buffer?: number;
  increment?: number;
  active?: boolean;
}
```

---

### `appointments(): Promise<{ items: Appointment[] }>`

Lists scheduled booking appointments.

- **Return Type:** `Promise<{ items: Appointment[] }>`

```ts
export interface Appointment {
  hex: string;
  tenant: string;
  service: string;
  host: string;
  start: string;
  end: string;
  timezone: string;
  status: string;
  created: string;
}
```

---

### `availability(options: { service: string; date: string }): Promise<Availability>`

Queries available booking time slots for a service on a given date (`YYYY-MM-DD`).

- **Parameters:**
  - `options.service` (`string`): Target service hex ID.
  - `options.date` (`string`): Target date (`YYYY-MM-DD`).
- **Return Type:** `Promise<Availability>`

```ts
export interface Availability {
  slots: Array<{ start: string; end: string }>;
}
```
