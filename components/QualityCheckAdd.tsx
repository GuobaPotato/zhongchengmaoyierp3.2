
import React, { useState, useEffect } from 'react';

interface QualityCheckAddProps {
  onClose: () => void;
}

export const QualityCheckAdd: React.FC<QualityCheckAddProps> = ({ onClose }) => {
  // 模拟自动生成的单据号
  const [orderNo] = useState(() => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const seq = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `QC-${date}-${seq}`;
  });

  const [formData, setFormData] = useState({
    check_type: '',
    source_order_no: '',
    material_name: '',
    material_spec: '',
    batch_no: '',
    warehouse_location: '',
    warehouse_position: '',
    plan_check_quantity: '',
    check_remark: ''
  });

  const [isRemarkOpen, setIsRemarkOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 模拟远程搜索数据
  const MOCK_SOURCE_ORDERS = ["PO20260110-001", "PO20260112-005", "PO20260113-099"];
  const MOCK_BATCHES: Record<string, string[]> = {
    "PO20260110-001": ["LOT-A-01", "LOT-A-02"],
    "PO20260112-005": ["LOT-B-88", "LOT-B-89"],
    "PO20260113-099": ["LOT-C-101"]
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.check_type) newErrors.check_type = "请选择质检类型";
    if (!formData.source_order_no) newErrors.source_order_no = "请选择来料单号";
    if (!formData.material_name) newErrors.material_name = "请输入物料名称";
    if (!formData.material_spec) newErrors.material_spec = "请输入物料规格";
    if (!formData.batch_no) newErrors.batch_no = "请选择批次号";
    if (!formData.warehouse_location) newErrors.warehouse_location = "请选择仓位";
    if (!formData.warehouse_position) newErrors.warehouse_position = "请输入库位";
    
    const qty = parseInt(formData.plan_check_quantity);
    if (isNaN(qty) || qty < 1) newErrors.plan_check_quantity = "数量不能小于1";
    if (qty > 999999) newErrors.plan_check_quantity = "数量不能超过999999";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Submitting QC Order:', { ...formData, check_order_no: orderNo });
      // 模拟提交成功
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right-10 duration-500 overflow-hidden">
      {/* 顶部标题栏 */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-sm">
        <div className="flex items-center space-x-5">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-100">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">创建质检单</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Quality Check Result Input</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            取消
          </button>
          <button 
            onClick={handleSubmit}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            提交单据
          </button>
        </div>
      </header>

      {/* 表单内容 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-12 space-y-10 pb-32">
          
          {/* 区块 1: 基础信息 */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-3">
              <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">基础信息 (Base Info)</h3>
            </div>
            
            <div className="p-10 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <FormItem label="质检单号" helpText="格式：QC-YYYYMMDD-序列号，创建时自动生成">
                   <input 
                    type="text" 
                    readOnly 
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-400 cursor-not-allowed outline-none"
                    value={orderNo}
                  />
                </FormItem>

                <FormItem label="质检类型" required error={errors.check_type}>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                    value={formData.check_type}
                    onChange={e => setFormData({...formData, check_type: e.target.value})}
                  >
                    <option value="">请选择质检类型</option>
                    <option value="incoming_material">来料质检</option>
                    <option value="finished_product">成品质检</option>
                    <option value="delivery">出货质检</option>
                  </select>
                </FormItem>

                <FormItem label="来料单号" required helpText="关联采购订单，支持远程搜索" error={errors.source_order_no}>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
                    value={formData.source_order_no}
                    onChange={e => setFormData({...formData, source_order_no: e.target.value, batch_no: ''})}
                  >
                    <option value="">请选择来料单号</option>
                    {MOCK_SOURCE_ORDERS.map(no => <option key={no} value={no}>{no}</option>)}
                  </select>
                </FormItem>

                <FormItem label="批次号" required helpText="关联所选来料单号的批次号" error={errors.batch_no}>
                  <select 
                    disabled={!formData.source_order_no}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    value={formData.batch_no}
                    onChange={e => setFormData({...formData, batch_no: e.target.value})}
                  >
                    <option value="">{formData.source_order_no ? '请选择批次' : '先选择来料单号'}</option>
                    {formData.source_order_no && MOCK_BATCHES[formData.source_order_no]?.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </FormItem>

                <FormItem label="物料名称" required helpText="外壳、管道、小线圈等原材料名称" error={errors.material_name}>
                  <input 
                    type="text" 
                    placeholder="请输入物料名称" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
                    value={formData.material_name}
                    onChange={e => setFormData({...formData, material_name: e.target.value})}
                  />
                </FormItem>

                <FormItem label="物料规格" required helpText="原材料的型号、尺寸等规格信息" error={errors.material_spec}>
                  <input 
                    type="text" 
                    placeholder="请输入物料规格" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
                    value={formData.material_spec}
                    onChange={e => setFormData({...formData, material_spec: e.target.value})}
                  />
                </FormItem>

                <FormItem label="仓位选择" required helpText="选择物料对应的存储仓位" error={errors.warehouse_location}>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                    value={formData.warehouse_location}
                    onChange={e => setFormData({...formData, warehouse_location: e.target.value})}
                  >
                    <option value="">请选择仓位</option>
                    <option value="semi_finished_location">半成品仓位</option>
                    <option value="finished_product_location">成品仓位</option>
                    <option value="pending_inspection_location">待检区仓位</option>
                  </select>
                </FormItem>

                <FormItem label="库位" required helpText="具体的库位编号，如A-01-02" error={errors.warehouse_position}>
                  <input 
                    type="text" 
                    placeholder="请输入库位" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
                    value={formData.warehouse_position}
                    onChange={e => setFormData({...formData, warehouse_position: e.target.value})}
                  />
                </FormItem>

                <FormItem label="计划质检数量" required error={errors.plan_check_quantity}>
                   <div className="relative group">
                     <input 
                        type="number" 
                        placeholder="请输入数量" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-black text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
                        value={formData.plan_check_quantity}
                        onChange={e => setFormData({...formData, plan_check_quantity: e.target.value})}
                      />
                      <span className="absolute right-4 top-3.5 text-[10px] font-black text-slate-300 uppercase tracking-tighter">Units</span>
                   </div>
                </FormItem>
              </div>
            </div>
          </section>

          {/* 区块 2: 备注信息 (可折叠) */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div 
              className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between cursor-pointer group"
              onClick={() => setIsRemarkOpen(!isRemarkOpen)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-slate-400 rounded-full group-hover:bg-indigo-400 transition-colors"></div>
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">备注信息 (Remark)</h3>
              </div>
              <svg className={`w-5 h-5 text-slate-300 transition-transform duration-300 ${isRemarkOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {isRemarkOpen && (
              <div className="p-10 animate-in fade-in slide-in-from-top-2 duration-300">
                <FormItem label="质检备注">
                   <textarea 
                    rows={4}
                    placeholder="请输入质检相关备注信息（选填）"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm font-medium text-slate-600 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all resize-none shadow-inner"
                    value={formData.check_remark}
                    onChange={e => setFormData({...formData, check_remark: e.target.value})}
                  />
                </FormItem>
              </div>
            )}
          </section>

          <div className="bg-indigo-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
             <div className="relative z-10 flex items-start space-x-6">
                <div className="bg-white/10 p-3 rounded-2xl">
                   <svg className="w-6 h-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                </div>
                <div className="space-y-2">
                   <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-300">操作指南</h4>
                   <p className="text-sm text-indigo-100 leading-relaxed font-medium">
                      质检单创建后将进入【待质检】状态。质检员需在实物检验完成后，进入详情页录入检验结果、上传检测报告，并判定合格情况。关联单据将同步更新其质检环节的执行状态。
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>

      <footer className="bg-white border-t border-slate-100 px-10 py-5 flex justify-between items-center shrink-0 shadow-inner">
         <span className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest">Quality Assurance Management v3.1</span>
         <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[9px] font-black text-emerald-600 uppercase">System Ready for submission</span>
         </div>
      </footer>
    </div>
  );
};

/* --- 内部辅助组件 --- */

const FormItem: React.FC<{ 
  label: string; 
  required?: boolean; 
  helpText?: string; 
  error?: string;
  children: React.ReactNode 
}> = ({ label, required, helpText, error, children }) => (
  <div className="space-y-2.5">
    <div className="flex justify-between items-center px-1">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center">
        {label}
        {required && <span className="text-rose-500 ml-1 font-black">*</span>}
      </label>
      {error && <span className="text-[9px] font-black text-rose-500 uppercase tracking-tighter animate-bounce">{error}</span>}
    </div>
    {children}
    {helpText && !error && <p className="text-[9px] text-slate-300 italic font-medium ml-1 leading-tight">{helpText}</p>}
  </div>
);
