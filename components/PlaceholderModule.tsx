
import React from 'react';

interface PlaceholderModuleProps {
  name: string;
  description: string;
}

export const PlaceholderModule: React.FC<PlaceholderModuleProps> = ({ name, description }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-32 h-32 bg-indigo-50 rounded-3xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-500 opacity-5 animate-pulse"></div>
        <svg className="h-16 w-16 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{name}</h2>
        <p className="text-slate-500 mb-8">{description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-left">
            <div className="h-2 w-12 bg-indigo-100 rounded-full mb-3"></div>
            <div className="h-4 w-24 bg-slate-100 rounded-full mb-2"></div>
            <div className="h-3 w-16 bg-slate-50 rounded-full"></div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-left opacity-60">
            <div className="h-2 w-12 bg-indigo-100 rounded-full mb-3"></div>
            <div className="h-4 w-24 bg-slate-100 rounded-full mb-2"></div>
            <div className="h-3 w-16 bg-slate-50 rounded-full"></div>
          </div>
        </div>
        
        <button className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
          初始化模块数据
        </button>
      </div>
    </div>
  );
};
