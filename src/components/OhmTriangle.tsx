import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, RefreshCw } from 'lucide-react';

type TargetVariable = 'V' | 'I' | 'R';

export const OhmTriangle: React.FC = () => {
  const [selectedVar, setSelectedVar] = useState<TargetVariable>('V');
  const [calcV, setCalcV] = useState<number>(24);
  const [calcR, setCalcR] = useState<number>(8);
  const [calcI, setCalcI] = useState<number>(3);

  // Per il mini esercizio guidato
  const [exerciseAnswer, setExerciseAnswer] = useState<string>('');
  const [exerciseFeedback, setExerciseFeedback] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">Metodo Visivo DSA / BES</span>
          <h3 className="text-lg font-bold text-slate-900 mt-0.5">Il Triangolo Magico della Legge di Ohm</h3>
        </div>
        <div className="text-xs text-slate-500">
          Clicca su una lettera per coprirla con il dito e scoprire la formula corrispondente!
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Triangolo Interattivo SVG (5 colonne) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <svg className="w-64 h-64 select-none drop-shadow-sm" viewBox="0 0 240 220">
            {/* Contorno Triangolo Principale */}
            <polygon
              points="120,15 15,205 225,205"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Linea Orizzontale divisoria (Fratto / Diviso) */}
            <line x1="68" y1="110" x2="172" y2="110" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            <text x="120" y="103" fill="#64748b" fontSize="11" textAnchor="middle" fontWeight="bold">
              —— [ DIVISO ] ——
            </text>

            {/* Linea Verticale inferiore divisoria (Per / Moltiplicato) */}
            <line x1="120" y1="110" x2="120" y2="205" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            <text x="120" y="162" fill="#0f172a" fontSize="16" fontWeight="bold" textAnchor="middle">
              ·
            </text>

            {/* Zona Superiore: TENSIONE (V) */}
            <g
              onClick={() => setSelectedVar('V')}
              className="cursor-pointer group"
            >
              <polygon
                points="120,20 72,106 168,106"
                fill={selectedVar === 'V' ? '#e0f2fe' : 'transparent'}
                className="transition-colors group-hover:fill-sky-100"
              />
              <circle
                cx="120"
                cy="68"
                r="24"
                fill={selectedVar === 'V' ? '#0284c7' : '#f1f5f9'}
                stroke={selectedVar === 'V' ? '#0369a1' : '#cbd5e1'}
                strokeWidth="2"
              />
              <text
                x="120"
                y="76"
                fill={selectedVar === 'V' ? '#ffffff' : '#0369a1'}
                fontSize="24"
                fontWeight="800"
                textAnchor="middle"
                className="font-mono"
              >
                V
              </text>
            </g>

            {/* Zona Inferiore Sinistra: RESISTENZA (R) */}
            <g
              onClick={() => setSelectedVar('R')}
              className="cursor-pointer group"
            >
              <polygon
                points="20,200 68,114 116,114 116,200"
                fill={selectedVar === 'R' ? '#fef3c7' : 'transparent'}
                className="transition-colors group-hover:fill-amber-100"
              />
              <circle
                cx="72"
                cy="158"
                r="24"
                fill={selectedVar === 'R' ? '#d97706' : '#f1f5f9'}
                stroke={selectedVar === 'R' ? '#b45309' : '#cbd5e1'}
                strokeWidth="2"
              />
              <text
                x="72"
                y="166"
                fill={selectedVar === 'R' ? '#ffffff' : '#b45309'}
                fontSize="24"
                fontWeight="800"
                textAnchor="middle"
                className="font-mono"
              >
                R
              </text>
            </g>

            {/* Zona Inferiore Destra: CORRENTE (I) */}
            <g
              onClick={() => setSelectedVar('I')}
              className="cursor-pointer group"
            >
              <polygon
                points="220,200 172,114 124,114 124,200"
                fill={selectedVar === 'I' ? '#dcfce7' : 'transparent'}
                className="transition-colors group-hover:fill-emerald-100"
              />
              <circle
                cx="168"
                cy="158"
                r="24"
                fill={selectedVar === 'I' ? '#16a34a' : '#f1f5f9'}
                stroke={selectedVar === 'I' ? '#15803d' : '#cbd5e1'}
                strokeWidth="2"
              />
              <text
                x="168"
                y="166"
                fill={selectedVar === 'I' ? '#ffffff' : '#15803d'}
                fontSize="24"
                fontWeight="800"
                textAnchor="middle"
                className="font-mono"
              >
                I
              </text>
            </g>
          </svg>

          {/* Selettore rapido bottoni */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setSelectedVar('V')}
              className={`px-3 py-1 text-xs font-semibold rounded-md ${
                selectedVar === 'V' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Copri V
            </button>
            <button
              onClick={() => setSelectedVar('I')}
              className={`px-3 py-1 text-xs font-semibold rounded-md ${
                selectedVar === 'I' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Copri I
            </button>
            <button
              onClick={() => setSelectedVar('R')}
              className={`px-3 py-1 text-xs font-semibold rounded-md ${
                selectedVar === 'R' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Copri R
            </button>
          </div>
        </div>

        {/* Spiegazione & Formula Calcolata (7 colonne) */}
        <div className="md:col-span-7 space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {selectedVar === 'V' && 'Formula per trovare la TENSIONE (Volt)'}
              {selectedVar === 'I' && 'Formula per trovare l\'INTENSITÀ DI CORRENTE (Ampere)'}
              {selectedVar === 'R' && 'Formula per trovare la RESISTENZA (Ohm)'}
            </div>

            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold font-mono text-slate-900">
                {selectedVar === 'V' && 'V = R · I'}
                {selectedVar === 'I' && 'I = V / R'}
                {selectedVar === 'R' && 'R = V / I'}
              </span>
              <span className="text-xs text-slate-600">
                {selectedVar === 'V' && '(Volt = Ohm × Ampere)'}
                {selectedVar === 'I' && '(Ampere = Volt ÷ Ohm)'}
                {selectedVar === 'R' && '(Ohm = Volt ÷ Ampere)'}
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {selectedVar === 'V' && (
                <>
                  Mettendo il pollice sopra la <strong>V</strong>, vedi sotto <strong>R</strong> affiancata a <strong>I</strong>. Significa che devi moltiplicarle tra loro!
                </>
              )}
              {selectedVar === 'I' && (
                <>
                  Mettendo il pollice sopra la <strong>I</strong>, vedi la <strong>V</strong> sopra e la <strong>R</strong> sotto la linea di frazione. Significa che devi fare la divisione <strong>V ÷ R</strong>!
                </>
              )}
              {selectedVar === 'R' && (
                <>
                  Mettendo il pollice sopra la <strong>R</strong>, vedi la <strong>V</strong> sopra e la <strong>I</strong> sotto la linea di frazione. Significa che devi fare la divisione <strong>V ÷ I</strong>!
                </>
              )}
            </p>
          </div>

          {/* Calcolatrice Rapida d'Esempio per Verificare Esercizi */}
          <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-2 text-xs">
            <span className="font-semibold text-slate-800 block">Mettiti alla prova: calcola all'istante</span>
            <div className="grid grid-cols-2 gap-3">
              {selectedVar === 'V' && (
                <>
                  <div>
                    <label className="text-slate-500 block mb-1">Resistenza R (Ω):</label>
                    <input
                      type="number"
                      value={calcR}
                      onChange={(e) => setCalcR(Number(e.target.value) || 1)}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Corrente I (A):</label>
                    <input
                      type="number"
                      value={calcI}
                      onChange={(e) => setCalcI(Number(e.target.value) || 1)}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-xs"
                    />
                  </div>
                </>
              )}

              {selectedVar === 'I' && (
                <>
                  <div>
                    <label className="text-slate-500 block mb-1">Tensione V (Volt):</label>
                    <input
                      type="number"
                      value={calcV}
                      onChange={(e) => setCalcV(Number(e.target.value) || 1)}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Resistenza R (Ω):</label>
                    <input
                      type="number"
                      value={calcR}
                      onChange={(e) => setCalcR(Number(e.target.value) || 1)}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-xs"
                    />
                  </div>
                </>
              )}

              {selectedVar === 'R' && (
                <>
                  <div>
                    <label className="text-slate-500 block mb-1">Tensione V (Volt):</label>
                    <input
                      type="number"
                      value={calcV}
                      onChange={(e) => setCalcV(Number(e.target.value) || 1)}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Corrente I (A):</label>
                    <input
                      type="number"
                      value={calcI}
                      onChange={(e) => setCalcI(Number(e.target.value) || 1)}
                      className="w-full px-2 py-1 border border-slate-300 rounded font-mono text-xs"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="pt-2 text-slate-800 font-medium">
              Risultato calcolato:{' '}
              <span className="font-mono font-bold text-sky-700 text-sm">
                {selectedVar === 'V' && `${(calcR * calcI).toFixed(1)} Volt`}
                {selectedVar === 'I' && `${(calcV / calcR).toFixed(2)} Ampere`}
                {selectedVar === 'R' && `${(calcV / calcI).toFixed(2)} Ohm`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
