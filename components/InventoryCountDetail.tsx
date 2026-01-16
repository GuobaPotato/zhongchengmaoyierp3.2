
import React, { useState } from 'react';

interface InventoryCountDetailProps {
  countId: string;
  onClose: () => void;
}

export const InventoryCountDetail: React.FC<InventoryCountDetailProps> = ({ countId, onClose }) => {
  // Hardcoded mock data based on specification
  const detail = {
    basic: {
      no: countId === 'PD202601001' ? "PD202601001" : "PD202512005",
      status: "盘点中",
      type: "专项盘点",
      range: "指定仓库",
      warehouse: "保税仓",
      countDate: "2026-01-20 09:30",
      planDate: "2026-01-18 09:00",
      responsible: "李仓管",
      auditor: "--",
      remark: "保税仓物料按海关监管要求进行季度复核，重点核对红外感应头批次。"
    },
    items: [
      {
        code: "WHS-IR-001",
        name: "红外感应头",
        specs: "感应距离5m/电压12V",
        unit: "个",
        bookQty: 1000,
        actualQty: 1012,
        diffQty: 12,
        diffRate: "1.2%",
        batchNo: "LOT-202512-A",
        location: "A区01架02层",
        reason: "入库漏记账",
        suggestion: "调账"
      },
      {
        code: "WHS-SHELL-02",
        name: "感应器外壳",
        specs: "ABS防菌材质",
        unit: "套",
        bookQty: 500,
        actualQty: 492,
        diffQty: -8,
        diffRate: "-1.6%",
        batchNo: "LOT-202511-C",
        location: "B区04架01层",
        reason: "抽检损耗未核销",
        suggestion: "调账"
      }
    ],
    summary: {
      totalSpecies: 45,
      diffSpecies: 8,
      profitQty: 15,
      lossQty: 23,
      profitAmount: 1250.00,
      lossAmount: 1880.00,
      diffDesc: "本次保税仓盘点整体差异率在2%以内，符合监管要求。主要差异点在于物料领用后系统核销存在约24小时延迟。"
    },
    // Added missing attachments property to fix the property 'attachments' does not exist error
    attachments: [
      { name: "保税仓盘点方案.pdf", size: "1.2MB" },
      { name: "差异项现场核实照.jpg", size: "2.8MB" }
    ],
    logs: [
      { operator: "李仓管", type: "新建", time: "2026-01-13 14:00:25", remark: "同步季度盘点计划生成" },
      { operator: "李仓管", type: "编辑", time: "2026-01-14 10:15:00", remark: "修正盘点范围至保税仓" },
      { operator: "李仓管", type: "提交盘点", time: "2026-01-20 16:30:00", remark: "首轮实物清点完成" }
    ]
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Global Header & Operations */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-50 shrink-0 shadow-sm">
        <div className="flex items-center space-x-6">
          <button 
            onClick={onClose}
            className="p-2.5 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-indigo-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-black text-slate-800 tracking-tight">库存盘点详情</h1>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded-full uppercase tracking-widest">
                {detail.basic.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5 tracking-tight">{detail.basic.no}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            <span>打印盘点单</span>
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">导出Excel</button>
          <button className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">提交审核</button>
          <button className="px-5 py-2.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-sm font-bold hover:bg-rose-100 transition-all">作废单据</button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto p-8 space-y-8 pb-32">
          
          {/* Section: Basic Info */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
              <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">盘点单基础信息</h3>
            </div>
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-8 gap-x-12">
               <DetailItem label="盘点单编号" value={detail.basic.no} isMono required />
               <DetailItem label="单据状态" value={detail.basic.status} color="text-amber-600" />
               <DetailItem label="盘点类型" value={detail.basic.type} />
               <DetailItem label="盘点范围" value={detail.basic.range} required />
               <DetailItem label="盘点仓库" value={detail.basic.warehouse} isBold />
               <DetailItem label="盘点日期" value={detail.basic.countDate} isMono required />
               <DetailItem label="计划盘点日期" value={detail.basic.planDate} isMono />
               <DetailItem label="盘点负责人" value={detail.basic.responsible} required />
               <DetailItem label="审核人" value={detail.basic.auditor} />
               <div className="lg:col-span-5">
                  <DetailItem label="备注" value={detail.basic.remark} isTextArea isItalic />
               </div>
            </div>
          </section>

          {/* Section: Material List Table */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">盘点物料明细列表</h3>
              </div>
              <div className="flex items-center space-x-4">
                 <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100 hover:bg-indigo-100 transition-all">导入实盘数</button>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">显示: {detail.items.length} 行</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                    <th className="px-8 py-5 w-12 text-center sticky left-0 bg-slate-50 z-20 border-r border-slate-100">#</th>
                    <th className="px-4 py-5 min-w-[200px]">物料编码/名称</th>
                    <th className="px-4 py-5">规格型号</th>
                    <th className="px-4 py-5 text-center">计量单位</th>
                    <th className="px-4 py-5 text-right">账面数量</th>
                    <th className="px-4 py-5 text-right">实盘数量</th>
                    <th className="px-4 py-5 text-right">差异数量</th>
                    <th className="px-4 py-5 text-right">差异率</th>
                    <th className="px-4 py-5">批次号</th>
                    <th className="px-4 py-5">盘点仓位</th>
                    <th className="px-4 py-5">处理建议</th>
                    <th className="px-8 py-5 text-right sticky right-0 bg-slate-50 z-10 border-l border-slate-100">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {detail.items.map((item, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6 text-center text-xs text-slate-300 font-mono sticky left-0 bg-white group-hover:bg-slate-50/50 z-10 border-r border-slate-100">{idx + 1}</td>
                      <td className="px-4 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-800 tracking-tight">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5 tracking-tighter uppercase">{item.code}</span>
                        </div>
                      </td>
                      <td className="px-4 py-6 text-xs text-slate-500 font-medium">{item.specs}</td>
                      <td className="px-4 py-6 text-center">
                         <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{item.unit}</span>
                      </td>
                      <td className="px-4 py-6 text-right font-mono font-bold text-slate-500">{item.bookQty}</td>
                      <td className="px-4 py-6 text-right">
                         <div className="inline-flex items-center space-x-2 bg-indigo-50/50 px-3 py-1.5 rounded-lg border border-indigo-100 group/input">
                            <input 
                               type="number" 
                               defaultValue={item.actualQty} 
                               className="bg-transparent border-none p-0 w-16 text-right text-sm font-black text-indigo-700 focus:ring-0 outline-none"
                            />
                            <svg className="w-3 h-3 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                         </div>
                      </td>
                      <td className={`px-4 py-6 text-right font-mono font-black ${item.diffQty >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                         {item.diffQty > 0 ? `+${item.diffQty}` : item.diffQty}
                      </td>
                      <td className={`px-4 py-6 text-right font-mono text-xs font-bold ${item.diffQty >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                         {item.diffRate}
                      </td>
                      <td className="px-4 py-6 text-[10px] font-mono text-slate-400 uppercase tracking-tighter">{item.batchNo}</td>
                      <td className="px-4 py-6 text-xs text-slate-500">{item.location}</td>
                      <td className="px-4 py-6">
                         <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-black rounded uppercase">{item.suggestion}</span>
                      </td>
                      <td className="px-8 py-6 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50/50 z-10 border-l border-slate-100">
                         <div className="flex justify-end space-x-4 opacity-0 group-hover:opacity-100 transition-all">
                            <button className="text-[10px] font-black text-indigo-600 hover:underline uppercase tracking-widest">流水</button>
                            <button className="text-[10px] font-black text-slate-400 hover:text-slate-800 uppercase tracking-widest">照片</button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Summary Card */}
          <section className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 opacity-[0.03] rounded-full -mr-32 -mt-32"></div>
             <div className="relative z-10 flex flex-col space-y-10">
                <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-400">盘点差异汇总分析</h3>
                   </div>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 py-1 border border-slate-800 rounded-full">Automated Calculation</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                   <SummaryBox label="总物料品种" value={detail.summary.totalSpecies} unit="种" />
                   <SummaryBox label="有差异品种" value={detail.summary.diffSpecies} unit="种" color="text-rose-400" />
                   <SummaryBox label="盘盈总数量" value={detail.summary.profitQty} unit="pcs" color="text-emerald-400" />
                   <SummaryBox label="盘亏总数量" value={detail.summary.lossQty} unit="pcs" color="text-rose-400" />
                   <SummaryBox label="盘盈总金额" value={`¥${detail.summary.profitAmount.toFixed(2)}`} color="text-emerald-400" />
                   <SummaryBox label="盘亏总金额" value={`¥${detail.summary.lossAmount.toFixed(2)}`} color="text-rose-400" />
                </div>

                <div className="space-y-3 pt-6 border-t border-white/5">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">差异整体说明 (Summary Analysis)</label>
                   <p className="text-sm text-slate-400 leading-relaxed italic max-w-4xl">
                     “ {detail.summary.diffDesc} ”
                   </p>
                </div>
             </div>
          </section>

          {/* Section: Attachments & Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-10 flex flex-col space-y-8">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">附件管理</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                   {detail.attachments.map((att, i) => (
                     <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all group">
                        <div className="flex items-center space-x-4">
                           <div className="p-2 bg-white rounded-lg shadow-sm">
                              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                           </div>
                           <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-700">{att.name}</span>
                              <span className="text-[10px] text-slate-400 font-black uppercase mt-0.5">{att.size}</span>
                           </div>
                        </div>
                        <button className="text-[10px] font-black text-indigo-600 hover:underline uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Download</button>
                     </div>
                   ))}
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center space-y-3 hover:bg-slate-50 hover:border-indigo-200 transition-all cursor-pointer group">
                   <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-all">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                   </div>
                   <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-all">上传新附件 (PDF/JPG)</span>
                </div>
             </section>

             <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                  <div className="w-1.5 h-6 bg-slate-400 rounded-full"></div>
                  <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">操作审计日志</h3>
                </div>
                <div className="overflow-y-auto max-h-[400px]">
                   <table className="min-w-full text-left border-collapse">
                      <thead className="bg-slate-50/80 sticky top-0 z-10 border-b border-slate-100">
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <th className="px-8 py-4">操作人</th>
                           <th className="px-4 py-4">动作</th>
                           <th className="px-4 py-4">时间</th>
                           <th className="px-8 py-4">备注说明</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {detail.logs.map((log, i) => (
                           <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-8 py-4">
                                 <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-black text-white">{log.operator.charAt(0)}</div>
                                    <span className="text-xs font-bold text-slate-700">{log.operator}</span>
                                 </div>
                              </td>
                              <td className="px-4 py-4">
                                 <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                                   log.type === '提交盘点' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                                 }`}>{log.type}</span>
                              </td>
                              <td className="px-4 py-4 text-[10px] font-mono text-slate-400">{log.time}</td>
                              <td className="px-8 py-4 text-xs text-slate-500 italic">"{log.remark}"</td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                   <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">EndOfAuditLog</span>
                </div>
             </section>
          </div>

        </div>
      </div>

      {/* Footer Sticky Actions Area */}
      <footer className="bg-white border-t border-slate-200 px-10 py-6 flex justify-between items-center shrink-0 z-50 shadow-inner">
         <div className="flex items-center space-x-12">
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">当前查看权限</span>
               <span className="text-xs font-black text-slate-800">仓库管理员 / 全部数据可见</span>
            </div>
            <div className="h-8 w-px bg-slate-100"></div>
            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Data Sync Normal</span>
            </div>
         </div>
         <div className="flex items-center space-x-4">
            <button 
               onClick={onClose}
               className="px-12 py-3 bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
            >
               返回列表
            </button>
            <button className="px-12 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
               保存当前修改
            </button>
         </div>
      </footer>
    </div>
  );
};

const DetailItem: React.FC<{ 
  label: string; 
  value: string; 
  isMono?: boolean; 
  isBold?: boolean; 
  required?: boolean;
  isTextArea?: boolean;
  isItalic?: boolean;
  color?: string;
  isLink?: boolean;
}> = ({ label, value, isMono, isBold, required, isTextArea, isItalic, color, isLink }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center">
      {label}
      {required && <span className="text-rose-500 ml-1">*</span>}
    </label>
    <div className={`text-sm ${color || 'text-slate-800'} ${isBold ? 'font-black' : 'font-bold'} ${isMono ? 'font-mono' : ''} ${isItalic ? 'italic text-slate-500' : ''} ${isLink ? 'text-indigo-600 underline cursor-pointer decoration-indigo-200' : ''} ${isTextArea ? 'bg-slate-50/50 p-4 rounded-2xl border border-slate-100 leading-relaxed' : ''}`}>
      {value || '--'}
    </div>
  </div>
);

const SummaryBox: React.FC<{ label: string; value: number | string; unit?: string; color?: string }> = ({ label, value, unit, color }) => (
  <div className="space-y-3">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <div className="flex items-baseline space-x-1">
      <span className={`text-2xl font-black font-mono ${color || 'text-white'}`}>{value}</span>
      {unit && <span className="text-[10px] font-black text-slate-600 uppercase">{unit}</span>}
    </div>
  </div>
);
