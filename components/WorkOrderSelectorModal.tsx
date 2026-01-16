
import React, { useState } from 'react';

interface ProcessDetail {
  processName: string;
  processCode: string;
  productName: string;
  productCode: string;
  productAttribute: string;
  specModel: string;
  plannedProductionQty: string;
  dispatchedQty: string;
  currentDispatchedQty: string;
  unit: string;
  startTime: string;
  endTime: string;
  bomCode: string;
}

interface WorkOrder {
  productionPlanNo: string;
  productionPlanName: string;
  materialWarehouse: string;
  productionTeam: string;
  teamLeader: string;
  workOrderStartDate: string;
  workOrderEndDate: string;
  workOrderStatus: string;
  productionWorkOrderName: string;
  productionWorkOrderNo: string;
  finishedProductBatchNo: string;
  processDetails: ProcessDetail[];
}

const MOCK_WORK_ORDERS: WorkOrder[] = [
  {
    productionPlanNo: "SC-JH-202601",
    productionPlanName: "感应龙头外壳生产计划202601",
    materialWarehouse: "原料仓",
    productionTeam: "组装一班",
    teamLeader: "李班组",
    workOrderStartDate: "2026-01-05",
    workOrderEndDate: "2026-01-09",
    workOrderStatus: "已派工",
    productionWorkOrderName: "感应龙头外壳（ABS）组装+检测工单",
    productionWorkOrderNo: "SG-GD-20260109",
    finishedProductBatchNo: "QC-20260109",
    processDetails: [
      { processName: "外壳注塑", processCode: "GX-001", productName: "感应龙头外壳（ABS）", productCode: "SP-001", productAttribute: "医用级防菌", specModel: "12*45*123", plannedProductionQty: "500", dispatchedQty: "500", currentDispatchedQty: "500", unit: "件", startTime: "2026-01-05", endTime: "2026-01-09", bomCode: "BOM-001" },
      { processName: "精密组装", processCode: "GX-002", productName: "感应龙头外壳（ABS）", productCode: "SP-001", productAttribute: "医用级防菌", specModel: "12*45*123", plannedProductionQty: "500", dispatchedQty: "500", currentDispatchedQty: "500", unit: "件", startTime: "2026-01-05", endTime: "2026-01-09", bomCode: "BOM-001" },
      { processName: "防菌检测", processCode: "GX-003", productName: "感应龙头外壳（ABS）", productCode: "SP-001", productAttribute: "医用级防菌", specModel: "12*45*123", plannedProductionQty: "500", dispatchedQty: "500", currentDispatchedQty: "500", unit: "件", startTime: "2026-01-05", endTime: "2026-01-09", bomCode: "BOM-001" }
    ]
  },
  {
    productionPlanNo: "SC-JH-202602",
    productionPlanName: "医用感应线圈生产计划202602",
    materialWarehouse: "原料仓",
    productionTeam: "组装二班",
    teamLeader: "张班组",
    workOrderStartDate: "2026-01-06",
    workOrderEndDate: "2026-01-10",
    workOrderStatus: "待派工",
    productionWorkOrderName: "医用感应线圈组装工单",
    productionWorkOrderNo: "SG-GD-20260110",
    finishedProductBatchNo: "QC-20260110",
    processDetails: [
      { processName: "线圈绕制", processCode: "GX-004", productName: "感应线圈（医用级）", productCode: "SP-002", productAttribute: "医用级绝缘", specModel: "Φ8*20", plannedProductionQty: "300", dispatchedQty: "0", currentDispatchedQty: "300", unit: "个", startTime: "2026-01-06", endTime: "2026-01-10", bomCode: "BOM-002" },
      { processName: "线圈检测", processCode: "GX-005", productName: "感应线圈（医用级）", productCode: "SP-002", productAttribute: "医用级绝缘", specModel: "Φ8*20", plannedProductionQty: "300", dispatchedQty: "0", currentDispatchedQty: "300", unit: "个", startTime: "2026-01-06", endTime: "2026-01-10", bomCode: "BOM-002" }
    ]
  }
];

interface WorkOrderSelectorModalProps {
  onSelect: (order: WorkOrder) => void;
  onClose: () => void;
}

