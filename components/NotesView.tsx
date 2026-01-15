
import React, { useState, useEffect } from 'react';
import { Subject } from '../types';
import { gemini } from '../services/geminiService';

interface NotesViewProps {
  subject: Subject | null;
}

const NotesView: React.FC<NotesViewProps> = ({ subject }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'formula' | 'mindmap'>('notes');

  useEffect(() => {
    if (!subject) return;

    const storageKey = `polymath_note_${subject.id}_${activeTab}`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      setContent(saved);
    } else {
      loadContent();
    }
  }, [subject, activeTab]);

  const loadContent = async () => {
    if (!subject) return;
    setLoading(true);
    try {
      const prompt = activeTab === 'formula' 
        ? `Generate a concise formula sheet for ${subject.name}, including board pattern essentials.` 
        : activeTab === 'mindmap' 
          ? `Create a detailed mind map for ${subject.name} using ASCII/Markdown structure.` 
          : `Generate comprehensive study notes for ${subject.name}.`;
      
      const data = await gemini.generateStudyNotes(subject.name, prompt);
      setContent(data);
      localStorage.setItem(`polymath_note_${subject.id}_${activeTab}`, data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearPersistence = () => {
    if (subject) {
      localStorage.removeItem(`polymath_note_${subject.id}_${activeTab}`);
      loadContent();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
        {(['notes', 'formula', 'mindmap'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden min-h-[500px] relative">
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={clearPersistence}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-bold text-slate-400 transition-colors"
            title="Refresh from AI"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[500px] space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400">Synthesizing {activeTab}...</p>
          </div>
        ) : (
          <div className="p-8 prose prose-invert max-w-none whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-300">
            {content || "No content found. Click refresh to generate."}
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button 
          onClick={() => gemini.speak(content)}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
          Read Aloud (TTS)
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default NotesView;
