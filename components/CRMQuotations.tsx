
import React, { useState } from 'react';
import { CRMQuotationAdd } from './CRMQuotationAdd';
import { CRMQuotationDetail } from './CRMQuotationDetail';

interface QuotationItem {
  code: string;
  customerName: string;
  customerCode: string;
  contactName: string;
  contactMobile: string;
  quotationDate: string;
  salesLead: string;
  quotationNo: string;
  warehouse: string;
  approvalResult: string;
  approvalTime: string;
  approver: string;
  rejectionReason: string;
  submitter: string;
  submitTime: string;
  updateTime: string;
  flowStatus: string;
  currentNode: string;
  currentAssignee: string;
}

const MOCK_DATA: QuotationItem[] = [
  {
    code: "QTC-2026-0001",
    customerName: "Kohler采购单",
    customerCode: "20260107-0001",
    contactName: "高启盛",
    contactMobile: "18832157548",
    quotationDate: "2026-01-07 11:22",
    salesLead: "刘**",
    quotationNo: "BJ20260113",
    warehouse: "成品库",
    approvalResult: "",
    approvalTime: "",
    approver: "王",
    rejectionReason: "",
    submitter: "刘",
    submitTime: "2026-01-12 21:09:30",
    updateTime: "2026-01-13 10:15:00",
    flowStatus: "进行中",
    currentNode: "商务审批",
    currentAssignee: "王",
  }
];

