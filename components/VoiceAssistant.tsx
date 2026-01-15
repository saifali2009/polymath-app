
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

const VoiceAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef(0);

  const toggleSession = async () => {
    if (isActive) {
      stopSession();
    } else {
      startSession();
    }
  };

  const startSession = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            if (msg.serverContent?.outputTranscription) {
              setTranscript(prev => [...prev, `Polymath: ${msg.serverContent!.outputTranscription!.text}`]);
            }
            if (msg.serverContent?.inputTranscription) {
              setTranscript(prev => [...prev, `You: ${msg.serverContent!.inputTranscription!.text}`]);
            }
            
            const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              handleAudioOutput(base64Audio);
            }
          },
          onerror: (e) => setError("Connection error"),
          onclose: () => setIsActive(false),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: "You are Polymath, a brilliant and friendly study assistant. You help students understand complex topics, solve problems, and practice languages like Hindi and English.",
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      setError(err.message || "Failed to start session");
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    setIsActive(false);
  };

  const handleAudioOutput = async (base64: string) => {
    const ctx = outputAudioContextRef.current!;
    nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
    const buffer = await decodeAudioData(decode(base64), ctx, 24000, 1);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(nextStartTimeRef.current);
    nextStartTimeRef.current += buffer.duration;
    sourcesRef.current.add(source);
    source.onended = () => sourcesRef.current.delete(source);
  };

  // Helper functions
  function decode(b64: string) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }
  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, rate: number, chans: number) {
    const i16 = new Int16Array(data.buffer);
    const buffer = ctx.createBuffer(chans, i16.length / chans, rate);
    for (let c = 0; c < chans; c++) {
      const cd = buffer.getChannelData(c);
      for (let i = 0; i < cd.length; i++) cd[i] = i16[i * chans + c] / 32768.0;
    }
    return buffer;
  }
  function createBlob(data: Float32Array): any {
    const i16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) i16[i] = data[i] * 32768;
    const bytes = new Uint8Array(i16.buffer);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return { data: btoa(bin), mimeType: 'audio/pcm;rate=16000' };
  }

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 p-4 scroll-smooth">
        {transcript.length === 0 && !isActive && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <p className="max-w-xs">Tap to start a real-time voice conversation about any subject.</p>
          </div>
        )}
        {transcript.map((line, i) => (
          <div key={i} className={`p-4 rounded-2xl max-w-[80%] ${line.startsWith('You:') ? 'ml-auto bg-blue-600' : 'bg-slate-800 border border-slate-700'}`}>
            {line}
          </div>
        ))}
      </div>

      <div className="p-8 flex flex-col items-center gap-4">
        {error && <p className="text-rose-500 text-sm bg-rose-500/10 px-4 py-2 rounded-full">{error}</p>}
        <button
          onClick={toggleSession}
          className={`
            w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-2xl
            ${isActive 
              ? 'bg-rose-500 hover:bg-rose-600 animate-pulse' 
              : 'bg-emerald-500 hover:bg-emerald-600 scale-110'}
          `}
        >
          {isActive ? (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>
        <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">
          {isActive ? 'Active Session' : 'Start Voice Chat'}
        </span>
      </div>
    </div>
  );
};

export default VoiceAssistant;
