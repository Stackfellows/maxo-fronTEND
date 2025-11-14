import React from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const CartItem = ({ item, onUpdateQuantity, onRemove, onMoveToWishlist }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > item?.stock) return;
    onUpdateQuantity(item?.id, newQuantity);
  };

  const calculateItemTotal = () => {
    const price = item?.salePrice || item?.price;
    return (price * item?.quantity)?.toFixed(2);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 shadow-elegant">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-muted">
            <Image
              src={item?.image}
              alt={item?.imageAlt}
              className="w-full h-full object-cover hover:scale-105 transition-elegant"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-3">
            <div>
              <h3 className="font-medium text-foreground text-lg mb-1 line-clamp-2">
                {item?.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {item?.brand} • {item?.category}
              </p>
              {item?.selectedColor && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">Color:</span>
                  <div
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: item?.selectedColor?.value }}
                  />
                  <span className="text-sm text-foreground">
                    {item?.selectedColor?.name}
                  </span>
                </div>
              )}
              {item?.selectedSize && (
                <p className="text-sm text-muted-foreground">
                  Size:{" "}
                  <span className="text-foreground">{item?.selectedSize}</span>
                </p>
              )}
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="flex flex-col items-end">
                {item?.salePrice ? (
                  <>
                    <span className="text-lg font-semibold text-error">
                      ${item?.salePrice?.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${item?.price?.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-semibold text-foreground">
                    ${item?.price?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stock Status */}
          {item?.stock <= 5 && (
            <div className="mb-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
                <Icon name="AlertTriangle" size={12} className="mr-1" />
                Only {item?.stock} left in stock
              </span>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Qty:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(item?.quantity - 1)}
                  disabled={item?.quantity <= 1}
                  className="h-8 w-8 rounded-r-none"
                >
                  <Icon name="Minus" size={14} />
                </Button>
                <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                  {item?.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(item?.quantity + 1)}
                  disabled={item?.quantity >= item?.stock}
                  className="h-8 w-8 rounded-l-none"
                >
                  <Icon name="Plus" size={14} />
                </Button>
              </div>
            </div>

            {/* Item Total */}
            <div className="flex items-center justify-between sm:justify-end gap-4">
              <span className="text-lg font-semibold text-foreground">
                ${calculateItemTotal()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMoveToWishlist(item?.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Heart" size={14} />
              <span className="ml-1">Save for Later</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item?.id)}
              className="text-muted-foreground hover:text-error"
            >
              <Icon name="Trash2" size={14} />
              <span className="ml-1">Remove</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
