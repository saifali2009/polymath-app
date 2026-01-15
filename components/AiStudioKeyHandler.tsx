
import React from 'react';

interface AiStudioKeyHandlerProps {
  onKeySelected: () => void;
}

const AiStudioKeyHandler: React.FC<AiStudioKeyHandlerProps> = ({ onKeySelected }) => {
  const handleOpenKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success as per guidelines to avoid race condition
      onKeySelected();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-600/10 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Connect AI Engine</h2>
          <p className="text-slate-400 text-sm">
            To use advanced features like Veo Video Generation and high-quality 4K imagery, please select your Google AI Studio API key.
          </p>
        </div>
        <div className="p-4 bg-slate-800 rounded-2xl text-left">
          <p className="text-xs text-slate-500 mb-2 uppercase font-bold tracking-widest">Requirement</p>
          <ul className="text-sm space-y-2 text-slate-300 list-disc list-inside">
            <li>Paid GCP project enabled</li>
            <li>Vertex AI or Gemini API active</li>
          </ul>
        </div>
        <button
          onClick={handleOpenKey}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20"
        >
          Select API Key
        </button>
        <p className="text-xs text-slate-500">
          For more information, visit the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">Gemini API billing documentation</a>.
        </p>
      </div>
    </div>
  );
};

export default AiStudioKeyHandler;
