import React from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const RelatedProducts = ({ products }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={
          index < Math.floor(rating)
            ? "text-accent fill-current"
            : "text-muted-foreground"
        }
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-medium text-foreground">
          You May Also Like
        </h2>
        <Link
          to="/shop-page"
          className="text-primary hover:underline text-sm font-medium"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div key={product?.id} className="group">
            <div className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-elegant">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-surface">
                <Image
                  src={product?.image}
                  alt={product?.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-300">
                    <Icon
                      name="Heart"
                      size={16}
                      className="text-muted-foreground hover:text-error"
                    />
                  </button>
                  <button className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-300">
                    <Icon
                      name="Eye"
                      size={16}
                      className="text-muted-foreground"
                    />
                  </button>
                </div>

                {/* Sale Badge */}
                {product?.salePrice && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-error text-error-foreground px-2 py-1 rounded text-xs font-medium">
                      SALE
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                    {product?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {product?.category}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(product?.rating)}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product?.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-foreground">
                    ${product?.salePrice || product?.price}
                  </span>
                  {product?.salePrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product?.price}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <Button
                  size="sm"
                  className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={() => {
                    // Add to cart functionality
                    console.log("Added to cart:", product?.id);
                  }}
                >
                  <Icon name="ShoppingCart" size={16} />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
