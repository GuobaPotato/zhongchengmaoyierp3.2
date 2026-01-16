
import React from 'react';

interface CRMQuotationDetailProps {
  orderNo: string;
  onClose: () => void;
  onEdit: () => void;
}

export const CRMQuotationDetail: React.FC<CRMQuotationDetailProps> = ({ orderNo, onClose, onEdit }) => {
  // Mock Data based on spec
  const data = {
    basic: {
      no: orderNo,
      date: "2026-01-07 11:22",
      warehouse: "成品库",
      salesLead: "刘**",
      submitter: "刘",
      submitTime: "2026-01-12 21:09:30",
      updateTime: "2026-01-12 21:09:30",
      flowStatus: "进行中",
      currentNode: "商务审批",
      currentAssignee: "王",
      approvalResult: "-",
      approvalTime: "-",
      approver: "王",
      rejectionReason: "-"
    },
    customer: {
      name: "Kohler采购单",
      code: "20260107-0001",
      contact: "高启盛",
      phone: "18832157548",
      email: "-",
      address: "-"
    },
    products: [
      {
        code: "SP20260101",
        name: "卫浴五金配件",
        spec: "KL-001",
        unit: "件",
        qty: 500,
        price: 85.00,
        amount: 42500.00,
        taxRate: 13,
        totalWithTax: 47925.00,
        remark: "常规报价，有效期30天"
      }
    ],
    logs: [
      { time: "2026-01-12 21:09:30", person: "刘", type: "提交", content: "提交报价单BJ20260113至商务审批节点", remark: "-" },
      { time: "2026-01-07 11:22", person: "刘**", type: "创建", content: "创建报价单BJ20260113", remark: "初始录入客户及商品信息" }
    ]
  };

  return (
    <div className="flex flex-col h-full space-y-8 animate-in slide-in-from-right duration-500 pb-20">
      {/* 1. 顶部操作区 */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onClose}
            className="p-2.5 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-indigo-600"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">报价单详情（{data.basic.no}）</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={onEdit}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
          >
            编辑报价单
          </button>
          <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
            导出
          </button>
          <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
            打印
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2. 报价单基础信息区 */}
        <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">基础信息</h3>
          </div>
          <div className="p-10 grid grid-cols-1 gap-y-5">
             <DetailRow label="报价单编号" value={data.basic.no} isMono />
             <DetailRow label="报价日期" value={data.basic.date} isMono />
             <DetailRow label="出库仓库" value={data.basic.warehouse} />
             <DetailRow label="销售负责人" value={data.basic.salesLead} />
             <DetailRow label="提交人" value={data.basic.submitter} />
             <DetailRow label="提交时间" value={data.basic.submitTime} isMono />
             <DetailRow label="更新时间" value={data.basic.updateTime} isMono />
             <DetailRow 
               label="流程状态" 
               value={data.basic.flowStatus} 
               customValue={<span className="text-amber-500 font-black">{data.basic.flowStatus}</span>} 
             />
             <DetailRow label="当前节点" value={data.basic.currentNode} />
             <DetailRow label="当前负责人" value={data.basic.currentAssignee} />
             <DetailRow label="审批结果" value={data.basic.approvalResult} />
             <DetailRow label="审批时间" value={data.basic.approvalTime} />
             <DetailRow label="审批人" value={data.basic.approver} />
             <DetailRow label="不通过原因" value={data.basic.rejectionReason} />
          </div>
        </section>

        {/* 3. 客户信息区 */}
        <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">客户信息</h3>
          </div>
          <div className="p-10 grid grid-cols-1 gap-y-5">
             <DetailRow label="客户名称" value={data.customer.name} isBold />
             <DetailRow label="客户编码" value={data.customer.code} isMono />
             <DetailRow label="客户联系人姓名" value={data.customer.contact} />
             <DetailRow label="客户联系人手机" value={data.customer.phone} isMono />
             <DetailRow label="客户联系邮箱" value={data.customer.email} />
             <DetailRow label="客户地址" value={data.customer.address} />
          </div>
          {/* 这里可以作为背景点缀 */}
          <div className="mt-auto p-10 bg-slate-50 flex flex-col items-center justify-center opacity-30 select-none pointer-events-none">
             <svg className="w-20 h-20 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] mt-4">CRM Profile</span>
          </div>
        </section>
      </div>

      {/* 4. 报价商品明细区 */}
      <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">报价商品明细</h3>
          </div>
          <button className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100">
            编辑商品明细
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                <th className="px-8 py-4">商品编码</th>
                <th className="px-4 py-4">商品名称</th>
                <th className="px-4 py-4">规格型号</th>
                <th className="px-4 py-4 text-center">单位</th>
                <th className="px-4 py-4 text-right">报价数量</th>
                <th className="px-4 py-4 text-right">单价（元）</th>
                <th className="px-4 py-4 text-right">金额（元）</th>
                <th className="px-4 py-4 text-center">税率(%)</th>
                <th className="px-4 py-4 text-right">含税金额（元）</th>
                <th className="px-8 py-4">备注</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.products.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5 text-sm font-mono text-slate-500">{p.code}</td>
                  <td className="px-4 py-5 text-sm font-black text-slate-800">{p.name}</td>
                  <td className="px-4 py-5 text-sm text-slate-500 font-medium">{p.spec}</td>
                  <td className="px-4 py-5 text-center text-xs font-bold text-slate-400 uppercase">{p.unit}</td>
                  <td className="px-4 py-5 text-right font-mono font-bold text-slate-700">{p.qty.toLocaleString()}</td>
                  <td className="px-4 py-5 text-right font-mono font-bold text-slate-700">¥{p.price.toFixed(2)}</td>
                  <td className="px-4 py-5 text-right font-mono font-black text-slate-900">¥{p.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                  <td className="px-4 py-5 text-center font-mono font-bold text-slate-400">{p.taxRate}%</td>
                  <td className="px-4 py-5 text-right font-mono font-black text-indigo-600">¥{p.totalWithTax.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                  <td className="px-8 py-5 text-xs text-slate-400 italic">{p.remark}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-indigo-50/30">
               <tr className="font-black text-sm text-indigo-900">
                  <td colSpan={4} className="px-8 py-6 text-right uppercase tracking-widest text-[10px] text-indigo-400">合计 (TOTAL)</td>
                  <td className="px-4 py-6 text-right font-mono">500</td>
                  <td className="px-4 py-6 text-right"></td>
                  <td className="px-4 py-6 text-right font-mono underline decoration-indigo-200">¥42,500.00</td>
                  <td className="px-4 py-6"></td>
                  <td className="px-4 py-6 text-right font-mono text-lg underline decoration-indigo-400 decoration-2">¥47,925.00</td>
                  <td className="px-8 py-6"></td>
               </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* 5. 操作日志区 */}
      <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-slate-400 rounded-full"></div>
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">操作日志</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 font-black text-[10px] text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">操作时间</th>
                <th className="px-4 py-4 text-center">操作人</th>
                <th className="px-4 py-4 text-center">操作类型</th>
                <th className="px-4 py-4">操作内容</th>
                <th className="px-8 py-4">备注</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 text-xs font-mono text-slate-400 font-bold">{log.time}</td>
                  <td className="px-4 py-5 text-center">
                     <div className="flex items-center justify-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 border border-slate-200">{log.person.charAt(0)}</div>
                        <span className="text-sm font-bold text-slate-700">{log.person}</span>
                     </div>
                  </td>
                  <td className="px-4 py-5 text-center">
                     <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter ${
                       log.type === '提交' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-600'
                     }`}>
                       {log.type}
                     </span>
                  </td>
                  <td className="px-4 py-5 text-xs font-medium text-slate-600">{log.content}</td>
                  <td className="px-8 py-5 text-xs text-slate-300 italic">{log.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

/* --- 内部辅助组件 --- */

const DetailRow: React.FC<{ label: string; value: string; isBold?: boolean; isMono?: boolean; isItalic?: boolean; customValue?: React.ReactNode }> = ({ label, value, isBold, isMono, isItalic, customValue }) => (
  <div className="flex justify-between items-center group/row">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <div className={`text-sm ${isBold ? 'font-black text-slate-800' : 'font-bold text-slate-600'} ${isMono ? 'font-mono tracking-tight' : ''} ${isItalic ? 'italic text-slate-300' : ''}`}>
      {customValue || value}
    </div>
  </div>
);
