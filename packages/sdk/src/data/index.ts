export function date(val?: string, field = 'date'): string | undefined {
  if (val === undefined) return undefined;
  const d = new Date(val);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid UTC ISO-8601 date for '${field}': ${val}`);
  }
  return d.toISOString();
}

export function hex(val?: string, field = 'hex', prefix?: string): string | undefined {
  if (val === undefined) return undefined;
  if (typeof val !== 'string' || val.trim().length === 0) {
    throw new Error(`Invalid hex string for '${field}'`);
  }
  if (prefix && !val.startsWith(prefix)) {
    throw new Error(`Hex ID for '${field}' must start with prefix '${prefix}'`);
  }
  return val.trim();
}

export function email(val?: string, field = 'email'): string | undefined {
  if (val === undefined) return undefined;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(val)) {
    throw new Error(`Invalid email address format for '${field}': ${val}`);
  }
  return val.trim().toLowerCase();
}

export function pagination(query?: { limit?: number; page?: number; after?: string }): {
  limit?: number;
  page?: number;
  after?: string;
} {
  if (!query) return {};
  const res: { limit?: number; page?: number; after?: string } = {};

  if (query.limit !== undefined) {
    if (typeof query.limit !== 'number' || query.limit < 1 || query.limit > 200) {
      throw new Error("Pagination 'limit' must be an integer between 1 and 200");
    }
    res.limit = Math.floor(query.limit);
  }

  if (query.page !== undefined) {
    if (typeof query.page !== 'number' || query.page < 1) {
      throw new Error("Pagination 'page' must be an integer >= 1");
    }
    res.page = Math.floor(query.page);
  }

  if (query.after !== undefined) {
    res.after = hex(query.after, 'after');
  }

  return res;
}
