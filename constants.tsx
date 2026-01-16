
import React from 'react';
import { SensorType, OrderStatus, InventoryItem, ProductionOrder } from './types';

export interface ProductionTotalItem {
  id: string;
  planNo: string;
  workOrderNo: string;
  type: '订单生产' | '预生产';
  productName: string;
  specs: string;
  batchNo: string;
  team: string;
  leader: string;
  plannedQty: number;
  dispatchedQty: number;
  producedQty: number;
  inspectedQty: number;
  warehousedQty: number;
  status: '待开工' | '生产中' | '已完工' | '质检中' | '已入库' | '已作废';
  plannedStart: string;
  plannedEnd: string;
  actualStart: string;
  actualEnd: string;
}

export interface PurchaseOrderItem {
  id: string;
  name: string;
  source: string;
  status: string;
  actionLabel?: string;
  supplier: string;
  date: string;
  totalAmount: number;
  orderNo: string;
  paymentStatus: string;
  stockStatus: string;
  auditStatus: string;
}

export interface PurchaseReturnItem {
  id: string;
  title: string;
  returnNo: string;
  purchaseNo: string;
  purchaseName: string;
  amount: number;
  auditStatus: string;
  paymentStatus: string;
  stockStatus: string;
  returnType: string;
  returnDate: string;
  owner: string;
  createdAt: string;
}

export interface SupplierItem {
  id: string;
  name: string;
  category: string;
  cooperationCount: number;
  rating: string;
  contact: string;
  phone: string;
  landline: string;
  address: string;
  owner: string;
  ownerDept: string;
  createdAt: string;
  notes?: string;
  creator: string;
  updatedAt: string;
}

export interface SalesContractItem {
  id: string;
  orderType: string;
  contractNo: string;
  contractDate: string;
  customerOrderNo: string;
  ourName: string;
  customerName: string;
  dealParty: string;
  currency: string;
  deliveryDate: string;
  creatorName: string;
  creatorCode: string;
  salesAmount: number;
  totalQuantity: number;
}

export interface ShippingPlanItem {
  id: string;
  planNos: string;
  contractNo: string;
  shippingDate: string;
  ourName: string;
  customerName: string;
  incoterms: string;
  currency: string;
  carrier: string;
  deliveryDate: string;
  etd: string;
  eta: string;
  creatorName: string;
  creatorCode: string;
  description: string;
}

// Mock Data
export const MOCK_PRODUCTION_TOTAL: ProductionTotalItem[] = [
  {
    id: "1",
    planNo: "SC-JH-20260106",
    workOrderNo: "GD-2026011001",
    type: "订单生产",
    productName: "感应龙头外壳（ABS）",
    specs: "ABS防菌款180mm",
    batchNo: "QC-20260106",
    team: "组装一班",
    leader: "李班组",
    plannedQty: 500,
    dispatchedQty: 500,
    producedQty: 500,
    inspectedQty: 500,
    warehousedQty: 500,
    status: "已入库",
    plannedStart: "2026-01-06",
    plannedEnd: "2026-01-10",
    actualStart: "2026-01-06",
    actualEnd: "2026-01-08"
  },
  {
    id: "2",
    planNo: "SC-JH-20260108",
    workOrderNo: "GD-2026011002",
    type: "预生产",
    productName: "红外感应模块",
    specs: "HC-SR501欧规220V",
    batchNo: "QC-20260108",
    team: "组装二班",
    leader: "王班组",
    plannedQty: 1000,
    dispatchedQty: 1000,
    producedQty: 1000,
    inspectedQty: 800,
    warehousedQty: 0,
    status: "生产中",
    plannedStart: "2026-01-08",
    plannedEnd: "2026-01-18",
    actualStart: "2026-01-08",
    actualEnd: "-"
  },
  {
    id: "3",
    planNo: "SC-JH-20260110",
    workOrderNo: "GD-2026011003",
    type: "订单生产",
    productName: "智能感应探头",
    specs: "高精度防水IP67",
    batchNo: "QC-20260110",
    team: "组装三班",
    leader: "赵班组",
    plannedQty: 800,
    dispatchedQty: 0,
    producedQty: 0,
    inspectedQty: 0,
    warehousedQty: 0,
    status: "待开工",
    plannedStart: "2026-01-10",
    plannedEnd: "2026-01-20",
    actualStart: "-",
    actualEnd: "-"
  },
  {
    id: "4",
    planNo: "SC-JH-20260112",
    workOrderNo: "GD-2026011004",
    type: "预生产",
    productName: "卫浴设备底座",
    specs: "欧标尺寸",
    batchNo: "QC-20260112",
    team: "组装一班",
    leader: "李班组",
    plannedQty: 1500,
    dispatchedQty: 1500,
    producedQty: 1200,
    inspectedQty: 1200,
    warehousedQty: 1000,
    status: "生产中",
    plannedStart: "2026-01-12",
    plannedEnd: "2026-01-22",
    actualStart: "2026-01-12",
    actualEnd: "-"
  }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'S001', name: '温度传感器 T100', type: SensorType.TEMPERATURE, stock: 1200, minThreshold: 500, price: 45, lastUpdated: '2024-01-10' },
  { id: 'S002', name: '压力传感器 P200', type: SensorType.PRESSURE, stock: 300, minThreshold: 500, price: 85, lastUpdated: '2024-01-11' },
  { id: 'S003', name: '湿度传感器 H300', type: SensorType.HUMIDITY, stock: 800, minThreshold: 200, price: 55, lastUpdated: '2024-01-12' },
  { id: 'S004', name: '流量传感器 F400', type: SensorType.FLOW, stock: 150, minThreshold: 300, price: 120, lastUpdated: '2024-01-13' },
];

