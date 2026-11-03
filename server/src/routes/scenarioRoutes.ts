import { Router, Request, Response } from 'express';
import { JudgeResetService } from '../services/JudgeResetService.js';
import { PayPalToolkitGateway } from '../integrations/paypal/PayPalToolkitGateway.js';
import { Channel3CatalogClient } from '../integrations/channel3/Channel3CatalogClient.js';
import { SpendGuardrailEngine } from '../engines/SpendGuardrailEngine.js';
import { TelemetryBroadcaster } from '../services/TelemetryBroadcaster.js';
import { FriendlyNudgeComposer } from '../services/FriendlyNudgeComposer.js';

export const scenarioRouter = Router();
const paypalGateway = new PayPalToolkitGateway();
const channel3Client = new Channel3CatalogClient();

scenarioRouter.post('/reset', async (req: Request, res: Response) => {
  const result = await JudgeResetService.executeReset();
  res.json({ success: result.success, durationMs: result.durationMs, mode: 'TIME_MACHINE_RESET' });
});

scenarioRouter.post('/1', async (req: Request, res: Response) => {
  const products = await channel3Client.searchProducts({ query: 'camera', limit: 2 });
  const primaryProduct = products[0] || {
    id: 'ch3_cam_default',
    title: 'RED V-Raptor 8K Camera Rig',
    quotedUnitCents: 320000,
    liveVerifiedUnitCents: 325000,
  };

  const paypalProduct = await paypalGateway.createProduct(primaryProduct.title, 'Hardware Kit', 'PHYSICAL');
  const invoice = await paypalGateway.createInvoice('00000000-0000-0000-0000-000000000011', '4500.00', 'finance@apexmedia.studio');
  const qrCode = await paypalGateway.generateInvoiceQrCode(invoice.id);
  await paypalGateway.sendInvoice(invoice.id);

  res.json({
    scenario: 1,
    title: 'Scope & QR Invoice Issued',
    product: paypalProduct,
    invoice: { id: invoice.id, amount: '4500.00', qrCode: qrCode.qr_code },
  });
});

scenarioRouter.post('/2', async (req: Request, res: Response) => {
  const startTime = performance.now();
  const shiftHours = 48;
  const nudgeNote = FriendlyNudgeComposer.compose('Virtual Production Volume setup', shiftHours);

  const reminder = await paypalGateway.sendInvoiceReminder('INV2-8492', nudgeNote);
  const latency = Math.round(performance.now() - startTime);

  await TelemetryBroadcaster.recordAndBroadcast({
    source: 'BRYNTUM_ENGINE',
    operation: 'RECONCILE_SCHEDULE_SLIP',
    httpStatus: 200,
    latencyMs: latency,
    requestPayload: { milestoneId: '00000000-0000-0000-0000-000000000012', slipHours: shiftHours },
    responsePayload: { status: 'CRITICAL_PATH_SLIPPED', newOffsetHours: shiftHours },
  });

  res.json({ scenario: 2, title: 'Late Slip + Friendly Nudge', shiftHours, reminder });
});

scenarioRouter.post('/3', async (req: Request, res: Response) => {
  const milestone = { id: '00000000-0000-0000-0000-000000000011', title: 'RED V-Raptor Rig', amountCents: 450000, paymentStatus: 'PAID' };
  const items = [{ id: 'item_1', title: 'RED Camera Body', quotedUnitCents: 320000, liveVerifiedUnitCents: 325000, quantity: 1 }];

  const guardrail = SpendGuardrailEngine.evaluate(milestone, items);
  if (!guardrail.passed) {
    res.status(422).json({ error: guardrail.failureReason, guardrail });
    return;
  }

  const order = await paypalGateway.createOrder(milestone.id, '3250.00');
  const capture = await paypalGateway.payOrder(order.id);
  const tracking = await paypalGateway.createShipmentTracking(order.id, 'FEDEX');

  res.json({ scenario: 3, title: 'Settle Escrow + Order Gear', guardrail, order, capture, tracking });
});

scenarioRouter.post('/4', async (req: Request, res: Response) => {
  const refundAmount = '750.00';
  const refund = await paypalGateway.createRefund('CAP-CYBERPUNK-01', refundAmount, 'Scope reduced - optical filter package deducted');

  await TelemetryBroadcaster.recordAndBroadcast({
    source: 'BRYNTUM_ENGINE',
    operation: 'RECLAIM_TIMELINE_HOURS',
    httpStatus: 200,
    latencyMs: 42,
    requestPayload: { refundAmountCents: 75000, milestoneId: '00000000-0000-0000-0000-000000000011' },
    responsePayload: { status: 'HOURS_RECLAIMED', reclaimedHours: 12 },
  });

  res.json({ scenario: 4, title: 'Partial Refund Reclaim', refundAmount, refund });
});
