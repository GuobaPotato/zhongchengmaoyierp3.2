
import React, { useState } from 'react';

interface ApprovalLevel {
  id: string;
  levelTitle: string;
  approver: string;
  position: string;
  department: string;
}

interface ConditionItem {
  id: string;
  field: string;
}

interface ApprovalFlowCreateProps {
  onClose: () => void;
}

export const ApprovalFlowCreate: React.FC<ApprovalFlowCreateProps> = ({ onClose }) => {
  const [flowName, setFlowName] = useState("A区一号仓采购审批流");
  const [scope, setScope] = useState("采购审批");
  const [description, setDescription] = useState("A区一号仓红外感应配件采购类单据的审批流程，适用于采购金额≥5000元的申请，需采购专员初审、采购经理复审、运营总监终审");
  
  // 动态审批人层级
  const [levels, setLevels] = useState<ApprovalLevel[]>([
    { id: '1', levelTitle: '一级审批人', approver: '赵采购', position: '采购专员', department: '采购部' },
    { id: '2', levelTitle: '二级审批人', approver: '钱经理', position: '采购经理', department: '采购部' }
  ]);

  // 抄送人 (简单模拟多选)
  const [ccList, setCcList] = useState<string[]>(["李仓管", "周仓管"]);

  // 条件设置
  const [conditions, setConditions] = useState<ConditionItem[]>([
    { id: '1', field: '总采购金额(元)' }
  ]);

  const addLevel = () => {
    if (levels.length >= 5) return;
    const nextLevelNum = levels.length + 1;
    const chineseNums = ['零', '一', '二', '三', '四', '五'];
    setLevels([...levels, {
      id: Date.now().toString(),
      levelTitle: `${chineseNums[nextLevelNum]}级审批人`,
      approver: '',
      position: '',
      department: ''
    }]);
  };

  const removeLevel = (id: string) => {
    if (levels.length <= 1) return;
    setLevels(levels.filter(l => l.id !== id));
  };

  const addCondition = () => {
    setConditions([...conditions, { id: Date.now().toString(), field: '总采购金额(元)' }]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* 顶部标题与操作栏 */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-50 shrink-0 shadow-sm">
        <div className="flex items-center space-x-6">
          <button 
            onClick={onClose}
            className="p-2.5 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-indigo-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">审批流配置-新建</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Workflow Design & Node Mapping</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">返回</button>
          <button onClick={onClose} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">退出</button>
          <button className="px-10 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">保存审批流</button>
        </div>
      </header>

      {/* 标签页切换 */}
      <nav className="bg-white border-b border-slate-100 px-10 flex shrink-0">
        <button className="px-8 py-5 text-sm font-black text-indigo-600 transition-all relative uppercase tracking-widest">
          审批流设计
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />
        </button>
      </nav>

      {/* 内容主体 */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-12 space-y-12">
          
          {/* Section 1: 基础设置 */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col border-l-8 border-l-indigo-600">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">基础设置 (Basic Setup)</h3>
              <span className="text-[9px] font-bold text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded">Required Fields Marked *</span>
            </div>
            
            <div className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FormInput 
                  label="审批流名称" 
                  required 
                  value={flowName} 
                  onChange={setFlowName} 
                  placeholder="请输入审批流名称" 
                />
                <FormSelect 
                  label="适用范围" 
                  required 
                  value={scope} 
                  onChange={setScope} 
                  options={["采购审批", "入库单审批", "库存盘点审批", "合同审批", "报价单审批"]} 
                />
              </div>

              {/* 审批人动态配置 */}
              <div className="space-y-6 bg-slate-50/50 p-8 rounded-3xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">审批人层级配置 (Approvers)</label>
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Max 5 Levels</span>
                </div>
                
                <div className="space-y-4">
                  {levels.map((level, index) => (
                    <div key={level.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 relative group animate-in slide-in-from-top-2 duration-300">
                      <div className="w-24 shrink-0 flex items-center">
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-tighter bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">
                          {level.levelTitle}
                        </span>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormSelect 
                          label="审批人" 
                          value={level.approver} 
                          onChange={(v) => {
                            const next = [...levels];
                            next[index].approver = v;
                            setLevels(next);
                          }}
                          options={["赵采购", "李仓管", "钱销售", "孙生产", "周仓管"]}
                          isSmall
                        />
                        <FormInput 
                          label="职位" 
                          value={level.position} 
                          onChange={(v) => {
                            const next = [...levels];
                            next[index].position = v;
                            setLevels(next);
                          }}
                          placeholder="请输入职位"
                          isSmall
                        />
                        <FormSelect 
                          label="所属部门" 
                          value={level.department} 
                          onChange={(v) => {
                            const next = [...levels];
                            next[index].department = v;
                            setLevels(next);
                          }}
                          options={["采购部", "仓储部", "销售部", "生产部", "技术部"]}
                          isSmall
                        />
                      </div>

                      {levels.length > 1 && (
                        <button 
                          onClick={() => removeLevel(level.id)}
                          className="absolute -right-3 -top-3 w-8 h-8 bg-white border border-rose-100 text-rose-500 rounded-full shadow-lg flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={addLevel}
                  disabled={levels.length >= 5}
                  className={`w-full py-4 rounded-2xl border-2 border-dashed font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 ${
                    levels.length < 5 
                      ? 'border-indigo-200 text-indigo-500 bg-white hover:bg-indigo-50 hover:border-indigo-400' 
                      : 'border-slate-100 text-slate-300 bg-slate-50 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                  <span>+ 添加审批人</span>
                </button>
              </div>

              <div className="space-y-4">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">抄送人 (CC)</label>
                 <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 min-h-[50px]">
                    {ccList.map(cc => (
                      <span key={cc} className="px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 flex items-center space-x-2 group">
                        <span>{cc}</span>
                        <button onClick={() => setCcList(ccList.filter(i => i !== cc))} className="text-slate-300 hover:text-rose-500"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></button>
                      </span>
                    ))}
                    <button className="text-[10px] font-black text-indigo-600 hover:underline uppercase tracking-widest ml-2">+ 选择抄送人</button>
                 </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">审批描述</label>
                <textarea 
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] p-8 text-sm font-medium text-slate-600 outline-none focus:ring-4 focus:ring-indigo-100 transition-all resize-none shadow-inner"
                  placeholder="请输入审批描述..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Section 2: 条件设置 */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col border-l-8 border-l-amber-500">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">条件设置 (Flow Conditions)</h3>
            </div>
            
            <div className="p-10 space-y-8">
               <div className="space-y-4">
                  {conditions.map((condition, idx) => (
                    <div key={condition.id} className="flex items-center space-x-6 animate-in fade-in duration-300">
                       <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest w-16">条件 {idx + 1}</span>
                       <div className="flex-1">
                          <FormSelect 
                            label="" 
                            value={condition.field} 
                            onChange={(v) => {
                              const next = [...conditions];
                              next[idx].field = v;
                              setConditions(next);
                            }}
                            options={["总采购金额(元)", "入库数量(个)", "盘点差异率(%)", "合同金额(元)"]}
                            isSmall
                          />
                       </div>
                       <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                          <span className="text-[11px] font-black text-slate-400 uppercase">运算符</span>
                          <span className="text-sm font-black text-slate-800">≥</span>
                       </div>
                       <div className="w-48">
                          <input type="text" placeholder="数值" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono font-black focus:ring-4 focus:ring-amber-50 outline-none" defaultValue="5000" />
                       </div>
                       <button 
                         onClick={() => removeCondition(condition.id)}
                         className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline"
                       >
                         删除
                       </button>
                    </div>
                  ))}
               </div>

               <button 
                  onClick={addCondition}
                  className="px-6 py-3 rounded-2xl border-2 border-dashed border-amber-200 text-amber-600 font-black text-xs uppercase tracking-widest hover:bg-amber-50 transition-all flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                  <span>+ 添加审批条件</span>
               </button>
            </div>
          </section>

        </div>
      </div>

      {/* 底部导航提示 */}
      <footer className="bg-white border-t border-slate-100 px-10 py-5 flex justify-between items-center shrink-0 shadow-inner z-50">
         <div className="flex items-center space-x-12">
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">当前审批引擎版本</span>
               <span className="text-xs font-black text-slate-800">V3.1.0-PRO / Enterprise Standard</span>
            </div>
            <div className="h-8 w-px bg-slate-100"></div>
            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Flow Logic Validated</span>
            </div>
         </div>
      </footer>
    </div>
  );
};

/* --- 内部辅助表单组件 --- */

const FormInput: React.FC<{ label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string; isSmall?: boolean }> = ({ label, value, onChange, required, placeholder, isSmall }) => (
  <div className="space-y-2 flex-1">
    {label && (
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center">
        {label}
        {required && <span className="text-rose-500 ml-1.5 font-black">*</span>}
      </label>
    )}
    <input 
      type="text" 
      className={`w-full bg-white border border-slate-200 rounded-xl px-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all ${isSmall ? 'py-2.5' : 'py-3'}`}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

const FormSelect: React.FC<{ label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean; isSmall?: boolean }> = ({ label, value, onChange, options, required, isSmall }) => (
  <div className="space-y-2 flex-1">
    {label && (
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center">
        {label}
        {required && <span className="text-rose-500 ml-1.5 font-black">*</span>}
      </label>
    )}
    <div className="relative group">
       <select 
         className={`w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all cursor-pointer ${isSmall ? 'py-2.5' : 'py-3'}`}
         value={value}
         onChange={e => onChange(e.target.value)}
       >
         {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
       </select>
       <svg className={`absolute right-4 w-4 h-4 text-slate-300 pointer-events-none group-hover:text-indigo-500 transition-colors ${isSmall ? 'top-3' : 'top-3.5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
    </div>
  </div>
);
