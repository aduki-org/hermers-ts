export function timestamp(val?: string | number | Date, field = 'timestamp'): string {
  if (val === undefined || val === null) {
    return new Date().toISOString();
  }
  const d = new Date(val);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid timestamp for '${field}': ${val}`);
  }
  return d.toISOString();
}

export function hex(val?: string, field = 'hex', prefix?: string): string {
  if (!val || typeof val !== 'string' || val.trim().length === 0) {
    throw new Error(`Invalid hex ID for '${field}'`);
  }
  const trimmed = val.trim();
  if (prefix && !trimmed.startsWith(prefix)) {
    throw new Error(`Hex ID for '${field}' must start with prefix '${prefix}'`);
  }
  return trimmed;
}

export function email(val?: string, field = 'email'): string {
  if (!val || typeof val !== 'string') {
    throw new Error(`Missing required email field '${field}'`);
  }
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(val)) {
    throw new Error(`Invalid email address format for '${field}': ${val}`);
  }
  return val.trim().toLowerCase();
}

export function bytes(val?: Uint8Array | string, field = 'raw'): Uint8Array {
  if (!val) {
    return new Uint8Array();
  }
  if (typeof val === 'string') {
    return new TextEncoder().encode(val);
  }
  if (val instanceof Uint8Array) {
    return val;
  }
  throw new Error(`Invalid byte buffer for field '${field}'`);
}

export function limit(val?: number, max = 200): number {
  if (val === undefined || val === null) return 50;
  if (typeof val !== 'number' || val < 1 || val > max) {
    throw new Error(`Limit must be an integer between 1 and ${max}`);
  }
  return Math.floor(val);
}

export function window(val?: string, field = 'window'): string {
  if (!val || typeof val !== 'string') {
    throw new Error(`Missing required date window field '${field}'`);
  }
  const pattern = /^\d{4}-\d{2}(-\d{2})?$/;
  if (!pattern.test(val.trim())) {
    throw new Error(`Invalid date window format for '${field}' (expected YYYY-MM or YYYY-MM-DD): ${val}`);
  }
  return val.trim();
}
