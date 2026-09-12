import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X, ExternalLink } from 'lucide-react';

export interface ToastProps {
  isOpen: boolean;
  type?: 'success' | 'error' | 'info';
  title: string;
  message: string;
  actionLabel?: string;
  actionUrl?: string;
  onActionClick?: () => void;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  type = 'success',
  title,
  message,
  actionLabel,
  actionUrl,
  onActionClick,
  onClose,
  duration = 6000,
}) => {
  useEffect(() => {
    if (!isOpen || duration <= 0) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const bgStyles = {
    success: 'bg-emerald-900/95 border-emerald-500/50 text-white shadow-emerald-950/30',
    error: 'bg-rose-900/95 border-rose-500/50 text-white shadow-rose-950/30',
    info: 'bg-brand-navy-deep/95 border-brand-green/50 text-white shadow-slate-950/30',
  }[type];

  const IconComponent = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
  }[type];

  const iconColor = {
    success: 'text-emerald-400',
    error: 'text-rose-400',
    info: 'text-brand-green',
  }[type];

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-auto animate-bounce-subtle pointer-events-auto"
    >
      <div
        className={`flex items-start gap-3.5 p-4 rounded-2xl border shadow-2xl backdrop-blur-md transition-all duration-300 ${bgStyles}`}
      >
        <div className="shrink-0 pt-0.5">
          <IconComponent className={`w-5 h-5 ${iconColor}`} />
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <h4 className="text-sm font-bold tracking-tight text-white">{title}</h4>
          <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{message}</p>

          {(actionLabel || actionUrl) && (
            <div className="mt-2.5 flex items-center gap-2">
              {actionUrl ? (
                <a
                  href={actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors"
                >
                  <span>{actionLabel || 'Open'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : onActionClick ? (
                <button
                  type="button"
                  onClick={onActionClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>{actionLabel || 'Action'}</span>
                </button>
              ) : null}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
