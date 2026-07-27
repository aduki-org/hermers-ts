# Spam Service

Package: `hermes.spam`

Auth: metadata `authorization: Key {key}`

API key format:

- **hash** = SHA-256 hex digest of raw key. Server stores only hash.
- **prefix** = first 1-16 chars of raw key, for fast lookup.

## Classify

`rpc Classify(ClassifyReq) returns (ClassifyResp)`

**ClassifyReq:** tenant (string), msg (string), raw (bytes), direction (string: "inbound"|"outbound")

## Report

`rpc Report(ReportReq) returns (ReportResp)`

**ReportReq:** tenant (string), msg (string), user (string), verdict (Verdict), source (string: "user_report"|"dmarc_feedback"|"honeypot")

---

## Types

**Verdict enum:** CLEAN=0, SPAM=1, BULK=2

**Scores:** rules, bayes, ml, reputation, composite (float)

**ClassifyResp:** verdict (Verdict), scores (Scores), reason (string)
