
import React from 'react';
import { PurchaseOrderItem } from '../constants';

interface PurchaseOrderDetailViewProps {
  order: PurchaseOrderItem;
  onClose: () => void;
}

export const PurchaseOrderDetailView: React.FC<PurchaseOrderDetailViewProps> = ({ order, onClose }) => {
  // Mock extended data for the detail view
  const detailData = {
    type: '原材料采购',
    taxRate: '13%',
    settlementMethod: '月结30天',
    freight: 150.00,
    discount: 0,
    otherFees: 0,
    invoiceType: '增值税专用发票',
    invoiceNo: 'IVN-20241025-001',
    isInvoiceReceived: true,
    department: '采购一部',
    auditor: '李管理',
    auditDate: order.auditStatus === '通过' ? '2024-10-21 14:20' : '-',
    remarks: '急需物料，请务必保证质量和交期。包装需防潮处理。',
    products: [
      { id: '1', name: 'MEMS感应芯片-G2', code: 'MAT-23001', specs: '5V/10mA', type: '核心组件', unit: '个', qty: 1000, price: 12.5, taxPrice: 14.125, receivedQty: 800, planDate: '2024-10-30', qc: '抽检', workOrder: 'WO-20241010-01' },
      { id: '2', name: '精密红外透镜', code: 'MAT-23042', specs: '12mm-HD', type: '辅料', unit: '对', qty: 2000, price: 3.2, taxPrice: 3.616, receivedQty: 2000, planDate: '2024-11-05', qc: '免检', workOrder: 'WO-20241010-01' },
    ],
    receipts: [
      { no: 'RC-20241028-01', date: '2024-10-28', warehouse: '主仓库A区', qty: 800 },
      { no: 'RC-20241105-01', date: '2024-11-05', warehouse: '辅料仓B区', qty: 2000 },
    ],
    qcLogs: [
      { no: 'QC-20241029-01', date: '2024-10-29', result: '合格', failedQty: 0, action: '入库' },
    ],
    approvalHistory: [
      { user: '赵采购', time: '2024-10-20 09:15', action: '创建单据', remark: '系统发起' },
      { user: '钱主管', time: '2024-10-20 14:30', action: '初步审核', remark: '价格已对标，同意' },
      { user: '李管理', time: '2024-10-21 14:20', action: '终审通过', remark: '准予执行' },
    ]
  };

  const finalPayable = order.totalAmount + detailData.freight + detailData.otherFees - detailData.discount;

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in fade-in slide-in-from-right-8 duration-500">
      {/* Detail Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-sm">
        <div className="flex items-center space-x-5">
          <button 
            onClick={onClose}
            className="p-2.5 hover:bg-slate-100 rounded-full transition-all group"
          >
            <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-extrabold text-slate-800">采购单详情</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              order.auditStatus === '通过' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {order.auditStatus}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ {order.orderNo}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">打印单据</button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">导出Excel</button>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">编辑单据</button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* Row 1: Basic Info Grid */}
        <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2">
          <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
              <h3 className="text-sm font-bold text-slate-700">基础信息</h3>
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-12">
            {[
              { label: '采购单号', value: order.orderNo, isMono: true },
              { label: '单据状态', value: order.auditStatus, isBadge: true },
              { label: '采购类型', value: detailData.type },
              { label: '供应商名称', value: order.supplier, isBold: true },
              { label: '单据日期', value: order.date },
              { label: '审核日期', value: detailData.auditDate },
              { label: '采购员', value: '王采购' },
              { label: '归属部门', value: detailData.department },
            ].map((field, idx) => (
              <div key={idx} className="space-y-1.5">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{field.label}</p>
                <div className={`text-sm ${field.isBold ? 'font-bold text-slate-900' : 'text-slate-700'} ${field.isMono ? 'font-mono tracking-tight' : ''}`}>
                  {field.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Row 2: Goods Table */}
        <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center">
            <div className="w-1.5 h-5 bg-indigo-500 rounded-full mr-3"></div>
            <h3 className="text-sm font-bold text-slate-700">采购商品明细</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead className="bg-slate-50/80">
                <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-8 py-4 w-12 text-center">#</th>
                  <th className="px-4 py-4">商品信息</th>
                  <th className="px-4 py-4 text-center">单位</th>
                  <th className="px-4 py-4 text-right">采购数量</th>
                  <th className="px-4 py-4 text-right">单价(含税)</th>
                  <th className="px-4 py-4 text-right">金额(含税)</th>
                  <th className="px-4 py-4 text-center">计划交期</th>
                  <th className="px-4 py-4 text-center">入库情况</th>
                  <th className="px-4 py-4 text-center">质检要求</th>
                  <th className="px-8 py-4">备注</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {detailData.products.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                    <td className="px-8 py-5 text-center text-xs text-slate-400 font-mono">{idx + 1}</td>
                    <td className="px-4 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{p.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5">{p.code} | {p.specs}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-center text-sm text-slate-600">{p.unit}</td>
                    <td className="px-4 py-5 text-right font-mono font-bold text-slate-800">{p.qty.toLocaleString()}</td>
                    <td className="px-4 py-5 text-right text-xs font-mono text-slate-500">¥{p.taxPrice.toFixed(3)}</td>
                    <td className="px-4 py-5 text-right font-mono font-bold text-indigo-700">¥{(p.qty * p.taxPrice).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-4 py-5 text-center text-xs text-slate-500 font-mono">{p.planDate}</td>
                    <td className="px-4 py-5 text-center">
                      <div className="flex flex-col items-center">
                        <span className={`text-[10px] font-bold ${p.receivedQty >= p.qty ? 'text-green-600' : 'text-amber-600'}`}>
                          {p.receivedQty} / {p.qty}
                        </span>
                        <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                           <div className="h-full bg-indigo-500" style={{ width: `${(p.receivedQty/p.qty)*100}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-center">
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                         p.qc === '抽检' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'
                       }`}>{p.qc}</span>
                    </td>
                    <td className="px-8 py-5 text-xs text-slate-400 max-w-[150px] truncate leading-relaxed">
                       {p.workOrder} 关联生产
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Row 3: Finance and Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-6">
          
          {/* Finance Section */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
                <h3 className="text-sm font-bold text-slate-700">费用与结算</h3>
              </div>
            </div>
            <div className="p-8 space-y-6 flex-1">
               <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="space-y-1">
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">结算方式</p>
                     <span className="text-sm font-bold text-slate-800">{detailData.settlementMethod}</span>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">付款状态</p>
                     <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">{order.paymentStatus}</span>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">发票信息</p>
                     <span className="text-xs text-slate-600">{detailData.invoiceType} | {detailData.invoiceNo}</span>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">收票状态</p>
                     <span className="text-xs font-bold text-green-600">已收票</span>
                  </div>
               </div>
               
               <div className="pt-6 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between items-center text-sm text-slate-500">
                     <span>商品总金额(含税)</span>
                     <span className="font-mono">¥{order.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-slate-500">
                     <span>运费 / 其他</span>
                     <span className="font-mono">¥{(detailData.freight + detailData.otherFees).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-slate-500">
                     <span>整单折扣</span>
                     <span className="font-mono text-rose-500">-¥{detailData.discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-900 border-dashed">
                     <span className="text-base font-extrabold text-slate-900 uppercase">最终应付金额</span>
                     <span className="text-2xl font-mono font-bold text-indigo-700">¥{finalPayable.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
               </div>
            </div>
          </section>

          {/* Operation & Approval Log */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
                <h3 className="text-sm font-bold text-slate-700">流程追踪与操作日志</h3>
              </div>
            </div>
            <div className="p-8 space-y-8 flex-1 overflow-y-auto">
               <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100">
                  {detailData.approvalHistory.map((log, idx) => (
                    <div key={idx} className="relative flex items-start space-x-5 group">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white border-4 border-slate-50 shadow-sm shrink-0 z-10 transition-all group-hover:border-indigo-100">
                        <div className={`h-2.5 w-2.5 rounded-full ${idx === detailData.approvalHistory.length - 1 ? 'bg-indigo-600 animate-pulse' : 'bg-slate-300'}`}></div>
                      </div>
                      <div className="flex-1 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 group-hover:bg-indigo-50/30 transition-all">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-bold text-slate-800">{log.user}</span>
                          <span className="text-[10px] text-slate-400 font-mono uppercase">{log.time}</span>
                        </div>
                        <p className="text-xs font-bold text-indigo-600 mb-1">{log.action}</p>
                        <p className="text-xs text-slate-500 italic leading-relaxed">"{log.remark}"</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </section>
        </div>

        {/* Row 4: Related Docs and Attachments */}
        <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-8">
          <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
              <h3 className="text-sm font-bold text-slate-700">关联收货/质检及附件</h3>
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
             
             {/* Related Documents */}
             <div className="space-y-6">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">关联收货单 ({detailData.receipts.length})</p>
                <div className="space-y-3">
                   {detailData.receipts.map((r, i) => (
                     <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center group hover:border-indigo-200 transition-all">
                        <div>
                           <p className="text-xs font-bold text-slate-800">{r.no}</p>
                           <p className="text-[10px] text-slate-400 mt-1">{r.date} | {r.warehouse}</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-indigo-600">{r.qty}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="space-y-6">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">关联质检单 ({detailData.qcLogs.length})</p>
                <div className="space-y-3">
                   {detailData.qcLogs.map((q, i) => (
                     <div key={i} className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col space-y-2 group hover:shadow-md transition-all">
                        <div className="flex justify-between items-center">
                           <span className="text-xs font-bold text-slate-800">{q.no}</span>
                           <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 font-bold rounded-full">{q.result}</span>
                        </div>
                        <p className="text-[10px] text-slate-500">{q.date} | 抽样检测通过</p>
                     </div>
                   ))}
                </div>
             </div>

             {/* Attachments */}
             <div className="space-y-6">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">合同与技术附件</p>
                <div className="grid grid-cols-1 gap-3">
                   <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-center space-x-4 group cursor-pointer hover:bg-indigo-50 transition-all">
                      <div className="bg-white p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                         <p className="text-xs font-bold text-slate-800">采购合同_芯片组A.pdf</p>
                         <p className="text-[10px] text-slate-400 uppercase">PDF • 1.2MB • 已归档</p>
                      </div>
                   </div>
                   <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 border-dashed flex items-center justify-center group cursor-pointer hover:bg-slate-100 transition-all">
                      <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-600">+ 上传补充附件</span>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Global Remarks Section */}
        <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden p-8 animate-in fade-in slide-in-from-bottom-10">
           <div className="flex flex-col space-y-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">整单备注说明</p>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                 <p className="text-sm text-slate-600 italic leading-relaxed">
                   "{detailData.remarks}"
                 </p>
              </div>
           </div>
        </section>

      </div>

      {/* Detail Footer */}
      <footer className="bg-white px-8 py-6 border-t border-slate-200 flex justify-between items-center shrink-0 z-30 shadow-inner">
        <div className="flex items-center space-x-12">
           <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400 uppercase tracking-wider font-bold">最后更新:</span>
              <span className="text-slate-800 font-mono">2024-10-21 14:20:05</span>
           </div>
           <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400 uppercase tracking-wider font-bold">单据所有权:</span>
              <span className="text-slate-800">王采购 / 采购一部</span>
           </div>
        </div>
        <div className="flex space-x-3">
          <button 
             onClick={onClose}
             className="px-8 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
          >
            返回列表
          </button>
        </div>
      </footer>
    </div>
  );
};
