
import React, { useState } from 'react';
import { ShippingPlanItem } from '../constants';

interface ShippingPlanDetailProps {
  plan: ShippingPlanItem;
  onClose: () => void;
}

export const ShippingPlanDetail: React.FC<ShippingPlanDetailProps> = ({ plan, onClose }) => {
  const [activeTab, setActiveTab] = useState('出运计划');

  // Hardcoded detail data as per JSON spec for demonstration
  const detail = {
    planNo: "JP20260106001",
    date: "2026-01-06",
    contract: "123456",
    ourId: "ZC2026001",
    ourName: "众成贸易有限公司",
    customerId: "QC2026001",
    customerName: "秦朝",
    currency: "老挝币",
    rate: "0.0023",
    incoterms: "FOB",
    paymentMethod: "电汇",
    loadingPort: "青岛港",
    destPort: "万象港",
    transport: "海运",
    deliveryDate: "2026-01-05",
    forwarderId: "HW2026001",
    forwarderName: "汉王船舶",
    etd: "2026-01-07",
    eta: "2026-01-20",
    customsBrokerId: "BG2026001",
    customsBrokerName: "青岛恒通报关行",
    carrier: "中远海运",
    relatedOrders: [
      { index: "1", orderNo: "1234567", date: "2026-01-06", mode: "海运", forwarder: "汉王船舶", status: "已出运" },
      { index: "2", orderNo: "7654321", date: "2026-01-06", mode: "海运", forwarder: "汉王船舶", status: "已出运" }
    ],
    bol: {
      consignee: "秦朝贸易有限公司",
      notifyParty: "秦朝物流部",
      freight: "5200.00元",
      notes: "小便感应器、水龙头感应器需轻装轻卸，防潮防压"
    },
    mark: {
      info: "ZC-20260106-QC-001",
      description: "小便感应器、水龙头感应器（智能卫浴配件，材质：ABS塑料，等级：合格品）"
    },
    records: {
      updateTime: "2026-01-06 14:30:25",
      updateUserCode: "test01",
      updateUserName: "test01",
      createTime: "2026-01-05 10:15:40",
      createUserCode: "test01",
      createUserName: "test01"
    },
    attachments: [
      { name: "出运计划审批单.pdf", time: "2026-01-05 10:20:30", person: "test01", size: "1.2MB" },
      { name: "卫浴感应器质检报告.xlsx", time: "2026-01-05 10:22:15", person: "test01", size: "0.8MB" }
    ],
    details: [
      { index: "1", contract: "123456", commodity: "XB-2026001", customerItem: "QC-XB-001", factoryItem: "GC-XB-001", name: "小便感应器", unit: "台", qty: "500", price: "120.00", amount: "60000.00" },
      { index: "2", contract: "123456", commodity: "SL-2026001", customerItem: "QC-SL-001", factoryItem: "GC-SL-001", name: "水龙头感应器", unit: "台", qty: "800", price: "150.00", amount: "120000.00" }
    ]
  };

  const tabs = ["出运计划", "提单信息", "唛头信息", "操作记录", "上传附件", "出运明细"];

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Header Bar */}
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
              <h1 className="text-xl font-black text-slate-800 tracking-tight">出运计划-详情</h1>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full uppercase tracking-widest">已完成</span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5 tracking-tight">{detail.planNo}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            编辑
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">打印</button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">导出</button>
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
          >
            返回
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
            
            {/* Tab Navigation */}
            <nav className="flex px-8 border-b border-slate-100 bg-white sticky top-0 z-20">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-6 text-sm font-bold transition-all relative whitespace-nowrap ${
                    activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
                </button>
              ))}
            </nav>

            {/* Tab Contents */}
            <div className="p-10">
              {activeTab === '出运计划' && (
                <div className="space-y-12 animate-in fade-in duration-300">
                  {/* Basic Info Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-5 bg-indigo-600 rounded-full"></div>
                      <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">出运计划基本信息</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                      <DisplayField label="出运单号" value={detail.planNo} />
                      <DisplayField label="出运日期" value={detail.date} />
                      <DisplayField label="外销合同" value={detail.contract} />
                      <DisplayField label="我方编号" value={detail.ourId} />
                      <DisplayField label="我方名称" value={detail.ourName} />
                      <DisplayField label="客户编号" value={detail.customerId} />
                      <DisplayField label="客户名称" value={detail.customerName} />
                      <DisplayField label="币别" value={detail.currency} />
                      <DisplayField label="汇率" value={detail.rate} />
                      <DisplayField label="成交方式" value={detail.incoterms} />
                      <DisplayField label="结汇方式" value={detail.paymentMethod} />
                      <DisplayField label="装船港" value={detail.loadingPort} />
                      <DisplayField label="目的港" value={detail.destPort} />
                      <DisplayField label="运输方式" value={detail.transport} />
                      <DisplayField label="交货日期" value={detail.deliveryDate} />
                      <DisplayField label="货代编号" value={detail.forwarderId} />
                      <DisplayField label="货代名称" value={detail.forwarderName} />
                      <DisplayField label="预计ETD" value={detail.etd} />
                      <DisplayField label="预计ETA" value={detail.eta} />
                      <DisplayField label="报关行编号" value={detail.customsBrokerId} />
                      <DisplayField label="报关公司" value={detail.customsBrokerName} />
                      <DisplayField label="船公司" value={detail.carrier} />
                    </div>
                  </div>

                  {/* Related Shipping Orders Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-5 bg-indigo-600 rounded-full"></div>
                      <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">关联出运单</h3>
                    </div>
                    <p className="text-xs text-slate-400 italic">本出运计划对应以下出运单，点击单号可查看详情</p>
                    <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/80">
                          <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                            <th className="px-6 py-4 w-12">序号</th>
                            <th className="px-4 py-4">出运单号</th>
                            <th className="px-4 py-4 text-center">出运日期</th>
                            <th className="px-4 py-4">运输方式</th>
                            <th className="px-4 py-4">货代公司</th>
                            <th className="px-4 py-4 text-center">状态</th>
                            <th className="px-6 py-4 text-right">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {detail.relatedOrders.map((order) => (
                            <tr key={order.index} className="hover:bg-slate-50/50 transition-colors group">
                              <td className="px-6 py-4 text-xs text-slate-400 font-mono">{order.index}</td>
                              <td className="px-4 py-4">
                                <span className="text-sm font-bold text-indigo-600 hover:underline cursor-pointer font-mono">{order.orderNo}</span>
                              </td>
                              <td className="px-4 py-4 text-center text-xs text-slate-500">{order.date}</td>
                              <td className="px-4 py-4 text-xs text-slate-600">{order.mode}</td>
                              <td className="px-4 py-4 text-xs text-slate-600">{order.forwarder}</td>
                              <td className="px-4 py-4 text-center">
                                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">{order.status}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button className="text-[10px] font-bold text-indigo-600 hover:underline">查看详情</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === '提单信息' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
                  <DisplayField label="提单收货人" value={detail.bol.consignee} />
                  <DisplayField label="提单通知人" value={detail.bol.notifyParty} />
                  <DisplayField label="运费价格" value={detail.bol.freight} />
                  <div className="md:col-span-2">
                    <DisplayField label="提单加注" value={detail.bol.notes} />
                  </div>
                </div>
              )}

              {activeTab === '唛头信息' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">唛头信息</p>
                    <p className="text-sm font-mono text-slate-700 leading-relaxed">{detail.mark.info}</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">货物描述</p>
                    <p className="text-sm text-slate-600 leading-relaxed italic">"{detail.mark.description}"</p>
                  </div>
                </div>
              )}

              {activeTab === '操作记录' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-12 animate-in fade-in duration-300 bg-slate-50/50 p-10 rounded-[2rem] border border-slate-100 border-dashed">
                  <DisplayField label="更新时间" value={detail.records.updateTime} />
                  <DisplayField label="更新人员代码" value={detail.records.updateUserCode} />
                  <DisplayField label="更新人员名称" value={detail.records.updateUserName} />
                  <DisplayField label="创建时间" value={detail.records.createTime} />
                  <DisplayField label="创建人员代码" value={detail.records.createUserCode} />
                  <DisplayField label="创建人员名称" value={detail.records.createUserName} />
                </div>
              )}

              {activeTab === '上传附件' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50/50">
                        <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                          <th className="px-8 py-5">文件名</th>
                          <th className="px-4 py-5 text-center">文件大小</th>
                          <th className="px-4 py-5 text-center">上传时间</th>
                          <th className="px-4 py-5 text-center">上传人</th>
                          <th className="px-8 py-5 text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {detail.attachments.map((att, i) => (
                          <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                            <td className="px-8 py-4">
                              <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-bold text-slate-700">{att.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center text-xs text-slate-400">{att.size}</td>
                            <td className="px-4 py-4 text-center text-xs text-slate-400 font-mono">{att.time}</td>
                            <td className="px-4 py-4 text-center text-xs text-slate-600 font-bold">{att.person}</td>
                            <td className="px-8 py-4 text-right">
                              <div className="flex justify-end space-x-3">
                                <button className="text-[10px] font-bold text-indigo-600 hover:underline">下载</button>
                                <button className="text-[10px] font-bold text-slate-400 hover:underline">查看</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
                     <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">查看模式下不可上传</p>
                  </div>
                </div>
              )}

              {activeTab === '出运明细' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead className="bg-slate-50/50">
                        <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                          <th className="px-8 py-5 w-12 text-center">#</th>
                          <th className="px-4 py-4">外销合同</th>
                          <th className="px-4 py-4 font-mono">商品编号</th>
                          <th className="px-4 py-4">客户货号</th>
                          <th className="px-4 py-4">工厂货号</th>
                          <th className="px-4 py-4">中文货名</th>
                          <th className="px-4 py-4 text-center">单位</th>
                          <th className="px-4 py-4 text-right">出运数量</th>
                          <th className="px-4 py-4 text-right">销售单价</th>
                          <th className="px-8 py-4 text-right">销售金额</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {detail.details.map((item) => (
                          <tr key={item.index} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-8 py-5 text-center text-xs text-slate-400 font-mono">{item.index}</td>
                            <td className="px-4 py-5 text-xs text-slate-700 font-mono">{item.contract}</td>
                            <td className="px-4 py-5 text-xs text-slate-800 font-bold">{item.commodity}</td>
                            <td className="px-4 py-5 text-xs text-slate-600">{item.customerItem}</td>
                            <td className="px-4 py-5 text-xs text-slate-600">{item.factoryItem}</td>
                            <td className="px-4 py-5 text-xs text-slate-700 font-bold">{item.name}</td>
                            <td className="px-4 py-5 text-center text-xs text-slate-500">{item.unit}</td>
                            <td className="px-4 py-5 text-right text-sm font-mono font-bold text-slate-800">{item.qty}</td>
                            <td className="px-4 py-5 text-right text-sm font-mono text-slate-500">¥{item.price}</td>
                            <td className="px-8 py-5 text-right text-sm font-mono font-black text-indigo-700">¥{item.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary Area */}
                  <div className="bg-slate-900 rounded-3xl p-8 flex justify-end space-x-12 shadow-xl shadow-slate-200">
                    <div className="text-right">
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">出运总数量</p>
                       <span className="text-2xl font-mono font-black text-white">1300.00 台</span>
                    </div>
                    <div className="text-right border-l border-slate-800 pl-12">
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">销售总金额</p>
                       <span className="text-2xl font-mono font-black text-indigo-400">180000.00 老挝币</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DisplayField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-bold text-slate-700 leading-tight">{value || '--'}</p>
  </div>
);
