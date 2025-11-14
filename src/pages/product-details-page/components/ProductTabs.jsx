import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description", icon: "FileText" },
    { id: "reviews", label: "Reviews", icon: "Star" },
    { id: "care", label: "Care Guide", icon: "Heart" },
    { id: "shipping", label: "Shipping", icon: "Truck" },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={
          index < Math.floor(rating)
            ? "text-accent fill-current"
            : "text-muted-foreground"
        }
      />
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Product Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {product?.description}
              </p>
            </div>
            <div>
              <h4 className="text-base font-medium text-foreground mb-2">
                Key Features
              </h4>
              <ul className="space-y-2">
                {product?.features?.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon
                      name="Check"
                      size={16}
                      className="text-success mt-0.5 flex-shrink-0"
                    />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-base font-medium text-foreground mb-2">
                Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product?.specifications)?.map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-2 border-b border-border"
                    >
                      <span className="text-muted-foreground capitalize">
                        {key?.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="text-foreground font-medium">
                        {value}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-foreground">
                Customer Reviews
              </h3>
              <button className="text-primary hover:underline text-sm font-medium">
                Write a Review
              </button>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">
                    {product?.rating}
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    {renderStars(product?.rating)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Based on {product?.reviewCount} reviews
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1]?.map((stars) => {
                    const count = Math.floor(Math.random() * 50) + 10;
                    const percentage = (count / product?.reviewCount) * 100;
                    return (
                      <div key={stars} className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground w-8">
                          {stars}★
                        </span>
                        <div className="flex-1 bg-background rounded-full h-2">
                          <div
                            className="bg-accent h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-8">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {product?.reviews?.map((review) => (
                <div
                  key={review?.id}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-foreground">
                        {review?.author?.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-foreground">
                          {review?.author}
                        </span>
                        <div className="flex items-center space-x-1">
                          {renderStars(review?.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {review?.date}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{review?.comment}</p>
                      {review?.verified && (
                        <div className="flex items-center space-x-1 mt-2">
                          <Icon
                            name="CheckCircle"
                            size={14}
                            className="text-success"
                          />
                          <span className="text-xs text-success">
                            Verified Purchase
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "care":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Care Instructions
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-base font-medium text-foreground mb-2 flex items-center space-x-2">
                  <Icon name="Droplets" size={18} className="text-primary" />
                  <span>Cleaning</span>
                </h4>
                <ul className="space-y-1 ml-6">
                  <li className="text-muted-foreground">
                    • Spot clean with mild soap and water
                  </li>
                  <li className="text-muted-foreground">
                    • Use a soft cloth or brush for gentle cleaning
                  </li>
                  <li className="text-muted-foreground">
                    • Avoid harsh chemicals or bleach
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-medium text-foreground mb-2 flex items-center space-x-2">
                  <Icon name="Sun" size={18} className="text-primary" />
                  <span>Drying</span>
                </h4>
                <ul className="space-y-1 ml-6">
                  <li className="text-muted-foreground">
                    • Air dry away from direct sunlight
                  </li>
                  <li className="text-muted-foreground">
                    • Stuff with tissue paper to maintain shape
                  </li>
                  <li className="text-muted-foreground">
                    • Allow to dry completely before storing
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-medium text-foreground mb-2 flex items-center space-x-2">
                  <Icon name="Archive" size={18} className="text-primary" />
                  <span>Storage</span>
                </h4>
                <ul className="space-y-1 ml-6">
                  <li className="text-muted-foreground">
                    • Store in dust bag when not in use
                  </li>
                  <li className="text-muted-foreground">
                    • Keep in cool, dry place
                  </li>
                  <li className="text-muted-foreground">
                    • Avoid storing in plastic bags
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "shipping":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Shipping Information
            </h3>

            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">
                  Standard Shipping
                </h4>
                <p className="text-muted-foreground mb-2">5-7 business days</p>
                <p className="text-sm text-muted-foreground">
                  Free on orders over $100, otherwise $9.99
                </p>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">
                  Express Shipping
                </h4>
                <p className="text-muted-foreground mb-2">2-3 business days</p>
                <p className="text-sm text-muted-foreground">$19.99</p>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">
                  Overnight Shipping
                </h4>
                <p className="text-muted-foreground mb-2">Next business day</p>
                <p className="text-sm text-muted-foreground">$39.99</p>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">
                  Return Policy
                </h4>
                <p className="text-sm text-muted-foreground">
                  We offer free returns within 30 days of purchase. Items must
                  be in original condition with tags attached.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                activeTab === tab?.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">{renderTabContent()}</div>
    </div>
  );
};

export default ProductTabs;
