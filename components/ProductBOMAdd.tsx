
import React, { useState } from 'react';

interface ProductBOMAddProps {
  onClose?: () => void;
}

export const ProductBOMAdd: React.FC<ProductBOMAddProps> = ({ onClose }) => {
  const [mainInfo] = useState({
    name: "智能水龙头A006",
    code: "A006",
    attr: "组装",
    type: "智能水龙头",
    specs: "BH-GR161500",
    method: "组装",
    unit: "套",
    bomCode: "BOM-ZC-2026-001"
  });

  const [processes] = useState([
    { seq: "1", name: "焊接", code: "GX001", unitQty: "1.00", team: "A组", leader: "王", members: "6", inspector: "刘" },
    { seq: "2", name: "组装", code: "GX003", unitQty: "1.00", team: "C组", leader: "王", members: "5", inspector: "刘" }
  ]);

  const [bomDetails, setBomDetails] = useState([
    { id: "1", name: "电路主板", code: "B007", attr: "主料", specs: "4140", usage: "500.00", unit: "件", method: "采购", procName: "焊接", procCode: "GX001" },
    { id: "2", name: "组装外壳", code: "C008", attr: "辅料", specs: "7050", usage: "500.00", unit: "件", method: "采购", procName: "组装", procCode: "GX002" }
  ]);

  const specs = {
    diameter: "16.0",
    length: "15.00",
    coating: "0.254",
    weight: "17.500"
  };

  const handleAddRow = () => {
    setBomDetails([...bomDetails, { id: Date.now().toString(), name: "", code: "", attr: "辅料", specs: "", usage: "0.00", unit: "件", method: "采购", procName: "", procCode: "" }]);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right-10 duration-500 overflow-hidden">
      {/* 顶部标题及全局操作 */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-50 shrink-0 shadow-sm">
        <div className="flex items-center space-x-5">
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">新增 BOM 清单</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Define Product Bill of Materials</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50">保存草稿</button>
          <button onClick={onClose} className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-95 transition-all">提交并审核</button>
        </div>
      </header>

      {/* 主滚动区域 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto p-8 space-y-8">
          
          {/* 1. 主产品信息 */}
          <section className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 opacity-[0.05] rounded-full -mr-32 -mt-32 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col space-y-8">
               <div className="flex justify-between items-center border-b border-white/10 pb-6">
                  <div className="flex items-center space-x-3">
                     <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                     <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400">主产品核心信息 (Master Product)</h3>
                  </div>
                  <button className="px-5 py-2 bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/5 flex items-center space-x-2">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    <span>重新选择产品</span>
                  </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-12">
                  <InfoItem label="产品名称" value={mainInfo.name} isBold />
                  <InfoItem label="产品编码" value={mainInfo.code} isMono />
                  <InfoItem label="产品属性" value={mainInfo.attr} isBadge />
                  <InfoItem label="产品类型" value={mainInfo.type} />
                  <InfoItem label="规格型号" value={mainInfo.specs} isItalic />
                  <InfoItem label="获取方式" value={mainInfo.method} />
                  <InfoItem label="生产单位" value={mainInfo.unit} color="text-emerald-400" />
                  <InfoItem label="BOM 编码" value="自动生成无需填写" isMono isGhost />
               </div>
            </div>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* 2. 工序明细 (左侧) */}
            <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                 <div className="w-1.5 h-5 bg-slate-400 rounded-full"></div>
                 <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">工序明细 (Processes)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/80 font-black text-[9px] text-slate-400 uppercase tracking-widest">
                    <tr className="border-b border-slate-100 whitespace-nowrap">
                      <th className="px-6 py-4 text-center">序</th>
                      <th className="px-4 py-4">工序名称</th>
                      <th className="px-4 py-4">编码</th>
                      <th className="px-4 py-4 text-center">班组</th>
                      <th className="px-6 py-4 text-center">质检</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {processes.map(proc => (
                      <tr key={proc.seq} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-6 py-4 text-center text-xs font-mono font-bold text-slate-300">{proc.seq}</td>
                        <td className="px-4 py-4 text-xs font-bold text-slate-700">{proc.name}</td>
                        <td className="px-4 py-4 text-xs font-mono text-slate-400 tracking-tighter">{proc.code}</td>
                        <td className="px-4 py-4 text-center">
                           <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">{proc.team}</span>
                        </td>
                        <td className="px-6 py-4 text-center text-xs font-bold text-slate-600">{proc.inspector}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">20 条/页 共 {processes.length} 条</span>
              </div>
            </section>

            {/* 3. 产品 BOM 明细 (右侧) */}
            <section className="xl:col-span-2 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-8 py-5 border-b border-slate-50 bg-indigo-50/30 flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-5 bg-indigo-600 rounded-full"></div>
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">产品 BOM 明细 (Materials Breakdown)</h3>
                 </div>
                 <div className="flex items-center space-x-3">
                    <button className="px-4 py-1.5 bg-white border border-slate-200 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-sm">快速填报</button>
                    <button onClick={handleAddRow} className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-sm flex items-center space-x-2">
                       <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                       <span>添加物料</span>
                    </button>
                 </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead className="bg-slate-50/80 font-black text-[9px] text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-4 w-12 text-center">序号</th>
                      <th className="px-4 py-4">物料选择</th>
                      <th className="px-4 py-4">物料名称</th>
                      <th className="px-4 py-4">属性</th>
                      <th className="px-4 py-4 text-right">*标准用量</th>
                      <th className="px-4 py-4 text-center">单位</th>
                      <th className="px-4 py-4">获取方式</th>
                      <th className="px-4 py-4">对应工序</th>
                      <th className="px-8 py-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bomDetails.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-indigo-50/10 transition-colors group">
                        <td className="px-8 py-5 text-center text-xs font-mono text-slate-300">{idx + 1}</td>
                        <td className="px-4 py-5">
                           <div className="relative group/select">
                             <select className="bg-slate-100 border border-transparent rounded-lg px-2 py-1 text-[10px] font-black text-slate-600 outline-none cursor-pointer group-hover/select:border-indigo-200">
                                <option>下拉选择项</option>
                                <option>匹配物料库...</option>
                             </select>
                           </div>
                        </td>
                        <td className="px-4 py-5">
                           <div className="flex flex-col">
                              <span className="text-xs font-black text-slate-800">{item.name || "未指定"}</span>
                              <span className="text-[10px] font-mono text-slate-400 tracking-tight">{item.code || "--"}</span>
                           </div>
                        </td>
                        <td className="px-4 py-5">
                           <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                             item.attr === '主料' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'
                           }`}>{item.attr}</span>
                        </td>
                        <td className="px-4 py-5 text-right">
                           <input 
                             type="text" 
                             defaultValue={item.usage} 
                             className="w-20 bg-indigo-50/50 border border-indigo-100 rounded-lg px-2 py-1 text-right text-xs font-mono font-black text-indigo-700 focus:ring-2 focus:ring-indigo-200 outline-none"
                           />
                        </td>
                        <td className="px-4 py-5 text-center">
                           <span className="text-[10px] font-black text-slate-400 uppercase">{item.unit}</span>
                        </td>
                        <td className="px-4 py-5">
                           <span className="text-[10px] font-bold text-slate-600">{item.method}</span>
                        </td>
                        <td className="px-4 py-5">
                           <div className="flex flex-col">
                              <span className="text-xs font-bold text-indigo-600">{item.procName || "--"}</span>
                              <span className="text-[9px] font-mono text-slate-400">{item.procCode || "--"}</span>
                           </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <button onClick={() => setBomDetails(bomDetails.filter(b => b.id !== item.id))} className="text-slate-300 hover:text-rose-500 transition-colors p-2">
                             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* 4. 规格参数 */}
          <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
             <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/30 flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-slate-800 rounded-full"></div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">规格参数 (Technical Specifications)</h3>
             </div>
             <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <SpecItem label="直径/mm" value={specs.diameter} />
                <SpecItem label="长度规格/m" value={specs.length} />
                <SpecItem label="镀层厚度/mm" value={specs.coating} />
                <SpecItem label="重量/kg" value={specs.weight} />
             </div>
          </section>

        </div>
      </div>
      
      {/* 底部操作暗示区 */}
      <footer className="bg-white border-t border-slate-100 px-10 py-5 flex justify-end items-center space-x-4 shrink-0 shadow-inner z-50">
         <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mr-8 italic">Sensor ERP v3.1 BOM Configurator</p>
         <button onClick={onClose} className="px-10 py-3 bg-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all">Discard / 取消</button>
      </footer>
    </div>
  );
};

/* --- 辅助子组件 --- */

const InfoItem: React.FC<{ label: string; value: string; isBold?: boolean; isMono?: boolean; isBadge?: boolean; isGhost?: boolean; isItalic?: boolean; color?: string }> = ({ label, value, isBold, isMono, isBadge, isGhost, isItalic, color }) => (
  <div className="space-y-1.5 min-w-0">
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] truncate">{label}</p>
    <div className="flex items-center min-w-0">
      {isBadge ? (
        <span className="px-2.5 py-0.5 bg-indigo-500 text-white rounded text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-indigo-500/20">{value}</span>
      ) : isGhost ? (
        <span className="text-sm font-black text-white/20 italic tracking-tight uppercase select-none">{value}</span>
      ) : (
        <span className={`text-sm truncate ${color || 'text-white'} ${isBold ? 'font-black' : 'font-bold'} ${isMono ? 'font-mono' : ''} ${isItalic ? 'italic text-slate-300' : ''}`}>
          {value}
        </span>
      )}
    </div>
  </div>
);

const SpecItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="space-y-3 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all group">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">{label}</label>
    <div className="flex items-center space-x-2">
       <input 
         type="text" 
         defaultValue={value} 
         className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-lg font-mono font-black text-slate-800 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all shadow-sm"
       />
    </div>
  </div>
);
