import { createHash } from 'node:crypto';

export class PayPalIdempotencyKeyGenerator {
  public static generate(resourceId: string, action: string, timestamp?: number): string {
    const time = timestamp ?? Date.now();
    const payload = `${resourceId}:${action}:${time}`;
    return createHash('sha256').update(payload).digest('hex');
  }

  public static generateDeterministic(seed: string): string {
    return createHash('sha256').update(seed).digest('hex');
  }
}
