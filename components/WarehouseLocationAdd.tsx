
import React, { useState } from 'react';

interface WarehouseLocationAddProps {
  onClose: () => void;
}

export const WarehouseLocationAdd: React.FC<WarehouseLocationAddProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    locationCode: '',
    locationName: '',
    locationType: '',
    locationStatus: 'ENABLE',
    managerId: '',
    remark: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.locationCode) newErrors.locationCode = '库位编码为必填项';
    else if (!/^[A-Za-z0-9\-]+$/.test(formData.locationCode)) newErrors.locationCode = '库位编码仅支持字母、数字和连字符';
    
    if (!formData.locationName) newErrors.locationName = '库位名称为必填项';
    if (!formData.locationType) newErrors.locationType = '库位类别为必填项';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      // Mock save action
      console.log('Saving location:', formData);
      onClose();
    }
  };

  const handleReset = () => {
    setFormData({
      locationCode: '',
      locationName: '',
      locationType: '',
      locationStatus: 'ENABLE',
      managerId: '',
      remark: ''
    });
    setErrors({});
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Page Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-40 shrink-0 shadow-sm">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-indigo-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-black text-slate-800 tracking-tight text-shadow-sm">新增库位</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleReset}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all uppercase tracking-widest"
          >
            重置
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest active:scale-95"
          >
            保存
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8 lg:p-12">
          
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden p-10 lg:p-16">
            <div className="space-y-10">
               
               {/* Field: locationCode */}
               <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <label className="w-[120px] text-sm font-black text-slate-500 md:text-right uppercase tracking-wider shrink-0">
                     库位编码 <span className="text-rose-500 ml-1">*</span>
                  </label>
                  <div className="flex-1 space-y-1">
                     <input 
                        type="text" 
                        maxLength={20}
                        placeholder="请输入库位编码，如WH01-KQ02-005"
                        className={`w-full bg-slate-50 border ${errors.locationCode ? 'border-rose-300 ring-rose-50' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-50'} rounded-xl px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4`}
                        value={formData.locationCode}
                        onChange={e => setFormData({...formData, locationCode: e.target.value})}
                     />
                     {errors.locationCode && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight ml-1">{errors.locationCode}</p>}
                  </div>
               </div>

               {/* Field: locationName */}
               <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <label className="w-[120px] text-sm font-black text-slate-500 md:text-right uppercase tracking-wider shrink-0">
                     库位名称 <span className="text-rose-500 ml-1">*</span>
                  </label>
                  <div className="flex-1 space-y-1">
                     <input 
                        type="text" 
                        maxLength={50}
                        placeholder="请输入库位名称"
                        className={`w-full bg-slate-50 border ${errors.locationName ? 'border-rose-300 ring-rose-50' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-50'} rounded-xl px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4`}
                        value={formData.locationName}
                        onChange={e => setFormData({...formData, locationName: e.target.value})}
                     />
                     {errors.locationName && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight ml-1">{errors.locationName}</p>}
                  </div>
               </div>

               {/* Field: locationType */}
               <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <label className="w-[120px] text-sm font-black text-slate-500 md:text-right uppercase tracking-wider shrink-0">
                     库位类别 <span className="text-rose-500 ml-1">*</span>
                  </label>
                  <div className="flex-1 space-y-1">
                     <div className="relative group">
                        <select 
                           className={`w-full appearance-none bg-slate-50 border ${errors.locationType ? 'border-rose-300 ring-rose-50' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-50'} rounded-xl px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4 cursor-pointer`}
                           value={formData.locationType}
                           onChange={e => setFormData({...formData, locationType: e.target.value})}
                        >
                           <option value="">请选择库位类别</option>
                           <option value="INCOMING_AREA">来料区</option>
                           <option value="FINISHED_AREA">成品区</option>
                           <option value="PENDING_AREA">待检区</option>
                        </select>
                        <div className="absolute right-4 top-3.5 text-slate-400 pointer-events-none group-hover:text-indigo-500 transition-colors">
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                     </div>
                     {errors.locationType && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight ml-1">{errors.locationType}</p>}
                  </div>
               </div>

               {/* Field: locationStatus */}
               <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <label className="w-[120px] text-sm font-black text-slate-500 md:text-right uppercase tracking-wider shrink-0">
                     库位状态 <span className="text-rose-500 ml-1">*</span>
                  </label>
                  <div className="flex-1 flex space-x-6">
                     <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${formData.locationStatus === 'ENABLE' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 group-hover:border-indigo-300'}`}>
                           {formData.locationStatus === 'ENABLE' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                        </div>
                        <input 
                           type="radio" 
                           className="hidden" 
                           checked={formData.locationStatus === 'ENABLE'} 
                           onChange={() => setFormData({...formData, locationStatus: 'ENABLE'})}
                        />
                        <span className={`text-sm font-bold ${formData.locationStatus === 'ENABLE' ? 'text-indigo-600' : 'text-slate-500'}`}>启用</span>
                     </label>
                     <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${formData.locationStatus === 'DISABLE' ? 'border-rose-500 bg-rose-500' : 'border-slate-300 group-hover:border-rose-300'}`}>
                           {formData.locationStatus === 'DISABLE' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                        </div>
                        <input 
                           type="radio" 
                           className="hidden" 
                           checked={formData.locationStatus === 'DISABLE'} 
                           onChange={() => setFormData({...formData, locationStatus: 'DISABLE'})}
                        />
                        <span className={`text-sm font-bold ${formData.locationStatus === 'DISABLE' ? 'text-rose-500' : 'text-slate-500'}`}>禁用</span>
                     </label>
                  </div>
               </div>

               {/* Field: managerId */}
               <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <label className="w-[120px] text-sm font-black text-slate-500 md:text-right uppercase tracking-wider shrink-0">
                     负责人
                  </label>
                  <div className="flex-1">
                     <input 
                        type="text" 
                        maxLength={50}
                        placeholder="请输入负责人姓名"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-indigo-50 rounded-xl px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                        value={formData.managerId}
                        onChange={e => setFormData({...formData, managerId: e.target.value})}
                     />
                  </div>
               </div>

               {/* Field: remark */}
               <div className="flex flex-col md:flex-row gap-4">
                  <label className="w-[120px] text-sm font-black text-slate-500 md:text-right uppercase tracking-wider shrink-0 pt-3">
                     备注信息
                  </label>
                  <div className="flex-1">
                     <textarea 
                        rows={4}
                        maxLength={200}
                        placeholder="请输入备注信息"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-indigo-50 rounded-2xl px-4 py-4 text-sm font-bold transition-all outline-none focus:ring-4 resize-none shadow-inner"
                        value={formData.remark}
                        onChange={e => setFormData({...formData, remark: e.target.value})}
                     />
                     <div className="flex justify-end mt-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                           {formData.remark.length} / 200 Characters
                        </span>
                     </div>
                  </div>
               </div>

            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-3xl p-8 flex items-start space-x-4">
             <div className="bg-white p-2 rounded-xl shadow-sm text-indigo-500 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <div className="space-y-1">
                <h4 className="text-sm font-black text-indigo-700 uppercase tracking-widest">填写提示</h4>
                <p className="text-xs text-indigo-600 leading-relaxed font-medium">
                  库位编码应根据仓库物理布局定义（如 仓库号-区域号-货架号-层号）。新增库位成功后，系统将自动生成对应库位的唯一条码，用于后续入库与盘点扫码作业。
                </p>
             </div>
          </div>

        </div>
      </div>

      {/* Sticky Bottom Actions (Optional, but spec has buttons in header too) */}
      <footer className="bg-white border-t border-slate-100 px-10 py-6 flex justify-end shrink-0 z-40 shadow-inner">
         <button 
            onClick={onClose}
            className="px-12 py-3 bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-all active:scale-95"
         >
            BACK / 返回
         </button>
      </footer>
    </div>
  );
};
