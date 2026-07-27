# Hermes protocol reference (mirror)

This tree mirrors the Hermes monorepo [`sdk/`](../../../sdk/) folder: language-agnostic HTTP and gRPC endpoint/proto notes for the **server / protocol team**.

It is **not** TypeScript SDK developer documentation. SDK consumers should use [`docs/`](../docs/) (and the published mdBook assembled from that folder).

## Layout

| Path | Description |
| --- | --- |
| [`http/`](http/) | HTTP/JSON conventions and endpoints |
| [`http/user/`](http/user/) | User-scoped HTTP endpoints |
| [`grpc/`](grpc/) | gRPC services (`hermes.*`) |
| [`whoami/`](whoami/) | Example whoami JSON fixtures |

Canonical source of truth: Hermes monorepo `sdk/`. Keep this mirror in sync when protocol docs change; do not treat it as the SDK getting-started path.
