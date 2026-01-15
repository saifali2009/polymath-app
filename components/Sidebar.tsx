
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Subject } from '../types';
import { SUBJECTS, SUBJECT_CATEGORIES } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  onSelectSubject: (subject: Subject) => void;
  selectedSubjectId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onSelectSubject, selectedSubjectId }) => {
  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-slate-800/50 border-r border-slate-700 h-[calc(100vh-64px)] overflow-y-auto hidden md:block backdrop-blur-sm">
      <div className="p-4 space-y-6">
        {SUBJECT_CATEGORIES.map(category => (
          <div key={category} className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">
              {category}
            </h3>
            <div className="space-y-1">
              {SUBJECTS.filter(s => s.category === category).map(subject => (
                <NavLink
                  key={subject.id}
                  to={`/subject/${subject.id}`}
                  onClick={() => onSelectSubject(subject)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                    ${isActive 
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                      : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'}
                  `}
                >
                  <span className="text-lg">{subject.icon}</span>
                  <span className="font-medium truncate">{subject.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
