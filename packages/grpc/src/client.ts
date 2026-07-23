import { Client, ClientOptions, Identity } from './utils/client.js';
import { SessionService } from './services/session.js';
import { MailService } from './services/mail.js';
import { ContactService } from './services/contact.js';
import { FeedService } from './services/feed.js';
import { SecurityService } from './services/security.js';
import { SpamService } from './services/spam.js';
import { StorageService } from './services/storage.js';
import { SyncService } from './services/sync.js';
import { TierService } from './services/tier.js';
import { UsageService } from './services/usage.js';

export class HermesGrpc {
  public readonly client: Client;
  public readonly session: SessionService;
  public readonly mail: MailService;
  public readonly contact: ContactService;
  public readonly feed: FeedService;
  public readonly security: SecurityService;
  public readonly spam: SpamService;
  public readonly storage: StorageService;
  public readonly sync: SyncService;
  public readonly tier: TierService;
  public readonly usage: UsageService;

  constructor(options?: string | ClientOptions) {
    this.client = new Client(options);
    this.session = new SessionService(this.client);
    this.mail = new MailService(this.client);
    this.contact = new ContactService(this.client);
    this.feed = new FeedService(this.client);
    this.security = new SecurityService(this.client);
    this.spam = new SpamService(this.client);
    this.storage = new StorageService(this.client);
    this.sync = new SyncService(this.client);
    this.tier = new TierService(this.client);
    this.usage = new UsageService(this.client);
  }

  whoami(): Promise<Identity> {
    return this.client.whoami();
  }
}
