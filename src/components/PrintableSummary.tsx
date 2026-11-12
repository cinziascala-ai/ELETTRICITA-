import React from 'react';
import { Printer, ArrowLeft, Check, Shield } from 'lucide-react';
import { LESSON_1_UNITS } from '../data/lesson1Data';
import { LESSON_2_UNITS } from '../data/lesson2Data';

interface PrintableSummaryProps {
  onBack: () => void;
}

export const PrintableSummary: React.FC<PrintableSummaryProps> = ({ onBack }) => {
  return (
    <div className="bg-white p-6 md:p-10 max-w-4xl mx-auto rounded-2xl border border-slate-200 shadow-sm space-y-8">
      {/* Intestazione con pulsante di stampa */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Torna all'App
        </button>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
        >
          <Printer className="w-4 h-4" />
          Stampa Scheda o Salva in PDF
        </button>
      </div>

      {/* Intestazione del Documento Didattico */}
      <div className="text-center space-y-1 pb-4 border-b-2 border-slate-900">
        <span className="text-xs uppercase font-mono tracking-widest text-slate-500">
          Scuola Secondaria di I Grado · Disciplina: Tecnologia
        </span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          SCHEDA DI SINTESI: ELETTRICITÀ & MAGNETISMO
        </h1>
        <p className="text-xs text-slate-600">
          Compendio per il ripasso e la preparazione alla verifica scritta e orale
        </p>
      </div>

      {/* 1. Tabella Sinottica delle Grandezze */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-sky-600 rounded-sm" /> 1. Grandezze Fondamentali, Simboli e Unità di Misura (SI)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 text-slate-800">
                <th className="border border-slate-300 p-2 font-bold">Grandezza Fisica</th>
                <th className="border border-slate-300 p-2 font-bold">Simbolo</th>
                <th className="border border-slate-300 p-2 font-bold">Unità di Misura</th>
                <th className="border border-slate-300 p-2 font-bold">Formula Base</th>
                <th className="border border-slate-300 p-2 font-bold">Strumento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">Tensione (d.d.p.)</td>
                <td className="border border-slate-300 p-2 font-mono">V</td>
                <td className="border border-slate-300 p-2">Volt (V)</td>
                <td className="border border-slate-300 p-2 font-mono">V = R · I</td>
                <td className="border border-slate-300 p-2">Voltmetro (in parallelo)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">Intensità di Corrente</td>
                <td className="border border-slate-300 p-2 font-mono">I</td>
                <td className="border border-slate-300 p-2">Ampere (A)</td>
                <td className="border border-slate-300 p-2 font-mono">I = V / R</td>
                <td className="border border-slate-300 p-2">Amperometro (in serie)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">Resistenza Elettrica</td>
                <td className="border border-slate-300 p-2 font-mono">R</td>
                <td className="border border-slate-300 p-2">Ohm (Ω)</td>
                <td className="border border-slate-300 p-2 font-mono">R = V / I</td>
                <td className="border border-slate-300 p-2">Ohmmetro (senza corrente)</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">Potenza Elettrica</td>
                <td className="border border-slate-300 p-2 font-mono">P</td>
                <td className="border border-slate-300 p-2">Watt (W)</td>
                <td className="border border-slate-300 p-2 font-mono">P = V · I</td>
                <td className="border border-slate-300 p-2">Wattmetro</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">Energia Consumata</td>
                <td className="border border-slate-300 p-2 font-mono">E</td>
                <td className="border border-slate-300 p-2">Chilowattora (kWh) / Joule (J)</td>
                <td className="border border-slate-300 p-2 font-mono">E = P · t</td>
                <td className="border border-slate-300 p-2">Contatore elettronico</td>
              </tr>
              <tr>
                <td className="border border-slate-300 p-2 font-semibold">Campo Magnetico</td>
                <td className="border border-slate-300 p-2 font-mono">B</td>
                <td className="border border-slate-300 p-2">Tesla (T) o Gauss (G)</td>
                <td className="border border-slate-300 p-2 font-mono">B = F / (I · L)</td>
                <td className="border border-slate-300 p-2">Teslametro / Gaussmetro</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. La Legge di Ohm & Il Triangolo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start pt-2">
        <div className="p-4 border border-slate-300 rounded-xl space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase">2. La Prima Legge di Ohm (1827)</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            In un conduttore metallico a temperatura costante, l'intensità di corrente è direttamente proporzionale alla tensione applicata e inversamente proporzionale alla resistenza del circuito:
          </p>
          <div className="p-2 bg-slate-100 rounded text-center font-mono font-bold text-sm text-slate-900">
            I = V / R &nbsp; ⟺ &nbsp; V = R · I &nbsp; ⟺ &nbsp; R = V / I
          </div>
        </div>

        <div className="p-4 border border-slate-300 rounded-xl space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase">3. Circuiti in Serie e in Parallelo</h3>
          <ul className="text-xs text-slate-700 space-y-1 list-disc pl-4">
            <li><strong>In Serie:</strong> tutti sulla stessa linea. La corrente è uguale, le tensioni si sommano. Se una lampadina si brucia, si spengono tutte.</li>
            <li><strong>In Parallelo:</strong> rami indipendenti. Tutti ricevono la tensione nominale (230V a casa). Se una lampadina si spegne, le altre rimangono accese.</li>
          </ul>
        </div>
      </div>

      {/* 3. Magnetismo & Elettromagnetismo */}
      <div className="space-y-3 pt-2">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-rose-600 rounded-sm" /> 4. Principi Chiave di Magnetismo ed Elettromagnetismo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <strong>Poli e Inseparabilità:</strong> Poli uguali si respingono (N-N / S-S), poli opposti si attraggono (N-S). Spezzando un magnete si generano sempre due nuove calamite complete.
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <strong>Esperimento di Oersted (1820):</strong> Un filo percorso da corrente devia l'ago della bussola. <em>La corrente genera campi magnetici!</em>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <strong>Induzione di Faraday (1831):</strong> Muovendo una calamita dentro una bobina di rame si genera corrente. <em>Il magnetismo in moto produce elettricità!</em>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <strong>Macchine Elettriche:</strong>
            <br />
            • Motore: Energia Elettrica ➔ Energia Meccanica
            <br />
            • Alternatore: Energia Meccanica ➔ Energia Elettrica
          </div>
        </div>
      </div>

      {/* 4. Sicurezza Domestica */}
      <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-2 text-xs">
        <h3 className="font-bold text-slate-900 uppercase flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-rose-600" /> 5. Norme di Sicurezza Elettrica
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700">
          <div>
            <strong>1. Interruttore Differenziale (Salvavita):</strong> toglie corrente istantaneamente se rileva dispersioni verso terra superiori a 30 mA.
          </div>
          <div>
            <strong>2. Cavo di Messa a Terra (Giallo-Verde):</strong> convoglia le correnti di guasto disperse dalle carcasse metalliche direttamente nel suolo.
          </div>
          <div>
            <strong>3. Mai usare apparecchi con mani bagnate:</strong> l'acqua salata abbatte la resistenza della pelle moltiplicando la corrente letale.
          </div>
          <div>
            <strong>4. Non sovraccaricare le prese:</strong> evita troppi apparecchi ad alta potenza sulla stessa ciabatta per prevenire incendi.
          </div>
        </div>
      </div>
    </div>
  );
};
