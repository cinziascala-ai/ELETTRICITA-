import React from 'react';
import { ViewMode } from '../types/lesson';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onSelectView }) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-40 no-print">
      {/* Zone 1: Single text element wordmark */}
      <button
        onClick={() => onSelectView('presentation')}
        className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-sky-600 transition-colors text-left"
      >
        TecnoLab <span className="font-normal text-slate-400">·</span> Elettricità & Magnetismo
      </button>

      {/* Zone 2: 4-5 clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
        <button
          onClick={() => onSelectView('presentation')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
            currentView === 'presentation' ? 'text-sky-600 font-semibold' : ''
          }`}
        >
          Presentazione LIM
        </button>
        <button
          onClick={() => onSelectView('study-guide')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
            currentView === 'study-guide' ? 'text-sky-600 font-semibold' : ''
          }`}
        >
          Quaderno di Studio
        </button>
        <button
          onClick={() => onSelectView('simulator')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
            currentView === 'simulator' ? 'text-sky-600 font-semibold' : ''
          }`}
        >
          Laboratori Interattivi
        </button>
        <button
          onClick={() => onSelectView('glossary')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
            currentView === 'glossary' ? 'text-sky-600 font-semibold' : ''
          }`}
        >
          Glossario Tecnico
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => onSelectView('quiz')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            currentView === 'quiz'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
          }`}
        >
          Verifica le Competenze
        </button>
      </div>
    </header>
  );
};
