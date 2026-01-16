
import React, { useState } from 'react';

interface ShippingOrderAddProps {
  onClose: () => void;
}

export const ShippingOrderAdd: React.FC<ShippingOrderAddProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('单证');
  const tabs = ["单证", "提单信息", "报关", "上传附件", "单证明细", "报关明细"];

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right-10 duration-500 overflow-hidden">
      {/* Page Header */}
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
          <h1 className="text-xl font-black text-slate-800 tracking-tight">出运单</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center space-x-2">
              <span>关联数据</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40 p-2">
              <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl">关联出运计划</button>
              <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl">关联外销合同</button>
              <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl">关联商品库</button>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">一键生成报关单</button>
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            保存
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
                  <FormField label="出口发票号" value="ZC-FP-20260106" type="input" />
                  <FormField label="发票日期" value="2026-01-06" type="datePicker" />
                  <FormField 
                    label="出运计划单号" 
                    value="CY2510008" 
                    type="select" 
                    options={["CY2510008", "CY2512005", "JP20260106001", "JP20260105001"]} 
                  />
                  <FormField label="外销合同" value="感应龙头外壳采购-123456" type="text" remark="已关联" />
                  <FormField label="我方编号" value="ZC-DD-20260106" type="input" />
                  <FormField label="我方名称" value="众成贸易有限公司" type="text" isEditable={false} />
                  <FormField label="客户编号" value="KH-TH001" type="text" remark="已关联" />
                  <FormField label="客户名称" value="泰华贸易" type="text" remark="已关联" />
                  <FormField label="目的港" value="曼谷港" type="text" remark="已关联" />
                  <FormField label="起运港" value="青岛港" type="text" remark="已关联" />
                  <FormField label="船期" value="2026-01-07" type="datePicker" />
                  <FormField label="运输方式" value="By Sea" type="input" />
                  <FormField label="结汇方式" value="T/T-B/L" type="input" />
                  <FormField label="成交方式" value="FOB" type="input" />
                  <FormField label="币别" value="人民币" type="input" />
                  <FormField label="汇率" value="7.2000" type="numberInput" />
                  <FormField label="货代编号" value="HD-HW001" type="text" remark="已关联" />
                  <FormField label="货代名称" value="汉王船舶" type="text" remark="已关联" />
                  <FormField label="提单号" value="BL-QD-BK20260107" type="input" />
                  <FormField label="船名" value="中远海运XX号" type="input" />
                  <FormField label="航次" value="HY202601" type="input" />
                  <FormField label="装柜日期" value="2026-01-06" type="datePicker" />
                  <FormField label="发票金额" value="85000.00" type="numberInput" isEditable={false} remark="自动计算（明细销售金额总计）" />
                  <FormField label="投保日期" value="2026-01-05" type="datePicker" />
                  <FormField label="交货日期" value="2026-01-05" type="datePicker" />
                  <FormField label="预计收汇日期" value="2026-01-20" type="datePicker" />
                  <FormField label="溢短装" value="±2%" type="input" />
                  <FormField label="是否清关" value={true} type="switch" />
                </div>
              )}

              {activeTab === '提单信息' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 animate-in fade-in duration-300 max-w-5xl">
                   <FormField label="提单通知人" value="泰华贸易采购部" type="input" />
                   <FormField label="提单收货人" value="泰华贸易（曼谷）" type="input" />
                   <FormField label="唛头" value="ZC-SP-20260106 / 感应龙头外壳 / 防摔" type="input" />
                   <FormField label="备注" value="感应配件需轻装轻卸" type="input" />
                   <FormField label="约定运价" value="3200.00" type="numberInput" />
                   <FormField label="提单加注" value="易碎品，禁止堆叠" type="input" />
                </div>
              )}

              {activeTab === '报关' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 animate-in fade-in duration-300">
                   <FormField label="报关单号" value="BG-QD-20260106" type="input" />
                   <FormField label="报关日期" value="2026-01-06" type="datePicker" />
                   <FormField label="出口日期" value="2026-01-07" type="datePicker" />
                   <FormField label="报关抬头编号" value="TH-001" type="input" />
                   <FormField label="报关抬头" value="众成贸易有限公司" type="text" isEditable={false} />
                   <FormField label="生产销售单位代码" value="SC-ZC001" type="input" />
                   <FormField label="生产销售单位" value="众成贸易有限公司" type="input" />
                   <FormField label="海关编码" value="8536500000" type="input" />
                   <FormField label="境内货源地" value="山东青岛" type="input" />
                   <FormField label="备案号" value="BA-20260106" type="input" />
                   <FormField label="运抵国" value="泰国" type="input" />
                   <FormField label="贸易国" value="泰国" type="input" />
                   <FormField label="报关数量" value="500.00" type="numberInput" isEditable={false} remark="自动同步明细数量" />
                   <FormField label="征免性质" value="一般征税" type="input" />
                   <FormField label="报关件数" value="100.00" type="numberInput" isEditable={false} remark="自动同步明细件数" />
                   <FormField label="件数单位" value="箱" type="input" />
                   <FormField label="报关总体积" value="6.64" type="numberInput" isEditable={false} remark="自动同步明细体积" />
                   <FormField label="报关总净重" value="4500.00" type="numberInput" isEditable={false} remark="自动同步明细净重" />
                   <FormField label="报关总毛重" value="4700.00" type="numberInput" isEditable={false} remark="自动同步明细毛重" />
                   <FormField label="报关总金额" value="85000.00" type="numberInput" isEditable={false} remark="自动同步发票金额" />
                   <FormField label="运费" value="3200.00" type="numberInput" />
                   <FormField label="保费" value="0.00" type="numberInput" />
                   <FormField label="杂费" value="0.00" type="numberInput" />
                   <FormField label="随附单据" value="外销合同、质检报告" type="input" />
                   <FormField label="报关唛头" value="ZC-SP-20260106 / 感应龙头外壳 / 防摔" type="input" />
                </div>
              )}

              {activeTab === '上传附件' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-lg shadow-indigo-100">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                        <span>新增</span>
                      </button>
                      <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50">批量删除</button>
                      <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50">取消筛选</button>
                    </div>
                  </div>
                  
                  <div className="border-4 border-dashed border-indigo-50 rounded-[2.5rem] bg-indigo-50/20 p-20 flex flex-col items-center justify-center space-y-6 group hover:bg-indigo-50/40 transition-all cursor-pointer">
                    <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    </div>
                    <p className="text-lg font-black text-slate-700">将文件拖到此处，或点击上传</p>
                  </div>

                  <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50/50">
                        <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                          <th className="px-8 py-5">序号</th>
                          <th className="px-4 py-5">附件名称</th>
                          <th className="px-4 py-5">缩略图</th>
                          <th className="px-4 py-5">创建人</th>
                          <th className="px-8 py-5 text-right">创建时间</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-4 text-sm text-slate-500">1</td>
                          <td className="px-4 py-4 text-sm font-bold text-slate-800 underline">外销合同扫描件.pdf</td>
                          <td className="px-4 py-4 text-xs text-slate-400">——</td>
                          <td className="px-4 py-4 text-sm text-slate-600">王外贸</td>
                          <td className="px-8 py-4 text-sm text-slate-500 font-mono text-right">2026-01-06</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-4 text-sm text-slate-500">2</td>
                          <td className="px-4 py-4 text-sm font-bold text-slate-800 underline">货物质检报告.pdf</td>
                          <td className="px-4 py-4 text-xs text-slate-400">——</td>
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
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all">新增</button>
                      <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50">批量删除</button>
                      <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50">取消筛选</button>
                    </div>
                  </div>
                  
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

          <div className="mt-12 flex justify-end space-x-6">
             <button 
                onClick={onClose}
                className="px-12 py-3 text-slate-400 font-bold hover:text-slate-600 transition-all uppercase tracking-widest text-xs"
             >
               Discard / 取消
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormField: React.FC<{ 
  label: string; 
  value: any; 
  type: 'input' | 'datePicker' | 'numberInput' | 'text' | 'switch' | 'select';
  remark?: string;
  isEditable?: boolean;
  options?: string[];
}> = ({ label, value, type, remark, isEditable = true, options }) => (
  <div className="space-y-1.5 min-w-0">
    <div className="flex justify-between items-center">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">{label}</label>
      {remark && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${remark === '已关联' ? 'bg-blue-50 text-blue-500' : 'bg-slate-100 text-slate-400'}`}>{remark}</span>}
    </div>
    <div className="relative group">
      {type === 'text' || !isEditable ? (
        <div className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-700 font-medium select-all">
          {value || '--'}
        </div>
      ) : type === 'switch' ? (
        <div className="flex items-center space-x-3 py-2">
           <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${value ? 'bg-indigo-600' : 'bg-slate-200'}`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${value ? 'left-7' : 'left-1'}`}></div>
           </div>
           <span className="text-xs font-bold text-slate-500">{value ? '开启' : '关闭'}</span>
        </div>
      ) : type === 'select' ? (
        <div className="relative">
          <select 
            defaultValue={value}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all group-hover:border-indigo-300 font-medium text-slate-800 shadow-sm appearance-none cursor-pointer"
          >
            {options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      ) : (
        <input 
          type={type === 'datePicker' ? 'date' : type === 'numberInput' ? 'number' : 'text'}
          defaultValue={value}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all group-hover:border-indigo-300 font-medium text-slate-800 shadow-sm"
        />
      )}
    </div>
  </div>
);
