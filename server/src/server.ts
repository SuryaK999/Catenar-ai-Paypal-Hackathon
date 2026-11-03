import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { telemetryRouter } from './routes/telemetryRoutes.js';
import { scenarioRouter } from './routes/scenarioRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
}));

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'Catenar.ai Engine',
    neon: 'ACTIVE',
    paypal: 'SANDBOX',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/telemetry', telemetryRouter);
app.use('/api/scenarios', scenarioRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Catenar.ai Engine listening on port ${port}`);
  });
}

export default app;
