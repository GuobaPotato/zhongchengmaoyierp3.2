
import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';
import { AIInsights } from './components/AIInsights';
import { Sidebar } from './components/Sidebar';
import { PlaceholderModule } from './components/PlaceholderModule';
import { PurchasingOrders } from './components/PurchasingOrders';
import { PurchasingReturns } from './components/PurchasingReturns';
import { PurchasingSuppliers } from './components/PurchasingSuppliers';
import { SalesContract } from './components/SalesContract';
import { ShippingPlan } from './components/ShippingPlan';
import { ShippingOrder } from './components/ShippingOrder';
import { InventoryStockIn } from './components/InventoryStockIn';
import { InventoryStockOut } from './components/InventoryStockOut';
import { CRMLeads } from './components/CRMLeads';
import { CRMLeadPool } from './components/CRMLeadPool';
import { CRMCustomers } from './components/CRMCustomers';
import { CRMCustomerPool } from './components/CRMCustomerPool';
import { CRMCommunications } from './components/CRMCommunications';
import { CRMQuotations } from './components/CRMQuotations';
import { InventoryCount } from './components/InventoryCount';
import { WarehouseLocationManagement } from './components/WarehouseLocationManagement';
import { Products } from './components/Products';
import { ProductProcessAdd } from './components/ProductProcessAdd';
import { ProductBOMAdd } from './components/ProductBOMAdd';
import { ProductInfoAdd } from './components/ProductInfoAdd';
import { ProductQCRuleAdd } from './components/ProductQCRuleAdd';
import { QualityCheckList } from './components/QualityCheckList';
import { CarrierManagement } from './components/CarrierManagement';
import { ProductionTotalList } from './components/ProductionTotalList';
import { ProductionReporting } from './components/ProductionReporting';
import { ProductionWarehousing } from './components/ProductionWarehousing';
import { ProductionRequisition } from './components/ProductionRequisition';
import { ProductionMaterialReturn } from './components/ProductionMaterialReturn';
import { SalesOrderTracking } from './components/SalesOrderTracking';
import { ApprovalFlowManagement } from './components/ApprovalFlowManagement';
import { MyApprovals } from './components/MyApprovals';
import { ProductionWorkOrder } from './components/ProductionWorkOrder';
import { ProductionPlan } from './components/ProductionPlan';

export enum NavItem {
  DASHBOARD = 'dashboard',
  CRM = 'crm',
  CRM_LEADS = 'crm_leads',
  CRM_LEAD_POOL = 'crm_lead_pool',
  CRM_CUSTOMERS = 'crm_customers',
  CRM_CUSTOMER_POOL = 'crm_customer_pool',
  CRM_COMMUNICATIONS = 'crm_communications',
  CRM_QUOTATIONS = 'crm_quotations',
  PRODUCTS = 'products',
  PRODUCTS_LIST = 'products_list',
  PRODUCTS_ADD_INFO = 'products_add_info',
  PRODUCTS_ADD_BOM = 'products_add_bom',
  PRODUCTS_ADD_PROCESS = 'products_add_process',
  PRODUCTS_ADD_QC = 'products_add_qc',
  PRODUCTION = 'production',
  PRODUCTION_LIST = 'production_list',
  PRODUCTION_PLAN = 'production_plan',
  PRODUCTION_ORDER = 'production_order',
  PRODUCTION_REQUISITION = 'production_requisition',
  PRODUCTION_RETURN = 'production_return',
  PRODUCTION_REPORTING = 'production_reporting',
  PRODUCTION_INSTOCK = 'production_instock',
  PURCHASING = 'purchasing',
  PURCHASING_ORDERS = 'purchasing_orders',
  PURCHASING_RETURNS = 'purchasing_returns',
  PURCHASING_SUPPLIERS = 'purchasing_suppliers',
  INVENTORY = 'inventory',
  INVENTORY_STOCK_IN = 'inventory_stock_in',
  INVENTORY_STOCK_OUT = 'inventory_stock_out',
  INVENTORY_MANAGEMENT = 'inventory_management',
  INVENTORY_COUNT = 'inventory_count',
  INVENTORY_LOCATIONS = 'inventory_locations',
  SALES = 'sales',
  SALES_CONTRACT = 'sales_contract',
  SALES_SHIPPING_PLAN = 'sales_shipping_plan',
  SALES_SHIPPING_ORDER = 'sales_shipping_order',
  SALES_ORDER_TRACKING = 'sales_order_tracking',
  SALES_CARRIER_MANAGEMENT = 'sales_carrier_management',
  SALES_SUMMARY = 'sales_summary',
  SALES_EXPORT = 'sales_export',
  QUALITY = 'quality',
  APPROVAL = 'approval',
  APPROVAL_FLOW = 'approval_flow',
  APPROVAL_MINE = 'approval_mine',
  APPROVAL_RECORDS = 'approval_records',
  DATA = 'data',
  AI = 'ai',
  SETTINGS = 'settings'
}

