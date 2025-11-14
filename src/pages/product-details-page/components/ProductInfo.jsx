import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProductInfo = ({ product, onAddToCart, onAddToWishlist }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize && product?.sizes?.length > 0) {
      alert("Please select a size");
      return;
    }

    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    });
  };

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

  return (
    <div className="space-y-6">
      {/* Product Title & Rating */}
      <div>
        <h1 className="text-3xl font-display font-medium text-foreground mb-2">
          {product?.name}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {renderStars(product?.rating)}
            <span className="text-sm text-muted-foreground ml-2">
              ({product?.reviewCount} reviews)
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            SKU: {product?.sku}
          </span>
        </div>
      </div>
      {/* Price */}
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-semibold text-foreground">
          ${product?.salePrice || product?.price}
        </span>
        {product?.salePrice && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              ${product?.price}
            </span>
            <span className="bg-error text-error-foreground px-2 py-1 rounded text-sm font-medium">
              {Math.round(
                ((product?.price - product?.salePrice) / product?.price) * 100
              )}
              % OFF
            </span>
          </>
        )}
      </div>
      {/* Color Selection */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">
          Color: {selectedColor?.name}
        </h3>
        <div className="flex space-x-2">
          {product?.colors?.map((color) => (
            <button
              key={color?.name}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                selectedColor?.name === color?.name
                  ? "border-primary shadow-md scale-110"
                  : "border-border hover:border-muted-foreground"
              }`}
              style={{ backgroundColor: color?.hex }}
              title={color?.name}
            />
          ))}
        </div>
      </div>
      {/* Size Selection */}
      {product?.sizes?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">Size</h3>
            <button className="text-sm text-primary hover:underline">
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product?.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 px-3 border rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedSize === size
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-muted-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Quantity Selection */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Quantity</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="px-4 py-2 text-foreground font-medium">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product?.stock}
              className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
          <span className="text-sm text-muted-foreground">
            {product?.stock} items available
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleAddToCart}
          className="w-full"
          size="lg"
          disabled={product?.stock === 0}
        >
          <Icon name="ShoppingCart" size={20} />
          Add to Cart - $
          {((product?.salePrice || product?.price) * quantity)?.toFixed(2)}
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={onAddToWishlist}
            className="flex-1"
          >
            <Icon name="Heart" size={18} />
            Wishlist
          </Button>

          <Button variant="outline" className="flex-1">
            <Icon name="Share2" size={18} />
            Share
          </Button>
        </div>
      </div>
      {/* Product Features */}
      <div className="border-t border-border pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Icon name="Truck" size={20} className="text-success" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Free Shipping
              </p>
              <p className="text-xs text-muted-foreground">Orders over $100</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Icon name="RotateCcw" size={20} className="text-success" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Easy Returns
              </p>
              <p className="text-xs text-muted-foreground">30-day policy</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={20} className="text-success" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Secure Payment
              </p>
              <p className="text-xs text-muted-foreground">SSL protected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
