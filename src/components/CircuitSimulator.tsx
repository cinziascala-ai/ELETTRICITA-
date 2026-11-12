import React, { useState, useEffect } from 'react';
import { Zap, Power, AlertTriangle, Lightbulb, Compass, Sliders, Info } from 'lucide-react';

type CircuitMode = 'single' | 'series' | 'parallel';

export const CircuitSimulator: React.FC = () => {
  const [circuitMode, setCircuitMode] = useState<CircuitMode>('single');
  const [voltage, setVoltage] = useState<number>(9); // Volt
  const [res1, setRes1] = useState<number>(5); // Ohm (Lampadina 1)
  const [res2, setRes2] = useState<number>(5); // Ohm (Lampadina 2)
  const [isOpenSwitch, setIsOpenSwitch] = useState<boolean>(false); // False = interruttore chiuso (corrente passa)
  const [switchBranch2, setSwitchBranch2] = useState<boolean>(true); // Per parallelo
  const [electronOffset, setElectronOffset] = useState<number>(0);

  // Calcoli elettrici in base alla configurazione
  let currentTotal = 0;
  let current1 = 0;
  let current2 = 0;
  let voltLamp1 = 0;
  let voltLamp2 = 0;

  if (!isOpenSwitch) {
    if (circuitMode === 'single') {
      currentTotal = voltage / res1;
      current1 = currentTotal;
      voltLamp1 = voltage;
    } else if (circuitMode === 'series') {
      const rTot = res1 + res2;
      currentTotal = voltage / rTot;
      current1 = currentTotal;
      current2 = currentTotal;
      voltLamp1 = currentTotal * res1;
      voltLamp2 = currentTotal * res2;
    } else if (circuitMode === 'parallel') {
      current1 = voltage / res1;
      current2 = switchBranch2 ? voltage / res2 : 0;
      currentTotal = current1 + current2;
      voltLamp1 = voltage;
      voltLamp2 = switchBranch2 ? voltage : 0;
    }
  }

  const powerTotal = voltage * currentTotal;
  const powerLamp1 = voltLamp1 * current1;
  const powerLamp2 = voltLamp2 * current2;

  // Animazione elettroni liberi nel filo
  useEffect(() => {
    if (isOpenSwitch || currentTotal === 0) return;
    const interval = setInterval(() => {
      setElectronOffset((prev) => (prev + 1.8) % 40);
    }, 40);
    return () => clearInterval(interval);
  }, [isOpenSwitch, currentTotal]);

  // Calcolo luminosità lampadina (0 - 1)
  const brightness1 = Math.min(Math.max(powerLamp1 / 25, 0), 1.2);
  const brightness2 = Math.min(Math.max(powerLamp2 / 25, 0), 1.2);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Intestazione del banco di lavoro */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-700 tracking-wide uppercase">Laboratorio Sperimentale</span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">Banco di Prova dei Circuiti Elettrici</h3>
          <p className="text-sm text-slate-600 mt-1">
            Costruisci, misura e confronta circuiti in serie e in parallelo con la prima Legge di Ohm in tempo reale.
          </p>
        </div>

        {/* Selettore Modalità Circuito */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg shrink-0">
          <button
            onClick={() => setCircuitMode('single')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              circuitMode === 'single' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Circuito Semplice
          </button>
          <button
            onClick={() => setCircuitMode('series')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              circuitMode === 'series' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Circuito in Serie
          </button>
          <button
            onClick={() => setCircuitMode('parallel')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              circuitMode === 'parallel' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Circuito in Parallelo
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Canvas Circuito Interattivo (8 colonne) */}
        <div className="lg:col-span-8 bg-slate-950 rounded-xl p-5 text-white relative flex flex-col items-center justify-center min-h-[420px] select-none">
          {/* Griglia ingegneristica di sfondo */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* SVG Circuito */}
          <svg className="w-full max-w-[620px] h-[320px]" viewBox="0 0 620 320">
            {/* Definizioni effetti visivi per bagliore lampadina */}
            <defs>
              <filter id="bulbGlow1" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={8 * brightness1} result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="bulbGlow2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={8 * brightness2} result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Tracciato Rame (Cavi principali) */}
            {circuitMode === 'single' && (
              <>
                <rect x="70" y="50" width="480" height="220" rx="16" fill="none" stroke="#b45309" strokeWidth="8" />
                <rect x="70" y="50" width="480" height="220" rx="16" fill="none" stroke="#f59e0b" strokeWidth="3" />
              </>
            )}

            {circuitMode === 'series' && (
              <>
                <rect x="70" y="50" width="480" height="220" rx="16" fill="none" stroke="#b45309" strokeWidth="8" />
                <rect x="70" y="50" width="480" height="220" rx="16" fill="none" stroke="#f59e0b" strokeWidth="3" />
              </>
            )}

            {circuitMode === 'parallel' && (
              <>
                {/* Ramo Principale esterno */}
                <rect x="70" y="50" width="480" height="220" rx="16" fill="none" stroke="#b45309" strokeWidth="8" />
                <rect x="70" y="50" width="480" height="220" rx="16" fill="none" stroke="#f59e0b" strokeWidth="3" />
                {/* Ramo centrale parallelo */}
                <line x1="330" y1="50" x2="330" y2="270" stroke="#b45309" strokeWidth="8" />
                <line x1="330" y1="50" x2="330" y2="270" stroke="#f59e0b" strokeWidth="3" />
              </>
            )}

            {/* Generatore / Batteria (a sinistra, centrata verticalmente a X=70, Y=160) */}
            <g transform="translate(40, 120)">
              {/* Mascheramento cavo dietro */}
              <rect x="20" y="10" width="30" height="60" fill="#020617" />
              {/* Pila corpo */}
              <rect x="18" y="15" width="24" height="50" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <rect x="25" y="8" width="10" height="7" rx="2" fill="#94a3b8" />
              {/* Polarità */}
              <text x="30" y="32" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle">
                +
              </text>
              <text x="30" y="56" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">
                -
              </text>
              <text x="-5" y="44" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" className="font-mono">
                {voltage} V
              </text>
              <text x="30" y="82" fill="#94a3b8" fontSize="10" textAnchor="middle">
                BATTERIA
              </text>
            </g>

            {/* Interruttore Principale (in alto a X=190, Y=50) */}
            <g
              transform="translate(160, 30)"
              onClick={() => setIsOpenSwitch(!isOpenSwitch)}
              className="cursor-pointer group"
            >
              <rect x="0" y="0" width="80" height="40" fill="#020617" />
              {/* Morsetti */}
              <circle cx="10" cy="20" r="5" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="70" cy="20" r="5" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2" />
              {/* Lama dell'interruttore */}
              {isOpenSwitch ? (
                // Aperto (leva inclinata verso l'alto a 35 gradi)
                <line x1="10" y1="20" x2="55" y2="-5" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
              ) : (
                // Chiuso (leva orizzontale dritta)
                <line x1="10" y1="20" x2="68" y2="20" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
              )}
              <text x="40" y="-8" fill={isOpenSwitch ? '#f87171' : '#34d399'} fontSize="10" fontWeight="bold" textAnchor="middle">
                {isOpenSwitch ? 'APERTO (Click per chiudere)' : 'CHIUSO (Click per aprire)'}
              </text>
            </g>

            {/* Amperometro di linea in basso a sinistra (X=190, Y=270) */}
            <g transform="translate(160, 246)">
              <rect x="5" y="10" width="50" height="28" fill="#020617" />
              <circle cx="30" cy="24" r="18" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              <text x="30" y="28" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">
                A
              </text>
              <text x="30" y="54" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle" className="font-mono">
                {currentTotal.toFixed(2)} A
              </text>
            </g>

            {/* Lampadina 1 (In alto a destra o centro) */}
            {circuitMode === 'single' && (
              <g transform="translate(420, 20)">
                <rect x="15" y="15" width="50" height="30" fill="#020617" />
                {/* Bulbo di vetro */}
                <circle
                  cx="40"
                  cy="30"
                  r="24"
                  fill={brightness1 > 0 ? `rgba(250, 204, 21, ${Math.min(0.9, 0.2 + brightness1 * 0.7)})` : '#1e293b'}
                  stroke={brightness1 > 0 ? '#fde047' : '#475569'}
                  strokeWidth="2"
                  filter={brightness1 > 0 ? 'url(#bulbGlow1)' : undefined}
                />
                {/* Filamento a spirale */}
                <path
                  d="M 32 36 Q 40 18 48 36"
                  fill="none"
                  stroke={brightness1 > 0 ? '#f97316' : '#64748b'}
                  strokeWidth="2.5"
                />
                <text x="40" y="-5" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  LAMPADINA (L1)
                </text>
                <text x="40" y="70" fill="#94a3b8" fontSize="10" textAnchor="middle" className="font-mono">
                  {res1} Ω · {voltLamp1.toFixed(1)} V
                </text>
              </g>
            )}

            {circuitMode === 'series' && (
              <>
                {/* Lampadina 1 */}
                <g transform="translate(320, 20)">
                  <rect x="15" y="15" width="50" height="30" fill="#020617" />
                  <circle
                    cx="40"
                    cy="30"
                    r="20"
                    fill={brightness1 > 0 ? `rgba(250, 204, 21, ${Math.min(0.9, 0.2 + brightness1 * 0.7)})` : '#1e293b'}
                    stroke={brightness1 > 0 ? '#fde047' : '#475569'}
                    strokeWidth="2"
                    filter={brightness1 > 0 ? 'url(#bulbGlow1)' : undefined}
                  />
                  <path d="M 33 34 Q 40 20 47 34" fill="none" stroke={brightness1 > 0 ? '#f97316' : '#64748b'} strokeWidth="2" />
                  <text x="40" y="-5" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">
                    L1 ({res1} Ω)
                  </text>
                  <text x="40" y="65" fill="#94a3b8" fontSize="10" textAnchor="middle" className="font-mono">
                    {voltLamp1.toFixed(1)} V
                  </text>
                </g>

                {/* Lampadina 2 (in serie) */}
                <g transform="translate(440, 20)">
                  <rect x="15" y="15" width="50" height="30" fill="#020617" />
                  <circle
                    cx="40"
                    cy="30"
                    r="20"
                    fill={brightness2 > 0 ? `rgba(250, 204, 21, ${Math.min(0.9, 0.2 + brightness2 * 0.7)})` : '#1e293b'}
                    stroke={brightness2 > 0 ? '#fde047' : '#475569'}
                    strokeWidth="2"
                    filter={brightness2 > 0 ? 'url(#bulbGlow2)' : undefined}
                  />
                  <path d="M 33 34 Q 40 20 47 34" fill="none" stroke={brightness2 > 0 ? '#f97316' : '#64748b'} strokeWidth="2" />
                  <text x="40" y="-5" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">
                    L2 ({res2} Ω)
                  </text>
                  <text x="40" y="65" fill="#94a3b8" fontSize="10" textAnchor="middle" className="font-mono">
                    {voltLamp2.toFixed(1)} V
                  </text>
                </g>
              </>
            )}

            {circuitMode === 'parallel' && (
              <>
                {/* Ramo 1: Lampadina 1 al centro (X=330, Y=160) */}
                <g transform="translate(305, 130)">
                  <rect x="10" y="10" width="40" height="60" fill="#020617" />
                  <circle
                    cx="25"
                    cy="30"
                    r="22"
                    fill={brightness1 > 0 ? `rgba(250, 204, 21, ${Math.min(0.9, 0.2 + brightness1 * 0.7)})` : '#1e293b'}
                    stroke={brightness1 > 0 ? '#fde047' : '#475569'}
                    strokeWidth="2"
                    filter={brightness1 > 0 ? 'url(#bulbGlow1)' : undefined}
                  />
                  <path d="M 18 35 Q 25 20 32 35" fill="none" stroke={brightness1 > 0 ? '#f97316' : '#64748b'} strokeWidth="2" />
                  <text x="65" y="28" fill="#fef08a" fontSize="10" fontWeight="bold">
                    L1: {res1} Ω
                  </text>
                  <text x="65" y="44" fill="#94a3b8" fontSize="10" className="font-mono">
                    {voltLamp1.toFixed(0)} V · {current1.toFixed(1)} A
                  </text>
                </g>

                {/* Ramo 2: Lampadina 2 a destra (X=550, Y=160) con suo interruttore */}
                <g transform="translate(525, 120)">
                  <rect x="10" y="10" width="30" height="80" fill="#020617" />
                  <circle
                    cx="25"
                    cy="40"
                    r="22"
                    fill={brightness2 > 0 ? `rgba(250, 204, 21, ${Math.min(0.9, 0.2 + brightness2 * 0.7)})` : '#1e293b'}
                    stroke={brightness2 > 0 ? '#fde047' : '#475569'}
                    strokeWidth="2"
                    filter={brightness2 > 0 ? 'url(#bulbGlow2)' : undefined}
                  />
                  <path d="M 18 45 Q 25 30 32 45" fill="none" stroke={brightness2 > 0 ? '#f97316' : '#64748b'} strokeWidth="2" />
                  <text x="-45" y="38" fill="#fef08a" fontSize="10" fontWeight="bold">
                    L2: {res2} Ω
                  </text>
                  <text x="-45" y="54" fill="#94a3b8" fontSize="10" className="font-mono">
                    {voltLamp2.toFixed(0)} V · {current2.toFixed(1)} A
                  </text>
                </g>

                {/* Tasto interruttore autonomo del ramo 2 */}
                <g
                  transform="translate(485, 40)"
                  onClick={() => setSwitchBranch2(!switchBranch2)}
                  className="cursor-pointer"
                >
                  <rect x="0" y="0" width="40" height="20" rx="3" fill="#1e293b" stroke="#64748b" />
                  <text x="20" y="14" fill={switchBranch2 ? '#10b981' : '#ef4444'} fontSize="9" fontWeight="bold" textAnchor="middle">
                    {switchBranch2 ? 'ON' : 'OFF'}
                  </text>
                </g>
              </>
            )}

            {/* Elettroni Animati lungo il conduttore */}
            {!isOpenSwitch && currentTotal > 0 && (
              <g fill="#38bdf8" opacity="0.85">
                {/* Cavo superiore: movimento verso destra */}
                {[100, 140, 260, 300, 380, 420, 500].map((xPos) => (
                  <circle
                    key={`top-${xPos}`}
                    cx={((xPos + electronOffset) % 480) + 70}
                    cy="50"
                    r="3.5"
                  />
                ))}
                {/* Cavo inferiore: movimento verso sinistra */}
                {[100, 140, 260, 300, 380, 420, 500].map((xPos) => (
                  <circle
                    key={`bottom-${xPos}`}
                    cx={550 - (((xPos + electronOffset) % 480))}
                    cy="270"
                    r="3.5"
                  />
                ))}
              </g>
            )}
          </svg>

          {/* Barra di Stato e Misure Elettriche */}
          <div className="w-full mt-2 pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">TENSIONE GENERATORE</span>
              <span className="font-mono font-bold text-sky-400 text-sm">{voltage} V</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">CORRENTE TOTALE (I)</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{currentTotal.toFixed(2)} A</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">POTENZA TOTALE (P)</span>
              <span className="font-mono font-bold text-purple-400 text-sm">{powerTotal.toFixed(1)} W</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[11px]">STATO CIRCUITO</span>
              <span className={`font-bold text-xs ${isOpenSwitch ? 'text-rose-400' : 'text-emerald-400'}`}>
                {isOpenSwitch ? 'APERTO (Zero Corrente)' : 'CHIUSO (Funzionante)'}
              </span>
            </div>
          </div>
        </div>

        {/* Zona Controlli & Spiegazione Didattica (4 colonne) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cursore Batteria */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="batt-slider" className="font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
                Batteria: {voltage} Volt
              </label>
              <span className="font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded text-xs">
                {voltage <= 4.5 ? 'Pila Piatta' : voltage <= 9 ? 'Pila 9V' : 'Alimentatore'}
              </span>
            </div>
            <input
              id="batt-slider"
              type="range"
              min="1.5"
              max="24"
              step="1.5"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
          </div>

          {/* Cursore Resistenza Lampadina 1 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="res1-slider" className="font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                Resistenza Lampadina L1
              </label>
              <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs">
                {res1} Ω
              </span>
            </div>
            <input
              id="res1-slider"
              type="range"
              min="2"
              max="20"
              step="1"
              value={res1}
              onChange={(e) => setRes1(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          {/* Cursore Resistenza Lampadina 2 (se in serie o parallelo) */}
          {circuitMode !== 'single' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="res2-slider" className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  Resistenza Lampadina L2
                </label>
                <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs">
                  {res2} Ω
                </span>
              </div>
              <input
                id="res2-slider"
                type="range"
                min="2"
                max="20"
                step="1"
                value={res2}
                onChange={(e) => setRes2(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
          )}

          {/* Spiegazione Comparativa Ingegneristica */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-sky-600" />
              Cosa succede in questa configurazione?
            </div>

            {circuitMode === 'single' && (
              <p className="text-xs text-slate-600 leading-relaxed">
                Tutta la tensione della batteria (<span className="font-mono font-bold">{voltage} V</span>) cade sulla singola lampadina. La corrente è data da <span className="font-mono font-semibold">I = {voltage} / {res1} = {currentTotal.toFixed(2)} A</span>.
              </p>
            )}

            {circuitMode === 'series' && (
              <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <p>
                  <strong>In Serie:</strong> La resistenza totale è la somma delle due resistenze: <span className="font-mono font-bold">{res1} + {res2} = {res1 + res2} Ω</span>.
                </p>
                <p>
                  La corrente che attraversa entrambe è identica (<span className="font-mono font-bold">{currentTotal.toFixed(2)} A</span>), ma la tensione si dimezza (ciascuna riceve solo metà voltaggio se uguali). Noti che le lampadine brillano <strong>molto meno</strong>!
                </p>
              </div>
            )}

            {circuitMode === 'parallel' && (
              <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <p>
                  <strong>In Parallelo:</strong> Entrambe le lampadine ricevono <strong>tutti i {voltage} Volt</strong> della batteria!
                </p>
                <p>
                  Se spegni L2 con il suo interruttore, L1 continua a brillare a piena potenza. È esattamente il sistema usato nell'impianto elettrico di casa nostra!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