export const WorkOrderSelectorModal: React.FC<WorkOrderSelectorModalProps> = ({ onSelect, onClose }) => {
  const [selectedNo, setSelectedNo] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleConfirm = () => {
    const selected = MOCK_WORK_ORDERS.find(o => o.productionWorkOrderNo === selectedNo);
    if (selected) {
      onSelect(selected);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-[90vw] h-[80vh] rounded-[2.5rem] shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
        {/* Header */}
        <header className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm">
               <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zM9 11h6M9 15h6" /></svg>
            </div>
            <h2 className="text-lg font-black text-slate-800 tracking-tight">选择数据 (Select Work Order)</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        {/* Toolbar */}
        <div className="px-8 py-4 border-b border-slate-50 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center space-x-4 flex-1">
             <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 flex items-center space-x-2">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v15m7.5-7.5h-15" /></svg>
                <span>+添加</span>
             </button>
             <div className="relative max-w-md w-full">
                <input 
                  type="text" 
                  placeholder="输入生产工单名称/产品名称搜索"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 pl-10 text-xs font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <svg className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
             </div>
             <button className="px-5 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center space-x-2">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                <span>筛选</span>
             </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto relative">
           <table className="min-w-[3200px] text-left border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-20 shadow-sm">
                 <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
                    <th className="px-6 py-4 w-12 text-center border-b border-slate-100 sticky left-0 bg-slate-50 z-30 border-r border-slate-100">选择</th>
                    <th className="px-6 py-4 w-40 border-b border-slate-100 sticky left-[48px] bg-slate-50 z-30 border-r border-slate-100">生产计划编号</th>
                    <th className="px-6 py-4 border-b border-slate-100">生产计划名称</th>
                    <th className="px-4 py-4 border-b border-slate-100">领料仓库</th>
                    <th className="px-4 py-4 border-b border-slate-100">生产班组</th>
                    <th className="px-4 py-4 border-b border-slate-100">班组长</th>
                    <th className="px-4 py-4 border-b border-slate-100">工单开始日期</th>
                    <th className="px-4 py-4 border-b border-slate-100">工单完工日期</th>
                    <th className="px-4 py-4 border-b border-slate-100 text-center">工单状态</th>
                    <th className="px-6 py-4 border-b border-slate-100">生产工单名称</th>
                    <th className="px-6 py-4 border-b border-slate-100 font-mono">生产工单编号</th>
                    <th className="px-6 py-4 border-b border-slate-100 font-mono">产成品批次号</th>
                    {/* Process related columns - showing first process summary or expanded? Spec lists them as separate columns */}
                    <th className="px-6 py-4 border-b border-slate-100 bg-indigo-50/30">工序名称 (首序)</th>
                    <th className="px-6 py-4 border-b border-slate-100 font-mono bg-indigo-50/30">工序编码</th>
                    <th className="px-6 py-4 border-b border-slate-100 bg-indigo-50/30">产品名称</th>
                    <th className="px-6 py-4 border-b border-slate-100 font-mono bg-indigo-50/30">产品编码</th>
                    <th className="px-4 py-4 border-b border-slate-100 bg-indigo-50/30">产品属性</th>
                    <th className="px-4 py-4 border-b border-slate-100 bg-indigo-50/30">规格型号</th>
                    <th className="px-4 py-4 text-right border-b border-slate-100">计划生产数量</th>
                    <th className="px-4 py-4 text-right border-b border-slate-100">已派工数量</th>
                    <th className="px-4 py-4 text-right border-b border-slate-100 font-black text-indigo-600">本次派工数量</th>
                    <th className="px-4 py-4 text-center border-b border-slate-100">单位</th>
                    <th className="px-6 py-4 border-b border-slate-100">开工时间</th>
                    <th className="px-6 py-4 border-b border-slate-100">完工时间</th>
                    <th className="px-6 py-4 border-b border-slate-100 font-mono">BOM编码</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {MOCK_WORK_ORDERS.map((order) => {
                   const firstProc = order.processDetails[0];
                   return (
                    <tr 
                      key={order.productionWorkOrderNo} 
                      className={`group hover:bg-indigo-50/30 transition-colors cursor-pointer ${selectedNo === order.productionWorkOrderNo ? 'bg-indigo-50/50' : ''}`}
                      onClick={() => setSelectedNo(order.productionWorkOrderNo)}
                    >
                      <td className="px-6 py-5 text-center sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100">
                        <input 
                          type="radio" 
                          name="wo-select"
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                          checked={selectedNo === order.productionWorkOrderNo}
                          onChange={() => setSelectedNo(order.productionWorkOrderNo)}
                        />
                      </td>
                      <td className="px-6 py-5 sticky left-[48px] bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100 font-mono font-black text-slate-800 text-sm shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                        {order.productionPlanNo}
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-700">{order.productionPlanName}</td>
                      <td className="px-4 py-5 text-xs font-bold text-slate-500">{order.materialWarehouse}</td>
                      <td className="px-4 py-5 text-xs font-bold text-slate-500">{order.productionTeam}</td>
                      <td className="px-4 py-5 text-xs font-bold text-slate-700">{order.teamLeader}</td>
                      <td className="px-4 py-5 text-xs font-mono text-slate-400">{order.workOrderStartDate}</td>
                      <td className="px-4 py-5 text-xs font-mono text-slate-400">{order.workOrderEndDate}</td>
                      <td className="px-4 py-5 text-center">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${order.workOrderStatus === '已派工' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                           {order.workOrderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm font-black text-slate-800">{order.productionWorkOrderName}</td>
                      <td className="px-6 py-5 text-xs font-mono font-bold text-indigo-600 tracking-tighter">{order.productionWorkOrderNo}</td>
                      <td className="px-6 py-5 text-xs font-mono font-bold text-slate-400">{order.finishedProductBatchNo}</td>
                      
                      <td className="px-6 py-5 text-xs font-bold text-slate-700 bg-indigo-50/10">{firstProc.processName}</td>
                      <td className="px-6 py-5 text-xs font-mono text-slate-400 bg-indigo-50/10">{firstProc.processCode}</td>
                      <td className="px-6 py-5 text-xs font-bold text-slate-700 bg-indigo-50/10">{firstProc.productName}</td>
                      <td className="px-6 py-5 text-xs font-mono text-slate-400 bg-indigo-50/10">{firstProc.productCode}</td>
                      <td className="px-4 py-5 text-xs font-bold text-indigo-600 bg-indigo-50/10">{firstProc.productAttribute}</td>
                      <td className="px-4 py-5 text-xs italic text-slate-400 bg-indigo-50/10">{firstProc.specModel}</td>
                      
                      <td className="px-4 py-5 text-right font-mono font-black text-slate-700">{firstProc.plannedProductionQty}</td>
                      <td className="px-4 py-5 text-right font-mono font-black text-slate-400">{firstProc.dispatchedQty}</td>
                      <td className="px-4 py-5 text-right font-mono font-black text-indigo-600">{firstProc.currentDispatchedQty}</td>
                      <td className="px-4 py-5 text-center text-xs font-bold text-slate-400">{firstProc.unit}</td>
                      <td className="px-6 py-5 text-xs font-mono text-slate-400">{firstProc.startTime}</td>
                      <td className="px-6 py-5 text-xs font-mono text-slate-400">{firstProc.endTime}</td>
                      <td className="px-6 py-5 text-xs font-mono text-slate-500 uppercase">{firstProc.bomCode}</td>
                    </tr>
                   );
                 })}
              </tbody>
           </table>
        </div>

        {/* Footer / Pagination */}
        <footer className="px-10 py-6 border-t border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-6 shrink-0">
          <div className="flex items-center space-x-12">
             <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
               TOTAL COUNT: <span className="text-slate-800 text-sm ml-1">2</span>
             </div>
             <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">每页显示:</span>
                <select className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold outline-none">
                  <option>20条</option>
                  <option>50条</option>
                </select>
             </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
               <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-100 text-slate-300 hover:bg-white transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
               </button>
               <button className="w-8 h-8 rounded-xl bg-indigo-600 text-white text-xs font-black shadow-lg shadow-indigo-100">1</button>
               <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-100 text-slate-300 hover:bg-white transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
               </button>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
              >
                取消
              </button>
              <button 
                onClick={handleConfirm}
                disabled={!selectedNo}
                className={`px-10 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                  selectedNo ? 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                确定
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
