import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const EmptyCart = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Empty Cart Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <Icon
            name="ShoppingCart"
            size={48}
            className="text-muted-foreground"
          />
        </div>

        {/* Empty State Content */}
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Your cart is empty
        </h2>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          Looks like you haven't added anything to your cart yet. Start shopping
          to fill it up with beautiful fashion pieces!
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link to="/shop-page">
            <Button variant="default" size="lg" fullWidth>
              <Icon name="ShoppingBag" size={16} />
              <span className="ml-2">Start Shopping</span>
            </Button>
          </Link>

          <Link to="/homepage">
            <Button variant="outline" size="lg" fullWidth>
              <Icon name="Home" size={16} />
              <span className="ml-2">Back to Home</span>
            </Button>
          </Link>
        </div>

        {/* Popular Categories */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-4">
            Popular Categories
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/shop-page?category=bags">
              <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-elegant text-center">
                <Icon
                  name="ShoppingBag"
                  size={20}
                  className="mx-auto mb-2 text-muted-foreground"
                />
                <span className="text-sm text-foreground">Bags</span>
              </div>
            </Link>
            <Link to="/shop-page?category=clothing">
              <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-elegant text-center">
                <Icon
                  name="Shirt"
                  size={20}
                  className="mx-auto mb-2 text-muted-foreground"
                />
                <span className="text-sm text-foreground">Clothing</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
