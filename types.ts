
export enum SensorType {
  TEMPERATURE = '温度传感器',
  PRESSURE = '压力传感器',
  HUMIDITY = '湿度传感器',
  PROXIMITY = '接近传感器',
  FLOW = '流量传感器'
}

export enum OrderStatus {
  PENDING = '待处理',
  PRODUCTION = '生产中',
  SHIPPED = '已发货',
  DELIVERED = '已送达'
}

export interface InventoryItem {
  id: string;
  name: string;
  type: SensorType;
  stock: number;
  minThreshold: number;
  price: number;
  lastUpdated: string;
}

export interface ProductionOrder {
  id: string;
  customer: string;
  item: string;
  quantity: number;
  status: OrderStatus;
  deadline: string;
}

export interface DashboardStats {
  totalInventory: number;
  activeOrders: number;
  lowStockAlerts: number;
  revenueThisMonth: number;
}
