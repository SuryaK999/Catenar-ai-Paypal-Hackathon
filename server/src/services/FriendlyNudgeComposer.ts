export class FriendlyNudgeComposer {
  public static readonly SIGNATURE = 'Automated via Catenar.ai Autonomous Critical Path & Billing Engine';

  /**
   * Composes a friendly nudge email/notification reminder
   */
  public static compose(milestoneTitle: string, shiftHours: number): string {
    return `Friendly reminder: ${milestoneTitle} milestone has shifted +${shiftHours}h. Clear deposit to unlock schedule.\n\n${this.SIGNATURE}`;
  }

  /**
   * Returns standard automated signature
   */
  public static getSignature(): string {
    return this.SIGNATURE;
  }
}
