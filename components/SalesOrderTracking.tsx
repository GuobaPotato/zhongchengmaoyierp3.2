
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { OrderTrackingDetail } from './OrderTrackingDetail';

interface TrackingItem {
  id: string;
  itemName: string;
  contractQty: string;
  plannedQty: string;
  shippedQty: string;
  contractNo: string;
  shippingNo: string;
  customerName: string;
  deliveryDate: string;
  loadingPort: string;
  destPort: string;
  shippingMethod: string;
}

const MOCK_TRACKING_DATA: TrackingItem[] = [
  {
    id: "1",
    itemName: "红外传感器",
    contractQty: "1,000",
    plannedQty: "500",
    shippedQty: "500",
    contractNo: "123456",
    shippingNo: "BL-001",
    customerName: "泰华贸易",
    deliveryDate: "2026-01-25",
    loadingPort: "青岛港",
    destPort: "曼谷港",
    shippingMethod: "Sea"
  }
];

export const SalesOrderTracking: React.FC = () => {
  const [viewingOrderNo, setViewingOrderNo] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    contract: '',
    customer: '',
    dateStart: '',
    dateEnd: '',
    destPort: '',
    productNo: '',
    itemName: ''
  });

  const handleReset = () => {
    setFilters({
      contract: '',
      customer: '',
      dateStart: '',
      dateEnd: '',
      destPort: '',
      productNo: '',
      itemName: ''
    });
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500">
      {/* 详情弹窗 */}
      {viewingOrderNo && (
        <OrderTrackingDetail 
          orderNo={viewingOrderNo} 
          onClose={() => setViewingOrderNo(null)} 
        />
      )}

      {/* 顶部操作区 */}
      <div className="flex justify-end items-center space-x-3">
        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2">
          <ICONS.Refresh className="w-4 h-4" />
          <span>刷新</span>
        </button>
        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
          批量提交
        </button>
        <div className="relative group">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2">
            <span>更多</span>
            <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 筛选查询区 */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-9 gap-4 items-end">
          <FilterInput 
            label="外销合同" 
            placeholder="输入合同..." 
            value={filters.contract} 
            onChange={v => setFilters({...filters, contract: v})} 
          />
          <FilterInput 
            label="客户名称" 
            placeholder="输入客户..." 
            value={filters.customer} 
            onChange={v => setFilters({...filters, customer: v})} 
          />
          <FilterDate 
            label="交货日期起" 
            value={filters.dateStart} 
            onChange={v => setFilters({...filters, dateStart: v})} 
          />
          <FilterDate 
            label="交货日期终" 
            value={filters.dateEnd} 
            onChange={v => setFilters({...filters, dateEnd: v})} 
          />
          <FilterInput 
            label="目的港" 
            placeholder="港口名称..." 
            value={filters.destPort} 
            onChange={v => setFilters({...filters, destPort: v})} 
          />
          <FilterInput 
            label="商品编号" 
            placeholder="编号..." 
            value={filters.productNo} 
            onChange={v => setFilters({...filters, productNo: v})} 
          />
          <FilterInput 
            label="中文货名" 
            placeholder="货名..." 
            value={filters.itemName} 
            onChange={v => setFilters({...filters, itemName: v})} 
          />
          
          <div className="lg:col-span-2 flex space-x-2">
            <button className="flex-1 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95">
              查找
            </button>
            <button 
              onClick={handleReset}
              className="px-6 py-2.5 bg-slate-100 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              重置
            </button>
          </div>
        </div>
      </div>

      {/* 数据表格区 */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-5">中文货名</th>
                <th className="px-4 py-5 text-right">合同数量</th>
                <th className="px-4 py-5 text-right">计划数量</th>
                <th className="px-4 py-5 text-right">出运数量</th>
                <th className="px-4 py-5">外销合同</th>
                <th className="px-4 py-5">国际货运单号</th>
                <th className="px-4 py-5">客户名称</th>
                <th className="px-4 py-5">交货日期</th>
                <th className="px-4 py-5">起运港</th>
                <th className="px-4 py-5">目的港</th>
                <th className="px-8 py-5 text-right">运输方式</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_TRACKING_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-6 text-sm font-black text-rose-500">
                    {item.itemName}
                  </td>
                  <td className="px-4 py-6 text-right font-mono font-bold text-slate-900">
                    {item.contractQty}
                  </td>
                  <td className="px-4 py-6 text-right font-mono font-black text-indigo-600">
                    {item.plannedQty}
                  </td>
                  <td className="px-4 py-6 text-right font-mono font-black text-emerald-600">
                    {item.shippedQty}
                  </td>
                  <td className="px-4 py-6">
                    <button className="text-sm font-bold text-indigo-600 hover:underline underline-offset-4 decoration-2">
                      {item.contractNo}
                    </button>
                  </td>
                  <td className="px-4 py-6 text-sm font-mono font-black text-slate-800">
                    <span 
                      onClick={() => setViewingOrderNo(item.shippingNo)}
                      className="cursor-pointer hover:text-indigo-600 transition-colors underline decoration-indigo-200 underline-offset-4"
                    >
                      {item.shippingNo}
                    </span>
                  </td>
                  <td className="px-4 py-6 text-sm font-bold text-slate-700">
                    {item.customerName}
                  </td>
                  <td className="px-4 py-6 text-xs font-mono text-slate-500 font-bold">
                    {item.deliveryDate}
                  </td>
                  <td className="px-4 py-6 text-sm text-slate-600">
                    {item.loadingPort}
                  </td>
                  <td className="px-4 py-6 text-sm text-slate-600">
                    {item.destPort}
                  </td>
                  <td className="px-8 py-6 text-right whitespace-nowrap">
                    <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">
                      {item.shippingMethod}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 分页控制区 */}
        <div className="px-10 py-6 border-t border-slate-100 bg-slate-50/30 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              数据统计 <span className="text-slate-800 text-sm mx-1">共 1 条</span>
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center space-x-2">
               <select className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer">
                 <option>20条/页</option>
                 <option>50条/页</option>
               </select>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-200 cursor-not-allowed transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="w-10 h-10 rounded-2xl bg-indigo-600 text-white text-xs font-black shadow-xl shadow-indigo-100">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-200 cursor-not-allowed transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">前往</span>
              <div className="relative">
                <input 
                  type="number" 
                  placeholder="输入页码"
                  className="w-20 bg-white border border-slate-200 rounded-xl py-2 text-xs text-center font-black text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" 
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

const FilterInput: React.FC<{ label: string; placeholder: string; value: string; onChange: (v: string) => void }> = ({ label, placeholder, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type="text" 
      placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

const FilterDate: React.FC<{ label: string; value: string; onChange: (v: string) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <input 
        type="date" 
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 pl-10 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <svg className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  </div>
);
