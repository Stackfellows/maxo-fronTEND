import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const ProductTable = ({
  products,
  onEdit,
  onDelete,
  onStatusChange,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
}) => {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedProducts = [...products]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (typeof aValue === "string") {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-success text-success-foreground", label: "Active" },
      inactive: { color: "bg-muted text-muted-foreground", label: "Inactive" },
      "out-of-stock": {
        color: "bg-error text-error-foreground",
        label: "Out of Stock",
      },
    };

    const config = statusConfig?.[status] || statusConfig?.inactive;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}
      >
        {config?.label}
      </span>
    );
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return "ArrowUpDown";
    return sortDirection === "asc" ? "ArrowUp" : "ArrowDown";
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedProducts?.length === products?.length &&
                    products?.length > 0
                  }
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                Image
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Product Name</span>
                  <Icon name={getSortIcon("name")} size={14} />
                </button>
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort("category")}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Category</span>
                  <Icon name={getSortIcon("category")} size={14} />
                </button>
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort("price")}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Price</span>
                  <Icon name={getSortIcon("price")} size={14} />
                </button>
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort("stock")}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Stock</span>
                  <Icon name={getSortIcon("stock")} size={14} />
                </button>
              </th>
              <th className="p-4 text-left">
                <button
                  onClick={() => handleSort("status")}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon("status")} size={14} />
                </button>
              </th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts?.map((product) => (
              <tr
                key={product?.id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts?.includes(product?.id)}
                    onChange={(e) =>
                      onSelectProduct(product?.id, e?.target?.checked)
                    }
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={product?.image}
                      alt={product?.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">
                      {product?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      SKU: {product?.sku}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">
                    {product?.category}
                  </span>
                </td>
                <td className="p-4">
                  <span className="font-medium text-foreground">
                    ${product?.price}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm ${
                        product?.stock <= product?.lowStockThreshold
                          ? "text-error"
                          : "text-foreground"
                      }`}
                    >
                      {product?.stock}
                    </span>
                    {product?.stock <= product?.lowStockThreshold && (
                      <Icon
                        name="AlertTriangle"
                        size={14}
                        className="text-warning"
                      />
                    )}
                  </div>
                </td>
                <td className="p-4">{getStatusBadge(product?.status)}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(product)}
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <Icon name="Edit2" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        onStatusChange(
                          product?.id,
                          product?.status === "active" ? "inactive" : "active"
                        )
                      }
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <Icon
                        name={product?.status === "active" ? "EyeOff" : "Eye"}
                        size={14}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(product?.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-error"
                    >
                      <Icon name="Trash2" size={14} />
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

export default ProductTable;
