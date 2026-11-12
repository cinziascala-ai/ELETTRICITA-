export type ViewMode = 'presentation' | 'study-guide' | 'simulator' | 'quiz' | 'glossary';

export type LessonId = 'lesson-1' | 'lesson-2';

export interface UnitOfMeasure {
  name: string;
  symbol: string;
  quantity: string;
  quantitySymbol: string;
  formula: string;
  namedAfter: string;
  measuringInstrument: string;
  simpleExplanation: string;
  everydayExample: string;
}

export interface SlideContent {
  id: string;
  lessonId: LessonId;
  title: string;
  subtitle: string;
  keyPoints: string[];
  visualType: 'atom' | 'conductors' | 'units-table' | 'hydraulic' | 'circuit-types' | 'safety' | 'magnet-poles' | 'magnetic-field' | 'oersted-faraday' | 'electromagnet' | 'motor-generator' | 'applications';
  teacherNotes: string;
  deepDive?: {
    title: string;
    content: string;
  };
  simplified?: {
    title: string;
    points: string[];
    analogy?: string;
  };
}

export interface GlossaryItem {
  id: string;
  term: string;
  category: 'Elettricità' | 'Magnetismo' | 'Unità di Misura' | 'Sicurezza' | 'Storia';
  definition: string;
  simpleExplanation: string;
  symbolOrFormula?: string;
  unit?: string;
  relatedTerms: string[];
}

export interface QuizQuestion {
  id: string;
  lessonId: LessonId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
  difficulty: 'base' | 'intermedio' | 'sfida';
}
