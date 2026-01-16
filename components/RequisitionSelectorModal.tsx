
import React, { useState } from 'react';

interface RequisitionSummary {
  id: string;
  orderNo: string;
  workOrderName: string;
  planName: string;
  team: string;
  leader: string;
  requester: string;
  items: any[];
}

const MOCK_REQUISITIONS: RequisitionSummary[] = [
  {
    id: "LL-20260109001",
    orderNo: "LL-20260109001",
    workOrderName: "感应龙头外壳（ABS）组装+检测工单",
    planName: "感应龙头外壳生产计划202601",
    team: "组装一班",
    leader: "李班组",
    requester: "张操作",
    items: [
      { name: "红外感应芯片", code: "MAT-IR-001", batch: "QC-202601", unit: "个" },
      { name: "ABS外壳组件", code: "SHELL-ABS-01", batch: "QC-202601", unit: "件" }
    ]
  },
  {
    id: "LL-20260110002",
    orderNo: "LL-20260110002",
    workOrderName: "医用感应线圈绕制工单",
    planName: "医用感应线圈生产计划202602",
    team: "绕线二组",
    leader: "张班组",
    requester: "王技术",
    items: [
      { name: "漆包线", code: "MAT-WIRE-02", batch: "QC-202602", unit: "卷" }
    ]
  }
];

interface RequisitionSelectorModalProps {
  onSelect: (req: RequisitionSummary) => void;
  onClose: () => void;
}

export const RequisitionSelectorModal: React.FC<RequisitionSelectorModalProps> = ({ onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
        <header className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm">
               <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <h2 className="text-lg font-black text-slate-800 tracking-tight">选择领料单 (Select Requisition)</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="px-8 py-4 border-b border-slate-50 shrink-0">
           <div className="relative">
              <input 
                type="text" 
                placeholder="输入领料单号/工单名称搜索"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-xs font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
           </div>
        </div>

        <div className="flex-1 overflow-auto">
           <table className="min-w-full text-left border-collapse">
              <thead className="bg-slate-50 sticky top-0 z-10">
                 <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap">
                    <th className="px-8 py-4">领料单号</th>
                    <th className="px-4 py-4">工单名称</th>
                    <th className="px-4 py-4">班组</th>
                    <th className="px-4 py-4">领料人</th>
                    <th className="px-8 py-4 text-right">操作</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {MOCK_REQUISITIONS.filter(r => r.orderNo.includes(searchTerm) || r.workOrderName.includes(searchTerm)).map(req => (
                   <tr key={req.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="px-8 py-5 text-xs font-mono font-black text-indigo-600 tracking-tighter">{req.orderNo}</td>
                      <td className="px-4 py-5 text-xs font-bold text-slate-700">{req.workOrderName}</td>
                      <td className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase">{req.team}</td>
                      <td className="px-4 py-5 text-xs font-bold text-slate-600">{req.requester}</td>
                      <td className="px-8 py-5 text-right">
                         <button 
                           onClick={() => onSelect(req)}
                           className="px-6 py-2 bg-white border border-indigo-200 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                         >
                           选择
                         </button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};
