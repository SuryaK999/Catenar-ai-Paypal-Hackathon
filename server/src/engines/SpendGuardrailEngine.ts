export interface GuardrailMilestoneInput {
  id: string;
  title: string;
  amountCents: number;
  paymentStatus: string;
}

export interface GuardrailBomItemInput {
  id: string;
  title: string;
  quotedUnitCents: number;
  liveVerifiedUnitCents: number;
  quantity: number;
}

export interface DriftViolation {
  itemId: string;
  title: string;
  driftPercentage: number;
  quotedCents: number;
  liveCents: number;
}

export interface GuardrailEvaluationResult {
  passed: boolean;
  clearedEscrowCents: number;
  totalProcurementCents: number;
  marginRemainingCents: number;
  driftViolations: DriftViolation[];
  failureReason: string | null;
  evaluations: {
    isPaymentSettled: boolean;
    isBudgetSufficient: boolean;
    isPriceDriftAcceptable: boolean;
  };
}

export class SpendGuardrailEngine {
  private static readonly MAX_ALLOWED_PRICE_DRIFT = 0.05;

  public static evaluate(
    milestone: GuardrailMilestoneInput,
    items: GuardrailBomItemInput[]
  ): GuardrailEvaluationResult {
    const isPaymentSettled = milestone.paymentStatus === 'PAID';
    if (!isPaymentSettled) {
      return this.buildResult(false, milestone.amountCents, 0, [], 'Payment not cleared in PayPal escrow', {
        isPaymentSettled: false,
        isBudgetSufficient: false,
        isPriceDriftAcceptable: false,
      });
    }

    const totalProcurementCents = items.reduce(
      (sum, item) => sum + item.liveVerifiedUnitCents * (item.quantity || 1),
      0
    );

    const isBudgetSufficient = totalProcurementCents <= milestone.amountCents;
    if (!isBudgetSufficient) {
      const overage = totalProcurementCents - milestone.amountCents;
      return this.buildResult(false, milestone.amountCents, totalProcurementCents, [], `Procurement cost exceeds escrow by ${overage} cents`, {
        isPaymentSettled: true,
        isBudgetSufficient: false,
        isPriceDriftAcceptable: false,
      });
    }

    const driftViolations = this.detectDriftViolations(items);
    const isPriceDriftAcceptable = driftViolations.length === 0;
    if (!isPriceDriftAcceptable) {
      return this.buildResult(false, milestone.amountCents, totalProcurementCents, driftViolations, `Price drift exceeded 5% on ${driftViolations.length} items`, {
        isPaymentSettled: true,
        isBudgetSufficient: true,
        isPriceDriftAcceptable: false,
      });
    }

    return this.buildResult(true, milestone.amountCents, totalProcurementCents, [], null, {
      isPaymentSettled: true,
      isBudgetSufficient: true,
      isPriceDriftAcceptable: true,
    });
  }

  private static detectDriftViolations(items: GuardrailBomItemInput[]): DriftViolation[] {
    const violations: DriftViolation[] = [];
    for (const item of items) {
      if (item.quotedUnitCents <= 0) continue;
      const drift = (item.liveVerifiedUnitCents - item.quotedUnitCents) / item.quotedUnitCents;
      if (drift > this.MAX_ALLOWED_PRICE_DRIFT) {
        violations.push({
          itemId: item.id,
          title: item.title,
          driftPercentage: Math.round(drift * 10000) / 100,
          quotedCents: item.quotedUnitCents,
          liveCents: item.liveVerifiedUnitCents,
        });
      }
    }
    return violations;
  }

  private static buildResult(
    passed: boolean,
    clearedEscrowCents: number,
    totalProcurementCents: number,
    driftViolations: DriftViolation[],
    failureReason: string | null,
    evaluations: GuardrailEvaluationResult['evaluations']
  ): GuardrailEvaluationResult {
    return {
      passed,
      clearedEscrowCents,
      totalProcurementCents,
      marginRemainingCents: clearedEscrowCents - totalProcurementCents,
      driftViolations,
      failureReason,
      evaluations,
    };
  }
}
