import React from 'react';
import { Calendar, Truck } from 'lucide-react';

interface TimelinePlaceholderPanelProps {
  shiftHours: number;
  paymentStatus: 'PENDING' | 'PAID' | 'DELAYED';
  isFedexDispatched: boolean;
}

export const TimelinePlaceholderPanel: React.FC<TimelinePlaceholderPanelProps> = ({
  shiftHours,
  paymentStatus,
  isFedexDispatched,
}) => {
  return (
    <div className="h-[46%] w-full bg-[#0A0C10] border-b border-[#1F242D] flex flex-col">
      <div className="h-8 px-3 border-b border-[#1F242D] flex items-center justify-between bg-[#11141B]">
        <div className="flex items-center space-x-2">
          <Calendar className="w-3.5 h-3.5 text-[#0070BA]" />
          <span className="text-[12px] font-semibold tracking-wide text-[#F3F5F8]">
            PAYMENT-REACTIVE SCHEDULE // BRYNTUM TIMELINE
          </span>
          <span className="text-[10px] font-mono bg-[#171B24] border border-[#1F242D] px-1.5 py-0.5 rounded-[4px] text-[#9BA3B0]">
            320ms Causal Slide
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] font-mono">
          <span className="flex items-center space-x-1 text-[#34D399]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>PAID / UNLOCKED</span>
          </span>
          <span className="flex items-center space-x-1 text-[#FBBF24]">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span>PENDING ESCROW</span>
          </span>
          <span className="flex items-center space-x-1 text-[#FB923C]">
            <span className="w-2 h-2 rounded-full bg-[#F97316]" />
            <span>+48h SLIP RISK</span>
          </span>
        </div>
      </div>

      <div className="flex-1 p-4 relative overflow-hidden flex flex-col justify-around">
        {/* Milestone 1 Bar */}
        <div className="relative flex items-center">
          <div className="w-56 text-[12px] font-medium text-[#9BA3B0] truncate pr-2">
            1. RED V-Raptor 8K Camera Rig
          </div>
          <div className="flex-1 relative h-9 bg-[#11141B] rounded-[6px] border border-[#1F242D] flex items-center px-3">
            <div
              className={`h-7 px-3 rounded-[4px] flex items-center justify-between transition-all duration-300 ${
                paymentStatus === 'PAID'
                  ? 'bg-[#10B981]/20 border border-[#10B981]/40 text-[#34D399]'
                  : 'bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#FBBF24]'
              }`}
              style={{ width: '42%' }}
            >
              <span className="text-[11px] font-mono font-medium">INV2-8492</span>
              <span className="text-[11px] font-mono tabular-financial font-bold">$4,500.00</span>
              <span className="text-[10px] font-mono uppercase px-1 rounded bg-[#0A0C10]/60">
                {paymentStatus}
              </span>
            </div>
            {isFedexDispatched && (
              <div className="ml-3 h-6 px-2 rounded-[4px] bg-[#0070BA]/20 border border-[#0070BA]/40 text-[10px] font-mono text-[#0070BA] flex items-center space-x-1">
                <Truck className="w-3 h-3 text-[#0070BA]" />
                <span>FEDEX FX-998241029US</span>
              </div>
            )}
          </div>
        </div>

        {/* Milestone 2 Bar with Causal Shift */}
        <div className="relative flex items-center">
          <div className="w-56 text-[12px] font-medium text-[#9BA3B0] truncate pr-2">
            2. Unreal Volume Calibration
          </div>
          <div className="flex-1 relative h-9 bg-[#11141B] rounded-[6px] border border-[#1F242D] flex items-center px-3">
            <div
              className={`h-7 px-3 rounded-[4px] flex items-center justify-between transition-all duration-500 ${
                shiftHours > 0
                  ? 'bg-[#F97316]/20 border border-[#F97316]/50 text-[#FB923C]'
                  : 'bg-[#171B24] border border-[#1F242D] text-[#9BA3B0]'
              }`}
              style={{
                width: '48%',
                marginLeft: shiftHours > 0 ? '12%' : '0%',
                transition: 'margin-left 320ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <span className="text-[11px] font-mono">INV2-8493</span>
              <span className="text-[11px] font-mono tabular-financial font-bold">$8,000.00</span>
              {shiftHours > 0 && (
                <span className="text-[10px] font-mono px-1 rounded bg-[#F97316] text-black font-bold">
                  +{shiftHours}h SLIP
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
