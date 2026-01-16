
import React, { useState } from 'react';
import { MOCK_SUPPLIERS, SupplierItem } from '../constants';
import { SupplierDetailView } from './SupplierDetailView';
import { SupplierAdd } from './SupplierAdd';

export const PurchasingSuppliers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [viewingDetailSupplier, setViewingDetailSupplier] = useState<SupplierItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleViewDetail = (supplier: SupplierItem) => {
    setViewingDetailSupplier(supplier);
  };

  if (isAdding) {
    return <SupplierAdd onClose={() => setIsAdding(false)} />;
  }

  if (viewingDetailSupplier) {
    return <SupplierDetailView supplier={viewingDetailSupplier} onClose={() => setViewingDetailSupplier(null)} />;
  }

  const filteredSuppliers = MOCK_SUPPLIERS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || s.category === categoryFilter;
    const matchesOwner = ownerFilter === '' || s.owner === ownerFilter;
    const matchesRating = ratingFilter === '' || s.rating === ratingFilter;
    const matchesDept = deptFilter === '' || s.ownerDept === deptFilter;
    return matchesSearch && matchesCategory && matchesOwner && matchesRating && matchesDept;
  });

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredSuppliers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredSuppliers.map(s => s.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">全部</h2>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setIsAdding(true)}
            className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-lg shadow-indigo-100"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            <span>添加供应商</span>
          </button>
          <button 
            disabled={selectedIds.size === 0}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center space-x-2 ${
              selectedIds.size > 0 ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100' : 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
          >
            <span>批量删除</span>
          </button>
          <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0l-4 4m4-4v12" /></svg>
            <span>导入</span>
          </button>
          <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            <span>导出</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">部门/下属</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="">选择部门或下属</option>
              <option value="仓储部">仓储部</option>
              <option value="采购部">采购部</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">供应商分类</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">全部</option>
              <option value="原材料供应商">原材料供应商</option>
              <option value="电子配件供应商">电子配件供应商</option>
              <option value="辅料供应商">辅料供应商</option>
              <option value="外协加工厂">外协加工厂</option>
              <option value="配件供应商">配件供应商</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">负责人</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value)}
            >
              <option value="">全部</option>
              <option value="赵采购">赵采购</option>
              <option value="张采购">张采购</option>
              <option value="李采购">李采购</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">供应商评级</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="">全部</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">搜索</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索供应商名称"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pl-9 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
              <th className="px-6 py-4 w-12 text-center">
                <input 
                  type="checkbox" 
                  className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" 
                  checked={filteredSuppliers.length > 0 && selectedIds.size === filteredSuppliers.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-4 text-left">供应商名称</th>
              <th className="px-4 py-4 text-left">供应商分类</th>
              <th className="px-4 py-4 text-center">合作次数</th>
              <th className="px-4 py-4 text-center">评级</th>
              <th className="px-4 py-4 text-left">联系人</th>
              <th className="px-4 py-4 text-left">手机号</th>
              <th className="px-4 py-4 text-left">固定电话</th>
              <th className="px-4 py-4 text-left">地址</th>
              <th className="px-4 py-4 text-left">负责人</th>
              <th className="px-4 py-4 text-left">创建时间</th>
              <th className="px-4 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredSuppliers.map(s => (
              <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 text-center">
                   <input 
                     type="checkbox" 
                     className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" 
                     checked={selectedIds.has(s.id)}
                     onChange={() => toggleSelect(s.id)}
                   />
                </td>
                <td className="px-4 py-4">
                  <span 
                    onClick={() => handleViewDetail(s)}
                    className="text-sm font-bold text-slate-800 hover:text-indigo-600 cursor-pointer transition-colors"
                  >
                    {s.name}
                  </span>
                  {s.notes && <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-xs">{s.notes}</p>}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{s.category}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-sm font-mono text-slate-600">{s.cooperationCount}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    s.rating === 'A' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {s.rating}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-700">{s.contact}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-500 font-mono">{s.phone}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-xs text-slate-400 font-mono">{s.landline}</span>
                </td>
                <td className="px-4 py-4 max-w-[200px]">
                  <p className="text-xs text-slate-500 truncate">{s.address}</p>
                </td>
                <td className="px-4 py-4">
                   <div className="flex flex-col">
                     <span className="text-xs font-bold text-slate-700">{s.owner}</span>
                     <span className="text-[10px] text-slate-400 uppercase">{s.ownerDept}</span>
                   </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-[10px] text-slate-400">{s.createdAt}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredSuppliers.length === 0 && (
              <tr>
                <td colSpan={12} className="px-6 py-12 text-center text-slate-400 text-sm italic">
                  暂无匹配的供应商数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-slate-500">
          共 <span className="font-bold text-slate-800">{filteredSuppliers.length}</span> 条记录
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">每页显示</span>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-indigo-500">
              <option>20条</option>
              <option>50条</option>
              <option>100条</option>
            </select>
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-2 rounded-lg border border-slate-100 text-slate-300 hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-100">1</button>
            <button className="p-2 rounded-lg border border-slate-100 text-slate-300 hover:bg-slate-50 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">跳转至</span>
            <input type="number" className="w-12 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-center outline-none focus:ring-1 focus:ring-indigo-500" defaultValue={1} />
            <span className="text-xs text-slate-400">页</span>
          </div>
        </div>
      </div>
    </div>
  );
};
