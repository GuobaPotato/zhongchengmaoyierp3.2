
import React, { useState } from 'react';

type ProductTab = '产品列表' | '产品BOM' | '产品工艺路线' | '产品质检规则';

interface SubMaterial {
  name: string;
  code: string;
  attr: string;
  specs: string;
  usage: string;
  unit: string;
  method: string;
  processName: string;
  processCode: string;
}

interface BOMDetail {
  bomCode: string;
  attr: string;
  parentName: string;
  parentCode: string;
  parentType: string;
  parentSpecs: string;
  parentUnit: string;
  parentMethod: string;
  subMaterials: SubMaterial[];
}

interface ProcessDetail {
  seq: string;
  name: string;
  code: string;
  unitQty: string;
  team: string;
  leader: string;
  members: string;
  inspector: string;
}

interface ProductRoutingEntry {
  code: string;
  attr: string;
  name: string;
  type: string;
  specs: string;
  prodUnit: string;
  processes: ProcessDetail[];
}

interface ProductEntry {
  code: string;
  attr: string;
  name: string;
  type: string;
  specs: string;
  prodUnit: string;
  storeUnit: string;
  diameter: number;
  length: number;
  color: string;
  weight: number;
  costPrice: number;
  salesPrice: number;
  hasImage: boolean;
  hasAttachment: boolean;
  permissions: string[];
  method: string;
}

interface QCRuleEntry {
  id: string;
  productName: string;
  productType: string;
  productCode: string;
  checkDate: string;
  batchNo: string;
  sampleRate: string;
  standard: string;
  result: '合格' | '不合格';
  failedDesc: string;
  checker: string;
}

const MOCK_PRODUCT_LIST: ProductEntry[] = [
  {
    code: "A006",
    attr: "半成品",
    name: "智能水龙头A006",
    type: "智能水龙头",
    specs: "BH-GW-R12",
    prodUnit: "套",
    storeUnit: "件",
    diameter: 12.0,
    length: 100.00,
    color: "白",
    weight: 90.000,
    costPrice: 315.00,
    salesPrice: 397.00,
    hasImage: true,
    hasAttachment: false,
    permissions: ["销售", "生产"],
    method: "组装"
  }
];

const MOCK_BOM_DATA: BOMDetail = {
  bomCode: "BOM001",
  attr: "组装",
  parentName: "智能水龙头A006",
  parentCode: "A006",
  parentType: "智能水龙头",
  parentSpecs: "A006",
  parentUnit: "套",
  parentMethod: "组装",
  subMaterials: [
    { name: "电路主板", code: "B007", attr: "主料", specs: "4140", usage: "38.00", unit: "件", method: "采购", processName: "焊接", processCode: "GX001" },
    { name: "组装外壳", code: "C008", attr: "辅料", specs: "997", usage: "3.00", unit: "件", method: "采购", processName: "组装", processCode: "GX003" },
  ]
};

const MOCK_ROUTING_DATA: ProductRoutingEntry[] = [
  {
    code: "A006",
    attr: "成品",
    name: "智能水龙头A006",
    type: "智能水龙头",
    specs: "BH-GW-R10",
    prodUnit: "套",
    processes: [
      { seq: "1", name: "焊接", code: "GX001", unitQty: "100.00", team: "A组", leader: "王", members: "6", inspector: "刘" },
      { seq: "2", name: "外壳组装", code: "GX003", unitQty: "100.00", team: "C组", leader: "王", members: "5", inspector: "刘" },
      { seq: "3", name: "抛光", code: "GX005", unitQty: "100.00", team: "D组", leader: "王", members: "7", inspector: "刘" },
    ]
  }
];

const MOCK_QC_RULES: QCRuleEntry[] = [
  {
    id: "1",
    productName: "智能水龙头",
    productType: "成品",
    productCode: "A006",
    checkDate: "2026-01-13",
    batchNo: "123456",
    sampleRate: "50%",
    standard: "焊点无明显突出",
    result: "合格",
    failedDesc: "",
    checker: "张"
  },
  {
    id: "2",
    productName: "智能烘干机",
    productType: "成品",
    productCode: "A007",
    checkDate: "2026-01-13",
    batchNo: "123456",
    sampleRate: "50%",
    standard: "组装无明显缝隙",
    result: "不合格",
    failedDesc: "缝隙超过2cm",
    checker: "刘"
  },
  {
    id: "3",
    productName: "智能小便器",
    productType: "成品",
    productCode: "A008",
    checkDate: "2026-01-13",
    batchNo: "123456",
    sampleRate: "50%",
    standard: "产品无明显划痕",
    result: "合格",
    failedDesc: "",
    checker: "王"
  }
];

