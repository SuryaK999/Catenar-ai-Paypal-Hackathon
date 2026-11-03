import React, { useState } from 'react';
import { Send, DollarSign, Clock, ShieldCheck, ShoppingCart } from 'lucide-react';
import { CockpitMetrics } from '../types/telemetry.js';

interface ScoreboardPlaceholderPanelProps {
  metrics: CockpitMetrics;
  onSendNudge: () => void;
  nudgeDraft: string;
}

export const ScoreboardPlaceholderPanel: React.FC<ScoreboardPlaceholderPanelProps> = ({
  metrics,
  onSendNudge,
  nudgeDraft,
}) => {
  const [activeTab, setActiveTab] = useState<'LEDGER' | 'BOM'>('LEDGER');

  return (
    <div className="h-[54%] w-full bg-[#11141B] flex flex-col">
      {/* 4-Cell Scoreboard Ribbon */}
      <div className="grid grid-cols-4 border-b border-[#1F242D] divide-x divide-[#1F242D] bg-[#0A0C10]">
        <div className="p-2.5">
          <span className="text-[10px] font-mono uppercase text-[#9BA3B0] flex items-center space-x-1">
            <DollarSign className="w-3 h-3 text-[#0070BA]" />
            <span>Total Escrowed</span>
          </span>
          <p className="text-[17px] font-mono font-bold tabular-financial text-[#F3F5F8] mt-0.5">
            ${(metrics.totalEscrowedCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="p-2.5">
          <span className="text-[10px] font-mono uppercase text-[#9BA3B0] flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-[#10B981]" />
            <span>Cleared & Dispatched</span>
          </span>
          <p className="text-[17px] font-mono font-bold tabular-financial text-[#34D399] mt-0.5">
            ${(metrics.clearedEscrowCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="p-2.5">
          <span className="text-[10px] font-mono uppercase text-[#9BA3B0] flex items-center space-x-1">
            <Clock className="w-3 h-3 text-[#F97316]" />
            <span>At-Risk Slip Exposure</span>
          </span>
          <p className="text-[17px] font-mono font-bold tabular-financial text-[#FB923C] mt-0.5">
            {metrics.atRiskSlipHours}h ($8,000.00)
          </p>
        </div>

        <div className="p-2.5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#9BA3B0]">Friendly Nudges Sent</span>
            <p className="text-[17px] font-mono font-bold tabular-financial text-[#FBBF24] mt-0.5">
              {metrics.friendlyNudgesSent} Dispatched
            </p>
          </div>
          <button
            onClick={onSendNudge}
            className="h-6 px-2 rounded-[4px] bg-[#0070BA] hover:bg-[#005EA6] text-white text-[11px] font-medium flex items-center space-x-1"
          >
            <Send className="w-2.5 h-2.5" />
            <span>Nudge</span>
          </button>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="h-8 px-3 border-b border-[#1F242D] flex items-center space-x-4 bg-[#171B24]">
        <button
          onClick={() => setActiveTab('LEDGER')}
          className={`text-[12px] font-semibold tracking-wide transition-colors ${
            activeTab === 'LEDGER' ? 'text-[#F3F5F8] border-b-2 border-[#0070BA]' : 'text-[#636B78] hover:text-[#9BA3B0]'
          }`}
        >
          Tab A: Live Milestone Ledger & Nudge-Bot (AG Grid)
        </button>
        <button
          onClick={() => setActiveTab('BOM')}
          className={`text-[12px] font-semibold tracking-wide transition-colors ${
            activeTab === 'BOM' ? 'text-[#F3F5F8] border-b-2 border-[#0070BA]' : 'text-[#636B78] hover:text-[#9BA3B0]'
          }`}
        >
          Tab B: Channel3 BOM & Shipment Guardrails
        </button>
      </div>

      <div className="flex-1 p-3 overflow-auto">
        {activeTab === 'LEDGER' ? (
          <div className="space-y-2">
            <div className="p-2 bg-[#0A0C10] border border-[#1F242D] rounded-[6px] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#9BA3B0]">
                Friendly Nudge Preview: &ldquo;{nudgeDraft}&rdquo;
              </span>
              <span className="text-[10px] font-mono text-[#34D399] bg-[#10B981]/10 px-1.5 py-0.5 rounded-[4px]">
                AG Studio 3 Scoreboard
              </span>
            </div>
            <table className="w-full text-left text-[11px] font-mono divide-y divide-[#1F242D]">
              <thead className="text-[#636B78]">
                <tr>
                  <th className="py-1">Milestone</th>
                  <th>Role</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>PayPal ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F242D]/50 text-[#9BA3B0]">
                <tr>
                  <td className="py-2 text-[#F3F5F8]">RED V-Raptor Camera Rig</td>
                  <td>Director of Photography</td>
                  <td className="tabular-financial">$4,500.00</td>
                  <td><span className="px-1.5 py-0.5 rounded-[3px] bg-[#10B981]/15 text-[#34D399]">PAID</span></td>
                  <td>INV2-8492</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#F3F5F8]">Unreal Volume Calibration</td>
                  <td>Virtual Production Lead</td>
                  <td className="tabular-financial">$8,000.00</td>
                  <td><span className="px-1.5 py-0.5 rounded-[3px] bg-[#F97316]/15 text-[#FB923C]">+48h SLIP</span></td>
                  <td>INV2-8493</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-[#0A0C10] border border-[#1F242D] rounded-[6px] flex items-center space-x-3">
                <ShoppingCart className="w-6 h-6 text-[#0070BA]" />
                <div>
                  <p className="text-[12px] font-semibold text-[#F3F5F8]">RED Digital Cinema V-Raptor 8K</p>
                  <p className="text-[10px] font-mono text-[#9BA3B0]">Channel3 ID: ch3_prod_red_vraptor</p>
                  <p className="text-[11px] font-mono text-[#34D399] font-bold mt-1">PASS &lt;= BUDGET ($3,250.00)</p>
                </div>
              </div>
              <div className="p-2 bg-[#0A0C10] border border-[#1F242D] rounded-[6px] flex items-center space-x-3">
                <ShoppingCart className="w-6 h-6 text-[#0070BA]" />
                <div>
                  <p className="text-[12px] font-semibold text-[#F3F5F8]">ARRI Ultra Prime 35mm T1.9</p>
                  <p className="text-[10px] font-mono text-[#9BA3B0]">Channel3 ID: ch3_prod_arri_ultra35</p>
                  <p className="text-[11px] font-mono text-[#34D399] font-bold mt-1">PASS &lt;= BUDGET ($660.00)</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
