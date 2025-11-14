import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  isOpen,
  onClose,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: false,
    size: false,
    color: false,
    rating: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev?.[section],
    }));
  };

  const priceRanges = [
    { id: "under-50", label: "Under $50", min: 0, max: 50 },
    { id: "50-100", label: "$50 - $100", min: 50, max: 100 },
    { id: "100-200", label: "$100 - $200", min: 100, max: 200 },
    { id: "200-500", label: "$200 - $500", min: 200, max: 500 },
    { id: "over-500", label: "Over $500", min: 500, max: 9999 },
  ];

  const brands = [
    "Coach",
    "Michael Kors",
    "Kate Spade",
    "Tory Burch",
    "Marc Jacobs",
    "Gucci",
    "Prada",
    "Louis Vuitton",
    "Chanel",
    "Hermès",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Brown", value: "#8B4513" },
    { name: "Tan", value: "#D2B48C" },
    { name: "Red", value: "#DC2626" },
    { name: "Pink", value: "#EC4899" },
    { name: "Blue", value: "#2563EB" },
    { name: "Green", value: "#16A34A" },
  ];

  const categories = [
    { id: "all", name: "All Products", count: 156 },
    { id: "handbags", name: "Handbags", count: 89 },
    { id: "shoulder-bags", name: "Shoulder Bags", count: 34 },
    { id: "tote-bags", name: "Tote Bags", count: 28 },
    { id: "crossbody", name: "Crossbody Bags", count: 45 },
    { id: "clutches", name: "Clutches", count: 23 },
    { id: "backpacks", name: "Backpacks", count: 18 },
    { id: "wallets", name: "Wallets & Accessories", count: 31 },
  ];

  const ratings = [5, 4, 3, 2, 1];

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-border pb-6 mb-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left mb-4 group"
      >
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <Icon
          name={isExpanded ? "ChevronUp" : "ChevronDown"}
          size={16}
          className="text-muted-foreground group-hover:text-primary transition-colors"
        />
      </button>
      {isExpanded && (
        <div className="space-y-3 animate-fade-in">{children}</div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Filter Sidebar */}
      <div
        className={`
        fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 lg:w-full 
        bg-card border-r lg:border-r-0 border-border z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        overflow-y-auto lg:overflow-visible
      `}
      >
        <div className="p-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </div>

          {/* Category Filter */}
          <FilterSection
            title="Category"
            isExpanded={expandedSections?.category}
            onToggle={() => toggleSection("category")}
          >
            <div className="space-y-2">
              {categories?.map((category) => (
                <label
                  key={category?.id}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={filters?.categories?.includes(category?.id)}
                      onChange={(e) => {
                        const newCategories = e?.target?.checked
                          ? [...(filters?.categories || []), category?.id]
                          : (filters?.categories || [])?.filter(
                              (c) => c !== category?.id
                            );
                        onFilterChange("categories", newCategories);
                      }}
                      size="sm"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {category?.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {category?.count}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Filter */}
          <FilterSection
            title="Price Range"
            isExpanded={expandedSections?.price}
            onToggle={() => toggleSection("price")}
          >
            <div className="space-y-2">
              {priceRanges?.map((range) => (
                <label
                  key={range?.id}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <Checkbox
                    checked={filters?.priceRanges?.includes(range?.id)}
                    onChange={(e) => {
                      const newRanges = e?.target?.checked
                        ? [...(filters?.priceRanges || []), range?.id]
                        : (filters?.priceRanges || [])?.filter(
                            (r) => r !== range?.id
                          );
                      onFilterChange("priceRanges", newRanges);
                    }}
                    size="sm"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {range?.label}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Brand Filter */}
          <FilterSection
            title="Brand"
            isExpanded={expandedSections?.brand}
            onToggle={() => toggleSection("brand")}
          >
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands?.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <Checkbox
                    checked={filters?.brands?.includes(brand)}
                    onChange={(e) => {
                      const newBrands = e?.target?.checked
                        ? [...(filters?.brands || []), brand]
                        : (filters?.brands || [])?.filter((b) => b !== brand);
                      onFilterChange("brands", newBrands);
                    }}
                    size="sm"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Size Filter */}
          <FilterSection
            title="Size"
            isExpanded={expandedSections?.size}
            onToggle={() => toggleSection("size")}
          >
            <div className="grid grid-cols-3 gap-2">
              {sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    const newSizes = filters?.sizes?.includes(size)
                      ? (filters?.sizes || [])?.filter((s) => s !== size)
                      : [...(filters?.sizes || []), size];
                    onFilterChange("sizes", newSizes);
                  }}
                  className={`
                    px-3 py-2 text-sm border rounded-lg transition-colors
                    ${
                      filters?.sizes?.includes(size)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Color Filter */}
          <FilterSection
            title="Color"
            isExpanded={expandedSections?.color}
            onToggle={() => toggleSection("color")}
          >
            <div className="grid grid-cols-4 gap-3">
              {colors?.map((color) => (
                <button
                  key={color?.name}
                  onClick={() => {
                    const newColors = filters?.colors?.includes(color?.name)
                      ? (filters?.colors || [])?.filter(
                          (c) => c !== color?.name
                        )
                      : [...(filters?.colors || []), color?.name];
                    onFilterChange("colors", newColors);
                  }}
                  className={`
                    w-10 h-10 rounded-full border-2 transition-all relative group
                    ${
                      filters?.colors?.includes(color?.name)
                        ? "border-primary scale-110"
                        : "border-border hover:border-primary hover:scale-105"
                    }
                  `}
                  style={{ backgroundColor: color?.value }}
                  title={color?.name}
                >
                  {filters?.colors?.includes(color?.name) && (
                    <Icon
                      name="Check"
                      size={16}
                      className={`absolute inset-0 m-auto ${
                        color?.value === "#FFFFFF"
                          ? "text-gray-800"
                          : "text-white"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Rating Filter */}
          <FilterSection
            title="Customer Rating"
            isExpanded={expandedSections?.rating}
            onToggle={() => toggleSection("rating")}
          >
            <div className="space-y-2">
              {ratings?.map((rating) => (
                <label
                  key={rating}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <Checkbox
                    checked={filters?.ratings?.includes(rating)}
                    onChange={(e) => {
                      const newRatings = e?.target?.checked
                        ? [...(filters?.ratings || []), rating]
                        : (filters?.ratings || [])?.filter((r) => r !== rating);
                      onFilterChange("ratings", newRatings);
                    }}
                    size="sm"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={`${
                            i < rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      & Up
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Mobile Apply Button */}
          <div className="lg:hidden pt-6 border-t border-border">
            <Button onClick={onClose} className="w-full">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
