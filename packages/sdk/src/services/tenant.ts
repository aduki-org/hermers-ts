import { Client } from '../utils/client.js';
import { generateKey, hashKey, prefixKey } from '../utils/crypto.js';
import {
  Audit,
  Domain,
  Invitation,
  Member,
  Page,
  Quota,
  Rule,
  RuleDetail,
  Security,
  TenantProfile,
  Tenant as TenantModel,
  Usage,
  Webhook,
  WebhookDetail,
} from '../types/index.js';

export class Tenant {
  constructor(private client: Client) {}

  async create(data: { email: string; name: string; password: string }): Promise<{ tenant: string; user: Record<string, string> }> {
    return this.client.post('/tenants', data);
  }

  async accept(data: { token: string; name: string; password: string }): Promise<{ user: string; tenant: string }> {
    return this.client.post('/tenants/accept', data);
  }

  async get(): Promise<TenantProfile> {
    return this.client.get<TenantProfile>('/tenant');
  }

  async update(data: { name: string }): Promise<TenantProfile> {
    return this.client.patch<TenantProfile>('/tenant/edit', data);
  }

  async promote(): Promise<{ ok: boolean }> {
    return this.client.post<{ ok: boolean }>('/tenant/promote');
  }

  async view(hex: string): Promise<TenantProfile> {
    return this.client.get<TenantProfile>(`/tenant/view/${hex}`);
  }

  async slug(slug: string): Promise<TenantModel> {
    return this.client.get<TenantModel>(`/tenant/view/slug/${slug}`);
  }

  async audit(hex: string): Promise<Record<string, unknown>> {
    return this.client.get<Record<string, unknown>>(`/tenant/view/audit/${hex}`);
  }

  // Members
  async members(query?: { after?: string; limit?: number; page?: number }): Promise<Page<Member>> {
    return this.client.get<Page<Member>>('/tenant/members', { query });
  }

  async active(query?: { after?: string; limit?: number }): Promise<Page<Member>> {
    return this.client.get<Page<Member>>('/tenant/members/active', { query });
  }

  async owners(query?: { after?: string; limit?: number }): Promise<Page<Member>> {
    return this.client.get<Page<Member>>('/tenant/members/owners', { query });
  }

  async search(q: string): Promise<Page<Member>> {
    return this.client.get<Page<Member>>(`/tenant/members/search/${q}`);
  }

  async invite(data: { email: string; role?: string }): Promise<{ invite: string; token: string }> {
    return this.client.post('/tenant/invite', data);
  }

  async remove(user: string): Promise<{ ok: boolean }> {
    return this.client.remove<{ ok: boolean }>(`/tenant/members/${user}`);
  }

  async transfer(tenant: string, from: string, to: string): Promise<{ ok: boolean }> {
    return this.client.post<{ ok: boolean }>(`/tenant/transfer/${tenant}/${from}/${to}`);
  }

  // Domains
  async createdomain(data: { name: string; kind: string; selector?: string; meta?: Record<string, unknown> }): Promise<{ hex: string }> {
    return this.client.post<{ hex: string }>('/tenant/domains', data);
  }

  async domains(query?: { after?: string; limit?: number }): Promise<Page<Domain>> {
    return this.client.get<Page<Domain>>('/tenant/domains', { query });
  }

  async activedomains(): Promise<Page<Domain>> {
    return this.client.get<Page<Domain>>('/tenant/domains/active');
  }

  async pendingdomains(): Promise<Page<Domain>> {
    return this.client.get<Page<Domain>>('/tenant/domains/pending');
  }

  async domainstatus(status: string): Promise<Page<Domain>> {
    return this.client.get<Page<Domain>>('/tenant/domains/status', { query: { status } });
  }

  async domainname(name: string): Promise<Domain> {
    return this.client.get<Domain>(`/tenant/domains/name/${name}`);
  }

  async lookupdomain(name: string): Promise<Domain> {
    return this.client.get<Domain>('/tenant/domains/lookup/name', { query: { name } });
  }

  async getdomain(hex: string): Promise<Domain> {
    return this.client.get<Domain>(`/tenant/domains/${hex}`);
  }