export const Products: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<ProductTab>('产品列表');
  const [searchTerm, setSearchTerm] = useState("");
  const [attrFilters, setAttrFilters] = useState({
    none: false,
    finished: false,
    semiFinished: true
  });

  const tabs: ProductTab[] = ["产品列表", "产品BOM", "产品工艺路线", "产品质检规则"];

  return (
    <div className="flex flex-col h-full space-y-0 animate-in fade-in duration-500 -m-8">
      {/* 顶部业务维度切换 */}
      <div className="bg-white border-b border-slate-200 px-8 flex shrink-0 z-20">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={`px-8 py-5 text-sm font-black transition-all relative uppercase tracking-widest ${
              currentTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
            {currentTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 左侧筛选区 (根据当前标签动态展示) */}
        <aside className="w-[320px] border-r border-slate-200 bg-slate-50/50 p-6 flex flex-col space-y-8 overflow-y-auto shrink-0">
          <div className="space-y-4">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center">
              <svg className="w-3.5 h-3.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              筛选条件
            </h4>
            
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              {currentTab === '产品列表' ? (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">产品属性搜索</label>
                    <div className="relative group">
                      <input 
                        type="text" 
                        placeholder="搜索(多个关键词用空格隔开)"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-indigo-50 outline-none transition-all pr-10"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                      <svg className="absolute right-3 top-2.5 w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7.001 0 11-14 0 7 7.001 0 1114 0z" /></svg>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FilterCheckbox label="未填写" checked={attrFilters.none} onChange={() => setAttrFilters({...attrFilters, none: !attrFilters.none})} />
                    <FilterCheckbox label="成品" checked={attrFilters.finished} onChange={() => setAttrFilters({...attrFilters, finished: !attrFilters.finished})} />
                    <FilterCheckbox label="半成品" checked={attrFilters.semiFinished} onChange={() => setAttrFilters({...attrFilters, semiFinished: !attrFilters.semiFinished})} />
                  </div>
                </>
              ) : currentTab === '产品BOM' ? (
                <>
                  <FilterGroupSimple label="产品类型" defaultValue="智能水龙头" options={["智能水龙头", "感应模组"]} />
                  <FilterGroupSimple label="产品名称" defaultValue="智能水龙头A006" options={["智能水龙头A006", "其他"]} />
                </>
              ) : currentTab === '产品工艺路线' ? (
                <>
                  <FilterGroupSimple label="产品名称" defaultValue="智能水龙头A006" options={["智能水龙头A006", "镀锡铜覆钢圆钢BH-GW-R10"]} />
                  <FilterGroupSimple label="规格型号" defaultValue="BH-GW-R10" options={["BH-GW-R10", "BH-BH-GW-R09"]} />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">工序关键词</label>
                    <input 
                      type="text" 
                      placeholder="支持多个关键词用空格隔开"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-indigo-50 outline-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <FilterGroupSimple label="产品分类" defaultValue="成品" options={["成品", "半成品"]} />
                  <FilterGroupSimple label="判定结果" defaultValue="全部" options={["全部", "合格", "不合格"]} />
                </>
              )}
            </div>
          </div>

          {currentTab === '产品列表' && (
            <>
              <FilterGroup label="产品名称">
                <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer">
                  <option>智能水龙头A006</option>
                  <option>其它产品</option>
                </select>
              </FilterGroup>
              <FilterGroup label="产品类型">
                <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer">
                  <option>智能水龙头</option>
                  <option>感应模组</option>
                </select>
              </FilterGroup>
              <FilterGroup label="产品权限">
                <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer">
                  <option>销售</option>
                  <option>生产</option>
                </select>
              </FilterGroup>
            </>
          )}

          <div className="flex-1"></div>
          <button className="w-full py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
            执行查询
          </button>
        </aside>

        {/* 右侧明细区 */}
        <main className="flex-1 flex flex-col bg-white overflow-hidden">
          {currentTab === '产品列表' ? (
            <ProductListView data={MOCK_PRODUCT_LIST} />
          ) : currentTab === '产品BOM' ? (
            <ProductBOMView data={MOCK_BOM_DATA} />
          ) : currentTab === '产品工艺路线' ? (
            <ProductRoutingView data={MOCK_ROUTING_DATA} />
          ) : currentTab === '产品质检规则' ? (
            <ProductQCView data={MOCK_QC_RULES} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm italic">
              {currentTab} 模块正在开发中...
            </div>
          )}

          {/* 分页与统计栏 */}
          <footer className="bg-white border-t border-slate-100 px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-6 shrink-0 z-20 shadow-inner">
            <div className="flex items-center space-x-12">
               <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">每页显示:</span>
                  <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-black text-slate-800 outline-none">
                    <option>{currentTab === '产品BOM' ? '20条/页' : '100条/页'}</option>
                    <option>50条/页</option>
                  </select>
               </div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 统计: <span className="text-slate-800 text-sm font-black mx-1">共{currentTab === '产品质检规则' ? MOCK_QC_RULES.length : 1}条</span>
               </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-100 text-slate-300 hover:bg-slate-50">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-indigo-100">1 / 1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-100 text-slate-300 hover:bg-slate-50">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

const ProductListView: React.FC<{ data: ProductEntry[] }> = ({ data }) => (
  <div className="flex-1 overflow-x-auto overflow-y-auto">
    <table className="min-w-[2200px] text-left border-separate border-spacing-0">
      <thead className="bg-slate-50/80 sticky top-0 z-10">
        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
          <th className="px-8 py-5 border-b border-slate-100 sticky left-0 bg-slate-50 z-20 border-r border-slate-100">产品编码</th>
          <th className="px-4 py-5 border-b border-slate-100">产品属性</th>
          <th className="px-4 py-5 border-b border-slate-100">产品名称</th>
          <th className="px-4 py-5 border-b border-slate-100">产品类型</th>
          <th className="px-4 py-5 border-b border-slate-100">规格型号</th>
          <th className="px-4 py-5 border-b border-slate-100 text-center">生产单位</th>
          <th className="px-4 py-5 border-b border-slate-100 text-center">仓储单位</th>
          <th className="px-4 py-5 border-b border-slate-100 text-right">直径/mm</th>
          <th className="px-4 py-5 border-b border-slate-100 text-right">长度规格/m</th>
          <th className="px-4 py-5 border-b border-slate-100 text-center">颜色</th>
          <th className="px-4 py-5 border-b border-slate-100 text-right">重量/kg</th>
          <th className="px-4 py-5 border-b border-slate-100 text-right">成本单价/元</th>
          <th className="px-4 py-5 border-b border-slate-100 text-right">销售单价/元</th>
          <th className="px-4 py-5 border-b border-slate-100 text-center">产品图片</th>
          <th className="px-4 py-5 border-b border-slate-100 text-center">产品技术附件</th>
          <th className="px-4 py-5 border-b border-slate-100">产品权限</th>
          <th className="px-8 py-5 border-b border-slate-100">获取方式</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {data.map((p, idx) => (
          <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
            <td className="px-8 py-6 sticky left-0 bg-white group-hover:bg-indigo-50/50 z-10 border-r border-slate-100 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.05)]">
              <span className="text-sm font-mono font-black text-slate-800 tracking-tight">{p.code}</span>
            </td>
            <td className="px-4 py-6">
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-widest ${
                p.attr === '半成品' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-indigo-50 text-indigo-700 border-indigo-100'
              }`}>
                {p.attr}
              </span>
            </td>
            <td className="px-4 py-6 text-sm font-black text-slate-800">{p.name}</td>
            <td className="px-4 py-6 text-xs font-bold text-slate-500">{p.type}</td>
            <td className="px-4 py-6 text-xs font-mono text-slate-400">{p.specs}</td>
            <td className="px-4 py-5 text-center text-xs font-black text-slate-600">{p.prodUnit}</td>
            <td className="px-4 py-5 text-center text-xs font-black text-slate-600">{p.storeUnit}</td>
            <td className="px-4 py-6 text-right text-sm font-mono font-bold text-slate-700">{p.diameter.toFixed(1)}</td>
            <td className="px-4 py-6 text-right text-sm font-mono font-bold text-slate-700">{p.length.toFixed(2)}</td>
            <td className="px-4 py-6 text-center text-sm font-bold text-slate-700">{p.color}</td>
            <td className="px-4 py-6 text-right text-sm font-mono font-bold text-slate-700">{p.weight.toFixed(3)}</td>
            <td className="px-4 py-6 text-right text-sm font-mono font-black text-slate-800">¥{p.costPrice.toFixed(2)}</td>
            <td className="px-4 py-6 text-right text-sm font-mono font-black text-indigo-700">¥{p.salesPrice.toFixed(2)}</td>
            <td className="px-4 py-6 text-center">
               <div className="flex justify-center">
                 {p.hasImage ? (
                   <div className="w-10 h-10 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:border-indigo-200 transition-all">IMG</div>
                 ) : (
                   <span className="text-[10px] text-slate-300 italic">无图片</span>
                 )}
               </div>
            </td>
            <td className="px-4 py-6 text-center">
               {p.hasAttachment ? (
                 <span className="text-indigo-600"><svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg></span>
               ) : (
                 <span className="text-[10px] text-slate-300 italic">无</span>
               )}
            </td>
            <td className="px-4 py-6">
              <div className="flex gap-2">
                {p.permissions.map(perm => (
                  <span key={perm} className="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-black rounded uppercase tracking-tighter">{perm}</span>
                ))}
              </div>
            </td>
            <td className="px-8 py-6">
               <span className="text-xs font-bold text-slate-500 italic">{p.method}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ProductBOMView: React.FC<{ data: BOMDetail }> = ({ data }) => (
  <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-500">
    {/* 父物料汇总表头 */}
    <div className="p-8 bg-slate-900 text-white flex flex-wrap gap-x-12 gap-y-6">
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">BOM 编码</p>
        <p className="text-sm font-black font-mono tracking-tight text-indigo-400">{data.bomCode}</p>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">父产品名称/编码</p>
        <p className="text-sm font-black">{data.parentName} <span className="text-slate-400 font-mono ml-2">[{data.parentCode}]</span></p>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">产品属性</p>
        <span className="inline-block px-2 py-0.5 bg-indigo-500 text-white rounded text-[10px] font-black">{data.attr}</span>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">产品类型</p>
        <span className="inline-block px-2 py-0.5 bg-white/10 rounded text-[10px] font-black">{data.parentType}</span>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">规格型号</p>
        <p className="text-sm font-bold text-slate-300 italic">{data.parentSpecs}</p>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">单位 / 获取方式</p>
        <p className="text-sm font-bold text-emerald-400">{data.parentUnit} / {data.parentMethod}</p>
      </div>
    </div>

    {/* 子物料表格 */}
    <div className="flex-1 overflow-x-auto overflow-y-auto">
      <table className="min-w-[1400px] text-left border-separate border-spacing-0">
        <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
          <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] whitespace-nowrap">
            <th className="px-8 py-5 border-b border-slate-100">序号</th>
            <th className="px-4 py-5 border-b border-slate-100">子物料名称</th>
            <th className="px-4 py-5 border-b border-slate-100 font-mono">子物料编码</th>
            <th className="px-4 py-5 border-b border-slate-100 text-center">属性</th>
            <th className="px-4 py-5 border-b border-slate-100">规格型号</th>
            <th className="px-4 py-5 border-b border-slate-100 text-right">标准用量</th>
            <th className="px-4 py-5 border-b border-slate-100 text-center">单位</th>
            <th className="px-4 py-5 border-b border-slate-100">获取方式</th>
            <th className="px-4 py-5 border-b border-slate-100 bg-indigo-50/30">适用工序名称</th>
            <th className="px-8 py-5 border-b border-slate-100 bg-indigo-50/30 font-mono">适用工序编码</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.subMaterials.map((sub, idx) => (
            <tr key={idx} className="hover:bg-indigo-50/10 transition-colors group">
              <td className="px-8 py-5 text-xs text-slate-300 font-mono">{idx + 1}</td>
              <td className="px-4 py-5 text-sm font-black text-slate-800">{sub.name}</td>
              <td className="px-4 py-5 text-xs font-mono font-bold text-slate-500 uppercase">{sub.code}</td>
              <td className="px-4 py-5 text-center">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                  sub.attr === '主料' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {sub.attr}
                </span>
              </td>
              <td className="px-4 py-5 text-xs text-slate-500 font-medium italic">{sub.specs}</td>
              <td className="px-4 py-5 text-right font-mono font-black text-slate-900 text-sm">{sub.usage}</td>
              <td className="px-4 py-5 text-center text-xs font-bold text-slate-600">{sub.unit}</td>
              <td className="px-4 py-5">
                <span className="text-[10px] font-black border border-slate-200 px-2 py-0.5 rounded text-slate-500 uppercase">{sub.method}</span>
              </td>
              <td className="px-4 py-5 text-sm font-bold text-indigo-600">{sub.processName}</td>
              <td className="px-8 py-5 text-xs font-mono font-black text-indigo-400 group-hover:underline cursor-pointer">
                {sub.processCode}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ProductRoutingView: React.FC<{ data: ProductRoutingEntry[] }> = ({ data }) => (
  <div className="flex-1 overflow-x-auto overflow-y-auto">
    <table className="min-w-[1600px] text-left border-separate border-spacing-0">
      <thead className="bg-slate-50/80 sticky top-0 z-10">
        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] whitespace-nowrap">
          <th className="px-8 py-5 border-b border-slate-100 sticky left-0 bg-slate-50 z-20 border-r border-slate-100">产品编码</th>
          <th className="px-4 py-5 border-b border-slate-100">产品属性</th>
          <th className="px-4 py-5 border-b border-slate-100">产品名称</th>
          <th className="px-4 py-5 border-b border-slate-100">产品类型</th>
          <th className="px-4 py-5 border-b border-slate-100">规格型号</th>
          <th className="px-4 py-5 border-b border-slate-100 text-center">生产单位</th>
          <th className="px-4 py-5 border-b border-slate-100 text-center bg-indigo-50/50">工序序号</th>
          <th className="px-4 py-5 border-b border-slate-100 bg-indigo-50/50">工序名称</th>
          <th className="px-4 py-5 border-b border-slate-100 font-mono bg-indigo-50/50">工序编码</th>
          <th className="px-4 py-5 border-b border-slate-100 text-right bg-indigo-50/50">单位生产数量</th>
          <th className="px-4 py-5 border-b border-slate-100 text-center bg-indigo-50/50">生产班组</th>
          <th className="px-4 py-5 border-b border-slate-100 text-center bg-indigo-50/50">班组长</th>
          <th className="px-4 py-5 border-b border-slate-100 text-center bg-indigo-50/50">班组人数</th>
          <th className="px-8 py-5 border-b border-slate-100 text-center bg-indigo-50/50">质检员</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {data.map((prod, pIdx) => (
          <React.Fragment key={pIdx}>
            {prod.processes.map((proc, prIdx) => (
              <tr key={`${pIdx}-${prIdx}`} className="hover:bg-indigo-50/20 transition-colors group">
                <td className="px-8 py-5 sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100 font-mono font-black text-slate-800 text-sm">
                  {prIdx === 0 ? prod.code : ''}
                </td>
                <td className="px-4 py-5 text-xs font-black text-amber-600 uppercase">
                  {prIdx === 0 ? prod.attr : ''}
                </td>
                <td className="px-4 py-5 text-sm font-black text-slate-800">
                  {prIdx === 0 ? prod.name : ''}
                </td>
                <td className="px-4 py-5 text-xs font-bold text-slate-500">
                  {prIdx === 0 ? prod.type : ''}
                </td>
                <td className="px-4 py-5 text-xs font-mono text-slate-400">
                  {prIdx === 0 ? prod.specs : ''}
                </td>
                <td className="px-4 py-5 text-center text-xs font-black text-slate-600">
                  {prIdx === 0 ? prod.prodUnit : ''}
                </td>
                
                {/* 工序明细部分 */}
                <td className="px-4 py-5 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-black">{proc.seq}</span>
                </td>
                <td className="px-4 py-5 text-sm font-black text-slate-700">{proc.name}</td>
                <td className="px-4 py-5 text-xs font-mono font-bold text-indigo-600 uppercase">{proc.code}</td>
                <td className="px-4 py-5 text-right font-mono font-black text-slate-900">{proc.unitQty}</td>
                <td className="px-4 py-5 text-center">
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-black rounded border border-indigo-100">{proc.team}</span>
                </td>
                <td className="px-4 py-5 text-center text-sm font-bold text-slate-700">{proc.leader}</td>
                <td className="px-4 py-5 text-center text-sm font-mono font-bold text-slate-500">{proc.members}</td>
                <td className="px-8 py-5 text-center text-sm font-bold text-slate-700">{proc.inspector}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
);

const ProductQCView: React.FC<{ data: QCRuleEntry[] }> = ({ data }) => (
  <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-500">
    <div className="px-10 py-6 border-b border-slate-100 bg-slate-50/30 flex items-center space-x-3 shrink-0">
      <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
      <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">质检标准 (QC Standards)</h3>
    </div>
    
    <div className="flex-1 overflow-x-auto overflow-y-auto">
      <table className="min-w-[1800px] text-left border-separate border-spacing-0">
        <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
          <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] whitespace-nowrap">
            <th className="px-8 py-5 border-b border-slate-100">产品名称</th>
            <th className="px-4 py-5 border-b border-slate-100">产品类型</th>
            <th className="px-4 py-5 border-b border-slate-100">产品编码</th>
            <th className="px-4 py-5 border-b border-slate-100">检验日期</th>
            <th className="px-4 py-5 border-b border-slate-100">检验批次</th>
            <th className="px-4 py-5 border-b border-slate-100 text-center">检验数量/抽样比例</th>
            <th className="px-4 py-5 border-b border-slate-100">质检标准</th>
            <th className="px-4 py-5 border-b border-slate-100 text-center">判定结果</th>
            <th className="px-6 py-5 border-b border-slate-100">不合格描述</th>
            <th className="px-8 py-5 border-b border-slate-100 text-center">质检员</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
              <td className="px-8 py-6 text-sm font-black text-slate-800">{item.productName}</td>
              <td className="px-4 py-6">
                <div className="relative group/select">
                  <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] font-black text-indigo-600 outline-none cursor-pointer group-hover/select:border-indigo-300 appearance-none pr-8">
                    <option value="成品">成品</option>
                    <option value="半成品">半成品</option>
                  </select>
                  <svg className="absolute right-2 top-2.5 w-3 h-3 text-indigo-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </td>
              <td className="px-4 py-6 text-sm font-mono font-black text-slate-500">{item.productCode}</td>
              <td className="px-4 py-6">
                <div className="relative group/select">
                  <select className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] font-black text-slate-600 outline-none cursor-pointer group-hover/select:border-indigo-300 appearance-none pr-8">
                    <option value={item.checkDate}>{item.checkDate}</option>
                  </select>
                  <svg className="absolute right-2 top-2.5 w-3 h-3 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </td>
              <td className="px-4 py-6 text-sm font-mono font-bold text-slate-400">{item.batchNo}</td>
              <td className="px-4 py-6 text-center text-sm font-mono font-black text-slate-800 bg-slate-50/50">{item.sampleRate}</td>
              <td className="px-4 py-6 text-sm font-medium text-slate-600">{item.standard}</td>
              <td className="px-4 py-6 text-center">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                  item.result === '合格' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600 animate-pulse'
                }`}>
                  {item.result}
                </span>
              </td>
              <td className="px-6 py-6 text-sm font-bold text-rose-500 italic max-w-xs truncate" title={item.failedDesc}>
                {item.failedDesc || "--"}
              </td>
              <td className="px-8 py-6 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-white font-black">{item.checker}</div>
                  <span className="text-xs font-black text-slate-700">{item.checker}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* --- 辅助组件 --- */

const FilterGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-2">
    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</h4>
    <div className="relative group">
      {children}
      <svg className="absolute right-3.5 top-3 w-4 h-4 text-slate-300 pointer-events-none group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
    </div>
  </div>
);

const FilterGroupSimple: React.FC<{ label: string; defaultValue: string; options: string[] }> = ({ label, defaultValue, options }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <div className="relative group">
      <select defaultValue={defaultValue} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-black text-slate-800 outline-none appearance-none cursor-pointer">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <svg className="absolute right-3.5 top-2.5 w-4 h-4 text-slate-300 pointer-events-none group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
    </div>
  </div>
);

const FilterCheckbox: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-3 cursor-pointer group">
    <div className={`w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${
      checked ? 'bg-indigo-600 border-indigo-600' : 'bg-slate-50 border-slate-200 group-hover:border-indigo-300'
    }`}>
      {checked && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
    </div>
    <span className={`text-xs font-bold transition-colors ${checked ? 'text-slate-800' : 'text-slate-400'}`}>{label}</span>
  </label>
);