export const CRMQuotations: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [viewingNo, setViewingNo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('全部');
  const [deptFilter, setDeptFilter] = useState('销售一部');
  const [searchNo, setSearchNo] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  if (isAdding) {
    return <CRMQuotationAdd onClose={() => setIsAdding(false)} />;
  }

  if (viewingNo) {
    return (
      <CRMQuotationDetail 
        orderNo={viewingNo} 
        onClose={() => setViewingNo(null)} 
        onEdit={() => {
          setViewingNo(null);
          setIsAdding(true);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500 pb-20">
      {/* 1. 顶部标签与功能区 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex space-x-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm shrink-0">
          {["全部"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all uppercase tracking-widest ${
                activeTab === tab 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-3 shrink-0">
          <button 
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-xl shadow-indigo-100 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            <span>添加报价单</span>
          </button>
          <div className="relative group">
            <button className="px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2">
              <span>操作</span>
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-slate-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40 p-2 border-t-4 border-t-indigo-600">
               <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl flex items-center space-x-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span>导出数据</span>
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 筛选搜索区 */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">所属部门</label>
            <select 
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none appearance-none cursor-pointer"
            >
              <option value="销售一部">销售一部</option>
              <option value="销售二部">销售二部</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">检索编号</label>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="搜报价编号"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                value={searchNo}
                onChange={e => setSearchNo(e.target.value)}
              />
              <svg className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">流程状态</label>
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none appearance-none cursor-pointer"
            >
              <option value="">全部状态</option>
              <option value="进行中">进行中</option>
              <option value="已结案">已结案</option>
              <option value="已驳回">已驳回</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. 报价单表格区 */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="overflow-x-auto relative scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          <table className="min-w-[3200px] text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-100">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                <th className="px-6 py-5 sticky left-0 bg-slate-50 z-30 border-r border-slate-100">报价单编码</th>
                <th className="px-4 py-5">客户名称</th>
                <th className="px-4 py-5">客户编码</th>
                <th className="px-4 py-5">客户联系人姓名</th>
                <th className="px-4 py-5">客户联系人手机</th>
                <th className="px-4 py-5">报价日期</th>
                <th className="px-4 py-5">销售负责人</th>
                <th className="px-4 py-5 font-mono">报价单编号</th>
                <th className="px-4 py-5">出库仓库</th>
                <th className="px-4 py-5 text-center">审批结果</th>
                <th className="px-4 py-5">审批时间</th>
                <th className="px-4 py-5 text-center">审批人</th>
                <th className="px-4 py-5">不通过原因</th>
                <th className="px-4 py-5 text-center">提交人</th>
                <th className="px-4 py-5">提交时间</th>
                <th className="px-4 py-5">更新时间</th>
                <th className="px-4 py-5 text-center">流程状态</th>
                <th className="px-4 py-5">当前节点</th>
                <th className="px-8 py-5 text-right sticky right-0 bg-slate-50 z-20 border-l border-slate-100 shadow-[-4px_0_10px_rgba(0,0,0,0.05)]">当前负责人</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {MOCK_DATA.map((item, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/20 transition-colors group">
                  <td className="px-6 py-6 sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100 whitespace-nowrap">
                    <span 
                      onClick={() => setViewingNo(item.quotationNo)}
                      className="text-[13px] font-black text-indigo-600 font-mono tracking-tight underline decoration-indigo-200 underline-offset-4 cursor-pointer"
                    >
                      {item.code}
                    </span>
                  </td>
                  <td className="px-4 py-6 text-[13px] font-bold text-slate-800">{item.customerName}</td>
                  <td className="px-4 py-6 text-[13px] text-slate-500 font-mono">{item.customerCode}</td>
                  <td className="px-4 py-6 text-[13px] font-bold text-slate-700">{item.contactName}</td>
                  <td className="px-4 py-6 text-[13px] font-mono text-slate-600">{item.contactMobile}</td>
                  <td className="px-4 py-6 text-[12px] font-mono text-slate-400 font-bold">{item.quotationDate}</td>
                  <td className="px-4 py-6 text-[13px] text-slate-600">{item.salesLead}</td>
                  <td className="px-4 py-6 text-[13px] font-black text-slate-800 font-mono tracking-tighter">{item.quotationNo}</td>
                  <td className="px-4 py-6">
                    <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded uppercase">{item.warehouse}</span>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span className={`text-[11px] font-black uppercase ${item.approvalResult === '通过' ? 'text-emerald-500' : 'text-slate-300'}`}>
                      {item.approvalResult || "--"}
                    </span>
                  </td>
                  <td className="px-4 py-6 text-[12px] font-mono text-slate-300 italic">{item.approvalTime || "--"}</td>
                  <td className="px-4 py-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white font-black">{item.approver.charAt(0)}</div>
                      <span className="text-[13px] font-bold text-slate-700">{item.approver}</span>
                    </div>
                  </td>
                  <td className="px-4 py-6 text-[12px] text-rose-400 italic">{item.rejectionReason || "--"}</td>
                  <td className="px-4 py-6 text-center">
                     <span className="text-[13px] font-bold text-slate-700">{item.submitter}</span>
                  </td>
                  <td className="px-4 py-6 text-[12px] font-mono text-slate-400">{item.submitTime}</td>
                  <td className="px-4 py-6 text-[12px] font-mono text-slate-400">{item.updateTime}</td>
                  <td className="px-4 py-6 text-center">
                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                       item.flowStatus === '进行中' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-slate-100 text-slate-500'
                     }`}>
                       {item.flowStatus}
                     </span>
                  </td>
                  <td className="px-4 py-6">
                     <span className="text-[11px] font-black text-indigo-400 uppercase tracking-tighter bg-indigo-50/50 px-2 py-0.5 rounded">{item.currentNode}</span>
                  </td>
                  <td className="px-8 py-6 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 z-20 border-l border-slate-100 shadow-[-4px_0_10px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-end space-x-3">
                       <span className="text-[13px] font-black text-slate-800">{item.currentAssignee}</span>
                       <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black shadow-lg shadow-indigo-100">{item.currentAssignee.charAt(0)}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. 分页区 */}
        <div className="px-10 py-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30 shrink-0">
          <div className="flex items-center space-x-12">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              数据统计 <span className="text-slate-800 text-sm mx-1">共1条</span>
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center space-x-3">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">每页显示:</span>
               <select className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer">
                 <option>20条/页</option>
                 <option>50条/页</option>
               </select>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-400 hover:bg-white transition-all shadow-sm group">
                <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="w-10 h-10 rounded-2xl bg-indigo-600 text-white text-xs font-black shadow-xl shadow-indigo-100">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-400 hover:bg-white transition-all shadow-sm group">
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">前往:</span>
              <div className="relative">
                <input 
                  type="number" 
                  defaultValue={1} 
                  className="w-16 bg-white border border-slate-200 rounded-xl py-2 text-xs text-center font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" 
                />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">页</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
