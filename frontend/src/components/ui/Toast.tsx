'use client';

import { useEffect, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: number;
  text: string;
  type: ToastType;
}

let toastId = 0;
let addToastFn: ((text: string, type: ToastType) => void) | null = null;

export function showToast(text: string, type: ToastType = 'info') {
  addToastFn?.(text, type);
}

const TYPE_STYLES: Record<ToastType, string> = {
  success: 'bg-emerald-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-slate-700 text-white',
};

const TYPE_ICONS: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((text: string, type: ToastType) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, text, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  useEffect(() => {
    addToastFn = addToast;
    return () => {
      addToastFn = null;
    };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-xl shadow-lg animate-slide-in ${TYPE_STYLES[toast.type]}`}
        >
          <span className="text-sm font-bold w-5 h-5 flex items-center justify-center rounded-full bg-white/20">
            {TYPE_ICONS[toast.type]}
          </span>
          <span className="text-sm font-medium">{toast.text}</span>
        </div>
      ))}
    </div>
  );
}
