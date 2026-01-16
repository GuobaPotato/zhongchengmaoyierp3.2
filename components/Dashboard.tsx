
import React from 'react';
import { MOCK_INVENTORY, MOCK_ORDERS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: '总库存量', value: MOCK_INVENTORY.reduce((acc, curr) => acc + curr.stock, 0), color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '待处理订单', value: MOCK_ORDERS.filter(o => o.status === '待处理').length, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: '缺货预警', value: MOCK_INVENTORY.filter(i => i.stock < i.minThreshold).length, color: 'text-red-600', bg: 'bg-red-50' },
    { label: '本月预计产值', value: '¥1.2M', color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const chartData = MOCK_INVENTORY.map(item => ({
    name: item.name,
    stock: item.stock,
    min: item.minThreshold
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className={`${stat.bg} ${stat.color} text-xs px-2 py-1 rounded-full font-bold`}>
                +12%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inventory Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">库存水位监测</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="stock" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="min" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">最新生产订单</h3>
            <button className="text-sm text-indigo-600 font-medium hover:underline">查看全部</button>
          </div>
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold">
                    {order.id.split('-')[1]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{order.customer}</p>
                    <p className="text-xs text-slate-500">{order.item} × {order.quantity}</p>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  order.status === '生产中' ? 'bg-blue-100 text-blue-700' : 
                  order.status === '待处理' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                }`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
