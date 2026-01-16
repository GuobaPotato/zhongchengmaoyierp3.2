
import React, { useState, useMemo } from 'react';

interface ApprovalItem {
  serialNo: number;
  approvalId: string;
  approvalType: string;
  approvalName: string;
  initiateTime: string;
  initiator: string;
  department: string;
  currentNode: string;
  approvalStatus: '待我审批' | '已驳回' | '已撤销' | '已完成';
  estimatedFinishTime: string;
  operation: string;
}

const MOCK_APPROVALS: ApprovalItem[] = [
  { serialNo: 1, approvalId: "SP2026011001", approvalType: "库存盘点审批", approvalName: "A区一号仓1月配件盘点", initiateTime: "2026-01-10 09:20", initiator: "李仓管", department: "仓储部", currentNode: "仓储经理", approvalStatus: "待我审批", estimatedFinishTime: "2026-01-12", operation: "查看/审批" },
  { serialNo: 2, approvalId: "SP2026011102", approvalType: "入库单审批", approvalName: "感应线圈采购入库", initiateTime: "2026-01-11 14:15", initiator: "张库管", department: "采购部", currentNode: "采购经理", approvalStatus: "待我审批", estimatedFinishTime: "2026-01-13", operation: "查看/审批" },
  { serialNo: 3, approvalId: "SP2026010804", approvalType: "库存盘点审批", approvalName: "电子元件仓库季度盘点", initiateTime: "2026-01-08 08:50", initiator: "王技术", department: "技术部", currentNode: "仓储经理", approvalStatus: "已驳回", estimatedFinishTime: "——", operation: "查看/重新发起" },
  { serialNo: 4, approvalId: "SP2026010705", approvalType: "入库单审批", approvalName: "医用外壳生产入库", initiateTime: "2026-01-07 16:45", initiator: "孙生产", department: "生产部", currentNode: "财务审核", approvalStatus: "待我审批", estimatedFinishTime: "2026-01-09", operation: "查看/审批" },
  { serialNo: 5, approvalId: "SP2026011206", approvalType: "合同审批", approvalName: "酒店客户年度供货协议", initiateTime: "2026-01-12 11:30", initiator: "钱销售", department: "销售部", currentNode: "法务审核", approvalStatus: "已撤销", estimatedFinishTime: "——", operation: "查看" },
  { serialNo: 6, approvalId: "SP2026011307", approvalType: "采购审批", approvalName: "硅胶密封组件批量采购", initiateTime: "2026-01-13 15:20", initiator: "赵采购", department: "采购部", currentNode: "财务经理", approvalStatus: "待我审批", estimatedFinishTime: "2026-01-15", operation: "查看/审批" },
  { serialNo: 7, approvalId: "SP2026011408", approvalType: "报价单审批", approvalName: "商场感应龙头报价申请", initiateTime: "2026-01-14 10:10", initiator: "钱销售", department: "销售部", currentNode: "销售总监", approvalStatus: "已完成", estimatedFinishTime: "2026-01-14", operation: "查看" },
];

