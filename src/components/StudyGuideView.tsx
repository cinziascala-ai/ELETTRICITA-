import React, { useState } from 'react';
import {
  BookOpen,
  Zap,
  Magnet,
  Shield,
  Lightbulb,
  Table,
  CheckCircle2,
  Printer,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { LESSON_1_UNITS } from '../data/lesson1Data';
import { LESSON_2_UNITS } from '../data/lesson2Data';
import { HydraulicAnalogy } from './HydraulicAnalogy';
import { OhmTriangle } from './OhmTriangle';

interface StudyGuideViewProps {
  onOpenPresentation: () => void;
  onOpenQuiz: () => void;
  onPrint: () => void;
}

export const StudyGuideView: React.FC<StudyGuideViewProps> = ({
  onOpenPresentation,
  onOpenQuiz,
  onPrint,
}) => {
  const [activeLessonTab, setActiveLessonTab] = useState<'l1' | 'l2'>('l1');
  const [dyslexiaMode, setDyslexiaMode] = useState<boolean>(false);

  return (
    <div className={`space-y-10 ${dyslexiaMode ? 'tracking-wide leading-loose text-lg' : ''}`}>
      {/* Banner di Benvenuto e Strumenti */}
      <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Tecnologia</span>
            <span>·</span>
            <span>Scuola Secondaria di I Grado</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Quaderno Didattico di Elettricità & Magnetismo
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Testo completo delle due lezioni con approfondimenti storici, spiegazioni facilitate per lo studio a casa e schede riassuntive delle grandezze fisiche.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setDyslexiaMode(!dyslexiaMode)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors ${
              dyslexiaMode
                ? 'bg-amber-400 text-slate-950 border-amber-300'
                : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {dyslexiaMode ? 'Font Normale' : 'Lettura Facilitata DSA'}
          </button>
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Stampa Schede
          </button>
        </div>
      </div>

      {/* Selettore Lezione 1 / Lezione 2 */}
      <div className="flex items-center justify-center">
        <div className="p-1 bg-slate-200 rounded-xl inline-flex gap-1 shadow-inner">
          <button
            onClick={() => setActiveLessonTab('l1')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeLessonTab === 'l1'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4 text-sky-600" />
            Lezione 1: L'Elettricità & Circuiti
          </button>
          <button
            onClick={() => setActiveLessonTab('l2')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeLessonTab === 'l2'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Magnet className="w-4 h-4 text-rose-600" />
            Lezione 2: Magnetismo & Elettromagnetismo
          </button>
        </div>
      </div>

      {/* CONTENUTO LEZIONE 1 */}
      {activeLessonTab === 'l1' && (
        <div className="space-y-12">
          {/* Sezione 1.1: Che cos'è l'elettricità */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wide">
              <span>Capitolo 1.1</span>
              <span>·</span>
              <span>La Struttura della Materia</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Che cos'è l'Elettricità? Dagli atomi alla corrente
            </h3>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Tutti gli oggetti dell'universo sono costituiti da <strong>atomi</strong>. Al centro dell'atomo si trova un nucleo compatto contenente <strong>protoni</strong> (aventi carica elettrica positiva, <strong>+</strong>) e <strong>neutroni</strong> (privi di carica elettrica, <strong>0</strong>). Attorno a questo nucleo orbitano a grandissima velocità particelle piccolissime e leggere chiamate <strong>elettroni</strong> (aventi carica negativa, <strong>-</strong>).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-sky-50/70 rounded-xl border border-sky-150 space-y-2">
                <span className="font-bold text-sky-950 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" /> La Regola Fondamentale delle Cariche
                </span>
                <p className="text-xs text-sky-900 leading-relaxed">
                  Cariche di <strong>segno uguale si respingono</strong> (+ con +, oppure - con -).<br />
                  Cariche di <strong>segno opposto si attraggono</strong> (+ e - si cercano reciprocamente).
                </p>
              </div>

              <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-150 space-y-2">
                <span className="font-bold text-amber-950 text-sm flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" /> Definizione di Corrente Elettrica
                </span>
                <p className="text-xs text-amber-900 leading-relaxed">
                  La <strong>corrente elettrica</strong> è il movimento ordinato di un fiume di elettroni liberi che scorre all'interno di un materiale conduttore sotto l'azione di una forza di spinta (tensione).
                </p>
              </div>
            </div>
          </section>

          {/* Sezione 1.2: Conduttori vs Isolanti */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wide">
              <span>Capitolo 1.2</span>
              <span>·</span>
              <span>Scienza dei Materiali</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Conduttori, Isolanti e Semiconduttori
            </h3>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Non tutti i materiali reagiscono allo stesso modo quando tentiamo di far passare la corrente elettrica. Dal punto di vista tecnologico li dividiamo in tre grandi famiglie:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm block">1. I Conduttori</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hanno elettroni periferici poco legati che possono saltare da un atomo all'altro con facilità.
                </p>
                <div className="text-xs font-semibold text-emerald-700">
                  Esempi: Rame, Alluminio, Argento, Oro, Ferro, Acqua di rubinetto con sali disciolti.
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm block">2. Gli Isolanti (Dielettrici)</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trattengono saldamente i loro elettroni. La corrente non riesce a scorrere.
                </p>
                <div className="text-xs font-semibold text-rose-700">
                  Esempi: Plastica (PVC), Gomma, Vetro, Ceramica, Legno asciutto, Aria secca.
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm block">3. I Semiconduttori</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Conducono solo se opportunamente "drogati" o stimolati con luce/calore. Sono il cuore dell'elettronica moderna.
                </p>
                <div className="text-xs font-semibold text-sky-700">
                  Esempi: Silicio (Si), Germanio (Ge), componenti dei microchip e pannelli solari.
                </div>
              </div>
            </div>
          </section>

          {/* Sezione 1.3: Tabella delle 5 Grandezze Fondamentali */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wide">
              <span>Capitolo 1.3</span>
              <span>·</span>
              <span>Grandezze del Sistema Internazionale</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Le 5 Grandezze Elettriche Fondamentali
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Per comprendere e progettare qualsiasi impianto tecnologico dobbiamo conoscere con precisione queste grandezze, i loro simboli, le loro unità di misura e gli strumenti con cui si rilevano:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LESSON_1_UNITS.map((u) => (
                <div key={u.name} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-900 text-sm">{u.quantity}</span>
                      <span className="px-2 py-0.5 bg-sky-100 text-sky-800 font-mono font-bold text-xs rounded">
                        {u.symbol}
                      </span>
                    </div>
                    <div className="pt-2 text-xs text-slate-600 space-y-1">
                      <div><strong>Unità:</strong> {u.name} ({u.symbol})</div>
                      <div><strong>Formula:</strong> <span className="font-mono text-sky-700 font-bold">{u.formula}</span></div>
                      <div><strong>Strumento:</strong> {u.measuringInstrument}</div>
                      <p className="text-slate-700 pt-1 leading-relaxed">
                        <em>"{u.simpleExplanation}"</em>
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 italic">
                    💡 {u.everydayExample}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sezione 1.4: L'Analogia Idraulica Interattiva */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wide">
              <span>Capitolo 1.4</span>
              <span>·</span>
              <span>Laboratorio Mentale</span>
            </div>
            <HydraulicAnalogy />
          </section>

          {/* Sezione 1.5: Prima Legge di Ohm e Triangolo */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wide">
              <span>Capitolo 1.5</span>
              <span>·</span>
              <span>La Legge di Georg Ohm</span>
            </div>
            <OhmTriangle />
          </section>

          {/* Sezione 1.6: Circuiti in Serie vs in Parallelo */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wide">
              <span>Capitolo 1.6</span>
              <span>·</span>
              <span>Confronto Tecnologico</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Circuiti in Serie e in Parallelo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-sky-50/50 rounded-xl border border-sky-150 space-y-3">
                <span className="font-bold text-sky-950 text-base block">Circuito in SERIE</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Gli utilizzatori (es. lampadine) sono disposti uno dopo l'altro su un <strong>unico conduttore</strong>.
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                  <li>La corrente che attraversa tutti i componenti è <strong>uguale</strong>.</li>
                  <li>La tensione si divide tra le lampadine: più ne colleghi in fila, meno luce fanno.</li>
                  <li><strong>Svantaggio critico:</strong> se una lampadina si brucia o viene svitata, l'intero circuito si interrompe e tutte le altre si spengono.</li>
                </ul>
              </div>

              <div className="p-5 bg-amber-50/50 rounded-xl border border-amber-150 space-y-3">
                <span className="font-bold text-amber-950 text-base block">Circuito in PARALLELO</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Ciascun utilizzatore è collegato <strong>indipendentemente</strong> ai due cavi principali della rete elettrica.
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                  <li>Tutti i componenti ricevono la <strong>stessa tensione</strong> (es. 230 V a casa).</li>
                  <li>La corrente totale assorbita è la somma delle correnti dei singoli rami.</li>
                  <li><strong>Vantaggio fondamentale:</strong> se spegni una lampadina, le altre continuano a funzionare normalmente!</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Sezione 1.7: Sicurezza ed Elettrocuzione */}
          <section className="bg-rose-50/60 rounded-2xl p-6 md:p-8 border border-rose-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-wide">
              <span>Capitolo 1.7</span>
              <span>·</span>
              <span>Sicurezza nell'Ambiente Domestico</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-rose-950 flex items-center gap-2">
              <Shield className="w-6 h-6 text-rose-600" />
              La Sicurezza Elettrica: Proteggere la Vita Umana
            </h3>
            <p className="text-rose-950 text-sm leading-relaxed">
              Il corpo umano è un conduttore (è composto per oltre il 70% di acqua ricca di sali minerali). Quando veniamo attraversati da corrente elettrica si parla di <strong>folgorazione o elettrocuzione</strong> (la "scossa"). Una corrente di soli <strong>30 milliampere (0,03 A)</strong> può causare tetanizzazione dei muscoli respiratori e fibrillazione cardiaca fatale!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-rose-200 space-y-1.5">
                <span className="font-bold text-rose-900 text-sm">L'Interruttore Differenziale (Salvavita)</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Confronta istante per istante la corrente che entra dal cavo di fase con quella che esce dal neutro. Se nota che mancano più di 30 mA (perché stanno disperdendosi verso terra o peggio attraverso una persona), toglie tensione in meno di <strong>30 millesimi di secondo</strong>!
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-rose-200 space-y-1.5">
                <span className="font-bold text-rose-900 text-sm">Il Cavo di Messa a Terra (Giallo-Verde)</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tutte le carcasse metalliche (lavatrici, forni, frigoriferi) sono collegate a questo filo bicolore. Se un filo interno tocca la lamiera, la corrente scappa nel terreno invece di aspettare che noi tocchiamo l'elettrodomestico.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* CONTENUTO LEZIONE 2 */}
      {activeLessonTab === 'l2' && (
        <div className="space-y-12">
          {/* Sezione 2.1: I Magneti */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-wide">
              <span>Capitolo 2.1</span>
              <span>·</span>
              <span>I Segreti delle Calamite</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              I Magneti: Fenomeno Naturale e Proprietà
            </h3>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Il magnetismo è noto fin dall'antichità grazie alla <strong>magnetite</strong>, una roccia nera di ferro che attrae spontaneamente frammenti metallici. Oggi fabbrichiamo potenti magneti artificiali in leghe al neodimio o ferrite.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm">Poli Nord e Sud</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ogni magnete possiede due estremità opposte: il <strong>Polo Nord (N)</strong> e il <strong>Polo Sud (S)</strong>. Le linee di forza invisibili del campo magnetico escono dal polo Nord ed entrano nel polo Sud all'esterno del magnete.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm">L'Inseparabilità dei Poli</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Non è possibile isolare un singolo polo Nord o Sud. Se spezzi una calamita in due o cento pezzi, ogni frammento diventa istantaneamente un nuovo magnete completo dotato di Nord e Sud!
                </p>
              </div>
            </div>
          </section>

          {/* Sezione 2.2: Le Unità di Misura del Magnetismo */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-wide">
              <span>Capitolo 2.2</span>
              <span>·</span>
              <span>Grandezze Magnetiche (SI)</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Le Unità di Misura del Magnetismo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {LESSON_2_UNITS.map((u) => (
                <div key={u.name} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-900 text-sm">{u.quantity}</span>
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-mono font-bold text-xs rounded">
                        {u.symbol}
                      </span>
                    </div>
                    <div className="pt-2 text-xs text-slate-600 space-y-1">
                      <div><strong>Unità:</strong> {u.name} ({u.symbol})</div>
                      <div><strong>Formula:</strong> <span className="font-mono text-rose-700 font-bold">{u.formula}</span></div>
                      <div><strong>Strumento:</strong> {u.measuringInstrument}</div>
                      <p className="text-slate-700 pt-1 leading-relaxed">
                        <em>"{u.simpleExplanation}"</em>
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 italic">
                    💡 {u.everydayExample}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sezione 2.3: La Scoperta dell'Elettromagnetismo */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wide">
              <span>Capitolo 2.3</span>
              <span>·</span>
              <span>I Due Esperimenti che hanno Cambiato la Storia</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Oersted e Faraday: L'Unione di Elettricità e Magnetismo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-sky-50/70 rounded-xl border border-sky-150 space-y-3">
                <div className="text-xs font-mono font-bold text-sky-800 uppercase">1820 · Esperimento di Oersted</div>
                <h4 className="font-bold text-slate-900 text-base">La corrente crea magnetismo</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Hans Christian Oersted scoprì che quando una corrente elettrica fluisce in un filo di rame vicino a una bussola, l'ago devia istantaneamente allineandosi perpendicolarmente al filo.
                </p>
                <div className="p-2.5 bg-white rounded-lg border border-sky-200 text-xs font-mono font-bold text-sky-900 text-center">
                  CORRENTE ELETTRICA ➔ CAMPO MAGNETICO
                </div>
              </div>

              <div className="p-5 bg-amber-50/70 rounded-xl border border-amber-150 space-y-3">
                <div className="text-xs font-mono font-bold text-amber-800 uppercase">1831 · Scoperta di Faraday</div>
                <h4 className="font-bold text-slate-900 text-base">Il magnetismo crea corrente (Induzione)</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Michael Faraday dimostrò l'effetto inverso: muovendo un magnete avanti e indietro dentro una bobina di filo di rame, nel circuito inizia a scorrere corrente elettrica senza bisogno di alcuna pila!
                </p>
                <div className="p-2.5 bg-white rounded-lg border border-amber-200 text-xs font-mono font-bold text-amber-900 text-center">
                  MAGNETE IN MOVIMENTO ➔ CORRENTE ELETTRICA
                </div>
              </div>
            </div>
          </section>

          {/* Sezione 2.4: Motore vs Alternatore */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wide">
              <span>Capitolo 2.4</span>
              <span>·</span>
              <span>Le Grandi Macchine Elettriche</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Il Motore Elettrico e l'Alternatore
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Queste due macchine sono sorelle gemelle operanti in versi opposti di trasformazione energetica:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm">Il Motore Elettrico</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trasforma l'energia <strong>elettrica</strong> in energia <strong>meccanica</strong> rotatoria. Sfrutta le forze di repulsione magnetica per far ruotare un asse collegato a ruote, eliche o ingranaggi.
                </p>
                <div className="text-xs text-slate-500">Applicazioni: ventilatori, auto elettriche, treni, frullatori.</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm">L'Alternatore (Generatore)</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trasforma l'energia <strong>meccanica</strong> in energia <strong>elettrica</strong>. Una turbina mossa dall'acqua, dal vento o dal vapore fa girare bobine in un campo magnetico producendo corrente alternata.
                </p>
                <div className="text-xs text-slate-500">Applicazioni: centrali idroelettriche, eoliche, termoelettriche.</div>
              </div>
            </div>
          </section>

          {/* Sezione 2.5: Applicazioni Tecnologiche nella Vita Reale */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-wide">
              <span>Capitolo 2.5</span>
              <span>·</span>
              <span>Applicazioni Tecnologiche Moderne</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              L'Elettromagnetismo nel Nostro Quotidiano
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm">🚄 Treni a Levitazione Maglev</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Elettromagneti superconduttori respingono il treno facendolo galleggiare a 10 mm sopra il binario. Senza attrito con le ruote viaggia oltre i 600 km/h in silenzio!
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm">🍳 Piani Cottura a Induzione</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Un campo magnetico ad alta frequenza genera correnti parassite (correnti di Foucault) nel fondo ferroso della pentola, scaldandola senza alcuna fiamma né resistenza rovente.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm">🔊 Altoparlanti & Cuffie</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  La corrente della musica passa in una bobina attaccata a una membrana elastica: la repulsione con un magnete fisso fa vibrare l'aria creando onde sonore udibili.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Footer / Call to action di verifica */}
      <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Hai completato lo studio della dispensa?</h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Mettiti alla prova con il quiz di autovalutazione o ripassa con le slide interattive.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPresentation}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Sfoglia le Slide
          </button>
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-xs"
          >
            Inizia il Quiz
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
