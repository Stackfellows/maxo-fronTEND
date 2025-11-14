import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const ProductFilters = ({
  onFilterChange,
  onSearch,
  totalProducts,
  filteredCount,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    priceRange: "",
    stockLevel: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All Categories",
    "Handbags",
    "Shoulder Bags",
    "Clutches",
    "Tote Bags",
    "Crossbody Bags",
    "Backpacks",
    "Dresses",
    "Tops",
    "Bottoms",
    "Outerwear",
    "Accessories",
  ];

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "out-of-stock", label: "Out of Stock" },
  ];

  const priceRanges = [
    { value: "", label: "All Prices" },
    { value: "0-50", label: "Under $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200-500", label: "$200 - $500" },
    { value: "500+", label: "Over $500" },
  ];

  const stockLevels = [
    { value: "", label: "All Stock Levels" },
    { value: "in-stock", label: "In Stock" },
    { value: "low-stock", label: "Low Stock" },
    { value: "out-of-stock", label: "Out of Stock" },
  ];

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: "",
      status: "",
      priceRange: "",
      stockLevel: "",
    };
    setFilters(clearedFilters);
    setSearchTerm("");
    onFilterChange(clearedFilters);
    onSearch("");
  };

  const hasActiveFilters =
    Object.values(filters)?.some((filter) => filter !== "") ||
    searchTerm !== "";

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-4">
      {/* Search and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="Search products by name, SKU, or description..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-sm text-muted-foreground">
            Showing {filteredCount} of {totalProducts} products
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            iconName={showFilters ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Filters
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      {showFilters && (
        <div className="border-t border-border pt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category
              </label>
              <select
                value={filters?.category}
                onChange={(e) =>
                  handleFilterChange("category", e?.target?.value)
                }
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                {categories?.map((category) => (
                  <option
                    key={category}
                    value={category === "All Categories" ? "" : category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status
              </label>
              <select
                value={filters?.status}
                onChange={(e) => handleFilterChange("status", e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                {statusOptions?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Price Range
              </label>
              <select
                value={filters?.priceRange}
                onChange={(e) =>
                  handleFilterChange("priceRange", e?.target?.value)
                }
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                {priceRanges?.map((range) => (
                  <option key={range?.value} value={range?.value}>
                    {range?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Level Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Stock Level
              </label>
              <select
                value={filters?.stockLevel}
                onChange={(e) =>
                  handleFilterChange("stockLevel", e?.target?.value)
                }
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                {stockLevels?.map((level) => (
                  <option key={level?.value} value={level?.value}>
                    {level?.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                    Search: "{searchTerm}"
                  </span>
                )}
                {Object.entries(filters)?.map(([key, value]) => {
                  if (!value) return null;
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary/10 text-secondary"
                    >
                      {key}: {value}
                    </span>
                  );
                })}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                iconName="X"
                iconPosition="left"
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
