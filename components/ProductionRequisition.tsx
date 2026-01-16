
import React, { useState, useMemo } from 'react';
import { WorkOrderSelectorModal } from './WorkOrderSelectorModal';

interface RequisitionItem {
  id: string;
  name: string;
  batchNo: string;
  currentQty: number;
  prodUnit: string;
  availableStock: number;
  storageQty: string;
  storageUnit: string;
  location: string;
}

export const ProductionRequisition: React.FC = () => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState<string | null>(null);
  const [outboundTime, setOutboundTime] = useState("");
  const [outboundClerk, setOutboundClerk] = useState("");

  const [formData, setFormData] = useState({
    workOrderNo: "",
    workOrderName: "暂无内容",
    planName: "暂无内容",
    leader: "暂无内容",
    team: "暂无内容",
    batchNo: "暂无内容",
    requester: "暂无内容",
    requisitionNo: "暂无内容"
  });

  const [items, setItems] = useState<RequisitionItem[]>([
    {
      id: "1",
      name: "暂无内容",
      batchNo: "暂无内容",
      currentQty: 0,
      prodUnit: "暂无内容",
      availableStock: 0,
      storageQty: "暂无内容",
      storageUnit: "暂无内容",
      location: ""
    }
  ]);

  const handleWorkOrderSelect = (order: any) => {
    setFormData({
      workOrderNo: order.productionWorkOrderNo,
      workOrderName: order.productionWorkOrderName,
      planName: order.productionPlanName,
      leader: order.teamLeader,
      team: order.productionTeam,
      batchNo: order.finishedProductBatchNo,
      requester: "李销售 (模拟)", // 实际应为当前登录人或关联人
      requisitionNo: `LL-${Date.now().toString().slice(-8)}`
    });

    // 填充明细（通常根据BOM，这里模拟填充）
    const demoItems = order.processDetails.map((proc: any, idx: number) => ({
      id: (idx + 1).toString(),
      name: proc.productName,
      batchNo: `LOT-${proc.productCode}-${Date.now().toString().slice(-4)}`,
      currentQty: 0,
      prodUnit: proc.unit,
      availableStock: 5000,
      storageQty: "0",
      storageUnit: "t",
      location: ""
    }));
    setItems(demoItems);
    setIsSelectorOpen(false);
  };

  const totalQty = useMemo(() => items.reduce((acc, curr) => acc + (curr.currentQty || 0), 0), [items]);

  const canSubmit = formData.workOrderNo !== "" && isConfirmed === "确认" && outboundTime !== "" && outboundClerk !== "";

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <nav className="flex text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span>生产管理</span>
          <span className="mx-2">/</span>
          <span className="text-indigo-600">生产领料</span>
        </nav>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">生产工单信息</h1>
      </div>

      {/* 1. Production Work Order Info Section */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">一、生产工单基本信息</h3>
        </div>
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <FormItem label="选择生产工单" required>
              <div 
                className="relative group cursor-pointer"
                onClick={() => setIsSelectorOpen(true)}
              >
                <input 
                  type="text" 
                  readOnly
                  placeholder="选择数据"
                  className="w-full bg-slate-50 border border-indigo-100 rounded-xl px-4 py-2.5 text-sm font-bold text-indigo-700 outline-none focus:ring-4 focus:ring-indigo-50 cursor-pointer transition-all"
                  value={formData.workOrderNo}
                />
                <div className="absolute right-3 top-2.5 text-indigo-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
                </div>
              </div>
           </FormItem>
           <FormItem label="生产工单名称">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-medium" value={formData.workOrderName} />
           </FormItem>
           <FormItem label="生产计划名称">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-medium" value={formData.planName} />
           </FormItem>
           <FormItem label="班组长">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-medium" value={formData.leader} />
           </FormItem>
           <FormItem label="生产班组">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-medium" value={formData.team} />
           </FormItem>
           <FormItem label="产成品批次号">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm font-mono text-slate-400" value={formData.batchNo} />
           </FormItem>
           <FormItem label="领料人">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-medium" value={formData.requester} />
           </FormItem>
           <FormItem label="领料出库单编号" tips="自动生成无需填写">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm font-mono text-slate-400 italic" value={formData.requisitionNo} />
           </FormItem>
        </div>
      </section>

      {/* 2. Outbound Product Detail Section */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">二、出库产品明细</h3>
          </div>
          <div className="flex space-x-3">
             <button className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100">+ 添加</button>
             <button className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100">快速填报</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                <th className="px-8 py-4 w-12 text-center">行号</th>
                <th className="px-4 py-4">生产产品名称</th>
                <th className="px-4 py-4 font-mono">产品批次号</th>
                <th className="px-6 py-4 bg-indigo-50/50 text-indigo-700">*本次出库数量</th>
                <th className="px-4 py-4 text-center">生产单位</th>
                <th className="px-4 py-4 text-right">当前可用库存数量/t</th>
                <th className="px-4 py-4 text-right">本次出库数量(仓储单位)</th>
                <th className="px-4 py-4 text-center">仓储单位</th>
                <th className="px-8 py-4">出库仓位</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5 text-xs text-slate-300 font-mono text-center">{idx + 1}</td>
                  <td className="px-4 py-5">
                    <span className="text-sm font-bold text-slate-700">{item.name}</span>
                  </td>
                  <td className="px-4 py-5 text-xs font-mono text-slate-400">{item.batchNo}</td>
                  <td className="px-6 py-5 bg-indigo-50/20">
                     <input 
                       type="number" 
                       placeholder="请输入本次出库数量"
                       className="w-32 bg-white border border-indigo-100 rounded-lg px-3 py-1.5 text-right text-sm font-black text-indigo-700 focus:ring-4 focus:ring-indigo-200/50 outline-none shadow-sm transition-all"
                       value={item.currentQty || ""}
                       onChange={e => {
                         const next = [...items];
                         next[idx].currentQty = parseFloat(e.target.value) || 0;
                         // 模拟换算
                         next[idx].storageQty = (next[idx].currentQty * 0.001).toFixed(4);
                         setItems(next);
                       }}
                     />
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{item.prodUnit}</span>
                  </td>
                  <td className="px-4 py-5 text-right font-mono font-bold text-slate-400">{item.availableStock}</td>
                  <td className="px-4 py-5 text-right font-mono font-bold text-slate-700">{item.storageQty}</td>
                  <td className="px-4 py-5 text-center text-xs font-black text-slate-400 uppercase">{item.storageUnit}</td>
                  <td className="px-8 py-5">
                    <select 
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100"
                      value={item.location}
                      onChange={e => {
                        const next = [...items];
                        next[idx].location = e.target.value;
                        setItems(next);
                      }}
                    >
                      <option value="">请选择出库仓位</option>
                      <option value="A01">原料仓 A01</option>
                      <option value="B02">原料仓 B02</option>
                      <option value="C03">半成品仓 C03</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex justify-end items-center space-x-4">
           <span className="text-xs font-black text-slate-400 uppercase tracking-widest">出库产品总数量:</span>
           <span className="text-2xl font-black font-mono text-indigo-600">{totalQty > 0 ? totalQty : "暂无内容"}</span>
        </div>
      </section>

      {/* 3. Outbound Confirmation Section */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">三、出库确认</h3>
        </div>
        <div className="p-10 space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FormItem label="领料出库确认" required>
                 <div className="flex space-x-6 py-2">
                    {["确认", "取消"].map(opt => (
                      <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isConfirmed === opt ? 'border-indigo-600 bg-indigo-600' : 'border-slate-200 group-hover:border-indigo-400'}`}>
                           {isConfirmed === opt && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                        </div>
                        <input type="radio" className="hidden" name="conf" checked={isConfirmed === opt} onChange={() => setIsConfirmed(opt)} />
                        <span className={`text-xs font-black ${isConfirmed === opt ? 'text-indigo-600' : 'text-slate-400'}`}>{opt}</span>
                      </label>
                    ))}
                 </div>
              </FormItem>
              <FormItem label="领料出库时间" required>
                 <input 
                   type="datetime-local" 
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                   value={outboundTime}
                   onChange={e => setOutboundTime(e.target.value)}
                 />
              </FormItem>
              <FormItem label="出库员" required>
                 <button 
                   onClick={() => setOutboundClerk("张仓库 (M002)")}
                   className={`w-full flex items-center justify-between px-4 py-2.5 border rounded-xl text-sm transition-all group ${
                     outboundClerk 
                       ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-black' 
                       : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-indigo-300 font-bold'
                   }`}
                 >
                   <span className="truncate">{outboundClerk || "请选择出库员"}</span>
                   <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                 </button>
              </FormItem>
           </div>

           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center">
                出库凭证拍照 <span className="text-rose-500 ml-1.5 font-black">*</span>
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 p-12 flex flex-col items-center justify-center space-y-4 hover:bg-indigo-50/30 hover:border-indigo-200 transition-all cursor-pointer group">
                 <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-slate-300 group-hover:text-indigo-500 transition-all group-hover:scale-110">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 </div>
                 <div className="text-center">
                    <p className="text-sm font-bold text-slate-500">选择/拖拽或单击后粘贴图片</p>
                    <p className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter mt-1">jpg/png/jpeg • 单张50M以内</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer Sticky Actions */}
      <footer className="fixed bottom-0 right-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 py-6 px-10 flex justify-end items-center z-[60] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         <button 
           disabled={!canSubmit}
           className={`px-16 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
             canSubmit 
               ? 'bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-700' 
               : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
           }`}
         >
           提交
         </button>
      </footer>

      {/* Work Order Selector */}
      {isSelectorOpen && (
        <WorkOrderSelectorModal 
          onSelect={handleWorkOrderSelect}
          onClose={() => setIsSelectorOpen(false)}
        />
      )}
    </div>
  );
};

/* --- Internal Form Components --- */

const FormItem: React.FC<{ label: string; required?: boolean; tips?: string; children: React.ReactNode }> = ({ label, required, tips, children }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center px-1">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center">
        {label}
        {required && <span className="text-rose-500 ml-1.5 font-black">*</span>}
      </label>
      {tips && <span className="text-[9px] text-slate-300 italic font-bold uppercase">{tips}</span>}
    </div>
    {children}
  </div>
);
