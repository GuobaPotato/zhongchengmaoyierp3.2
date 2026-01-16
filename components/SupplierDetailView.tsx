
import React, { useState } from 'react';
import { SupplierItem } from '../constants';

interface SupplierDetailViewProps {
  supplier: SupplierItem;
  onClose: () => void;
}

export const SupplierDetailView: React.FC<SupplierDetailViewProps> = ({ supplier, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Extended mock data for detail view
  const detailData = {
    basic: {
      code: `SUP-NB-EL-${supplier.id.padStart(4, '0')}`,
      fullName: supplier.name,
      shortName: supplier.name.replace('有限公司', '').replace('科技厂', ''),
      socialCode: '91330201MA28XXXXXX',
      taxId: '330201MA28XXXXXX',
      regAddress: supplier.address,
      opAddress: supplier.address,
      foundDate: '2015-06-12',
      regCapital: '500.00',
      corpType: '一般纳税人',
      industry: '电子元器件',
      bizScope: '高精度压力传感器、红外感应模块及注塑配件的生产与销售。'
    },
    contact: {
      primary: supplier.contact,
      phone: supplier.phone,
      backup: '陈助理',
      backupPhone: '135XXXX9999',
      email: 'sales@sensor-supplier.com',
      fax: '0574-XXXX1234',
      wechat: 'wxid_sensortech_01'
    },
    capacity: {
      core: supplier.category,
      cycle: '7-10个工作日',
      moq: '500个',
      warranty: '12个月',
      capacityDesc: '月产能50万套，拥有12条全自动SMT生产线。',
      storage: '支持代储，提供2000平米恒温仓储。'
    },
    products: [
      { id: 'PRO-S01-01', name: '红外感应模块IR-001', specs: '5V/探测距离5m', category: '核心产品', unit: '个', price: 15.8, expiry: '2026-12-31', isMain: true, status: '有库存' },
      { id: 'PRO-S01-02', name: '超声波探头US-X', specs: '40KHz/高灵敏度', category: '常规产品', unit: '个', price: 8.5, expiry: '2026-12-31', isMain: false, status: '有库存' },
      { id: 'PRO-S01-03', name: '定制感应底座', specs: 'SUS304/抛光', category: '定制产品', unit: '套', price: 45.0, expiry: '2026-06-30', isMain: true, status: '可定制' },
    ],
    evaluation: {
      quality: 98,
      delivery: 95,
      service: 90,
      composite: 96,
      rating: 'A',
      records: [
        { reviewer: '赵采购', date: '2025-12-20', content: 'Q4交付准时率98%，质量抽检合格率99%。', advice: '继续保持核心件供应优先级。' }
      ]
    },
    business: {
      totalAmount: 1258400.00,
      recentYearAmount: 452000.00,
      orderCount: 156,
      returns: [
        { id: 'RT-20251101', date: '2025-11-01', amount: 1500.00, reason: '规格小概率不符' }
      ],
      exceptions: [
        { type: '延期交付', date: '2025-08-15', result: '补货并下调交付评分' }
      ]
    },
    attachments: [
      { type: '营业执照', name: 'business_license_2025.pdf', date: '2025-01-10', expiry: '2028-12-31' },
      { type: '质检报告', name: 'QC_Report_IR_Module.pdf', date: '2025-11-20', expiry: '2026-11-20' },
    ]
  };

  const tabs = [
    { id: 'overview', name: '概览与档案' },
    { id: 'products', name: '供应产品表' },
    { id: 'performance', name: '绩效评估' },
    { id: 'records', name: '合作记录' },
    { id: 'attachments', name: '资质附件' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in fade-in slide-in-from-right-8 duration-500 overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between shrink-0 shadow-sm z-30">
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
              <h1 className="text-xl font-extrabold text-slate-800">{supplier.name}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                detailData.evaluation.rating === 'A' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {detailData.evaluation.rating}级供应商
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5 tracking-tight">{detailData.basic.code}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">导出档案</button>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">编辑档案</button>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-slate-100 px-8 flex shrink-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-bold transition-all relative ${
              activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.name}
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        
        {activeTab === 'overview' && (
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
            {/* Basic Info Section */}
            <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                <div className="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
                <h3 className="text-sm font-bold text-slate-700">工商档案信息</h3>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-12">
                {[
                  { label: '供应商编码', value: detailData.basic.code, isMono: true },
                  { label: '企业全称', value: detailData.basic.fullName, isBold: true },
                  { label: '业务简称', value: detailData.basic.shortName },
                  { label: '信用代码', value: detailData.basic.socialCode, isMono: true },
                  { label: '纳税识别号', value: detailData.basic.taxId, isMono: true },
                  { label: '注册资本', value: `¥${detailData.basic.regCapital} 万元` },
                  { label: '企业类型', value: detailData.basic.corpType },
                  { label: '成立日期', value: detailData.basic.foundDate },
                  { label: '所属行业', value: detailData.basic.industry },
                  { label: '经营地址', value: detailData.basic.opAddress, colSpan: 3 },
                  { label: '经营范围', value: detailData.basic.bizScope, colSpan: 4 },
                ].map((field, idx) => (
                  <div key={idx} className={`space-y-1.5 ${field.colSpan ? `lg:col-span-${field.colSpan}` : ''}`}>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{field.label}</p>
                    <div className={`text-sm ${field.isBold ? 'font-bold text-slate-900' : 'text-slate-700'} ${field.isMono ? 'font-mono tracking-tight' : ''}`}>
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact & Capacity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                  <div className="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-sm font-bold text-slate-700">商务联络信息</h3>
                </div>
                <div className="p-8 grid grid-cols-2 gap-6">
                  {[
                    { label: '主联系人', value: detailData.contact.primary, isBold: true },
                    { label: '联系电话', value: detailData.contact.phone, isMono: true },
                    { label: '电子邮箱', value: detailData.contact.email },
                    { label: '微信号', value: detailData.contact.wechat },
                    { label: '备用联系人', value: detailData.contact.backup },
                    { label: '传真号码', value: detailData.contact.fax },
                  ].map((field, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{field.label}</p>
                      <div className={`text-sm ${field.isBold ? 'font-bold text-slate-900' : 'text-slate-700'} ${field.isMono ? 'font-mono' : ''}`}>
                        {field.value}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                  <div className="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-sm font-bold text-slate-700">供货能力概况</h3>
                </div>
                <div className="p-8 grid grid-cols-2 gap-6">
                  {[
                    { label: '核心品类', value: detailData.capacity.core, isBold: true },
                    { label: '供货周期', value: detailData.capacity.cycle },
                    { label: '最小起订', value: detailData.capacity.moq },
                    { label: '质保期', value: detailData.capacity.warranty },
                    { label: '仓储物流', value: detailData.capacity.storage, colSpan: 2 },
                  ].map((field, idx) => (
                    <div key={idx} className={`space-y-1.5 ${field.colSpan ? `col-span-${field.colSpan}` : ''}`}>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{field.label}</p>
                      <div className={`text-sm text-slate-700 leading-relaxed`}>
                        {field.value}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
             <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
                    <h3 className="text-sm font-bold text-slate-700">供应产品表</h3>
                  </div>
                  <div className="flex space-x-10">
                     <div className="flex flex-col items-center">
                        <span className="text-xl font-bold text-slate-800">{detailData.products.length}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">总产品数</span>
                     </div>
                     <div className="flex flex-col items-center">
                        <span className="text-xl font-bold text-indigo-600">{detailData.products.filter(p => p.isMain).length}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">主推产品</span>
                     </div>
                  </div>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead className="bg-slate-50">
                     <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                       <th className="px-8 py-4">产品编码/名称</th>
                       <th className="px-4 py-4">规格型号</th>
                       <th className="px-4 py-4 text-center">类别</th>
                       <th className="px-4 py-4 text-right">参考单价</th>
                       <th className="px-4 py-4 text-center">状态</th>
                       <th className="px-4 py-4">有效期</th>
                       <th className="px-8 py-4 text-right">操作</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                     {detailData.products.map(p => (
                       <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                         <td className="px-8 py-5">
                            <div className="flex items-center space-x-3">
                               {p.isMain && <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>}
                               <div className="flex flex-col">
                                 <span className="text-sm font-bold text-slate-800">{p.name}</span>
                                 <span className="text-[10px] text-slate-400 font-mono mt-0.5">{p.id}</span>
                               </div>
                            </div>
                         </td>
                         <td className="px-4 py-5 text-sm text-slate-600">{p.specs}</td>
                         <td className="px-4 py-5 text-center whitespace-nowrap">
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">{p.category}</span>
                         </td>
                         <td className="px-4 py-5 text-right font-mono font-bold text-slate-900">¥{p.price.toFixed(2)}</td>
                         <td className="px-4 py-5 text-center">
                            <span className={`text-[10px] font-bold ${p.status === '有库存' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'} px-2 py-0.5 rounded`}>
                              {p.status}
                            </span>
                         </td>
                         <td className="px-4 py-5 text-xs text-slate-400 font-mono">{p.expiry}</td>
                         <td className="px-8 py-5 text-right">
                            <button className="text-indigo-600 text-xs font-bold hover:underline">详情</button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </section>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Score Cards */}
                <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex items-center justify-around">
                   {[
                     { label: '质量评分', score: detailData.evaluation.quality, color: 'text-green-600', bg: 'bg-green-100' },
                     { label: '交付评分', score: detailData.evaluation.delivery, color: 'text-indigo-600', bg: 'bg-indigo-100' },
                     { label: '服务评分', score: detailData.evaluation.service, color: 'text-amber-600', bg: 'bg-amber-100' },
                   ].map((score, i) => (
                     <div key={i} className="flex flex-col items-center space-y-4">
                        <div className={`w-24 h-24 rounded-full ${score.bg} flex items-center justify-center relative overflow-hidden`}>
                           <div className="absolute bottom-0 left-0 right-0 bg-white/20" style={{ height: `${score.score}%` }}></div>
                           <span className={`text-2xl font-black ${score.color}`}>{score.score}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{score.label}</span>
                     </div>
                   ))}
                </div>
                
                {/* Composite Rating */}
                <div className="bg-slate-900 rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center text-center">
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">综合评估评级</span>
                   <div className="text-7xl font-black text-white mb-2">{detailData.evaluation.rating}</div>
                   <div className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Composite Score: {detailData.evaluation.composite}</div>
                </div>
             </div>

             {/* Evaluation History */}
             <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                  <div className="w-1.5 h-5 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-sm font-bold text-slate-700">评价历史记录</h3>
                </div>
                <div className="p-8 space-y-6">
                   {detailData.evaluation.records.map((rec, i) => (
                     <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                        <div className="flex justify-between items-center">
                           <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">{rec.reviewer.charAt(0)}</div>
                              <span className="text-sm font-bold text-slate-800">{rec.reviewer}</span>
                           </div>
                           <span className="text-[10px] text-slate-400 font-mono uppercase">{rec.date}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">“ {rec.content} ”</p>
                        <div className="pt-3 border-t border-slate-200 flex items-start space-x-2">
                           <span className="text-[10px] font-bold text-indigo-600 uppercase mt-0.5 shrink-0">整改建议:</span>
                           <span className="text-xs text-slate-500 italic">{rec.advice}</span>
                        </div>
                     </div>
                   ))}
                </div>
             </section>
          </div>
        )}

        {activeTab === 'records' && (
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: '累计采购金额', value: `¥${detailData.business.totalAmount.toLocaleString()}`, color: 'text-indigo-600' },
                  { label: '近12月金额', value: `¥${detailData.business.recentYearAmount.toLocaleString()}`, color: 'text-slate-800' },
                  { label: '采购订单总数', value: `${detailData.business.orderCount} 笔`, color: 'text-slate-800' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">{stat.label}</p>
                     <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                   <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                     <div className="w-1.5 h-5 bg-rose-500 rounded-full"></div>
                     <h3 className="text-sm font-bold text-slate-700">退货历史记录</h3>
                   </div>
                   <div className="p-0">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                           <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                              <th className="px-8 py-4">退货单号</th>
                              <th className="px-4 py-4">日期</th>
                              <th className="px-4 py-4 text-right">退货金额</th>
                              <th className="px-8 py-4">原因描述</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                           {detailData.business.returns.map(ret => (
                             <tr key={ret.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-4 text-xs font-mono font-bold text-indigo-600">{ret.id}</td>
                                <td className="px-4 py-4 text-xs text-slate-500">{ret.date}</td>
                                <td className="px-4 py-4 text-right text-xs font-bold text-rose-600 font-mono">¥{ret.amount.toFixed(2)}</td>
                                <td className="px-8 py-4 text-xs text-slate-500 truncate max-w-[150px]">{ret.reason}</td>
                             </tr>
                           ))}
                        </tbody>
                      </table>
                   </div>
                </section>

                <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                   <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                     <div className="w-1.5 h-5 bg-amber-500 rounded-full"></div>
                     <h3 className="text-sm font-bold text-slate-700">业务异常反馈</h3>
                   </div>
                   <div className="p-0">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                           <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                              <th className="px-8 py-4">异常类型</th>
                              <th className="px-4 py-4 text-center">日期</th>
                              <th className="px-8 py-4">处理结果与闭环</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                           {detailData.business.exceptions.map((ex, i) => (
                             <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-4">
                                   <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded uppercase">{ex.type}</span>
                                </td>
                                <td className="px-4 py-4 text-center text-xs text-slate-500 font-mono">{ex.date}</td>
                                <td className="px-8 py-4 text-xs text-slate-600 font-medium leading-relaxed">{ex.result}</td>
                             </tr>
                           ))}
                        </tbody>
                      </table>
                   </div>
                </section>
             </div>
          </div>
        )}

        {activeTab === 'attachments' && (
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {detailData.attachments.map((att, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col group hover:shadow-lg transition-all border-l-4 border-l-indigo-500">
                     <div className="flex justify-between items-start mb-6">
                        <div className="bg-indigo-50 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                           <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                           </svg>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          new Date(att.expiry) < new Date() ? 'bg-rose-100 text-rose-600' : 'bg-green-100 text-green-600'
                        }`}>
                           {new Date(att.expiry) < new Date() ? '已过期' : '有效期内'}
                        </span>
                     </div>
                     <h4 className="text-sm font-bold text-slate-800 mb-1">{att.name}</h4>
                     <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-6">{att.type}</p>
                     
                     <div className="mt-auto space-y-3 pt-6 border-t border-slate-50">
                        <div className="flex justify-between items-center text-[10px]">
                           <span className="text-slate-400 font-bold uppercase">截止日期:</span>
                           <span className="text-slate-700 font-mono font-bold">{att.expiry}</span>
                        </div>
                        <button className="w-full py-2 bg-slate-50 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                           下载附件
                        </button>
                     </div>
                  </div>
                ))}
                
                {/* Upload Placeholder */}
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer hover:bg-slate-100 transition-all min-h-[220px]">
                   <div className="p-3 bg-white rounded-2xl shadow-sm text-slate-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                   </div>
                   <span className="text-sm font-bold text-slate-400">上传新资质文件</span>
                </div>
             </div>

             <section className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                <div className="relative z-10 flex flex-col space-y-4">
                   <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">合作策略备忘录</span>
                   </div>
                   <p className="text-sm leading-relaxed text-indigo-100 max-w-2xl italic">
                      “ 优先供货供应商。根据2026年年度对标协议，该公司承诺在原材料市场价格浮动范围5%内不调整我方供货单价。重大节假日需提前30天完成备货入库。 ”
                   </p>
                </div>
             </section>
          </div>
        )}

      </div>

      {/* Footer Info Area */}
      <footer className="bg-white px-8 py-5 border-t border-slate-200 flex justify-between items-center shrink-0 z-30 shadow-inner">
        <div className="flex items-center space-x-12">
           <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400 uppercase tracking-wider font-bold">建档人员:</span>
              <span className="text-slate-800 font-bold">{supplier.creator}</span>
           </div>
           <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400 uppercase tracking-wider font-bold">最后更新:</span>
              <span className="text-slate-800 font-mono">{supplier.updatedAt}</span>
           </div>
        </div>
        <div className="flex space-x-4">
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
