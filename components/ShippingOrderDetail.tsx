
import React, { useState } from 'react';

interface ShippingOrderDetailProps {
  orderNo: string;
  onClose: () => void;
}

export const ShippingOrderDetail: React.FC<ShippingOrderDetailProps> = ({ orderNo, onClose }) => {
  const [activeTab, setActiveTab] = useState('单证');
  const tabs = ["单证", "提单信息", "报关", "上传附件", "单证明细", "报关明细"];

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right-10 duration-500 overflow-hidden">
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
            <h1 className="text-xl font-black text-slate-800 tracking-tight">出运单详情</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5 tracking-tight">{orderNo}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            编辑
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">打印</button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">下载</button>
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
        <div className="max-w-[1600px] mx-auto p-8">
          
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[700px]">
            
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
              
              {activeTab === '单证' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 animate-in fade-in duration-300">
                  <DetailField label="出口发票号" value="ZC-FP-20260106" />
                  <DetailField label="发票日期" value="2026-01-06" />
                  <DetailField label="出运计划单号" value="JP20260106001" />
                  <DetailField label="外销合同" value="感应龙头外壳采购-123456" />
                  <DetailField label="我方编号" value="ZC-DD-20260106" />
                  <DetailField label="我方名称" value="众成贸易有限公司" />
                  <DetailField label="客户编号" value="KH-TH001" />
                  <DetailField label="客户名称" value="泰华贸易" />
                  <DetailField label="目的港" value="曼谷港" />
                  <DetailField label="起运港" value="青岛港" />
                  <DetailField label="船期" value="2026-01-07" />
                  <DetailField label="运输方式" value="By Sea" />
                  <DetailField label="结汇方式" value="T/T-B/L" />
                  <DetailField label="成交方式" value="FOB" />
                  <DetailField label="币别" value="人民币" />
                  <DetailField label="汇率" value="7.2000" />
                  <DetailField label="货代编号" value="HD-HW001" />
                  <DetailField label="货代名称" value="汉王船舶" />
                  <DetailField label="提单号" value="BL-QD-BK20260107" />
                  <DetailField label="船名" value="中远海运XX号" />
                  <DetailField label="航次" value="HY202601" />
                  <DetailField label="装柜日期" value="2026-01-06" />
                  <DetailField label="发票金额" value="85000.00" />
                  <DetailField label="投保日期" value="2026-01-05" />
                  <DetailField label="交货日期" value="2026-01-05" />
                  <DetailField label="预计收汇日期" value="2026-01-20" />
                  <DetailField label="溢短装" value="±2%" />
                  <DetailField label="是否清关" value="是" />
                </div>
              )}

              {activeTab === '提单信息' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 animate-in fade-in duration-300 max-w-5xl">
                   <DetailField label="提单通知人" value="泰华贸易采购部" />
                   <DetailField label="提单收货人" value="泰华贸易（曼谷）" />
                   <DetailField label="唛头" value="ZC-SP-20260106 / 感应龙头外壳 / 防摔" />
                   <DetailField label="备注" value="感应配件需轻装轻卸" />
                   <DetailField label="约定运价" value="3200.00" />
                   <DetailField label="提单加注" value="易碎品，禁止堆叠" />
                </div>
              )}

              {activeTab === '报关' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 animate-in fade-in duration-300">
                   <DetailField label="报关单号" value="BG-QD-20260106" />
                   <DetailField label="报关日期" value="2026-01-06" />
                   <DetailField label="出口日期" value="2026-01-07" />
                   <DetailField label="报关抬头编号" value="TH-001" />
                   <DetailField label="报关抬头" value="众成贸易有限公司" />
                   <DetailField label="生产销售单位代码" value="SC-ZC001" />
                   <DetailField label="生产销售单位" value="众成贸易有限公司" />
                   <DetailField label="海关编码" value="8536500000" />
                   <DetailField label="境内货源地" value="山东青岛" />
                   <DetailField label="备案号" value="BA-20260106" />
                   <DetailField label="运抵国" value="泰国" />
                   <DetailField label="贸易国" value="泰国" />
                   <DetailField label="报关数量" value="500.00" />
                   <DetailField label="征免性质" value="一般征税" />
                   <DetailField label="报关件数" value="100.00" />
                   <DetailField label="件数单位" value="箱" />
                   <DetailField label="报关总体积" value="6.64" />
                   <DetailField label="报关总净重" value="4500.00" />
                   <DetailField label="报关总毛重" value="4700.00" />
                   <DetailField label="报关总金额" value="85000.00" />
                   <DetailField label="运费" value="3200.00" />
                   <DetailField label="保费" value="0.00" />
                   <DetailField label="杂费" value="0.00" />
                   <DetailField label="随附单据" value="外销合同、质检报告" />
                   <DetailField label="报关唛头" value="ZC-SP-20260106 / 感应龙头外壳 / 防摔" />
                </div>
              )}

              {activeTab === '上传附件' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50/50">
                        <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                          <th className="px-8 py-5 w-24">序号</th>
                          <th className="px-4 py-5">附件名称</th>
                          <th className="px-4 py-5">创建人</th>
                          <th className="px-8 py-5 text-right">创建时间</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-4 text-sm text-slate-500">1</td>
                          <td className="px-4 py-4 text-sm font-bold text-slate-800 underline cursor-pointer hover:text-indigo-600 transition-colors">外销合同扫描件.pdf</td>
                          <td className="px-4 py-4 text-sm text-slate-600">王外贸</td>
                          <td className="px-8 py-4 text-sm text-slate-500 font-mono text-right">2026-01-06</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-4 text-sm text-slate-500">2</td>
                          <td className="px-4 py-4 text-sm font-bold text-slate-800 underline cursor-pointer hover:text-indigo-600 transition-colors">货物质检报告.pdf</td>
                          <td className="px-4 py-4 text-sm text-slate-600">王外贸</td>
                          <td className="px-8 py-4 text-sm text-slate-500 font-mono text-right">2026-01-06</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === '单证明细' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[2200px]">
                      <thead className="bg-slate-50/50">
                        <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100">
                          <th className="px-8 py-5 w-12 text-center sticky left-0 bg-slate-50 z-10 border-r border-slate-100">#</th>
                          <th className="px-4 py-5 w-20 text-center">图片</th>
                          <th className="px-4 py-5">外销合同</th>
                          <th className="px-4 py-5">商品编号</th>
                          <th className="px-4 py-5">客户货号</th>
                          <th className="px-4 py-5">工厂货号</th>
                          <th className="px-4 py-5">中文货名</th>
                          <th className="px-4 py-5">中文描述</th>
                          <th className="px-4 py-5 text-center">质检批次</th>
                          <th className="px-4 py-5">条码</th>
                          <th className="px-4 py-5 text-center">单位</th>
                          <th className="px-4 py-5 text-right">订单数量</th>
                          <th className="px-4 py-5 text-right">销售单价</th>
                          <th className="px-4 py-5 text-right">销售金额</th>
                          <th className="px-4 py-5 text-right">采购单价</th>
                          <th className="px-4 py-5 text-center">每箱装量</th>
                          <th className="px-4 py-5 text-center">单箱净重</th>
                          <th className="px-4 py-5 text-center">单箱毛重</th>
                          <th className="px-4 py-5 text-center">长</th>
                          <th className="px-4 py-5 text-center">宽</th>
                          <th className="px-4 py-5 text-center">高</th>
                          <th className="px-8 py-5 text-right">单箱体积</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-5 text-center text-xs text-slate-400 font-mono sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100">1</td>
                          <td className="px-4 py-5">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] text-slate-400 font-bold">[图]</div>
                          </td>
                          <td className="px-4 py-5 text-xs text-slate-700">感应龙头外壳采购-123456</td>
                          <td className="px-4 py-5 text-xs font-bold text-slate-800">SP-001</td>
                          <td className="px-4 py-5 text-xs text-slate-600">TH-SP001</td>
                          <td className="px-4 py-5 text-xs text-slate-600">GC-SP001</td>
                          <td className="px-4 py-5 text-xs font-bold text-slate-700">感应龙头外壳（ABS）</td>
                          <td className="px-4 py-5 text-xs text-slate-500">医用级防菌ABS材质</td>
                          <td className="px-4 py-5 text-center">
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase">QC-202601</span>
                          </td>
                          <td className="px-4 py-5 text-xs font-mono text-slate-500">324352123</td>
                          <td className="px-4 py-5 text-center text-xs text-slate-500">件</td>
                          <td className="px-4 py-5 text-right text-sm font-mono font-bold text-slate-800">500</td>
                          <td className="px-4 py-5 text-right text-sm font-mono text-slate-500">170</td>
                          <td className="px-4 py-5 text-right text-sm font-mono font-black text-indigo-600">85000</td>
                          <td className="px-4 py-5 text-right text-sm font-mono text-slate-400">120</td>
                          <td className="px-4 py-5 text-center text-xs text-slate-500">50</td>
                          <td className="px-4 py-5 text-center text-xs text-slate-500">45</td>
                          <td className="px-4 py-5 text-center text-xs text-slate-500">47</td>
                          <td className="px-4 py-5 text-center text-xs text-slate-400">12</td>
                          <td className="px-4 py-5 text-center text-xs text-slate-400">45</td>
                          <td className="px-4 py-5 text-center text-xs text-slate-400">123</td>
                          <td className="px-8 py-5 text-right text-xs font-mono font-bold text-indigo-700">0.07</td>
                        </tr>
                      </tbody>
                      <tfoot className="bg-slate-900 text-white font-mono">
                         <tr>
                            <td colSpan={11} className="px-8 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">合计 (TOTAL)</td>
                            <td className="px-4 py-4 text-right font-black">500</td>
                            <td></td>
                            <td className="px-4 py-4 text-right font-black text-indigo-400">85000</td>
                            <td colSpan={8}></td>
                         </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === '报关明细' && (
                <div className="animate-in fade-in duration-300">
                  <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50/50">
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                          <th className="px-8 py-5 w-12 text-center">#</th>
                          <th className="px-4 py-5">供应商编号</th>
                          <th className="px-4 py-5">供应商名称</th>
                          <th className="px-4 py-5 font-mono">海关编码</th>
                          <th className="px-4 py-5">海关中文货名</th>
                          <th className="px-4 py-5">报关英文货名</th>
                          <th className="px-4 py-5 text-center">退税率</th>
                          <th className="px-4 py-5 text-center">进项税率</th>
                          <th className="px-8 py-5 text-center">是否商检</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-5 text-center text-xs text-slate-400 font-mono">1</td>
                          <td className="px-4 py-5 text-xs text-slate-600 font-mono">GY001</td>
                          <td className="px-4 py-5 text-sm font-bold text-slate-800">迪星公司</td>
                          <td className="px-4 py-5 text-xs font-mono font-bold text-indigo-600">8536500000</td>
                          <td className="px-4 py-5 text-sm text-slate-700">感应龙头外壳</td>
                          <td className="px-4 py-5 text-xs text-slate-500 italic">Thermostat</td>
                          <td className="px-4 py-5 text-center text-xs font-bold text-emerald-600 bg-emerald-50 m-2 rounded">13%</td>
                          <td className="px-4 py-5 text-center text-xs text-slate-600">13%</td>
                          <td className="px-8 py-5 text-center text-xs text-rose-500 font-bold">否</td>
                        </tr>
                      </tbody>
                    </table>
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

const DetailField: React.FC<{ 
  label: string; 
  value: string;
}> = ({ label, value }) => (
  <div className="space-y-1.5 min-w-0">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{label}</label>
    <div className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-700 font-medium select-all">
      {value || '--'}
    </div>
  </div>
);
