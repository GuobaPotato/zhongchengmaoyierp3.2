
import React, { useState, useMemo } from 'react';
import { CarrierAdd } from './CarrierAdd';
import { CarrierDetail } from './CarrierDetail';
import { ICONS } from '../constants';

interface CarrierItem {
  id: string;
  carrierNo: string;
  shortName: string;
  fullName: string;
  address: string;
  phone: string;
  creator: string;
  createdAt: string;
}

const MOCK_CARRIERS: CarrierItem[] = [
  {
    id: "1",
    carrierNo: "FF-001",
    shortName: "汉王船舶",
    fullName: "汉王国际货运代理有限公司",
    address: "青岛市市北区XX路102号",
    phone: "0532-88889999",
    creator: "管理员",
    createdAt: "2026-01-10 10:00"
  },
  {
    id: "2",
    carrierNo: "FF-002",
    shortName: "顺丰国际",
    fullName: "顺丰速运国际物流有限公司",
    address: "深圳市宝安区XX大厦",
    phone: "95338",
    creator: "张采购",
    createdAt: "2026-01-11 14:30"
  },
  {
    id: "3",
    carrierNo: "FF-003",
    shortName: "马士基",
    fullName: "马士基（中国）航运有限公司",
    address: "上海市浦东新区XX中心",
    phone: "021-66554433",
    creator: "管理员",
    createdAt: "2026-01-12 09:15"
  }
];

export const CarrierManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isAdding, setIsAdding] = useState(false);
  const [viewingNo, setViewingNo] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return MOCK_CARRIERS.filter(item => 
      item.carrierNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredData.map(d => d.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  if (isAdding) {
    return <CarrierAdd onClose={() => setIsAdding(false)} />;
  }

  if (viewingNo) {
    return <CarrierDetail carrierNo={viewingNo} onClose={() => setViewingNo(null)} />;
  }

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500 pb-10">
      {/* 顶部标题栏与面包屑 */}
      <div className="flex flex-col space-y-2">
        <nav className="flex text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <span>首页</span>
          <span className="mx-2">/</span>
          <span>销售出口</span>
          <span className="mx-2">/</span>
          <span className="text-indigo-600">承运商管理</span>
        </nav>
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight flex items-center">
            承运商管理
            <span className="ml-3 px-2 py-0.5 bg-slate-100 text-slate-400 text-[10px] font-mono rounded tracking-normal">CARRIER_ARCHIVES_V1</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">维护与管理企业合作的承运商、物流公司及国际货运代理商档案</p>
        </div>
      </div>

      {/* 操作与筛选区 */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          {/* 功能按钮组 */}
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setIsAdding(true)}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center space-x-2 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              <span>新增</span>
            </button>
            <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 flex items-center space-x-2">
              <ICONS.Refresh className="w-4 h-4" />
              <span>刷新</span>
            </button>
            <button 
              disabled={selectedIds.size === 0}
              className={`px-5 py-2.5 border rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                selectedIds.size > 0 ? 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50 active:scale-95 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              批量提交
            </button>
            <button 
              disabled={selectedIds.size === 0}
              className={`px-5 py-2.5 border rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                selectedIds.size > 0 ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              批量下载
            </button>
            <div className="relative group">
              <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2">
                <span>更多</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="w-full xl:w-96 space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">搜索 (Search)</label>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="搜索承运商名称、简称或编号..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all shadow-inner"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* 数据列表 */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                <th className="px-6 py-5 w-12 text-center border-r border-slate-100">
                  <input 
                    type="checkbox" 
                    className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-4 h-4 transition-all" 
                    checked={filteredData.length > 0 && selectedIds.size === filteredData.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-5 font-mono">承运商编号</th>
                <th className="px-6 py-5">简称</th>
                <th className="px-6 py-5">全称</th>
                <th className="px-6 py-5">公司地址</th>
                <th className="px-6 py-5">联系电话</th>
                <th className="px-6 py-5">创建人</th>
                <th className="px-8 py-5 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-6 py-6 text-center border-r border-slate-100">
                    <input 
                      type="checkbox" 
                      className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 w-4 h-4" 
                      checked={selectedIds.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </td>
                  <td className="px-6 py-6">
                    <span 
                      onClick={() => setViewingNo(item.carrierNo)}
                      className="text-xs font-mono font-black text-indigo-600 cursor-pointer hover:underline underline-offset-4 decoration-2 decoration-indigo-200"
                    >
                      {item.carrierNo}
                    </span>
                  </td>
                  <td className="px-6 py-6 whitespace-nowrap">
                    <span className="text-sm font-black text-slate-800">{item.shortName}</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xs font-bold text-slate-500">{item.fullName}</span>
                  </td>
                  <td className="px-6 py-6 max-w-xs">
                    <p className="text-xs text-slate-500 truncate" title={item.address}>{item.address}</p>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xs font-mono font-black text-slate-700">{item.phone}</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center space-x-2">
                       <div className="w-5 h-5 rounded-lg bg-slate-800 flex items-center justify-center text-white text-[9px] font-black">{item.creator.charAt(0)}</div>
                       <span className="text-xs font-bold text-slate-600">{item.creator}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right whitespace-nowrap">
                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setViewingNo(item.carrierNo)} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase hover:bg-indigo-600 hover:text-white transition-all">详情</button>
                      <button className="px-3 py-1.5 bg-rose-50 text-rose-500 rounded-lg text-[10px] font-black uppercase hover:bg-rose-500 hover:text-white transition-all">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3 opacity-20">
                      <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                      <p className="text-sm font-black uppercase tracking-widest">暂无承运商数据</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 分页栏 */}
        <div className="px-10 py-6 border-t border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-8">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              总数据量 <span className="text-slate-800 text-sm font-black mx-1">{filteredData.length}</span> 条
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center space-x-2">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">每页显示:</span>
               <select className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-black text-slate-800 outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm cursor-pointer">
                 <option>20条/页</option>
                 <option>50条/页</option>
               </select>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-300 hover:bg-white transition-all shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="w-10 h-10 rounded-2xl bg-indigo-600 text-white text-xs font-black shadow-xl shadow-indigo-100">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-300 hover:bg-white transition-all shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">前往:</span>
              <input 
                type="number" 
                defaultValue={1} 
                className="w-16 bg-white border border-slate-200 rounded-xl py-2 text-xs text-center font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" 
              />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">页</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SortIcon = () => (
  <svg className="w-3 h-3 inline-block ml-1 opacity-20 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
  </svg>
);
