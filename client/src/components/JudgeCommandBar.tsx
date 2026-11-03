import React from 'react';
import { KeyRound, ShieldCheck, RefreshCw } from 'lucide-react';

interface JudgeCommandBarProps {
  onTriggerScenario: (id: string) => void;
  onOpenCredentials: () => void;
  activeScenario: string | null;
  isExecuting: boolean;
}

export const JudgeCommandBar: React.FC<JudgeCommandBarProps> = ({
  onTriggerScenario,
  onOpenCredentials,
  activeScenario,
  isExecuting,
}) => {
  const triggers = [
    { id: '1', key: '1', label: 'Scope & QR Invoice' },
    { id: '2', key: '2', label: 'Late Slip + Friendly Nudge' },
    { id: '3', key: '3', label: 'Settle Escrow + Order Gear' },
    { id: '4', key: '4', label: 'Partial Refund Reclaim' },
    { id: 'reset', key: 'R', label: '<80ms Neon Reset', isReset: true },
  ];

  return (
    <header className="h-12 w-full bg-[#11141B] border-b border-[#1F242D] px-3 flex items-center justify-between select-none">
      <div className="flex items-center gap-2">
        <span className="font-mono font-semibold tracking-tight text-white text-[14px]">
          CATENAR // AI
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          PAYPAL SANDBOX LIVE
        </span>
      </div>

      <div className="flex items-center space-x-1.5">
        {triggers.map((t) => {
          const isActive = activeScenario === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onTriggerScenario(t.id)}
              disabled={isExecuting}
              className={`h-7 px-2.5 rounded-[6px] keycap-trigger text-[12px] font-medium flex items-center space-x-1.5 ${
                isActive ? 'border-[#0070BA] bg-[#1C212C] text-[#F3F5F8]' : 'text-[#9BA3B0] hover:text-[#F3F5F8]'
              } ${t.isReset ? 'hover:border-[#EF4444]' : ''}`}
            >
              <span className="keycap-badge">{t.key}</span>
              <span>{t.label}</span>
              {isActive && isExecuting && <RefreshCw className="w-3 h-3 animate-spin text-[#0070BA]" />}
            </button>
          );
        })}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onOpenCredentials}
          className="h-7 px-2.5 rounded-[6px] bg-[#171B24] border border-[#1F242D] hover:border-[#0070BA] text-[12px] font-medium text-[#F3F5F8] flex items-center space-x-1.5"
        >
          <KeyRound className="w-3.5 h-3.5 text-[#0070BA]" />
          <span>Sandbox Credentials</span>
        </button>
        <div className="h-6 px-2 rounded-[4px] bg-[#10B981]/10 border border-[#10B981]/30 flex items-center space-x-1 text-[11px] font-mono text-[#34D399]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>APIMatic MCP Verified</span>
        </div>
      </div>
    </header>
  );
};

export const JudgeSimulationBar = JudgeCommandBar;
export const Header = JudgeCommandBar;
export default JudgeCommandBar;
