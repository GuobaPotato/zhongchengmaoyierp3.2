
import React, { useState } from 'react';
import { WarehouseLocationAdd } from './WarehouseLocationAdd';

interface LocationItem {
  locationCode: string;
  locationStatus: string;
  statusColor: string;
  materialNames: string[];
}

interface ZoneItem {
  zoneName: string;
  zoneDesc: string;
  zoneColor: string;
  locationList: LocationItem[];
}

const MOCK_ZONES: ZoneItem[] = [
  {
    zoneName: "来料区",
    zoneDesc: "存放待入库检验的原材料、零部件",
    zoneColor: "#E8F4FD", // Light blue
    locationList: [
      { locationCode: "A01", locationStatus: "normal", statusColor: "#4CAF50", materialNames: ["红外感应器", "塑料外壳"] },
      { locationCode: "A02", locationStatus: "normal", statusColor: "#4CAF50", materialNames: ["线圈"] },
      { locationCode: "A03", locationStatus: "normal", statusColor: "#4CAF50", materialNames: ["暂无产品"] },
      { locationCode: "A04", locationStatus: "normal", statusColor: "#4CAF50", materialNames: ["红外感应器", "线圈", "塑料外壳"] }
    ]
  },
  {
    zoneName: "成品区",
    zoneDesc: "存放检验合格的成品传感器，待外销出库",
    zoneColor: "#F0F9F0", // Light green
    locationList: [
      { locationCode: "B01", locationStatus: "normal", statusColor: "#4CAF50", materialNames: ["红外感应器（成品）"] },
      { locationCode: "B02", locationStatus: "normal", statusColor: "#4CAF50", materialNames: ["暂无产品"] },
      { locationCode: "B03", locationStatus: "normal", statusColor: "#4CAF50", materialNames: ["红外感应器（成品）", "塑料外壳（成品）"] }
    ]
  },
  {
    zoneName: "待检区",
    zoneDesc: "存放待质量检验的半成品/成品，禁止直接出库",
    zoneColor: "#FFF8E1", // Light amber
    locationList: [
      { locationCode: "C01", locationStatus: "normal", statusColor: "#4CAF50", materialNames: ["红外感应器（半成品）"] },
      { locationCode: "C02", locationStatus: "normal", statusColor: "#4CAF50", materialNames: ["线圈（半成品）", "塑料外壳（半成品）"] },
      { locationCode: "C03", locationStatus: "normal", statusColor: "#4CAF50", materialNames: ["暂无产品"] }
    ]
  }
];

export const WarehouseLocationManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  if (isAdding) {
    return <WarehouseLocationAdd onClose={() => setIsAdding(false)} />;
  }

  const filteredZones = MOCK_ZONES.map(zone => ({
    ...zone,
    locationList: zone.locationList.filter(loc => 
      loc.locationCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.materialNames.some(m => m.includes(searchTerm))
    )
  })).filter(zone => zone.locationList.length > 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">库位管理</h2>
          <p className="text-sm text-slate-500 font-medium tracking-tight">单仓库库位监控与管理（来料区/成品区/待检区）</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">刷新库位数据</button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">批量更新库存</button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">导出库位报表</button>
          <button 
            onClick={() => setIsAdding(true)}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            新增库位
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="max-w-md space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">快速查询</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="输入库位编号/物料名称查询"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <svg className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
          </div>
        </div>
      </div>

      {/* Zone Map Container */}
      <div className="space-y-12">
        {filteredZones.map((zone, zoneIdx) => (
          <section key={zoneIdx} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${zoneIdx * 100}ms` }}>
            {/* Zone Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between px-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                   <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: zone.zoneColor === '#E8F4FD' ? '#3B82F6' : zone.zoneColor === '#F0F9F0' ? '#10B981' : '#F59E0B' }}></div>
                   <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest">{zone.zoneName}</h3>
                </div>
                <p className="text-xs text-slate-400 font-medium">{zone.zoneDesc}</p>
              </div>
              <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100 bg-white text-slate-500">
                Total Locations: {zone.locationList.length}
              </div>
            </div>

            {/* Location Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {zone.locationList.map((loc, locIdx) => (
                <div 
                  key={locIdx} 
                  className="bg-white rounded-[2rem] border border-slate-200 p-6 flex flex-col space-y-5 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all group overflow-hidden relative"
                  style={{ borderTop: `6px solid ${zone.zoneColor}` }}
                >
                  {/* Card Background Accent */}
                  <div className="absolute top-0 right-0 p-8 -mr-10 -mt-10 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative flex justify-between items-start">
                    <div className="space-y-0.5">
                      <span className="text-2xl font-black text-slate-800 font-mono tracking-tighter">{loc.locationCode}</span>
                      <div className="flex items-center space-x-1.5">
                         <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: loc.statusColor }}></div>
                         <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">{loc.locationStatus}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex-1 min-h-[80px]">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">包含物料 (Materials)</p>
                    <div className="flex flex-wrap gap-2">
                       {loc.materialNames.map((mat, mIdx) => (
                         <span 
                           key={mIdx} 
                           className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-tight border ${
                             mat === '暂无产品' 
                               ? 'bg-slate-50 text-slate-300 border-slate-100 italic' 
                               : 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-sm'
                           }`}
                         >
                           {mat}
                         </span>
                       ))}
                    </div>
                  </div>

                  <div className="relative pt-4 border-t border-slate-50 flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-indigo-600 transition-colors">编辑</button>
                    <button className="px-4 py-1.5 bg-rose-50 text-rose-500 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-rose-500 hover:text-white transition-colors border border-rose-100">删除</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {filteredZones.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center space-y-6 text-center">
             <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300">
               <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
             </div>
             <div className="space-y-1">
               <h4 className="text-xl font-black text-slate-800 tracking-tight">未找到符合条件的库位</h4>
               <p className="text-sm text-slate-400 font-medium">请尝试调整搜索关键词或重置过滤器</p>
             </div>
             <button 
              onClick={() => setSearchTerm("")}
              className="px-8 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 shadow-sm active:scale-95 transition-all"
             >
               重置查询
             </button>
          </div>
        )}
      </div>
    </div>
  );
};
