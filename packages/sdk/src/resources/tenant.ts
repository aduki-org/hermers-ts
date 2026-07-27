import type { HttpClient } from '../http/client.js';
import type {
  Domain,
  Invitation,
  ListQuery,
  Member,
  Page,
  Quota,
  Rule,
  RuleDetail,
  Security,
  Tenant,
  TenantProfile,
  TenantSummary,
  Usage,
  Webhook,
  WebhookDetail,
} from '../types/index.js';

/** Tenant administration (`/tenant/*`). No signup/password flows. */
export class TenantResource {
  constructor(private readonly http: HttpClient) {}

  retrieve(): Promise<TenantProfile> {
    return this.http.get<TenantProfile>('/tenant');
  }

  /** Returns full Tenant model (includes `id`, `updated`, billing fields). */
  update(data: { name: string }): Promise<Tenant> {
    return this.http.patch<Tenant>('/tenant/edit', data);
  }

  view(hex: string): Promise<TenantProfile> {
    return this.http.get<TenantProfile>(`/tenant/view/${hex}`);
  }

  bySlug(slug: string): Promise<TenantSummary> {
    return this.http.get<TenantSummary>(`/tenant/view/slug/${slug}`);
  }

  // —— Members ——

  members(query?: ListQuery): Promise<Page<Member>> {
    return this.http.get<Page<Member>>('/tenant/members', { query });
  }

  activeMembers(query?: ListQuery): Promise<Page<Member>> {
    return this.http.get<Page<Member>>('/tenant/members/active', { query });
  }

  owners(query?: ListQuery): Promise<Page<Member>> {
    return this.http.get<Page<Member>>('/tenant/members/owners', { query });
  }

  searchMembers(q: string): Promise<Page<Member>> {
    return this.http.get<Page<Member>>(`/tenant/members/search/${encodeURIComponent(q)}`);
  }

  invite(data: { email: string; role?: string }): Promise<{ invite: string; token: string }> {
    return this.http.post('/tenant/invite', data);
  }

  removeMember(user: string): Promise<null> {
    return this.http.delete<null>(`/tenant/members/${user}`);
  }

  // —— Domains ——

  createDomain(data: {
    name: string;
    kind: string;
    selector?: string;
    meta?: Record<string, unknown>;
  }): Promise<{ hex: string }> {
    return this.http.post<{ hex: string }>('/tenant/domains', data);
  }

  domains(query?: ListQuery): Promise<Page<Domain>> {
    return this.http.get<Page<Domain>>('/tenant/domains', { query });
  }

  retrieveDomain(hex: string): Promise<Domain> {
    return this.http.get<Domain>(`/tenant/domains/${hex}`);
  }

  deleteDomain(hex: string): Promise<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`/tenant/domains/${hex}`);
  }

  // —— Invitations / quotas / rules / webhooks ——

  invitations(query?: ListQuery): Promise<Page<Invitation>> {
    return this.http.get<Page<Invitation>>('/tenant/invitations', { query });
  }

  quotas(query?: ListQuery): Promise<Page<Quota>> {
    return this.http.get<Page<Quota>>('/tenant/quotas', { query });
  }

  createQuota(data: {
    metric: string;
    ceiling: number;
    reason?: string;
    granted?: string;
    expires?: string;
  }): Promise<Quota> {
    return this.http.post<Quota>('/tenant/quotas', data);
  }

  rules(query?: ListQuery): Promise<Page<Rule>> {
    return this.http.get<Page<Rule>>('/tenant/rules', { query });
  }

  createRule(data: {
    name: string;
    target: string;
    pattern: string;
    score: number;
    active: boolean;
    meta?: Record<string, unknown>;
  }): Promise<Rule> {
    return this.http.post<Rule>('/tenant/rules', data);
  }

  retrieveRule(hex: string): Promise<RuleDetail> {
    return this.http.get<RuleDetail>(`/tenant/rules/${hex}/detail`);
  }

  webhooks(query?: ListQuery): Promise<Page<Webhook>> {
    return this.http.get<Page<Webhook>>('/tenant/webhooks', { query });
  }

  createWebhook(data: {
    url: string;
    secret: string;
    events: string[];
    domains?: string[];
    active?: boolean;
    meta?: Record<string, unknown>;
  }): Promise<{ hex: string }> {
    return this.http.post<{ hex: string }>('/tenant/webhooks', data);
  }

  retrieveWebhook(hex: string): Promise<WebhookDetail> {
    return this.http.get<WebhookDetail>(`/tenant/webhooks/${hex}`);
  }

  deleteWebhook(hex: string): Promise<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`/tenant/webhooks/${hex}`);
  }

  security(): Promise<Security> {
    return this.http.get<Security>('/tenant/security');
  }

  usage(query?: ListQuery): Promise<Page<Usage>> {
    return this.http.get<Page<Usage>>('/tenant/usage', { query });
  }

  usageSummary(): Promise<Usage[]> {
    return this.http.get<Usage[]>('/tenant/usage/summary');
  }
}
