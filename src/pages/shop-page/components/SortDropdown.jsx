import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: "newest", label: "Newest Arrivals", icon: "Clock" },
    { value: "price-low", label: "Price: Low to High", icon: "TrendingUp" },
    { value: "price-high", label: "Price: High to Low", icon: "TrendingDown" },
    { value: "rating", label: "Customer Rating", icon: "Star" },
    { value: "popularity", label: "Most Popular", icon: "Heart" },
    { value: "name-az", label: "Name: A to Z", icon: "ArrowUp" },
    { value: "name-za", label: "Name: Z to A", icon: "ArrowDown" },
  ];

  const currentOption =
    sortOptions?.find((option) => option?.value === currentSort) ||
    sortOptions?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef?.current &&
        !dropdownRef?.current?.contains(event?.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="justify-between min-w-[200px]"
        iconName={isOpen ? "ChevronUp" : "ChevronDown"}
        iconPosition="right"
      >
        <div className="flex items-center gap-2">
          <Icon name={currentOption?.icon} size={16} />
          <span className="hidden sm:inline">Sort by:</span>
          <span className="font-medium">{currentOption?.label}</span>
        </div>
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elegant z-50 animate-fade-in">
          <div className="py-2">
            {sortOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => handleSortSelect(option?.value)}
                className={`
                  w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-muted transition-colors
                  ${
                    currentSort === option?.value
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <Icon name={option?.icon} size={16} />
                <span>{option?.label}</span>
                {currentSort === option?.value && (
                  <Icon
                    name="Check"
                    size={16}
                    className="ml-auto text-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