export const MOCK_ORDERS: ProductionOrder[] = [
  { id: 'ORD-101', customer: '客户A', item: '温度传感器 T100', quantity: 500, status: OrderStatus.PENDING, deadline: '2024-02-01' },
  { id: 'ORD-102', customer: '客户B', item: '压力传感器 P200', quantity: 200, status: OrderStatus.PRODUCTION, deadline: '2024-01-25' },
  { id: 'ORD-103', customer: '客户C', item: '湿度传感器 H300', quantity: 1000, status: OrderStatus.SHIPPED, deadline: '2024-01-20' },
];

export const MOCK_PURCHASE_ORDERS: PurchaseOrderItem[] = [
  { id: '1', name: '芯片采购', source: '物料计划', status: '待处理', supplier: '供应商A', date: '2024-01-12', totalAmount: 50000, orderNo: 'PO001', paymentStatus: '待付款', stockStatus: '未入库', auditStatus: '审批中' },
  { id: '2', name: '传感器外壳采购', source: '库存预警', status: '已完成', supplier: '供应商B', date: '2024-01-10', totalAmount: 20000, orderNo: 'PO002', paymentStatus: '已付款', stockStatus: '已入库', auditStatus: '通过', actionLabel: '去查看' }
];

export const MOCK_PURCHASE_RETURNS: PurchaseReturnItem[] = [
  { id: '1', title: '芯片退货', returnNo: 'RT001', purchaseNo: 'PO001', purchaseName: '芯片采购', amount: 5000, auditStatus: '通过', paymentStatus: '已回款', stockStatus: '已出库', returnType: '质量退货', returnDate: '2024-01-15', owner: '王朔', createdAt: '2024-01-14' }
];

export const MOCK_SUPPLIERS: SupplierItem[] = [
  { id: '1', name: '供应商A', category: '原材料供应商', cooperationCount: 15, rating: 'A', contact: '张三', phone: '13800138000', landline: '010-12345678', address: '北京', owner: '赵采购', ownerDept: '采购部', createdAt: '2023-01-01', notes: '长期合作', creator: 'admin', updatedAt: '2024-01-01' }
];

export const MOCK_SALES_CONTRACTS: SalesContractItem[] = [
  { id: '1', orderType: '大货', contractNo: 'CON001', contractDate: '2024-01-10', customerOrderNo: 'CUST001', ourName: '众成', customerName: '客户A', dealParty: '客户A', currency: 'CNY', deliveryDate: '2024-02-01', creatorName: '李销售', creatorCode: 'S001', salesAmount: 100000, totalQuantity: 1000 }
];

export const MOCK_SHIPPING_PLANS: ShippingPlanItem[] = [
  { id: '1', planNos: 'PLN001', contractNo: 'CON001', shippingDate: '2024-02-10', ourName: '众成', customerName: '客户A', incoterms: 'FOB', currency: 'CNY', carrier: '顺丰', deliveryDate: '2024-02-01', etd: '2024-02-12', eta: '2024-02-15', creatorName: '李销售', creatorCode: 'S001', description: '一批传感器' }
];

// Icons
export const ICONS = {
  Dashboard: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25a2.25 2.25 0 01-2.25 2.25h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
    </svg>
  ),
  AI: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  CRM: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  Product: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
  Production: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.128l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M8.984 19.723l.461-1.429m1.34-11.426l.46-1.429M12 21V19.5m0-15V3m2.032 18.232l-.46-1.429m-1.34-11.426l-.461-1.429m5.656 15.312l-1.149-.964m-11.49-9.642l-1.15-.964M20.457 15.077l-1.41-.513m-14.095-5.128l-1.41-.513" />
    </svg>
  ),
  Purchasing: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  ),
  Inventory: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
  Sales: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.5 4.5L21.75 7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 7.5H21.75V10.5" />
    </svg>
  ),
  QC: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Approval: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .407.16.785.42 1.057l6.776 6.776c.41.41.41 1.076 0 1.487l-3.388 3.388a1.051 1.051 0 01-1.487 0L6.79 10.432a1.493 1.493 0 01-.439-1.053V4.437c0-.64.406-1.21 1.014-1.403a2.25 2.25 0 012.245.36c.63.504.8 1.408.384 2.115l-1.14 1.94" />
    </svg>
  ),
  Data: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h.75c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-.75A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h.75c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-.75a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h.75c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-.75a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  Settings: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Plus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  Setting: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Refresh: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  ),
  Export: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  )
};
