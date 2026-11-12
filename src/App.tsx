import React, { useState } from 'react';
import { ViewMode, LessonId } from './types/lesson';
import { Header } from './components/Header';
import { PresentationMode } from './components/PresentationMode';
import { StudyGuideView } from './components/StudyGuideView';
import { CircuitSimulator } from './components/CircuitSimulator';
import { MagnetismSimulator } from './components/MagnetismSimulator';
import { HydraulicAnalogy } from './components/HydraulicAnalogy';
import { OhmTriangle } from './components/OhmTriangle';
import { QuizView } from './components/QuizView';
import { GlossaryView } from './components/GlossaryView';
import { PrintableSummary } from './components/PrintableSummary';
import {
  Presentation,
  BookOpen,
  Cpu,
  HelpCircle,
  BookMarked,
  Zap,
  Magnet,
  Droplets,
  Printer,
  ShieldCheck,
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('presentation');
  const [currentLesson, setCurrentLesson] = useState<LessonId>('lesson-1');
  const [simulatorTab, setSimulatorTab] = useState<'circuit' | 'magnet' | 'hydraulic' | 'triangle'>('circuit');
  const [isPrintOpen, setIsPrintOpen] = useState<boolean>(false);

  if (isPrintOpen) {
    return <PrintableSummary onBack={() => setIsPrintOpen(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header Top Bar Contract */}
      <Header currentView={currentView} onSelectView={setCurrentView} />

      {/* Sub-bar / Barra di Navigazione Mobile e Tablet */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto no-print">
        <button
          onClick={() => setCurrentView('presentation')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
            currentView === 'presentation' ? 'bg-sky-600 text-white' : 'text-slate-600 bg-slate-100'
          }`}
        >
          Presentazione
        </button>
        <button
          onClick={() => setCurrentView('study-guide')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
            currentView === 'study-guide' ? 'bg-sky-600 text-white' : 'text-slate-600 bg-slate-100'
          }`}
        >
          Quaderno
        </button>
        <button
          onClick={() => setCurrentView('simulator')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
            currentView === 'simulator' ? 'bg-sky-600 text-white' : 'text-slate-600 bg-slate-100'
          }`}
        >
          Laboratori
        </button>
        <button
          onClick={() => setCurrentView('glossary')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
            currentView === 'glossary' ? 'bg-sky-600 text-white' : 'text-slate-600 bg-slate-100'
          }`}
        >
          Glossario
        </button>
        <button
          onClick={() => setCurrentView('quiz')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
            currentView === 'quiz' ? 'bg-emerald-600 text-white' : 'text-emerald-700 bg-emerald-50'
          }`}
        >
          Quiz
        </button>
      </div>

      {/* Contenuto Principale */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
        {/* VISTA 1: PRESENTAZIONE SLIDE */}
        {currentView === 'presentation' && (
          <div className="space-y-6">
            <PresentationMode
              currentLesson={currentLesson}
              onSelectLesson={setCurrentLesson}
              onOpenSimulator={() => {
                setSimulatorTab(currentLesson === 'lesson-1' ? 'circuit' : 'magnet');
                setCurrentView('simulator');
              }}
              onOpenQuiz={() => setCurrentView('quiz')}
            />

            {/* Scheda di approfondimento rapido sotto le slide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div
                onClick={() => setCurrentView('study-guide')}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-xs space-y-1.5"
              >
                <div className="text-xs font-bold text-sky-700 uppercase tracking-wide flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Vuoi approfondire il testo?
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Apri la <strong>Dispensa di Studio</strong> per leggere le spiegazioni estese con tutte le definizioni dettagliate.
                </p>
              </div>

              <div
                onClick={() => {
                  setSimulatorTab('circuit');
                  setCurrentView('simulator');
                }}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-xs space-y-1.5"
              >
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> Laboratorio Virtuale
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sperimenta con il <strong>Banco di Prova</strong> dei circuiti, l'elettromagnete regolabile e l'analogia idraulica.
                </p>
              </div>

              <div
                onClick={() => setCurrentView('quiz')}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-xs space-y-1.5"
              >
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> Autovalutazione Formativa
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fai il <strong>Quiz da 10 o 20 domande</strong> con il commento pedagogico immediato del docente.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VISTA 2: DISPENSA & QUADERNO DI STUDIO */}
        {currentView === 'study-guide' && (
          <StudyGuideView
            onOpenPresentation={() => setCurrentView('presentation')}
            onOpenQuiz={() => setCurrentView('quiz')}
            onPrint={() => setIsPrintOpen(true)}
          />
        )}

        {/* VISTA 3: LABORATORI INTERATTIVI */}
        {currentView === 'simulator' && (
          <div className="space-y-6">
            {/* Selettore Laboratori */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Esperimenti Digitali</span>
                <h2 className="text-lg font-bold text-slate-900">Laboratorio Scientifico di Tecnologia</h2>
              </div>

              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setSimulatorTab('circuit')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    simulatorTab === 'circuit'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Circuito & Legge di Ohm
                </button>
                <button
                  onClick={() => setSimulatorTab('magnet')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    simulatorTab === 'magnet'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Magnet className="w-3.5 h-3.5 text-rose-500" />
                  Magnetismo & Elettromagnete
                </button>
                <button
                  onClick={() => setSimulatorTab('hydraulic')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    simulatorTab === 'hydraulic'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5 text-sky-500" />
                  Analogia Idraulica
                </button>
                <button
                  onClick={() => setSimulatorTab('triangle')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    simulatorTab === 'triangle'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                  Triangolo di Ohm (DSA)
                </button>
              </div>
            </div>

            {/* Contenuto del Laboratorio Selezionato */}
            {simulatorTab === 'circuit' && <CircuitSimulator />}
            {simulatorTab === 'magnet' && <MagnetismSimulator />}
            {simulatorTab === 'hydraulic' && <HydraulicAnalogy />}
            {simulatorTab === 'triangle' && <OhmTriangle />}
          </div>
        )}

        {/* VISTA 4: QUIZ DI VERIFICA */}
        {currentView === 'quiz' && (
          <QuizView onBackToStudy={() => setCurrentView('study-guide')} />
        )}

        {/* VISTA 5: GLOSSARIO TECNOLOGICO */}
        {currentView === 'glossary' && <GlossaryView />}
      </main>

      {/* Footer silenzioso e sobrio */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8 px-6 text-xs text-slate-500 no-print">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="font-semibold text-slate-800">
              TecnoLab · Didattica della Tecnologia per la Scuola Secondaria di Primo Grado
            </p>
            <p className="text-slate-400">
              Conforme alle Indicazioni Nazionali MIUR per il Curricolo di Tecnologia (Settore Energia, Materiali e Macchine).
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsPrintOpen(true)}
              className="hover:text-slate-700 transition-colors flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" /> Stampa Scheda Sintetica
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentView('glossary')}
              className="hover:text-slate-700 transition-colors"
            >
              Glossario 30 Termini
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
