import React from 'react';
import { X, QrCode, ShieldCheck, Activity } from 'lucide-react';

interface PayPalQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceId?: string;
  amount?: string;
  qrCodeBase64?: string;
  onSimulatePayment?: () => void;
}

export const PayPalQrModal: React.FC<PayPalQrModalProps> = ({
  isOpen,
  onClose,
  invoiceId = 'INV2-8492-7482',
  amount = '4,500.00',
  qrCodeBase64,
  onSimulatePayment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-[440px] bg-[#11141B] border border-[#1F242D] rounded-[8px] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="h-12 px-4 bg-[#171B24] border-b border-[#1F242D] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <QrCode className="w-4 h-4 text-[#0070BA]" />
            <span className="text-[13px] font-mono font-semibold text-white tracking-tight">
              Catenar.ai Settlement Engine
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#9BA3B0] hover:text-white transition-colors p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-[#0070BA]/10 text-[#0070BA] border border-[#0070BA]/20">
            <Activity className="w-3 h-3 text-[#0070BA]" />
            <span>Catenar Telemetry Stream Active</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-[15px] font-semibold text-[#F3F5F8]">
              PayPal Sandbox Live Settlement
            </h3>
            <p className="text-[11px] font-mono text-[#9BA3B0]">
              Invoice {invoiceId} • USD ${amount}
            </p>
          </div>

          {/* QR Container */}
          <div className="p-3 bg-white rounded-[8px] shadow-inner flex items-center justify-center">
            {qrCodeBase64 && qrCodeBase64.startsWith('data:image') ? (
              <img src={qrCodeBase64} alt="PayPal QR Code" className="w-48 h-48" />
            ) : (
              <div className="w-48 h-48 bg-[#0A0C10] border border-[#1F242D] rounded-[6px] flex flex-col items-center justify-center p-3 text-center">
                <QrCode className="w-12 h-12 text-[#0070BA] mb-2" />
                <span className="text-[10px] font-mono text-[#34D399]">
                  PAYPAL-QR-SIMULATOR
                </span>
                <span className="text-[9px] font-mono text-[#636B78] mt-1">
                  Catenar.ai Cryptographic Escrow
                </span>
              </div>
            )}
          </div>

          <p className="text-[11px] text-[#9BA3B0] max-w-xs">
            Scan via the PayPal Sandbox App or simulate an instant buyer scan to clear funds into escrow.
          </p>

          {/* Action Buttons */}
          <div className="w-full space-y-2 pt-1">
            {onSimulatePayment && (
              <button
                onClick={() => {
                  onSimulatePayment();
                  onClose();
                }}
                className="w-full h-8 bg-[#10B981] hover:bg-[#059669] text-white text-[12px] font-medium font-mono rounded-[6px] flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Simulate Buyer Sandbox Scan</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full h-8 bg-[#171B24] hover:bg-[#1F242D] text-[#9BA3B0] hover:text-white text-[12px] font-medium rounded-[6px] transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#0A0C10] border-t border-[#1F242D] flex items-center justify-between text-[10px] font-mono text-[#636B78]">
          <span>Catenar.ai Settlement Engine</span>
          <span className="flex items-center space-x-1 text-[#34D399]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>PAYPAL SANDBOX LIVE</span>
          </span>
        </div>
      </div>
    </div>
  );
};
