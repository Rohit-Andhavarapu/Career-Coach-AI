import React, { useState, useRef, useEffect } from 'react';
import { Button } from './components/Button';
import { Input, TextArea } from './components/Input';
import { ChatMessage } from './components/ChatMessage';
import { ScoreChart } from './components/ScoreChart';
import { ExperienceLevel, InterviewConfig, InterviewMode, Message, ScoreData, ParsedReport } from './types';
import { initializeInterview, sendMessageToAI, generateFinalReport } from './services/geminiService';

const App: React.FC = () => {
  // State
  const [view, setView] = useState<'setup' | 'interview' | 'report'>('setup');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [config, setConfig] = useState<InterviewConfig>({
    role: '',
    experienceLevel: ExperienceLevel.Intermediate,
    mode: InterviewMode.Technical,
    candidateName: '',
    resumeText: '',
    numberOfQuestions: 5,
  });
  const [report, setReport] = useState<ParsedReport | null>(null);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handlers
  const handleStartInterview = async () => {
    if (!config.role || !config.candidateName) {
      alert("Please fill in the required fields (Role, Name).");
      return;
    }

    setIsLoading(true);
    try {
      const initialResponse = await initializeInterview(config);
      setMessages([
        {
          id: 'init',
          role: 'model',
          text: initialResponse,
          timestamp: Date.now(),
        },
      ]);
      setView('interview');
    } catch (error) {
      alert("Failed to start interview. Check API Key or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await sendMessageToAI(userMsg.text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      alert("Error getting response.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndInterview = async () => {
    setIsLoading(true);
    try {
      const reportText = await generateFinalReport();
      parseAndSetReport(reportText);
      setView('report');
    } catch (error) {
      console.error(error);
      alert("Failed to generate report.");
    } finally {
      setIsLoading(false);
    }
  };

  const parseAndSetReport = (text: string) => {
    // Basic extraction logic for scores to visualize
    const extractScore = (regex: RegExp): number => {
      const match = text.match(regex);
      return match ? parseInt(match[1], 10) : 0;
    };

    const scores: ScoreData[] = [
      { category: 'Technical', score: extractScore(/# Technical Score.*?(\d+)/i), fullMark: 10 },
      { category: 'Communication', score: extractScore(/# Communication Score.*?(\d+)/i), fullMark: 10 },
      { category: 'Confidence', score: extractScore(/# Confidence Score.*?(\d+)/i), fullMark: 10 },
      { category: 'Overall', score: extractScore(/# Overall Score.*?(\d+)/i), fullMark: 10 },
    ];

    let hiringRec = "Consider";
    const recMatch = text.match(/# Hiring Recommendation\s*\n\s*(.*)/i);
    if (recMatch) hiringRec = recMatch[1];

    setReport({
      rawText: text,
      scores,
      hiringRecommendation: hiringRec,
    });
  };

  // Render Views
  const renderSetup = () => (
    <div className="min-h-screen flex flex-col justify-center py-12 px-6 bg-white">
      <div className="max-w-xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-zinc-100 text-zinc-500 text-xs font-semibold tracking-wider uppercase">
            Career Coach AI
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-zinc-900 tracking-tight mb-4">
            Interview Prep
          </h1>
          <p className="text-lg text-zinc-500 font-light">
            Refine your skills with an adaptive AI interviewer.
          </p>
        </div>

        <div className="space-y-6">
          <Input
            label="Full Name"
            placeholder="Jane Doe"
            value={config.candidateName}
            onChange={(e) => setConfig({ ...config, candidateName: e.target.value })}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Target Role"
              placeholder="Product Designer"
              value={config.role}
              onChange={(e) => setConfig({ ...config, role: e.target.value })}
            />
            <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 ml-1">Experience</label>
              <div className="relative">
                <select
                  className="w-full px-5 py-3 bg-zinc-50 border-none rounded-xl text-zinc-900 appearance-none focus:ring-2 focus:ring-zinc-200 focus:bg-white outline-none"
                  value={config.experienceLevel}
                  onChange={(e) => setConfig({ ...config, experienceLevel: e.target.value as ExperienceLevel })}
                >
                  {Object.values(ExperienceLevel).map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 ml-1">Mode</label>
              <div className="relative">
                <select
                  className="w-full px-5 py-3 bg-zinc-50 border-none rounded-xl text-zinc-900 appearance-none focus:ring-2 focus:ring-zinc-200 focus:bg-white outline-none"
                  value={config.mode}
                  onChange={(e) => setConfig({ ...config, mode: e.target.value as InterviewMode })}
                >
                  {Object.values(InterviewMode).map((mode) => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
             <div>
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 ml-1">Length</label>
              <div className="relative">
                <select
                  className="w-full px-5 py-3 bg-zinc-50 border-none rounded-xl text-zinc-900 appearance-none focus:ring-2 focus:ring-zinc-200 focus:bg-white outline-none"
                  value={config.numberOfQuestions}
                  onChange={(e) => setConfig({ ...config, numberOfQuestions: parseInt(e.target.value) })}
                >
                  <option value={3}>3 Questions (Quick)</option>
                  <option value={5}>5 Questions (Standard)</option>
                  <option value={10}>10 Questions (Deep)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <TextArea
            label="Resume Summary (Optional)"
            placeholder="Briefly paste your key skills or summary..."
            rows={3}
            value={config.resumeText}
            onChange={(e) => setConfig({ ...config, resumeText: e.target.value })}
          />

          <div className="pt-4">
            <Button
              className="w-full py-4 text-base"
              onClick={handleStartInterview}
              isLoading={isLoading}
            >
              Begin Interview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInterview = () => (
    <div className="flex flex-col h-screen bg-zinc-50/50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4 flex justify-between items-center z-20">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">{config.role}</h2>
          <p className="text-xs text-zinc-500 font-medium tracking-wide uppercase">{config.mode} • {config.experienceLevel}</p>
        </div>
        <Button variant="danger" className="text-xs py-2 px-4" onClick={handleEndInterview} isLoading={isLoading}>
          Finish
        </Button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto pt-24 pb-32 px-4 scrollbar-hide">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
             <div className="flex w-full mb-8 justify-start animate-pulse">
                <div className="bg-white border border-zinc-100 rounded-2xl rounded-tl-none p-5 shadow-sm">
                   <div className="flex space-x-2">
                      <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce delay-150"></div>
                   </div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="fixed bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-zinc-100 p-4 z-20">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            className="flex-1 px-6 py-4 bg-zinc-50 border-none rounded-full focus:bg-white focus:ring-2 focus:ring-zinc-900/10 outline-none transition-all placeholder-zinc-400"
            placeholder="Type your answer..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
            autoFocus
          />
          <button 
            onClick={handleSendMessage} 
            disabled={!inputText.trim() || isLoading}
            className="w-14 h-14 flex items-center justify-center bg-zinc-900 text-white rounded-full hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </footer>
    </div>
  );

  const renderReport = () => {
    if (!report) return null;

    return (
      <div className="min-h-screen bg-white p-6 md:p-12">
        <div className="max-w-5xl mx-auto">
           <div className="flex justify-between items-center mb-12">
             <div>
                <h1 className="text-3xl font-light text-zinc-900 tracking-tight">Evaluation Report</h1>
                <p className="text-zinc-500 mt-2">Summary for {config.candidateName}</p>
             </div>
             <Button variant="outline" onClick={() => window.location.reload()}>New Session</Button>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Score Chart & Stats */}
              <div className="lg:col-span-1 space-y-8">
                 <div className="bg-zinc-50 rounded-3xl p-6">
                    <ScoreChart data={report.scores} />
                 </div>
                 
                 <div className="bg-zinc-900 text-white p-8 rounded-3xl text-center">
                    <span className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">Hiring Recommendation</span>
                    <span className="text-3xl font-medium tracking-tight">
                      {report.hiringRecommendation}
                    </span>
                 </div>
              </div>

              {/* Text Report */}
              <div className="lg:col-span-2">
                <div className="markdown-body text-zinc-600">
                    {report.rawText.split('\n').map((line, i) => {
                        // Custom parsing for minimal look
                        if (line.startsWith('# ')) return <h2 key={i} className="text-2xl font-semibold text-zinc-900 mt-10 mb-4 tracking-tight border-b border-zinc-100 pb-2">{line.replace('# ', '')}</h2>;
                        if (line.startsWith('## ')) return <h3 key={i} className="text-lg font-medium text-zinc-800 mt-6 mb-3">{line.replace('## ', '')}</h3>;
                        if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc marker:text-zinc-300 pl-2 mb-2">{line.replace('- ', '')}</li>;
                        if (line.trim() === '') return <div key={i} className="h-2"></div>;
                        return <p key={i} className="mb-4 leading-relaxed">{line}</p>;
                    })}
                </div>
              </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {view === 'setup' && renderSetup()}
      {view === 'interview' && renderInterview()}
      {view === 'report' && renderReport()}
    </>
  );
};

export default App;