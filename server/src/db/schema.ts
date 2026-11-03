import {
  pgTable,
  uuid,
  text,
  integer,
  numeric,
  timestamp,
  jsonb,
  pgEnum,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const paymentStatusEnum = pgEnum('payment_status', [
  'PENDING',
  'OVERDUE',
  'PAID',
  'PARTIALLY_REFUNDED',
  'REFUNDED',
]);

export const procurementStatusEnum = pgEnum('procurement_status', [
  'QUOTED',
  'GUARDRAIL_LOCKED',
  'ORDERED',
  'SHIPPED',
  'CANCELLED',
]);

export const telemetrySourceEnum = pgEnum('telemetry_source', [
  'PAYPAL_TOOLKIT',
  'CHANNEL3_API',
  'BRYNTUM_ENGINE',
  'AG_STUDIO',
  'APIMATIC_MCP',
  'NEON_DB',
  'CATENAR_CORE',
  'CATENAR_TOOLKIT',
]);

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().default('Catenar Autonomous Pilot'),
  clientName: text('client_name').notNull(),
  clientEmail: text('client_email').notNull(),
  clientReliabilityScore: integer('client_reliability_score').notNull().default(96),
  totalBudgetCents: integer('total_budget_cents').notNull(),
  clearedEscrowCents: integer('cleared_escrow_cents').notNull().default(0),
  refundedCents: integer('refunded_cents').notNull().default(0),
  status: text('status').notNull().default('ACTIVE'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const milestones = pgTable(
  'milestones',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    sequenceOrder: integer('sequence_order').notNull(),
    title: text('title').notNull(),
    resourceRole: text('resource_role').notNull(),
    startDate: timestamp('start_date', { withTimezone: true }).notNull(),
    endDate: timestamp('end_date', { withTimezone: true }).notNull(),
    dependsOnMilestoneId: uuid('depends_on_milestone_id'),
    shiftHoursApplied: integer('shift_hours_applied').notNull().default(0),
    amountCents: integer('amount_cents').notNull(),
    amountUsdDisplay: numeric('amount_usd_display', { precision: 12, scale: 2 }).notNull(),
    paymentStatus: paymentStatusEnum('payment_status').notNull().default('PENDING'),
    paypalInvoiceId: text('paypal_invoice_id'),
    paypalOrderId: text('paypal_order_id'),
    paypalCaptureId: text('paypal_capture_id'),
    paypalQrCodeBase64: text('paypal_qr_code_base64'),
    idempotencyKey: text('idempotency_key').notNull(),
    friendlyNudgeDraft: text('friendly_nudge_draft'),
    nudgeCount: integer('nudge_count').notNull().default(0),
    lastNudgedAt: timestamp('last_nudged_at', { withTimezone: true }),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    idempotencyIdx: uniqueIndex('milestones_idempotency_idx').on(table.idempotencyKey),
  })
);

export const bomItems = pgTable('bom_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  milestoneId: uuid('milestone_id')
    .notNull()
    .references(() => milestones.id, { onDelete: 'cascade' }),
  channel3ProductId: text('channel3_product_id').notNull(),
  title: text('title').notNull(),
  brand: text('brand').notNull(),
  imageUrl: text('image_url').notNull(),
  quotedUnitCents: integer('quoted_unit_cents').notNull(),
  liveVerifiedUnitCents: integer('live_verified_unit_cents').notNull(),
  quantity: integer('quantity').notNull().default(1),
  paypalProductId: text('paypal_product_id'),
  paypalOrderId: text('paypal_order_id'),
  procurementStatus: procurementStatusEnum('procurement_status').notNull().default('QUOTED'),
  carrierName: text('carrier_name'),
  trackingNumber: text('tracking_number'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const telemetryLogs = pgTable('telemetry_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  source: telemetrySourceEnum('source').notNull(),
  operation: text('operation').notNull(),
  httpStatus: integer('http_status').notNull().default(200),
  latencyMs: integer('latency_ms').notNull(),
  requestPayload: jsonb('request_payload').notNull(),
  responsePayload: jsonb('response_payload').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Milestone = typeof milestones.$inferSelect;
export type NewMilestone = typeof milestones.$inferInsert;
export type BomItem = typeof bomItems.$inferSelect;
export type NewBomItem = typeof bomItems.$inferInsert;
export type TelemetryLog = typeof telemetryLogs.$inferSelect;
export type NewTelemetryLog = typeof telemetryLogs.$inferInsert;
