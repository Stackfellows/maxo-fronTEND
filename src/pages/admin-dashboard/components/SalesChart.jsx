import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesChart = () => {
  const salesData = [
    { month: "Jan", sales: 45000, orders: 320 },
    { month: "Feb", sales: 52000, orders: 380 },
    { month: "Mar", sales: 48000, orders: 350 },
    { month: "Apr", sales: 61000, orders: 420 },
    { month: "May", sales: 55000, orders: 390 },
    { month: "Jun", sales: 67000, orders: 480 },
    { month: "Jul", sales: 72000, orders: 520 },
    { month: "Aug", sales: 69000, orders: 495 },
    { month: "Sep", sales: 78000, orders: 560 },
    { month: "Oct", sales: 85000, orders: 610 },
    { month: "Nov", sales: 92000, orders: 650 },
    { month: "Dec", sales: 98000, orders: 720 },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elegant">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Sales Overview
        </h3>
        <p className="text-sm text-muted-foreground">
          Monthly sales performance and order trends
        </p>
      </div>

      <div className="h-80" aria-label="Monthly Sales Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={salesData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="month"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                color: "var(--color-foreground)",
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: "var(--color-primary)", strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                stroke: "var(--color-primary)",
                strokeWidth: 2,
              }}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="var(--color-secondary)"
              strokeWidth={2}
              dot={{ fill: "var(--color-secondary)", strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-sm text-muted-foreground">Sales ($)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-secondary rounded-full"></div>
          <span className="text-sm text-muted-foreground">Orders</span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
