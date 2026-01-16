
import React, { useState } from 'react';
import { PurchaseOrderItem } from '../constants';

interface Supplier {
  id: string;
  name: string;
  code: string;
  grade: string;
  available: number;
  price: string;
  cycle: string;
  contact: string;
  purchaseQty?: string;
}

interface OrderConversionViewProps {
  order: PurchaseOrderItem;
  onClose: () => void;
}

const MOCK_QUALIFIED_SUPPLIERS: Supplier[] = [
  { id: 'S1', name: '深圳芯片科技有限公司', code: 'SUP-0012', grade: 'A级', available: 50000, price: '¥8.5', cycle: '7天', contact: '王经理 138XXXX1234' },
  { id: 'S2', name: '宏达电子组件厂', code: 'SUP-0045', grade: 'B级', available: 30000, price: '¥8.2', cycle: '10天', contact: '李工 135XXXX5678' },
  { id: 'S3', name: '苏州精密半导体', code: 'SUP-0089', grade: 'A级', available: 15000, price: '¥8.8', cycle: '5天', contact: '张总 139XXXX9900' },
  { id: 'S4', name: '大族激光传感器部', code: 'SUP-0122', grade: 'C级', available: 100000, price: '¥7.9', cycle: '15天', contact: '赵经理 137XXXX4433' },
];

