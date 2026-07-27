import type { GrpcTransport } from '../transport.js';
import type { ClassifyResp, Verdict } from '../generated/spam.js';

/** SpamService — types generated from `proto/spam.proto`. */
export class SpamResource {
  constructor(private readonly transport: GrpcTransport) {}

  async classify(data: {
    msg: string;
    raw: Uint8Array;
    direction: string;
  }): Promise<ClassifyResp> {
    const tenant = await this.transport.requireTenant();
    return this.transport.unary(this.transport.spam.classify.bind(this.transport.spam), {
      tenant,
      msg: data.msg,
      raw: Buffer.from(data.raw),
      direction: data.direction,
    });
  }

  async report(data: {
    msg: string;
    verdict: Verdict;
    source: string;
  }): Promise<void> {
    const tenant = await this.transport.requireTenant();
    const user = await this.transport.requireUser();
    await this.transport.unary(this.transport.spam.report.bind(this.transport.spam), {
      tenant,
      msg: data.msg,
      user,
      verdict: data.verdict,
      source: data.source,
    });
  }
}
