import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";

const InventoryAlerts = () => {
  const lowStockItems = [
    {
      id: 1,
      name: "Premium Leather Tote",
      sku: "LT-001",
      currentStock: 3,
      minStock: 10,
      image: "https://images.unsplash.com/photo-1657297790286-063dbf88e651",
      imageAlt:
        "Brown leather tote bag with gold hardware displayed on white surface",
      category: "Bags",
      price: 299.99,
    },
    {
      id: 2,
      name: "Silk Evening Dress",
      sku: "ED-045",
      currentStock: 2,
      minStock: 8,
      image: "https://images.unsplash.com/photo-1534237605881-8aebdc64f8b2",
      imageAlt:
        "Elegant black silk evening dress hanging on boutique display rack",
      category: "Dresses",
      price: 189.99,
    },
    {
      id: 3,
      name: "Designer Crossbody",
      sku: "CB-023",
      currentStock: 1,
      minStock: 15,
      image: "https://images.unsplash.com/photo-1726593369212-d8b248df6b01",
      imageAlt:
        "Compact designer crossbody bag in navy blue with gold chain strap",
      category: "Bags",
      price: 149.99,
    },
    {
      id: 4,
      name: "Cashmere Scarf",
      sku: "CS-012",
      currentStock: 4,
      minStock: 12,
      image: "https://images.unsplash.com/photo-1620367150611-f5b30c0c5330",
      imageAlt: "Soft beige cashmere scarf folded neatly on wooden surface",
      category: "Accessories",
      price: 79.99,
    },
  ];

  const getStockLevel = (current, min) => {
    const percentage = (current / min) * 100;
    if (percentage <= 25)
      return { level: "critical", color: "text-error", bg: "bg-error/20" };
    if (percentage <= 50)
      return { level: "low", color: "text-warning", bg: "bg-warning/20" };
    return { level: "normal", color: "text-success", bg: "bg-success/20" };
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elegant">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/20 text-warning rounded-lg">
              <Icon name="AlertTriangle" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Inventory Alerts
              </h3>
              <p className="text-sm text-muted-foreground">
                Items running low on stock
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="Package" size={16} />
            <span className="ml-2">Manage Inventory</span>
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {lowStockItems?.map((item) => {
            const stockInfo = getStockLevel(item?.currentStock, item?.minStock);

            return (
              <div
                key={item?.id}
                className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg border border-border/50"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={item?.image}
                    alt={item?.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">
                        {item?.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        SKU: {item?.sku} • {item?.category}
                      </p>
                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-muted-foreground">
                          Stock:{" "}
                          <span className={`font-medium ${stockInfo?.color}`}>
                            {item?.currentStock}
                          </span>{" "}
                          / {item?.minStock}
                        </span>
                        <span className="text-xs font-medium text-foreground">
                          ${item?.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${stockInfo?.bg} ${stockInfo?.color}`}
                      >
                        {stockInfo?.level === "critical"
                          ? "Critical"
                          : "Low Stock"}
                      </span>
                      <Button variant="ghost" size="icon">
                        <Icon name="Plus" size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          stockInfo?.level === "critical"
                            ? "bg-error"
                            : "bg-warning"
                        }`}
                        style={{
                          width: `${Math.min(
                            (item?.currentStock / item?.minStock) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {lowStockItems?.length} items need restocking
            </span>
            <Button variant="link" size="sm">
              View all inventory →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryAlerts;
