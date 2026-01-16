
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { NavItem } from '../App';

interface SidebarProps {
  activeNav: string;
  onNavChange: (nav: string) => void;
}

interface MenuItem {
  id: string;
  name: string;
  // Use React.ReactElement instead of JSX.Element to resolve namespace error
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  children?: { id: string, name: string }[];
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ activeNav, onNavChange }) => {
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set(['crm', 'purchasing', 'sales', 'inventory', 'products', 'production', 'approval']));

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(expandedMenus);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedMenus(newSet);
  };

  const menuGroups: MenuGroup[] = [
    {
      title: '主页',
      items: [
        { id: NavItem.DASHBOARD, name: '控制面板', icon: ICONS.Dashboard },
        { id: NavItem.AI, name: '智能洞察', icon: ICONS.AI },
      ]
    },
    {
      title: '业务流',
      items: [
        { 
          id: NavItem.CRM, 
          name: 'CRM 客情', 
          icon: ICONS.CRM,
          children: [
            { id: NavItem.CRM_LEADS, name: '线索管理' },
            { id: NavItem.CRM_LEAD_POOL, name: '线索池' },
            { id: NavItem.CRM_CUSTOMERS, name: '客户管理' },
            { id: NavItem.CRM_CUSTOMER_POOL, name: '客户池' },
            { id: NavItem.CRM_COMMUNICATIONS, name: '沟通记录' },
            { id: NavItem.CRM_QUOTATIONS, name: '报价单' },
          ]
        },
        { 
          id: NavItem.PRODUCTS, 
          name: '产品管理', 
          icon: ICONS.Product,
          children: [
            { id: NavItem.PRODUCTS_LIST, name: '产品总列表' },
            { id: NavItem.PRODUCTS_ADD_INFO, name: '新增产品信息' },
            { id: NavItem.PRODUCTS_ADD_BOM, name: '新增BOM' },
            { id: NavItem.PRODUCTS_ADD_PROCESS, name: '新增工艺路线' },
            { id: NavItem.PRODUCTS_ADD_QC, name: '新增质检规则' },
          ]
        },
        { 
          id: NavItem.PRODUCTION, 
          name: '生产管理', 
          icon: ICONS.Production,
          children: [
            { id: NavItem.PRODUCTION_LIST, name: '生产总列表' },
            { id: NavItem.PRODUCTION_PLAN, name: '生产计划' },
            { id: NavItem.PRODUCTION_ORDER, name: '生产工单' },
            { id: NavItem.PRODUCTION_REQUISITION, name: '生产领料' },
            { id: NavItem.PRODUCTION_RETURN, name: '生产退料' },
            { id: NavItem.PRODUCTION_REPORTING, name: '生产报工' },
            { id: NavItem.PRODUCTION_INSTOCK, name: '生产入库' },
          ]
        },
        { 
          id: NavItem.PURCHASING, 
          name: '采购管理', 
          icon: ICONS.Purchasing,
          children: [
            { id: NavItem.PURCHASING_ORDERS, name: '采购订单' },
            { id: NavItem.PURCHASING_RETURNS, name: '采购退货' },
            { id: NavItem.PURCHASING_SUPPLIERS, name: '供应商管理' },
          ]
        },
        { 
          id: NavItem.INVENTORY, 
          name: '库存管理', 
          icon: ICONS.Inventory,
          children: [
            { id: NavItem.INVENTORY_STOCK_IN, name: '入库单' },
            { id: NavItem.INVENTORY_STOCK_OUT, name: '出库单' },
            { id: NavItem.INVENTORY_MANAGEMENT, name: '库存列表' },
            { id: NavItem.INVENTORY_COUNT, name: '库存盘点' },
            { id: NavItem.INVENTORY_LOCATIONS, name: '库位管理' },
          ]
        },
        { 
          id: NavItem.SALES, 
          name: '销售出口', 
          icon: ICONS.Sales,
          children: [
            { id: NavItem.SALES_CONTRACT, name: '外销合同' },
            { id: NavItem.SALES_SHIPPING_PLAN, name: '出运计划' },
            { id: NavItem.SALES_SHIPPING_ORDER, name: '出运单' },
            { id: NavItem.SALES_ORDER_TRACKING, name: '订单跟踪' },
            { id: NavItem.SALES_CARRIER_MANAGEMENT, name: '承运商管理' },
          ]
        },
      ]
    },
    {
      title: '协同与管理',
      items: [
        { id: NavItem.QUALITY, name: '质检管理', icon: ICONS.QC },
        { 
          id: NavItem.APPROVAL, 
          name: '审批管理', 
          icon: ICONS.Approval,
          children: [
            { id: NavItem.APPROVAL_FLOW, name: '审批流管理' },
            { id: NavItem.APPROVAL_MINE, name: '我的审批' },
            { id: NavItem.APPROVAL_RECORDS, name: '审批记录' },
          ]
        },
        { id: NavItem.DATA, name: '数据管理', icon: ICONS.Data },
      ]
    },
    {
      title: '系统',
      items: [
        { id: NavItem.SETTINGS, name: '系统设置', icon: ICONS.Settings },
      ]
    }
  ];

  return (
    <div className="bg-slate-900 text-slate-300 h-full flex flex-col fixed w-64 border-r border-slate-800">
      <div className="p-6 flex items-center space-x-3 shrink-0">
        <div className="bg-indigo-500 p-2 rounded-lg">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-xl font-bold text-white tracking-tight">感应器 ERP</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-hide">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedMenus.has(item.id);
                const isActive = activeNav === item.id || (hasChildren && item.children?.some(c => c.id === activeNav));

                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={(e) => hasChildren ? toggleExpand(item.id, e) : onNavChange(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                        activeNav === item.id && !hasChildren
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                          : 'hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className={`h-5 w-5 ${activeNav === item.id && !hasChildren ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400 transition-colors'}`} />
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>
                      {hasChildren && (
                        <div 
                          className="p-1 hover:bg-white/10 rounded-md transition-colors"
                        >
                          <svg 
                            className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      )}
                    </button>
                    
                    {hasChildren && isExpanded && (
                      <div className="ml-9 space-y-1 animate-in slide-in-from-top-2 duration-200">
                        {item.children?.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => onNavChange(child.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                              activeNav === child.id
                                ? 'bg-slate-800 text-indigo-400 font-bold'
                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                            }`}
                          >
                            {child.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 shrink-0">
        <div className="bg-slate-800/40 rounded-xl p-3">
          <div className="flex items-center space-x-2 text-xs text-green-400 mb-1">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></div>
            <span className="font-semibold uppercase tracking-wider">系统正常</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">感应器ERP v3.1.0 (PRO)</p>
        </div>
      </div>
    </div>
  );
};
