
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { MOCK_INVENTORY, MOCK_ORDERS } from '../constants';

export const AIInsights: React.FC = () => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', content: string}[]>([]);

  const handleGenerateAnalysis = async () => {
    setLoading(true);
    const result = await geminiService.analyzeSupplyChain(MOCK_INVENTORY, MOCK_ORDERS);
    setAnalysis(result);
    setLoading(false);
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatMessage('');
    
    const aiResp = await geminiService.chatWithAssistant(userMsg, { inventory: MOCK_INVENTORY, orders: MOCK_ORDERS });
    setChatHistory(prev => [...prev, { role: 'ai', content: aiResp }]);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-full min-h-[600px]">
      {/* Analysis Panel */}
      <div className="xl:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800">供应链智能风险评估</h2>
            </div>
            <button 
              onClick={handleGenerateAnalysis}
              disabled={loading}
              className={`bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700 shadow-indigo-200'}`}
            >
              {loading ? '分析中...' : '开始AI分析'}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-50 rounded-2xl p-6 border border-slate-100 prose prose-slate max-w-none">
            {analysis ? (
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                {analysis}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                <svg className="h-16 w-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p>点击上方按钮，让 Gemini AI 分析当前的库存与订单数据。</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Assistant */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <h3 className="text-white font-bold">ERP 智能助理</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {chatHistory.length === 0 && (
            <div className="text-slate-500 text-sm text-center mt-10">
              您可以问我：<br/>
              "哪些产品目前库存最低？"<br/>
              "下个月需要重点关注什么？"
            </div>
          )}
          {chatHistory.map((chat, i) => (
            <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                chat.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-slate-800 text-slate-200 rounded-bl-none'
              }`}>
                {chat.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleChat} className="p-4 bg-slate-800/50">
          <div className="relative">
            <input
              type="text"
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="向助理提问..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