const App: React.FC = () => {
  const [currentNav, setCurrentNav] = useState<string>(NavItem.DASHBOARD);

  const getTitle = () => {
    switch (currentNav) {
      case NavItem.DASHBOARD: return '控制面板';
      case NavItem.CRM: return 'CRM 客户关系';
      case NavItem.CRM_LEADS: return '线索管理';
      case NavItem.CRM_LEAD_POOL: return '线索池';
      case NavItem.CRM_CUSTOMERS: return '客户管理';
      case NavItem.CRM_CUSTOMER_POOL: return '客户池';
      case NavItem.CRM_COMMUNICATIONS: return '沟通记录';
      case NavItem.CRM_QUOTATIONS: return '报价单';
      case NavItem.PRODUCTS: return '产品管理';
      case NavItem.PRODUCTS_LIST: return '产品总列表';
      case NavItem.PRODUCTS_ADD_INFO: return '新增产品信息';
      case NavItem.PRODUCTS_ADD_BOM: return '新增BOM';
      case NavItem.PRODUCTS_ADD_PROCESS: return '新增工艺路线';
      case NavItem.PRODUCTS_ADD_QC: return '新增质检规则';
      case NavItem.PRODUCTION_LIST: return '生产总列表';
      case NavItem.PRODUCTION_PLAN: return '生产计划';
      case NavItem.PRODUCTION_ORDER: return '生产工单';
      case NavItem.PRODUCTION_REQUISITION: return '生产领料';
      case NavItem.PRODUCTION_RETURN: return '生产退料';
      case NavItem.PRODUCTION_REPORTING: return '生产报工';
      case NavItem.PRODUCTION_INSTOCK: return '生产入库';
      case NavItem.PURCHASING: return '采购管理概览';
      case NavItem.PURCHASING_ORDERS: return '采购订单';
      case NavItem.PURCHASING_RETURNS: return '采购退货';
      case NavItem.PURCHASING_SUPPLIERS: return '供应商管理';
      case NavItem.INVENTORY_STOCK_IN: return '入库单管理';
      case NavItem.INVENTORY_STOCK_OUT: return '出库单管理';
      case NavItem.INVENTORY_MANAGEMENT: return '库存列表';
      case NavItem.INVENTORY_COUNT: return '库存盘点';
      case NavItem.INVENTORY_LOCATIONS: return '库位管理';
      case NavItem.SALES_CONTRACT: return '外销合同';
      case NavItem.SALES_SHIPPING_PLAN: return '出运计划';
      case NavItem.SALES_SHIPPING_ORDER: return '出运单';
      case NavItem.SALES_ORDER_TRACKING: return '订单跟踪';
      case NavItem.SALES_CARRIER_MANAGEMENT: return '承运商管理';
      case NavItem.QUALITY: return '质检管理';
      case NavItem.APPROVAL_FLOW: return '审批流管理';
      case NavItem.APPROVAL_MINE: return '我的审批';
      case NavItem.APPROVAL_RECORDS: return '审批记录';
      case NavItem.DATA: return '数据管理';
      case NavItem.AI: return 'AI 智能决策';
      case NavItem.SETTINGS: return '系统设置';
      default: return '感应器ERP';
    }
  };

  const renderContent = () => {
    switch (currentNav) {
      case NavItem.DASHBOARD: return <Dashboard />;
      case NavItem.AI: return <AIInsights />;
      
      // Production
      case NavItem.PRODUCTION_LIST: return <ProductionTotalList />;
      case NavItem.PRODUCTION_PLAN: return <ProductionPlan />;
      case NavItem.PRODUCTION_ORDER: return <ProductionWorkOrder onClose={() => setCurrentNav(NavItem.PRODUCTION_LIST)} />;
      case NavItem.PRODUCTION_REQUISITION: return <ProductionRequisition />;
      case NavItem.PRODUCTION_RETURN: return <ProductionMaterialReturn />;
      case NavItem.PRODUCTION_REPORTING: return <ProductionReporting />;
      case NavItem.PRODUCTION_INSTOCK: return <ProductionWarehousing />;

      // CRM
      case NavItem.CRM_LEADS: return <CRMLeads />;
      case NavItem.CRM_LEAD_POOL: return <CRMLeadPool />;
      case NavItem.CRM_CUSTOMERS: return <CRMCustomers />;
      case NavItem.CRM_CUSTOMER_POOL: return <CRMCustomerPool />;
      case NavItem.CRM_COMMUNICATIONS: return <CRMCommunications />;
      case NavItem.CRM_QUOTATIONS: return <CRMQuotations />;
      
      // Products
      case NavItem.PRODUCTS_LIST: return <Products />;
      case NavItem.PRODUCTS_ADD_INFO: return <ProductInfoAdd onClose={() => setCurrentNav(NavItem.PRODUCTS_LIST)} />;
      case NavItem.PRODUCTS_ADD_BOM: return <ProductBOMAdd onClose={() => setCurrentNav(NavItem.PRODUCTS_LIST)} />;
      case NavItem.PRODUCTS_ADD_PROCESS: return <ProductProcessAdd onClose={() => setCurrentNav(NavItem.PRODUCTS_LIST)} />;
      case NavItem.PRODUCTS_ADD_QC: return <ProductQCRuleAdd onClose={() => setCurrentNav(NavItem.PRODUCTS_LIST)} />;

      // Purchasing
      case NavItem.PURCHASING_ORDERS: return <PurchasingOrders />;
      case NavItem.PURCHASING_RETURNS: return <PurchasingReturns />;
      case NavItem.PURCHASING_SUPPLIERS: return <PurchasingSuppliers />;
      
      // Inventory Sub-modules
      case NavItem.INVENTORY_STOCK_IN: return <InventoryStockIn />;
      case NavItem.INVENTORY_STOCK_OUT: return <InventoryStockOut />;
      case NavItem.INVENTORY_MANAGEMENT: return <Inventory />;
      case NavItem.INVENTORY_COUNT: return <InventoryCount />;
      case NavItem.INVENTORY_LOCATIONS: return <WarehouseLocationManagement />;
      
      // Sales
      case NavItem.SALES_CONTRACT: return <SalesContract />;
      case NavItem.SALES_SHIPPING_PLAN: return <ShippingPlan />;
      case NavItem.SALES_SHIPPING_ORDER: return <ShippingOrder />;
      case NavItem.SALES_ORDER_TRACKING: return <SalesOrderTracking />;
      case NavItem.SALES_CARRIER_MANAGEMENT: return <CarrierManagement />;

      // Quality
      case NavItem.QUALITY: return <QualityCheckList />;

      // Approvals
      case NavItem.APPROVAL_FLOW: return <ApprovalFlowManagement />;
      case NavItem.APPROVAL_MINE: return <MyApprovals />;
      case NavItem.APPROVAL_RECORDS: return <PlaceholderModule name="审批记录" description="全量历史审批日志查询与追溯。" />;
      
      case NavItem.CRM: return <PlaceholderModule name="CRM 客户管理" description="维护客户资产、销售线索及沟通记录" />;
      case NavItem.PURCHASING: return <PlaceholderModule name="采购管理概览" description="采购流程总体指标与看板" />;
      case NavItem.DATA: return <PlaceholderModule name="数据中心" description="大数据看板、报表导出及经营分析" />;
      case NavItem.SETTINGS: return <PlaceholderModule name="系统配置" description="权限角色、组织架构及基础字典设置" />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Fixed on large screens */}
      <div className="w-64 flex-shrink-0">
        <Sidebar activeNav={currentNav} onNavChange={setCurrentNav} />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-slate-800">
              {getTitle()}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-slate-500">
              同步状态: <span className="text-green-600 font-medium">实时</span>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              AD
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
