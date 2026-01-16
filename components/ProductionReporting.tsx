
import React, { useState } from 'react';
import { WorkOrderSelectorModal } from './WorkOrderSelectorModal';

export const ProductionReporting: React.FC = () => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [formData, setFormData] = useState({
    workOrder: "感应龙头外壳生产工单20260109",
    orderName: "感应龙头外壳（ABS）组装+检测工单",
    planName: "感应龙头外壳生产计划202601",
    leader: "李班组",
    team: "组装一班",
    reportTime: "2026-01-09",
    batchNo: "QC-20260109",
    reportNo: "BG-20260109001",
    status: "已派工",
    remark: "当日完成500件感应龙头外壳的注塑、组装、防菌检测，所有工序合格"
  });

  const [details, setDetails] = useState([
    {
      serialNo: 1,
      processName: "外壳注塑",
      processCode: "GX-001",
      productName: "感应龙头外壳（ABS）",
      productCode: "SP-001",
      attribute: "医用级防菌",
      spec: "12*45*123",
      dispatchQty: 500,
      reportedQty: 0,
      currentQty: 500,
      unit: "件"
    },
    {
      serialNo: 2,
      processName: "精密组装",
      processCode: "GX-002",
      productName: "感应龙头外壳（ABS）",
      productCode: "SP-001",
      attribute: "医用级防菌",
      spec: "12*45*123",
      dispatchQty: 500,
      reportedQty: 0,
      currentQty: 500,
      unit: "件"
    },
    {
      serialNo: 3,
      processName: "防菌检测",
      processCode: "GX-003",
      productName: "感应龙头外壳（ABS）",
      productCode: "SP-001",
      attribute: "医用级防菌",
      spec: "12*45*123",
      dispatchQty: 500,
      reportedQty: 0,
      currentQty: 500,
      unit: "件"
    }
  ]);

  const handleWorkOrderSelect = (order: any) => {
    setFormData({
      ...formData,
      workOrder: order.productionWorkOrderName,
      orderName: order.productionWorkOrderName,
      planName: order.productionPlanName,
      leader: order.teamLeader,
      team: order.productionTeam,
      batchNo: order.finishedProductBatchNo,
      status: order.workOrderStatus
    });

    const mappedDetails = order.processDetails.map((proc: any, index: number) => ({
      serialNo: index + 1,
      processName: proc.processName,
      processCode: proc.processCode,
      productName: proc.productName,
      productCode: proc.productCode,
      attribute: proc.productAttribute,
      spec: proc.specModel,
      dispatchQty: parseInt(proc.dispatchedQty),
      reportedQty: 0,
      currentQty: parseInt(proc.currentDispatchedQty),
      unit: proc.unit
    }));
    setDetails(mappedDetails);
    setIsSelectorOpen(false);
  };

  const calculateTotal = () => details.reduce((acc, curr) => acc + curr.currentQty, 0);

  return (
    <div className="flex flex-col h-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      {/* Page Header */}
      <div className="flex flex-col space-y-1">
        <nav className="flex text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span>生产管理</span>
          <span className="mx-2">/</span>
          <span className="text-indigo-600">生产报工</span>
        </nav>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">生产报工</h1>
          <p className="text-xs font-bold text-slate-400 italic">默认为班组、车间做“日”颗粒度的生产报工</p>
        </div>
      </div>

      {/* 1. Production Plan Info Section */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">一、生产计划信息</h3>
        </div>
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           <FormItem label="选择生产工单" required>
              <div 
                className="relative group cursor-pointer"
                onClick={() => setIsSelectorOpen(true)}
              >
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-indigo-100 rounded-xl px-4 py-2.5 text-sm font-bold text-indigo-700 outline-none focus:ring-4 focus:ring-indigo-50 cursor-pointer group-hover:border-indigo-300 transition-all"
                  value={formData.workOrder}
                  readOnly
                  placeholder="点击选择生产工单"
                />
                <div className="absolute right-3 top-2.5 text-indigo-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
                </div>
              </div>
           </FormItem>
           <FormItem label="生产工单名称">
              <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-medium" value={formData.orderName} readOnly />
           </FormItem>
           <FormItem label="生产计划名称">
              <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-medium" value={formData.planName} readOnly />
           </FormItem>
           <FormItem label="报工时间" required>
              <input type="date" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50" value={formData.reportTime} onChange={e => setFormData({...formData, reportTime: e.target.value})} />
           </FormItem>
           <FormItem label="生产班组">
              <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-medium" value={`${formData.team} (${formData.leader})`} readOnly />
           </FormItem>
           <FormItem label="产成品批次号">
              <div className="flex flex-col">
                <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-slate-700" value={formData.batchNo} onChange={e => setFormData({...formData, batchNo: e.target.value})} />
                <span className="text-[9px] text-indigo-400 font-bold mt-1 uppercase tracking-widest">关联质检系统已自动匹配</span>
              </div>
           </FormItem>
           <FormItem label="生产报工单编号">
              <div className="flex flex-col">
                <input type="text" className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-400 cursor-not-allowed" value={formData.reportNo} readOnly />
                <span className="text-[9px] text-slate-300 font-bold mt-1 uppercase tracking-widest">自动生成无需填写</span>
              </div>
           </FormItem>
           <FormItem label="工单状态">
              <span className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border inline-block text-center w-fit ${
                formData.status === '已派工' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
              }`}>
                {formData.status}
              </span>
           </FormItem>
        </div>
      </section>

      {/* 2. Production Reporting Details Section */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">二、生产报工明细</h3>
          </div>
          <div className="flex space-x-3">
             <button className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100">+ 添加</button>
             <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">快速填报</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                <th className="px-8 py-4 w-12 text-center">#</th>
                <th className="px-4 py-4">工序信息</th>
                <th className="px-4 py-4">产品基础信息</th>
                <th className="px-4 py-4">属性/规格</th>
                <th className="px-4 py-4 text-right">生产派工</th>
                <th className="px-4 py-4 text-right">已报工</th>
                <th className="px-6 py-4 text-right bg-indigo-50/50 font-black text-indigo-700">*本次报工数量</th>
                <th className="px-4 py-4 text-center">单位</th>
                <th className="px-8 py-4 text-right">工序完成率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {details.length > 0 ? details.map((item, idx) => {
                const completionRate = Math.round(((item.reportedQty + item.currentQty) / (item.dispatchQty || 1)) * 100);
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-5 text-xs text-slate-300 font-mono text-center">{idx + 1}</td>
                    <td className="px-4 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-800 tracking-tight">{item.processName}</span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">{item.processCode}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">{item.productName}</span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">{item.productCode}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                       <div className="flex flex-col">
                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-lg w-fit mb-1 uppercase tracking-tighter">{item.attribute}</span>
                        <span className="text-xs text-slate-500 font-medium italic">{item.spec}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-right font-mono font-bold text-slate-400">{item.dispatchQty}</td>
                    <td className="px-4 py-5 text-right font-mono font-bold text-slate-400">{item.reportedQty}</td>
                    <td className="px-6 py-5 bg-indigo-50/20 text-right">
                       <input 
                         type="number" 
                         className="w-24 bg-white border border-indigo-100 rounded-lg px-3 py-1.5 text-right text-sm font-black text-indigo-700 focus:ring-4 focus:ring-indigo-200/50 outline-none shadow-sm transition-all"
                         value={item.currentQty}
                         onChange={(e) => {
                            const next = [...details];
                            next[idx].currentQty = parseInt(e.target.value) || 0;
                            setDetails(next);
                         }}
                       />
                    </td>
                    <td className="px-4 py-5 text-center">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">{item.unit}</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className={`text-sm font-black font-mono tracking-tighter ${completionRate >= 100 ? 'text-emerald-500' : 'text-indigo-600'}`}>
                        {completionRate}%
                      </span>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={9} className="px-8 py-16 text-center text-slate-300 italic text-sm font-medium">尚未选择工单，请在上方“选择生产工单”中载入数据</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Statistic & 4. Remark Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
              <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">三、统计信息</h3>
            </div>
            <div className="p-8 space-y-6">
               <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col items-center justify-center space-y-4 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 -mr-12 -mt-12 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] relative z-10">报工总计 (Overall Quantity)</span>
                  <div className="flex items-baseline space-x-2 relative z-10">
                     <span className="text-5xl font-black font-mono text-indigo-400 drop-shadow-lg">{calculateTotal()}</span>
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Units</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-4 relative z-10 shadow-inner">
                     <div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest animate-pulse relative z-10">综合完成率: 100.0%</span>
               </div>
            </div>
         </section>

         <section className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
              <div className="w-1.5 h-6 bg-slate-400 rounded-full"></div>
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">四、报工备注 (Notes)</h3>
            </div>
            <div className="p-8">
               <textarea 
                 className="w-full h-[180px] bg-slate-50 border border-slate-100 rounded-3xl p-8 text-sm font-medium text-slate-600 focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-200 outline-none transition-all resize-none shadow-inner"
                 placeholder="请输入报工相关的异常说明、物料损耗等备注信息..."
                 value={formData.remark}
                 onChange={e => setFormData({...formData, remark: e.target.value})}
               ></textarea>
            </div>
         </section>
      </div>

      {/* Global Actions Bar (Fixed) */}
      <footer className="fixed bottom-0 right-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 py-6 px-10 flex justify-between items-center z-[60] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         <div className="flex items-center space-x-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-emerald-600">Data Integrity OK</span>
            </div>
            <div className="h-4 w-px bg-slate-200"></div>
            <span>ERP v3.1 PRODUCTION_MODULE</span>
         </div>
         <div className="flex items-center space-x-4">
            <button className="px-10 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-sm">保存草稿</button>
            <button className="px-12 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">提交生产报工</button>
         </div>
      </footer>

      {/* Select Modal */}
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

const FormItem: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center">
      {label}
      {required && <span className="text-rose-500 ml-1.5 font-black">*</span>}
    </label>
    {children}
  </div>
);
