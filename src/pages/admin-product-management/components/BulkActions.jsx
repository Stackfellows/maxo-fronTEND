import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const BulkActions = ({
  selectedProducts,
  onBulkStatusChange,
  onBulkDelete,
  onBulkPriceUpdate,
}) => {
  const [showBulkMenu, setShowBulkMenu] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [priceUpdateData, setPriceUpdateData] = useState({
    type: "percentage",
    value: "",
    operation: "increase",
  });

  const handleBulkAction = (action) => {
    setShowBulkMenu(false);

    switch (action) {
      case "activate":
        onBulkStatusChange(selectedProducts, "active");
        break;
      case "deactivate":
        onBulkStatusChange(selectedProducts, "inactive");
        break;
      case "out-of-stock":
        onBulkStatusChange(selectedProducts, "out-of-stock");
        break;
      case "delete":
        if (
          window.confirm(
            `Are you sure you want to delete ${selectedProducts?.length} products? This action cannot be undone.`
          )
        ) {
          onBulkDelete(selectedProducts);
        }
        break;
      case "price-update":
        setShowPriceModal(true);
        break;
      default:
        break;
    }
  };

  const handlePriceUpdate = () => {
    if (!priceUpdateData?.value) return;

    onBulkPriceUpdate(selectedProducts, priceUpdateData);
    setShowPriceModal(false);
    setPriceUpdateData({
      type: "percentage",
      value: "",
      operation: "increase",
    });
  };

  if (selectedProducts?.length === 0) return null;

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="CheckSquare" size={20} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            {selectedProducts?.length} product
            {selectedProducts?.length !== 1 ? "s" : ""} selected
          </span>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowBulkMenu(!showBulkMenu)}
            iconName="ChevronDown"
            iconPosition="right"
          >
            Bulk Actions
          </Button>

          {showBulkMenu && (
            <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-lg shadow-elegant z-10">
              <div className="py-2">
                <button
                  onClick={() => handleBulkAction("activate")}
                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center space-x-2"
                >
                  <Icon name="Eye" size={16} className="text-success" />
                  <span>Activate Products</span>
                </button>

                <button
                  onClick={() => handleBulkAction("deactivate")}
                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center space-x-2"
                >
                  <Icon
                    name="EyeOff"
                    size={16}
                    className="text-muted-foreground"
                  />
                  <span>Deactivate Products</span>
                </button>

                <button
                  onClick={() => handleBulkAction("out-of-stock")}
                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center space-x-2"
                >
                  <Icon
                    name="AlertTriangle"
                    size={16}
                    className="text-warning"
                  />
                  <span>Mark Out of Stock</span>
                </button>

                <div className="border-t border-border my-1"></div>

                <button
                  onClick={() => handleBulkAction("price-update")}
                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center space-x-2"
                >
                  <Icon name="DollarSign" size={16} className="text-accent" />
                  <span>Update Prices</span>
                </button>

                <div className="border-t border-border my-1"></div>

                <button
                  onClick={() => handleBulkAction("delete")}
                  className="w-full px-4 py-2 text-left text-sm text-error hover:bg-muted transition-colors flex items-center space-x-2"
                >
                  <Icon name="Trash2" size={16} className="text-error" />
                  <span>Delete Products</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Price Update Modal */}
      {showPriceModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border shadow-elegant max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                Bulk Price Update
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPriceModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Update Type
                </label>
                <select
                  value={priceUpdateData?.type}
                  onChange={(e) =>
                    setPriceUpdateData((prev) => ({
                      ...prev,
                      type: e?.target?.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Operation
                </label>
                <select
                  value={priceUpdateData?.operation}
                  onChange={(e) =>
                    setPriceUpdateData((prev) => ({
                      ...prev,
                      operation: e?.target?.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="increase">Increase</option>
                  <option value="decrease">Decrease</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Value {priceUpdateData?.type === "percentage" ? "(%)" : "($)"}
                </label>
                <input
                  type="number"
                  step={priceUpdateData?.type === "percentage" ? "1" : "0.01"}
                  value={priceUpdateData?.value}
                  onChange={(e) =>
                    setPriceUpdateData((prev) => ({
                      ...prev,
                      value: e?.target?.value,
                    }))
                  }
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder={
                    priceUpdateData?.type === "percentage" ? "10" : "5.00"
                  }
                />
              </div>

              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  This will {priceUpdateData?.operation} prices by{" "}
                  {priceUpdateData?.value || "0"}
                  {priceUpdateData?.type === "percentage" ? "%" : "$"} for{" "}
                  {selectedProducts?.length} selected product
                  {selectedProducts?.length !== 1 ? "s" : ""}.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 p-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setShowPriceModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePriceUpdate}
                disabled={!priceUpdateData?.value}
              >
                Update Prices
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;
