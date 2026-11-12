import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  BookOpen,
  GraduationCap,
  Sparkles,
  Info,
  CheckCircle2,
  RotateCcw,
  Zap,
  Magnet,
  Shield,
  Layers,
} from 'lucide-react';
import { SlideContent, LessonId } from '../types/lesson';
import { LESSON_1_SLIDES } from '../data/lesson1Data';
import { LESSON_2_SLIDES } from '../data/lesson2Data';
import { HydraulicAnalogy } from './HydraulicAnalogy';
import { OhmTriangle } from './OhmTriangle';

interface PresentationModeProps {
  currentLesson: LessonId;
  onSelectLesson: (id: LessonId) => void;
  onOpenSimulator: () => void;
  onOpenQuiz: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  currentLesson,
  onSelectLesson,
  onOpenSimulator,
  onOpenQuiz,
}) => {
  const slides = currentLesson === 'lesson-1' ? LESSON_1_SLIDES : LESSON_2_SLIDES;
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [showTeacherNotes, setShowTeacherNotes] = useState<boolean>(false);
  const [showDeepDive, setShowDeepDive] = useState<boolean>(false);
  const [showSimplified, setShowSimplified] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentSlide = slides[slideIndex] || slides[0];

  // Reset slide quando si cambia lezione
  useEffect(() => {
    setSlideIndex(0);
    stopSpeaking();
  }, [currentLesson]);

  // Gestione tastiera (Freccia destra/sinistra)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slideIndex, slides.length]);

  const nextSlide = () => {
    stopSpeaking();
    if (slideIndex < slides.length - 1) {
      setSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    stopSpeaking();
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
    }
  };

  // Lettura vocale sintetica per DSA e accessibilità (Web Speech API)
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      stopSpeaking();
    } else {
      const textToRead = `${currentSlide.title}. ${currentSlide.subtitle}. ${currentSlide.keyPoints.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'it-IT';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`flex flex-col bg-slate-900 text-slate-100 rounded-2xl overflow-hidden shadow-xl border border-slate-800 transition-all ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'w-full'
    }`}>
      {/* Top Bar della Presentazione */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-3">
          {/* Selettore Lezione 1 / Lezione 2 */}
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => onSelectLesson('lesson-1')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                currentLesson === 'lesson-1'
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Lezione 1: Elettricità
            </button>
            <button
              onClick={() => onSelectLesson('lesson-2')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                currentLesson === 'lesson-2'
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Lezione 2: Magnetismo
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span>·</span>
            <span>Diapositiva <strong className="text-white font-mono">{slideIndex + 1}</strong> di <span className="font-mono">{slides.length}</span></span>
          </div>
        </div>

        {/* Strumenti Didattici Top */}
        <div className="flex items-center gap-2">
          {/* Sintesi Vocale */}
          {'speechSynthesis' in window && (
            <button
              onClick={toggleSpeech}
              title={isSpeaking ? 'Ferma lettura vocale' : 'Ascolta la diapositiva (Lettura facilitata)'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isSpeaking
                  ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              <span className="hidden md:inline">{isSpeaking ? 'Ferma Voce' : 'Ascolta Slide'}</span>
            </button>
          )}

          {/* Note Docente */}
          <button
            onClick={() => setShowTeacherNotes(!showTeacherNotes)}
            title="Note e spunti metodologici per il docente"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showTeacherNotes
                ? 'bg-amber-600/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Note Docente</span>
          </button>

          {/* Schermo Intero */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Esci da schermo intero' : 'Schermo Intero per LIM'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Slide Body */}
      <div className="p-6 md:p-10 min-h-[500px] flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          {/* Header Diapositiva */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400">
              <span>{currentLesson === 'lesson-1' ? 'LEZIONE 1' : 'LEZIONE 2'}</span>
              <span>·</span>
              <span>SLIDE {slideIndex + 1}/{slides.length}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight text-balance">
              {currentSlide.title}
            </h2>
            <p className="text-base text-slate-300 font-medium">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Visual Showcase Specifica della Diapositiva */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
            {/* Punti Chiave di Studio (7 colonne) */}
            <div className="lg:col-span-7 space-y-3.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Concetti Fondamentali da Apprendere:
              </span>
              <ul className="space-y-3">
                {currentSlide.keyPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 text-sm md:text-[15px] leading-relaxed"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Bottoni interattivi di collegamento diretto se pertinente */}
              <div className="pt-2 flex flex-wrap gap-2">
                {currentSlide.visualType === 'hydraulic' && (
                  <button
                    onClick={onOpenSimulator}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-200 bg-sky-950/80 border border-sky-600/40 rounded-lg hover:bg-sky-900 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-sky-400" />
                    Apri Simulatore Idraulico Completo
                  </button>
                )}
                {(currentSlide.visualType === 'circuit-types' || currentSlide.visualType === 'units-table') && (
                  <button
                    onClick={onOpenSimulator}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-200 bg-amber-950/80 border border-amber-600/40 rounded-lg hover:bg-amber-900 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Prova il Banco Circuiti Interattivo
                  </button>
                )}
                {(currentSlide.visualType === 'magnetic-field' || currentSlide.visualType === 'electromagnet') && (
                  <button
                    onClick={onOpenSimulator}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-200 bg-rose-950/80 border border-rose-600/40 rounded-lg hover:bg-rose-900 transition-colors"
                  >
                    <Magnet className="w-3.5 h-3.5 text-rose-400" />
                    Apri Laboratorio Magneti & Graffette
                  </button>
                )}
                {slideIndex === slides.length - 1 && (
                  <button
                    onClick={onOpenQuiz}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Fai il Quiz di Verifica Formativa (10 Domande)
                  </button>
                )}
              </div>
            </div>

            {/* Colonna Destra: Scheda Visiva o Diagramma (5 colonne) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Illustrazione Didattica SVG a tema */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
                {/* 1. Atomo */}
                {currentSlide.visualType === 'atom' && (
                  <svg className="w-48 h-48" viewBox="0 0 200 200">
                    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 3" transform="rotate(30 100 100)" />
                    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 3" transform="rotate(-30 100 100)" />
                    <ellipse cx="100" cy="100" rx="80" ry="25" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 3" transform="rotate(90 100 100)" />
                    {/* Nucleo */}
                    <circle cx="100" cy="100" r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                    <circle cx="95" cy="95" r="7" fill="#ef4444" />
                    <text x="95" y="99" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">+</text>
                    <circle cx="106" cy="98" r="7" fill="#94a3b8" />
                    <text x="106" y="102" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">0</text>
                    <circle cx="98" cy="107" r="7" fill="#ef4444" />
                    <text x="98" y="111" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">+</text>
                    {/* Elettroni orbitanti */}
                    <circle cx="35" cy="65" r="5" fill="#38bdf8" />
                    <text x="35" y="68" fill="#020617" fontSize="8" fontWeight="bold" textAnchor="middle">-</text>
                    <circle cx="165" cy="135" r="5" fill="#38bdf8" />
                    <text x="165" y="138" fill="#020617" fontSize="8" fontWeight="bold" textAnchor="middle">-</text>
                    <circle cx="100" cy="20" r="5" fill="#38bdf8" />
                    <text x="100" y="23" fill="#020617" fontSize="8" fontWeight="bold" textAnchor="middle">-</text>
                  </svg>
                )}

                {/* 2. Conduttori e Isolanti */}
                {currentSlide.visualType === 'conductors' && (
                  <div className="w-full space-y-2 text-xs">
                    <div className="p-3 bg-slate-900 rounded-lg border border-emerald-900/60">
                      <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Conduttori Eccellenti
                      </div>
                      <p className="text-slate-300">Rame, Alluminio, Oro, Argento, Ottone, Acqua salata.</p>
                      <div className="text-[11px] text-emerald-300/80 mt-1">Elettroni liberi pronti a correre!</div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg border border-rose-900/60">
                      <div className="font-bold text-rose-400 mb-1 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" /> Isolanti Sicuri
                      </div>
                      <p className="text-slate-300">Gomma, Plastica (PVC), Vetro, Ceramica, Legno asciutto.</p>
                      <div className="text-[11px] text-rose-300/80 mt-1">Elettroni saldamente legati ai nuclei.</div>
                    </div>
                  </div>
                )}

                {/* 3. Tabella Unità e Grandezze */}
                {currentSlide.visualType === 'units-table' && (
                  <div className="w-full text-xs space-y-2">
                    <div className="font-bold text-sky-400 pb-1 border-b border-slate-800">Grandezze e Simboli (SI)</div>
                    <div className="grid grid-cols-3 gap-1 text-[11px] text-slate-300">
                      <span className="font-bold text-white">Tensione (V)</span>
                      <span>Volt (V)</span>
                      <span className="text-sky-300 font-mono">V = R · I</span>

                      <span className="font-bold text-white">Corrente (I)</span>
                      <span>Ampere (A)</span>
                      <span className="text-sky-300 font-mono">I = V / R</span>

                      <span className="font-bold text-white">Resistenza (R)</span>
                      <span>Ohm (Ω)</span>
                      <span className="text-sky-300 font-mono">R = V / I</span>

                      <span className="font-bold text-white">Potenza (P)</span>
                      <span>Watt (W)</span>
                      <span className="text-sky-300 font-mono">P = V · I</span>

                      <span className="font-bold text-white">Energia (E)</span>
                      <span>kWh o Joule</span>
                      <span className="text-sky-300 font-mono">E = P · t</span>
                    </div>
                  </div>
                )}

                {/* 4. Poli Magnetici */}
                {currentSlide.visualType === 'magnet-poles' && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center shadow-lg rounded-md overflow-hidden">
                      <div className="w-20 h-14 bg-red-600 flex flex-col items-center justify-center text-white font-extrabold text-xl">
                        N
                        <span className="text-[9px] font-normal tracking-wide">NORD</span>
                      </div>
                      <div className="w-20 h-14 bg-blue-600 flex flex-col items-center justify-center text-white font-extrabold text-xl">
                        S
                        <span className="text-[9px] font-normal tracking-wide">SUD</span>
                      </div>
                    </div>
                    <p className="text-xs text-center text-slate-400 max-w-xs">
                      Poli uguali si respingono (<strong className="text-red-400">N-N</strong> / <strong className="text-blue-400">S-S</strong>)<br />
                      Poli opposti si attraggono (<strong className="text-white">N-S</strong>)
                    </p>
                  </div>
                )}

                {/* 5. Campo Magnetico Terrestre */}
                {currentSlide.visualType === 'magnetic-field' && (
                  <svg className="w-48 h-48" viewBox="0 0 200 200">
                    {/* Terra */}
                    <circle cx="100" cy="100" r="40" fill="#0f766e" stroke="#38bdf8" strokeWidth="2" />
                    {/* Continenti stilizzati */}
                    <circle cx="95" cy="88" r="14" fill="#15803d" />
                    <circle cx="110" cy="115" r="16" fill="#15803d" />
                    {/* Barra magnetica interna */}
                    <rect x="94" y="70" width="12" height="30" fill="#2563eb" />
                    <rect x="94" y="100" width="12" height="30" fill="#dc2626" />
                    {/* Linee di campo che avvolgono la Terra */}
                    <ellipse cx="100" cy="100" rx="75" ry="50" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                    <ellipse cx="100" cy="100" rx="90" ry="70" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" />
                    <text x="100" y="55" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">N Geografico</text>
                    <text x="100" y="152" fill="#60a5fa" fontSize="9" fontWeight="bold" textAnchor="middle">S Geografico</text>
                  </svg>
                )}

                {/* 6. Esperimenti Oersted & Faraday */}
                {currentSlide.visualType === 'oersted-faraday' && (
                  <div className="space-y-3 text-xs w-full">
                    <div className="p-3 bg-sky-950/70 border border-sky-800 rounded-lg">
                      <span className="font-bold text-sky-300 block">1820 · Esperimento di Oersted</span>
                      <p className="text-slate-300 text-[11px] mt-0.5">
                        Filo percorso da corrente fa scattare l'ago di una bussola: <em>l'elettricità genera magnetismo!</em>
                      </p>
                    </div>
                    <div className="p-3 bg-amber-950/70 border border-amber-800 rounded-lg">
                      <span className="font-bold text-amber-300 block">1831 · Induzione di Faraday</span>
                      <p className="text-slate-300 text-[11px] mt-0.5">
                        Magnete che si muove dentro una bobina produce corrente: <em>il magnetismo genera elettricità!</em>
                      </p>
                    </div>
                  </div>
                )}

                {/* 7. Elettromagnete */}
                {currentSlide.visualType === 'electromagnet' && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-40 h-10 bg-slate-700 rounded flex items-center justify-center relative border border-slate-500">
                      <span className="text-xs font-mono font-bold text-slate-200">NUCLEO IN FERRO</span>
                      {/* Spire */}
                      <div className="absolute inset-0 flex justify-around items-center">
                        {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                          <div key={s} className="w-1.5 h-12 bg-amber-500 rounded-full shadow-sm" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-center text-slate-300 mt-2">
                      Filo di rame avvolto a spirale (solenoide) con nucleo di ferro dolce.
                    </p>
                  </div>
                )}

                {/* 8. Motore vs Generatore */}
                {currentSlide.visualType === 'motor-generator' && (
                  <div className="grid grid-cols-2 gap-2 text-xs w-full text-center">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-sky-800">
                      <span className="font-bold text-sky-400 block mb-1">MOTORE</span>
                      <div className="text-[11px] text-slate-300">
                        Entra: <strong className="text-amber-400">Elettricità</strong><br />
                        Esce: <strong className="text-emerald-400">Movimento</strong>
                      </div>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-emerald-800">
                      <span className="font-bold text-emerald-400 block mb-1">ALTERNATORE</span>
                      <div className="text-[11px] text-slate-300">
                        Entra: <strong className="text-emerald-400">Movimento</strong><br />
                        Esce: <strong className="text-amber-400">Elettricità</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* 9. Sicurezza */}
                {currentSlide.visualType === 'safety' && (
                  <div className="space-y-2 text-xs w-full">
                    <div className="flex items-center gap-2 p-2 bg-rose-950/60 border border-rose-800 rounded-lg text-rose-200">
                      <Shield className="w-4 h-4 text-rose-400 shrink-0" />
                      <span><strong>Salvavita (Differenziale):</strong> toglie corrente se c'è dispersione &gt; 30 mA.</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-amber-950/60 border border-amber-800 rounded-lg text-amber-200">
                      <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 shrink-0 border border-green-600" />
                      <span><strong>Messa a terra (giallo-verde):</strong> scarica dispersioni nel terreno.</span>
                    </div>
                  </div>
                )}

                {/* 10. Applicazioni Tecnologiche */}
                {currentSlide.visualType === 'applications' && (
                  <div className="grid grid-cols-2 gap-2 text-[11px] w-full text-slate-300">
                    <div className="p-2 bg-slate-900 rounded border border-slate-800">🚄 Treno Maglev (600 km/h)</div>
                    <div className="p-2 bg-slate-900 rounded border border-slate-800">🍳 Piani a induzione</div>
                    <div className="p-2 bg-slate-900 rounded border border-slate-800">🔊 Casse acustiche & cuffie</div>
                    <div className="p-2 bg-slate-900 rounded border border-slate-800">🏗️ Gru con elettrocalamita</div>
                  </div>
                )}
              </div>

              {/* Box Semplificato BES / DSA */}
              {currentSlide.simplified && (
                <div className="p-3.5 bg-slate-800/80 rounded-xl border border-sky-900/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-sky-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> {currentSlide.simplified.title}
                    </span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {currentSlide.simplified.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-sky-400 font-bold">›</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  {currentSlide.simplified.analogy && (
                    <p className="text-[11px] text-amber-300/90 italic pt-1 border-t border-slate-700/50">
                      ✨ {currentSlide.simplified.analogy}
                    </p>
                  )}
                </div>
              )}

              {/* Box Approfondimento Storico / Curiosità */}
              {currentSlide.deepDive && (
                <div className="p-3.5 bg-slate-800/80 rounded-xl border border-amber-900/50 space-y-1">
                  <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" /> Approfondimento: {currentSlide.deepDive.title}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentSlide.deepDive.content}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Note Docente Espandibili */}
        {showTeacherNotes && (
          <div className="mt-6 p-4 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-200 text-xs space-y-1 animate-fadeIn">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> Spunto didattico per la spiegazione del docente:
            </div>
            <p className="leading-relaxed">{currentSlide.teacherNotes}</p>
          </div>
        )}
      </div>

      {/* Barra di Navigazione Inferiore */}
      <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Pulsante Precedente */}
        <button
          onClick={prevSlide}
          disabled={slideIndex === 0}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border transition-colors ${
            slideIndex === 0
              ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-500'
              : 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Precedente
        </button>

        {/* Miniature / Indicatori di avanzamento */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full px-2 py-1">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                stopSpeaking();
                setSlideIndex(idx);
              }}
              title={`Vai a: ${s.title}`}
              className={`h-2.5 rounded-full transition-all ${
                idx === slideIndex
                  ? 'w-8 bg-sky-500'
                  : 'w-2.5 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Pulsante Successiva */}
        <button
          onClick={nextSlide}
          disabled={slideIndex === slides.length - 1}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border transition-colors ${
            slideIndex === slides.length - 1
              ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-500'
              : 'border-sky-600 bg-sky-600 text-white hover:bg-sky-500'
          }`}
        >
          Successiva
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
