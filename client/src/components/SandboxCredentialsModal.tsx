import React, { useState } from 'react';
import { X, Copy, Check, Shield } from 'lucide-react';

interface SandboxCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SandboxCredentialsModal: React.FC<SandboxCredentialsModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const creds = [
    { key: 'merchant_email', label: 'Merchant Sandbox Email', val: 'merchant-facilitator@catenar.ai' },
    { key: 'buyer_email', label: 'Buyer Sandbox Email', val: 'buyer-client@catenar.ai' },
    { key: 'sandbox_pass', label: 'Sandbox Test Password', val: 'Catenar2026!Sandbox' },
    { key: 'client_id', label: 'PayPal Sandbox Client ID', val: 'A_SAMPLE_PAYPAL_SANDBOX_CLIENT_ID' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-[460px] bg-[#11141B] border border-[#1F242D] rounded-[8px] overflow-hidden shadow-2xl">
        <div className="h-11 px-4 bg-[#171B24] border-b border-[#1F242D] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[#0070BA]" />
            <span className="text-[13px] font-semibold text-[#F3F5F8]">PayPal Sandbox Test Credentials</span>
          </div>
          <button onClick={onClose} className="text-[#9BA3B0] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <p className="text-[11px] text-[#9BA3B0] font-sans">
            Use these pre-configured developer accounts to test invoices, QR checkouts, and milestone payouts inside the PayPal Sandbox.
          </p>

          <div className="space-y-2">
            {creds.map((c) => (
              <div key={c.key} className="p-2 bg-[#0A0C10] border border-[#1F242D] rounded-[6px] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#636B78] uppercase">{c.label}</span>
                  <p className="text-[12px] font-mono text-[#F3F5F8] select-all">{c.val}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(c.key, c.val)}
                  className="h-6 px-2 rounded-[4px] bg-[#171B24] border border-[#1F242D] hover:border-[#0070BA] text-[11px] font-mono text-[#9BA3B0] hover:text-white flex items-center space-x-1"
                >
                  {copiedKey === c.key ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === c.key ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
