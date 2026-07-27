import { status as GrpcStatus, type ServiceError, type StatusObject } from '@grpc/grpc-js';

/** Typed gRPC error with status code + details. */
export class HermesGrpcError extends Error {
  readonly code: string;
  readonly grpcCode?: number;
  readonly details?: string;
  readonly metadata?: ServiceError['metadata'];

  constructor(opts: {
    message: string;
    code?: string;
    grpcCode?: number;
    details?: string;
    metadata?: ServiceError['metadata'];
  }) {
    super(opts.message);
    this.name = 'HermesGrpcError';
    this.code = opts.code ?? 'UNKNOWN';
    this.grpcCode = opts.grpcCode;
    this.details = opts.details;
    this.metadata = opts.metadata;
  }

  static fromServiceError(err: ServiceError | StatusObject | Error): HermesGrpcError {
    if ('code' in err && typeof (err as ServiceError).code === 'number') {
      const se = err as ServiceError;
      const name = GrpcStatus[se.code] ?? 'UNKNOWN';
      return new HermesGrpcError({
        message: se.details || se.message || name,
        code: name,
        grpcCode: se.code,
        details: se.details,
        metadata: se.metadata,
      });
    }
    const message =
      err && typeof err === 'object' && 'message' in err && typeof err.message === 'string'
        ? err.message
        : 'gRPC call failed';
    return new HermesGrpcError({
      message,
      code: 'UNKNOWN',
    });
  }
}
