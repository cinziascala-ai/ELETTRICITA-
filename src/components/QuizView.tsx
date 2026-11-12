import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RotateCcw,
  ChevronRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { QuizQuestion, LessonId } from '../types/lesson';
import { QUIZ_QUESTIONS } from '../data/quizData';

interface QuizViewProps {
  onBackToStudy: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onBackToStudy }) => {
  const [filter, setFilter] = useState<'all' | 'lesson-1' | 'lesson-2'>('lesson-1');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Filtro domande
  const questions = QUIZ_QUESTIONS.filter((q) => {
    if (filter === 'all') return true;
    return q.lessonId === filter;
  });

  const currentQ = questions[currentIndex] || questions[0];
  const selectedOption = selectedAnswers[currentIndex];
  const isAnswered = selectedOption !== undefined;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return; // Non cambiare risposta dopo feedback
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: idx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    setShowExplanation(true);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    // Calcola punteggio
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    const grade = (correct / questions.length) * 10;
    if (grade >= 7) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Fallback silenzioso
      }
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
    setIsFinished(false);
  };

  // Calcolo statistiche finali
  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) {
      correctCount++;
    }
  });
  const gradeOutOfTen = Number(((correctCount / questions.length) * 10).toFixed(1));

  let evaluationNote = '';
  if (gradeOutOfTen >= 9) {
    evaluationNote = 'Eccellente! Hai compreso a fondo tutti i concetti fisici e tecnologici di elettricità e magnetismo!';
  } else if (gradeOutOfTen >= 8) {
    evaluationNote = 'Ottimo lavoro! Conosci molto bene grandezze, formule e applicazioni pratiche.';
  } else if (gradeOutOfTen >= 7) {
    evaluationNote = 'Buono! Hai una comprensione solida, riguarda solo un paio di formule o definizioni.';
  } else if (gradeOutOfTen >= 6) {
    evaluationNote = 'Sufficiente! Hai afferrato i principi generali, ma ti consigliamo di ripassare le slide o la dispensa.';
  } else {
    evaluationNote = 'Da rinforzare: ripassa l\'analogia idraulica e i simulatori interattivi prima di ritentare!';
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Header del Quiz */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">Autovalutazione Formativa</span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">Quiz di Verifica di Tecnologia</h3>
          <p className="text-sm text-slate-600 mt-1">
            Mettiti alla prova con domande a risposta multipla commentate direttamente dal docente.
          </p>
        </div>

        {/* Filtro Lezione */}
        <div className="flex items-center gap-1 p-1 bg-slate-200 rounded-lg shrink-0">
          <button
            onClick={() => {
              setFilter('lesson-1');
              resetQuiz();
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'lesson-1' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lezione 1 (10 Domande)
          </button>
          <button
            onClick={() => {
              setFilter('lesson-2');
              resetQuiz();
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'lesson-2' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lezione 2 (10 Domande)
          </button>
          <button
            onClick={() => {
              setFilter('all');
              resetQuiz();
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tutte (20 Domande)
          </button>
        </div>
      </div>

      {/* SCHERMATA RISULTATO FINALE */}
      {isFinished ? (
        <div className="p-8 md:p-12 text-center max-w-xl mx-auto space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Esito della Verifica</span>
            <div className="text-5xl font-black text-slate-900 font-mono">
              {gradeOutOfTen} <span className="text-2xl text-slate-400 font-normal">/ 10</span>
            </div>
            <p className="text-sm text-slate-600 font-medium pt-1">
              Hai risposto correttamente a <strong>{correctCount}</strong> domande su <strong>{questions.length}</strong>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
            <strong>Giudizio formativo del docente:</strong><br />
            {evaluationNote}
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={resetQuiz}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Ripeti la Verifica
            </button>
            <button
              onClick={onBackToStudy}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Torna alla Dispensa di Studio
            </button>
          </div>
        </div>
      ) : (
        /* CORPO DEL QUIZ IN CORSO */
        <div className="p-6 md:p-8 space-y-6">
          {/* Barra di avanzamento */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>
                Domanda <strong className="text-slate-900 font-mono">{currentIndex + 1}</strong> di <span className="font-mono">{questions.length}</span>
              </span>
              <span>Argomento: <strong className="text-slate-800">{currentQ.topic}</strong></span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Testo della Domanda */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80">
            <h4 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h4>
          </div>

          {/* Opzioni di Risposta */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let optionStyle = 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';

              if (isAnswered) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold shadow-xs';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                } else {
                  optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`flex items-start gap-3 p-4 rounded-xl border text-left text-sm transition-all ${optionStyle}`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                    isAnswered && isCorrect
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : isAnswered && isSelected && !isCorrect
                      ? 'bg-rose-600 border-rose-600 text-white'
                      : 'bg-slate-100 border-slate-300 text-slate-600'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Feedback Immediato del Docente */}
          {isAnswered && (
            <div className={`p-4 rounded-xl border text-xs md:text-sm leading-relaxed space-y-1 animate-fadeIn ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-amber-50/80 border-amber-200 text-amber-950'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Risposta Corretta!
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-4 h-4 text-amber-600" /> Il commento del Prof:
                  </>
                )}
              </div>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Barra di Navigazione Domande */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Precedente
            </button>

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-lg transition-colors ${
                !isAnswered
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : currentIndex === questions.length - 1
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {currentIndex === questions.length - 1 ? 'Concludi e Vedi il Voto' : 'Prossima Domanda'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
