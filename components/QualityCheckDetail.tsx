
import React, { useState } from 'react';

interface QualityCheckDetailProps {
  orderNo: string;
  onClose: () => void;
}

export const QualityCheckDetail: React.FC<QualityCheckDetailProps> = ({ orderNo, onClose }) => {
  const [activeTab, setActiveTab] = useState('QC_RESULT');
  // 模拟单据状态: INSPECTING (质检中), WAIT_APPROVAL (待审批), APPROVED (已通过)
  const [orderStatus, setOrderStatus] = useState('INSPECTING');

  // 模拟明细数据
  const [qcResults, setQcResults] = useState([
    { id: '1', materialCode: 'IR-MOD-G2', materialName: '红外感应模块', spec: 'V2.0', qcItem: '感应灵敏度', qcStandard: '3-5米', detectValue: '4.2', judgeResult: 'PASS', unqualifiedDesc: '' },
    { id: '2', materialCode: 'IR-MOD-G2', materialName: '红外感应模块', spec: 'V2.0', qcItem: '工作电流', qcStandard: '< 50mA', detectValue: '48', judgeResult: 'PASS', unqualifiedDesc: '' },
    { id: '3', materialCode: 'IR-MOD-G2', materialName: '红外感应模块', spec: 'V2.0', qcItem: '外观检查', qcStandard: '表面无划痕', detectValue: '有轻微划痕', judgeResult: 'CONCESSION', unqualifiedDesc: '由于订单紧急，客户接受轻微外观瑕疵' },
  ]);

  const [processOpinion, setProcessOpinion] = useState({
    totalJudge: 'ALL_PASS',
    processType: 'WAREHOUSE_IN',
    approvalOpinion: ''
  });

  const [warehouseInfo, setWarehouseInfo] = useState({
    locationType: 'INCOMING_AREA',
    locationCode: 'A01',
    warehouseInQty: 1000
  });

  const isEditable = (tabCode: string) => {
    if (tabCode === 'QC_RESULT') return orderStatus === 'INSPECTING';
    if (tabCode === 'PROCESS_OPINION') return ['INSPECTING', 'REJECTED'].includes(orderStatus);
    if (tabCode === 'WAREHOUSE_IN') return ['INSPECTING', 'WAIT_APPROVAL'].includes(orderStatus);
    return false;
  };

  const handleAction = (code: string) => {
    if (code === 'SUBMIT') {
      setOrderStatus('WAIT_APPROVAL');
      alert("质检结果已提交，请等待审批");
    } else if (code === 'APPROVE') {
      setOrderStatus('APPROVED');
      alert("审批已通过");
    } else if (code === 'BACK') {
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right-10 duration-500 overflow-hidden relative">
      {/* 顶部标题栏 */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-sm">
        <div className="flex items-center space-x-5">
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-black text-slate-800 tracking-tight">质检单详情</h1>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                orderStatus === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 
                orderStatus === 'WAIT_APPROVAL' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {orderStatus === 'INSPECTING' ? '质检中' : orderStatus === 'WAIT_APPROVAL' ? '待审批' : '已完成'}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5 tracking-tight">{orderNo}</p>
          </div>
        </div>
      </header>

      {/* 标签切换栏 */}
      <nav className="bg-white border-b border-slate-100 px-8 flex shrink-0 sticky top-16 z-20">
        {[
          { code: 'QC_RESULT', name: '质检结果' },
          { code: 'PROCESS_OPINION', name: '处理意见' },
          { code: 'WAREHOUSE_IN', name: '入库信息' }
        ].map(tab => (
          <button
            key={tab.code}
            onClick={() => setActiveTab(tab.code)}
            className={`px-8 py-4 text-sm font-bold transition-all relative ${
              activeTab === tab.code ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.name}
            {activeTab === tab.code && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
          </button>
        ))}
      </nav>

      {/* 内容主体 */}
      <div className="flex-1 overflow-y-auto bg-slate-50/30">
        <div className="max-w-[1400px] mx-auto p-8 pb-40 space-y-8">
          
          {activeTab === 'QC_RESULT' && (
            <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">检测明细结果</h3>
                </div>
                {!isEditable('QC_RESULT') && <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-100 px-3 py-1 rounded-full">Read Only</span>}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/80 font-black text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4">物料编码/名称</th>
                      <th className="px-4 py-4">质检项目</th>
                      <th className="px-4 py-4">标准值</th>
                      <th className="px-4 py-4">检测值</th>
                      <th className="px-4 py-4 text-center">判定结果</th>
                      <th className="px-6 py-4">不合格说明</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {qcResults.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-800 tracking-tight">{item.materialCode}</span>
                            <span className="text-[10px] text-slate-400 font-bold mt-0.5">{item.materialName} ({item.spec})</span>
                          </div>
                        </td>
                        <td className="px-4 py-5 text-sm font-bold text-slate-700">{item.qcItem}</td>
                        <td className="px-4 py-5 text-xs text-slate-400 italic font-medium">{item.qcStandard}</td>
                        <td className="px-4 py-5">
                          <input 
                            disabled={!isEditable('QC_RESULT')}
                            type="text" 
                            className={`w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-mono font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${!isEditable('QC_RESULT') ? 'cursor-not-allowed text-slate-400' : 'text-indigo-600'}`}
                            defaultValue={item.detectValue}
                          />
                        </td>
                        <td className="px-4 py-5 text-center">
                          <select 
                            disabled={!isEditable('QC_RESULT')}
                            className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-black text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
                            defaultValue={item.judgeResult}
                          >
                            <option value="PASS">合格</option>
                            <option value="FAIL">不合格</option>
                            <option value="CONCESSION">让步接收</option>
                          </select>
                        </td>
                        <td className="px-6 py-5">
                           <textarea 
                             disabled={!isEditable('QC_RESULT')}
                             rows={1}
                             className="w-full bg-transparent border-none text-xs text-slate-500 focus:ring-0 outline-none resize-none italic"
                             placeholder="填写差异原因..."
                             defaultValue={item.unqualifiedDesc}
                           />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === 'PROCESS_OPINION' && (
            <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden p-12">
               <div className="max-w-2xl space-y-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">处理决策意见</h3>
                  </div>
                  
                  <DetailFormItem label="整体判定" required>
                     <select 
                        disabled={!isEditable('PROCESS_OPINION')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50"
                        value={processOpinion.totalJudge}
                        onChange={e => setProcessOpinion({...processOpinion, totalJudge: e.target.value})}
                     >
                        <option value="ALL_PASS">全部合格</option>
                        <option value="PART_FAIL">部分不合格</option>
                        <option value="ALL_FAIL">全部不合格</option>
                     </select>
                  </DetailFormItem>

                  <DetailFormItem label="处理方式" required>
                     <select 
                        disabled={!isEditable('PROCESS_OPINION')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50"
                        value={processOpinion.processType}
                        onChange={e => setProcessOpinion({...processOpinion, processType: e.target.value})}
                     >
                        <option value="WAREHOUSE_IN">合格入库</option>
                        <option value="RETURN">退货</option>
                        <option value="REWORK">返工</option>
                     </select>
                  </DetailFormItem>

                  <DetailFormItem label="审批意见">
                     <textarea 
                        disabled={!isEditable('PROCESS_OPINION')}
                        rows={5}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-sm font-medium text-slate-600 outline-none focus:ring-4 focus:ring-indigo-50 resize-none shadow-inner"
                        placeholder="请输入最终审核结论或整改要求..."
                        value={processOpinion.approvalOpinion}
                        onChange={e => setProcessOpinion({...processOpinion, approvalOpinion: e.target.value})}
                     />
                  </DetailFormItem>
               </div>
            </section>
          )}

          {activeTab === 'WAREHOUSE_IN' && (
            <section className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden p-12">
               <div className="max-w-2xl space-y-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">合格品入库关联</h3>
                  </div>

                  <DetailFormItem label="库位类别" required>
                     <select 
                        disabled={!isEditable('WAREHOUSE_IN')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50"
                        value={warehouseInfo.locationType}
                        onChange={e => setWarehouseInfo({...warehouseInfo, locationType: e.target.value})}
                     >
                        <option value="INCOMING_AREA">来料区</option>
                        <option value="FINISHED_AREA">成品区</option>
                     </select>
                  </DetailFormItem>

                  <DetailFormItem label="库位编号" required>
                     <select 
                        disabled={!isEditable('WAREHOUSE_IN')}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50"
                        value={warehouseInfo.locationCode}
                        onChange={e => setWarehouseInfo({...warehouseInfo, locationCode: e.target.value})}
                     >
                        {["A01", "A02", "A03", "A04", "B01", "B02", "B03"].map(v => (
                           <option key={v} value={v}>{v}</option>
                        ))}
                     </select>
                  </DetailFormItem>

                  <DetailFormItem label="入库数量" required>
                     <div className="relative">
                        <input 
                           disabled={!isEditable('WAREHOUSE_IN')}
                           type="number" 
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-black text-indigo-700 outline-none focus:ring-4 focus:ring-indigo-50 shadow-inner"
                           value={warehouseInfo.warehouseInQty}
                           onChange={e => setWarehouseInfo({...warehouseInfo, warehouseInQty: parseInt(e.target.value) || 0})}
                        />
                        <span className="absolute right-4 top-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">Units</span>
                     </div>
                  </DetailFormItem>
               </div>
            </section>
          )}

        </div>
      </div>

      {/* 悬浮操作按钮组 (BOTTOM_RIGHT) */}
      <footer className="fixed bottom-0 right-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-100 py-6 px-10 flex justify-end items-center space-x-4 z-50 shadow-2xl">
         <div className="flex-1 flex items-center space-x-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            <div className="flex items-center space-x-2">
               <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
               <span>Quality Management System v3.1</span>
            </div>
         </div>

         <div className="flex items-center space-x-3">
           <button 
             onClick={() => handleAction('BACK')}
             className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
           >
             返回列表
           </button>
           
           <button className="px-6 py-2.5 bg-white border border-slate-200 text-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center space-x-2">
             <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0l-4 4m4-4v12" /></svg>
             <span>导出质检单</span>
           </button>

           {orderStatus === 'INSPECTING' && (
             <button 
               onClick={() => handleAction('SUBMIT')}
               className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
             >
               提交质检结果
             </button>
           )}

           {orderStatus === 'WAIT_APPROVAL' && (
             <>
                <button 
                  onClick={() => handleAction('REJECT')}
                  className="px-8 py-2.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-100 active:scale-95 transition-all"
                >
                  驳回
                </button>
                <button 
                  onClick={() => handleAction('APPROVE')}
                  className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 shadow-lg shadow-emerald-100 active:scale-95 transition-all"
                >
                  审批通过
                </button>
             </>
           )}
         </div>
      </footer>
    </div>
  );
};

const DetailFormItem: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <div className="space-y-2.5">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center">
      {label}
      {required && <span className="text-rose-500 ml-1.5 font-black">*</span>}
    </label>
    {children}
  </div>
);
