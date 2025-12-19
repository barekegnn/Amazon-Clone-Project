import React from 'react';
import { Check } from 'lucide-react';

interface ProgressStep {
  id: number;
  label: string;
  completed: boolean;
  active: boolean;
}

interface CheckoutProgressProps {
  currentStep: number;
  steps?: string[];
}

export const CheckoutProgress: React.FC<CheckoutProgressProps> = ({
  currentStep,
  steps = ['Cart', 'Shipping', 'Payment', 'Review']
}) => {
  const progressSteps: ProgressStep[] = steps.map((label, index) => ({
    id: index + 1,
    label,
    completed: index < currentStep - 1,
    active: index === currentStep - 1
  }));

  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {progressSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center relative">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                    transition-colors duration-300
                    ${step.completed 
                      ? 'bg-[#067D62] text-white' 
                      : step.active 
                        ? 'bg-[#FF9900] text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {step.completed ? <Check size={20} /> : step.id}
                </div>
                <span
                  className={`
                    mt-2 text-xs font-medium
                    ${step.active ? 'text-gray-900' : 'text-gray-500'}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < progressSteps.length - 1 && (
                <div className="flex-1 h-1 mx-2 relative top-[-12px]">
                  <div
                    className={`
                      h-full transition-colors duration-300
                      ${step.completed ? 'bg-[#067D62]' : 'bg-gray-200'}
                    `}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
