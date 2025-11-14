import React from "react";
import Icon from "../../../components/AppIcon";

const StatsCards = ({ products }) => {
  const totalProducts = products?.length;
  const activeProducts = products?.filter(
    (p) => p?.status === "active"
  )?.length;
  const lowStockProducts = products?.filter(
    (p) => p?.stock <= p?.lowStockThreshold
  )?.length;
  const outOfStockProducts = products?.filter(
    (p) => p?.status === "out-of-stock" || p?.stock === 0
  )?.length;

  const totalValue = products?.reduce((sum, product) => {
    return sum + product?.price * product?.stock;
  }, 0);

  const stats = [
    {
      title: "Total Products",
      value: totalProducts?.toLocaleString(),
      icon: "Package",
      color: "text-primary",
      bgColor: "bg-primary/10",
      change: null,
    },
    {
      title: "Active Products",
      value: activeProducts?.toLocaleString(),
      icon: "Eye",
      color: "text-success",
      bgColor: "bg-success/10",
      change:
        totalProducts > 0
          ? `${Math.round((activeProducts / totalProducts) * 100)}%`
          : "0%",
    },
    {
      title: "Low Stock Alerts",
      value: lowStockProducts?.toLocaleString(),
      icon: "AlertTriangle",
      color: "text-warning",
      bgColor: "bg-warning/10",
      change: lowStockProducts > 0 ? "Needs attention" : "All good",
    },
    {
      title: "Out of Stock",
      value: outOfStockProducts?.toLocaleString(),
      icon: "XCircle",
      color: "text-error",
      bgColor: "bg-error/10",
      change: outOfStockProducts > 0 ? "Action required" : "All stocked",
    },
    {
      title: "Inventory Value",
      value: `$${totalValue?.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: "DollarSign",
      color: "text-accent",
      bgColor: "bg-accent/10",
      change: "Total stock value",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats?.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-lg border border-border p-6 hover:shadow-elegant transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat?.title}
              </p>
              <p className="text-2xl font-bold text-foreground mb-1">
                {stat?.value}
              </p>
              {stat?.change && (
                <p className="text-xs text-muted-foreground">{stat?.change}</p>
              )}
            </div>
            <div
              className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}
            >
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
