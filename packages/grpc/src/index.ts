import { HermesGrpc } from './client.js';
import { BASE_ENDPOINT, Client } from './utils/client.js';
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

export * from './types/index.js';
export * from './data/index.js';
export { HermesGrpc, BASE_ENDPOINT, Client };
export { SessionService, SessionService as Session };
export { MailService, MailService as Mail };
export { ContactService, ContactService as Contact };
export { FeedService, FeedService as Feed };
export { SecurityService, SecurityService as Security };
export { SpamService, SpamService as Spam };
export { StorageService, StorageService as Storage };
export { SyncService, SyncService as Sync };
export { TierService, TierService as Tier };
export { UsageService, UsageService as Usage };

export default HermesGrpc;
