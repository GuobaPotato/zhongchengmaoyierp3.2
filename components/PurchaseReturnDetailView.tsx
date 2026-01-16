
import React from 'react';
import { PurchaseReturnItem } from '../constants';

interface PurchaseReturnDetailViewProps {
  item: PurchaseReturnItem;
  onClose: () => void;
}

export const PurchaseReturnDetailView: React.FC<PurchaseReturnDetailViewProps> = ({ item, onClose }) => {
  // Mock detailed data based on the spec
  const detailData = {
    basic: {
      returnNo: `RT-PUR-2026-01-001`, // Overriding for detail spec rule
      purchaseNo: item.purchaseNo,
      stockInNo: 'SI-20251220-092',
      returnType: '质量问题退货',
      applyDate: '2026-01-09',
      status: '审核通过',
      applicant: '王朔',
      auditor: '李管理',
      auditDate: '2026-01-09 16:30'
    },
    supplier: {
      code: 'SUP-00231',
      name: '深圳感应电子科技有限公司',
      contact: '张明',
      phone: '138-xxxx-8888',
      email: 'zhangming@sensor-tech.com',
      address: '广东省深圳市龙华区感应科技园A栋',
      remarks: '退货前需提前24小时通知'
    },
    goodsList: [
      {
        id: 'G1',
        code: 'MAT-IR-001',
        name: '高精度红外传感器',
        model: 'MX-23型',
        unit: '个',
        purchaseQty: 1000,
        stockInQty: 950,
        applyReturnQty: 200,
        actualReturnQty: 0,
        price: 9.40,
        qcResult: '不合格项目：红外线感应灵敏度不达标',
        reason: '抽检合格率仅为75%，批量存在灵敏度漂移问题'
      }
    ],
    process: {
      globalReason: '本批次红外感应器在入库检测中发现灵敏度严重不符标准，经协商进行部分退款退货处理。',
      opinion: '核实属实，供应商已确认。同意按质检报告比例进行退款。',
      method: '我方送货',
      logistics: {
        no: 'SF1425364758',
        company: '顺丰特惠',
        date: '2026-01-10'
      },
      warehouse: {
        location: 'A04',
        receivedDate: '-'
      },
      finance: {
        refundAmount: 0.00,
        refundStatus: '未退款',
        refundDate: '-',
        invoice: '红字发票冲销'
      }
    },
    attachments: [
      { id: 'att1', type: '质检报告', name: '20260109_红外传感器质检书.pdf', time: '2026-01-09 14:15' },
      { id: 'att2', type: '照片', name: '瑕疵细节图_01.jpg', time: '2026-01-09 14:16' }
    ]
  };

  const totalTypes = detailData.goodsList.length;
  const totalQty = detailData.goodsList.reduce((sum, g) => sum + g.applyReturnQty, 0);
  const totalAmount = detailData.goodsList.reduce((sum, g) => sum + (g.applyReturnQty * g.price), 0);

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in fade-in slide-in-from-right-10 duration-500">
      {/* Detail Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20 shrink-0">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
          >
            <svg className="w-5 h-5 text-slate-500 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-slate-800">退货单详情</h1>
              <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                {detailData.basic.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">{detailData.basic.returnNo}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
            打印单据
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            编辑单据
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        
        {/* Row 1: Basic & Supplier Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Info Card */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-2">
              <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
              <h3 className="text-sm font-bold text-slate-700">基本信息</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-y-4 gap-x-8">
              {[
                { label: '退货单编号', value: detailData.basic.returnNo, isMono: true },
                { label: '退货类型', value: detailData.basic.returnType },
                { label: '关联采购单', value: detailData.basic.purchaseNo, isLink: true },
                { label: '关联入库单', value: detailData.basic.stockInNo, isLink: true },
                { label: '申请日期', value: detailData.basic.applyDate },
                { label: '申请人', value: detailData.basic.applicant },
                { label: '审核人', value: detailData.basic.auditor },
                { label: '审核日期', value: detailData.basic.auditDate },
              ].map((field, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{field.label}</p>
                  <p className={`text-sm ${field.isLink ? 'text-indigo-600 font-bold hover:underline cursor-pointer' : 'text-slate-700 font-medium'} ${field.isMono ? 'font-mono' : ''}`}>
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Supplier Info Card */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-2">
              <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
              <h3 className="text-sm font-bold text-slate-700">供应商信息</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-y-4 gap-x-8">
               <div className="col-span-2 space-y-1">
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">供应商名称</p>
                  <p className="text-sm text-slate-700 font-bold">{detailData.supplier.name}</p>
               </div>
               {[
                 { label: '供应商编码', value: detailData.supplier.code, isMono: true },
                 { label: '联系人', value: detailData.supplier.contact },
                 { label: '联系电话', value: detailData.supplier.phone },
                 { label: '电子邮箱', value: detailData.supplier.email },
               ].map((field, idx) => (
                 <div key={idx} className="space-y-1">
                   <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{field.label}</p>
                   <p className={`text-sm text-slate-700 font-medium ${field.isMono ? 'font-mono' : ''}`}>{field.value}</p>
                 </div>
               ))}
               <div className="col-span-2 space-y-1">
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">收货地址</p>
                  <p className="text-sm text-slate-700 font-medium">{detailData.supplier.address}</p>
               </div>
            </div>
          </section>
        </div>

        {/* Row 2: Return Goods List */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
              <h3 className="text-sm font-bold text-slate-700">退货物料明细</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="bg-slate-50/80">
                <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4">物料信息</th>
                  <th className="px-4 py-4">采购/入库数</th>
                  <th className="px-4 py-4">申请退货数</th>
                  <th className="px-4 py-4">实际退货数</th>
                  <th className="px-4 py-4">退货单价</th>
                  <th className="px-4 py-4">退货金额</th>
                  <th className="px-6 py-4">质检/原因说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {detailData.goodsList.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{item.name}</span>
                        <span className="text-xs text-slate-400 font-mono mt-0.5">{item.code} | {item.model}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-600">采购: {item.purchaseQty} {item.unit}</span>
                        <span className="text-xs text-slate-400">入库: {item.stockInQty} {item.unit}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <span className="text-sm font-bold text-rose-600">{item.applyReturnQty}</span>
                    </td>
                    <td className="px-4 py-5">
                      <span className="text-sm font-medium text-slate-400">{item.actualReturnQty || '-'}</span>
                    </td>
                    <td className="px-4 py-5">
                      <span className="text-sm font-mono text-slate-600">¥{item.price.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-5">
                      <span className="text-sm font-bold text-slate-900">¥{(item.applyReturnQty * item.price).toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-5 max-w-xs">
                       <p className="text-[10px] text-rose-500 font-bold mb-1">{item.qcResult}</p>
                       <p className="text-xs text-slate-500 leading-relaxed italic">"{item.reason}"</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Goods Summary Bar */}
          <div className="bg-indigo-50/50 px-8 py-5 flex justify-end space-x-12 border-t border-indigo-100">
             <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-500 uppercase font-bold tracking-tighter">物料种类</span>
                <span className="text-lg font-bold text-indigo-700">{totalTypes}</span>
             </div>
             <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-500 uppercase font-bold tracking-tighter">申请总数量</span>
                <span className="text-lg font-bold text-indigo-700">{totalQty}</span>
             </div>
             <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-500 uppercase font-bold tracking-tighter">总退货金额</span>
                <span className="text-xl font-mono font-bold text-indigo-700">¥{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
             </div>
          </div>
        </section>

        {/* Row 3: Business Process Info */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Logistics & Warehouse */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-2">
              <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
              <h3 className="text-sm font-bold text-slate-700">物流与仓储</h3>
            </div>
            <div className="p-6 space-y-6 flex-1">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <p className="text-[10px] text-slate-400 font-bold uppercase">退货方式</p>
                     <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold">{detailData.process.method}</span>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] text-slate-400 font-bold uppercase">退货库位</p>
                     <span className="text-xs text-slate-700 font-bold">{detailData.process.warehouse.location}</span>
                  </div>
               </div>
               <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                     <span className="text-xs text-slate-500">物流公司</span>
                     <span className="text-xs font-bold text-slate-800">{detailData.process.logistics.company}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs text-slate-500">物流单号</span>
                     <span className="text-xs font-mono font-bold text-indigo-600 underline cursor-pointer">{detailData.process.logistics.no}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs text-slate-500">发货日期</span>
                     <span className="text-xs font-bold text-slate-800">{detailData.process.logistics.date}</span>
                  </div>
               </div>
            </div>
          </section>

          {/* Finance Information */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-2">
              <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
              <h3 className="text-sm font-bold text-slate-700">财务结算</h3>
            </div>
            <div className="p-6 space-y-6 flex-1">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <p className="text-[10px] text-slate-400 font-bold uppercase">退款状态</p>
                     <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                        detailData.process.finance.refundStatus === '全额退款' ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'
                     }`}>
                        {detailData.process.finance.refundStatus}
                     </span>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] text-slate-400 font-bold uppercase">发票处理</p>
                     <span className="text-xs text-slate-700 font-bold">{detailData.process.finance.invoice}</span>
                  </div>
               </div>
               <div className="p-4 bg-slate-900 rounded-xl space-y-4 shadow-lg shadow-slate-200">
                  <div className="flex justify-between items-center">
                     <span className="text-xs text-slate-400">已退款金额</span>
                     <span className="text-sm font-mono font-bold text-white">¥{detailData.process.finance.refundAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs text-slate-400">待退款余额</span>
                     <span className="text-lg font-mono font-bold text-rose-400">¥{(totalAmount - detailData.process.finance.refundAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
               </div>
            </div>
          </section>

          {/* Reason & Notes */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-2">
              <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
              <h3 className="text-sm font-bold text-slate-700">备注说明</h3>
            </div>
            <div className="p-6 space-y-4 flex-1 overflow-y-auto">
               <div className="space-y-1.5">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">全局退货原因</p>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 italic text-xs text-amber-800 leading-relaxed">
                     {detailData.process.globalReason}
                  </div>
               </div>
               <div className="space-y-1.5 pt-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">处理意见 (审核人)</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                     {detailData.process.opinion}
                  </p>
               </div>
            </div>
          </section>
        </div>

        {/* Row 4: Attachments & Additional Notes */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-2">
            <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
            <h3 className="text-sm font-bold text-slate-700">附件列表与特殊协商</h3>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="space-y-4">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">上传附件 ({detailData.attachments.length})</p>
                <div className="grid grid-cols-1 gap-2">
                   {detailData.attachments.map(att => (
                     <div key={att.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-colors group">
                        <div className="flex items-center space-x-3">
                           <div className="p-2 bg-white rounded-lg shadow-sm">
                              {att.type === '质检报告' ? (
                                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                              ) : (
                                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              )}
                           </div>
                           <div>
                              <p className="text-xs font-bold text-slate-700">{att.name}</p>
                              <p className="text-[9px] text-slate-400">{att.type} • {att.time}</p>
                           </div>
                        </div>
                        <button className="p-2 text-slate-300 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all">
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        </button>
                     </div>
                   ))}
                </div>
             </div>
             <div className="space-y-4 border-l border-slate-100 pl-8">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">特殊协商条款</p>
                <div className="p-6 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 min-h-[120px] flex flex-col justify-center">
                   <p className="text-sm text-slate-500 italic leading-relaxed">
                      "供应商承诺本批次退款将在退货单实际出库后7个工作日内到账。若退款延迟，下季度采购合作将重新评估..."
                   </p>
                   <div className="mt-4 flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">商务部 2026-01-09 签署</span>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </div>

      {/* Detail Footer */}
      <footer className="bg-white px-8 py-5 border-t border-slate-200 flex justify-between items-center shrink-0 shadow-inner z-20">
        <div className="flex items-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">当前操作:</span>
            <span className="font-bold text-slate-700 uppercase">查看详情</span>
          </div>
          <div className="h-4 w-px bg-slate-200"></div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">历史修订:</span>
            <span className="font-bold text-slate-700">v1.2 (2026-01-09 16:30)</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
             onClick={onClose}
             className="px-8 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
          >
            关闭详情
          </button>
        </div>
      </footer>
    </div>
  );
};
