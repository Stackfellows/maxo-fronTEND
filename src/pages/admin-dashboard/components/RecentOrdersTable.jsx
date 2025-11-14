import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const RecentOrdersTable = () => {
  const recentOrders = [
    {
      id: "ORD-2024-1156",
      customer: "Sarah Johnson",
      customerEmail: "sarah.j@email.com",
      items: 2,
      total: 289.99,
      status: "processing",
      date: "2024-11-12",
      time: "10:30 AM",
    },
    {
      id: "ORD-2024-1155",
      customer: "Emily Chen",
      customerEmail: "emily.chen@email.com",
      items: 1,
      total: 159.99,
      status: "shipped",
      date: "2024-11-12",
      time: "09:15 AM",
    },
    {
      id: "ORD-2024-1154",
      customer: "Maria Rodriguez",
      customerEmail: "maria.r@email.com",
      items: 3,
      total: 445.5,
      status: "delivered",
      date: "2024-11-11",
      time: "04:22 PM",
    },
    {
      id: "ORD-2024-1153",
      customer: "Jessica Williams",
      customerEmail: "j.williams@email.com",
      items: 1,
      total: 199.99,
      status: "pending",
      date: "2024-11-11",
      time: "02:45 PM",
    },
    {
      id: "ORD-2024-1152",
      customer: "Amanda Davis",
      customerEmail: "amanda.d@email.com",
      items: 2,
      total: 329.98,
      status: "processing",
      date: "2024-11-11",
      time: "11:30 AM",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: "bg-warning/20 text-warning border-warning/30",
        icon: "Clock",
      },
      processing: {
        color: "bg-accent/20 text-accent border-accent/30",
        icon: "Package",
      },
      shipped: {
        color: "bg-primary/20 text-primary border-primary/30",
        icon: "Truck",
      },
      delivered: {
        color: "bg-success/20 text-success border-success/30",
        icon: "CheckCircle",
      },
    };

    const config = statusConfig?.[status] || statusConfig?.pending;

    return (
      <span
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${config?.color}`}
      >
        <Icon name={config?.icon} size={12} />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elegant">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Recent Orders
            </h3>
            <p className="text-sm text-muted-foreground">
              Latest customer orders and their status
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="ExternalLink" size={16} />
            <span className="ml-2">View All</span>
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Order ID
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Items
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="text-right py-3 px-6 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentOrders?.map((order) => (
              <tr
                key={order?.id}
                className="hover:bg-muted/20 transition-colors"
              >
                <td className="py-4 px-6">
                  <span className="text-sm font-medium text-foreground">
                    {order?.id}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {order?.customer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order?.customerEmail}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-foreground">
                    {order?.items} items
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm font-semibold text-foreground">
                    ${order?.total}
                  </span>
                </td>
                <td className="py-4 px-6">{getStatusBadge(order?.status)}</td>
                <td className="py-4 px-6">
                  <div>
                    <p className="text-sm text-foreground">{order?.date}</p>
                    <p className="text-xs text-muted-foreground">
                      {order?.time}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="icon">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="Edit" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
