
import React, { useState, useEffect, useMemo } from 'react';

interface TaskDetail {
  productName: string;
  productCode: string;
  productType: string;
  model: string;
  plannedQty: number;
  unit: string;
  method: string;
}

interface ProcessDetail {
  model: string;
  name: string;
  code: string;
  plannedQty: number;
  unit: string;
  start: string;
  end: string;
  team: string;
  isLeader: boolean;
  isOperator: boolean;
  eomCode: string;
  title: string;
}

interface BOMItem {
  code: string;
  type: string;
  model: string;
  requiredQty: number;
  minDemand: number;
  plannedDemand: number;
  unit: string;
  planUnitVal: number;
  storageUnit: string;
  method: string;
  team: string;
}

interface PurchaseDemand {
  name: string;
  code: string;
  plannedDemand: number;
  unit: string;
  availability: string;
  method: string;
  needPurchase: boolean;
}

interface QCItem {
  name: string;
  code: string;
  standard: string;
  method: string;
  qty: number;
  team: string;
  checker: string;
  type: string;
  finishDate: string;
  status: string;
}

export const ProductionPlan: React.FC = () => {
  const [sourceSelected, setSourceSelected] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Basic Info State
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    startDate: "2024/01/10",
    endDate: "",
    category: "计划",
    status: "已计划",
    inWarehouse: "成品仓",
    pickingWarehouse: "成品仓",
    leader: "生产计划员",
    planNo: "SC-JH-20240110001",
    batchNo: "SC2024S_1A001"
  });

  // Detailed Data States
  const [tasks, setTasks] = useState<TaskDetail[]>([]);
  const [processes, setProcesses] = useState<ProcessDetail[]>([]);
  const [bomItems, setBomItems] = useState<BOMItem[]>([]);
  const [purchaseDemands, setPurchaseDemands] = useState<PurchaseDemand[]>([]);
  const [qcItems, setQcItems] = useState<QCItem[]>([]);

  // Simulation: Trigger Linkage Data
  const handleSelectSource = () => {
    setSourceSelected(true);
    setBasicInfo(prev => ({ ...prev, name: "生产计划单[2024M01]" }));
    
    setTasks([{
      productName: "001智能水龙头",
      productCode: "P001",
      productType: "成品",
      model: "PCB-2026A",
      plannedQty: 500,
      unit: "个",
      method: "组装"
    }]);

    setProcesses([
      { model: "BH-GA171-1500", name: "电路板焊接", code: "G001", plannedQty: 500, unit: "个", start: "2024-01-10", end: "2024-01-31", team: "A组", isLeader: true, isOperator: true, eomCode: "EOM006", title: "生产：电路板焊接" },
      { model: "BH-GA171-1501", name: "外壳组装", code: "G002", plannedQty: 500, unit: "支", start: "2024-01-10", end: "2024-01-31", team: "C组", isLeader: true, isOperator: true, eomCode: "EOM005", title: "组装：外壳组装" }
    ]);

    setBomItems([
      { code: "M001", type: "主料", model: "BH-GA171-1500", requiredQty: 500, minDemand: 500, plannedDemand: 550, unit: "个", planUnitVal: 500, storageUnit: "个", method: "采购", team: "A组" },
      { code: "P002", type: "主料", model: "5997", requiredQty: 500, minDemand: 500, plannedDemand: 550, unit: "个", planUnitVal: 500, storageUnit: "个", method: "采购", team: "C组" }
    ]);

    setPurchaseDemands([
      { name: "主控电路板", code: "P001", plannedDemand: 500, unit: "个", availability: "部分可用", method: "采购", needPurchase: true },
      { name: "设备外壳", code: "G002", plannedDemand: 500, unit: "个", availability: "部分可用", method: "采购", needPurchase: true }
    ]);

    setQcItems([
      { name: "电路板功能检测", code: "QC001", standard: "通电测试≥10分钟无故障", method: "通电测试", qty: 500, team: "质检A组", checker: "张三", type: "成品质检", finishDate: "", status: "待质检" },
      { name: "外壳密封性检测", code: "QC002", standard: "水压0.8MPa下无渗漏", method: "水压测试", qty: 500, team: "质检C组", checker: "李四", type: "成品质检", finishDate: "", status: "待质检" }
    ]);
  };

  // Automated Linkage: Sync QC quantity with Task quantity
  const updateTaskQty = (val: number) => {
    setTasks(prev => prev.map(t => ({ ...t, plannedQty: val })));
    setQcItems(prev => prev.map(q => ({ ...q, qty: val })));
    setProcesses(prev => prev.map(p => ({ ...p, plannedQty: val })));
  };

  // Validation
  useEffect(() => {
    if (basicInfo.endDate && new Date(basicInfo.endDate) < new Date(basicInfo.startDate)) {
      setErrors(prev => ({ ...prev, endDate: "需晚于计划开始日期" }));
    } else {
      setErrors(prev => {
        const next = { ...prev };
        delete next.endDate;
        return next;
      });
    }
  }, [basicInfo.startDate, basicInfo.endDate]);

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in fade-in duration-500 overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-50 shrink-0 shadow-sm">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-black text-slate-800 tracking-tight">生产计划</h1>
          <button className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-lg text-xs font-black hover:bg-slate-200 transition-all uppercase tracking-widest">模板下载</button>
        </div>
        <div className="bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl flex items-center space-x-3 max-w-xl">
           <span className="text-blue-500 font-bold text-xs">ℹ️</span>
           <p className="text-[11px] text-slate-500 leading-tight">系统为生产提供的标准格式，可一次性完成所有生产的管理；选择年度计划/销售订单后自动填充明细。</p>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto p-8 space-y-10">
          
          {/* Module 1: Source Selector */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex items-center justify-between animate-in slide-in-from-top-2">
            <div className="space-y-1">
              <p className={`text-sm font-black uppercase tracking-widest ${sourceSelected ? 'text-indigo-600' : 'text-slate-400'}`}>
                计划来源：{sourceSelected ? '年度生产计划 [2024Q1]' : '未选择'}
              </p>
              <p className="text-[11px] text-slate-400 font-medium italic">选择后系统自动填充基础信息及关联 BOM/质检数据</p>
            </div>
            <button 
              onClick={handleSelectSource}
              className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
            >
              {sourceSelected ? '切换计划来源' : '选择计划来源'}
            </button>
          </div>

          {/* Module 2: Basic Info */}
          <section className={`bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden transition-all duration-500 ${!sourceSelected ? 'opacity-50 grayscale' : ''}`}>
             <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">基础信息 (Basic Profile)</h3>
             </div>
             <div className="p-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                   <DisplayField label="单号/名称" value={basicInfo.name} isLink />
                   <DisplayField label="计划开始日期" value={basicInfo.startDate} icon="📅" />
                   <div className="space-y-2.5">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                         计划完工日期 <span className="text-rose-500 ml-1 font-black">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="date" 
                          disabled={!sourceSelected}
                          className={`w-full bg-white border ${errors.endDate ? 'border-rose-400 ring-4 ring-rose-50' : 'border-slate-200 focus:ring-4 focus:ring-indigo-50'} rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none transition-all`}
                          value={basicInfo.endDate}
                          onChange={e => setBasicInfo({...basicInfo, endDate: e.target.value})}
                        />
                        {errors.endDate && <p className="text-[9px] text-rose-500 font-black absolute -bottom-4 left-1 uppercase">{errors.endDate}</p>}
                      </div>
                   </div>
                   <DisplayField label="计划类别" value={basicInfo.category} />
                   <DisplayField label="计划状态" value={basicInfo.status} />
                   
                   <DisplayField label="成品入库仓库" value={basicInfo.inWarehouse} />
                   <DisplayField label="领料仓库" value={basicInfo.pickingWarehouse} />
                   <DisplayField label="生产负责人" value={basicInfo.leader} />
                   <div className="space-y-2.5">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">生产计划编号</label>
                      <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm font-mono text-slate-400 cursor-not-allowed" value={basicInfo.planNo} />
                      <p className="text-[9px] text-slate-300 italic uppercase">自动生成无需填写</p>
                   </div>
                   <DisplayField label="产成品批次号" value={basicInfo.batchNo} isMono />
                </div>
                {!sourceSelected && (
                  <div className="flex items-center justify-center py-10">
                     <p className="text-sm font-black text-slate-300 uppercase tracking-[0.3em]">请先选择计划来源以载入数据</p>
                  </div>
                )}
             </div>
          </section>

          {/* Module 3: Plan Tabs & Detailed Content */}
          <div className={`transition-all duration-700 ${!sourceSelected ? 'hidden' : 'block space-y-10'}`}>
             <nav className="border-b border-slate-200 flex px-4">
                <button className="px-8 py-5 text-sm font-black text-indigo-600 transition-all relative uppercase tracking-widest">
                  计划明细 (Plan Details)
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />
                </button>
             </nav>

             {/* Section: 生产任务明细 */}
             <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                   <h4 className="text-base font-black text-slate-800 uppercase tracking-widest">生产任务明细</h4>
                   <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-md transition-all">+ 增加</button>
                      <button className="px-4 py-2 bg-white border border-slate-200 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">格式调整</button>
                   </div>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                         <tr>
                            <th className="px-8 py-4">选择产品</th>
                            <th className="px-4 py-4">产品名称</th>
                            <th className="px-4 py-4">产品编码</th>
                            <th className="px-4 py-4">产品类型</th>
                            <th className="px-4 py-4">物料型号</th>
                            <th className="px-6 py-4 text-right bg-indigo-50/50 text-indigo-700 font-black">*计划生产数量</th>
                            <th className="px-4 py-4 text-center">生产单位</th>
                            <th className="px-8 py-4">获取方式</th>
                         </tr>
                      </thead>
                      <tbody>
                        {tasks.map((t, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                             <td className="px-8 py-6 text-xs text-slate-400 font-bold uppercase tracking-widest">{t.productCode} 自动填充</td>
                             <td className="px-4 py-6 text-sm font-black text-slate-800">{t.productName}</td>
                             <td className="px-4 py-6 text-xs font-mono font-bold text-slate-500">{t.productCode}</td>
                             <td className="px-4 py-6"><span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-black rounded uppercase tracking-tighter">{t.productType}</span></td>
                             <td className="px-4 py-6 text-xs font-mono text-slate-400">{t.model}</td>
                             <td className="px-6 py-6 text-right bg-indigo-50/20">
                                <input 
                                  type="number" 
                                  className="w-24 bg-white border border-indigo-100 rounded-lg px-3 py-1.5 text-right text-sm font-black text-indigo-700 focus:ring-4 focus:ring-indigo-100 outline-none"
                                  value={t.plannedQty}
                                  onChange={e => updateTaskQty(parseFloat(e.target.value) || 0)}
                                />
                             </td>
                             <td className="px-4 py-6 text-center text-xs font-bold text-slate-400">{t.unit}</td>
                             <td className="px-8 py-6"><span className="text-[10px] font-black border border-slate-100 px-2 py-0.5 rounded uppercase text-slate-500">{t.method}</span></td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
             </div>

             {/* Section: 生产工序明细 */}
             <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                   <div className="flex items-center space-x-4">
                     <h4 className="text-base font-black text-slate-800 uppercase tracking-widest">生产工序明细</h4>
                     <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">自动生成工序</span>
                   </div>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                         <tr>
                            <th className="px-8 py-4">物料型号</th>
                            <th className="px-4 py-4">工序名称</th>
                            <th className="px-4 py-4 font-mono">工序编码</th>
                            <th className="px-6 py-4 text-right bg-emerald-50/50 text-emerald-700 font-black">工序计划数量</th>
                            <th className="px-4 py-4 text-center">生产单位</th>
                            <th className="px-4 py-4">计划开始/完工</th>
                            <th className="px-4 py-4">生产班组</th>
                            <th className="px-4 py-4 text-center">班/操</th>
                            <th className="px-4 py-4">EOM编码</th>
                            <th className="px-8 py-4">生产工单标题</th>
                         </tr>
                      </thead>
                      <tbody>
                        {processes.map((p, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                             <td className="px-8 py-6 text-xs font-mono text-slate-400">{p.model}</td>
                             <td className="px-4 py-6 text-sm font-black text-slate-800">{p.name}</td>
                             <td className="px-4 py-6 text-xs font-mono font-bold text-slate-500 uppercase">{p.code}</td>
                             <td className="px-6 py-6 text-right bg-emerald-50/20 font-mono font-black text-emerald-700">{p.plannedQty.toFixed(2)}</td>
                             <td className="px-4 py-6 text-center text-xs font-bold text-slate-400">{p.unit}</td>
                             <td className="px-4 py-6 text-[10px] font-mono font-bold text-slate-400 whitespace-nowrap">{p.start} / {p.end}</td>
                             <td className="px-4 py-6"><span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded uppercase border border-indigo-100">{p.team}</span></td>
                             <td className="px-4 py-6 text-center text-[10px] font-bold text-slate-400 uppercase">{p.isLeader ? 'Leader' : '--'} / {p.isOperator ? 'Op' : '--'}</td>
                             <td className="px-4 py-6 text-xs font-mono text-slate-400">{p.eomCode}</td>
                             <td className="px-8 py-6 text-xs text-slate-500 font-medium italic">{p.title}</td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
             </div>

             {/* Section: BOM Analysis */}
             <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                   <div className="flex flex-col">
                      <h4 className="text-base font-black text-slate-800 uppercase tracking-widest">生产物料BOM需求分析</h4>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">生产物料可点击选择，选择后填充相关数据</p>
                   </div>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-separate border-spacing-0">
                      <thead className="bg-slate-50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                         <tr className="whitespace-nowrap">
                            <th className="px-8 py-4 border-b border-slate-100">产品编码</th>
                            <th className="px-4 py-4 border-b border-slate-100">类型</th>
                            <th className="px-4 py-4 border-b border-slate-100">物料型号</th>
                            <th className="px-4 py-4 border-b border-slate-100 text-right">必生产数量</th>
                            <th className="px-4 py-4 border-b border-slate-100 text-right">最小需求</th>
                            <th className="px-6 py-4 border-b border-slate-100 text-right bg-rose-50/50 text-rose-600 font-black">计划生产需求量</th>
                            <th className="px-4 py-4 border-b border-slate-100 text-center">单位</th>
                            <th className="px-4 py-4 border-b border-slate-100 text-right">(计划单位)</th>
                            <th className="px-4 py-4 border-b border-slate-100 text-center">仓库单位</th>
                            <th className="px-4 py-4 border-b border-slate-100">获取方式</th>
                            <th className="px-8 py-4 border-b border-slate-100">生产班组</th>
                         </tr>
                      </thead>
                      <tbody>
                        {bomItems.map((b, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                             <td className="px-8 py-5 text-xs font-mono font-bold text-slate-400">{b.code}</td>
                             <td className="px-4 py-5"><span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${b.type === '主料' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}>{b.type}</span></td>
                             <td className="px-4 py-5 text-xs font-mono text-slate-500">{b.model}</td>
                             <td className="px-4 py-5 text-right font-mono text-xs font-bold text-slate-400">{b.requiredQty.toFixed(2)}</td>
                             <td className="px-4 py-5 text-right font-mono text-xs font-bold text-slate-400">{b.minDemand.toFixed(2)}</td>
                             <td className="px-6 py-5 text-right bg-rose-50/20">
                                <input type="number" className="w-20 bg-white border border-rose-200 rounded-lg px-2 py-1 text-right text-sm font-mono font-black text-rose-600 focus:ring-4 focus:ring-rose-50 outline-none" defaultValue={b.plannedDemand} />
                             </td>
                             <td className="px-4 py-5 text-center text-[10px] font-black text-slate-400">{b.unit}</td>
                             <td className="px-4 py-5 text-right font-mono text-xs text-slate-400">{b.planUnitVal.toFixed(2)}</td>
                             <td className="px-4 py-5 text-center text-[10px] font-black text-slate-400">{b.storageUnit}</td>
                             <td className="px-4 py-5"><span className="text-indigo-600 text-[10px] font-black uppercase underline decoration-indigo-200 underline-offset-4 cursor-pointer">{b.method}</span></td>
                             <td className="px-8 py-5 text-xs font-bold text-slate-600">{b.team}</td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>

                <div className="p-10 bg-slate-50/50 border-t border-slate-100">
                   <h5 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-6">子产品采购需求 (采购工单预生成)</h5>
                   <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                           <tr>
                              <th className="px-8 py-4">生产产品名称</th>
                              <th className="px-4 py-4 font-mono">产品编码</th>
                              <th className="px-4 py-4 text-right">计划生产需求量</th>
                              <th className="px-4 py-4 text-center">生产单位</th>
                              <th className="px-4 py-4 text-center">仓库可购状态</th>
                              <th className="px-4 py-4 text-center">获取方式</th>
                              <th className="px-8 py-4 text-right">*是否需要采购</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           {purchaseDemands.map((d, i) => (
                             <tr key={i} className="hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-5 text-xs font-bold text-slate-700">{d.name}</td>
                                <td className="px-4 py-5 text-xs font-mono text-slate-400">{d.code}</td>
                                <td className="px-4 py-5 text-right text-sm font-mono font-black text-slate-800">{d.plannedDemand.toFixed(2)}</td>
                                <td className="px-4 py-5 text-center text-[10px] font-black text-slate-400">{d.unit}</td>
                                <td className="px-4 py-5 text-center">
                                   <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[9px] font-black rounded uppercase border border-amber-100">{d.availability}</span>
                                </td>
                                <td className="px-4 py-5 text-center text-xs font-bold text-slate-500 uppercase">{d.method}</td>
                                <td className="px-8 py-5 text-right">
                                   <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">{d.needPurchase ? 'YES' : 'NO'}</span>
                                </td>
                             </tr>
                           ))}
                        </tbody>
                      </table>
                   </div>
                </div>
             </div>

             {/* Section: Quality Check Details */}
             <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex flex-col space-y-1">
                   <div className="flex items-center space-x-4">
                     <h4 className="text-base font-black text-slate-800 uppercase tracking-widest">生产质检明细</h4>
                     <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">自动生成质检项</span>
                   </div>
                   <p className="text-[11px] text-slate-400 font-bold tracking-tight italic">质检项随所选产品自动匹配，仅「质检完成日期」支持手动填写</p>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                      <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                         <tr>
                            <th className="px-8 py-4">质检项名称</th>
                            <th className="px-4 py-4 font-mono">质检编码</th>
                            <th className="px-4 py-4 max-w-xs">质检标准</th>
                            <th className="px-4 py-4">质检方法</th>
                            <th className="px-4 py-4 text-right">质检数量</th>
                            <th className="px-4 py-4">质检班组</th>
                            <th className="px-4 py-4">质检员</th>
                            <th className="px-4 py-4">质检类型</th>
                            <th className="px-6 py-4 bg-indigo-50/50 text-indigo-700 font-black">质检完成日期</th>
                            <th className="px-8 py-4 text-center">状态</th>
                         </tr>
                      </thead>
                      <tbody>
                        {qcItems.map((q, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                             <td className="px-8 py-6 text-sm font-bold text-slate-800">{q.name}</td>
                             <td className="px-4 py-6 text-xs font-mono text-slate-400">{q.code}</td>
                             <td className="px-4 py-6 text-xs text-slate-500 font-medium italic leading-relaxed max-w-xs">{q.standard}</td>
                             <td className="px-4 py-6 text-xs font-bold text-slate-600">{q.method}</td>
                             <td className="px-4 py-6 text-right font-mono font-black text-slate-800">{q.qty.toFixed(2)}</td>
                             <td className="px-4 py-6"><span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-black rounded border border-slate-200 uppercase tracking-tighter">{q.team}</span></td>
                             <td className="px-4 py-6 text-xs font-bold text-slate-700">{q.checker}</td>
                             <td className="px-4 py-6 text-xs font-bold text-slate-500 uppercase">{q.type}</td>
                             <td className="px-6 py-6 bg-indigo-50/20">
                                <input type="date" className="w-full bg-white border border-indigo-200 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-indigo-600 outline-none" />
                             </td>
                             <td className="px-8 py-6 text-center">
                                <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{q.status}</span>
                             </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer sticky actions */}
      <footer className="bg-white border-t border-slate-100 px-10 py-6 flex justify-end items-center space-x-4 shrink-0 shadow-inner z-50">
         <button className="px-10 py-3 bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all">保存</button>
         <button 
           disabled={!sourceSelected || !basicInfo.endDate || !!errors.endDate}
           className={`px-16 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 ${
             sourceSelected && basicInfo.endDate && !errors.endDate
               ? 'bg-slate-900 text-white shadow-slate-200 hover:bg-black' 
               : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
           }`}
         >
           计算提交
         </button>
      </footer>
    </div>
  );
};

/* --- Internal Form Components --- */

const DisplayField: React.FC<{ label: string; value: string; isMono?: boolean; isBold?: boolean; isBadge?: boolean; isLink?: boolean; icon?: string; color?: string }> = ({ label, value, isMono, isBold, isBadge, isLink, icon, color }) => (
  <div className="space-y-2.5 min-w-0 group/item">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] flex items-center group-hover/item:text-indigo-400 transition-colors">
      {label}
    </label>
    <div className={`flex items-center min-w-0 h-[42px] bg-slate-50 border border-slate-100 rounded-xl px-4 ${color || 'text-slate-700'}`}>
      {icon && <span className="mr-2 text-xs">{icon}</span>}
      <div className={`text-sm truncate ${isBold ? 'font-black tracking-tight' : 'font-bold'} ${isMono ? 'font-mono' : ''} ${isBadge ? 'px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[9px] font-black uppercase' : ''} ${isLink ? 'text-indigo-600 underline cursor-pointer decoration-indigo-200 decoration-2 underline-offset-4' : ''}`}>
        {value || '--'}
      </div>
    </div>
  </div>
);
