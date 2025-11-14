import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({
  products,
  viewMode,
  onQuickView,
  onAddToWishlist,
  onAddToCart,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)]?.map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted rounded-lg aspect-square mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            <path d="M6 6h.008v.008H6V6z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No products found
        </h3>
        <p className="text-muted-foreground max-w-md">
          We couldn't find any products matching your current filters. Try
          adjusting your search criteria or browse our full collection.
        </p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-6">
        {products?.map((product) => (
          <ProductCard
            key={product?.id}
            product={product}
            viewMode="list"
            onQuickView={onQuickView}
            onAddToWishlist={onAddToWishlist}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard
          key={product?.id}
          product={product}
          viewMode="grid"
          onQuickView={onQuickView}
          onAddToWishlist={onAddToWishlist}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
