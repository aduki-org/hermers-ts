/** Production native gRPC endpoint (TLS / h2 via Traefik). */
export const BASE_ENDPOINT = 'grpc.aduki.pro:443';

export interface HermesGrpcOptions {
  /**
   * Override the gRPC host:port. Defaults to production `grpc.aduki.pro:443`.
   * Use only for local/dev/test.
   */
  endpoint?: string;
  /** Skip TLS (plaintext h2c). Only for local development. */
  insecure?: boolean;
}
