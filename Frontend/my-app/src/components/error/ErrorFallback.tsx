import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  message?: string;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  message = 'Something went wrong'
}) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle size={32} className="text-red-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {message}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
        
        {resetError && (
          <button
            onClick={resetError}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF9900] hover:bg-[#FA8900] text-white rounded-lg font-medium transition-colors"
          >
            <RefreshCw size={20} />
            Try Again
          </button>
        )}
        
        <div className="mt-6">
          <a
            href="/"
            className="text-[#007185] hover:text-[#C7511F] hover:underline text-sm"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};
