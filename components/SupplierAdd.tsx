
import React, { useState } from 'react';

interface SupplierAddProps {
  onClose: () => void;
}

interface ProductItem {
  id: string;
  name: string;
  specs: string;
  category: string;
  unit: string;
  price: number;
  validDate: string;
  isMain: boolean;
  stockStatus: string;
  sample: string;
}

export const SupplierAdd: React.FC<SupplierAddProps> = ({ onClose }) => {
  const [basicCollapsed, setBasicCollapsed] = useState(false);
  const [productCollapsed, setProductCollapsed] = useState(false);
  const [contactCollapsed, setContactCollapsed] = useState(false);
  const [capacityCollapsed, setCapacityCollapsed] = useState(false);
  const [attachmentCollapsed, setAttachmentCollapsed] = useState(false);

  const [formData, setFormData] = useState({
    supplierName: '',
    creditCode: '',
    taxpayerId: '',
    registerAddress: '',
    businessAddress: '',
    establishDate: '',
    registeredCapital: '',
    enterpriseType: '',
    industry: '',
    businessScope: '',
    mainContact: '',
    mainPhone: '',
    backupContact: '',
    backupPhone: '',
    email: '',
    fax: '',
    imAccount: '',
    coreProductCategory: '',
    supplyCycle: '',
    minOrderQuantity: '',
    warrantyPeriod: '',
    capacityDesc: '',
    warehousingCapacity: '',
    cooperationRemark: ''
  });

  const [products, setProducts] = useState<ProductItem[]>([
    { id: '1', name: '', specs: '', category: 'coreProduct', unit: '个', price: 0, validDate: '', isMain: false, stockStatus: 'inStock', sample: 'available' }
  ]);

  const handleAutoFill = (name: string) => {
    if (!name) return;
    // Simulating API trigger on blur as per spec
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        creditCode: '91330201MA28' + Math.floor(Math.random()*1000000),
        taxpayerId: '330201MA28' + Math.floor(Math.random()*1000000),
        registerAddress: '浙江省宁波市XX工业园区A栋' + (Math.floor(Math.random()*100) + 1) + '号',
        establishDate: '2015-06-12',
        registeredCapital: '500',
        enterpriseType: 'generalTaxpayer',
        industry: 'electronicComponents'
      }));
    }, 500);
  };

  const addProductRow = () => {
    setProducts([...products, { id: Date.now().toString(), name: '', specs: '', category: 'regularProduct', unit: '个', price: 0, validDate: '', isMain: false, stockStatus: 'inStock', sample: 'available' }]);
  };

  const removeProductRow = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleSave = () => {
    if (!formData.supplierName || !formData.creditCode) {
      alert("请检查必填项");
      return;
    }
    // Simulation of success and return
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Sticky Header */}
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
            <h1 className="text-xl font-black text-slate-800 tracking-tight">新增供应商档案</h1>
            <div className="flex items-center space-x-2 mt-0.5">
               <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">New Supplier Wizard</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button onClick={() => setFormData({} as any)} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50">重置</button>
          <button onClick={handleSave} className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">提交保存</button>
        </div>
      </header>

      {/* Main Form Content */}
      <div className="flex-1 overflow-y-auto bg-slate-50/50">
        <div className="max-w-6xl mx-auto p-8 space-y-10 pb-32">
          
          {/* Section: Basic Profile */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between cursor-pointer" onClick={() => setBasicCollapsed(!basicCollapsed)}>
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">基础档案信息</h3>
              </div>
              <svg className={`w-5 h-5 text-slate-400 transition-transform ${basicCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            {!basicCollapsed && (
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in duration-300">
                <div className="lg:col-span-2">
                   <FormInput 
                     label="供应商名称" 
                     required 
                     placeholder="请输入供应商全称" 
                     value={formData.supplierName}
                     onChange={v => setFormData({...formData, supplierName: v})}
                     onBlur={() => handleAutoFill(formData.supplierName)}
                     tips="名称需与营业执照一致，支持模糊搜索"
                   />
                </div>
                <FormInput label="统一社会信用代码" required placeholder="18位字符" value={formData.creditCode} onChange={v => setFormData({...formData, creditCode: v})} />
                <FormInput label="纳税人识别号" required placeholder="请输入纳税人识别号" value={formData.taxpayerId} onChange={v => setFormData({...formData, taxpayerId: v})} />
                <div className="lg:col-span-2">
                   <FormTextarea label="注册地址" required placeholder="请输入注册地址" value={formData.registerAddress} onChange={v => setFormData({...formData, registerAddress: v})} />
                </div>
                <div className="lg:col-span-2">
                   <FormTextarea label="经营地址" required placeholder="请输入实际办公/发货地址" value={formData.businessAddress} onChange={v => setFormData({...formData, businessAddress: v})} />
                </div>
                <FormDate label="成立日期" required value={formData.establishDate} onChange={v => setFormData({...formData, establishDate: v})} />
                <FormNumber label="注册资本 (万元)" required value={formData.registeredCapital} onChange={v => setFormData({...formData, registeredCapital: v})} />
                <FormSelect 
                  label="企业类型" 
                  required 
                  options={[
                    {label: "一般纳税人", value: "generalTaxpayer"},
                    {label: "小规模纳税人", value: "smallScaleTaxpayer"},
                    {label: "个体工商户", value: "individualBusiness"},
                    {label: "其他", value: "other"}
                  ]} 
                  value={formData.enterpriseType}
                  onChange={v => setFormData({...formData, enterpriseType: v})}
                />
                <FormSelect 
                  label="所属行业" 
                  required 
                  options={[
                    {label: "电子元器件", value: "electronicComponents"},
                    {label: "五金配件", value: "hardwareParts"},
                    {label: "包装材料", value: "packagingMaterials"},
                    {label: "办公用品", value: "officeSupplies"},
                    {label: "其他", value: "other"}
                  ]} 
                  value={formData.industry}
                  onChange={v => setFormData({...formData, industry: v})}
                />
                <div className="lg:col-span-4">
                  <FormTextarea label="经营范围" placeholder="核心供货品类说明" value={formData.businessScope} onChange={v => setFormData({...formData, businessScope: v})} />
                </div>
              </div>
            )}
          </section>

          {/* Section: Product Info */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between cursor-pointer" onClick={() => setProductCollapsed(!productCollapsed)}>
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">产品信息</h3>
              </div>
              <svg className={`w-5 h-5 text-slate-400 transition-transform ${productCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            {!productCollapsed && (
              <div className="p-0 animate-in fade-in duration-300">
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse min-w-[1200px]">
                      <thead className="bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">
                         <tr>
                            <th className="px-8 py-5">产品名称 *</th>
                            <th className="px-4 py-5">规格型号 *</th>
                            <th className="px-4 py-5">类别 *</th>
                            <th className="px-4 py-5">单位 *</th>
                            <th className="px-4 py-5 text-right">单价 *</th>
                            <th className="px-4 py-5 text-center">主推</th>
                            <th className="px-4 py-5">有效期 *</th>
                            <th className="px-4 py-5">库存状态</th>
                            <th className="px-4 py-5">样品</th>
                            <th className="px-8 py-5 text-right">操作</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                         {products.map((p, idx) => (
                           <tr key={p.id} className="hover:bg-slate-50/30 transition-colors">
                              <td className="px-8 py-4"><input className="w-full bg-transparent border-none text-sm font-bold focus:ring-0" placeholder="产品名称" value={p.name} onChange={e => {
                                 const next = [...products];
                                 next[idx].name = e.target.value;
                                 setProducts(next);
                              }} /></td>
                              <td className="px-4 py-4"><input className="w-full bg-transparent border-none text-sm focus:ring-0" placeholder="5V/5m" value={p.specs} onChange={e => {
                                 const next = [...products];
                                 next[idx].specs = e.target.value;
                                 setProducts(next);
                              }} /></td>
                              <td className="px-4 py-4">
                                 <select className="bg-transparent border-none text-xs font-bold focus:ring-0" value={p.category} onChange={e => {
                                   const next = [...products];
                                   next[idx].category = e.target.value;
                                   setProducts(next);
                                 }}>
                                    <option value="coreProduct">核心产品</option>
                                    <option value="regularProduct">常规产品</option>
                                    <option value="customProduct">定制产品</option>
                                 </select>
                              </td>
                              <td className="px-4 py-4"><input className="w-20 bg-transparent border-none text-sm focus:ring-0" value={p.unit} onChange={e => {
                                 const next = [...products];
                                 next[idx].unit = e.target.value;
                                 setProducts(next);
                              }} /></td>
                              <td className="px-4 py-4 text-right"><input type="number" className="w-24 bg-transparent border-none text-sm font-mono font-bold text-right focus:ring-0" value={p.price} onChange={e => {
                                 const next = [...products];
                                 next[idx].price = Number(e.target.value);
                                 setProducts(next);
                              }} /></td>
                              <td className="px-4 py-4 text-center">
                                 <input type="checkbox" checked={p.isMain} className="rounded text-indigo-600 focus:ring-indigo-500" onChange={e => {
                                    const next = [...products];
                                    next[idx].isMain = e.target.checked;
                                    setProducts(next);
                                 }} />
                              </td>
                              <td className="px-4 py-4"><input type="date" className="bg-transparent border-none text-xs font-mono focus:ring-0" value={p.validDate} onChange={e => {
                                 const next = [...products];
                                 next[idx].validDate = e.target.value;
                                 setProducts(next);
                              }} /></td>
                              <td className="px-4 py-4">
                                 <select className="bg-transparent border-none text-xs focus:ring-0" value={p.stockStatus} onChange={e => {
                                   const next = [...products];
                                   next[idx].stockStatus = e.target.value;
                                   setProducts(next);
                                 }}>
                                    <option value="inStock">有库存</option>
                                    <option value="customizable">可定制</option>
                                    <option value="outOfStock">缺货</option>
                                 </select>
                              </td>
                              <td className="px-4 py-4">
                                 <select className="bg-transparent border-none text-xs focus:ring-0" value={p.sample} onChange={e => {
                                   const next = [...products];
                                   next[idx].sample = e.target.value;
                                   setProducts(next);
                                 }}>
                                    <option value="available">可提供</option>
                                    <option value="unavailable">不提供</option>
                                 </select>
                              </td>
                              <td className="px-8 py-4 text-right">
                                 <button onClick={() => removeProductRow(p.id)} className="text-slate-300 hover:text-rose-500 transition-colors p-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
                <div className="p-6 bg-slate-50 flex justify-center">
                   <button onClick={addProductRow} className="flex items-center space-x-2 text-indigo-600 font-black text-xs uppercase tracking-widest hover:text-indigo-800">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                      <span>新增产品项</span>
                   </button>
                </div>
                <div className="p-10 border-t border-slate-100 space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">产品图片上传 (Optional)</label>
                   <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-3 hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="p-3 bg-white rounded-xl shadow-sm text-slate-300 group-hover:text-indigo-500 transition-colors"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
                      <p className="text-sm font-bold text-slate-400">点击或拖拽产品图片至此 (JPG/PNG/PDF)</p>
                      <p className="text-[10px] text-slate-300 uppercase tracking-widest">Max Size: 5MB</p>
                   </div>
                </div>
              </div>
            )}
          </section>

          {/* Section: Contact Info */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between cursor-pointer" onClick={() => setContactCollapsed(!contactCollapsed)}>
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">联系信息</h3>
              </div>
              <svg className={`w-5 h-5 text-slate-400 transition-transform ${contactCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            {!contactCollapsed && (
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in duration-300">
                 <FormInput label="主联系人" required placeholder="采购业务核心人员" value={formData.mainContact} onChange={v => setFormData({...formData, mainContact: v})} />
                 <FormInput label="联系电话" required placeholder="手机号/座机" value={formData.mainPhone} onChange={v => setFormData({...formData, mainPhone: v})} />
                 <FormInput label="备用联系人" placeholder="备用联系人姓名" value={formData.backupContact} onChange={v => setFormData({...formData, backupContact: v})} />
                 <FormInput label="备用电话" placeholder="备用电话号码" value={formData.backupPhone} onChange={v => setFormData({...formData, backupPhone: v})} />
                 <FormInput label="邮箱" required placeholder="xxx@xxx.com" value={formData.email} onChange={v => setFormData({...formData, email: v})} />
                 <FormInput label="传真" placeholder="区号-号码" value={formData.fax} onChange={v => setFormData({...formData, fax: v})} />
                 <FormInput label="微信/QQ" placeholder="IM 账号" value={formData.imAccount} onChange={v => setFormData({...formData, imAccount: v})} />
              </div>
            )}
          </section>

          {/* Section: Supply Capacity */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between cursor-pointer" onClick={() => setCapacityCollapsed(!capacityCollapsed)}>
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">供应能力信息</h3>
              </div>
              <svg className={`w-5 h-5 text-slate-400 transition-transform ${capacityCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            {!capacityCollapsed && (
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in duration-300">
                 <div className="lg:col-span-2">
                    <FormInput label="核心供货品类" required placeholder="如【红外线感应模块/五金冲压件】" value={formData.coreProductCategory} onChange={v => setFormData({...formData, coreProductCategory: v})} />
                 </div>
                 <FormSelect 
                    label="供货周期" 
                    required 
                    options={[
                      {label: "现货", value: "spot"},
                      {label: "3-5个工作日", value: "3-5days"},
                      {label: "7-10个工作日", value: "7-10days"},
                      {label: "定制15天", value: "custom15days"}
                    ]} 
                    value={formData.supplyCycle}
                    onChange={v => setFormData({...formData, supplyCycle: v})}
                 />
                 <FormInput label="最小起订量" required placeholder="如【100个/10箱】" value={formData.minOrderQuantity} onChange={v => setFormData({...formData, minOrderQuantity: v})} />
                 <FormInput label="质保期" required placeholder="如【12个月/1年】" value={formData.warrantyPeriod} onChange={v => setFormData({...formData, warrantyPeriod: v})} />
                 <div className="lg:col-span-2">
                    <FormTextarea label="产能说明" placeholder="月供货最大量、生产设备等" value={formData.capacityDesc} onChange={v => setFormData({...formData, capacityDesc: v})} />
                 </div>
                 <div className="lg:col-span-2">
                    <FormTextarea label="仓储能力" placeholder="是否支持代储、备货等" value={formData.warehousingCapacity} onChange={v => setFormData({...formData, warehousingCapacity: v})} />
                 </div>
              </div>
            )}
          </section>

          {/* Section: Attachments & Remarks */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-10 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between cursor-pointer" onClick={() => setAttachmentCollapsed(!attachmentCollapsed)}>
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-6 bg-slate-400 rounded-full"></div>
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">资质附件与备注</h3>
              </div>
              <svg className={`w-5 h-5 text-slate-400 transition-transform ${attachmentCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            {!attachmentCollapsed && (
              <div className="p-10 space-y-10 animate-in fade-in duration-300">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">资质附件上传 (Multi-Category)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                       {["营业执照", "开户许可", "质检报告", "授权书", "其他"].map(cat => (
                         <div key={cat} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center space-y-3 group hover:border-indigo-200 transition-all cursor-pointer">
                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0l-4 4m4-4v12" /></svg></div>
                            <span className="text-[10px] font-black text-slate-500 uppercase">{cat}</span>
                         </div>
                       ))}
                    </div>
                 </div>
                 <FormTextarea label="合作备注" placeholder="如【优先供货、节假日提前备货、价格浮动范围5%内】" value={formData.cooperationRemark} onChange={v => setFormData({...formData, cooperationRemark: v})} />
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
};

/* --- Form Support Components --- */

const FormInput: React.FC<{label: string, required?: boolean, placeholder?: string, value?: string, onChange: (v: string) => void, onBlur?: () => void, tips?: string}> = ({label, required, placeholder, value, onChange, onBlur, tips}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label} {required && <span className="text-rose-500 ml-1 font-black">*</span>}</label>
      {tips && <span className="text-[9px] text-slate-300 italic">{tips}</span>}
    </div>
    <input 
      type="text" 
      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300" 
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
    />
  </div>
);

const FormTextarea: React.FC<{label: string, required?: boolean, placeholder?: string, value?: string, onChange: (v: string) => void}> = ({label, required, placeholder, value, onChange}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label} {required && <span className="text-rose-500 ml-1 font-black">*</span>}</label>
    <textarea 
      rows={2}
      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 resize-none" 
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

const FormSelect: React.FC<{label: string, required?: boolean, options: {label: string, value: string}[], value?: string, onChange: (v: string) => void}> = ({label, required, options, value, onChange}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label} {required && <span className="text-rose-500 ml-1 font-black">*</span>}</label>
    <div className="relative group">
       <select 
         className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all cursor-pointer"
         value={value}
         onChange={e => onChange(e.target.value)}
       >
         <option value="">请选择</option>
         {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
       </select>
       <svg className="absolute right-4 top-3.5 w-4 h-4 text-slate-300 pointer-events-none group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
    </div>
  </div>
);

const FormDate: React.FC<{label: string, required?: boolean, value?: string, onChange: (v: string) => void}> = ({label, required, value, onChange}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label} {required && <span className="text-rose-500 ml-1 font-black">*</span>}</label>
    <input 
      type="date" 
      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-bold focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

const FormNumber: React.FC<{label: string, required?: boolean, value?: string, onChange: (v: string) => void}> = ({label, required, value, onChange}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label} {required && <span className="text-rose-500 ml-1 font-black">*</span>}</label>
    <div className="relative">
       <input 
         type="number" 
         className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-black focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
         value={value}
         onChange={e => onChange(e.target.value)}
       />
       <span className="absolute right-4 top-3.5 text-[10px] font-black text-slate-300 uppercase">10k CNY</span>
    </div>
  </div>
);
