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
    <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-6 px-4 relative z-50 border-b-4 border-yellow-400 shadow-xl animate-pulse">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <AlertCircle size={32} className="shrink-0 text-yellow-300 animate-bounce" />
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-yellow-300 mb-2">
              ⚠️ PORTFOLIO DEMO PROJECT - NOT A REAL STORE ⚠️
            </p>
            <p className="text-base font-semibold mb-1">
              This is a demonstration website for portfolio purposes only.
            </p>
            <p className="text-sm">
              🚫 DO NOT enter real personal information, credit cards, or passwords 🚫
            </p>
            <p className="text-xs mt-2 text-yellow-200">
              All products, payments, and accounts are simulated for demonstration.
            </p>
          </div>
        </div>
        
        <button
          onClick={handleDismiss}
          className="p-3 hover:bg-white/20 rounded-full transition-colors shrink-0 border-2 border-white/30"
          aria-label="Dismiss demo banner"
          title="This banner helps keep our site safe for everyone"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};
