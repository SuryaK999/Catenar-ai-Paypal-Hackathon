import { Response } from 'express';
import { db } from '../db/connection.js';
import { telemetryLogs } from '../db/schema.js';

export interface TelemetryPayload {
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
}

export interface TelemetryEvent extends TelemetryPayload {
  id: string;
  createdAt: string;
}

export class TelemetryBroadcaster {
  private static clients: Set<Response> = new Set();
  private static recentEvents: TelemetryEvent[] = [];

  public static subscribe(res: Response): void {
    TelemetryBroadcaster.clients.add(res);
    res.write(`data: ${JSON.stringify({ type: 'CONNECTED', timestamp: new Date().toISOString() })}\n\n`);

    for (const event of TelemetryBroadcaster.recentEvents.slice(-20)) {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    }

    res.on('close', () => {
      TelemetryBroadcaster.clients.delete(res);
    });
  }

  public static async recordAndBroadcast(payload: TelemetryPayload): Promise<TelemetryEvent> {
    const event: TelemetryEvent = {
      ...payload,
      id: `tel_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };

    TelemetryBroadcaster.recentEvents.push(event);
    if (TelemetryBroadcaster.recentEvents.length > 100) {
      TelemetryBroadcaster.recentEvents.shift();
    }

    TelemetryBroadcaster.broadcast(event);

    try {
      await db.insert(telemetryLogs).values({
        source: payload.source,
        operation: payload.operation,
        httpStatus: payload.httpStatus,
        latencyMs: payload.latencyMs,
        requestPayload: payload.requestPayload,
        responsePayload: payload.responsePayload,
      });
    } catch {
      // In offline development or when DB is initializing, retain memory events
    }

    return event;
  }

  private static broadcast(event: TelemetryEvent): void {
    const sseFormatted = `data: ${JSON.stringify(event)}\n\n`;
    for (const client of TelemetryBroadcaster.clients) {
      try {
        client.write(sseFormatted);
      } catch {
        TelemetryBroadcaster.clients.delete(client);
      }
    }
  }

  public static getRecentEvents(): TelemetryEvent[] {
    return [...TelemetryBroadcaster.recentEvents];
  }
}
