
import React from 'react';
import { SalesContractItem } from '../constants';

interface SalesContractDetailProps {
  contract: SalesContractItem;
  onClose: () => void;
}

export const SalesContractDetail: React.FC<SalesContractDetailProps> = ({ contract, onClose }) => {
  // Integrated data based on provided JSON structure
  const detail = {
    contract_id: "CON-IR-2026-0001",
    seller_info: {
      company_name: "众成感应洁具装置有限公司",
      address: "中国XX省XX市XX区XX路XX号",
      contact: "张三",
      phone: "+86-XXX-XXXXXXX",
      tax_id: "91330201MA28XXXXXX",
      bank_info: {
        bank_name: "中国工商银行XX支行",
        account_no: "622202XXXXXXXXXXXXXXXX",
        swift_code: "ICBKCNBJ"
      }
    },
    buyer_info: {
      company_name: contract.customerName,
      address: "XXX Country, XXX City, XXX Street, XXX No.",
      contact: "John Doe",
      phone: "+XX-XXXXXXXX",
      tax_id: "TAX-BUYER-XXXXX",
      delivery_address: "XXX Country, XXX City, XXX Warehouse, XXX No."
    },
    sign_info: {
      date: "2026-01-10",
      place: "XX City, China",
      law: "中华人民共和国法律",
      language: "中英文版本具有同等法律效力"
    },
    product_info: {
      list: [
        {
          no: 1,
          model: "IR-SENSOR-001",
          name: "红外线感应开关",
          spec: "距离:5-8m / 电压:AC110-220V / 角度:120°",
          unit: "台",
          quantity: 1000,
          price: 10.00,
          currency: "USD",
          total: 10000.00
        }
      ],
      standard: "执行IEC 60838-2-1国际标准，抽检比例10%，合格率≥99.5%",
      packing: {
        inner: "防静电袋+泡沫缓冲",
        outer: "出口标准五层纸箱，毛重≤20kg/箱",
        mark: "品名:红外线感应开关;型号:IR-SENSOR-001;数量:50台/箱;目的地:XXX Port"
      }
    },
    performance: {
      lead_time: "收到预付款后30个工作日内完成生产",
      terms: "FOB 上海港",
      departure: "上海港",
      destination: "XXX 国际港口",
      transport: "海运",
      inspection: "货到目的港后15个工作日内完成验收；不合格品由卖方负责退换货。"
    },
    settlement: {
      payment: "30%预付款 + 70%尾款",
      advance: 3000.00,
      final: 7000.00,
      invoice: "提供商业发票3份、形式发票2份"
    },
    risks: [
      { type: "延期交货", rule: "每日按合同总价的0.5%支付违约金，最高5%" },
      { type: "延期付款", rule: "每日按逾期金额的0.3%支付利息" },
      { type: "纠纷处理", rule: "提交卖方所在地仲裁委员会仲裁" }
    ],
    attachments: [
      "红外线感应装置规格书", "第三方质检报告", "买卖双方营业执照复印件", "唛头样式确认单"
    ],
    erp_links: {
      order: "ORD-IR-2026-0001",
      work_order: "WO-IR-2026-0001",
      qc: "QC-IR-2026-0001",
      logistics: "LOG-IR-2026-0001"
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Detail Header */}
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
              <h1 className="text-xl font-black text-slate-800 tracking-tight">合同详情</h1>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest">已生效</span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5 tracking-tight">{detail.contract_id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            <span>打印预览</span>
          </button>
          <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            编辑合同
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Core Terms */}
          <div className="flex-1 space-y-8 min-w-0">
            
            {/* Section: Entities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Seller Card */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-2">
                  <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">卖方 (Seller)</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-tight mb-1">{detail.seller_info.company_name}</p>
                    <p className="text-xs text-slate-500 italic">{detail.seller_info.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">联系人</p>
                      <p className="text-xs font-bold text-slate-700">{detail.seller_info.contact}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">税号</p>
                      <p className="text-xs font-mono text-slate-600 truncate">{detail.seller_info.tax_id}</p>
                    </div>
                  </div>
                  <div className="bg-indigo-50/50 rounded-2xl p-4 space-y-2 border border-indigo-100/50">
                    <p className="text-[10px] text-indigo-400 font-black uppercase">收款银行信息</p>
                    <div className="text-xs space-y-1">
                      <p className="text-slate-700 font-bold">{detail.seller_info.bank_info.bank_name}</p>
                      <p className="font-mono text-indigo-600">{detail.seller_info.bank_info.account_no}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buyer Card */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-2">
                  <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">买方 (Buyer)</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-tight mb-1">{detail.buyer_info.company_name}</p>
                    <p className="text-xs text-slate-500 italic">{detail.buyer_info.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">授权代表</p>
                      <p className="text-xs font-bold text-slate-700">{detail.buyer_info.contact}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">联系电话</p>
                      <p className="text-xs font-mono text-slate-600">{detail.buyer_info.phone}</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-black uppercase">货物交付地址</p>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{detail.buyer_info.delivery_address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Products Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-5 bg-indigo-600 rounded-full"></div>
                  <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">产品明细与单价 (Price & Quantity)</h3>
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">共 1 项产品</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-slate-50/50">
                    <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                      <th className="px-8 py-4 w-12 text-center">#</th>
                      <th className="px-4 py-4">物料型号/名称</th>
                      <th className="px-4 py-4">技术规格摘要</th>
                      <th className="px-4 py-4 text-center">数量</th>
                      <th className="px-4 py-4 text-right">单价 ({detail.product_info.list[0].currency})</th>
                      <th className="px-8 py-4 text-right">小计 ({detail.product_info.list[0].currency})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {detail.product_info.list.map(p => (
                      <tr key={p.no} className="group">
                        <td className="px-8 py-5 text-center text-xs text-slate-400 font-mono">{p.no}</td>
                        <td className="px-4 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">{p.model}</span>
                            <span className="text-xs text-slate-500 font-medium">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-5 max-w-[200px]">
                          <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">{p.spec}</p>
                        </td>
                        <td className="px-4 py-5 text-center font-mono font-bold text-slate-700">{p.quantity} {p.unit}</td>
                        <td className="px-4 py-5 text-right font-mono font-bold text-slate-500">{p.price.toFixed(2)}</td>
                        <td className="px-8 py-5 text-right font-mono font-black text-indigo-700 text-lg">
                          {(p.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-slate-900 px-8 py-6 flex justify-end space-x-12 items-center">
                 <div className="text-right">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">合同总金额 (TOTAL)</p>
                    <span className="text-3xl font-mono font-black text-white">USD 10,000.00</span>
                 </div>
              </div>
            </div>

            {/* Section: Logistics & Settlement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-2">
                  <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">履约与交货条款</h3>
                </div>
                <div className="p-8 space-y-6">
                  {[
                    { label: '生产周期', value: detail.performance.lead_time },
                    { label: '交货贸易术语', value: detail.performance.terms, isBadge: true },
                    { label: '起运港 / 目的港', value: `${detail.performance.departure} → ${detail.performance.destination}` },
                    { label: '运输方式', value: detail.performance.transport },
                    { label: '验收说明', value: detail.performance.inspection, isItalic: true },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.label}</p>
                      {item.isBadge ? (
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg uppercase border border-indigo-100">{item.value}</span>
                      ) : (
                        <p className={`text-sm font-medium text-slate-700 ${item.isItalic ? 'italic text-slate-500' : ''}`}>{item.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-2">
                  <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">结算与财务要求</h3>
                </div>
                <div className="p-8 space-y-6">
                   <div className="space-y-3">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">支付进度比例</p>
                      <div className="flex h-8 w-full rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                         <div className="bg-indigo-600 w-[30%] flex items-center justify-center text-[10px] font-black text-white">30% ADV.</div>
                         <div className="bg-slate-100 w-[70%] flex items-center justify-center text-[10px] font-bold text-slate-400 tracking-widest uppercase">70% FINAL</div>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100/50">
                         <p className="text-[9px] text-indigo-400 font-bold uppercase mb-1">预付金额 (USD)</p>
                         <p className="text-lg font-mono font-black text-indigo-700">3,000.00</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">尾款余额 (USD)</p>
                         <p className="text-lg font-mono font-black text-slate-600">7,000.00</p>
                      </div>
                   </div>
                   <div className="space-y-4 pt-4 border-t border-slate-50">
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">结汇要求</p>
                        <p className="text-sm font-bold text-slate-700">{detail.settlement.payment}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">单据要求</p>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">{detail.settlement.invoice}</p>
                      </div>
                   </div>
                </div>
              </section>
            </div>
          </div>

          {/* Right Column: Status, Attachments & ERP Context */}
          <div className="w-full lg:w-96 space-y-8">
            
            {/* Signing Metadata */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
              <div className="flex items-center space-x-2">
                 <div className="w-1.5 h-4 bg-slate-400 rounded-full"></div>
                 <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">签约属性</h3>
              </div>
              <div className="space-y-4">
                 {[
                   { label: '签署日期', value: detail.sign_info.date, isMono: true },
                   { label: '签署地点', value: detail.sign_info.place },
                   { label: '适用法律', value: detail.sign_info.law },
                   { label: '语言效力', value: detail.sign_info.language },
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center text-xs">
                     <span className="text-slate-400 font-bold uppercase tracking-widest">{item.label}</span>
                     <span className={`text-slate-700 font-bold ${item.isMono ? 'font-mono' : ''}`}>{item.value}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* ERP Business Linkage */}
            <div className="bg-slate-900 rounded-3xl shadow-xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-indigo-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">ERP 流程追踪</h3>
                </div>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                 {[
                   { label: '销售订单', id: detail.erp_links.order, color: 'text-indigo-400' },
                   { label: '生产工单', id: detail.erp_links.work_order, color: 'text-amber-400' },
                   { label: '质检批号', id: detail.erp_links.qc, color: 'text-emerald-400' },
                   { label: '出运记录', id: detail.erp_links.logistics, color: 'text-rose-400' },
                 ].map((link, i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer group">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{link.label}</span>
                      <span className={`text-[11px] font-mono font-black ${link.color} group-hover:underline`}>{link.id}</span>
                   </div>
                 ))}
              </div>
              <div className="mt-4 p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                 <p className="text-[10px] text-indigo-300 italic text-center">系统已自动关联全部下游业务模块</p>
              </div>
            </div>

            {/* Attachments Section */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
              <div className="flex items-center space-x-2">
                 <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
                 <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest">合同附件列表 ({detail.attachments.length})</h3>
              </div>
              <div className="space-y-3">
                 {detail.attachments.map((att, i) => (
                   <div key={i} className="flex items-center space-x-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl group cursor-pointer hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-slate-700 truncate tracking-tight">{att}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">PDF • 已签名</p>
                      </div>
                      <button className="text-slate-300 group-hover:text-indigo-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      </button>
                   </div>
                 ))}
              </div>
            </div>

            {/* Risk Warning Box */}
            <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 space-y-4">
               <div className="flex items-center space-x-2 text-rose-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <span className="text-xs font-black uppercase tracking-widest">违约风险提示</span>
               </div>
               <div className="space-y-3">
                  {detail.risks.slice(0, 2).map((risk, i) => (
                    <div key={i} className="space-y-1">
                       <p className="text-[10px] font-black text-rose-700">{risk.type}</p>
                       <p className="text-[11px] text-rose-500 leading-relaxed italic">"{risk.rule}"</p>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Detail Footer */}
      <footer className="bg-white px-8 py-5 border-t border-slate-200 flex justify-between items-center shrink-0 shadow-inner z-30">
        <div className="flex items-center space-x-12">
           <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">建立人</span>
              <span className="text-xs font-bold text-slate-700">{contract.creatorName} ({contract.creatorCode})</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">建立时间</span>
              <span className="text-xs font-mono text-slate-700">2026-01-10 14:30</span>
           </div>
        </div>
        <div className="flex items-center space-x-4">
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
