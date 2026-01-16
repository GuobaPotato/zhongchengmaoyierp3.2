
import React, { useState, useMemo } from 'react';
import { RequisitionSelectorModal } from './RequisitionSelectorModal';

interface ReturnItem {
  id: string;
  prodName: string;
  prodCode: string;
  materialName: string;
  materialCode: string;
  spec: string;
  batchNo: string;
  currentQty: number;
  prodUnit: string;
  storageQty: string;
  storageUnit: string;
  location: string;
}

export const ProductionMaterialReturn: React.FC = () => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [formData, setFormData] = useState({
    requisitionNo: "",
    workOrderName: "",
    planName: "",
    requisitionOrderNo: "",
    team: "",
    leader: "",
    returner: "",
    returnEntryNo: "RK-RET-" + Date.now().toString().slice(-6),
    inboundLocation: "",
    returnReason: "剩料",
    isConfirmed: false,
    entryTime: "",
    clerk: ""
  });

  const [items, setItems] = useState<ReturnItem[]>([]);

  const handleRequisitionSelect = (req: any) => {
    setFormData({
      ...formData,
      requisitionNo: req.orderNo,
      workOrderName: req.workOrderName,
      planName: req.planName,
      requisitionOrderNo: req.orderNo,
      team: req.team,
      leader: req.leader,
      returner: req.requester
    });

    const mappedItems = req.items.map((item: any, idx: number) => ({
      id: (idx + 1).toString(),
      prodName: req.workOrderName,
      prodCode: "P-CODE-" + idx,
      materialName: item.name,
      materialCode: item.code,
      spec: "Standard",
      batchNo: item.batch,
      currentQty: 0,
      prodUnit: item.unit,
      storageQty: "0",
      storageUnit: "t",
      location: ""
    }));
    setItems(mappedItems);
    setIsSelectorOpen(false);
  };

  const totalReturnQty = useMemo(() => items.reduce((acc, curr) => acc + (parseFloat(curr.storageQty) || 0), 0), [items]);

  const canSubmit = formData.requisitionNo !== "" && formData.isConfirmed && formData.entryTime !== "" && formData.inboundLocation !== "";

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <nav className="flex text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span>生产管理</span>
          <span className="mx-2">/</span>
          <span className="text-indigo-600">生产退料</span>
        </nav>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">生产退料</h1>
      </div>

      {/* 1. 生产领料单信息 */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">一、生产领料单信息</h3>
        </div>
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <FormItem label="*选择生产领料单">
              <div 
                className="relative group cursor-pointer"
                onClick={() => setIsSelectorOpen(true)}
              >
                <input 
                  type="text" 
                  readOnly
                  placeholder="选择数据"
                  className="w-full bg-slate-50 border border-indigo-100 rounded-xl px-4 py-2.5 text-sm font-bold text-indigo-700 outline-none focus:ring-4 focus:ring-indigo-50 cursor-pointer transition-all"
                  value={formData.requisitionNo}
                />
                <div className="absolute right-3 top-2.5 text-indigo-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
                </div>
              </div>
           </FormItem>
           <FormItem label="生产工单名称">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-medium italic" value={formData.workOrderName || "暂无内容"} />
           </FormItem>
           <FormItem label="生产计划名称">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-medium italic" value={formData.planName || "暂无内容"} />
           </FormItem>
           <FormItem label="领料出库单编号">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-mono italic" value={formData.requisitionOrderNo || "暂无内容"} />
           </FormItem>
           <FormItem label="生产班组">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-medium italic" value={formData.team || "暂无内容"} />
           </FormItem>
           <FormItem label="班组长">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-medium italic" value={formData.leader || "暂无内容"} />
           </FormItem>
           <FormItem label="退料人">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-medium italic" value={formData.returner || "暂无内容"} />
           </FormItem>
           <FormItem label="退料入库单编号" tips="自动生成无需填写">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm font-mono text-slate-400 italic" value={formData.returnEntryNo} />
           </FormItem>
        </div>
      </section>

      {/* 2. 入库产品明细 */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">二、入库产品明细</h3>
          </div>
          <div className="flex space-x-3">
             <button className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100">快速填报</button>
             <button className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100">+ 添加</button>
          </div>
        </div>
        
        <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-50">
           <FormItem label="*入库仓位">
              <select 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50"
                value={formData.inboundLocation}
                onChange={e => setFormData({...formData, inboundLocation: e.target.value})}
              >
                <option value="">请选择</option>
                <option value="A-01">原材料仓 A-01</option>
                <option value="B-03">半成品仓 B-03</option>
              </select>
           </FormItem>
           <FormItem label="*退料原因">
              <select 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50"
                value={formData.returnReason}
                onChange={e => setFormData({...formData, returnReason: e.target.value})}
              >
                <option value="剩料">剩料</option>
                <option value="报废">报废</option>
                <option value="计划变更">计划变更</option>
              </select>
           </FormItem>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1800px] text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                <th className="px-8 py-4 w-12 text-center">序号</th>
                <th className="px-4 py-4">生产产品名称</th>
                <th className="px-4 py-4">生产产品编码</th>
                <th className="px-4 py-4">产品名称</th>
                <th className="px-4 py-4">产品编码</th>
                <th className="px-4 py-4">规格型号</th>
                <th className="px-4 py-4 font-mono">产品批次号</th>
                <th className="px-6 py-4 bg-indigo-50/50 text-indigo-700">*本次入库数量</th>
                <th className="px-4 py-4 text-center">生产单位</th>
                <th className="px-4 py-4 text-right">本次入库数量(仓储单位)</th>
                <th className="px-4 py-4 text-center">仓储单位</th>
                <th className="px-8 py-4">入库仓位</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.length > 0 ? items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group font-medium">
                  <td className="px-8 py-5 text-xs text-slate-300 font-mono text-center">{idx + 1}</td>
                  <td className="px-4 py-5 text-xs text-slate-400">{item.prodName}</td>
                  <td className="px-4 py-5 text-xs text-slate-400 font-mono">{item.prodCode}</td>
                  <td className="px-4 py-5 text-sm text-slate-700 font-bold">{item.materialName}</td>
                  <td className="px-4 py-5 text-xs text-slate-500 font-mono tracking-tight">{item.materialCode}</td>
                  <td className="px-4 py-5 text-xs text-slate-400">{item.spec}</td>
                  <td className="px-4 py-5 text-xs text-slate-400 font-mono">{item.batchNo}</td>
                  <td className="px-6 py-5 bg-indigo-50/20">
                     <input 
                       type="number" 
                       placeholder="输入数量"
                       className="w-32 bg-white border border-indigo-100 rounded-lg px-3 py-1.5 text-right text-sm font-black text-indigo-700 focus:ring-4 focus:ring-indigo-200/50 outline-none shadow-sm transition-all"
                       value={item.currentQty || ""}
                       onChange={e => {
                         const next = [...items];
                         next[idx].currentQty = parseFloat(e.target.value) || 0;
                         next[idx].storageQty = (next[idx].currentQty * 0.001).toFixed(4);
                         setItems(next);
                       }}
                     />
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{item.prodUnit}</span>
                  </td>
                  <td className="px-4 py-5 text-right font-mono font-bold text-slate-700">{item.storageQty}</td>
                  <td className="px-4 py-5 text-center text-xs font-black text-slate-400 uppercase">{item.storageUnit}</td>
                  <td className="px-8 py-5 text-xs text-slate-400 italic">
                     {formData.inboundLocation || "待选择仓位"}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={12} className="px-8 py-16 text-center text-slate-300 italic text-sm font-medium">尚未选择领料单，请在上方“选择生产领料单”中载入数据</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. 入库产品总数量 */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">三、入库产品总数量/t</h3>
        </div>
        <div className="p-10">
           <input 
             type="text" 
             readOnly 
             className="w-full lg:w-1/3 bg-slate-900 border-none rounded-[2rem] px-10 py-6 text-3xl font-black font-mono text-indigo-400 shadow-xl placeholder-slate-600"
             placeholder="暂无内容"
             value={totalReturnQty > 0 ? totalReturnQty.toFixed(4) : ""}
           />
           <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">系统已自动汇总明细数量 (Automatic Aggregation)</p>
        </div>
      </section>

      {/* 4. 入库确认 */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">四、入库确认</h3>
        </div>
        <div className="p-10 space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <FormItem label="*产品入库确认">
                 <label className="flex items-center space-x-4 cursor-pointer group bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-all">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.isConfirmed ? 'border-indigo-600 bg-indigo-600 shadow-md shadow-indigo-100' : 'border-slate-300'}`}>
                       {formData.isConfirmed && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                    <input type="checkbox" className="hidden" checked={formData.isConfirmed} onChange={e => setFormData({...formData, isConfirmed: e.target.checked})} />
                    <span className={`text-sm font-black uppercase tracking-widest ${formData.isConfirmed ? 'text-indigo-700' : 'text-slate-400'}`}>确认已实物入库</span>
                 </label>
              </FormItem>
              <FormItem label="*退料入库时间">
                 <input 
                   type="datetime-local" 
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50"
                   value={formData.entryTime}
                   onChange={e => setFormData({...formData, entryTime: e.target.value})}
                 />
              </FormItem>
              <FormItem label="入库员">
                 <button 
                   onClick={() => setFormData({...formData, clerk: "王仓管 (M901)"})}
                   className={`w-full flex items-center justify-between px-4 py-3 border rounded-xl text-sm transition-all ${
                     formData.clerk 
                       ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-black' 
                       : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-indigo-300 font-bold shadow-inner'
                   }`}
                 >
                   <span className="truncate">{formData.clerk || "选择成员"}</span>
                   <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                 </button>
              </FormItem>
           </div>

           <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center">
                拍照 <span className="text-slate-300 font-medium lowercase ml-2">/ Evidence Photo</span>
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50 p-16 flex flex-col items-center justify-center space-y-5 hover:bg-indigo-50/30 hover:border-indigo-200 transition-all cursor-pointer group">
                 <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-slate-300 group-hover:text-indigo-500 transition-all group-hover:scale-110">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 </div>
                 <div className="text-center">
                    <p className="text-sm font-black text-slate-500 tracking-tight">选择 拖拽或单击后粘贴图片</p>
                    <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-2">单张20MB以内 • JPG/PNG</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer Sticky Button */}
      <footer className="fixed bottom-0 right-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 py-6 px-10 flex justify-end items-center z-[60] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         <button 
           disabled={!canSubmit}
           className={`px-20 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 ${
             canSubmit 
               ? 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700' 
               : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
           }`}
         >
           提交
         </button>
      </footer>

      {/* Selector Modal */}
      {isSelectorOpen && (
        <RequisitionSelectorModal 
          onSelect={handleRequisitionSelect}
          onClose={() => setIsSelectorOpen(false)}
        />
      )}
    </div>
  );
};

const FormItem: React.FC<{ label: string; tips?: string; children: React.ReactNode }> = ({ label, tips, children }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center px-1">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
      {tips && <span className="text-[9px] text-slate-300 italic font-bold">{tips}</span>}
    </div>
    {children}
  </div>
);
