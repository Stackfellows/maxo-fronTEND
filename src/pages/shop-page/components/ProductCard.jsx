import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const ProductCard = ({
  product,
  viewMode = "grid",
  onQuickView,
  onAddToWishlist,
  onAddToCart,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageHover = () => {
    if (product?.images && product?.images?.length > 1) {
      setCurrentImageIndex(1);
    }
    setIsHovered(true);
  };

  const handleImageLeave = () => {
    setCurrentImageIndex(0);
    setIsHovered(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={`${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    })?.format(price);
  };

  if (viewMode === "list") {
    return (
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elegant transition-all duration-300 group">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="relative w-full md:w-48 h-48 flex-shrink-0">
            <Link
              to="/product-details-page"
              className="block relative overflow-hidden rounded-lg"
            >
              <Image
                src={product?.images?.[currentImageIndex]}
                alt={product?.imageAlt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onMouseEnter={handleImageHover}
                onMouseLeave={handleImageLeave}
              />
              {product?.isNew && (
                <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                  New
                </span>
              )}
              {product?.discount && (
                <span className="absolute top-3 right-3 bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
                  -{product?.discount}%
                </span>
              )}
            </Link>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onAddToWishlist(product?.id)}
                className="bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <Icon name="Heart" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onQuickView(product)}
                className="bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <Icon name="Eye" size={16} />
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-4">
            <div>
              <Link to="/product-details-page">
                <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                  {product?.name}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground mt-1">
                {product?.brand}
              </p>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3">
              {product?.description}
            </p>

            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {renderStars(product?.rating)}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product?.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {product?.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product?.originalPrice)}
                  </span>
                )}
                <span className="text-lg font-semibold text-foreground">
                  {formatPrice(product?.price)}
                </span>
              </div>

              <Button
                onClick={() => onAddToCart(product)}
                iconName="ShoppingCart"
                iconPosition="left"
                size="sm"
              >
                Add to Cart
              </Button>
            </div>

            {/* Available Colors */}
            {product?.colors && product?.colors?.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Colors:</span>
                <div className="flex gap-1">
                  {product?.colors?.slice(0, 4)?.map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                  {product?.colors?.length > 4 && (
                    <span className="text-xs text-muted-foreground ml-1">
                      +{product?.colors?.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elegant transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Link to="/product-details-page" className="block">
          <Image
            src={product?.images?.[currentImageIndex]}
            alt={product?.imageAlt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product?.isNew && (
            <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product?.discount && (
            <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
              -{product?.discount}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onAddToWishlist(product?.id)}
            className="bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <Icon name="Heart" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onQuickView(product)}
            className="bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <Icon name="Eye" size={16} />
          </Button>
        </div>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={() => onAddToCart(product)}
            className="w-full"
            size="sm"
            iconName="ShoppingCart"
            iconPosition="left"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <Link to="/product-details-page">
            <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
              {product?.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">{product?.brand}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {renderStars(product?.rating)}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product?.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product?.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product?.originalPrice)}
              </span>
            )}
            <span className="font-semibold text-foreground">
              {formatPrice(product?.price)}
            </span>
          </div>
        </div>

        {/* Available Colors */}
        {product?.colors && product?.colors?.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {product?.colors?.slice(0, 3)?.map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              {product?.colors?.length > 3 && (
                <span className="text-xs text-muted-foreground ml-1">
                  +{product?.colors?.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
