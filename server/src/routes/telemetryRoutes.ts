import { Router, Request, Response } from 'express';
import { TelemetryBroadcaster } from '../services/TelemetryBroadcaster.js';

export const telemetryRouter = Router();

telemetryRouter.get('/stream', (req: Request, res: Response) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });

  TelemetryBroadcaster.subscribe(res);
});

telemetryRouter.get('/events', (req: Request, res: Response) => {
  res.json({
    events: TelemetryBroadcaster.getRecentEvents(),
  });
});
