
import React from 'react';
import { MOCK_ORDERS } from '../constants';
import { OrderStatus } from '../types';

export const Production: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.values(OrderStatus).map((status) => (
          <div key={status} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-slate-700">{status}</h4>
              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">
                {MOCK_ORDERS.filter(o => o.status === status).length}
              </span>
            </div>
            <div className="space-y-3">
              {MOCK_ORDERS.filter(o => o.status === status).map(order => (
                <div key={order.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-300 transition-all cursor-move">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">{order.id}</span>
                    <span className="text-[10px] text-slate-400">{order.deadline}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 mt-1">{order.item}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-500">数量: {order.quantity}</span>
                    <div className="flex -space-x-1">
                       <div className="h-5 w-5 rounded-full bg-slate-200 border border-white"></div>
                       <div className="h-5 w-5 rounded-full bg-indigo-200 border border-white"></div>
                    </div>
                  </div>
                </div>
              ))}
              {MOCK_ORDERS.filter(o => o.status === status).length === 0 && (
                <div className="py-8 text-center text-slate-400 text-xs italic">无此类订单</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
