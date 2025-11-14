import React from "react";
import Icon from "../../../components/AppIcon";

const KPICard = ({
  title,
  value,
  change,
  changeType,
  icon,
  color = "primary",
}) => {
  const getColorClasses = () => {
    switch (color) {
      case "success":
        return "bg-success/10 text-success border-success/20";
      case "warning":
        return "bg-warning/10 text-warning border-warning/20";
      case "error":
        return "bg-error/10 text-error border-error/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getChangeColor = () => {
    return changeType === "increase" ? "text-success" : "text-error";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elegant transition-elegant hover:shadow-floating">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses()}`}>
          <Icon name={icon} size={24} />
        </div>
        <div
          className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}
        >
          <Icon
            name={changeType === "increase" ? "TrendingUp" : "TrendingDown"}
            size={16}
          />
          <span>{change}</span>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default KPICard;