export const OrderConversionView: React.FC<OrderConversionViewProps> = ({ order, onClose }) => {
  const [activeSuppliers, setActiveSuppliers] = useState<Supplier[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remarks, setRemarks] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>('2026-01-25');
  const [tempSelection, setTempSelection] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const targetQty = 20000;
  const currentAllocated = activeSuppliers.reduce((sum, s) => sum + (Number(s.purchaseQty) || 0), 0);
  const isAllocationComplete = currentAllocated === targetQty;

  const handleQtyChange = (id: string, val: string) => {
    setActiveSuppliers(prev => prev.map(s => s.id === id ? { ...s, purchaseQty: val } : s));
  };

  const openModal = () => {
    setTempSelection(new Set(activeSuppliers.map(s => s.id)));
    setSearchQuery('');
    setIsModalOpen(true);
  };

  const confirmSelection = () => {
    const nextSuppliers = MOCK_QUALIFIED_SUPPLIERS.filter(s => tempSelection.has(s.id)).map(s => {
      const existing = activeSuppliers.find(as => as.id === s.id);
      return existing ? existing : { ...s, purchaseQty: '' };
    });
    setActiveSuppliers(nextSuppliers);
    setIsModalOpen(false);
  };

  const toggleTempSelection = (id: string) => {
    const next = new Set(tempSelection);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setTempSelection(next);
  };

  const removeSupplier = (id: string) => {
    setActiveSuppliers(prev => prev.filter(s => s.id !== id));
  };

  const filteredSuppliersForModal = MOCK_QUALIFIED_SUPPLIERS.filter(s => 
    s.name.includes(searchQuery) || s.code.includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex flex-col p-4 md:p-8 animate-in fade-in duration-200">
      <div className="bg-slate-50 w-full max-w-6xl mx-auto rounded-3xl shadow-2xl flex flex-col overflow-hidden h-full">
        {/* Header */}
        <header className="bg-white px-8 py-5 border-b border-slate-200 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-4">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-slate-800">采购申请转正式订单</h1>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Module 1: Fixed Demand Information */}
          <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-4 bg-slate-400 rounded-full"></div>
                <h3 className="text-sm font-bold text-slate-700">固定需求信息</h3>
              </div>
              <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Read Only</span>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-slate-50/30">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">关联生产计划编号</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">计划需求交货日期</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">采购申请编号</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">需求总数量（合计）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">PP-20260111-001</td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">2026-01-25</td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">PR-20260111-0001</td>
                    <td className="px-6 py-4 text-sm font-bold text-indigo-600">20000个</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Module 2: Material Requirement List */}
          <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center bg-slate-50/50">
              <div className="w-1 h-4 bg-slate-400 rounded-full mr-2"></div>
              <h3 className="text-sm font-bold text-slate-700">物料需求列表</h3>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-slate-50/30">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">物料编码</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">物料名称</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">规格型号</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">单位</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">需求总数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-50">
                    <td className="px-6 py-4 text-sm font-mono text-slate-700">MAT-0023</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">MEMS压力传感器芯片</td>
                    <td className="px-6 py-4 text-sm text-slate-500">MX-23型（精度±0.5%）</td>
                    <td className="px-6 py-4 text-sm text-slate-600">个</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">20000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Module 3: Supplier and Quantity Allocation */}
          <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-indigo-50/30">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                <h3 className="text-sm font-bold text-slate-800">供应商及采购数量分配</h3>
              </div>
              <button 
                onClick={openModal}
                className="px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-indigo-200 flex items-center"
              >
                <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                选择供应商
              </button>
            </div>
            
            <div className="px-6 py-3 bg-amber-50 border-b border-amber-100 flex items-center space-x-2 text-amber-700">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-xs">需选择该物料的合格供应商，且各供应商采购数量之和需等于需求总数量（20000个）</span>
            </div>

            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="bg-slate-50/50">
                  <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-4 py-3 w-12 text-center">操作</th>
                    <th className="px-4 py-3">供应商名称</th>
                    <th className="px-4 py-3">供应商编码</th>
                    <th className="px-4 py-3 text-center">等级</th>
                    <th className="px-4 py-3">可供数</th>
                    <th className="px-4 py-3 w-40">本次采购数量</th>
                    <th className="px-4 py-3">报价</th>
                    <th className="px-4 py-3">周期</th>
                    <th className="px-4 py-3">联系人/电话</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeSuppliers.length > 0 ? activeSuppliers.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/30">
                      <td className="px-4 py-4 text-center">
                        <button 
                          onClick={() => removeSupplier(s.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-slate-800">{s.name}</td>
                      <td className="px-4 py-4 text-sm font-mono text-slate-500">{s.code}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          s.grade === 'A级' ? 'bg-green-100 text-green-700' : 
                          s.grade === 'B级' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {s.grade}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">{s.available.toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <input 
                          type="number" 
                          placeholder="输入数量"
                          className={`w-full border rounded-lg px-3 py-1.5 text-sm focus:ring-2 outline-none transition-all ${
                            Number(s.purchaseQty) > s.available ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-indigo-500'
                          }`}
                          value={s.purchaseQty}
                          onChange={(e) => handleQtyChange(s.id, e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-slate-900">{s.price}</td>
                      <td className="px-4 py-4 text-sm text-slate-500">{s.cycle}</td>
                      <td className="px-4 py-4 text-sm text-slate-500">{s.contact}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={9} className="px-4 py-12 text-center text-slate-400 text-sm italic">
                        尚未选择供应商，请点击右上角「选择供应商」按钮进行分配
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-wrap justify-end items-center gap-6">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                   <span>不超供应商可供数</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                   <span>分配总额必须等于需求总额</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">当前分配:</span>
                  <span className={`text-lg font-bold font-mono ${isAllocationComplete ? 'text-green-600' : 'text-rose-600'}`}>
                    {currentAllocated.toLocaleString()} / {targetQty.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Module 4: Order Supplementary Information */}
          <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center bg-indigo-50/30">
              <div className="w-1 h-4 bg-indigo-500 rounded-full mr-2"></div>
              <h3 className="text-sm font-bold text-slate-800">订单补充信息</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">期望交货日期</label>
                  <input 
                    type="date" 
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                  <p className="mt-1.5 text-[10px] text-slate-400">默认同步生产计划需求日期</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">采购订单备注</label>
                <textarea 
                  rows={4}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  placeholder="填写订单特殊要求（如包装要求、物流方式等）"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            </div>
          </section>

        </div>

        {/* Footer Actions */}
        <footer className="bg-white px-8 py-6 border-t border-slate-200 flex justify-end items-center space-x-4 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
          >
            取消
          </button>
          <button className="px-6 py-2.5 bg-white border border-indigo-200 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all">
            保存为草稿
          </button>
          <button 
            disabled={!isAllocationComplete}
            className={`px-8 py-2.5 text-white rounded-xl font-bold shadow-lg transition-all ${
              isAllocationComplete 
                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 cursor-pointer scale-100 hover:scale-[1.02]' 
                : 'bg-slate-300 shadow-none cursor-not-allowed opacity-60'
            }`}
          >
            生成采购订单并审批
          </button>
        </footer>

        {/* Supplier Selection Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative flex flex-col overflow-hidden max-h-[85vh] animate-in zoom-in-95 duration-200">
              <header className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <h3 className="text-lg font-bold text-slate-800">选择合格供应商</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </header>
              
              <div className="px-6 py-4 border-b border-slate-100">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="搜索供应商名称、编码..."
                    className="w-full bg-slate-100 border-none rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80 sticky top-0 z-10">
                    <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <th className="px-6 py-3 w-12 text-center">选择</th>
                      <th className="px-4 py-3">供应商名称</th>
                      <th className="px-4 py-3 text-center">等级</th>
                      <th className="px-4 py-3">供应商编码</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSuppliersForModal.map(s => (
                      <tr 
                        key={s.id} 
                        className={`hover:bg-indigo-50/30 cursor-pointer transition-colors ${tempSelection.has(s.id) ? 'bg-indigo-50/50' : ''}`}
                        onClick={() => toggleTempSelection(s.id)}
                      >
                        <td className="px-6 py-5 text-center">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                            tempSelection.has(s.id) ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'
                          }`}>
                            {tempSelection.has(s.id) && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                        </td>
                        <td className="px-4 py-5">
                          <p className="text-sm font-bold text-slate-800">{s.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{s.contact}</p>
                        </td>
                        <td className="px-4 py-5 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            s.grade === 'A级' ? 'bg-green-100 text-green-700' : 
                            s.grade === 'B级' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {s.grade}
                          </span>
                        </td>
                        <td className="px-4 py-5 text-sm font-mono text-slate-500">{s.code}</td>
                      </tr>
                    ))}
                    {filteredSuppliersForModal.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-sm">
                          没有找到匹配的供应商
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <footer className="px-8 py-5 bg-slate-50 border-t border-slate-200 flex justify-between items-center shrink-0">
                <span className="text-xs text-slate-500">
                  当前已选中 <span className="font-bold text-indigo-600 px-1 text-sm">{tempSelection.size}</span> 个供应商
                </span>
                <div className="flex space-x-3">
                  <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">取消</button>
                  <button 
                    onClick={confirmSelection}
                    className="px-8 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
                  >
                    确认选择
                  </button>
                </div>
              </footer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
