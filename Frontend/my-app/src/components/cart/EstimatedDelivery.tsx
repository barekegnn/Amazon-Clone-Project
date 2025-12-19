import React from 'react';
import { Truck } from 'lucide-react';
import { formatDeliveryDateRange } from '../../utils/formatters';

interface EstimatedDeliveryProps {
  startDays?: number;
  endDays?: number;
  className?: string;
}

export const EstimatedDelivery: React.FC<EstimatedDeliveryProps> = ({
  startDays = 2,
  endDays = 5,
  className = ''
}) => {
  const deliveryRange = formatDeliveryDateRange(startDays, endDays);

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <Truck size={16} className="text-[#067D62]" />
      <span className="text-[#067D62] font-medium">
        FREE delivery {deliveryRange}
      </span>
    </div>
  );
};
