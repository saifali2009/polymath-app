
import React, { useState } from 'react';
import { gemini } from '../services/geminiService';

const AiTools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'image' | 'video' | 'edit' | 'analyze' | 'maps' | 'search'>('image');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [textResult, setTextResult] = useState('');
  const [groundingChunks, setGroundingChunks] = useState<any[]>([]);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const handleAction = async () => {
    setLoading(true);
    setResult(null);
    setTextResult('');
    setGroundingChunks([]);

    try {
      if (activeTool === 'image') {
        const url = await gemini.generateImage(prompt, aspectRatio, imageSize);
        setResult(url);
      } else if (activeTool === 'video') {
        let startImage = undefined;
        if (selectedFile) startImage = await toBase64(selectedFile);
        const url = await gemini.generateVideo(prompt, aspectRatio as any, startImage);
        setResult(url);
      } else if (activeTool === 'edit') {
        if (!selectedFile) throw new Error("Please upload an image to edit");
        const b64 = await toBase64(selectedFile);
        const url = await gemini.editImage(b64, selectedFile.type, prompt);
        setResult(url);
      } else if (activeTool === 'analyze') {
        if (!selectedFile) throw new Error("Please upload media to analyze");
        const b64 = await toBase64(selectedFile);
        const text = await gemini.analyzeMedia(b64, selectedFile.type, prompt || "Describe this content in detail for a student.");
        setTextResult(text);
      } else if (activeTool === 'search') {
        const res = await gemini.searchGrounding(prompt);
        setTextResult(res.text);
        setGroundingChunks(res.chunks);
      } else if (activeTool === 'maps') {
        // Request geolocation
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const res = await gemini.mapsGrounding(prompt, pos.coords.latitude, pos.coords.longitude);
          setTextResult(res.text);
          setGroundingChunks(res.chunks);
        }, async () => {
          const res = await gemini.mapsGrounding(prompt);
          setTextResult(res.text);
          setGroundingChunks(res.chunks);
        });
      }
    } catch (err: any) {
      setTextResult(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">AI Learning Laboratory</h1>
        <p className="text-slate-400">Advanced multi-modal tools for visualization, research, and board prep.</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 bg-slate-800 p-1 rounded-2xl border border-slate-700">
        {(['image', 'video', 'edit', 'analyze', 'search', 'maps'] as const).map(t => (
          <button
            key={t}
            onClick={() => { setActiveTool(t); setResult(null); setTextResult(''); }}
            className={`py-2 rounded-xl text-xs font-bold uppercase transition-all ${activeTool === t ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Configuration</h3>
            
            {(activeTool === 'edit' || activeTool === 'analyze' || activeTool === 'video') && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">Source Media</label>
                <div className="relative group aspect-video bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center overflow-hidden hover:border-indigo-500 transition-colors cursor-pointer">
                  {previewUrl ? (
                    <img src={previewUrl} className="w-full h-full object-cover" />