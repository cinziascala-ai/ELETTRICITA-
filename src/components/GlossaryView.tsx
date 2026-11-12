import React, { useState } from 'react';
import { Search, BookMarked, Filter, Layers } from 'lucide-react';
import { GLOSSARY_ITEMS } from '../data/glossaryData';
import { GlossaryItem } from '../types/lesson';

export const GlossaryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tutte');

  const categories = ['Tutte', 'Elettricità', 'Magnetismo', 'Unità di Misura', 'Sicurezza', 'Storia'];

  const filteredItems = GLOSSARY_ITEMS.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.simpleExplanation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Tutte' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header del Glossario */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-sky-700 tracking-wide uppercase">Dizionario Tecnologico</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-0.5">Glossario di Elettricità e Magnetismo</h2>
            <p className="text-sm text-slate-600 mt-1">
              Definizioni formali, simboli, unità di misura e spiegazioni facilitate a portata di clic.
            </p>
          </div>

          {/* Barra di Ricerca */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cerca un termine (es. Ampere, Maglev...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Filtri per Categoria */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filtra:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Griglia delle Schede Termini */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 hover:border-slate-300 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-slate-900 text-base">{item.term}</h3>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>

              {item.symbolOrFormula && (
                <div className="text-xs font-mono font-semibold text-sky-700 bg-sky-50 px-2 py-1 rounded inline-block">
                  {item.symbolOrFormula}
                </div>
              )}

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.definition}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <div className="p-2.5 bg-amber-50/70 rounded-lg border border-amber-100 text-xs text-amber-950">
                <span className="font-semibold text-amber-900">Spiegazione semplice:</span> {item.simpleExplanation}
              </div>

              {item.relatedTerms.length > 0 && (
                <div className="text-[11px] text-slate-400 flex flex-wrap gap-1 items-center pt-1">
                  <span>Correlati:</span>
                  {item.relatedTerms.map((rt) => (
                    <span key={rt} className="text-slate-600 underline decoration-slate-300">
                      {rt}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
          <BookMarked className="w-8 h-8 mx-auto text-slate-300" />
          <p className="text-sm">Nessun termine trovato corrispondente a "{searchTerm}".</p>
        </div>
      )}
    </div>
  );
};
