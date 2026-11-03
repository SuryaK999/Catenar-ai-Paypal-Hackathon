import { db } from '../db/connection.js';
import { projects, milestones, bomItems } from '../db/schema.js';
import { TelemetryBroadcaster } from './TelemetryBroadcaster.js';

export interface ResetResult {
  success: boolean;
  durationMs: number;
  projectId: string;
}

export class JudgeResetService {
  public static async executeReset(): Promise<ResetResult> {
    const startTime = performance.now();
    const defaultProjectId = '00000000-0000-0000-0000-000000000001';
    const milestone1Id = '00000000-0000-0000-0000-000000000011';
    const milestone2Id = '00000000-0000-0000-0000-000000000012';

    try {
      await db.delete(bomItems);
      await db.delete(milestones);
      await db.delete(projects);

      await db.insert(projects).values({
        id: defaultProjectId,
        name: 'Catenar Autonomous Pilot',
        clientName: 'Apex Narrative Media',
        clientEmail: 'finance@apexmedia.studio',
        clientReliabilityScore: 96,
        totalBudgetCents: 1250000,
        clearedEscrowCents: 0,
        refundedCents: 0,
        status: 'ACTIVE',
      });

      const now = new Date();
      const inThreeDays = new Date(now.getTime() + 3 * 86400000);
      const inSevenDays = new Date(now.getTime() + 7 * 86400000);

      await db.insert(milestones).values([
        {
          id: milestone1Id,
          projectId: defaultProjectId,
          sequenceOrder: 1,
          title: 'RED V-Raptor 8K Camera Rig & Optical Setup',
          resourceRole: 'Director of Photography',
          startDate: now,
          endDate: inThreeDays,
          amountCents: 450000,
          amountUsdDisplay: '4500.00',
          paymentStatus: 'PENDING',
          idempotencyKey: 'IDEMP-INIT-MILESTONE-001',
          nudgeCount: 0,
        },
        {
          id: milestone2Id,
          projectId: defaultProjectId,
          sequenceOrder: 2,
          title: 'Unreal Engine 5.4 Volume Calibration',
          resourceRole: 'Virtual Production Lead',
          startDate: inThreeDays,
          endDate: inSevenDays,
          dependsOnMilestoneId: milestone1Id,
          amountCents: 800000,
          amountUsdDisplay: '8000.00',
          paymentStatus: 'PENDING',
          idempotencyKey: 'IDEMP-INIT-MILESTONE-002',
          nudgeCount: 0,
        },
      ]);

      const durationMs = Math.round(performance.now() - startTime);

      await TelemetryBroadcaster.recordAndBroadcast({
        source: 'NEON_DB',
        operation: 'JUDGE_TIME_MACHINE_RESET',
        httpStatus: 200,
        latencyMs: durationMs,
        requestPayload: { action: 'RESET_WORKSPACE', defaultProjectId },
        responsePayload: { status: 'SEEDED', durationMs, preservedAuditLogs: true },
      });

      return { success: true, durationMs, projectId: defaultProjectId };
    } catch (error) {
      const durationMs = Math.round(performance.now() - startTime);
      return { success: false, durationMs, projectId: defaultProjectId };
    }
  }
}
