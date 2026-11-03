export interface TelemetryEvent {
  id: string;
  source:
    | 'PAYPAL_TOOLKIT'
    | 'CHANNEL3_API'
    | 'BRYNTUM_ENGINE'
    | 'AG_STUDIO'
    | 'APIMATIC_MCP'
    | 'NEON_DB'
    | 'CATENAR_CORE'
    | 'CATENAR_TOOLKIT';
  operation: string;
  httpStatus: number;
  latencyMs: number;
  requestPayload: Record<string, unknown>;
  responsePayload: Record<string, unknown>;
  createdAt: string;
}

export interface CockpitMetrics {
  totalEscrowedCents: number;
  clearedEscrowCents: number;
  atRiskSlipHours: number;
  friendlyNudgesSent: number;
}
