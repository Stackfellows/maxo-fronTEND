import React from "react";
import Icon from "../../../components/AppIcon";

const CustomerActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "new_registration",
      customer: "Emma Thompson",
      email: "emma.t@email.com",
      action: "New customer registration",
      timestamp: "2 minutes ago",
      icon: "UserPlus",
      color: "text-success bg-success/20",
    },
    {
      id: 2,
      type: "purchase",
      customer: "Sarah Johnson",
      email: "sarah.j@email.com",
      action: "Purchased 2 items worth $289.99",
      timestamp: "15 minutes ago",
      icon: "ShoppingBag",
      color: "text-primary bg-primary/20",
    },
    {
      id: 3,
      type: "review",
      customer: "Maria Rodriguez",
      email: "maria.r@email.com",
      action: "Left a 5-star review for Premium Leather Tote",
      timestamp: "32 minutes ago",
      icon: "Star",
      color: "text-accent bg-accent/20",
    },
    {
      id: 4,
      type: "wishlist",
      customer: "Jessica Williams",
      email: "j.williams@email.com",
      action: "Added 3 items to wishlist",
      timestamp: "1 hour ago",
      icon: "Heart",
      color: "text-secondary bg-secondary/20",
    },
    {
      id: 5,
      type: "return",
      customer: "Amanda Davis",
      email: "amanda.d@email.com",
      action: "Initiated return for Silk Evening Dress",
      timestamp: "2 hours ago",
      icon: "RotateCcw",
      color: "text-warning bg-warning/20",
    },
    {
      id: 6,
      type: "purchase",
      customer: "Lisa Chen",
      email: "lisa.c@email.com",
      action: "Purchased Designer Clutch for $149.99",
      timestamp: "3 hours ago",
      icon: "ShoppingBag",
      color: "text-primary bg-primary/20",
    },
    {
      id: 7,
      type: "new_registration",
      customer: "Rachel Green",
      email: "rachel.g@email.com",
      action: "New customer registration",
      timestamp: "4 hours ago",
      icon: "UserPlus",
      color: "text-success bg-success/20",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-elegant">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Customer Activity
            </h3>
            <p className="text-sm text-muted-foreground">
              Recent customer interactions and events
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities?.map((activity, index) => (
            <div
              key={activity?.id}
              className="flex items-start space-x-4 group"
            >
              <div
                className={`p-2 rounded-lg ${activity?.color} flex-shrink-0`}
              >
                <Icon name={activity?.icon} size={16} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {activity?.customer}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      {activity?.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity?.email}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-4">
                    {activity?.timestamp}
                  </span>
                </div>
              </div>

              {index < activities?.length - 1 && (
                <div className="absolute left-8 mt-12 w-px h-4 bg-border"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Showing recent 7 activities
            </span>
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              View all activity →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerActivityFeed;
