import React, { useState } from 'react';
import { Play, RotateCcw, Droplets, Gauge, ShieldAlert } from 'lucide-react';

export const HydraulicAnalogy: React.FC = () => {
  const [voltage, setVoltage] = useState<number>(12); // Volt (altezza/pressione serbatoio)
  const [resistance, setResistance] = useState<number>(4); // Ohm (strozzatura tubo)
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Calcoli fisici
  const current = Number((voltage / resistance).toFixed(2)); // Ampere
  const power = Number((voltage * current).toFixed(1)); // Watt

  // Velocità animazione in base alla corrente
  const speed = isPlaying ? Math.min(Math.max(current * 0.5, 0.4), 4) : 0;
  const pipeConstrictionPx = Math.max(16, 52 - resistance * 4); // larghezza del tubo in px

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header del Simulatore */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-sky-700 tracking-wide uppercase">Percorso Facilitato BES / DSA</span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">L'Analogia Idraulica del Circuito</h3>
          <p className="text-sm text-slate-600 mt-1">
            Comprendi le grandezze elettriche osservando l'acqua: il dislivello spinge, la strozzatura frena, il flusso scorre!
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Play className={`w-3.5 h-3.5 ${isPlaying ? 'text-amber-600 fill-amber-600' : 'text-slate-500'}`} />
            {isPlaying ? 'Ferma Flusso' : 'Avvia Flusso'}
          </button>
          <button
            onClick={() => {
              setVoltage(12);
              setResistance(4);
              setIsPlaying(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            title="Ripristina valori iniziali"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Zona Canvas Interattivo (7 colonne) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-xl p-5 text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[360px]">
          {/* Sfondo tecnico a griglia discreta */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* SVG Diagramma Idraulico Animato */}
          <svg className="w-full max-w-[540px] h-[300px]" viewBox="0 0 540 300">
            <defs>
              <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>

            {/* Serbatoio Superiore (Tensione / Volt) */}
            <g transform="translate(40, 20)">
              {/* Serbatoio box */}
              <rect x="0" y="0" width="100" height="120" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              {/* Livello acqua dipendente da Voltage (1V = 10px fino a 24V = 110px) */}
              <rect
                x="4"
                y={120 - Math.min(112, (voltage / 24) * 110)}
                width="92"
                height={Math.min(112, (voltage / 24) * 110)}
                rx="2"
                fill="url(#waterGrad)"
                opacity="0.85"
                className="transition-all duration-300"
              />
              <text x="50" y="55" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                SERBATOIO
              </text>
              <text x="50" y="75" fill="#bae6fd" fontSize="11" textAnchor="middle" className="font-mono">
                {voltage} V
              </text>
              <text x="50" y="92" fill="#94a3b8" fontSize="9" textAnchor="middle">
                (Dislivello / Pressione)
              </text>
            </g>

            {/* Tubo orizzontale superiore */}
            <rect x="140" y="40" width="120" height="24" fill="url(#pipeGrad)" />
            {isPlaying && (
              <g className="animate-pulse">
                <circle cx="160" cy="52" r="3" fill="#bae6fd" />
                <circle cx="190" cy="52" r="3" fill="#bae6fd" />
                <circle cx="220" cy="52" r="3" fill="#bae6fd" />
              </g>
            )}

            {/* Strozzatura / Valvola (Resistenza / Ohm) */}
            <g transform="translate(260, 24)">
              {/* Tubo strozzato */}
              <rect x="0" y="0" width="60" height="56" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" rx="4" />
              {/* Morsa che si stringe in base a resistance */}
              <rect
                x="15"
                y="6"
                width="30"
                height={Math.min(22, resistance * 2.2)}
                fill="#d97706"
                rx="2"
                className="transition-all duration-200"
              />
              <rect
                x="15"
                y={50 - Math.min(22, resistance * 2.2)}
                width="30"
                height={Math.min(22, resistance * 2.2)}
                fill="#d97706"
                rx="2"
                className="transition-all duration-200"
              />
              <text x="30" y="32" fill="#fef3c7" fontSize="10" fontWeight="bold" textAnchor="middle" className="font-mono">
                {resistance} Ω
              </text>
              <text x="30" y="70" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
                STROZZATURA
              </text>
            </g>

            {/* Tubo dopo la strozzatura che scende verso la turbina */}
            <rect x="320" y="40" width="100" height="24" fill="url(#pipeGrad)" />
            <path d="M 420 40 L 444 40 L 444 140 L 420 140 Z" fill="url(#pipeGrad)" />

            {/* Turbina idraulica rotante (Utilizzatore / Corrente) */}
            <g transform="translate(432, 180)">
              <circle cx="0" cy="0" r="36" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              {/* Pale della ruota */}
              <g
                style={{
                  transformOrigin: '0px 0px',
                  animation: isPlaying ? `spin ${Math.max(0.3, 4 / (current || 0.1))}s linear infinite` : 'none',
                }}
              >
                <line x1="-30" y1="0" x2="30" y2="0" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" />
                <line x1="0" y1="-30" x2="0" y2="30" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" />
                <line x1="-21" y1="-21" x2="21" y2="21" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" />
                <line x1="-21" y1="21" x2="21" y2="-21" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" />
              </g>
              <circle cx="0" cy="0" r="10" fill="#0284c7" />
              <text x="0" y="52" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                TURBINA / PORTATA
              </text>
              <text x="0" y="68" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-mono">
                I = {current} A
              </text>
            </g>

            {/* Canale di ritorno verso la pompa di ricircolo */}
            <path d="M 400 230 L 140 230 L 140 180 L 100 180 L 100 140" fill="none" stroke="#475569" strokeWidth="16" />

            {/* Pompa di ricircolo (Generatore / Batteria) */}
            <g transform="translate(90, 180)">
              <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="0" y="4" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                POMPA
              </text>
              <text x="0" y="34" fill="#94a3b8" fontSize="9" textAnchor="middle">
                (Generatore)
              </text>
            </g>

            {/* Frecce di flusso dinamiche */}
            <g fill="#38bdf8" opacity={isPlaying ? '0.9' : '0.2'}>
              <polygon points="200,48 210,52 200,56" />
              <polygon points="360,48 370,52 360,56" />
              <polygon points="436,90 432,100 428,90" />
            </g>
          </svg>

          {/* Indicatori in tempo reale sul fondo del canvas */}
          <div className="w-full mt-4 pt-3 border-t border-slate-800 flex items-center justify-around text-center text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">TENSIONE (Dislivello)</span>
              <span className="font-mono font-bold text-sky-400 text-sm">{voltage} V</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[11px]">RESISTENZA (Strozzatura)</span>
              <span className="font-mono font-bold text-amber-400 text-sm">{resistance} Ω</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[11px]">CORRENTE (Portata)</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{current} A</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[11px]">POTENZA EROGATA</span>
              <span className="font-mono font-bold text-purple-400 text-sm">{power} W</span>
            </div>
          </div>
        </div>

        {/* Zona Controlli & Spiegazione Didattica (5 colonne) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Cursore Tensione */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="voltage-slider" className="font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
                Tensione (V): Dislivello serbatoio
              </label>
              <span className="font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded text-xs">
                {voltage} Volt
              </span>
            </div>
            <input
              id="voltage-slider"
              type="range"
              min="3"
              max="24"
              step="1"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <p className="text-xs text-slate-500">
              Aumentando i Volt (il dislivello), l'acqua ha più energia per cadere e spinge più cariche.
            </p>
          </div>

          {/* Cursore Resistenza */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="res-slider" className="font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                Resistenza (R): Strozzatura tubo
              </label>
              <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs">
                {resistance} Ohm (Ω)
              </span>
            </div>
            <input
              id="res-slider"
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={resistance}
              onChange={(e) => setResistance(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <p className="text-xs text-slate-500">
              Aumentando la Resistenza (strozzando il tubo), l'acqua fatica a passare e la portata cala.
            </p>
          </div>

          {/* Box con la Legge di Ohm calcolata */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Applicazione Legge di Ohm</span>
            <div className="mt-2 text-center p-3 bg-white rounded-lg border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-500 mb-1">Formula: I = V / R</div>
              <div className="text-lg font-bold font-mono text-slate-800">
                I = {voltage} V / {resistance} Ω = <span className="text-emerald-600">{current} A</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
              <strong>Cosa osserva lo studente:</strong> Se raddoppi la Tensione (es. da 6V a 12V), la Corrente raddoppia. Se aumenti la Resistenza, la corrente diminuisce in proporzione inversa.
            </p>
          </div>

          {/* Scheda Inclusione BES/DSA */}
          <div className="p-3.5 bg-sky-50/70 border border-sky-150 rounded-lg text-xs text-sky-950 space-y-1">
            <div className="font-semibold text-sky-900 flex items-center gap-1.5">
              <span>💡</span> Regola pratica per la memoria
            </div>
            <p>
              I <strong>Volt</strong> spingono, gli <strong>Ohm</strong> frenano, gli <strong>Ampere</strong> corrono lungo il filo!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
