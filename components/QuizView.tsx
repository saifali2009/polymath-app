
import React, { useState, useEffect } from 'react';
import { Subject, QuizQuestion } from '../types';
import { gemini } from '../services/geminiService';

interface QuizViewProps {
  subject: Subject | null;
}

const QuizView: React.FC<QuizViewProps> = ({ subject }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (subject) {
      loadQuiz();
    }
  }, [subject]);

  const loadQuiz = async () => {
    setLoading(true);
    try {
      const data = await gemini.generateQuiz(subject?.name || 'Science', 'Basics', 'Intermediate');
      setQuestions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (idx === questions[currentIdx].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400">Curating your AI Quiz...</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-6 bg-slate-800 p-8 rounded-3xl border border-slate-700">
        <h2 className="text-3xl font-bold">Quiz Completed!</h2>
        <div className="text-6xl font-black text-blue-400">
          {score} / {questions.length}
        </div>
        <p className="text-slate-400">Great effort! Keep studying to improve your score.</p>
        <button 
          onClick={() => {
            setCurrentIdx(0);
            setScore(0);
            setShowResult(false);
            loadQuiz();
          }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex justify-between items-center text-sm text-slate-400 px-2">
        <span>Question {currentIdx + 1} of {questions.length}</span>
        <span className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700">Score: {score}</span>
      </div>

      <div className="bg-slate-800 rounded-3xl p-6 md:p-10 border border-slate-700 shadow-xl">
        <h3 className="text-xl md:text-2xl font-bold mb-8 leading-relaxed">
          {q.question}
        </h3>

        <div className="space-y-4">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selectedAnswer !== null}
              className={`
                w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group
                ${selectedAnswer === null 
                  ? 'border-slate-700 hover:border-blue-500/50 hover:bg-slate-700/50' 
                  : idx === q.correctAnswer 
                    ? 'border-emerald-500 bg-emerald-500/10' 
                    : selectedAnswer === idx 
                      ? 'border-rose-500 bg-rose-500/10' 
                      : 'border-slate-700 opacity-50'}
              `}
            >
              <span className="font-medium">{opt}</span>
              {selectedAnswer !== null && idx === q.correctAnswer && (
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-8 p-4 bg-slate-700/30 rounded-xl border-l-4 border-blue-500 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h4 className="text-sm font-bold text-blue-400 mb-1">Explanation:</h4>
            <p className="text-sm text-slate-300 italic">{q.explanation}</p>
          </div>
        )}

        {selectedAnswer !== null && (
          <button
            onClick={handleNext}
            className="w-full mt-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            {currentIdx < questions.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizView;
