import React, { useState } from 'react';
import { Activity, CheckCircle2, ChevronRight, ChevronDown, Terminal, Clock } from 'lucide-react';
import { TelemetryEvent } from '../types/telemetry.js';

interface WireInspectorPanelProps {
  events: TelemetryEvent[];
  briefText: string;
  onBriefChange: (val: string) => void;
  onExecuteBrief: () => void;
  currentStep: number;
}

export const WireInspectorPanel: React.FC<WireInspectorPanelProps> = ({
  events,
  briefText,
  onBriefChange,
  onExecuteBrief,
  currentStep,
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const steps = [
    'Channel3 BOM Match',
    'PayPal Catalog Registration',
    'QR Invoice Issued',
    'Bryntum Dependency Lock',
  ];

  return (
    <aside className="w-[360px] h-full bg-[#11141B] border-r border-[#1F242D] flex flex-col flex-shrink-0">
      {/* Upper 45%: Copilot & Brief */}
      <div className="h-[45%] p-3 border-b border-[#1F242D] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#9BA3B0] flex items-center space-x-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#0070BA]" />
              <span>Catenar.ai Settlement Engine</span>
            </span>
            <span className="text-[11px] font-mono text-[#0070BA] bg-[#0070BA]/10 px-1.5 py-0.5 rounded-[4px]">
              AI-SDK v6
            </span>
          </div>

          <textarea
            value={briefText}
            onChange={(e) => onBriefChange(e.target.value)}
            rows={3}
            placeholder="Type creative brief or equipment specs..."
            className="w-full bg-[#0A0C10] border border-[#1F242D] rounded-[6px] p-2 text-[12px] text-[#F3F5F8] placeholder-[#636B78] focus:outline-none focus:border-[#0070BA] resize-none"
          />

          <button
            onClick={onExecuteBrief}
            className="mt-2 w-full h-7 bg-[#0070BA] hover:bg-[#005EA6] text-white text-[12px] font-medium rounded-[6px] transition-colors"
          >
            Synthesize Scope to PayPal Invoice
          </button>
        </div>

        {/* Causal Step Pipeline */}
        <div className="space-y-1 mt-2">
          {steps.map((label, idx) => {
            const isCompleted = currentStep > idx;
            const isCurrent = currentStep === idx;
            return (
              <div
                key={label}
                className={`flex items-center justify-between px-2 py-1 rounded-[4px] text-[11px] font-mono transition-colors ${
                  isCompleted ? 'bg-[#10B981]/10 text-[#34D399]' : isCurrent ? 'bg-[#0070BA]/15 text-[#F3F5F8]' : 'text-[#636B78]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 flex items-center justify-center font-bold">
                    {idx + 1}.
                  </span>
                  <span>{label}</span>
                </div>
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lower 55%: Live Wire Telemetry */}
      <div className="h-[55%] flex flex-col">
        <div className="h-8 px-3 border-b border-[#1F242D] flex items-center justify-between bg-[#171B24]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9BA3B0] flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Catenar Telemetry Stream (SSE)</span>
          </span>
          <span className="text-[10px] font-mono text-[#636B78]">{events.length} events</span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#1F242D]/60 p-1">
          {events.length === 0 ? (
            <div className="p-4 text-center text-[#636B78] text-[12px] font-mono">
              Waiting for Catenar telemetry stream...
            </div>
          ) : (
            events.map((evt) => {
              const isSelected = selectedEventId === evt.id;
              return (
                <div key={evt.id} className="p-2 hover:bg-[#171B24]/60 transition-colors rounded-[4px]">
                  <div
                    onClick={() => setSelectedEventId(isSelected ? null : evt.id)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center space-x-1.5 overflow-hidden">
                      {isSelected ? <ChevronDown className="w-3 h-3 text-[#9BA3B0]" /> : <ChevronRight className="w-3 h-3 text-[#636B78]" />}
                      <span className="text-[11px] font-mono font-medium text-[#F3F5F8] truncate">
                        {evt.operation}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-mono text-[#34D399] bg-[#10B981]/15 px-1 rounded-[3px]">
                        {evt.httpStatus}
                      </span>
                      <span className="text-[10px] font-mono text-[#9BA3B0] flex items-center space-x-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{evt.latencyMs}ms</span>
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-2 bg-[#0A0C10] p-2 rounded-[4px] border border-[#1F242D] text-[10px] font-mono text-[#9BA3B0] overflow-x-auto space-y-1">
                      <div>
                        <span className="text-[#0070BA] font-bold">SOURCE:</span> {evt.source}
                      </div>
                      <div>
                        <span className="text-[#34D399] font-bold">REQ:</span> {JSON.stringify(evt.requestPayload)}
                      </div>
                      <div>
                        <span className="text-[#FBBF24] font-bold">RES:</span> {JSON.stringify(evt.responsePayload)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
};
