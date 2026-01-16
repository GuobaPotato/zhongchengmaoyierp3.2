
import React from 'react';
import { ProductionTotalItem } from '../constants';

interface ProductionPlanDetailModalProps {
  item: ProductionTotalItem;
  onClose: () => void;
}

export const ProductionPlanDetailModal: React.FC<ProductionPlanDetailModalProps> = ({ item, onClose }) => {
  // 模拟判断是否存在不合格品
  const hasUnqualifiedItems = item.inspectedQty > 0 && (item.inspectedQty - item.producedQty !== 0 || item.planNo === "SC-JH-20260108");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="bg-white w-[800px] h-[600px] rounded-[2.5rem] shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* 标题栏 (Draggable UI Hint) */}
        <header className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0 cursor-move">
          <div className="flex items-center space-x-4">
             {hasUnqualifiedItems && (
               <span className="text-xs font-black text-rose-600 animate-pulse bg-rose-50 px-2 py-1 rounded-lg border border-rose-100">
                 ⚠️ 存在20件不合格品待处理
               </span>
             )}
             <div className="h-4 w-px bg-slate-200"></div>
             <h2 className="text-lg font-black text-slate-800 tracking-tight">生产计划详情【{item.planNo}】</h2>
          </div>
          <div className="flex items-center space-x-3">
            <span title="提示弹窗可拖拽" className="text-lg cursor-move opacity-30 hover:opacity-100 transition-opacity">🖱️</span>
            <button 
              onClick={onClose} 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-800"
            >
              ❌
            </button>
          </div>
        </header>

        {/* 滚动内容区 */}
        <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          
          {/* 一、计划基础信息 */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3">
               <div className="w-1.5 h-5 bg-indigo-600 rounded-full"></div>
               <h3 className="text-base font-black text-indigo-950 uppercase tracking-widest">一、计划基础信息</h3>
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-12 px-2">
              <DetailField label="计划类型" value={item.type === '订单生产' ? '订单生产计划' : '预生产计划'} />
              <DetailField label="生产计划编号" value={item.planNo} isMono />
              <div className="col-span-2">
                <DetailField 
                  label="计划关联信息" 
                  value={item.type === '预生产' 
                    ? "参考2025年Q4畅销规格（HC-SR501欧规220V）- 无关联海外订单" 
                    : "关联海外订单号 OD202601008 / 客户：XX欧美卫浴品牌"
                  } 
                />
              </div>
              <DetailField label="产品基础信息" value={`${item.productName} | ${item.specs}`} isBold />
              <DetailField label="批次号" value={item.batchNo} isMono />
              <DetailField label="计划生产数量" value={`${item.plannedQty} ${item.type === '预生产' ? '件' : '套'}`} />
              <div className="grid grid-cols-2 gap-4">
                <DetailField label="计划开工" value={item.plannedStart} isMono />
                <DetailField label="实际开工" value={item.actualStart} isMono color="text-indigo-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <DetailField label="计划完工" value={item.plannedEnd} isMono />
                 <DetailField label="实际完工" value={item.actualEnd === '-' ? '进行中' : item.actualEnd} isMono color={item.actualEnd === '-' ? 'text-amber-500' : 'text-emerald-500'} />
              </div>
              <DetailField label="归属班组" value={`${item.team} (${item.leader})`} />
            </div>
          </section>

          <div className="border-t border-dashed border-slate-200"></div>

          {/* 二、生产工单信息 */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3">
               <div className="w-1.5 h-5 bg-indigo-600 rounded-full"></div>
               <h3 className="text-base font-black text-indigo-950 uppercase tracking-widest">二、生产工单信息</h3>
            </div>
            <div className="grid grid-cols-3 gap-6 px-2">
               <DetailField label="生产工单号" value={item.workOrderNo} isMono />
               <DetailField label="工单状态" value={item.status} color="text-indigo-600" isBadge />
               <DetailField label="创建日期" value="2026-01-07" isMono />
            </div>

            {/* 工序执行明细 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">工序执行明细 (Process Execution)</p>
              <div className="space-y-2">
                 {[
                   { name: "元器件组装", time: "2026-01-09", qty: 1000, executor: "张XX", status: "已完成" },
                   { name: "电压调试（欧规220V适配）", time: "2026-01-10", qty: 1000, executor: "李XX", status: "已完成" },
                   { name: "老化测试（48小时）", time: "2026-01-12", qty: 1000, executor: "王XX", status: "已完成" },
                   { name: "包装贴标（贴CE认证标）", time: "2026-01-15", qty: 0, executor: "--", status: "未开始" }
                 ].map((proc, i) => (
                   <div key={i} className="flex items-center justify-between text-xs bg-white p-4 rounded-xl border border-slate-100 shadow-sm group">
                      <div className="flex items-center space-x-4">
                         <span className="w-5 h-5 flex items-center justify-center bg-slate-100 rounded-full font-black text-[9px] text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">{i+1}</span>
                         <span className="font-bold text-slate-700">{proc.name}</span>
                      </div>
                      <div className="flex items-center space-x-6">
                         <div className="text-right">
                           <p className="text-[10px] text-slate-400 uppercase font-black">执行人</p>
                           <p className="font-bold text-slate-600">{proc.executor}</p>
                         </div>
                         <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${proc.status === '已完成' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-300'}`}>
                           {proc.status}
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            {/* 原材料明细 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">原材料消耗清单 (Raw Materials)</p>
               <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: "红外感应芯片", supplier: "众诚电子", qty: "1000个" },
                    { name: "PCB电路板", supplier: "华科电路", qty: "1000块" },
                    { name: "ABS防水外壳", supplier: "华塑工贸", qty: "1000个" }
                  ].map((mat, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col space-y-1">
                       <span className="text-xs font-black text-slate-800">{mat.name}</span>
                       <span className="text-[9px] text-slate-400 font-bold uppercase">{mat.supplier}</span>
                       <span className="text-xs font-mono font-black text-indigo-600 mt-1">{mat.qty}</span>
                    </div>
                  ))}
               </div>
            </div>
          </section>

          <div className="border-t border-dashed border-slate-200"></div>

          {/* 三、质检标准 & 质检记录 */}
          <section className="space-y-6">
            <div className="flex items-center space-x-3">
               <div className="w-1.5 h-5 bg-indigo-600 rounded-full"></div>
               <h3 className="text-base font-black text-indigo-950 uppercase tracking-widest">三、质检标准 & 质检记录</h3>
            </div>
            
            <div className="bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100 space-y-6">
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatBox label="总产出" value="1000" unit="件" />
                  <StatBox label="抽检数 (20%)" value="200" unit="件" />
                  <StatBox label="合格数" value="180" unit="件" color="text-emerald-600" />
                  <StatBox label="不合格数" value="20" unit="件" color="text-rose-600" />
               </div>
               
               <div className="space-y-4 pt-4 border-t border-indigo-100">
                  <div className="flex items-start space-x-3">
                     <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">异常分析:</span>
                     <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                        “ 感应距离偏差系调试参数未校准 (15件)，外观划痕系包装防护不足 (5件) ”
                     </p>
                  </div>
                  <div className="flex items-center space-x-4">
                     <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">处理方案:</span>
                     <div className="flex gap-2">
                        {["返工调试", "打磨抛光", "拒收报废"].map(plan => (
                          <span key={plan} className="px-3 py-1 bg-white border border-rose-100 rounded-full text-[10px] font-black text-rose-600 shadow-sm cursor-pointer hover:bg-rose-50 transition-colors">
                            {plan}
                          </span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </section>
        </div>

        {/* 底部操作栏 (Fixed) */}
        <footer className="px-10 py-8 border-t border-slate-100 flex justify-between items-center shrink-0 bg-white/80 backdrop-blur-md z-40">
          <div className="flex items-center space-x-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
             <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> DATA INTEGRITY OK</span>
          </div>
          <div className="flex space-x-4">
            {item.status === '生产中' && (
              <button className="px-8 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 active:scale-95">
                更新进度
              </button>
            )}
            {hasUnqualifiedItems && (
              <button className="px-8 py-2.5 bg-rose-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-100 active:scale-95">
                处理质检异常
              </button>
            )}
            <button className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
              导出详情
            </button>
            <button onClick={onClose} className="px-8 py-2.5 bg-slate-400 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-slate-500 transition-all active:scale-95">
              关闭
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

const DetailField: React.FC<{ label: string; value: string | number; isBold?: boolean; isMono?: boolean; isItalic?: boolean; isBadge?: boolean; color?: string }> = ({ label, value, isBold, isMono, isItalic, isBadge, color }) => (
  <div className="space-y-1.5">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <div className={`text-sm ${color || 'text-slate-700'} ${isBold ? 'font-black' : 'font-bold'} ${isMono ? 'font-mono' : ''} ${isItalic ? 'italic text-slate-400' : ''}`}>
      {isBadge ? <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100 shadow-sm">{value}</span> : value}
    </div>
  </div>
);

const StatBox: React.FC<{ label: string; value: string | number; unit?: string; color?: string }> = ({ label, value, unit, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{label}</p>
    <div className="flex items-baseline space-x-1.5">
      <span className={`text-2xl font-black font-mono tracking-tighter ${color || 'text-slate-800'}`}>{value}</span>
      {unit && <span className="text-[10px] font-black text-slate-400 uppercase">{unit}</span>}
    </div>
  </div>
);
