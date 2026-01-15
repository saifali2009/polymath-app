
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AppView, Subject } from './types';
import { SUBJECTS, SUBJECT_CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SubjectView from './components/SubjectView';
import QuizView from './components/QuizView';
import NotesView from './components/NotesView';
import VoiceAssistant from './components/VoiceAssistant';
import AiStudioKeyHandler from './components/AiStudioKeyHandler';
import AiTools from './components/AiTools';

const App: React.FC = () => {
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      }
    };
    checkKey();
  }, []);

  const handleSelectSubject = (subject: Subject) => {
    setCurrentSubject(subject);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 overflow-hidden">
        <Navbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            isOpen={isSidebarOpen} 
            onSelectSubject={handleSelectSubject} 
            selectedSubjectId={currentSubject?.id}
          />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard onSelectSubject={handleSelectSubject} />} />
              <Route path="/subject/:id" element={<SubjectView subject={currentSubject} />} />
              <Route path="/quiz/:id" element={<QuizView subject={currentSubject} />} />
              <Route path="/notes/:id" element={<NotesView subject={currentSubject} />} />
              <Route path="/tools" element={<AiTools />} />
              <Route path="/voice" element={<VoiceAssistant />} />
            </Routes>
          </main>
        </div>

        {!hasApiKey && <AiStudioKeyHandler onKeySelected={() => setHasApiKey(true)} />}
      </div>
    </Router>
  );
};

export default App;
