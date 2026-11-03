import React, { useState, useEffect, useCallback } from 'react';
import { JudgeCommandBar } from './components/JudgeCommandBar.js';
import { WireInspectorPanel } from './components/WireInspectorPanel.js';
import { TimelinePlaceholderPanel } from './components/TimelinePlaceholderPanel.js';
import { ScoreboardPlaceholderPanel } from './components/ScoreboardPlaceholderPanel.js';
import { SandboxCredentialsModal } from './components/SandboxCredentialsModal.js';
import { PayPalQrModal } from './components/PayPalQrModal.js';
import { TelemetryEvent, CockpitMetrics } from './types/telemetry.js';

export const App: React.FC = () => {
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isCredsOpen, setIsCredsOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [briefText, setBriefText] = useState('Virtual production pilot: RED V-Raptor 8K rig + ARRI 35mm lens package for Unreal Engine volume setup.');
  const [shiftHours, setShiftHours] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<'PENDING' | 'PAID' | 'DELAYED'>('PENDING');
  const [isFedexDispatched, setIsFedexDispatched] = useState(false);
  const nudgeDraft = 'Payment reminder: Setup stage slips +48h without cleared deposit. Automated via Catenar.ai Autonomous Critical Path & Billing Engine';

  const [metrics, setMetrics] = useState<CockpitMetrics>({
    totalEscrowedCents: 1250000,
    clearedEscrowCents: 0,
    atRiskSlipHours: 0,
    friendlyNudgesSent: 0,
  });

  const triggerScenario = useCallback(async (id: string) => {
    setActiveScenario(id);
    setIsExecuting(true);
    try {
      const endpoint = id === 'reset' ? '/api/scenarios/reset' : `/api/scenarios/${id}`;
      const res = await fetch(endpoint, { method: 'POST' });
      await res.json();
      applyScenarioState(id);
    } catch {
      // Handled gracefully via fallback telemetry
    } finally {
      setIsExecuting(false);
    }
  }, []);

  const applyScenarioState = (id: string) => {
    if (id === 'reset') {
      setShiftHours(0);
      setPaymentStatus('PENDING');
      setIsFedexDispatched(false);
      setCurrentStep(1);
      setMetrics({ totalEscrowedCents: 1250000, clearedEscrowCents: 0, atRiskSlipHours: 0, friendlyNudgesSent: 0 });
      return;
    }
    if (id === '1') {
      setCurrentStep(3);
      setMetrics((m) => ({ ...m, totalEscrowedCents: 1250000 }));
      setIsQrModalOpen(true);
      return;
    }
    if (id === '2') {
      setShiftHours(48);
      setPaymentStatus('DELAYED');
      setCurrentStep(3);
      setMetrics((m) => ({ ...m, atRiskSlipHours: 48, friendlyNudgesSent: m.friendlyNudgesSent + 1 }));
      return;
    }
    if (id === '3') {
      setPaymentStatus('PAID');
      setIsFedexDispatched(true);
      setCurrentStep(4);
      setMetrics((m) => ({ ...m, clearedEscrowCents: 450000, atRiskSlipHours: 0 }));
      return;
    }
    if (id === '4') {
      setMetrics((m) => ({ ...m, clearedEscrowCents: Math.max(0, m.clearedEscrowCents - 75000) }));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === '1') triggerScenario('1');
      if (e.key === '2') triggerScenario('2');
      if (e.key === '3') triggerScenario('3');
      if (e.key === '4') triggerScenario('4');
      if (e.key.toLowerCase() === 'r') triggerScenario('reset');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerScenario]);

  useEffect(() => {
    const sse = new EventSource('/api/telemetry/stream');
    sse.onmessage = (msg) => {
      try {
        const payload = JSON.parse(msg.data);
        if (payload.operation) {
          setEvents((prev) => [payload, ...prev].slice(0, 50));
        }
      } catch {
        // Ignore malformed ping
      }
    };
    return () => sse.close();
  }, []);

  return (
    <div className="h-screen w-screen bg-[#0A0C10] flex flex-col overflow-hidden">
      <JudgeCommandBar
        onTriggerScenario={triggerScenario}
        onOpenCredentials={() => setIsCredsOpen(true)}
        activeScenario={activeScenario}
        isExecuting={isExecuting}
      />
      <div className="flex-1 flex overflow-hidden">
        <WireInspectorPanel
          events={events}
          briefText={briefText}
          onBriefChange={setBriefText}
          onExecuteBrief={() => triggerScenario('1')}
          currentStep={currentStep}
        />
        <main className="flex-1 flex flex-col overflow-hidden">
          <TimelinePlaceholderPanel
            shiftHours={shiftHours}
            paymentStatus={paymentStatus}
            isFedexDispatched={isFedexDispatched}
          />
          <ScoreboardPlaceholderPanel
            metrics={metrics}
            onSendNudge={() => triggerScenario('2')}
            nudgeDraft={nudgeDraft}
          />
        </main>
      </div>
      <SandboxCredentialsModal isOpen={isCredsOpen} onClose={() => setIsCredsOpen(false)} />
      <PayPalQrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        onSimulatePayment={() => triggerScenario('3')}
      />
    </div>
  );
};

export default App;
