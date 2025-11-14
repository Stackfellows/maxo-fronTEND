import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";
import KPICard from "./components/KPICard";
import SalesChart from "./components/SalesChart";
import PopularProductsChart from "./components/PopularProductsChart";
import RecentOrdersTable from "./components/RecentOrdersTable";
import InventoryAlerts from "./components/InventoryAlerts";
import CustomerActivityFeed from "./components/CustomerActivityFeed";
import QuickActions from "./components/QuickActions";

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const kpiData = [
    {
      title: "Total Revenue",
      value: "$847,290",
      change: "+12.5%",
      changeType: "increase",
      icon: "DollarSign",
      color: "success",
    },
    {
      title: "Total Orders",
      value: "5,847",
      change: "+8.2%",
      changeType: "increase",
      icon: "ShoppingBag",
      color: "primary",
    },
    {
      title: "Active Customers",
      value: "12,459",
      change: "+15.3%",
      changeType: "increase",
      icon: "Users",
      color: "accent",
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-2.1%",
      changeType: "decrease",
      icon: "TrendingUp",
      color: "warning",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-display font-semibold text-foreground mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welcome back! Here's what's happening with your store today.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Last updated: {currentTime?.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  loading={refreshing}
                >
                  <Icon name="RefreshCw" size={16} />
                  <span className="ml-2">Refresh Data</span>
                </Button>

                <Link to="/admin-product-management">
                  <Button variant="default">
                    <Icon name="Plus" size={16} />
                    <span className="ml-2">Add Product</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                change={kpi?.change}
                changeType={kpi?.changeType}
                icon={kpi?.icon}
                color={kpi?.color}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <SalesChart />
            <PopularProductsChart />
          </div>

          {/* Recent Orders Table */}
          <div className="mb-8">
            <RecentOrdersTable />
          </div>

          {/* Bottom Section - Alerts, Activity, and Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <InventoryAlerts />
            </div>

            <div className="lg:col-span-1">
              <CustomerActivityFeed />
            </div>

            <div className="lg:col-span-1">
              <QuickActions />
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-muted-foreground">
              <div className="mb-4 md:mb-0">
                <p>
                  © {new Date()?.getFullYear()} Feathers Closet Admin Panel. All
                  rights reserved.
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <button className="hover:text-foreground transition-colors">
                  System Status
                </button>
                <button className="hover:text-foreground transition-colors">
                  API Documentation
                </button>
                <button className="hover:text-foreground transition-colors">
                  Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