  async kind(hex: string, kind: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/domains/${hex}/kind`, { kind });
  }

  async renamedomain(hex: string, name: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/domains/${hex}/name`, { name });
  }

  async setdomainstatus(hex: string, status: string, verified?: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/domains/${hex}/status`, { status, verified });
  }

  async dkim(hex: string, dkim: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/domains/${hex}/dkim`, { dkim });
  }

  async selector(hex: string, selector: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/domains/${hex}/selector`, { selector });
  }

  async authdomain(hex: string, auth: Record<string, unknown>): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/domains/${hex}/auth`, auth);
  }

  async metadomain(hex: string, meta: Record<string, unknown>): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/domains/${hex}/meta`, { meta });
  }

  async removedomain(hex: string): Promise<{ ok: boolean }> {
    return this.client.remove<{ ok: boolean }>(`/tenant/domains/${hex}`);
  }

  // Invitations
  async invitations(query?: { after?: string; limit?: number }): Promise<Page<Invitation>> {
    return this.client.get<Page<Invitation>>('/tenant/invitations', { query });
  }

  async pendinginvitations(): Promise<Page<Invitation>> {
    return this.client.get<Page<Invitation>>('/tenant/invitations/pending');
  }

  async expiredinvitations(): Promise<Page<Invitation>> {
    return this.client.get<Page<Invitation>>('/tenant/invitations/expired');
  }

  async invitationstatus(status: string): Promise<Page<Invitation>> {
    return this.client.get<Page<Invitation>>(`/tenant/invitations/status/${status}`);
  }

  // Quotas
  async createquota(data: { metric: string; ceiling: number; reason?: string; granted?: string; expires?: string }): Promise<Quota> {
    return this.client.post<Quota>('/tenant/quotas', data);
  }

  async quotas(query?: { after?: string; limit?: number }): Promise<Page<Quota>> {
    return this.client.get<Page<Quota>>('/tenant/quotas', { query });
  }

  async getquota(metric: string): Promise<Quota> {
    return this.client.get<Quota>(`/tenant/quotas/${metric}`);
  }

  async ceiling(metric: string, ceiling: number): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/quotas/${metric}/ceiling`, { ceiling });
  }

  async expiresquota(metric: string, expires: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/quotas/${metric}/expires`, { expires });
  }

  async reasonquota(metric: string, reason: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/quotas/${metric}/reason`, { reason });
  }

  async removequota(metric: string): Promise<{ ok: boolean }> {
    return this.client.remove<{ ok: boolean }>(`/tenant/quotas/${metric}`);
  }

  // Rules
  async createrule(data: { name: string; target: string; pattern: string; score: number; active: boolean; meta?: Record<string, unknown> }): Promise<Rule> {
    return this.client.post<Rule>('/tenant/rules', data);
  }

  async rules(query?: { after?: string; limit?: number }): Promise<Page<Rule>> {
    return this.client.get<Page<Rule>>('/tenant/rules', { query });
  }

  async activerules(): Promise<Page<Rule>> {
    return this.client.get<Page<Rule>>('/tenant/rules/active');
  }

  async targetrules(target: string): Promise<Page<Rule>> {
    return this.client.get<Page<Rule>>(`/tenant/rules/target/${target}`);
  }

  async namerule(name: string): Promise<Rule> {
    return this.client.get<Rule>(`/tenant/rules/name/${name}`);
  }

  async getrule(hex: string): Promise<Rule> {
    return this.client.get<Rule>(`/tenant/rules/${hex}`);
  }

  async detailrule(hex: string): Promise<RuleDetail> {
    return this.client.get<RuleDetail>(`/tenant/rules/${hex}/detail`);
  }

  async setruleactive(hex: string, active: boolean): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/rules/${hex}/active`, { active });
  }

  async renamerule(hex: string, name: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/rules/${hex}/name`, { name });
  }

  async patternrule(hex: string, pattern: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/rules/${hex}/pattern`, { pattern });
  }

  async scorerule(hex: string, score: number): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/rules/${hex}/score`, { score });
  }

  async setruletarget(hex: string, target: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/rules/${hex}/target`, { target });
  }

  async removerule(hex: string): Promise<{ ok: boolean }> {
    return this.client.remove<{ ok: boolean }>(`/tenant/rules/${hex}`);
  }

  // Keys
  async createkey(data: {
    name: string;
    scopes: string[];
    key?: string;
    meta?: Record<string, unknown>;
    expires?: string;
  }): Promise<{ hex: string; key: string }> {
    const rawKey = data.key ?? generateKey();
    const hash = hashKey(rawKey);
    const prefix = prefixKey(rawKey);

    const payload = {
      name: data.name,
      hash,
      prefix,
      scopes: data.scopes,
      meta: data.meta,
      expires: data.expires,
    };

    const res = await this.client.post<{ hex: string }>('/tenant/keys', payload);
    return {
      hex: res.hex,
      key: rawKey,
    };
  }

  async createwebhook(data: { url: string; secret: string; events: string[]; domains?: string[]; active?: boolean; meta?: Record<string, unknown> }): Promise<{ hex: string }> {
    return this.client.post<{ hex: string }>('/tenant/webhooks', data);
  }

  async webhooks(query?: { after?: string; limit?: number }): Promise<Page<Webhook>> {
    return this.client.get<Page<Webhook>>('/tenant/webhooks', { query });
  }

  async activewebhooks(): Promise<Page<Webhook>> {
    return this.client.get<Page<Webhook>>('/tenant/webhooks/active');
  }

  async subscribers(event: string): Promise<Page<Webhook>> {
    return this.client.get<Page<Webhook>>(`/tenant/webhooks/subscribers/${event}`);
  }

  async getwebhook(hex: string): Promise<WebhookDetail> {
    return this.client.get<WebhookDetail>(`/tenant/webhooks/${hex}`);
  }

  async detailwebhook(hex: string): Promise<WebhookDetail> {
    return this.client.get<WebhookDetail>(`/tenant/webhooks/${hex}/detail`);
  }

  async setwebhookactive(hex: string, active: boolean): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/webhooks/${hex}/active`, { active });
  }

  async webhookdomains(hex: string, domains: string[]): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/webhooks/${hex}/domains`, { domains });
  }

  async webhookevents(hex: string, events: string[]): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/webhooks/${hex}/events`, { events });
  }

  async webhooksecret(hex: string, secret: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/webhooks/${hex}/secret`, { secret });
  }

  async webhookurl(hex: string, url: string): Promise<{ ok: boolean }> {
    return this.client.patch<{ ok: boolean }>(`/tenant/webhooks/${hex}/url`, { url });
  }

  async removewebhook(hex: string): Promise<{ ok: boolean }> {
    return this.client.remove<{ ok: boolean }>(`/tenant/webhooks/${hex}`);
  }

  // Security & Usage
  async security(): Promise<Security> {
    return this.client.get<Security>('/tenant/security');
  }

  async usage(query?: { after?: string; limit?: number }): Promise<Page<Usage>> {
    return this.client.get<Page<Usage>>('/tenant/usage', { query });
  }

  async summaryusage(): Promise<Usage[]> {
    return this.client.get<Usage[]>('/tenant/usage/summary');
  }

  async metricusage(metric: string): Promise<Page<Usage>> {
    return this.client.get<Page<Usage>>(`/tenant/usage/metric/${metric}`);
  }
}
