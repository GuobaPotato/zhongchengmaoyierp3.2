
import React, { useState, useMemo } from 'react';
import { ApprovalFlowCreate } from './ApprovalFlowCreate';

interface ApprovalFlow {
  flowCode: string;
  flowName: string;
  flowCategory: string;
  approvalType: string;
  limitCondition: string;
  approvalLevel: string;
  approvalNodeCount: number;
  lastModifier: string;
  status: '启用' | '停用';
}

const MOCK_FLOWS: ApprovalFlow[] = [
  { flowCode: "LC001", flowName: "采购类审批主流程", flowCategory: "采购类", approvalType: "采购审批", limitCondition: "采购金额≥2000元", approvalLevel: "二级审批", approvalNodeCount: 2, lastModifier: "赵采购", status: "启用" },
  { flowCode: "LC002", flowName: "入库单标准审批流程", flowCategory: "仓储类", approvalType: "入库单审批", limitCondition: "无金额限制，全品类入库", approvalLevel: "一级审批", approvalNodeCount: 1, lastModifier: "张库管", status: "启用" },
  { flowCode: "LC003", flowName: "大额合同审批流程", flowCategory: "销售类", approvalType: "合同审批", limitCondition: "合同金额≥50000元", approvalLevel: "三级审批", approvalNodeCount: 3, lastModifier: "钱销售", status: "停用" },
  { flowCode: "LC004", flowName: "库存盘点异常审批流程", flowCategory: "仓储类", approvalType: "库存盘点审批", limitCondition: "盘点差异率≥5%", approvalLevel: "二级审批", approvalNodeCount: 2, lastModifier: "周仓管", status: "启用" },
  { flowCode: "LC005", flowName: "客户报价审批流程", flowCategory: "销售类", approvalType: "报价单审批", limitCondition: "所有客户报价，无金额限制", approvalLevel: "二级审批", approvalNodeCount: 2, lastModifier: "钱销售", status: "启用" },
  { flowCode: "LC006", flowName: "小额采购快捷审批流程", flowCategory: "采购类", approvalType: "采购审批", limitCondition: "采购金额＜2000元", approvalLevel: "一级审批", approvalNodeCount: 1, lastModifier: "赵采购", status: "停用" },
];

