
import React, { useState } from 'react';

interface OrderTrackingDetailProps {
  orderNo: string;
  onClose: () => void;
}

// Fixed: Moved helper components to the top to avoid hoisting issues and ensure they are defined before usage.
// Using standard function syntax for sub-components is more robust in TSX environments.
const DetailItem = ({ 
  label, 
  value, 
  isMono, 
  isBold, 
  isBadge, 
  isItalic, 
  color, 
  isOwner 
}: { 
  label: string; 
  value: string; 
  isMono?: boolean; 
  isBold?: boolean; 
  isBadge?: boolean; 
  isItalic?: boolean; 
  color?: string;
  isOwner?: boolean;
}) => (
  <div className="space-y-2 group/item">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover/item:text-indigo-400 transition-colors">{label}</label>
    <div className="flex items-center min-w-0">
      {isOwner && <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-white text-[9px] font-black mr-2">李</div>}
      <div className={`text-sm truncate ${color || 'text-slate-700'} ${isBold ? 'font-black tracking-tight' : 'font-bold'} ${isMono ? 'font-mono' : ''} ${isItalic ? 'italic text-slate-300' : ''} ${isBadge ? 'px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[9px] font-black uppercase tracking-tighter border border-indigo-100/50' : ''}`}>
        {value || '--'}
      </div>
    </div>
  </div>
);

const SummaryStat = ({ 
  label, 
  value, 
  color 
}: { 
  label: string; 
  value: string | number; 
  color?: string 
}) => (
  <div className="flex flex-col items-end">
    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</span>
    <span className={`text-xl font-black font-mono tracking-tighter ${color || 'text-white'}`}>{value}</span>
  </div>
);

export const OrderTrackingDetail: React.FC<OrderTrackingDetailProps> = ({ orderNo, onClose }) => {
  const [activeTab, setActiveTab] = useState('订单基础信息');

  const tabs = [
    "订单基础信息", "商品明细", "物流跟踪", "收款记录", 
    "费用明细", "沟通记录", "附件", "操作记录"
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end animate-in fade-in duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>

      {/* Main Container */}
      <div className="bg-slate-50 w-full max-w-[95vw] h-full shadow-2xl relative flex flex-col overflow-hidden animate-in slide-in-from-right duration-500 border-l border-slate-200">
        
        {/* 1. 顶部信息栏 */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-50 shrink-0">
          <div className="flex items-center space-x-8">
            <div className="flex flex-col">
              <div className="flex items-center space-x-3">
                 <h1 className="text-2xl font-black text-slate-800 tracking-tight">订单详情：EC2025001</h1>
                 <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg uppercase tracking-widest border border-indigo-100">执行中</span>
              </div>
              <div className="flex items-center space-x-6 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span className="flex items-center"><svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>客户: Global Tech Inc.</span>
                <span className="flex items-center"><svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>合同日期: 2025-01-09</span>
                <span className="flex items-center text-rose-500"><svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>交货日期: 2025-02-15</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">编辑</button>
            <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">导出</button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </header>

        {/* 2. 标签页导航栏 */}
        <nav className="bg-white border-b border-slate-100 px-8 flex shrink-0 sticky top-[72px] z-40 overflow-x-auto scrollbar-hide shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-5 text-sm font-black transition-all relative uppercase tracking-widest whitespace-nowrap flex items-center group ${
                activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
              {tab === '操作记录' && <span className="ml-2 w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
            </button>
          ))}
        </nav>

        {/* 3. 标签页内容区 */}
        <div className="flex-1 overflow-y-auto bg-slate-50/30">
          <div className="max-w-[1600px] mx-auto p-8 space-y-8 pb-32">
            
            {activeTab === '订单基础信息' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                 <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                       <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                       <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">基本信息</h3>
                    </div>
                    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-20">
                       <DetailItem label="外销合同号" value="EC2025001" isMono isBold />
                       <DetailItem label="客户订单号" value="PO-ABC-001" isMono />
                       <DetailItem label="客户名称" value="Global Tech Inc." isBold />
                       <DetailItem label="成交方式" value="FOB" isBadge />
                       <DetailItem label="币别" value="USD" isBadge />
                       <DetailItem label="交货日期" value="2025-02-15" isMono color="text-rose-500" />
                       <DetailItem label="业务员编号" value="S001" isMono />
                       <DetailItem label="业务员名称" value="李业务" />
                       <DetailItem label="外销金额" value="50,000.00" isBold color="text-indigo-600" />
                       <DetailItem label="合同数量" value="10000" isBold />
                       <DetailItem label="订单类型" value="大货" isBadge />
                    </div>
                 </section>

                 <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                       <div className="w-1.5 h-6 bg-slate-400 rounded-full"></div>
                       <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">系统信息</h3>
                    </div>
                    <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
                       <DetailItem label="创建方式" value="新建" />
                       <DetailItem label="跟进人" value="李业务" />
                       <DetailItem label="跟进次数" value="8" isBadge />
                       <DetailItem label="最近更新时间" value="2025-01-10 09:20" isMono />
                       <DetailItem label="创建时间" value="2025-01-09 14:30" isMono />
                       <DetailItem label="更新时间" value="2025-01-10 09:20" isMono />
                       <DetailItem label="数据来源" value="手工录入" />
                       <DetailItem label="订单状态" value="执行中" color="text-amber-500" isBold />
                       <DetailItem label="审核状态" value="已审核" color="text-emerald-500" isBold />
                    </div>
                 </section>
              </div>
            )}

            {activeTab === '商品明细' && (
              <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col animate-in fade-in duration-500">
                 <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                       <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                       <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">商品明细列表</h3>
                    </div>
                    <button className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">编辑商品明细</button>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                       <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                          <tr>
                             <th className="px-8 py-4">中文货名</th>
                             <th className="px-4 py-4 text-right">合同数量</th>
                             <th className="px-4 py-4 text-right">计划数量</th>
                             <th className="px-4 py-4 text-right">出运数量</th>
                             <th className="px-4 py-4 font-mono">国际货运单号</th>
                             <th className="px-4 py-4">起运港</th>
                             <th className="px-4 py-4">目的港</th>
                             <th className="px-8 py-4 text-right">运输方式</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50 transition-colors group">
                             <td className="px-8 py-5 text-sm font-black text-slate-800">红外线传感器5R501</td>
                             <td className="px-4 py-5 text-right font-mono font-bold text-slate-400">1</td>
                             <td className="px-4 py-5 text-right font-mono font-black text-indigo-600">10,000</td>
                             <td className="px-4 py-5 text-right font-mono font-black text-slate-300">0</td>
                             <td className="px-4 py-5 text-xs font-mono text-slate-300 italic">--</td>
                             <td className="px-4 py-5 text-xs font-bold text-slate-600">青岛港</td>
                             <td className="px-4 py-5 text-xs font-bold text-slate-600">鹿特丹</td>
                             <td className="px-8 py-5 text-right">
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-black rounded uppercase">Sea freight</span>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
                 <div className="px-8 py-5 bg-slate-900 flex justify-end space-x-10 items-center">
                    <SummaryStat label="商品总数" value="1" />
                    <SummaryStat label="总合同数量" value="10000" />
                    <SummaryStat label="已备货数量" value="10000" color="text-emerald-400" />
                    <SummaryStat label="未出运数量" value="10000" color="text-rose-400" />
                 </div>
              </section>
            )}

            {activeTab === '物流跟踪' && (
              <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col animate-in fade-in duration-500">
                 <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                       <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                       <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">物流节点追踪</h3>
                    </div>
                    <button className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">添加物流信息</button>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                       <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                          <tr>
                             <th className="px-8 py-4">物流节点</th>
                             <th className="px-4 py-4">操作时间</th>
                             <th className="px-4 py-4">操作人</th>
                             <th className="px-4 py-4">货运单号</th>
                             <th className="px-4 py-4">方式</th>
                             <th className="px-4 py-4">状态</th>
                             <th className="px-4 py-4 max-w-xs">备注</th>
                             <th className="px-8 py-4 text-right">操作</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50 transition-colors group">
                             <td className="px-8 py-5">
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-lg uppercase tracking-widest border border-emerald-100">备货完成</span>
                             </td>
                             <td className="px-4 py-5 text-xs font-mono text-slate-400">2025-01-12 16:00</td>
                             <td className="px-4 py-5 text-xs font-bold text-slate-700">王仓库</td>
                             <td className="px-4 py-5 text-xs font-mono text-slate-300 italic">--</td>
                             <td className="px-4 py-5 text-[10px] font-black text-slate-400 uppercase">Sea freight</td>
                             <td className="px-4 py-5 text-[10px] font-black text-emerald-600 uppercase">已完成</td>
                             <td className="px-4 py-5 text-xs text-slate-500 italic leading-relaxed">商品已全部备货入库，等待订舱</td>
                             <td className="px-8 py-5 text-right space-x-3">
                                <button className="text-[10px] font-black text-indigo-600 hover:underline uppercase tracking-tighter">编辑</button>
                                <button className="text-[10px] font-black text-rose-500 hover:underline uppercase tracking-tighter">删除</button>
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
                 <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex justify-end space-x-10 items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>物流节点总数: <span className="text-slate-800 ml-1">1</span></span>
                    <span>待执行节点: <span className="text-indigo-600 ml-1">3（订舱、装柜、出运）</span></span>
                 </div>
              </section>
            )}

            {activeTab === '收款记录' && (
              <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col animate-in fade-in duration-500">
                 <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                       <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                       <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">财务收款明细</h3>
                    </div>
                    <div className="flex space-x-3">
                       <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">导出</button>
                       <button className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">提交审核</button>
                    </div>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                       <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                          <tr>
                             <th className="px-8 py-4">收款单号</th>
                             <th className="px-4 py-4 text-right">金额(USD)</th>
                             <th className="px-4 py-4">收款日期</th>
                             <th className="px-4 py-4">方式</th>
                             <th className="px-4 py-4">收款状态</th>
                             <th className="px-4 py-4">回款/剩下</th>
                             <th className="px-4 py-4 text-center">审核状态</th>
                             <th className="px-4 py-4">操作人</th>
                             <th className="px-8 py-4">备注</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50 transition-colors group">
                             <td className="px-8 py-5 text-xs font-mono font-black text-indigo-600">SKD-2025-0001</td>
                             <td className="px-4 py-5 text-right font-mono font-black text-slate-800">25,000.00</td>
                             <td className="px-4 py-5 text-xs font-mono text-slate-400">2025-01-10 10:15</td>
                             <td className="px-4 py-5 text-xs font-bold text-slate-600">电汇</td>
                             <td className="px-4 py-5 text-[10px] font-black text-emerald-600 uppercase">已收款</td>
                             <td className="px-4 py-5 text-[10px] font-mono font-bold text-slate-400">12,500/12,500</td>
                             <td className="px-4 py-5 text-center">
                                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-black rounded uppercase tracking-tighter">已审核</span>
                             </td>
                             <td className="px-4 py-5 text-xs font-bold text-slate-700">张财务</td>
                             <td className="px-8 py-5 text-xs text-slate-400 italic">预收50%定金</td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
                 <div className="px-8 py-5 bg-slate-900 flex justify-end space-x-12 items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <span>累计收款: <span className="text-emerald-400 ml-1">USD 12500.00</span></span>
                    <span>未收款: <span className="text-rose-400 ml-1">USD 12500.00</span></span>
                    <span>收款完成率: <span className="text-indigo-400 ml-1 text-base">50%</span></span>
                 </div>
              </section>
            )}

            {activeTab === '费用明细' && (
              <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col animate-in fade-in duration-500">
                 <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                       <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                       <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">相关费用明细</h3>
                    </div>
                    <div className="flex space-x-3">
                       <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">导出</button>
                       <button className="px-4 py-1.5 bg-white border border-indigo-200 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all">+ 添加费用</button>
                       <button className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg">提交审核</button>
                    </div>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                       <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                          <tr>
                             <th className="px-8 py-4">费用类型</th>
                             <th className="px-4 py-4 text-right">金额(CNY)</th>
                             <th className="px-4 py-4">发生日期</th>
                             <th className="px-4 py-4 text-center">审核状态</th>
                             <th className="px-4 py-4 text-center">付款状态</th>
                             <th className="px-4 py-4">经手人</th>
                             <th className="px-8 py-4">备注</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50 transition-colors group">
                             <td className="px-8 py-5 text-sm font-black text-slate-800">海运费</td>
                             <td className="px-4 py-5 text-right font-mono font-black text-indigo-600">2,000.00</td>
                             <td className="px-4 py-5 text-xs font-mono text-slate-400">2025-01-11</td>
                             <td className="px-4 py-5 text-center">
                                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-400 text-[9px] font-black rounded uppercase tracking-tighter">未审核</span>
                             </td>
                             <td className="px-4 py-5 text-center">
                                <span className="px-2.5 py-0.5 bg-rose-50 text-rose-600 text-[9px] font-black rounded uppercase tracking-tighter">未付款</span>
                             </td>
                             <td className="px-4 py-5 text-xs font-bold text-slate-700">王立</td>
                             <td className="px-8 py-5 text-xs text-slate-400 italic leading-relaxed">订单海运费</td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
                 <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex justify-end space-x-12 items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>费用总项: <span className="text-slate-800 ml-1">1</span></span>
                    <span>累计费用金额: <span className="text-indigo-600 ml-1 text-base font-mono">¥ 2000.00</span></span>
                    <span>已付款: <span className="text-emerald-600 ml-1 font-mono">¥ 0.00</span></span>
                 </div>
              </section>
            )}

            {activeTab === '沟通记录' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                 {/* 发布区 */}
                 <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
                    <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-wrap items-center gap-6">
                       <div className="flex items-center space-x-3">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">类型</span>
                          <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-black focus:ring-2 focus:ring-indigo-500 outline-none pr-10 appearance-none">
                             <option>请选择</option>
                             <option>邮件沟通</option>
                             <option>电话沟通</option>
                          </select>
                       </div>
                       <div className="flex items-center space-x-3 border-l border-slate-200 pl-6">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">下次联系</span>
                          <div className="flex items-center space-x-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-black">
                             <input type="text" placeholder="2025-02-08 10:00" className="bg-transparent outline-none w-32" />
                             <button className="text-indigo-600 hover:text-indigo-800 text-[9px] uppercase font-bold tracking-widest">选择时间</button>
                          </div>
                       </div>
                       <div className="flex-1"></div>
                       <div className="flex items-center space-x-4">
                          <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-black text-slate-500 outline-none">
                             <option>选择模板</option>
                             <option>备货确认</option>
                          </select>
                          <button className="text-slate-400 hover:text-indigo-600 transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></button>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <textarea 
                      className="w-full min-h-[140px] bg-slate-50 border border-slate-100 rounded-[2rem] p-8 text-sm focus:ring-4 focus:ring-indigo-100 focus:bg-white outline-none transition-all resize-none shadow-inner"
                      placeholder="发布一条订单跟进记录(使用ctrl+v可直接粘贴图片)..."
                    ></textarea>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-4">
                          <button className="p-3 bg-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all shadow-sm"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></button>
                          <button className="p-3 bg-slate-100 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all shadow-sm"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></button>
                          <div className="h-6 w-px bg-slate-100 mx-2"></div>
                          <label className="flex items-center space-x-2 cursor-pointer group">
                             <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                             <span className="text-[10px] font-black text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-widest">存为记录模板</span>
                          </label>
                       </div>
                       <button className="px-12 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl active:scale-95">发布记录</button>
                    </div>
                  </div>
               </div>

               {/* 沟通记录列表区 */}
               <div className="space-y-6">
                  <div className="flex items-center px-4">
                     <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">沟通记录历史 (1)</h3>
                  </div>
                  <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 hover:border-indigo-200 transition-all group relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-10 -mr-12 -mt-12 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="relative flex justify-between items-start mb-8">
                        <div className="flex items-center space-x-5">
                           <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">李</div>
                           <div>
                              <div className="flex items-center space-x-3">
                                 <span className="text-sm font-black text-slate-800">李业务</span>
                                 <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded uppercase tracking-widest">邮件沟通</span>
                                 <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-black rounded uppercase tracking-widest">订单备货确认</span>
                              </div>
                              <p className="text-[11px] text-slate-400 font-mono mt-1 font-bold tracking-tight">2025-01-10 11:30</p>
                           </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">下次联系</span>
                           <span className="text-xs font-mono font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl ring-4 ring-indigo-50/30">2025-02-08 10:00</span>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <div className="bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100 italic text-slate-600 text-sm leading-relaxed font-medium">
                           “ 与 Global Tech Inc. 确认红外线传感器 5R501 已备货完成，告知预计 2 月 10 日订舱，客户无异议。 ”
                        </div>
                     </div>
                     <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="flex space-x-8">
                           <p>记录模板: <span className="text-indigo-600 ml-1">订单备货沟通</span></p>
                           <p>附件: <span className="text-slate-300 ml-1 italic">--</span></p>
                        </div>
                        <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-all">
                           <button className="text-indigo-600 hover:underline">编辑</button>
                           <button className="text-rose-500 hover:underline">删除</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === '附件' && (
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col animate-in fade-in duration-500">
               <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex flex-col">
                     <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center">
                        附件文档管理
                        <span className="ml-2 text-slate-400 font-bold lowercase tracking-normal text-xs italic">（点击标题可预览）</span>
                     </h3>
                  </div>
                  <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">上传附件</button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-separate border-spacing-0">
                     <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                        <tr>
                           <th className="px-8 py-4">附件名称</th>
                           <th className="px-4 py-4">上传人</th>
                           <th className="px-4 py-4">上传时间</th>
                           <th className="px-4 py-4">大小</th>
                           <th className="px-4 py-4">关联业务</th>
                           <th className="px-4 py-4">类型</th>
                           <th className="px-8 py-4 text-right">操作</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-indigo-50/20 transition-colors group">
                           <td className="px-8 py-6">
                              <div className="flex items-center space-x-3">
                                 <div className="bg-rose-50 p-2 rounded-lg">
                                    <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                 </div>
                                 <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors cursor-pointer">订单确认函_EC2025001.pdf</span>
                              </div>
                           </td>
                           <td className="px-4 py-6 text-xs font-bold text-slate-600">李业务</td>
                           <td className="px-4 py-6 text-xs font-mono text-slate-400">2025-01-09 15:00</td>
                           <td className="px-4 py-6 text-xs font-black text-slate-400 uppercase">850KB</td>
                           <td className="px-4 py-6">
                              <span className="text-xs text-slate-500 font-mono tracking-tight">外销合同（EC2025001）</span>
                           </td>
                           <td className="px-4 py-6">
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-black rounded uppercase tracking-tighter">文档</span>
                           </td>
                           <td className="px-8 py-6 text-right whitespace-nowrap">
                              <div className="flex justify-end space-x-4 opacity-0 group-hover:opacity-100 transition-all">
                                 <button className="text-[11px] font-black text-indigo-600 hover:underline uppercase tracking-widest">预览</button>
                                 <button className="text-[11px] font-black text-slate-400 hover:underline uppercase tracking-widest">下载</button>
                                 <button className="text-[11px] font-black text-rose-500 hover:underline uppercase tracking-widest">删除</button>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div className="px-8 py-5 bg-slate-900 flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <div className="flex space-x-12">
                     <span>附件总数: <span className="text-white ml-1 font-mono text-base">1</span></span>
                     <span>累计文件大小: <span className="text-indigo-400 ml-1 font-mono text-base">850KB</span></span>
                  </div>
                  <div className="flex space-x-12">
                     <span>文档类: <span className="text-white ml-1 font-mono">1 个</span></span>
                     <span>图片类: <span className="text-white ml-1 font-mono">0 个</span></span>
                  </div>
               </div>
            </section>
          )}

          {activeTab === '操作记录' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div className="flex items-center space-x-3 px-4">
                  {["全部", "操作记录", "跟进记录"].map(chip => (
                    <button key={chip} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${chip === '全部' ? 'bg-slate-800 text-white shadow-lg' : 'bg-white text-slate-400 hover:bg-slate-100'}`}>{chip}</button>
                  ))}
               </div>
               <div className="relative space-y-2 ml-4 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
                  <div className="relative flex items-center space-x-8 group pb-8">
                     <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white border-2 border-slate-200 shrink-0 z-10 group-hover:border-indigo-600 transition-all">
                        <div className="h-2.5 w-2.5 rounded-full bg-indigo-600 animate-pulse"></div>
                     </div>
                     <div className="flex-1 bg-white p-8 rounded-3xl border border-slate-200 group-hover:border-indigo-100 group-hover:shadow-md transition-all flex items-center justify-between">
                        <div className="space-y-1">
                           <div className="flex items-center space-x-3">
                              <p className="text-sm font-black text-slate-800">录入 收款记录 SKD-2025-0001</p>
                           </div>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">01月10日 10:20</p>
                        </div>
                        <div className="flex items-center space-x-3 text-right">
                           <div className="space-y-0.5">
                              <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">张财务</p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase">Finance Team</p>
                           </div>
                           <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-400">张</div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="text-center py-12">
                  <p className="text-[10px] font-black text-slate-200 uppercase tracking-[0.4em]">已经到底了 / BOTTOM REACHED</p>
               </div>
            </div>
          )}

          {/* 右侧悬浮模块示意 (实际标签页已包含这些逻辑) */}
        </div>
      </div>

      {/* Global Footer (Sticky) */}
      <footer className="bg-white border-t border-slate-200 px-10 py-6 flex justify-between items-center shrink-0 shadow-inner z-50">
        <div className="flex items-center space-x-12">
           <div className="flex items-center space-x-3 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Data Sync Normal</span>
           </div>
           <div className="h-6 w-px bg-slate-100"></div>
           <span className="text-[9px] font-black text-slate-400 uppercase italic tracking-widest">Sensor ERP v3.1 | Cross-Module Tracking System</span>
        </div>
        <div className="flex items-center space-x-4">
           <button 
             onClick={onClose}
             className="px-12 py-3 bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
           >
             关闭详情
           </button>
        </div>
      </footer>
    </div>
  );
};
