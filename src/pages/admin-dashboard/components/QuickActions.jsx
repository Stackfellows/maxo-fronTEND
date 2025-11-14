import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const QuickActions = () => {
  const quickActions = [
    {
      title: "Add New Product",
      description: "Create a new product listing",
      icon: "Plus",
      color: "bg-success/20 text-success border-success/30",
      path: "/admin-product-management",
      action: "add",
    },
    {
      title: "Process Orders",
      description: "Review and fulfill pending orders",
      icon: "Package",
      color: "bg-primary/20 text-primary border-primary/30",
      path: "/admin-orders",
      action: "process",
    },
    {
      title: "Manage Inventory",
      description: "Update stock levels and pricing",
      icon: "Archive",
      color: "bg-warning/20 text-warning border-warning/30",
      path: "/admin-inventory",
      action: "manage",
    },
    {
      title: "Customer Support",
      description: "Handle customer inquiries",
      icon: "MessageCircle",
      color: "bg-accent/20 text-accent border-accent/30",
      path: "/admin-support",
      action: "support",
    },
    {
      title: "View Analytics",
      description: "Detailed sales and performance reports",
      icon: "BarChart3",
      color: "bg-secondary/20 text-secondary border-secondary/30",
      path: "/admin-analytics",
      action: "analytics",
    },
    {
      title: "Export Data",
      description: "Download reports and customer data",
      icon: "Download",
      color: "bg-muted/40 text-foreground border-border",
      path: "#",
      action: "export",
    },
  ];

  const handleQuickAction = (action) => {
    switch (action) {
      case "export":
        // Mock export functionality
        console.log("Exporting data...");
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elegant">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Quick Actions
        </h3>
        <p className="text-sm text-muted-foreground">
          Frequently used admin functions
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions?.map((action) => (
            <div key={action?.title}>
              {action?.path === "#" ? (
                <button
                  onClick={() => handleQuickAction(action?.action)}
                  className={`w-full p-4 rounded-lg border transition-elegant hover:shadow-md group ${action?.color}`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon name={action?.icon} size={20} />
                    <h4 className="text-sm font-medium">{action?.title}</h4>
                  </div>
                  <p className="text-xs opacity-80 text-left">
                    {action?.description}
                  </p>
                </button>
              ) : (
                <Link
                  to={action?.path}
                  className={`block w-full p-4 rounded-lg border transition-elegant hover:shadow-md group ${action?.color}`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon name={action?.icon} size={20} />
                    <h4 className="text-sm font-medium">{action?.title}</h4>
                  </div>
                  <p className="text-xs opacity-80">{action?.description}</p>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Need help? Check our admin guide
            </span>
            <Button variant="link" size="sm">
              <Icon name="HelpCircle" size={16} />
              <span className="ml-2">Help Center</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