export const ApprovalFlowManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("全部");
  const [statusFilter, setStatusFilter] = useState("全部");
  const [isCreating, setIsCreating] = useState(false);

  const filteredData = useMemo(() => {
    return MOCK_FLOWS.filter(flow => {
      const matchSearch = flow.flowCode.includes(searchTerm) || flow.flowName.includes(searchTerm);
      const matchCategory = categoryFilter === "全部" || flow.flowCategory === categoryFilter;
      const matchStatus = statusFilter === "全部" || flow.status === statusFilter;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  if (isCreating) {
    return <ApprovalFlowCreate onClose={() => setIsCreating(false)} />;
  }

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500 pb-20">
      {/* 顶部操作区 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">审批流配置列表</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Process Governance & Flow Configuration</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsCreating(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-xl shadow-indigo-100 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            <span>新建审批流</span>
          </button>
          <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
            <span>导出配置</span>
          </button>
        </div>
      </div>

      {/* 过滤搜索栏 */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-end">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">关键词搜索 (编码/名称)</label>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="输入搜索内容..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-inner"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">流程分类</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none appearance-none cursor-pointer"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              {["全部", "采购类", "仓储类", "销售类", "人事类", "财务类"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">状态</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none appearance-none cursor-pointer"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              {["全部", "启用", "停用"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex space-x-3">
             <button className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95">执行查询</button>
             <button 
               onClick={() => {setSearchTerm(""); setCategoryFilter("全部"); setStatusFilter("全部");}}
               className="px-6 py-3 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
             >重置</button>
          </div>
        </div>
      </div>

      {/* 数据列表 */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="overflow-x-auto relative scrollbar-hide">
          <table className="min-w-[1600px] text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-[0.2em] sticky top-0 z-10 whitespace-nowrap">
              <tr>
                <th className="px-8 py-5">流程编码</th>
                <th className="px-6 py-5 min-w-[240px]">流程名称</th>
                <th className="px-6 py-5">流程分类</th>
                <th className="px-6 py-5">审批类型</th>
                <th className="px-6 py-5 min-w-[280px]">限定条件</th>
                <th className="px-6 py-5">审批层级</th>
                <th className="px-6 py-5 text-center">审批节点数</th>
                <th className="px-6 py-5">最后修改人</th>
                <th className="px-6 py-5 text-center">状态</th>
                <th className="px-8 py-5 text-right sticky right-0 bg-slate-50 border-l border-slate-100 z-20 shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((flow) => (
                <tr key={flow.flowCode} className="hover:bg-indigo-50/20 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="text-sm font-mono font-black text-indigo-600 tracking-tighter">{flow.flowCode}</span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm font-black text-slate-800 tracking-tight">{flow.flowName}</p>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-tighter border border-slate-200/50">{flow.flowCategory}</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-sm font-bold text-slate-600">{flow.approvalType}</span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-xs text-slate-500 font-medium italic truncate max-w-[240px]" title={flow.limitCondition}>
                      {flow.limitCondition}
                    </p>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xs font-black text-slate-800 uppercase">{flow.approvalLevel}</span>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 font-mono font-black text-xs border border-indigo-100">
                      {flow.approvalNodeCount}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center space-x-2">
                       <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] text-white font-black">{flow.lastModifier.charAt(0)}</div>
                       <span className="text-sm font-bold text-slate-700">{flow.lastModifier}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                       flow.status === '启用' 
                         ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-50' 
                         : 'bg-slate-100 text-slate-400 border-slate-200'
                     }`}>
                       {flow.status}
                     </span>
                  </td>
                  <td className="px-8 py-6 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 z-10 border-l border-slate-100 transition-colors shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">
                     <div className="flex justify-end space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <button className="text-[11px] font-black text-indigo-600 hover:underline uppercase tracking-widest">编辑流程</button>
                        <button className="text-[11px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-widest">查看节点</button>
                        <button className={`text-[11px] font-black uppercase tracking-widest ${flow.status === '启用' ? 'text-rose-500 hover:text-rose-700' : 'text-emerald-500 hover:text-emerald-700'}`}>
                          {flow.status === '启用' ? '停用' : '启用'}
                        </button>
                        <button className="text-[11px] font-black text-slate-400 hover:text-slate-800 uppercase tracking-widest">复制</button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页区域 */}
        <div className="px-10 py-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50">
          <div className="flex items-center space-x-12">
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">数据总量统计</span>
               <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs font-bold text-slate-600">全部: <span className="font-mono text-indigo-600">{MOCK_FLOWS.length}</span></span>
                  <span className="text-xs font-bold text-slate-600">已启用: <span className="font-mono text-emerald-600">{MOCK_FLOWS.filter(f => f.status === '启用').length}</span></span>
                  <span className="text-xs font-bold text-slate-600">已停用: <span className="font-mono text-rose-600">{MOCK_FLOWS.filter(f => f.status === '停用').length}</span></span>
               </div>
            </div>
            <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
            <div className="flex items-center space-x-3">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">每页显示:</span>
               <select className="bg-white border border-slate-200 rounded-xl px-4 py-1.5 text-xs font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer">
                 <option>20条/页</option>
                 <option>50条/页</option>
                 <option>100条/页</option>
               </select>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-300 hover:bg-white transition-all shadow-sm group">
                <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="w-10 h-10 rounded-2xl bg-indigo-600 text-white text-xs font-black shadow-xl shadow-indigo-100 transition-transform active:scale-90">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-300 hover:bg-white transition-all shadow-sm group">
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">跳转至:</span>
              <div className="relative">
                <input 
                  type="number" 
                  defaultValue={1} 
                  className="w-16 bg-white border border-slate-200 rounded-xl py-2.5 text-xs text-center font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all" 
                />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">页</span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部装饰标识 */}
      <footer className="flex justify-between items-center px-4">
         <div className="flex items-center space-x-4 opacity-30 group cursor-default">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-indigo-400 transition-colors italic">System Core Workflow Engine v3.1</span>
         </div>
      </footer>
    </div>
  );
};