export const MyApprovals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("全部");
  const [typeFilter, setTypeFilter] = useState("全部");

  const filteredData = useMemo(() => {
    return MOCK_APPROVALS.filter(item => {
      const matchSearch = item.approvalName.includes(searchTerm) || item.initiator.includes(searchTerm);
      const matchStatus = statusFilter === "全部" || item.approvalStatus === statusFilter;
      const matchType = typeFilter === "全部" || item.approvalType === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '待我审批': return 'bg-indigo-50 text-indigo-600 border-indigo-100 ring-4 ring-indigo-50/50';
      case '已完成': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case '已驳回': return 'bg-rose-50 text-rose-600 border-rose-100';
      case '已撤销': return 'bg-slate-100 text-slate-400 border-slate-200';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500 pb-20">
      {/* 顶部标题与全局操作 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight text-shadow-sm">我的审批</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Workflow Center & Approval Inbox</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-xl shadow-indigo-100 active:scale-95">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            <span>发起审批</span>
          </button>
          <button className="px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
            <span>批量操作</span>
          </button>
          <button className="px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
            <span>自定义列</span>
          </button>
        </div>
      </div>

      {/* 过滤搜索栏 */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-end">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">审批类型</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none appearance-none cursor-pointer"
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
            >
              <option value="全部">全部类型</option>
              {["库存盘点审批", "入库单审批", "合同审批", "采购审批", "报价单审批"].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">当前状态</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none appearance-none cursor-pointer"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="全部">全部状态</option>
              {["待我审批", "已驳回", "已撤销", "已完成"].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">时间范围</label>
            <div className="relative group">
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none appearance-none cursor-pointer">
                <option>近30天</option>
                <option>今日</option>
                <option>本周</option>
                <option>自定义...</option>
              </select>
              <svg className="absolute right-4 top-3.5 w-4 h-4 text-slate-300 pointer-events-none group-focus-within:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">关键词检索</label>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="输入审批名称/发起人"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-inner"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* 数据列表 */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="overflow-x-auto relative scrollbar-hide">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-[0.2em] sticky top-0 z-10 whitespace-nowrap">
              <tr>
                <th className="px-8 py-5 w-12 text-center">序号</th>
                <th className="px-6 py-5">审批ID</th>
                <th className="px-6 py-5">审批类型</th>
                <th className="px-6 py-5">审批名称</th>
                <th className="px-6 py-5">发起时间</th>
                <th className="px-6 py-5">发起人</th>
                <th className="px-6 py-5">所属部门</th>
                <th className="px-6 py-5">当前节点</th>
                <th className="px-6 py-5 text-center">审批状态</th>
                <th className="px-6 py-5 text-center">预计完成时间</th>
                <th className="px-8 py-5 text-right sticky right-0 bg-slate-50 border-l border-slate-100 z-20">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredData.map((item) => (
                <tr key={item.approvalId} className="hover:bg-indigo-50/20 transition-colors group">
                  <td className="px-8 py-6 text-xs text-slate-300 font-mono text-center font-bold">{item.serialNo}</td>
                  <td className="px-6 py-6">
                    <span className="text-xs font-mono font-black text-indigo-600 uppercase tracking-tighter">{item.approvalId}</span>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg border border-slate-200/50">{item.approvalType}</span>
                  </td>
                  <td className="px-6 py-6 min-w-[240px]">
                    <p className="text-sm font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{item.approvalName}</p>
                  </td>
                  <td className="px-6 py-6 text-xs font-mono font-bold text-slate-400">{item.initiateTime}</td>
                  <td className="px-6 py-6">
                    <div className="flex items-center space-x-2">
                       <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] text-white font-black uppercase">{item.initiator.charAt(0)}</div>
                       <span className="text-sm font-bold text-slate-700">{item.initiator}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.department}</td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg uppercase tracking-widest border border-indigo-100/50">{item.currentNode}</span>
                  </td>
                  <td className="px-6 py-6 text-center">
                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${getStatusStyle(item.approvalStatus)}`}>
                       {item.approvalStatus}
                     </span>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className={`text-xs font-mono font-bold ${item.estimatedFinishTime === '——' ? 'text-slate-300' : 'text-rose-500'}`}>
                      {item.estimatedFinishTime}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 transition-colors z-10 border-l border-slate-100">
                    <div className="flex justify-end space-x-4">
                       <button className="text-[11px] font-black text-indigo-600 hover:underline uppercase tracking-widest">
                         {item.operation.split('/')[0]}
                       </button>
                       {item.operation.includes('/') && (
                         <button className="text-[11px] font-black text-slate-400 hover:text-slate-800 uppercase tracking-widest">
                           {item.operation.split('/')[1]}
                         </button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页区域 */}
        <div className="px-10 py-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
          <div className="flex items-center space-x-12">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              显示 <span className="text-slate-800 text-sm font-black mx-1">{filteredData.length}</span> 项记录 / 共 7 项
            </div>
            <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
            <div className="flex items-center space-x-3 text-[10px] font-black text-slate-400 uppercase tracking-widest italic opacity-40">
               Automated Workflow Engine Sync: Normal
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-300 cursor-not-allowed">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="w-10 h-10 rounded-2xl bg-indigo-600 text-white text-xs font-black shadow-xl shadow-indigo-100">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-300 cursor-not-allowed">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
