
import React, { useState } from 'react';

interface CarrierDetailProps {
  carrierNo: string;
  onClose: () => void;
}

export const CarrierDetail: React.FC<CarrierDetailProps> = ({ carrierNo, onClose }) => {
  const [activeTab, setActiveTab] = useState('货代维护');

  const tabs = ["货代维护", "承运商产品", "出运单关联", "操作记录", "上传附件", "货代联系人表", "货代银行表"];

  // Mock data based on spec
  const carrierData = {
    basic: {
      no: "HY-2026001",
      shortName: "XX国际物流",
      fullName: "XX国际物流有限公司",
      address: "上海市浦东新区XX路XX号XX大厦",
      phone: "021-XXXXXXX",
      website: "www.xxx-logistics.com",
      scope: "国际海运、空运代理，报关报检，仓储服务",
      taxId: "91310115XXXXXXXXXX",
      status: "合作中"
    },
    shippingStats: {
      total: 28,
      thisMonth: 5,
      pending: 3,
      completed: 25
    },
    shippingOrders: [
      { id: 1, no: "OUT-20260110-001", type: "海运拼箱", origin: "上海港", dest: "洛杉矶港", name: "电子产品", qty: "5CBM", date: "2026-01-10", eta: "2026-02-05", status: "运输中" },
      { id: 2, no: "OUT-20260105-002", type: "空运", origin: "上海浦东机场", dest: "新加坡樟宜机场", name: "服装", qty: "1200KG", date: "2026-01-05", eta: "2026-01-08", status: "已完成" },
      { id: 3, no: "OUT-20260115-003", type: "陆运", origin: "上海", dest: "杭州", name: "办公用品", qty: "50件", date: "2026-01-15", eta: "2026-01-16", status: "待发货" }
    ],
    meta: {
      updateTime: "2026-01-15 14:30:25",
      updateUserCode: "EMP-008",
      updateUserName: "张三",
      createTime: "2026-01-01 09:15:30",
      createUserCode: "EMP-001",
      createUserName: "李四",
      moduleNo: "4",
      lastAction: "修改货代联系电话"
    },
    auditLogs: [
      { time: "2026-01-15 14:30:25", user: "张三", type: "修改", content: "更新网址" },
      { time: "2026-01-01 09:15:30", user: "李四", type: "新增", content: "创建承运商信息" }
    ],
    contacts: [
      { id: 1, name: "王五", phone: "138XXXXXXXX", fax: "021-XXXXXXX", email: "wangwu@xxx.com", gender: "男", birthday: "1990-05-10" },
      { id: 2, name: "赵六", phone: "139XXXXXXXX", fax: "021-XXXXXXX", email: "zhaoliu@xxx.com", gender: "女", birthday: "1992-08-15" }
    ],
    banks: [
      { id: 1, bank: "中国工商银行XX支行", account: "6222XXXXXXXXXXXX", name: "XX国际物流有限公司", currency: "人民币", isDefault: "是" }
    ]
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* 顶部标题栏 */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-40 shrink-0 shadow-sm">
        <div className="flex items-center space-x-6">
          <button onClick={onClose} className="p-2.5 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-indigo-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">承运商详情</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5 tracking-tight">{carrierData.basic.no}-{carrierData.basic.shortName}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50">编辑</button>
          <button onClick={onClose} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50">返回列表</button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50">导出详情</button>
          <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100">设置合作状态</button>
        </div>
      </header>

      {/* 标签页导航 */}
      <nav className="bg-white border-b border-slate-100 px-8 flex shrink-0 sticky top-[72px] z-30 overflow-x-auto scrollbar-hide shadow-sm">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-5 text-sm font-black transition-all relative uppercase tracking-widest whitespace-nowrap flex items-center group ${
              activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
          </button>
        ))}
      </nav>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto p-8 space-y-8 pb-32">
          
          {activeTab === '货代维护' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in duration-300">
               <section className="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden p-10">
                  <div className="flex items-center space-x-3 mb-10">
                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">基础信息</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                     <DetailRow label="货代编号" value={carrierData.basic.no} isBold isMono />
                     <DetailRow label="货代简称" value={carrierData.basic.shortName} />
                     <DetailRow label="货代名称" value={carrierData.basic.fullName} />
                     <DetailRow label="合作状态" value={carrierData.basic.status} isBadge color="bg-emerald-50 text-emerald-700 border-emerald-100" />
                     <DetailRow label="联系电话" value={carrierData.basic.phone} isMono />
                     <DetailRow label="官方网址" value={carrierData.basic.website} isLink />
                     <DetailRow label="纳税人识别号" value={carrierData.basic.taxId} isMono />
                     <div className="md:col-span-2">
                        <DetailRow label="经营范围" value={carrierData.basic.scope} />
                     </div>
                     <div className="md:col-span-2">
                        <DetailRow label="办公地址" value={carrierData.basic.address} />
                     </div>
                  </div>
               </section>
               <div className="space-y-8">
                  <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col justify-center items-center text-center relative overflow-hidden group">
                     <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">合作活跃度</p>
                     <div className="text-6xl font-black text-indigo-400 mb-2 font-mono">A+</div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Priority Partner</p>
                  </div>
                  <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">详情补充</h4>
                     <p className="text-sm text-slate-600 leading-relaxed font-medium italic">“ 该货代为我司主要出口洛杉矶港的海运合作伙伴，拥有较强的拼箱集货能力，建议维持核心合作地位。 ”</p>
                  </div>
               </div>
            </div>
          )}

          {activeTab === '出运单关联' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               {/* 统计横栏 */}
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard label="累计出运单数" value={carrierData.shippingStats.total} />
                  <StatCard label="本月出运单数" value={carrierData.shippingStats.thisMonth} color="text-indigo-600" />
                  <StatCard label="待完成单数" value={carrierData.shippingStats.pending} color="text-amber-600" />
                  <StatCard label="已完成单数" value={carrierData.shippingStats.completed} color="text-emerald-600" />
               </div>

               {/* 表格区 */}
               <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                      <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">关联出运单列表</h3>
                    </div>
                    <div className="flex space-x-3">
                       <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase hover:bg-slate-50">刷新</button>
                       <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-indigo-700 shadow-lg shadow-indigo-100">导出列表</button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1400px]">
                      <thead className="bg-slate-50 font-black text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        <tr>
                           <th className="px-8 py-4 w-12 text-center">#</th>
                           <th className="px-4 py-4">出运单编号 <SortIcon /></th>
                           <th className="px-4 py-4">订单类型 <SortIcon /></th>
                           <th className="px-4 py-4">启运/目的港 <SortIcon /></th>
                           <th className="px-4 py-4">货物名称</th>
                           <th className="px-4 py-4 text-right">数量/重量</th>
                           <th className="px-4 py-4 text-center">出运日期 <SortIcon /></th>
                           <th className="px-4 py-4 text-center">预计到达 <SortIcon /></th>
                           <th className="px-4 py-4 text-center">状态 <SortIcon /></th>
                           <th className="px-8 py-4 text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {carrierData.shippingOrders.map((order, i) => (
                          <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-8 py-5 text-xs text-slate-300 font-mono text-center">{i + 1}</td>
                            <td className="px-4 py-5"><span className="text-sm font-black text-indigo-600 font-mono tracking-tight">{order.no}</span></td>
                            <td className="px-4 py-5 text-xs font-bold text-slate-500 uppercase">{order.type}</td>
                            <td className="px-4 py-5 text-xs font-bold text-slate-700">{order.origin} → {order.dest}</td>
                            <td className="px-4 py-5 text-xs font-medium text-slate-500">{order.name}</td>
                            <td className="px-4 py-5 text-right font-mono text-sm font-black text-slate-800">{order.qty}</td>
                            <td className="px-4 py-5 text-center text-xs font-mono text-slate-400">{order.date}</td>
                            <td className="px-4 py-5 text-center text-xs font-mono text-slate-400 font-bold">{order.eta}</td>
                            <td className="px-4 py-5 text-center">
                               <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                 order.status === '已完成' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                               }`}>{order.status}</span>
                            </td>
                            <td className="px-8 py-5 text-right whitespace-nowrap space-x-4">
                               <button className="text-[10px] font-black text-indigo-600 hover:underline uppercase">查看详情</button>
                               <button className="text-[10px] font-black text-slate-400 hover:text-slate-800 uppercase">跟踪物流</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-10 py-6 border-t border-slate-50 bg-slate-50/30 flex justify-between items-center shrink-0">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">共 28 项出运任务 / Page 1 of 3</span>
                     <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-300 hover:bg-white transition-all"><svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg></button>
                        <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-xs font-black">1</button>
                        <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">2</button>
                        <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">3</button>
                        <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-600 hover:bg-white transition-all"><svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg></button>
                     </div>
                  </div>
               </section>
            </div>
          )}

          {activeTab === '操作记录' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in duration-300">
               <section className="xl:col-span-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-10 h-fit">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-1.5 h-6 bg-slate-400 rounded-full"></div>
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">单据生命周期</h3>
                  </div>
                  <div className="space-y-8">
                     <MetaField label="更新时间" value={carrierData.meta.updateTime} isMono />
                     <MetaField label="更新人" value={`${carrierData.meta.updateUserName} (${carrierData.meta.updateUserCode})`} />
                     <div className="h-px bg-slate-50"></div>
                     <MetaField label="创建时间" value={carrierData.meta.createTime} isMono />
                     <MetaField label="创建人" value={`${carrierData.meta.createUserName} (${carrierData.meta.createUserCode})`} />
                     <div className="h-px bg-slate-50"></div>
                     <MetaField label="所属模块编号" value={carrierData.meta.moduleNo} />
                     <MetaField label="最后操作动作" value={carrierData.meta.lastAction} color="text-indigo-600" />
                  </div>
               </section>
               <section className="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">详细历史操作列表</h3>
                  </div>
                  <table className="w-full text-left">
                     <thead className="bg-slate-50/50 font-black text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        <tr>
                           <th className="px-10 py-5">操作时间</th>
                           <th className="px-6 py-5">操作人</th>
                           <th className="px-6 py-5 text-center">类型</th>
                           <th className="px-10 py-5">变更详情内容</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {carrierData.auditLogs.map((log, i) => (
                           <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-10 py-5 text-xs font-mono font-bold text-slate-400 tracking-tighter">{log.time}</td>
                              <td className="px-6 py-5">
                                 <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] text-white font-black">{log.user.charAt(0)}</div>
                                    <span className="text-sm font-bold text-slate-700">{log.user}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-5 text-center">
                                 <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black rounded uppercase tracking-tighter">{log.type}</span>
                              </td>
                              <td className="px-10 py-5 text-sm font-medium text-slate-600">{log.content}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </section>
            </div>
          )}

          {activeTab === '上传附件' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div className="bg-indigo-50/30 border-2 border-dashed border-indigo-100 rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center space-y-4 group hover:bg-indigo-50/50 hover:border-indigo-300 transition-all cursor-not-allowed">
                  <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  </div>
                  <div className="space-y-1">
                     <p className="text-sm font-black text-slate-500 uppercase tracking-widest">资质附件上传</p>
                     <p className="text-xs text-indigo-400 font-bold tracking-tight">将文件拖到此处，或点击上传（仅编辑模式生效）</p>
                  </div>
               </div>

               <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                     <thead className="bg-slate-50/80 font-black text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        <tr>
                           <th className="px-10 py-5 w-20">序号</th>
                           <th className="px-6 py-5">附件名称</th>
                           <th className="px-6 py-5 text-center">缩略图</th>
                           <th className="px-6 py-5">创建人</th>
                           <th className="px-6 py-5">创建时间</th>
                           <th className="px-10 py-5 text-right">操作</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        <tr className="hover:bg-slate-50/50 transition-colors group">
                           <td className="px-10 py-6 text-sm font-mono text-slate-300">1</td>
                           <td className="px-6 py-6 flex items-center space-x-3">
                              <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                              <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors cursor-pointer">营业执照.pdf</span>
                           </td>
                           <td className="px-6 py-6 text-center text-[10px] font-black text-indigo-500 hover:underline cursor-pointer uppercase tracking-widest">查看</td>
                           <td className="px-6 py-6 text-sm font-bold text-slate-600">李四</td>
                           <td className="px-6 py-6 text-xs font-mono text-slate-400 font-bold uppercase">2026-01-01</td>
                           <td className="px-10 py-6 text-right">
                              <button className="text-[10px] font-black text-slate-400 uppercase tracking-tighter hover:text-indigo-600">下载附件</button>
                           </td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors group">
                           <td className="px-10 py-6 text-sm font-mono text-slate-300">2</td>
                           <td className="px-6 py-6 flex items-center space-x-3">
                              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                              <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors cursor-pointer">合作协议.pdf</span>
                           </td>
                           <td className="px-6 py-6 text-center text-[10px] font-black text-indigo-500 hover:underline cursor-pointer uppercase tracking-widest">查看</td>
                           <td className="px-6 py-6 text-sm font-bold text-slate-600">张三</td>
                           <td className="px-6 py-6 text-xs font-mono text-slate-400 font-bold uppercase">2026-01-10</td>
                           <td className="px-10 py-6 text-right">
                              <button className="text-[10px] font-black text-slate-400 uppercase tracking-tighter hover:text-indigo-600">下载附件</button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </section>
            </div>
          )}

          {activeTab === '货代联系人表' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-slate-700">
                      <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                      <h3 className="text-sm font-black uppercase tracking-widest">对接联系人清单</h3>
                    </div>
                    <div className="flex items-center space-x-3">
                       <button className="px-4 py-2 bg-white border border-slate-200 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50">刷新</button>
                       <button className="px-4 py-2 bg-white border border-slate-200 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50">取消筛选</button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                        <tr>
                           <th className="px-8 py-5 w-12 text-center border-r border-slate-100">#</th>
                           <th className="px-6 py-5">联系人 <SortIcon /></th>
                           <th className="px-6 py-5">电话 <SortIcon /></th>
                           <th className="px-6 py-5">传真 <SortIcon /></th>
                           <th className="px-6 py-5">邮箱 <SortIcon /></th>
                           <th className="px-4 py-5 text-center">性别 <SortIcon /></th>
                           <th className="px-6 py-5">生日 <SortIcon /></th>
                           <th className="px-8 py-5 text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {carrierData.contacts.map((c, i) => (
                           <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group font-medium">
                              <td className="px-8 py-6 text-xs text-slate-300 font-mono text-center">{i + 1}</td>
                              <td className="px-6 py-6 text-sm font-black text-slate-800">{c.name}</td>
                              <td className="px-6 py-6 text-sm font-mono text-slate-700 font-bold">{c.phone}</td>
                              <td className="px-6 py-6 text-xs font-mono text-slate-400 italic">{c.fax}</td>
                              <td className="px-6 py-6 text-xs text-indigo-600 underline underline-offset-4 decoration-indigo-200">{c.email}</td>
                              <td className="px-4 py-6 text-center text-xs font-bold text-slate-500">{c.gender}</td>
                              <td className="px-6 py-6 text-xs font-mono text-slate-400">{c.birthday}</td>
                              <td className="px-8 py-6 text-right whitespace-nowrap">
                                 <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed">修改记录 (ReadOnly)</button>
                              </td>
                           </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               </section>
            </div>
          )}

          {activeTab === '货代银行表' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-slate-700">
                      <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                      <h3 className="text-sm font-black uppercase tracking-widest">银行账户结算信息</h3>
                    </div>
                    <div className="flex space-x-3">
                       <button className="px-4 py-2 bg-white border border-slate-200 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50">刷新</button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                        <tr>
                           <th className="px-8 py-5 w-12 text-center border-r border-slate-100">#</th>
                           <th className="px-6 py-5">开户行 <SortIcon /></th>
                           <th className="px-6 py-5">银行账号 <SortIcon /></th>
                           <th className="px-6 py-5">账户名称 <SortIcon /></th>
                           <th className="px-4 py-5 text-center">币种 <SortIcon /></th>
                           <th className="px-4 py-5 text-center">默认账户 <SortIcon /></th>
                           <th className="px-8 py-5 text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {carrierData.banks.map((b, i) => (
                           <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group font-medium">
                              <td className="px-8 py-6 text-xs text-slate-300 font-mono text-center">{i + 1}</td>
                              <td className="px-6 py-6 text-sm font-bold text-slate-800">{b.bank}</td>
                              <td className="px-6 py-6 text-sm font-mono font-black text-indigo-600 tracking-tighter">{b.account}</td>
                              <td className="px-6 py-6 text-sm font-bold text-slate-700">{b.name}</td>
                              <td className="px-4 py-6 text-center text-xs font-black text-slate-400 uppercase">{b.currency}</td>
                              <td className="px-4 py-6 text-center">
                                 <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase border border-emerald-100">{b.isDefault}</span>
                              </td>
                              <td className="px-8 py-6 text-right whitespace-nowrap">
                                 <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-not-allowed">无法编辑</button>
                              </td>
                           </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               </section>
            </div>
          )}

          {activeTab === '承运商产品' && (
            <div className="flex flex-col items-center justify-center py-40 animate-in zoom-in-95 duration-500">
               <div className="w-24 h-24 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-200 mb-8 border border-slate-100 border-dashed">
                 <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
               </div>
               <h4 className="text-lg font-black text-slate-800 tracking-tight mb-2 uppercase tracking-widest">承运商专属产品对照表</h4>
               <p className="text-sm text-slate-400 font-medium italic">暂未配置此承运商的特定物料运输方案</p>
            </div>
          )}

        </div>
      </div>

      {/* 页面底部标识 */}
      <footer className="bg-white border-t border-slate-200 px-10 py-6 flex justify-between items-center shrink-0 shadow-inner z-50">
         <div className="flex items-center space-x-12">
            <div className="flex items-center space-x-3 text-xs">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Partner Sync Level 5</span>
            </div>
            <div className="h-6 w-px bg-slate-100"></div>
            <span className="text-[9px] font-black text-slate-400 uppercase italic tracking-widest underline decoration-indigo-200 decoration-2">© Sensor ERP v3.1 | Carrier Resource Management Archive</span>
         </div>
         <button onClick={onClose} className="px-10 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl shadow-slate-200">关闭详情窗口</button>
      </footer>
    </div>
  );
};

/* --- 辅助子组件 --- */

const DetailRow: React.FC<{ label: string; value: string; isBold?: boolean; isMono?: boolean; isBadge?: boolean; isLink?: boolean; color?: string }> = ({ label, value, isBold, isMono, isBadge, isLink, color }) => (
  <div className="space-y-1.5 min-w-0">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{label}</p>
    <div className="flex items-center min-w-0">
      {isBadge ? (
        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tighter border ${color || 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>
          {value || '--'}
        </span>
      ) : isLink ? (
        <a href={`http://${value}`} target="_blank" rel="noopener noreferrer" className="text-sm font-black text-indigo-600 underline decoration-indigo-200 underline-offset-4 truncate hover:text-indigo-800 transition-colors">
          {value}
        </a>
      ) : (
        <span className={`text-sm truncate ${color || 'text-slate-700'} ${isBold ? 'font-black tracking-tight' : 'font-bold'} ${isMono ? 'font-mono' : ''}`}>
          {value || '--'}
        </span>
      )}
    </div>
  </div>
);

const MetaField: React.FC<{ label: string; value: string; isMono?: boolean; color?: string }> = ({ label, value, isMono, color }) => (
  <div className="flex justify-between items-center group/meta">
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
    <span className={`text-xs font-bold ${color || 'text-slate-500'} ${isMono ? 'font-mono tracking-tight' : ''}`}>{value}</span>
  </div>
);

const StatCard: React.FC<{ label: string; value: number | string; color?: string }> = ({ label, value, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col space-y-2 hover:-translate-y-1 transition-all hover:shadow-md">
     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
     <span className={`text-3xl font-black font-mono tracking-tighter ${color || 'text-slate-800'}`}>{value}</span>
  </div>
);

const SortIcon = () => (
  <svg className="w-3 h-3 inline-block ml-1 opacity-20 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
  </svg>
);
