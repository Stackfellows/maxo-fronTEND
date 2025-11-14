import React from "react";
import Icon from "../../../components/AppIcon";

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: "all", name: "All Products", icon: "Grid3x3", count: 156 },
    { id: "handbags", name: "Handbags", icon: "ShoppingBag", count: 89 },
    { id: "shoulder-bags", name: "Shoulder Bags", icon: "Package", count: 34 },
    { id: "tote-bags", name: "Tote Bags", icon: "Briefcase", count: 28 },
    { id: "crossbody", name: "Crossbody", icon: "Zap", count: 45 },
    { id: "clutches", name: "Clutches", icon: "Wallet", count: 23 },
    { id: "backpacks", name: "Backpacks", icon: "Backpack", count: 18 },
    { id: "accessories", name: "Accessories", icon: "Star", count: 31 },
  ];

  return (
    <div className="border-b border-border">
      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 min-w-max px-4 lg:px-0">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`
                flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap
                border-b-2 transition-all duration-200 hover:text-primary
                ${
                  activeCategory === category?.id
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:border-primary/50"
                }
              `}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
              <span
                className={`
                text-xs px-2 py-0.5 rounded-full
                ${
                  activeCategory === category?.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }
              `}
              >
                {category?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
