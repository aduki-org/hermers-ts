# gRPC Client Guide (`@hermers/grpc`)

Complete usage guide for `@hermers/grpc`.

## Client Options

```ts
import { Client } from '@hermers/grpc';

const client = new Client({
  endpoint: 'http://hermers.aduki.pro:8444',
  key: 'hm_live_xxxxxxxxxxxxxxxxxxxxxxxx',
  token: 'jwt_token_string'
});
```

Endpoint default: `http://hermers.aduki.pro:8444` (constant `BASE_ENDPOINT`).

## Service Modules

### `SessionService` (`Session`)

gRPC package: `hermes.session`

- `login(data)`: `rpc Login(LoginReq) returns (IssueResp)`
- `issue(data)`: `rpc Issue(IssueReq) returns (IssueResp)`
- `refresh(token)`: `rpc Refresh(RefreshReq) returns (IssueResp)`
- `load(jti)`: `rpc Load(LoadReq) returns (Session)`
- `revoke(jti)`: `rpc Revoke(RevokeReq) returns (RevokeResp)`
- `patch(data)`: `rpc Patch(PatchReq) returns (PatchResp)`
- `list(data)`: `rpc List(ListSessionsReq) returns (ListSessionsResp)`

### `MailService` (`Mail`)

gRPC package: `hermes.mail`

- `listMailboxes(data)`: `rpc ListMailboxes(ListMailboxesReq) returns (ListMailboxesResp)`
- `listMessages(data)`: `rpc ListMessages(ListMessagesReq) returns (ListMessagesResp)`
- `getMessage(hex)`: `rpc GetMessage(GetMessageReq) returns (Message)`
- `send(data)`: `rpc Send(SendReq) returns (SendResp)`
- `move(data)`: `rpc Move(MoveReq) returns (MoveResp)`
- `setFlags(data)`: `rpc SetFlags(SetFlagsReq) returns (SetFlagsResp)`
- `expunge(data)`: `rpc Expunge(ExpungeReq) returns (ExpungeResp)`
- `createMailbox(data)`: `rpc CreateMailbox(CreateMailboxReq) returns (Mailbox)`
- `deleteMailbox(hex)`: `rpc DeleteMailbox(DeleteMailboxReq) returns (DeleteMailboxResp)`
- `updateMailbox(data)`: `rpc UpdateMailbox(UpdateMailboxReq) returns (Mailbox)`

### `ContactService` (`Contact`)

gRPC package: `hermes.contact`

- `list(data)`: `rpc List(ListReq) returns (ListResp)`
- `get(hex)`: `rpc Get(GetReq) returns (Contact)`
- `create(data)`: `rpc Create(CreateReq) returns (Contact)`
- `update(data)`: `rpc Update(UpdateReq) returns (Contact)`
- `remove(hex)`: `rpc Remove(RemoveReq) returns (RemoveResp)`
- `sync(data)`: `rpc Sync(SyncReq) returns (SyncResp)`

### `FeedService` (`Feed`)

gRPC package: `hermes.feeds`

- `create(data)`: `rpc Create(CreateReq) returns (Feed)`
- `list()`: `rpc List(ListReq) returns (ListResp)`
- `get(hex)`: `rpc Get(GetReq) returns (Feed)`
- `update(data)`: `rpc Update(UpdateReq) returns (Feed)`
- `remove(hex)`: `rpc Remove(RemoveReq) returns (RemoveResp)`
- `sync(hex)`: `rpc Sync(SyncReq) returns (SyncResp)`

### `SecurityService` (`Security`)

gRPC package: `hermes.security`

- `status()`: `rpc Status(StatusReq) returns (StatusResp)`

### `SpamService` (`Spam`)

gRPC package: `hermes.spam`

- `classify(data)`: `rpc Classify(ClassifyReq) returns (ClassifyResp)`
- `report(data)`: `rpc Report(ReportReq) returns (ReportResp)`

### `StorageService` (`Storage`)

gRPC package: `hermes.storage`

- `put(data)`: `rpc Put(PutReq) returns (PutResp)`
- `get(hex)`: `rpc Get(GetReq) returns (stream Chunk)`
- `remove(hex)`: `rpc Remove(RemoveReq) returns (RemoveResp)`

### `SyncService` (`Sync`)

gRPC package: `hermes.sync`

- `contacts(data)`: `rpc Contacts(ContactSyncReq) returns (ContactSyncResp)`
- `mailboxes(data)`: `rpc Mailboxes(MailboxSyncReq) returns (MailboxSyncResp)`

### `TierService` (`Tier`)

gRPC package: `hermes.tier`

- `resolve(tenant)`: `rpc Resolve(ResolveReq) returns (TierInfo)`
- `change(data)`: `rpc Change(ChangeReq) returns (ChangeResp)`

### `UsageService` (`Usage`)

gRPC package: `hermes.usage`

- `incr(data)`: `rpc Increment(IncrReq) returns (IncrResp)`
- `check(data)`: `rpc Check(CheckReq) returns (CheckResp)`
- `get(data)`: `rpc Get(GetReq) returns (Usage)`
- `reset(data)`: `rpc Reset(ResetReq) returns (ResetResp)`

## Data Validation Utilities (`data/`)

```ts
import { timestamp, hex, email, bytes, limit, window } from '@hermers/grpc';

const validTs = timestamp('2026-04-28T14:00:00Z', 'since');
const validHex = hex('msg_123', 'hex');
const validEmail = email('user@domain.com', 'email');
const byteBuffer = bytes('raw payload', 'raw');
const validLimit = limit(50);
const validWindow = window('2026-04', 'window');
```
