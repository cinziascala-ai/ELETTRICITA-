import React, { useState, useRef, useEffect } from 'react';
import { Compass as CompassIcon, Magnet, Zap, RotateCcw, Scissors, Power, Layers } from 'lucide-react';

type MagnetismTab = 'compass' | 'electromagnet';

export const MagnetismSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MagnetismTab>('compass');

  // STATI PER LA MODALITÀ BUSSOLA
  const [compassPos, setCompassPos] = useState<{ x: number; y: number }>({ x: 300, y: 70 });
  const [isPolesInverted, setIsPolesInverted] = useState<boolean>(false);
  const [isCutInHalf, setIsCutInHalf] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // STATI PER ELETTROMAGNETE
  const [coils, setCoils] = useState<number>(20); // Spire (5, 10, 20, 30, 50)
  const [currentElectromagnet, setCurrentElectromagnet] = useState<number>(2.5); // Ampere (0 - 5A)
  const [isElectroOn, setIsElectroOn] = useState<boolean>(true);

  // Calcolo forza magnetica dell'elettromagnete (proporzionale a Spire * Corrente)
  const electroStrength = isElectroOn ? coils * currentElectromagnet : 0;
  // Numero di graffette attirate (massimo 15)
  const attractedPinsCount = Math.min(Math.floor(electroStrength / 7), 15);

  // Calcolo dell'angolo del campo magnetico nel punto della bussola (dipolo magnetico)
  // Posizione della calamita: centro a (300, 150)
  // Se non tagliata: Polo Nord a x=370, Polo Sud a x=230 (o invertito)
  const northX = isPolesInverted ? 230 : 370;
  const northY = 150;
  const southX = isPolesInverted ? 370 : 230;
  const southY = 150;

  // Vettore campo magnetico B = B_north + B_south
  // Il campo ESCE dal polo Nord ed ENTRA nel polo Sud
  const rxN = compassPos.x - northX;
  const ryN = compassPos.y - northY;
  const distN3 = Math.max(Math.pow(rxN * rxN + ryN * ryN, 1.5), 100);

  const rxS = compassPos.x - southX;
  const ryS = compassPos.y - southY;
  const distS3 = Math.max(Math.pow(rxS * rxS + ryS * ryS, 1.5), 100);

  // Bx, By
  const Bx = (rxN / distN3) - (rxS / distS3);
  const By = (ryN / distN3) - (ryS / distS3);
  const angleRad = Math.atan2(By, Bx);
  const angleDeg = (angleRad * 180) / Math.PI;

  const handleSvgInteraction = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = 600 / rect.width;
    const scaleY = 300 / rect.height;
    const x = Math.min(Math.max((clientX - rect.left) * scaleX, 30), 570);
    const y = Math.min(Math.max((clientY - rect.top) * scaleY, 30), 270);
    setCompassPos({ x, y });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header del simulatore */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-rose-700 tracking-wide uppercase">Lezione 2 · Laboratorio Virtuale</span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">Laboratorio di Magnetismo ed Elettromagnete</h3>
          <p className="text-sm text-slate-600 mt-1">
            Esplora le linee di forza con la bussola mobile e costruisci una vera elettrocalamita regolabile.
          </p>
        </div>

        {/* Selettore Tab */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg shrink-0">
          <button
            onClick={() => setActiveTab('compass')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'compass' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CompassIcon className="w-3.5 h-3.5 text-rose-600" />
            Calamita & Bussola
          </button>
          <button
            onClick={() => setActiveTab('electromagnet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'electromagnet' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Magnet className="w-3.5 h-3.5 text-amber-600" />
            Elettromagnete Interattivo
          </button>
        </div>
      </div>

      {/* CONTENUTO TAB 1: CALAMITA & BUSSOLA */}
      {activeTab === 'compass' && (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-slate-950 rounded-xl p-5 text-white relative select-none flex flex-col items-center">
            {/* Istruzione sovraimpressa */}
            <div className="absolute top-3 left-4 text-xs text-slate-400 bg-slate-900/90 px-3 py-1 rounded border border-slate-800">
              Muovi il mouse o tocca sulla lavagna per posizionare la <strong>Bussola</strong>
            </div>

            {/* Canvas SVG Interattivo */}
            <svg
              ref={svgRef}
              className="w-full max-w-[600px] h-[300px] cursor-crosshair mt-4"
              viewBox="0 0 600 300"
              onMouseMove={(e) => e.buttons === 1 && handleSvgInteraction(e)}
              onClick={handleSvgInteraction}
              onTouchMove={handleSvgInteraction}
            >
              {/* Linee di campo magnetico curve (schematiche) */}
              <g stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" fill="none">
                <path d="M 370 150 C 450 70, 450 30, 300 30 C 150 30, 150 70, 230 150" />
                <path d="M 370 150 C 490 50, 490 10, 300 10 C 110 10, 110 50, 230 150" />
                <path d="M 370 150 C 450 230, 450 270, 300 270 C 150 270, 150 230, 230 150" />
                <path d="M 370 150 C 490 250, 490 290, 300 290 C 110 290, 110 250, 230 150" />
              </g>

              {/* Barra Magnetica Singola o Tagliata */}
              {!isCutInHalf ? (
                // Barra Magnetica Unica
                <g transform="translate(210, 125)">
                  {/* Polo Sud (Blu) */}
                  <rect
                    x={isPolesInverted ? 90 : 0}
                    y="0"
                    width="90"
                    height="50"
                    fill="#2563eb"
                    stroke="#1d4ed8"
                    strokeWidth="2"
                    rx={isPolesInverted ? '0 6 6 0' : '6 0 0 6'}
                  />
                  <text
                    x={isPolesInverted ? 135 : 45}
                    y="32"
                    fill="#ffffff"
                    fontSize="20"
                    fontWeight="800"
                    textAnchor="middle"
                  >
                    S
                  </text>

                  {/* Polo Nord (Rosso) */}
                  <rect
                    x={isPolesInverted ? 0 : 90}
                    y="0"
                    width="90"
                    height="50"
                    fill="#dc2626"
                    stroke="#b91c1c"
                    strokeWidth="2"
                    rx={isPolesInverted ? '6 0 0 6' : '0 6 6 0'}
                  />
                  <text
                    x={isPolesInverted ? 45 : 135}
                    y="32"
                    fill="#ffffff"
                    fontSize="20"
                    fontWeight="800"
                    textAnchor="middle"
                  >
                    N
                  </text>

                  <text x="90" y="70" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    Barra Magnetica Permanente
                  </text>
                </g>
              ) : (
                // Barra tagliata a metà in due magneti completi!
                <g transform="translate(180, 125)">
                  {/* Pezzo 1 Sinistra */}
                  <rect x="0" y="0" width="55" height="50" fill="#2563eb" rx="4 0 0 4" />
                  <text x="27" y="32" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle">S</text>
                  <rect x="55" y="0" width="55" height="50" fill="#dc2626" rx="0 4 4 0" />
                  <text x="82" y="32" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle">N</text>

                  {/* Spazio del taglio */}
                  <line x1="120" y1="-10" x2="120" y2="60" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="120" y="75" fill="#f59e0b" fontSize="10" textAnchor="middle">TAGLIO</text>

                  {/* Pezzo 2 Destra */}
                  <rect x="130" y="0" width="55" height="50" fill="#2563eb" rx="4 0 0 4" />
                  <text x="157" y="32" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle">S</text>
                  <rect x="185" y="0" width="55" height="50" fill="#dc2626" rx="0 4 4 0" />
                  <text x="212" y="32" fill="#fff" fontSize="16" fontWeight="bold" textAnchor="middle">N</text>
                </g>
              )}

              {/* Bussola Mobile Posizionata dallo Studente */}
              <g transform={`translate(${compassPos.x}, ${compassPos.y})`}>
                {/* Ghiera della bussola */}
                <circle cx="0" cy="0" r="26" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="24" fill="#020617" />
                <circle cx="0" cy="0" r="2" fill="#f8fafc" />

                {/* Ago magnetico rotante secondo il campo magnetico */}
                <g transform={`rotate(${angleDeg})`}>
                  {/* Punta Nord (Rossa) */}
                  <polygon points="0,-22 5,-4 0,0 -5,-4" fill="#ef4444" />
                  <text x="0" y="-10" fill="#fecaca" fontSize="7" fontWeight="bold" textAnchor="middle">N</text>
                  {/* Punta Sud (Argento/Blu) */}
                  <polygon points="0,22 5,4 0,0 -5,4" fill="#94a3b8" />
                  <text x="0" y="14" fill="#f8fafc" fontSize="7" fontWeight="bold" textAnchor="middle">S</text>
                </g>

                <text x="0" y="38" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">
                  BUSSOLA
                </text>
              </g>
            </svg>

            {/* Didascalia interattiva */}
            <div className="w-full mt-2 pt-2 border-t border-slate-800 text-center text-xs text-slate-400">
              Posizione Bussola: <span className="font-mono text-white">X: {Math.round(compassPos.x)}, Y: {Math.round(compassPos.y)}</span> · Inclinazione ago: <span className="font-mono text-amber-400">{Math.round(angleDeg)}°</span>
            </div>
          </div>

          {/* Comandi e spiegazione didattica (4 colonne) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Esperimenti di Laboratorio</span>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setIsPolesInverted(!isPolesInverted)}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                  Inverti Poli Nord / Sud
                </button>
                <button
                  onClick={() => setIsCutInHalf(!isCutInHalf)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    isCutInHalf
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Scissors className="w-3.5 h-3.5 text-amber-600" />
                  {isCutInHalf ? 'Ricomponi la Calamita' : 'Taglia la Calamita a Metà'}
                </button>
              </div>
            </div>

            {/* Box Pedagogico sul Fenomeno Osservato */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                {isCutInHalf ? 'Cosa è appena successo?' : 'Come si orienta la bussola?'}
              </h4>
              {isCutInHalf ? (
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Inseparabilità dei poli:</strong> Non è possibile ottenere un polo Nord o Sud solitario! Tagliando la calamita, nei due frammenti si ricreano all'istante due nuovi poli opposti. In natura non esiste il "monopolo magnetico".
                </p>
              ) : (
                <p className="text-xs text-slate-600 leading-relaxed">
                  L'ago della bussola (punta rossa N) è sempre respinto dal Polo Nord della calamita e attratto dal Polo Sud. Ruota nello spazio seguendo fedelmente la curvatura delle invisibili linee di forza.
                </p>
              )}
            </div>

            <div className="p-3 bg-rose-50 border border-rose-150 rounded-lg text-xs text-rose-950 space-y-1">
              <div className="font-semibold text-rose-900">🌍 Lo sapevi che?</div>
              <p>
                Il nostro pianeta Terra funziona esattamente come questa grande calamita: il suo campo ci protegge dai raggi cosmici e dalle tempeste solari.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CONTENUTO TAB 2: LABORATORIO ELETTROMAGNETE */}
      {activeTab === 'electromagnet' && (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-slate-950 rounded-xl p-5 text-white relative select-none flex flex-col items-center min-h-[380px]">
            {/* SVG Elettromagnete e graffette attirate */}
            <svg className="w-full max-w-[580px] h-[300px]" viewBox="0 0 580 300">
              <defs>
                <linearGradient id="ironNail" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="50%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
              </defs>

              {/* Pila di alimentazione (in alto a sinistra) */}
              <g transform="translate(40, 30)">
                <rect x="0" y="10" width="60" height="30" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <rect x="60" y="18" width="6" height="14" rx="2" fill="#cbd5e1" />
                <text x="30" y="30" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  {currentElectromagnet} A
                </text>
                <text x="30" y="55" fill="#94a3b8" fontSize="9" textAnchor="middle">
                  Batteria
                </text>
              </g>

              {/* Interruttore ON/OFF cliccabile (in alto al centro) */}
              <g
                transform="translate(170, 20)"
                onClick={() => setIsElectroOn(!isElectroOn)}
                className="cursor-pointer"
              >
                <rect x="0" y="0" width="90" height="40" rx="6" fill="#0f172a" stroke={isElectroOn ? '#10b981' : '#ef4444'} strokeWidth="1.5" />
                <text x="45" y="24" fill={isElectroOn ? '#34d399' : '#f87171'} fontSize="11" fontWeight="bold" textAnchor="middle">
                  {isElectroOn ? 'ON (Chiuso)' : 'OFF (Aperto)'}
                </text>
              </g>

              {/* Cavi di collegamento che scendono verso il chiodo */}
              <path
                d="M 106 35 L 170 35 M 260 35 L 340 35 L 340 100"
                fill="none"
                stroke={isElectroOn ? '#f59e0b' : '#64748b'}
                strokeWidth="4"
              />
              <path
                d="M 40 40 L 40 100 L 220 100"
                fill="none"
                stroke={isElectroOn ? '#f59e0b' : '#64748b'}
                strokeWidth="4"
              />

              {/* Il Chiodo di Ferro Dolce (Nucleo) - orizzontale */}
              <g transform="translate(180, 110)">
                {/* Testa del chiodo */}
                <rect x="0" y="-10" width="16" height="40" rx="2" fill="url(#ironNail)" stroke="#475569" strokeWidth="1" />
                {/* Stelo del chiodo */}
                <rect x="16" y="0" width="180" height="20" fill="url(#ironNail)" stroke="#475569" strokeWidth="1" />
                {/* Punta del chiodo (a destra) */}
                <polygon points="196,0 230,10 196,20" fill="url(#ironNail)" stroke="#475569" strokeWidth="1" />

                {/* Spire di filo di rame smaltato avvolte attorno allo stelo */}
                <g>
                  {Array.from({ length: Math.min(coils, 35) }).map((_, i) => {
                    const xOffset = 30 + i * (140 / Math.min(coils, 35));
                    return (
                      <g key={i}>
                        <ellipse
                          cx={xOffset}
                          cy="10"
                          rx="3"
                          ry="15"
                          fill="none"
                          stroke={isElectroOn ? '#ea580c' : '#b45309'}
                          strokeWidth="3.5"
                        />
                      </g>
                    );
                  })}
                </g>

                {/* Effetto alone magnetico sulla punta del chiodo se attivo */}
                {isElectroOn && electroStrength > 0 && (
                  <circle cx="230" cy="10" r={Math.min(35, 10 + electroStrength / 4)} fill="#f59e0b" opacity="0.25" className="animate-ping" />
                )}

                <text x="110" y="45" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                  CHIODO DI FERRO + {coils} SPIRE DI RAME
                </text>
              </g>

              {/* Graffette fermacarte (attirate alla punta del chiodo se attivo) */}
              <g transform="translate(410, 120)">
                {Array.from({ length: 15 }).map((_, i) => {
                  const isAttracted = i < attractedPinsCount;
                  // Se attirata si trova attaccata alla punta (x: ~5..30, y: ~ -15..25), altrimenti riposa nel vassoio in basso (y: 110)
                  const targetX = isAttracted ? 5 + (i % 3) * 10 : 20 + (i % 5) * 22;
                  const targetY = isAttracted ? -15 + i * 4 : 110 + Math.floor(i / 5) * 12;
                  const rotation = isAttracted ? (i * 25) - 45 : (i * 12);

                  return (
                    <g
                      key={i}
                      style={{
                        transform: `translate(${targetX}px, ${targetY}px) rotate(${rotation}deg)`,
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {/* Graffetta stilizzata */}
                      <path
                        d="M 0 0 L 0 16 A 4 4 0 0 0 8 16 L 8 4 A 2.5 2.5 0 0 0 3 4 L 3 13"
                        fill="none"
                        stroke={isAttracted ? '#fbbf24' : '#94a3b8'}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </g>
                  );
                })}
              </g>

              {/* Vassoio per graffette in basso a destra */}
              <g transform="translate(400, 250)">
                <rect x="0" y="0" width="150" height="20" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                <text x="75" y="14" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  Vassoio Graffette Metalliche
                </text>
              </g>
            </svg>

            {/* Metriche dell'elettromagnete */}
            <div className="w-full mt-2 pt-3 border-t border-slate-800 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">NUMERO SPIRE (N)</span>
                <span className="font-mono font-bold text-sky-400 text-sm">{coils} spire</span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">CORRENTE (I)</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{isElectroOn ? `${currentElectromagnet} A` : '0 A (Spento)'}</span>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">GRAFFETTE SOLLEVATE</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{attractedPinsCount} / 15 graffette</span>
              </div>
            </div>
          </div>

          {/* Comandi per regolare spire e corrente (4 colonne) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Slider Spire */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="coils-slider" className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-sky-600" />
                  Avvolgimenti / Spire: {coils}
                </label>
                <span className="font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded text-xs">
                  {coils < 15 ? 'Debole' : coils < 30 ? 'Medio' : 'Molto Forte'}
                </span>
              </div>
              <input
                id="coils-slider"
                type="range"
                min="5"
                max="50"
                step="5"
                value={coils}
                onChange={(e) => setCoils(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
              <p className="text-xs text-slate-500">
                Più filo di rame avvolgi attorno al nucleo di ferro, più concentri il campo magnetico.
              </p>
            </div>

            {/* Slider Corrente */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="current-slider" className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600" />
                  Corrente Elettrica (I)
                </label>
                <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs">
                  {currentElectromagnet} Ampere
                </span>
              </div>
              <input
                id="current-slider"
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={currentElectromagnet}
                onChange={(e) => setCurrentElectromagnet(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>

            {/* Regola Scientifica dell'Elettromagnete */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-700">La Formula della Forza Magnetica</div>
              <div className="text-center p-2.5 bg-white rounded-lg border border-slate-200 font-mono text-sm font-bold text-slate-800">
                Forza Magnetica ∝ N · I
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dove <strong>N</strong> è il numero di spire e <strong>I</strong> è l'intensità della corrente. Aumentando entrambi, l'elettrocalamita solleva più graffette. Spegnendo l'interruttore (OFF), il campo crolla e le graffette cadono all'istante!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
