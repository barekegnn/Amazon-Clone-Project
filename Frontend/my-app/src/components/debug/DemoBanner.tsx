import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { DEMO_MODE } from '../../utils/constants';
import { getItem, setItem } from '../../utils/storage';

export const DemoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = getItem<boolean>(DEMO_MODE.bannerDismissedKey);
    if (!isDismissed && DEMO_MODE.enabled) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setItem(DEMO_MODE.bannerDismissedKey, true);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 px-4 relative z-50 border-b-4 border-yellow-400 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <AlertCircle size={24} className="shrink-0 text-yellow-300 animate-pulse" />
          <div className="text-center md:text-left">
            <p className="text-base font-bold text-yellow-300">
              ⚠️ PORTFOLIO PROJECT - DO NOT ENTER REAL INFORMATION ⚠️
            </p>
            <p className="text-sm mt-1">
              This is a demo e-commerce clone for portfolio purposes only. 
              All payment processing is simulated. Do not enter real personal or financial data.
            </p>
          </div>
        </div>
        
        <button
          onClick={handleDismiss}
          className="p-2 hover:bg-white/20 rounded-full transition-colors shrink-0 border border-white/30"
          aria-label="Dismiss demo banner"
          title="This banner helps keep our site safe for everyone"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
