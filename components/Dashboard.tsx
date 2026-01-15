
import React from 'react';
import { Link } from 'react-router-dom';
import { Subject } from '../types';
import { SUBJECTS } from '../constants';

interface DashboardProps {
  onSelectSubject: (subject: Subject) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectSubject }) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 p-8 md:p-12 border border-slate-700 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent leading-tight">
            Master Every Subject with AI-Powered Insights
          </h1>
          <p className="text-lg text-slate-400 mb-8">
            Access high-quality study materials, mock tests for CBSE/UP Board, and advanced AI labs for any topic you're passionate about.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/voice" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-full font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
              Start Voice Study
            </Link>
            <Link to="/tools" className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-full font-bold transition-all border border-slate-600">
              Explore AI Tools
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current text-blue-500">
            <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.2C87.4,-33.3,90,-16.6,87.3,-1.5C84.7,13.6,76.7,27.1,67.6,39.1C58.4,51.1,48.1,61.6,35.6,68.9C23.1,76.2,8.4,80.3,-6.2,79C-20.9,77.8,-35.6,71.2,-48.5,62.2C-61.4,53.2,-72.5,41.9,-78.7,28.4C-84.9,15,-86.3,-0.6,-82.9,-15.1C-79.6,-29.6,-71.5,-43,-60.1,-50.9C-48.7,-58.8,-33.9,-61.2,-20.3,-68.8C-6.8,-76.5,5.5,-89.4,20.4,-83.7C35.2,-78,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </header>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recommended Subjects</h2>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SUBJECTS.slice(0, 8).map(subject => (
            <Link
              key={subject.id}
              to={`/subject/${subject.id}`}
              onClick={() => onSelectSubject(subject)}
              className="group bg-slate-800/40 hover:bg-slate-800 border border-slate-700 p-6 rounded-2xl transition-all hover:scale-[1.02] hover:border-slate-500"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {subject.icon}
              </div>
              <h3 className="text-lg font-bold mb-1 text-slate-100">{subject.name}</h3>
              <p className="text-sm text-slate-400 line-clamp-2">{subject.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-blue-400">Board Exam Prep</h2>
            <p className="text-slate-300">
              Get specialized notes, formula sheets, and mind maps tailored for <strong>CBSE</strong> and <strong>UP Board</strong> patterns. Includes PYQs and Mock Papers for all classes.
            </p>
            <div className="flex gap-4">
              <button className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold">CBSE Material</button>
              <button className="px-5 py-2 border border-blue-500/30 hover:bg-blue-500/10 rounded-lg text-sm font-bold">UP Board Papers</button>
            </div>
          </div>
          <div className="hidden lg:block w-48 h-48 bg-slate-800 rounded-2xl rotate-12 shadow-2xl p-4 border border-slate-700">
            <div className="w-full h-full bg-slate-700 rounded-lg flex flex-col items-center justify-center text-center p-2">
              <span className="text-2xl font-bold mb-2">95%+</span>
              <span className="text-xs text-slate-400 uppercase">Avg Score using Polymath</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
