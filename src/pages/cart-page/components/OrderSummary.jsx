import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const OrderSummary = ({
  subtotal,
  shipping,
  tax,
  discount,
  total,
  onApplyPromo,
  onProceedToCheckout,
  isLoading,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const handleApplyPromo = () => {
    if (!promoCode?.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    // Mock promo code validation
    const validCodes = ["SAVE10", "WELCOME20", "FASHION15"];
    if (validCodes?.includes(promoCode?.toUpperCase())) {
      setPromoError("");
      setPromoSuccess(
        `Promo code ${promoCode?.toUpperCase()} applied successfully!`
      );
      onApplyPromo(promoCode?.toUpperCase());
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code. Try SAVE10, WELCOME20, or FASHION15");
      setPromoSuccess("");
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elegant sticky top-24">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        Order Summary
      </h2>
      {/* Promo Code Section */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <h3 className="text-sm font-medium text-foreground mb-3">Promo Code</h3>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e?.target?.value)}
            className="flex-1"
            error={promoError}
          />
          <Button
            variant="outline"
            onClick={handleApplyPromo}
            disabled={!promoCode?.trim()}
          >
            Apply
          </Button>
        </div>
        {promoSuccess && (
          <div className="mt-2 flex items-center text-sm text-success">
            <Icon name="CheckCircle" size={14} className="mr-1" />
            {promoSuccess}
          </div>
        )}
      </div>
      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground font-medium">
            ${subtotal?.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground font-medium">
            {shipping === 0 ? "Free" : `$${shipping?.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground font-medium">
            ${tax?.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-success font-medium">
              -${discount?.toFixed(2)}
            </span>
          </div>
        )}

        <div className="border-t border-border pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-foreground">Total</span>
            <span className="text-lg font-semibold text-foreground">
              ${total?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      {/* Free Shipping Notice */}
      {subtotal < 75 && (
        <div className="mb-6 p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-center text-sm text-accent">
            <Icon name="Truck" size={14} className="mr-2" />
            <span>
              Add ${(75 - subtotal)?.toFixed(2)} more for free shipping!
            </span>
          </div>
        </div>
      )}
      {/* Security Badges */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Icon name="Shield" size={14} className="mr-1" />
            <span>SSL Secure</span>
          </div>
          <div className="flex items-center">
            <Icon name="Lock" size={14} className="mr-1" />
            <span>256-bit Encryption</span>
          </div>
        </div>
      </div>
      {/* Checkout Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        onClick={onProceedToCheckout}
        loading={isLoading}
        className="mb-4"
      >
        <Icon name="CreditCard" size={16} />
        <span className="ml-2">Proceed to Checkout</span>
      </Button>
      {/* Payment Methods */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">We accept</p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-bold">VISA</span>
          </div>
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-bold">MC</span>
          </div>
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-bold">AMEX</span>
          </div>
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <Icon name="CreditCard" size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
