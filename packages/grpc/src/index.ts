export { HermesGrpc } from './hermes.js';
export { default } from './hermes.js';
export { BASE_ENDPOINT, type HermesGrpcOptions } from './config.js';
export { HermesGrpcError } from './errors.js';
export { GrpcTransport, type Identity } from './transport.js';

export { ContactsResource } from './resources/contacts.js';
export { MailResource } from './resources/mail.js';
export { FeedsResource } from './resources/feeds.js';
export { StorageResource } from './resources/storage.js';
export { SyncResource } from './resources/sync.js';
export { SecurityResource } from './resources/security.js';
export { SpamResource } from './resources/spam.js';
export { TierResource } from './resources/tier.js';
export { UsageResource } from './resources/usage.js';
export { SessionResource } from './resources/session.js';

/** Proto-generated types (re-exported for consumers). */
export type { Contact, ListReq, ListResp, CreateReq, UpdateReq, SyncReq, SyncResp } from './generated/contact.js';
export type { Mailbox, Message, Flag } from './generated/mail.js';
export { Flag as MailFlag } from './generated/mail.js';
export type { Feed } from './generated/feeds.js';
export type { BlobRef } from './generated/storage.js';
export type { Session } from './generated/session.js';
export type { TierInfo, Limits, Plan } from './generated/tier.js';
export { Plan as TierPlan } from './generated/tier.js';
export type { Usage, IncrResp, CheckResp } from './generated/usage.js';
export type { Verdict, ClassifyResp } from './generated/spam.js';
export { Verdict as SpamVerdict } from './generated/spam.js';
export type { StatusResp } from './generated/security.js';
