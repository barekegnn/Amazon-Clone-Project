import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
           <div 
             key={toast.id}
             className={`
               pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-md shadow-lg text-white min-w-[300px] animate-slideIn
               ${toast.type === 'success' ? 'bg-green-600' : 
                 toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}
             `}
           >
             {toast.type === 'success' && <CheckCircle size={20} />}
             {toast.type === 'error' && <AlertCircle size={20} />}
             {toast.type === 'info' && <Info size={20} />}
             
             <p className="flex-1 text-sm font-medium">{toast.message}</p>
             
             <button onClick={() => removeToast(toast.id)} className="hover:opacity-80">
               <X size={18} />
             </button>
           </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
