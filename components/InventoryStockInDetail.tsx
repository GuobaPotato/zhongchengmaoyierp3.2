
import React from 'react';

interface InventoryStockInDetailProps {
  stockInId: string;
  onClose: () => void;
}

export const InventoryStockInDetail: React.FC<InventoryStockInDetailProps> = ({ stockInId, onClose }) => {
  // Hardcoded mock data for the specification demonstration
  const detail = {
    basic: {
      receiptNo: stockInId,
      status: "已审核",
      type: "采购入库",
      sourceNo: "PO2024102001",
      supplier: "深圳感应电子科技有限公司",
      location: "来料区",
      date: "2024-10-20 10:00:25",
      creator: "张三",
      auditor: "李管理",
      remark: "正常入库，外贸样品备注报关单号：BG882931"
    },
    items: [
      {
        code: "WHS-001",
        name: "红外感应头",
        specs: "感应距离5m/电压12V",
        unit: "个",
        expectedQty: 1000,
        receivedQty: 1000,
        failedQty: 0,
        batchNo: "LOT20241020-01",
        price: 8.50,
        amount: 8500.00,
        qcStatus: "合格"
      },
      {
        code: "WHS-042",
        name: "感应器外壳",
        specs: "ABS防菌材质",
        unit: "套",
        expectedQty: 500,
        receivedQty: 495,
        failedQty: 5,
        batchNo: "LOT20241020-02",
        price: 12.00,
        amount: 5940.00,
        qcStatus: "不合格"
      }
    ],
    qc: {
      no: "QC-20241020-881",
      type: "抽检",
      result: "部分合格，发现5pcs外壳毛刺过大",
      inspector: "王质检",
      time: "2024-10-20 09:30:12"
    },
    attachments: [
      { name: "供应商送货单_RK20241020.pdf", size: "1.2MB" },
      { name: "质检分析报告_WHS-042.xlsx", size: "0.5MB" }
    ],
    logs: [
      { operator: "张三", type: "新建", time: "2024-10-20 08:30:00", remark: "初次创建单据" },
      { operator: "李管理", type: "审核", time: "2024-10-20 09:45:00", remark: "对标质检报告，通过" },
      { operator: "张三", type: "确认入库", time: "2024-10-20 10:00:25", remark: "实物入库完成" }
    ]
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right-10 duration-500 overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-sm">
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
              <h1 className="text-xl font-black text-slate-800 tracking-tight">入库单详情</h1>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                detail.basic.status === '已审核' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
              }`}>
                {detail.basic.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5 tracking-tight">{detail.basic.receiptNo}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            <span>打印入库单</span>
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">导出Excel</button>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all">提交审核</button>
          <button className="px-5 py-2.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-sm font-bold hover:bg-rose-100 transition-all">作废单据</button>
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-400 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
          >
            返回列表
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-8 space-y-8">
          
          {/* Section 1: Basic Info */}
          <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
              <div className="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">入库单基础信息</h3>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-6 gap-x-12">
               <DisplayField label="入库单编号" value={detail.basic.receiptNo} isMono />
               <DisplayField label="单据状态" value={detail.basic.status} />
               <DisplayField label="入库类型" value={detail.basic.type} />
               <DisplayField label="关联单据号" value={detail.basic.sourceNo} isLink />
               <DisplayField label="供应商/生产车间" value={detail.basic.supplier} isBold />
               <DisplayField label="库位名称" value={detail.basic.location} />
               <DisplayField label="入库日期" value={detail.basic.date} isMono />
               <DisplayField label="制单人" value={detail.basic.creator} />
               <DisplayField label="审核人" value={detail.basic.auditor} />
               <div className="lg:col-span-5 pt-4">
                  <DisplayField label="备注" value={detail.basic.remark} isItalic />
               </div>
            </div>
          </section>

          {/* Section 2: Material List */}
          <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
             <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">入库物料明细列表</h3>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">共 {detail.items.length} 项物料</span>
             </div>
             <div className="overflow-x-auto">
                <table className="min-w-full text-left border-collapse">
                  <thead className="bg-slate-50/50">
                    <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                       <th className="px-8 py-4 w-12 text-center">#</th>
                       <th className="px-4 py-4">物料编码/名称</th>
                       <th className="px-4 py-4">规格型号</th>
                       <th className="px-4 py-4 text-center">单位</th>
                       <th className="px-4 py-4 text-right">应收</th>
                       <th className="px-4 py-4 text-right">实收</th>
                       <th className="px-4 py-4 text-right">不合格</th>
                       <th className="px-4 py-4">批次号</th>
                       <th className="px-4 py-4 text-right">单价</th>
                       <th className="px-4 py-4 text-right">金额</th>
                       <th className="px-4 py-4 text-center">质检状态</th>
                       <th className="px-8 py-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {detail.items.map((item, idx) => (
                      <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5 text-center text-xs text-slate-400 font-mono">{idx + 1}</td>
                        <td className="px-4 py-5">
                           <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-800 tracking-tight">{item.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono mt-0.5">{item.code}</span>
                           </div>
                        </td>
                        <td className="px-4 py-5 text-xs text-slate-500 font-medium italic">{item.specs}</td>
                        <td className="px-4 py-5 text-center text-xs text-slate-600">{item.unit}</td>
                        <td className="px-4 py-5 text-right text-xs font-mono font-bold text-slate-500">{item.expectedQty}</td>
                        <td className="px-4 py-5 text-right text-sm font-mono font-black text-indigo-700">{item.receivedQty}</td>
                        <td className="px-4 py-5 text-right text-sm font-mono font-bold text-rose-500">{item.failedQty || '--'}</td>
                        <td className="px-4 py-5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter">{item.batchNo}</td>
                        <td className="px-4 py-5 text-right text-xs font-mono text-slate-500">¥{item.price.toFixed(2)}</td>
                        <td className="px-4 py-5 text-right text-sm font-mono font-black text-slate-800">¥{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        <td className="px-4 py-5 text-center">
                           <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                             item.qcStatus === '合格' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                           }`}>
                             {item.qcStatus}
                           </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="text-[10px] font-black text-indigo-600 hover:underline">编辑</button>
                              <button className="text-[10px] font-black text-slate-400 hover:underline">质检报告</button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-900 text-white font-mono">
                     <tr>
                        <td colSpan={5} className="px-8 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">合计 (TOTAL)</td>
                        <td className="px-4 py-4 text-right font-black text-lg">1,495</td>
                        <td className="px-4 py-4 text-right font-black text-rose-400">5</td>
                        <td colSpan={2}></td>
                        <td className="px-4 py-4 text-right font-black text-lg text-indigo-400">¥14,440.00</td>
                        <td colSpan={2}></td>
                     </tr>
                  </tfoot>
                </table>
             </div>
          </section>

          {/* Section 3 & 4: QC and Attachments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* QC Info */}
             <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                  <div className="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">质检信息 (关联质检模块)</h3>
                </div>
                <div className="p-8 space-y-6">
                   <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                      <DisplayField label="质检单号" value={detail.qc.no} isLink isMono />
                      <DisplayField label="质检类型" value={detail.qc.type} />
                      <DisplayField label="质检员" value={detail.qc.inspector} />
                      <DisplayField label="质检时间" value={detail.qc.time} isMono />
                      <div className="col-span-2">
                        <DisplayField label="质检结论" value={detail.qc.result} isBold color="text-rose-600" />
                      </div>
                   </div>
                </div>
             </section>

             {/* Attachments */}
             <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                  <div className="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">附件信息</h3>
                </div>
                <div className="p-8 space-y-4">
                   <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-bold uppercase mb-2">附件列表</div>
                   <div className="grid grid-cols-1 gap-3">
                      {detail.attachments.map((att, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group border border-slate-100 hover:border-indigo-200 transition-all">
                           <div className="flex items-center space-x-4">
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                 <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                 </svg>
                              </div>
                              <div>
                                 <p className="text-xs font-bold text-slate-800">{att.name}</p>
                                 <p className="text-[10px] text-slate-400 uppercase font-bold mt-0.5">{att.size}</p>
                              </div>
                           </div>
                           <button className="p-2 text-slate-300 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                           </button>
                        </div>
                      ))}
                   </div>
                   <button className="w-full mt-4 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-xs font-bold text-slate-400 hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-600 transition-all flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      <span>点击或拖拽上传新附件</span>
                   </button>
                </div>
             </section>
          </div>

          {/* Section 5: Operation Log */}
          <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
             <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                <div className="w-1.5 h-5 bg-slate-400 rounded-full"></div>
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">操作日志</h3>
             </div>
             <div className="p-0">
                <table className="min-w-full text-left border-collapse">
                   <thead className="bg-slate-50/50">
                      <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                         <th className="px-8 py-4">操作人</th>
                         <th className="px-4 py-4">操作类型</th>
                         <th className="px-4 py-4">操作时间</th>
                         <th className="px-8 py-4">操作备注</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {detail.logs.map((log, i) => (
                        <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                           <td className="px-8 py-4">
                              <div className="flex items-center space-x-3">
                                 <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">{log.operator.charAt(0)}</div>
                                 <span className="text-xs font-bold text-slate-700">{log.operator}</span>
                              </div>
                           </td>
                           <td className="px-4 py-4">
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                                log.type === '新建' ? 'text-indigo-600 bg-indigo-50' : 
                                log.type === '审核' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-600 bg-slate-100'
                              }`}>{log.type}</span>
                           </td>
                           <td className="px-4 py-4 text-xs text-slate-500 font-mono">{log.time}</td>
                           <td className="px-8 py-4 text-xs text-slate-500 italic">"{log.remark}"</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </section>

        </div>
      </div>
    </div>
  );
};

const DisplayField: React.FC<{ 
  label: string; 
  value: string; 
  isMono?: boolean; 
  isBold?: boolean; 
  isLink?: boolean;
  isItalic?: boolean;
  color?: string;
}> = ({ label, value, isMono, isBold, isLink, isItalic, color }) => (
  <div className="space-y-1.5 min-w-0">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{label}</p>
    <div className={`text-sm ${color || 'text-slate-700'} ${isBold ? 'font-bold' : 'font-medium'} ${isMono ? 'font-mono tracking-tight' : ''} ${isLink ? 'text-indigo-600 underline decoration-indigo-200 underline-offset-4 cursor-pointer hover:text-indigo-800' : ''} ${isItalic ? 'italic text-slate-500' : ''} truncate`}>
      {value || '--'}
    </div>
  </div>
);
