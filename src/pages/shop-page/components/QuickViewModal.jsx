import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const QuickViewModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToWishlist,
}) => {
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    })?.format(price);
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={`${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity,
    });
    onClose();
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-floating max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
        >
          <Icon name="X" size={20} />
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[90vh]">
          {/* Product Images */}
          <div className="relative bg-muted">
            <div className="aspect-square lg:h-full relative overflow-hidden">
              <Image
                src={product?.images?.[currentImageIndex]}
                alt={product?.imageAlt}
                className="w-full h-full object-cover"
              />

              {/* Image Navigation */}
              {product?.images?.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? product?.images?.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <Icon name="ChevronLeft" size={20} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === product?.images?.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <Icon name="ChevronRight" size={20} />
                  </Button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
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
            </div>

            {/* Thumbnail Navigation */}
            {product?.images?.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {product?.images?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? "bg-primary"
                        : "bg-background/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 lg:p-8 overflow-y-auto">
            <div className="space-y-6">
              {/* Product Info */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  {product?.brand}
                </p>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  {product?.name}
                </h2>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    {renderStars(product?.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product?.reviewCount} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {product?.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product?.originalPrice)}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-foreground">
                    {formatPrice(product?.price)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  {product?.description}
                </p>
              </div>

              {/* Color Selection */}
              {product?.colors && product?.colors?.length > 0 && (
                <div>
                  <h4 className="font-medium text-foreground mb-3">Color</h4>
                  <div className="flex gap-2">
                    {product?.colors?.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? "border-primary scale-110"
                            : "border-border hover:border-primary hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      >
                        {selectedColor === color && (
                          <Icon
                            name="Check"
                            size={16}
                            className={`${
                              color === "#FFFFFF"
                                ? "text-gray-800"
                                : "text-white"
                            }`}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product?.sizes && product?.sizes?.length > 0 && (
                <div>
                  <h4 className="font-medium text-foreground mb-3">Size</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {product?.sizes?.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                          selectedSize === size
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h4 className="font-medium text-foreground mb-3">Quantity</h4>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="h-10 w-10 rounded-r-none"
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <span className="px-4 py-2 text-center min-w-[3rem] border-x border-border">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                      className="h-10 w-10 rounded-l-none"
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Max 10 items
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  iconName="ShoppingCart"
                  iconPosition="left"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onAddToWishlist(product?.id)}
                  iconName="Heart"
                  iconPosition="left"
                >
                  Wishlist
                </Button>
              </div>

              {/* Additional Info */}
              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Icon
                    name="Truck"
                    size={16}
                    className="text-muted-foreground"
                  />
                  <span className="text-muted-foreground">
                    Free shipping on orders over $100
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Icon
                    name="RotateCcw"
                    size={16}
                    className="text-muted-foreground"
                  />
                  <span className="text-muted-foreground">
                    30-day return policy
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Icon
                    name="Shield"
                    size={16}
                    className="text-muted-foreground"
                  />
                  <span className="text-muted-foreground">
                    2-year warranty included
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
