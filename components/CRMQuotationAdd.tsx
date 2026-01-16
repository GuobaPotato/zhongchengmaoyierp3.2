
import React, { useState, useMemo } from 'react';
import { ProductSelectorModal } from './ProductSelectorModal';
import { InventoryItem } from '../types';

interface QuotationDetail {
  id: string;
  name: string;
  code: string;
  attr: string;
  spec: string;
  stock: number;
  qty: number;
  unit: string;
  priceWithTax: number;
  vatRate: number;
  costPrice: number; // For margin calculation
}

interface CRMQuotationAddProps {
  onClose: () => void;
}

// Helper: Convert number to Chinese financial uppercase
const toChineseAmount = (num: number): string => {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j++) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
};

export const CRMQuotationAdd: React.FC<CRMQuotationAddProps> = ({ onClose }) => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const [formData, setFormData] = useState({
    customer: "杭州众林科技有限公司",
    customerCode: "KH230420-03",
    contact: "高启盛",
    phone: "18888888885",
    date: "2026-01-12",
    lead: "王丽",
    quoteNo: "BJ-" + Date.now().toString().slice(-8),
    warehouse: "成品仓"
  });

  const [items, setItems] = useState<QuotationDetail[]>([
    {
      id: "1",
      name: "智能小便器A001",
      code: "A001",
      attr: "成品",
      spec: "BH-GW-R8",
      stock: 97,
      qty: 100,
      unit: "套",
      priceWithTax: 379.00,
      vatRate: 13,
      costPrice: 280.00 // 模拟成本
    }
  ]);

  const handleProductSelect = (selectedProducts: InventoryItem[]) => {
    const newItems: QuotationDetail[] = selectedProducts.map((p, idx) => ({
      id: (items.length + idx + 1).toString(),
      name: p.name,
      code: p.id,
      attr: "成品",
      spec: p.type,
      stock: p.stock,
      qty: 1,
      unit: "套",
      priceWithTax: p.price,
      vatRate: 13,
      costPrice: p.price * 0.75 // 模拟利润率
    }));
    setItems([...items, ...newItems]);
    setIsProductModalOpen(false);
  };

  const updateItemQty = (id: string, qty: number) => {
    setItems(items.map(item => item.id === id ? { ...item, qty: qty } : item));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Calculations
  const originalTotal = useMemo(() => items.reduce((acc, curr) => acc + (curr.qty * curr.priceWithTax), 0), [items]);
  const orderTotal = Math.max(0, originalTotal - discount);
  const discountRate = originalTotal > 0 ? (orderTotal / originalTotal) * 100 : 100;
  
  const totalExclTax = useMemo(() => {
    return items.reduce((acc, curr) => {
      // 简单比例法分摊折扣后的单行不含税金额
      const rowOriginal = curr.qty * curr.priceWithTax;
      const rowDiscounted = originalTotal > 0 ? rowOriginal * (orderTotal / originalTotal) : 0;
      return acc + (rowDiscounted / (1 + curr.vatRate / 100));
    }, 0);
  }, [items, orderTotal, originalTotal]);

  const totalCost = useMemo(() => items.reduce((acc, curr) => acc + (curr.qty * curr.costPrice), 0), [items]);
  const marginRate = orderTotal > 0 ? ((orderTotal - totalCost) / orderTotal) * 100 : 0;

  const isMarginAlert = marginRate < 14;

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-32">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <nav className="flex text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span>CRM</span>
          <span className="mx-2">/</span>
          <span>报价单管理</span>
          <span className="mx-2">/</span>
          <span className="text-indigo-600">添加报价单</span>
        </nav>
        <div className="flex items-center justify-between">
           <h1 className="text-2xl font-black text-slate-800 tracking-tight">新增报价单 (New Quotation)</h1>
           <div className="flex items-center space-x-2 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100">
              <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-[10px] font-bold text-amber-700">说明：报价单仅作为销售订单的源数据，可通过关联数据配置。</p>
           </div>
        </div>
      </div>

      {/* 1. 客户基本信息 */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">一、客户基本信息</h3>
        </div>
        <div className="p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
           <FormItem label="报价单编码">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 italic" value="（待选择数据）" />
           </FormItem>
           <FormItem label="*选择客户" required>
              <div className="relative group cursor-pointer">
                <input 
                  type="text" 
                  readOnly
                  placeholder="选择数据"
                  className="w-full bg-slate-50 border border-indigo-100 rounded-xl px-4 py-2.5 text-sm font-bold text-indigo-700 outline-none focus:ring-4 focus:ring-indigo-50 cursor-pointer transition-all"
                  value={formData.customer}
                />
                <div className="absolute right-3 top-2.5 text-indigo-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
                </div>
              </div>
           </FormItem>
           <FormItem label="客户名称">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800" value={formData.customer} />
           </FormItem>
           <FormItem label="客户编码">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm font-mono text-slate-500" value={formData.customerCode} />
           </FormItem>
           <FormItem label="客户联系人姓名">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-700" value={formData.contact} />
           </FormItem>
           <FormItem label="客户联系人手机">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm font-mono text-slate-700" value={formData.phone} />
           </FormItem>
           <FormItem label="报价日期">
              <input type="date" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
           </FormItem>
           <FormItem label="销售负责人">
              <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700" value={formData.lead} onChange={e => setFormData({...formData, lead: e.target.value})} />
           </FormItem>
           <FormItem label="报价单编号" tips="自动生成无需填写">
              <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm font-mono text-slate-400 italic" value={formData.quoteNo} />
           </FormItem>
        </div>
      </section>

      {/* 2. 报价单明细 */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-3">
              <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">二、报价单明细</h3>
            </div>
            <p className="text-[10px] text-rose-500 font-bold ml-4">风险预警：毛利须低于 14%，否则不允以通过审核！</p>
          </div>
          <div className="flex space-x-3">
             <FormItem label="" noLabel>
                <div className="flex items-center space-x-2 mr-6">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">出库存仓:</span>
                   <select className="bg-slate-100 border-none rounded-lg px-3 py-1.5 text-xs font-black text-slate-700 outline-none">
                      <option>成品仓</option>
                      <option>原料仓</option>
                   </select>
                </div>
             </FormItem>
             <button className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100">快速填设</button>
             <button 
               onClick={() => setIsProductModalOpen(true)}
               className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
             >
               + 添加产品
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[2400px] text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4 w-12 text-center">序号</th>
                <th className="px-4 py-4">产品基础信息</th>
                <th className="px-4 py-4">属性/规格</th>
                <th className="px-4 py-4 text-right">当前库存</th>
                <th className="px-6 py-4 text-right bg-indigo-50/50 font-black text-indigo-700 w-40">*销售数量</th>
                <th className="px-4 py-4 text-center">单位</th>
                <th className="px-6 py-4 text-right bg-indigo-50/50 font-black text-indigo-700 w-40">销售单价(含税)/元</th>
                <th className="px-4 py-4 text-center">增值税%</th>
                <th className="px-4 py-4 text-right">单价(不含税)</th>
                <th className="px-4 py-4 text-right">合计(含税)</th>
                <th className="px-6 py-4 text-right bg-indigo-50/50 font-black text-indigo-700 w-40">实际售价(含税)</th>
                <th className="px-4 py-4 text-right text-indigo-600 font-black">实际合计(含税)</th>
                <th className="px-4 py-4 text-right">实际售价(不含税)</th>
                <th className="px-8 py-4 text-right">实际合计(不含税)</th>
                <th className="px-4 py-4 w-12 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {items.map((item, idx) => {
                const totalRowTax = item.qty * item.priceWithTax;
                const priceExclTax = item.priceWithTax / (1 + item.vatRate / 100);
                // 实际销售（假设无单行特定优惠，由整单分摊，此处展示原始数据供修改）
                const actualTotalTax = totalRowTax; 
                
                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-5 text-xs text-slate-300 font-mono text-center">{idx + 1}</td>
                    <td className="px-4 py-5">
                       <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-800">{item.name}</span>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">{item.code}</span>
                       </div>
                    </td>
                    <td className="px-4 py-5">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-lg w-fit mb-1 uppercase tracking-tighter">{item.attr}</span>
                          <span className="text-xs text-slate-500 font-medium italic">{item.spec}</span>
                       </div>
                    </td>
                    <td className="px-4 py-5 text-right font-mono font-bold text-slate-400">{item.stock}</td>
                    <td className="px-6 py-5 bg-indigo-50/20 text-right">
                       <input 
                         type="number" 
                         className="w-full bg-white border border-indigo-100 rounded-lg px-3 py-1.5 text-right text-sm font-black text-indigo-700 focus:ring-4 focus:ring-indigo-100 outline-none shadow-sm transition-all"
                         value={item.qty}
                         onChange={e => updateItemQty(item.id, parseFloat(e.target.value) || 0)}
                       />
                    </td>
                    <td className="px-4 py-5 text-center">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">{item.unit}</span>
                    </td>
                    <td className="px-6 py-5 bg-indigo-50/20 text-right">
                       <input 
                         type="number" 
                         className="w-full bg-white border border-indigo-100 rounded-lg px-3 py-1.5 text-right text-sm font-black text-indigo-700 focus:ring-4 focus:ring-indigo-100 outline-none shadow-sm transition-all"
                         value={item.priceWithTax}
                         onChange={e => {
                            const next = [...items];
                            next[idx].priceWithTax = parseFloat(e.target.value) || 0;
                            setItems(next);
                         }}
                       />
                    </td>
                    <td className="px-4 py-5 text-center text-[10px] font-mono font-bold text-slate-400">{item.vatRate}%</td>
                    <td className="px-4 py-5 text-right font-mono text-sm text-slate-500">¥{priceExclTax.toFixed(2)}</td>
                    <td className="px-4 py-5 text-right font-mono text-sm text-slate-500 font-bold">¥{totalRowTax.toLocaleString()}</td>
                    <td className="px-6 py-5 bg-indigo-50/20 text-right">
                       <input 
                         type="number" 
                         className="w-full bg-white border border-indigo-100 rounded-lg px-3 py-1.5 text-right text-sm font-black text-indigo-700 focus:ring-4 focus:ring-indigo-100 outline-none shadow-sm transition-all"
                         value={item.priceWithTax}
                         readOnly
                       />
                    </td>
                    <td className="px-4 py-5 text-right font-mono text-sm font-black text-indigo-600">¥{actualTotalTax.toLocaleString()}</td>
                    <td className="px-4 py-5 text-right font-mono text-xs text-slate-400">¥{priceExclTax.toFixed(2)}</td>
                    <td className="px-8 py-5 text-right font-mono text-xs text-slate-400">¥{(actualTotalTax / (1 + item.vatRate / 100)).toLocaleString()}</td>
                    <td className="px-4 py-5 text-center">
                       <button 
                         onClick={() => removeItem(item.id)}
                         className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                       >
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                       </button>
                    </td>
                  </tr>
                );
              })}
              {items.length === 0 && (
                <tr>
                  <td colSpan={15} className="px-8 py-16 text-center text-slate-300 italic text-sm font-medium">尚未选择产品，请点击右上角“添加产品”</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. 报价汇总与风险控制 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
         <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">三、报价财务汇总 (Aggregation)</h3>
            </div>
            <div className="p-10 space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormItem label="销售原价总额(含税)/元">
                     <div className="bg-slate-900 border-none rounded-2xl px-6 py-4 text-2xl font-black font-mono text-indigo-400 shadow-lg">
                        {originalTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                     </div>
                  </FormItem>
                  <FormItem label="*优惠金额/元 (按总额比例分摊)">
                     <div className="relative group">
                        <span className="absolute left-4 top-3.5 text-slate-400 font-black">¥</span>
                        <input 
                           type="number" 
                           className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-lg font-black text-slate-800 focus:ring-4 focus:ring-indigo-50 outline-none transition-all shadow-inner"
                           value={discount}
                           onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                        />
                     </div>
                  </FormItem>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <SummaryStat label="整单折扣率" value={`${discountRate.toFixed(2)}%`} sub="订单/原价" />
                  <SummaryStat label="销售订单金额(含税)" value={`¥${orderTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} isBold />
                  <SummaryStat label="销售订单金额(不含税)" value={`¥${totalExclTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
               </div>

               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">合计金额大写 (Uppercase Amount)</span>
                  <p className="text-sm font-black text-slate-700">{toChineseAmount(orderTotal)}</p>
               </div>
            </div>
         </section>

         {/* 风险预警卡片 */}
         <section className={`bg-white rounded-[2.5rem] border-4 shadow-2xl p-10 flex flex-col space-y-8 h-full transition-all duration-500 ${isMarginAlert ? 'border-rose-200 ring-rose-50 ring-[12px]' : 'border-emerald-100 ring-emerald-50/50 ring-[12px]'}`}>
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full animate-ping ${isMarginAlert ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                  <h3 className={`text-sm font-black uppercase tracking-widest ${isMarginAlert ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {isMarginAlert ? '毛利红线预警 (CRITICAL RISK)' : '报价毛利评估 (SAFE)'}
                  </h3>
               </div>
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Real-time Margin Analysis</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6 flex-1 py-10">
               <div className="relative">
                  <svg className="w-48 h-48 rotate-[-90deg]">
                     <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                     <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 88} 
                        strokeDashoffset={2 * Math.PI * 88 * (1 - Math.min(100, Math.max(0, marginRate)) / 100)}
                        className={`${isMarginAlert ? 'text-rose-500' : 'text-indigo-600'} transition-all duration-1000 ease-out`}
                        strokeLinecap="round"
                     />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className={`text-4xl font-black font-mono tracking-tighter ${isMarginAlert ? 'text-rose-600' : 'text-indigo-900'}`}>{marginRate.toFixed(2)}%</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">Gross Margin</span>
                  </div>
               </div>

               <div className="text-center space-y-2">
                  <p className={`text-sm font-black ${isMarginAlert ? 'text-rose-700' : 'text-slate-800'}`}>
                    {isMarginAlert ? "当前毛利低于公司规定的 14% 底线！" : "报价毛利符合经营要求，准予发起流程。"}
                  </p>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm">
                    计算公式：(销售订单金额(含税) - 产品成本总额) / 销售订单金额(含税)
                  </p>
               </div>

               {isMarginAlert && (
                 <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100 animate-pulse w-full">
                    <div className="flex items-center space-x-3 text-rose-800">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                       <span className="text-[11px] font-black uppercase tracking-widest">限制提交 (Submission Restricted)</span>
                    </div>
                 </div>
               )}
            </div>
         </section>
      </div>

      {/* Footer Sticky Button */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 py-6 px-10 flex justify-end items-center z-[60] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         <div className="flex-1 flex items-center space-x-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-emerald-600">Calculations Validated</span>
            </div>
            <div className="h-4 w-px bg-slate-200"></div>
            <span>ERP v3.1 CRM_QUOTATION_SYSTEM</span>
         </div>
         <div className="flex items-center space-x-4">
            <button onClick={onClose} className="px-10 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">保存草稿</button>
            <button 
              disabled={isMarginAlert || items.length === 0}
              className={`px-20 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95 ${
                !isMarginAlert && items.length > 0
                  ? 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              提交报价单
            </button>
         </div>
      </footer>

      {/* Product Selector Modal */}
      {isProductModalOpen && (
        <ProductSelectorModal 
          onSelect={handleProductSelect}
          onClose={() => setIsProductModalOpen(false)}
        />
      )}
    </div>
  );
};

/* --- Internal Components --- */

const FormItem: React.FC<{ label: string; required?: boolean; tips?: string; noLabel?: boolean; children: React.ReactNode }> = ({ label, required, tips, noLabel, children }) => (
  <div className="space-y-3">
    {!noLabel && (
      <div className="flex justify-between items-center px-1">
        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center">
          {label}
          {required && <span className="text-rose-500 ml-1.5 font-black">*</span>}
        </label>
        {tips && <span className="text-[9px] text-slate-300 italic font-bold uppercase">{tips}</span>}
      </div>
    )}
    {children}
  </div>
);

const SummaryStat: React.FC<{ label: string; value: string; sub?: string; isBold?: boolean }> = ({ label, value, sub, isBold }) => (
  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col space-y-1">
    <div className="flex justify-between items-center">
       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
       {sub && <span className="text-[9px] font-bold text-slate-300">{sub}</span>}
    </div>
    <span className={`text-lg font-mono tracking-tighter ${isBold ? 'text-indigo-600 font-black text-xl' : 'text-slate-800 font-bold'}`}>{value}</span>
  </div>
);
