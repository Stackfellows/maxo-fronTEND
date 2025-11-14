import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import CartItem from "./components/CartItem";
import OrderSummary from "./components/OrderSummary";
import RecommendedProducts from "./components/RecommendedProducts";
import EmptyCart from "./components/EmptyCart";
import ShippingCalculator from "./components/ShippingCalculator";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [discount, setDiscount] = useState(0);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      name: "Premium Leather Handbag",
      brand: "Feathers Collection",
      category: "Handbags",
      price: 189.99,
      salePrice: 149.99,
      quantity: 1,
      stock: 8,
      image: "https://images.unsplash.com/photo-1702326626601-74d2e86922b4",
      imageAlt:
        "Elegant brown leather handbag with gold hardware on white background",
      selectedColor: { name: "Cognac Brown", value: "#8B4513" },
      selectedSize: null,
    },
    {
      id: 2,
      name: "Silk Wrap Dress",
      brand: "Feathers Couture",
      category: "Dresses",
      price: 129.99,
      quantity: 2,
      stock: 12,
      image: "https://images.unsplash.com/photo-1678534955044-f15aafeb1fe0",
      imageAlt:
        "Flowing navy blue silk wrap dress on model in natural lighting",
      selectedColor: { name: "Navy Blue", value: "#1e3a8a" },
      selectedSize: "M",
    },
    {
      id: 3,
      name: "Designer Crossbody Bag",
      brand: "Feathers Luxury",
      category: "Bags",
      price: 89.99,
      quantity: 1,
      stock: 3,
      image: "https://images.unsplash.com/photo-1660695768053-af80309a7cfe",
      imageAlt:
        "Compact black crossbody bag with chain strap and quilted pattern",
      selectedColor: { name: "Black", value: "#000000" },
      selectedSize: null,
    },
  ];

  // Mock recommended products
  const mockRecommendedProducts = [
    {
      id: 101,
      name: "Classic Tote Bag",
      brand: "Feathers Essential",
      price: 79.99,
      rating: 4.5,
      reviewCount: 124,
      image: "https://images.unsplash.com/photo-1701792606084-10fbd4a9eed1",
      imageAlt:
        "Beige canvas tote bag with leather handles displayed on marble surface",
    },
    {
      id: 102,
      name: "Floral Print Blouse",
      brand: "Feathers Garden",
      price: 59.99,
      salePrice: 44.99,
      rating: 4.8,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1693988501246-35cac86cefda",
      imageAlt: "White blouse with delicate pink floral print on fashion model",
    },
    {
      id: 103,
      name: "Evening Clutch",
      brand: "Feathers Glamour",
      price: 119.99,
      rating: 4.7,
      reviewCount: 67,
      image: "https://images.unsplash.com/photo-1608368553807-622b422ee2c0",
      imageAlt:
        "Gold metallic evening clutch with beaded detailing on black velvet",
    },
    {
      id: 104,
      name: "Cashmere Scarf",
      brand: "Feathers Comfort",
      price: 89.99,
      rating: 4.9,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1634193882954-1ecd8dc57c8d",
      imageAlt: "Soft gray cashmere scarf draped elegantly with fringe details",
    },
  ];

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("feathersCart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems(mockCartItems);
      localStorage.setItem("feathersCart", JSON.stringify(mockCartItems));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    if (cartItems?.length > 0) {
      localStorage.setItem("feathersCart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((items) =>
      items?.map((item) =>
        item?.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems((items) => items?.filter((item) => item?.id !== itemId));
  };

  const moveToWishlist = (itemId) => {
    // Mock wishlist functionality
    const item = cartItems?.find((item) => item?.id === itemId);
    if (item) {
      // Add to wishlist (mock)
      const wishlist = JSON.parse(
        localStorage.getItem("feathersWishlist") || "[]"
      );
      wishlist?.push(item);
      localStorage.setItem("feathersWishlist", JSON.stringify(wishlist));

      // Remove from cart
      removeItem(itemId);
    }
  };

  const addToCart = (product) => {
    const existingItem = cartItems?.find((item) => item?.id === product?.id);
    if (existingItem) {
      updateQuantity(product?.id, existingItem?.quantity + 1);
    } else {
      const newItem = {
        ...product,
        quantity: 1,
        stock: 10, // Mock stock
        selectedColor: null,
        selectedSize: null,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const applyPromoCode = (code) => {
    const discountMap = {
      SAVE10: 0.1,
      WELCOME20: 0.2,
      FASHION15: 0.15,
    };

    const discountPercent = discountMap?.[code] || 0;
    const subtotal = calculateSubtotal();
    setDiscount(subtotal * discountPercent);
  };

  const updateShipping = (shippingOption) => {
    setShippingCost(shippingOption?.price);
  };

  const calculateSubtotal = () => {
    return cartItems?.reduce((total, item) => {
      const price = item?.salePrice || item?.price;
      return total + price * item?.quantity;
    }, 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.08; // 8% tax rate
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + shippingCost + tax - discount;
  };

  const proceedToCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/checkout-step-1");
    }, 1000);
  };

  const continueShopping = () => {
    const lastVisited = localStorage.getItem("lastShopPage") || "/shop-page";
    navigate(lastVisited);
  };

  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <EmptyCart />
        </main>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link
                to="/homepage"
                className="text-muted-foreground hover:text-foreground transition-elegant"
              >
                Home
              </Link>
              <Icon
                name="ChevronRight"
                size={14}
                className="text-muted-foreground"
              />
              <span className="text-foreground font-medium">Shopping Cart</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Shopping Cart
              </h1>
              <p className="text-muted-foreground">
                {cartItems?.length} {cartItems?.length === 1 ? "item" : "items"}{" "}
                in your cart
              </p>
            </div>

            <Button
              variant="outline"
              onClick={continueShopping}
              className="self-start sm:self-auto"
            >
              <Icon name="ArrowLeft" size={16} />
              <span className="ml-2">Continue Shopping</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems?.map((item) => (
                <CartItem
                  key={item?.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  onMoveToWishlist={moveToWishlist}
                />
              ))}

              {/* Shipping Calculator */}
              <ShippingCalculator onShippingUpdate={updateShipping} />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
                shipping={shippingCost}
                tax={tax}
                discount={discount}
                total={total}
                onApplyPromo={applyPromoCode}
                onProceedToCheckout={proceedToCheckout}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Recommended Products */}
          <div className="mt-12">
            <RecommendedProducts
              products={mockRecommendedProducts}
              onAddToCart={addToCart}
            />
          </div>

          {/* Trust Signals */}
          <div className="mt-12 bg-muted/30 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-3">
                  <Icon name="Shield" size={24} className="text-success" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  Secure Checkout
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your payment information is protected with 256-bit SSL
                  encryption
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Icon name="RotateCcw" size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  Easy Returns
                </h3>
                <p className="text-sm text-muted-foreground">
                  30-day return policy on all items with free return shipping
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                  <Icon name="Headphones" size={24} className="text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  24/7 Support
                </h3>
                <p className="text-sm text-muted-foreground">
                  Our customer service team is here to help you anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date()?.getFullYear()} Feathers Closet. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;
