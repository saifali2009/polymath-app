
import React from 'react';
import { Link } from 'react-router-dom';
import { Subject } from '../types';

interface SubjectViewProps {
  subject: Subject | null;
}

const SubjectView: React.FC<SubjectViewProps> = ({ subject }) => {
  if (!subject) return <div className="text-center py-20 text-slate-400">Please select a subject from the sidebar.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
        <div className="text-8xl p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
          {subject.icon}
        </div>
        <div className="flex-1 text-center md:text-left space-y-4">
          <span className="text-xs font-bold bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-500/20">
            {subject.category}
          </span>
          <h1 className="text-4xl font-bold">{subject.name}</h1>
          <p className="text-lg text-slate-400 leading-relaxed">{subject.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          to={`/notes/${subject.id}`}
          className="group bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-blue-500 transition-all hover:scale-[1.02]"
        >
          <div className="w-12 h-12 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Study Materials</h3>
          <p className="text-sm text-slate-400">Short notes, formula sheets, and mind maps for quick revision.</p>
        </Link>

        <Link 
          to={`/quiz/${subject.id}`}
          className="group bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500 transition-all hover:scale-[1.02]"
        >
          <div className="w-12 h-12 bg-emerald-600/10 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Interactive Quiz</h3>
          <p className="text-sm text-slate-400">Practice with MCQ's, PYQ's and mock tests across all difficulty levels.</p>
        </Link>
      </div>

      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Available Topics
        </h3>
        <div className="flex flex-wrap gap-3">
          {subject.topics.map(topic => (
            <span key={topic} className="px-4 py-2 bg-slate-900 rounded-xl text-sm border border-slate-700 text-slate-300">
              {topic}
            </span>
          ))}
          <span className="px-4 py-2 bg-indigo-600/10 text-indigo-400 rounded-xl text-sm border border-indigo-500/20 font-bold italic">
            + 50 more AI generated modules
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubjectView;
