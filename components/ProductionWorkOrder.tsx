
import React, { useState, useEffect, useMemo } from 'react';

interface ProcessItem {
  id: string;
  taskPool: string;
  processName: string;
  processCode: string;
  productName: string;
  productCode: string;
  attr: string;
  specs: string;
  plannedQty: number;
  dispatchedQty: number;
  currentDispatchQty: number;
  unit: string;
  progress: number;
}

interface MaterialItem {
  id: string;
  prodName: string;
  prodCode: string;
  processName: string;
  processCode: string;
  materialName: string;
  materialCode: string;
  attr: string;
  specs: string;
  plannedReqQty: number;
  pickedQty: number;
  currentReqQty: number;
  unit: string;
}

interface ProductionWorkOrderProps {
  onClose: () => void;
}

export const ProductionWorkOrder: React.FC<ProductionWorkOrderProps> = ({ onClose }) => {
  const [isBasicExpanded, setIsBasicExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'details' | 'tracking'>('details');
  const [saveStatus, setSaveStatus] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    planId: '',
    planName: '',
    warehouse: '',
    team: '组装一组',
    leader: '',
    startDate: '2026-01-10',
    endDate: '2026-01-20',
    status: '已派工',
    orderName: '卫浴组装一组1月配件生产工单',
    orderNo: '',
    batchNo: 'CP20260109001'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock Data for linkage
  const MOCK_PLANS = [
    { id: 'PLN001', name: '感应芯片年度生产计划', warehouse: '一号原料仓' },
    { id: 'PLN002', name: '智能水龙头Q1备货计划', warehouse: '成品零件仓' }
  ];

  const [processes, setProcesses] = useState<ProcessItem[]>([
    {
      id: "1",
      taskPool: "选择数据",
      processName: "智能水龙头产品焊接",
      processCode: "G001",
      productName: "001智能水龙头",
      productCode: "P001",
      attr: "智能卫浴",
      specs: "PCB-2026A",
      plannedQty: 500,
      dispatchedQty: 0,
      currentDispatchQty: 500,
      unit: "个",
      progress: 40
    }
  ]);

  const [materials, setMaterials] = useState<MaterialItem[]>([
    {
      id: "1",
      prodName: "电路板",
      prodCode: "P001",
      processName: "焊接",
      processCode: "G001",
      materialName: "电阻",
      materialCode: "M001",
      attr: "电子元器件",
      specs: "R-100Ω",
      plannedReqQty: 2000,
      pickedQty: 0,
      currentReqQty: 2000,
      unit: "个"
    }
  ]);

  // Validation
  useEffect(() => {
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setErrors(prev => ({ ...prev, endDate: "完工日期需晚于开始日期" }));
    } else {
      setErrors(prev => {
        const next = { ...prev };
        delete next.endDate;
        return next;
      });
    }
  }, [formData.startDate, formData.endDate]);

  const handlePlanSelect = (planId: string) => {
    const plan = MOCK_PLANS.find(p => p.id === planId);
    if (plan) {
      setFormData({ ...formData, planId: plan.id, planName: plan.name, warehouse: plan.warehouse });
    }
  };

  const handleSaveDraft = () => {
    setSaveStatus("✅ 草稿保存成功（自动保存至10分钟前）");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleSubmit = () => {
    // Check required
    const requiredFields = ['planId', 'team', 'leader', 'startDate', 'endDate', 'orderName'];
    const newErrors: Record<string, string> = {};
    requiredFields.forEach(f => {
      if (!formData[f as keyof typeof formData]) newErrors[f] = "请填写必填项";
    });

    if (Object.keys(newErrors).length > 0 || errors.endDate) {
      setErrors({ ...errors, ...newErrors });
      return;
    }

    if (confirm("确认提交该生产工单？")) {
      alert("✅ 生产工单提交成功，编号：SC-GD-2026011001");
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in fade-in duration-500 overflow-hidden relative">
      {/* 顶部标题栏 */}
      <header className="bg-white px-8 py-5 border-b border-slate-200 flex justify-between items-start shrink-0">
        <div className="space-y-1">
          <h1 className="text-xl font-black text-slate-800 tracking-tight">生产工单</h1>
          <p className="text-sm text-slate-500 font-medium tracking-tight">默认按班组/车间/厂颗粒度生产派工单；一站式完成生产工单全业务流程</p>
        </div>
        <button className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-lg text-xs font-black hover:bg-slate-200 transition-all uppercase tracking-widest">使用帮助</button>
      </header>

      {/* 主滚动区域 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto p-8 space-y-8">
          
          {/* Section 1: 工单基础信息 */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all duration-500">
            <div 
              className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between cursor-pointer group"
              onClick={() => setIsBasicExpanded(!isBasicExpanded)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">工单基础信息</h3>
              </div>
              <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                {isBasicExpanded ? '▼' : '▶'}
              </span>
            </div>
            
            {isBasicExpanded && (
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 animate-in slide-in-from-top-2">
                <FormItem label="选择生产计划" required error={errors.planId}>
                   <select 
                     className={`w-full bg-slate-50 border ${errors.planId ? 'border-rose-400 ring-rose-50' : 'border-slate-200 focus:ring-indigo-50'} rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none transition-all focus:ring-4`}
                     value={formData.planId}
                     onChange={e => handlePlanSelect(e.target.value)}
                   >
                     <option value="">选择数据</option>
                     {MOCK_PLANS.map(p => <option key={p.id} value={p.id}>{p.id}</option>)}
                   </select>
                </FormItem>
                <FormItem label="生产计划名称">
                   <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-medium italic" value={formData.planName || "暂无内容"} />
                </FormItem>
                <FormItem label="领料仓库">
                   <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-medium italic" value={formData.warehouse || "暂无内容"} />
                </FormItem>

                <FormItem label="生产班组" required>
                   <select 
                     className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                     value={formData.team}
                     onChange={e => setFormData({...formData, team: e.target.value})}
                   >
                     <option>组装一组</option>
                     <option>组装二组</option>
                   </select>
                </FormItem>
                <FormItem label="班组长" required error={errors.leader}>
                   <input 
                     type="text" 
                     placeholder="+选择成员" 
                     className={`w-full bg-white border ${errors.leader ? 'border-rose-400 ring-rose-50' : 'border-slate-200 focus:ring-indigo-50'} rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-4 transition-all`}
                     value={formData.leader}
                     onChange={e => setFormData({...formData, leader: e.target.value})}
                   />
                </FormItem>
                <FormItem label="工单开始日期" required>
                   <input 
                     type="date" 
                     className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50"
                     value={formData.startDate}
                     onChange={e => setFormData({...formData, startDate: e.target.value})}
                   />
                </FormItem>

                <FormItem label="工单完工日期" required error={errors.endDate}>
                   <input 
                     type="date" 
                     className={`w-full bg-white border ${errors.endDate ? 'border-rose-400 ring-rose-50' : 'border-slate-200 focus:ring-indigo-50'} rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-slate-700 outline-none focus:ring-4 transition-all`}
                     value={formData.endDate}
                     onChange={e => setFormData({...formData, endDate: e.target.value})}
                   />
                </FormItem>
                <FormItem label="工单状态" required>
                   <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                     <option>已派工</option>
                     <option>待派工</option>
                   </select>
                </FormItem>
                <FormItem label="生产工单名称" required error={errors.orderName}>
                   <input 
                     type="text" 
                     className={`w-full bg-white border ${errors.orderName ? 'border-rose-400 ring-rose-50' : 'border-slate-200 focus:ring-indigo-50'} rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:ring-4 transition-all`}
                     value={formData.orderName}
                     onChange={e => setFormData({...formData, orderName: e.target.value})}
                   />
                </FormItem>

                <FormItem label="生产工单编号" tips="提交后自动生成">
                   <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm font-mono text-slate-400" value="自动生成" />
                </FormItem>
                <FormItem label="产成品批次号">
                   <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-slate-800" value={formData.batchNo} onChange={e => setFormData({...formData, batchNo: e.target.value})} />
                </FormItem>
              </div>
            )}
          </section>

          {/* Tab Navigation Area */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
             <nav className="flex px-10 border-b border-slate-100 bg-white sticky top-0 z-40">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`px-8 py-5 text-sm font-black transition-all relative uppercase tracking-widest ${activeTab === 'details' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  工单明细
                  {activeTab === 'details' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
                </button>
                <button 
                  onClick={() => setActiveTab('tracking')}
                  className={`px-8 py-5 text-sm font-black transition-all relative uppercase tracking-widest ${activeTab === 'tracking' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  生产工单执行跟踪
                  {activeTab === 'tracking' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
                </button>
             </nav>

             <div className="p-8 space-y-12">
                {activeTab === 'details' ? (
                  <>
                    {/* SubModule: 生产工序明细 */}
                    <div className="space-y-6">
                       <div className="flex items-center justify-between">
                          <div className="space-y-1">
                             <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">生产工序明细</h4>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">选择生产任务后，自动筛选生产领料池物料及数量</p>
                          </div>
                          <div className="flex space-x-3">
                             <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-lg shadow-indigo-100">
                                <span>🟦</span>
                                <span>+添加</span>
                             </button>
                             <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-lg shadow-indigo-100">
                                <span>🚀</span>
                                <span>快速填报</span>
                             </button>
                          </div>
                       </div>
                       <div className="border border-slate-100 rounded-2xl overflow-hidden overflow-x-auto shadow-sm">
                          <table className="min-w-full text-left border-collapse">
                             <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <tr>
                                   <th className="px-6 py-4 w-16 text-center sticky left-0 bg-slate-50 z-10 border-r border-slate-100">序号</th>
                                   <th className="px-4 py-4 min-w-[150px]">选择生产任务池*</th>
                                   <th className="px-4 py-4 min-w-[200px]">工序名称</th>
                                   <th className="px-4 py-4 font-mono">工序编码</th>
                                   <th className="px-4 py-4">产品名称</th>
                                   <th className="px-4 py-4 font-mono">产品编码</th>
                                   <th className="px-4 py-4">产品属性</th>
                                   <th className="px-4 py-4">规格型号</th>
                                   <th className="px-4 py-4 text-right">计划数</th>
                                   <th className="px-4 py-4 text-right">已派工</th>
                                   <th className="px-4 py-4 text-right bg-indigo-50/50 text-indigo-600 font-black">本次派工*</th>
                                   <th className="px-4 py-4 text-center">单位</th>
                                   <th className="px-8 py-4 text-right sticky right-0 bg-slate-50 z-10 border-l border-slate-100 shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">操作</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-50">
                                {processes.map((p, i) => (
                                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                     <td className="px-6 py-5 text-center text-xs text-slate-300 font-mono sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100">{i + 1}</td>
                                     <td className="px-4 py-5"><span className="text-xs font-bold text-indigo-600 flex items-center cursor-pointer hover:underline">🔍 {p.taskPool}</span></td>
                                     <td className="px-4 py-5 text-sm font-black text-slate-700">{p.processName}</td>
                                     <td className="px-4 py-5 text-xs font-mono font-bold text-slate-400 uppercase tracking-tighter">{p.processCode}</td>
                                     <td className="px-4 py-5 text-sm font-bold text-slate-600">{p.productName}</td>
                                     <td className="px-4 py-5 text-xs font-mono text-slate-400">{p.productCode}</td>
                                     <td className="px-4 py-5"><span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-black rounded uppercase tracking-tighter">{p.attr}</span></td>
                                     <td className="px-4 py-5 text-xs text-slate-400 italic">{p.specs}</td>
                                     <td className="px-4 py-5 text-right font-mono font-bold text-slate-400">{p.plannedQty}</td>
                                     <td className="px-4 py-5 text-right font-mono font-bold text-slate-400">{p.dispatchedQty}</td>
                                     <td className="px-4 py-5 text-right font-mono font-black text-indigo-700 bg-indigo-50/20">{p.currentDispatchQty}</td>
                                     <td className="px-4 py-5 text-center text-[10px] font-black text-slate-400 uppercase">{p.unit}</td>
                                     <td className="px-8 py-5 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 z-10 border-l border-slate-100 shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">
                                        <div className="flex justify-end space-x-3">
                                           <button className="text-[10px] font-black text-slate-400 hover:text-orange-500 uppercase tracking-widest">🖊️ 编辑</button>
                                           <button className="text-[10px] font-black text-slate-400 hover:text-rose-500 uppercase tracking-widest">🗑️ 删除</button>
                                        </div>
                                     </td>
                                  </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </div>

                    {/* SubModule: 领料产品明细 */}
                    <div className="space-y-6">
                       <div className="flex items-center justify-between">
                          <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">领料产品明细</h4>
                          <div className="flex space-x-3">
                             <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-lg shadow-indigo-100">
                                <span>🟦</span>
                                <span>+添加</span>
                             </button>
                             <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-lg shadow-indigo-100">
                                <span>🚀</span>
                                <span>快速填报</span>
                             </button>
                          </div>
                       </div>
                       <div className="border border-slate-100 rounded-2xl overflow-hidden overflow-x-auto shadow-sm">
                          <table className="min-w-full text-left border-collapse">
                             <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <tr>
                                   <th className="px-6 py-4 w-16 text-center sticky left-0 bg-slate-50 z-10 border-r border-slate-100">序号</th>
                                   <th className="px-4 py-4">生产产品名称</th>
                                   <th className="px-4 py-4 font-mono">产品编码</th>
                                   <th className="px-4 py-4">工序名称</th>
                                   <th className="px-4 py-4 font-mono">工序编码</th>
                                   <th className="px-4 py-4">物料名称</th>
                                   <th className="px-4 py-4 font-mono">物料编码</th>
                                   <th className="px-4 py-4">属性</th>
                                   <th className="px-4 py-4">规格</th>
                                   <th className="px-4 py-4 text-right">计划需求</th>
                                   <th className="px-4 py-4 text-right">已领料</th>
                                   <th className="px-4 py-4 text-right bg-indigo-50/50 text-indigo-600 font-black">本次需求*</th>
                                   <th className="px-4 py-4 text-center">单位</th>
                                   <th className="px-8 py-4 text-right sticky right-0 bg-slate-50 z-10 border-l border-slate-100 shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">操作</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-slate-50">
                                {materials.map((m, i) => (
                                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                     <td className="px-6 py-5 text-center text-xs text-slate-300 font-mono sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100">{i + 1}</td>
                                     <td className="px-4 py-5 text-sm font-bold text-slate-700">{m.prodName}</td>
                                     <td className="px-4 py-5 text-xs font-mono text-slate-400 uppercase tracking-tighter">{m.prodCode}</td>
                                     <td className="px-4 py-5 text-xs font-bold text-slate-600">{m.processName}</td>
                                     <td className="px-4 py-5 text-xs font-mono text-slate-400">{m.processCode}</td>
                                     <td className="px-4 py-5 text-sm font-black text-slate-800">{m.materialName}</td>
                                     <td className="px-4 py-5 text-xs font-mono font-bold text-indigo-600">{m.materialCode}</td>
                                     <td className="px-4 py-5"><span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black rounded uppercase tracking-tighter">{m.attr}</span></td>
                                     <td className="px-4 py-5 text-xs text-slate-400 italic">{m.specs}</td>
                                     <td className="px-4 py-5 text-right font-mono font-bold text-slate-400">{m.plannedReqQty}</td>
                                     <td className="px-4 py-5 text-right font-mono font-bold text-slate-400">{m.pickedQty}</td>
                                     <td className="px-4 py-5 text-right font-mono font-black text-indigo-700 bg-indigo-50/20">{m.currentReqQty}</td>
                                     <td className="px-4 py-5 text-center text-[10px] font-black text-slate-400 uppercase">{m.unit}</td>
                                     <td className="px-8 py-5 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 z-10 border-l border-slate-100 shadow-[-4px_0_10px_rgba(0,0,0,0.02)]">
                                        <div className="flex justify-end space-x-3">
                                           <button className="text-[10px] font-black text-slate-400 hover:text-orange-500 uppercase tracking-widest">🖊️ 编辑</button>
                                           <button className="text-[10px] font-black text-slate-400 hover:text-rose-500 uppercase tracking-widest">🗑️ 删除</button>
                                        </div>
                                     </td>
                                  </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-12 animate-in fade-in duration-500">
                     <div className="space-y-6">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center">
                           <div className="w-1 h-4 bg-indigo-500 rounded-full mr-3"></div>
                           工序完成度可视化
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {processes.map(p => (
                             <div key={p.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                                <div className="flex justify-between items-center">
                                   <span className="text-xs font-black text-slate-700 uppercase tracking-widest">{p.processName}</span>
                                   <span className="text-sm font-black font-mono text-indigo-600">{p.progress}%</span>
                                </div>
                                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                                   <div className="h-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-all duration-1000" style={{ width: `${p.progress}%` }}></div>
                                </div>
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                   <span>进度详情</span>
                                   <span>{p.currentDispatchQty} / {p.plannedQty} UNITS</span>
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* 底部操作区 (Fixed) */}
      <footer className="bg-white border-t border-slate-200 px-10 py-6 flex justify-between items-center shrink-0 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex items-center space-x-6">
           {saveStatus && <span className="text-sm font-bold text-emerald-600 animate-in fade-in slide-in-from-left-2">{saveStatus}</span>}
           <div className="h-4 w-px bg-slate-100 mx-2"></div>
           <span className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest">System Validation Logic Level 5</span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleSaveDraft}
            className="px-8 py-3 bg-amber-50 text-slate-500 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-amber-100 transition-all active:scale-95"
          >
            保存草稿
          </button>
          <button 
            onClick={handleSubmit}
            className="px-12 py-3 bg-emerald-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95"
          >
            提交工单
          </button>
        </div>
      </footer>
    </div>
  );
};

/* --- 辅助组件 --- */

const FormItem: React.FC<{ label: string; required?: boolean; error?: string; tips?: string; children: React.ReactNode }> = ({ label, required, error, tips, children }) => (
  <div className="space-y-2.5">
    <div className="flex justify-between items-center px-1">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center">
        {label}
        {required && <span className="text-rose-500 ml-1.5 font-black">*</span>}
      </label>
      {error && <span className="text-[9px] font-black text-rose-500 uppercase tracking-tighter animate-bounce">{error}</span>}
    </div>
    {children}
    {tips && !error && <p className="text-[9px] text-slate-300 italic font-medium ml-1 leading-tight">{tips}</p>}
  </div>
);
