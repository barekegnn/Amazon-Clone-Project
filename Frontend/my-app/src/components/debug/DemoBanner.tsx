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
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <AlertCircle size={20} className="shrink-0" />
          <p className="text-sm font-medium">
            <span className="font-bold">Demo Mode:</span> This is a portfolio project. 
            No real transactions will be processed. All data is simulated for demonstration purposes.
          </p>
        </div>
        
        <button
          onClick={handleDismiss}
          className="p-1 hover:bg-white/20 rounded-full transition-colors shrink-0"
          aria-label="Dismiss demo banner"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
