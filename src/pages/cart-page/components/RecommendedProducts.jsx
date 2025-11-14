import React from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const RecommendedProducts = ({ products, onAddToCart }) => {
  if (!products || products?.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elegant">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          You might also like
        </h2>
        <Link to="/shop-page">
          <Button variant="ghost" size="sm">
            <span>View All</span>
            <Icon name="ArrowRight" size={14} className="ml-1" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <div key={product?.id} className="group">
            <div className="relative bg-muted rounded-lg overflow-hidden mb-3">
              <Link to={`/product-details-page?id=${product?.id}`}>
                <div className="aspect-square">
                  <Image
                    src={product?.image}
                    alt={product?.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-elegant"
                  />
                </div>
              </Link>

              {/* Quick Add Button */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-elegant flex items-center justify-center">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onAddToCart(product)}
                  className="opacity-0 group-hover:opacity-100 transition-elegant transform translate-y-2 group-hover:translate-y-0"
                >
                  <Icon name="Plus" size={14} />
                  <span className="ml-1">Add to Cart</span>
                </Button>
              </div>

              {/* Sale Badge */}
              {product?.salePrice && (
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error text-error-foreground">
                    Sale
                  </span>
                </div>
              )}

              {/* Wishlist Button */}
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-background/80 backdrop-blur-sm hover:bg-background opacity-0 group-hover:opacity-100 transition-elegant"
                >
                  <Icon name="Heart" size={14} />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-1">
              <Link to={`/product-details-page?id=${product?.id}`}>
                <h3 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-elegant">
                  {product?.name}
                </h3>
              </Link>

              <p className="text-xs text-muted-foreground">{product?.brand}</p>

              <div className="flex items-center gap-2">
                {product?.salePrice ? (
                  <>
                    <span className="text-sm font-semibold text-error">
                      ${product?.salePrice?.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      ${product?.price?.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-foreground">
                    ${product?.price?.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={
                        i < Math.floor(product?.rating)
                          ? "text-accent fill-current"
                          : "text-muted-foreground"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product?.reviewCount})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
