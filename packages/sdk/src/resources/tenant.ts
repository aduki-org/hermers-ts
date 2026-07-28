import type { HttpClient } from '../http/client.js';
import type {
  Audit,
  AuditDetail,
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
  WebhookModel,
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

  /** Promote tenant plan (owner-only). */
  promote(): Promise<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>('/tenant/promote');
  }

  /** Transfer ownership between users. */
  transfer(tenant: string, from: string, to: string): Promise<null> {
    return this.http.post<null>(`/tenant/transfer/${tenant}/${from}/${to}`);
  }

  view(hex: string): Promise<TenantProfile> {
    return this.http.get<TenantProfile>(`/tenant/view/${hex}`);
  }

  bySlug(slug: string): Promise<TenantSummary> {
    return this.http.get<TenantSummary>(`/tenant/view/slug/${slug}`);
  }

  viewAudit(hex: string): Promise<AuditDetail> {
    return this.http.get<AuditDetail>(`/tenant/view/audit/${hex}`);
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
    kind?: string;
    selector?: string;
    meta?: Record<string, unknown>;
  }): Promise<{ hex: string }> {
    return this.http.post<{ hex: string }>('/tenant/domains', data);
  }

  domains(query?: ListQuery): Promise<Page<Domain>> {
    return this.http.get<Page<Domain>>('/tenant/domains', { query });
  }

  activeDomains(query?: ListQuery): Promise<Page<Domain>> {
    return this.http.get<Page<Domain>>('/tenant/domains/active', { query });
  }

  pendingDomains(query?: ListQuery): Promise<Page<Domain>> {
    return this.http.get<Page<Domain>>('/tenant/domains/pending', { query });
  }

  /** GET with JSON body `{ status }` (server contract). */
  domainsByStatus(status: string, query?: ListQuery): Promise<Page<Domain>> {
    return this.http.request<Page<Domain>>('GET', '/tenant/domains/status', { status }, { query });
  }

  domainByName(name: string): Promise<Domain> {
    return this.http.get<Domain>(`/tenant/domains/name/${encodeURIComponent(name)}`);
  }

  /** GET with JSON body `{ name }` (server contract). */
  lookupDomainByName(name: string): Promise<Domain> {
    return this.http.request<Domain>('GET', '/tenant/domains/lookup/name', { name });
  }

  retrieveDomain(hex: string): Promise<Domain> {
    return this.http.get<Domain>(`/tenant/domains/${hex}`);
  }

  updateDomainKind(hex: string, kind: string): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/domains/${hex}/kind`, { kind });
  }

  updateDomainName(hex: string, name: string): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/domains/${hex}/name`, { name });
  }

  updateDomainStatus(
    hex: string,
    data: { status: string; verified?: string }
  ): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/domains/${hex}/status`, data);
  }

  updateDomainDkim(hex: string, dkim: string): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/domains/${hex}/dkim`, { dkim });
  }

  updateDomainSelector(hex: string, selector: string): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/domains/${hex}/selector`, { selector });
  }

  updateDomainAuth(
    hex: string,
    data: {
      spf: Record<string, unknown>;
      dmarc: Record<string, unknown>;
      mta_sts: Record<string, unknown>;
      bimi: Record<string, unknown>;
    }
  ): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/domains/${hex}/auth`, data);
  }

  updateDomainMeta(hex: string, meta: Record<string, unknown>): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/domains/${hex}/meta`, { meta });
  }

  deleteDomain(hex: string): Promise<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`/tenant/domains/${hex}`);
  }

  // —— Audits ——

  audits(query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>('/tenant/audits', { query });
  }

  auditsByAction(action: string, query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>(
      `/tenant/audits/action/${encodeURIComponent(action)}`,
      { query }
    );
  }

  failedAudits(query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>('/tenant/audits/failed', { query });
  }

  successfulAudits(query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>('/tenant/audits/successful', { query });
  }

  auditsByIp(ip: string, query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>(`/tenant/audits/ip/${encodeURIComponent(ip)}`, {
      query,
    });
  }

  auditsByUser(user: string, query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>(`/tenant/audits/user/${user}`, { query });
  }

  auditsByUserAction(user: string, action: string, query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>(
      `/tenant/audits/user/${user}/action/${encodeURIComponent(action)}`,
      { query }
    );
  }

  failedAuditsByUser(user: string, query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>(`/tenant/audits/user/${user}/failed`, { query });
  }

  successfulAuditsByUser(user: string, query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>(`/tenant/audits/user/${user}/successful`, { query });
  }

  auditsByUserIp(user: string, ip: string, query?: ListQuery): Promise<Page<Audit>> {
    return this.http.get<Page<Audit>>(
      `/tenant/audits/user/${user}/ip/${encodeURIComponent(ip)}`,
      { query }
    );
  }

  // —— Invitations / quotas / rules / webhooks ——

  invitations(query?: ListQuery): Promise<Page<Invitation>> {
    return this.http.get<Page<Invitation>>('/tenant/invitations', { query });
  }

  pendingInvitations(query?: ListQuery): Promise<Page<Invitation>> {
    return this.http.get<Page<Invitation>>('/tenant/invitations/pending', { query });
  }

  expiredInvitations(query?: ListQuery): Promise<Page<Invitation>> {
    return this.http.get<Page<Invitation>>('/tenant/invitations/expired', { query });
  }

  invitationsByStatus(status: string, query?: ListQuery): Promise<Page<Invitation>> {
    return this.http.get<Page<Invitation>>(
      `/tenant/invitations/status/${encodeURIComponent(status)}`,
      { query }
    );
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

  retrieveQuota(metric: string): Promise<Quota> {
    return this.http.get<Quota>(`/tenant/quotas/${encodeURIComponent(metric)}`);
  }

  updateQuotaCeiling(metric: string, ceiling: number): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(
      `/tenant/quotas/${encodeURIComponent(metric)}/ceiling`,
      { ceiling }
    );
  }

  updateQuotaExpires(metric: string, expires: string): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(
      `/tenant/quotas/${encodeURIComponent(metric)}/expires`,
      { expires }
    );
  }

  updateQuotaReason(metric: string, reason: string): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(
      `/tenant/quotas/${encodeURIComponent(metric)}/reason`,
      { reason }
    );
  }

  deleteQuota(metric: string): Promise<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`/tenant/quotas/${encodeURIComponent(metric)}`);
  }

  rules(query?: ListQuery): Promise<Page<Rule>> {
    return this.http.get<Page<Rule>>('/tenant/rules', { query });
  }

  activeRules(query?: ListQuery): Promise<Page<Rule>> {
    return this.http.get<Page<Rule>>('/tenant/rules/active', { query });
  }

  rulesByTarget(target: string, query?: ListQuery): Promise<Page<Rule>> {
    return this.http.get<Page<Rule>>(
      `/tenant/rules/target/${encodeURIComponent(target)}`,
      { query }
    );
  }

  createRule(data: {
    name: string;
    target: string;
    pattern: string;
    score: number;
    active?: boolean;
    meta?: Record<string, unknown>;
  }): Promise<Rule> {
    return this.http.post<Rule>('/tenant/rules', data);
  }

  getRule(hex: string): Promise<Rule> {
    return this.http.get<Rule>(`/tenant/rules/${hex}`);
  }

  ruleByName(name: string): Promise<Rule> {
    return this.http.get<Rule>(`/tenant/rules/name/${encodeURIComponent(name)}`);
  }

  /** Detail view — same path as before (`/tenant/rules/{hex}/detail`). */
  retrieveRule(hex: string): Promise<RuleDetail> {
    return this.http.get<RuleDetail>(`/tenant/rules/${hex}/detail`);
  }

  updateRuleActive(hex: string, active: boolean): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/rules/${hex}/active`, { active });
  }

  updateRuleName(hex: string, name: string): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/rules/${hex}/name`, { name });
  }

  updateRulePattern(hex: string, pattern: string): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/rules/${hex}/pattern`, { pattern });
  }

  updateRuleScore(hex: string, score: number): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/rules/${hex}/score`, { score });
  }

  updateRuleTarget(hex: string, target: string): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/rules/${hex}/target`, { target });
  }

  deleteRule(hex: string): Promise<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`/tenant/rules/${hex}`);
  }

  // —— Webhooks ——

  webhooks(query?: ListQuery): Promise<Page<Webhook>> {
    return this.http.get<Page<Webhook>>('/tenant/webhooks', { query });
  }

  activeWebhooks(query?: ListQuery): Promise<Page<Webhook>> {
    return this.http.get<Page<Webhook>>('/tenant/webhooks/active', { query });
  }

  webhookSubscribers(event: string, query?: ListQuery): Promise<Page<Webhook>> {
    return this.http.get<Page<Webhook>>(
      `/tenant/webhooks/subscribers/${encodeURIComponent(event)}`,
      { query }
    );
  }

  createWebhook(data: {
    url: string;
    secret: string;
    events?: string[];
    domains?: string[];
    active?: boolean;
    meta?: Record<string, unknown>;
  }): Promise<{ hex: string }> {
    return this.http.post<{ hex: string }>('/tenant/webhooks', data);
  }

  /** Full webhook model (includes `secret`). */
  retrieveWebhook(hex: string): Promise<WebhookModel> {
    return this.http.get<WebhookModel>(`/tenant/webhooks/${hex}`);
  }

  /** Detail view (events + nested tenant; no secret). */
  detailWebhook(hex: string): Promise<WebhookDetail> {
    return this.http.get<WebhookDetail>(`/tenant/webhooks/${hex}/detail`);
  }

  updateWebhookActive(hex: string, active: boolean): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/webhooks/${hex}/active`, { active });
  }

  updateWebhookDomains(hex: string, domains: string[]): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/webhooks/${hex}/domains`, { domains });
  }

  updateWebhookEvents(hex: string, events: string[]): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/webhooks/${hex}/events`, { events });
  }

  updateWebhookSecret(hex: string, secret: string): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/webhooks/${hex}/secret`, { secret });
  }

  updateWebhookUrl(hex: string, url: string): Promise<{ ok: boolean }> {
    return this.http.patch<{ ok: boolean }>(`/tenant/webhooks/${hex}/url`, { url });
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

  usageByMetric(metric: string, query?: ListQuery): Promise<Page<Usage>> {
    return this.http.get<Page<Usage>>(
      `/tenant/usage/metric/${encodeURIComponent(metric)}`,
      { query }
    );
  }
}
