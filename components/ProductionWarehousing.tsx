
import React, { useState, useMemo } from 'react';

export const ProductionWarehousing: React.FC = () => {
  const [formData, setFormData] = useState({
    planId: "感应龙头外壳生产计划",
    planName: "感应龙头外壳（ABS材质）生产计划",
    planNo: "SC-JH-20260106",
    team: "组装一班",
    leader: "李班组",
    productBatch: "QC-20260106",
    reportNo: "RK-20260106001",
    planStatus: "已完结",
    orderNo: "GD-2026011001",
    completionRate: "100%",
    warehouse: "成品仓",
    type: "生产入库",
    location: "成品仓A区",
    fifo: "先进先出"
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "感应龙头外壳（ABS）",
      code: "SP-001",
      attr: "医用级防菌",
      specs: "12*45*123",
      batch: "QC-20260106",
      planQty: 500,
      pendingQty: 500,
      currentQty: 500,
      unit: "件",
      location: "成品仓A区",
      costPrice: 120.00,
      salePrice: 170.00
    }
  ]);

  const [qcItems, setQcItems] = useState([
    { no: "ZJ-001", name: "ABS材质纯度检测", standard: "≥99.5%", result: "合格", desc: "-", file: "" },
    { no: "ZJ-002", name: "外壳尺寸精度（长）", standard: "12±0.1mm", result: "合格", desc: "-", file: "" },
    { no: "ZJ-003", name: "外壳尺寸精度（宽）", standard: "45±0.1mm", result: "合格", desc: "-", file: "" },
    { no: "ZJ-004", name: "防菌涂层附着力", standard: "不脱落", result: "合格", desc: "-", file: "" },
    { no: "ZJ-005", name: "防水性能测试", standard: "IPX7级", result: "不合格", desc: "边角处渗水", file: "防水测试异常.jpg" },
  ]);

  const totalQty = products.reduce((acc, p) => acc + p.currentQty, 0);
  const totalCost = products.reduce((acc, p) => acc + (p.currentQty * p.costPrice), 0);
  const totalSale = products.reduce((acc, p) => acc + (p.currentQty * p.salePrice), 0);
  const totalProfit = totalSale - totalCost;

  const isComplete = formData.completionRate === "100%";

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      {/* 顶部操作区 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">生产入库</h1>
          <div className="flex items-center space-x-3 mt-1">
             <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-widest border border-indigo-100">表单编辑模式</span>
             <p className="text-xs font-bold text-slate-400 italic">仅仓库管理员/质检员可编辑质检及入库信息</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-1 flex items-center shadow-sm">
             <button className="px-4 py-2 text-xs font-black text-slate-500 hover:bg-slate-50 rounded-xl transition-all">仅添加数据</button>
             <div className="w-px h-4 bg-slate-100 mx-1"></div>
             <button className="px-4 py-2 text-xs font-black text-indigo-600 bg-indigo-50 rounded-xl transition-all">编辑</button>
             <div className="w-px h-4 bg-slate-100 mx-1"></div>
             <button className="px-4 py-2 text-xs font-black text-slate-500 hover:bg-slate-50 rounded-xl transition-all">数据管理</button>
          </div>
          <button className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl shadow-slate-200 hover:bg-black transition-all active:scale-95 group">
             <span className="text-xs font-black uppercase tracking-widest">待入库工单</span>
             <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-lg group-hover:scale-110 transition-transform">8</span>
          </button>
        </div>
      </div>

      {/* 一、生产计划信息 */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden border-l-8 border-l-blue-500">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">一、生产计划信息</h3>
        </div>
        <div className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            <FormItem label="选择生产计划" required>
              <div className="relative group cursor-pointer">
                <input type="text" readOnly className="w-full bg-slate-50 border border-indigo-100 rounded-xl px-4 py-2.5 text-sm font-bold text-indigo-700 outline-none focus:ring-4 focus:ring-indigo-50" value={formData.planId} />
                <div className="absolute right-3 top-2.5 text-indigo-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
                </div>
              </div>
            </FormItem>
            <FormItem label="生产计划名称">
               <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-medium italic" value={formData.planName} />
            </FormItem>
            <FormItem label="生产计划编号">
               <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm font-mono text-slate-400" value={formData.planNo} />
            </FormItem>
            <FormItem label="生产班组">
               <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none appearance-none" value={formData.team} onChange={e => setFormData({...formData, team: e.target.value})}>
                 <option>组装一班</option>
                 <option>组装二班</option>
                 <option>组装三班</option>
               </select>
            </FormItem>
            <FormItem label="班组长">
               <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm text-slate-400 font-medium" value={formData.leader} />
            </FormItem>
            <FormItem label="产成品批次号">
               <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-slate-800" value={formData.productBatch} />
            </FormItem>
            <FormItem label="生产入库单编号">
               <input type="text" readOnly className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm font-mono text-slate-400 italic" value={formData.reportNo} />
            </FormItem>
            <FormItem label="计划状态">
               <div className="flex space-x-4 py-2">
                  {["已计划", "已完结"].map(status => (
                    <label key={status} className="flex items-center space-x-2 cursor-pointer group">
                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.planStatus === status ? 'border-indigo-600 bg-indigo-600 shadow-md' : 'border-slate-200 group-hover:border-indigo-400'}`}>
                          {formData.planStatus === status && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                       </div>
                       <span className={`text-xs font-black ${formData.planStatus === status ? 'text-indigo-600' : 'text-slate-400'}`}>{status}</span>
                    </label>
                  ))}
               </div>
            </FormItem>
            <FormItem label="关联生产工单">
               <span className="text-sm font-mono font-bold text-indigo-600 hover:underline cursor-pointer transition-all">{formData.orderNo}</span>
            </FormItem>
            <FormItem label="工单完成率">
               <span className="text-sm font-black text-slate-800">{formData.completionRate}</span>
            </FormItem>
          </div>

          <div className={`p-4 rounded-2xl flex items-center space-x-3 border ${
            isComplete ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'
          }`}>
             <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs text-white ${isComplete ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}>
                {isComplete ? '✓' : '!'}
             </div>
             <span className="text-xs font-black uppercase tracking-widest">{isComplete ? "关联工单已全部完成，可入库" : "工单未完成，禁止入库"}</span>
          </div>
        </div>
      </section>

      {/* 二、入库明细 */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden border-l-8 border-l-indigo-500">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">二、入库明细</h3>
        </div>
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <FormItem label="*入库仓库" required>
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none">
                <option>成品仓</option>
                <option>原料仓</option>
                <option>半成品仓</option>
              </select>
           </FormItem>
           <FormItem label="入库类型">
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none">
                <option>生产入库</option>
                <option>采购入库</option>
              </select>
           </FormItem>
           <FormItem label="入库仓位">
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none">
                <option>成品仓A区</option>
                <option>成品仓B区</option>
              </select>
           </FormItem>
           <FormItem label="批次管理">
              <div className="flex space-x-6 py-2">
                 {["先进先出", "先进后出"].map(opt => (
                   <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.fifo === opt ? 'border-indigo-600 bg-indigo-600' : 'border-slate-200 group-hover:border-indigo-400'}`}>
                         {formData.fifo === opt && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                      <span className={`text-xs font-black ${formData.fifo === opt ? 'text-indigo-600' : 'text-slate-400'}`}>{opt}</span>
                   </label>
                 ))}
              </div>
           </FormItem>
        </div>
      </section>

      {/* 三、产品明细 */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col border-l-8 border-l-amber-500">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">三、产品明细</h3>
          </div>
          <div className="flex space-x-3">
             <button className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100">+ 添加</button>
             <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">快速填报</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5 w-12 text-center">#</th>
                <th className="px-4 py-5">产品信息</th>
                <th className="px-4 py-5">属性/规格</th>
                <th className="px-4 py-5 text-right">计划/待入库</th>
                <th className="px-6 py-5 text-right bg-indigo-50/50 font-black text-indigo-700">*本次入库数量</th>
                <th className="px-4 py-5 text-center">单位</th>
                <th className="px-4 py-5">入库仓位</th>
                <th className="px-4 py-5 text-right">成本/元</th>
                <th className="px-8 py-5 text-right">总成本/元</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                   <td className="px-8 py-6 text-xs text-slate-300 font-mono text-center">{idx + 1}</td>
                   <td className="px-4 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-800 tracking-tight">{p.name}</span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">{p.code}</span>
                      </div>
                   </td>
                   <td className="px-4 py-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-lg w-fit mb-1 uppercase">{p.attr}</span>
                        <span className="text-xs text-slate-500 font-medium italic">{p.specs}</span>
                      </div>
                   </td>
                   <td className="px-4 py-6 text-right">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400">计划: {p.planQty}</span>
                        <span className="text-xs font-black text-amber-600">待入: {p.pendingQty}</span>
                      </div>
                   </td>
                   <td className="px-6 py-6 bg-indigo-50/20 text-right">
                      <input 
                        type="number" 
                        className="w-24 bg-white border border-indigo-100 rounded-lg px-3 py-1.5 text-right text-sm font-black text-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                        value={p.currentQty}
                        onChange={e => {
                          const next = [...products];
                          next[idx].currentQty = parseInt(e.target.value) || 0;
                          setProducts(next);
                        }}
                      />
                   </td>
                   <td className="px-4 py-6 text-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">{p.unit}</span>
                   </td>
                   <td className="px-4 py-6 text-xs font-bold text-slate-600">{p.location}</td>
                   <td className="px-4 py-6 text-right font-mono text-sm text-slate-500">¥{p.costPrice.toFixed(2)}</td>
                   <td className="px-8 py-6 text-right font-mono font-black text-slate-800 text-sm">¥{(p.currentQty * p.costPrice).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-emerald-50/50 border-t border-emerald-100 flex items-center space-x-3">
           <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-xs text-white">✓</div>
           <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">本次入库数量 500 ≤ 待入库数量 500，校验通过</span>
        </div>
      </section>

      {/* 四、统计信息 */}
      <section className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-12 text-white relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-10 -mr-12 -mt-12 bg-indigo-500/10 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <StatCard label="入库产品总数量" value={`${totalQty} 件`} />
            <StatCard label="入库产品成本总额" value={`¥${totalCost.toLocaleString()}`} color="text-indigo-400" />
            <StatCard label="入库产品售价总额" value={`¥${totalSale.toLocaleString()}`} color="text-emerald-400" />
            <StatCard label="入库批次预计毛利" value={`¥${totalProfit.toLocaleString()}`} color="text-amber-400" isLast />
         </div>
      </section>

      {/* 五、质检管理 */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col border-l-8 border-l-purple-500">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">五、质检管理</h3>
          </div>
        </div>
        <div className="p-10 space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FormItem label="质检类型">
                 <div className="flex space-x-6 py-2">
                    {["成品质检", "来料质检"].map(opt => (
                      <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${opt === '成品质检' ? 'border-purple-600 bg-purple-600' : 'border-slate-200'}`}>
                           {opt === '成品质检' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                        </div>
                        <span className={`text-xs font-black ${opt === '成品质检' ? 'text-purple-600' : 'text-slate-400'}`}>{opt}</span>
                      </label>
                    ))}
                 </div>
              </FormItem>
              <FormItem label="质检结论">
                 <div className="flex space-x-6 py-2">
                    {["合格", "不合格"].map(opt => (
                      <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${opt === '合格' ? 'border-emerald-600 bg-emerald-600' : 'border-rose-200'}`}>
                           {opt === '合格' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                        </div>
                        <span className={`text-xs font-black ${opt === '合格' ? 'text-emerald-600' : 'text-slate-400'}`}>{opt}</span>
                      </label>
                    ))}
                 </div>
              </FormItem>
              <FormItem label="质检标准">
                 <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700">
                    <option>感应龙头外壳-医用级防菌质检标准</option>
                    <option>智能水龙头-防水质检标准</option>
                 </select>
              </FormItem>
              <FormItem label="质检员">
                 <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700">
                    <option>王茗</option>
                    <option>李质检</option>
                 </select>
              </FormItem>
           </div>

           <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">质检项列表 (按产品标准加载)</h4>
                <div className="flex space-x-2">
                   <button className="px-3 py-1.5 text-[9px] font-black uppercase tracking-widest bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">+ 自定义项</button>
                   <button className="px-3 py-1.5 text-[9px] font-black uppercase tracking-widest bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">导入报告</button>
                </div>
              </div>
              <div className="border border-slate-100 rounded-[2rem] overflow-hidden">
                <table className="min-w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-4">质检项</th>
                      <th className="px-4 py-4">标准/要求</th>
                      <th className="px-4 py-4 text-center">判定结果</th>
                      <th className="px-4 py-4">不合格说明</th>
                      <th className="px-8 py-4 text-right">附件/照片</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {qcItems.map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-4">
                           <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-700">{item.name}</span>
                              <span className="text-[9px] font-mono text-slate-300 uppercase tracking-tighter">{item.no}</span>
                           </div>
                        </td>
                        <td className="px-4 py-4 text-xs text-slate-500 font-medium">{item.standard}</td>
                        <td className="px-4 py-4 text-center">
                           <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                             item.result === '合格' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600 animate-pulse'
                           }`}>
                             {item.result}
                           </span>
                        </td>
                        <td className="px-4 py-4 text-xs text-slate-400 italic">{item.desc}</td>
                        <td className="px-8 py-4 text-right">
                           <span className="text-[10px] font-black text-indigo-600 cursor-pointer underline decoration-indigo-200 uppercase tracking-widest">{item.file || "[上传]"}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>

           <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-amber-700">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></div>
                  <span className="text-sm font-black uppercase tracking-widest">存在不合格项，是否继续入库？</span>
                </div>
                <div className="flex space-x-3">
                   {["让步接收", "返工后入库", "拒收"].map(opt => (
                     <button key={opt} className="px-4 py-2 bg-white border border-amber-200 text-amber-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-100 transition-all shadow-sm">{opt}</button>
                   ))}
                </div>
              </div>
              <p className="text-xs font-bold text-amber-600/80 italic">本次质检共5项，4项合格，1项不合格。备注：符合医用级防菌标准（防水项需返工）</p>
           </div>
        </div>
      </section>

      {/* 六、入库确认 */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col border-l-8 border-l-emerald-500">
        <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
          <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">六、入库确认</h3>
        </div>
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <FormItem label="合格品入库确认">
              <div className="flex space-x-6 py-2">
                 {["确认", "未确认"].map(opt => (
                   <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${opt === '确认' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-200'}`}>
                         {opt === '确认' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                      <span className={`text-xs font-black ${opt === '确认' ? 'text-emerald-600' : 'text-slate-400'}`}>{opt}</span>
                   </label>
                 ))}
              </div>
           </FormItem>
           <FormItem label="入库时间">
              <input type="datetime-local" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-slate-700" defaultValue="2026-01-06T15:00" />
           </FormItem>
           <FormItem label="入库员">
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700">
                 <option>王茗</option>
                 <option>李仓管</option>
              </select>
           </FormItem>
           <FormItem label="入库备注">
              <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600" defaultValue="包装完好，数量核对无误" />
           </FormItem>
           <div className="lg:col-span-2 space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">拍照凭证 (Voucher Upload)</label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50 flex flex-col items-center justify-center text-center space-y-2 hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer group">
                 <div className="bg-white p-2 rounded-lg shadow-sm text-slate-400 group-hover:text-emerald-500 transition-all"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
                 <p className="text-xs font-bold text-slate-500">感应龙头外壳入库照片.jpg (已上传)</p>
                 <p className="text-[9px] text-slate-300 font-bold uppercase tracking-tighter">最多上传5张凭证</p>
              </div>
           </div>
           <FormItem label="入库方式">
              <div className="flex space-x-6 py-2">
                 {["人工入库", "自动化入库"].map(opt => (
                   <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${opt === '人工入库' ? 'border-slate-800 bg-slate-800' : 'border-slate-200'}`}>
                         {opt === '人工入库' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                      <span className={`text-xs font-black ${opt === '人工入库' ? 'text-slate-800' : 'text-slate-400'}`}>{opt}</span>
                   </label>
                 ))}
              </div>
           </FormItem>
           <FormItem label="验收人">
              <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700">
                 <option>张仓库</option>
                 <option>王茗</option>
              </select>
           </FormItem>
        </div>
      </section>

      {/* 全局底栏 */}
      <footer className="fixed bottom-0 right-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 py-6 px-10 flex justify-between items-center z-[60] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         <div className="flex items-center space-x-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
               <span className="text-indigo-600">Warehousing Flow Validated</span>
            </div>
            <div className="h-4 w-px bg-slate-200"></div>
            <button className="text-slate-500 hover:text-indigo-600 transition-colors">打印入库单</button>
         </div>
         <div className="flex items-center space-x-4">
            <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-sm">暂存质检结果</button>
            <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-sm">保存草稿</button>
            <button 
              disabled={!isComplete}
              className={`px-12 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
                isComplete ? 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              提交生产入库
            </button>
         </div>
      </footer>
    </div>
  );
};

/* --- 辅助组件 --- */

const FormItem: React.FC<{ label: string; required?: boolean; children: React.ReactNode; isFull?: boolean }> = ({ label, required, children, isFull }) => (
  <div className={`space-y-2.5 ${isFull ? 'lg:col-span-full' : ''}`}>
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 flex items-center">
      {label}
      {required && <span className="text-rose-500 ml-1.5 font-black">*</span>}
    </label>
    {children}
  </div>
);

const StatCard: React.FC<{ label: string; value: string; color?: string; isLast?: boolean }> = ({ label, value, color, isLast }) => (
  <div className={`flex flex-col space-y-3 ${!isLast ? 'lg:border-r lg:border-white/10' : ''}`}>
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{label}</span>
    <span className={`text-3xl font-black font-mono tracking-tighter ${color || 'text-white'}`}>{value}</span>
  </div>
);
