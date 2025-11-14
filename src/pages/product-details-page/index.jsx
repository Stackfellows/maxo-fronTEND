import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import ProductImageGallery from "./components/ProductImageGallery";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import RelatedProducts from "./components/RelatedProducts";
import SizeGuideModal from "./components/SizeGuideModal";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Mock product data
  const mockProduct = {
    id: 1,
    name: "Elegant Leather Crossbody Bag",
    category: "Handbags",
    sku: "FCB-001",
    price: 189.99,
    salePrice: 149.99,
    rating: 4.5,
    reviewCount: 127,
    stock: 15,
    description: `Crafted from premium Italian leather, this elegant crossbody bag combines timeless sophistication with modern functionality. The structured silhouette features a spacious main compartment with multiple organizational pockets, making it perfect for both professional settings and weekend adventures.\n\nThe adjustable chain strap can be worn crossbody or over the shoulder, while the magnetic closure ensures your belongings stay secure. The luxurious gold-tone hardware adds a touch of glamour to any outfit.`,
    features: [
      "Premium Italian leather construction",
      'Adjustable chain strap (24" - 48")',
      "Multiple interior pockets for organization",
      "Magnetic closure with turn-lock detail",
      "Gold-tone hardware accents",
      "Protective dust bag included",
      'Dimensions: 10" W x 7" H x 3" D',
    ],

    specifications: {
      material: "Italian Leather",
      lining: "Cotton Canvas",
      hardware: "Gold-tone Metal",
      closure: "Magnetic with Turn-lock",
      strapDrop: '24" - 48" adjustable',
      weight: "1.2 lbs",
      careInstructions: "Spot clean only",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1620786514663-8c3f57ffe17c",
        alt: "Elegant black leather crossbody bag with gold chain strap displayed on white background",
      },
      {
        url: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214",
        alt: "Close-up view of leather crossbody bag showing texture and gold hardware details",
      },
      {
        url: "https://images.unsplash.com/photo-1657603471016-b3c13c3b5ff5",
        alt: "Interior view of crossbody bag showing multiple compartments and cotton lining",
      },
      {
        url: "https://images.unsplash.com/photo-1680576555742-9a3134da9ef7",
        alt: "Lifestyle shot of woman wearing black crossbody bag with casual outfit",
      },
    ],

    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#8B4513" },
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Burgundy", hex: "#7c2d12" },
    ],

    sizes: ["Small", "Medium", "Large"],
    reviews: [
      {
        id: 1,
        author: "Sarah M.",
        rating: 5,
        date: "November 8, 2024",
        comment:
          "Absolutely love this bag! The leather quality is exceptional and it goes with everything. The size is perfect for daily use.",
        verified: true,
      },
      {
        id: 2,
        author: "Jessica L.",
        rating: 4,
        date: "November 5, 2024",
        comment:
          "Beautiful bag with great craftsmanship. The chain strap is comfortable and the interior is well-organized. Highly recommend!",
        verified: true,
      },
      {
        id: 3,
        author: "Emma R.",
        rating: 5,
        date: "November 2, 2024",
        comment:
          "This bag exceeded my expectations. The leather is so soft and the gold hardware adds the perfect touch of elegance.",
        verified: false,
      },
    ],
  };

  const mockRelatedProducts = [
    {
      id: 2,
      name: "Classic Tote Bag",
      category: "Handbags",
      price: 129.99,
      salePrice: 99.99,
      rating: 4.3,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1713425887346-2ef9f2b67bc7",
      imageAlt:
        "Classic brown leather tote bag with structured design and top handles",
    },
    {
      id: 3,
      name: "Evening Clutch",
      category: "Handbags",
      price: 79.99,
      rating: 4.7,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1603448957837-8ab1952e28e7",
      imageAlt:
        "Elegant black evening clutch with gold chain and crystal embellishments",
    },
    {
      id: 4,
      name: "Casual Backpack",
      category: "Backpacks",
      price: 159.99,
      rating: 4.4,
      reviewCount: 203,
      image: "https://images.unsplash.com/photo-1622560482357-789dc8a50923",
      imageAlt:
        "Modern black leather backpack with minimalist design and laptop compartment",
    },
    {
      id: 5,
      name: "Shoulder Bag",
      category: "Handbags",
      price: 109.99,
      salePrice: 89.99,
      rating: 4.2,
      reviewCount: 74,
      image: "https://images.unsplash.com/photo-1571254165288-99dd71f0e352",
      imageAlt:
        "Soft brown leather shoulder bag with braided handles and bohemian style",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setProduct(mockProduct);
      setRelatedProducts(mockRelatedProducts);
      setIsLoading(false);
    }, 1000);

    // Add to recently viewed
    const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    const updatedViewed = [id, ...viewed?.filter((item) => item !== id)]?.slice(
      0,
      10
    );
    localStorage.setItem("recentlyViewed", JSON.stringify(updatedViewed));
    setRecentlyViewed(updatedViewed);
  }, [id]);

  const handleAddToCart = (productData) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart?.find(
      (item) =>
        item?.id === productData?.id &&
        item?.selectedSize === productData?.selectedSize &&
        item?.selectedColor?.name === productData?.selectedColor?.name
    );

    if (existingItem) {
      existingItem.quantity += productData?.quantity;
    } else {
      cart?.push({
        ...productData,
        addedAt: new Date()?.toISOString(),
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Show success message (you could use a toast library here)
    alert(`Added ${productData?.quantity} item(s) to cart!`);
  };

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (!wishlist?.find((item) => item?.id === product?.id)) {
      wishlist?.push({
        ...product,
        addedAt: new Date()?.toISOString(),
      });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to wishlist!");
    } else {
      alert("Item already in wishlist!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <Icon
              name="AlertCircle"
              size={48}
              className="text-muted-foreground mx-auto"
            />
            <h2 className="text-xl font-medium text-foreground">
              Product Not Found
            </h2>
            <p className="text-muted-foreground">
              The product you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/shop-page")}>
              <Icon name="ArrowLeft" size={16} />
              Back to Shop
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => navigate("/homepage")}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Home
              </button>
              <Icon
                name="ChevronRight"
                size={16}
                className="text-muted-foreground"
              />
              <button
                onClick={() => navigate("/shop-page")}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Shop
              </button>
              <Icon
                name="ChevronRight"
                size={16}
                className="text-muted-foreground"
              />
              <span className="text-foreground">{product?.category}</span>
              <Icon
                name="ChevronRight"
                size={16}
                className="text-muted-foreground"
              />
              <span className="text-foreground font-medium">
                {product?.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Product Images */}
            <div className="space-y-6">
              <ProductImageGallery product={product} />
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <ProductInfo
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mb-12">
            <ProductTabs product={product} />
          </div>

          {/* Related Products */}
          <div className="mb-12">
            <RelatedProducts products={relatedProducts} />
          </div>

          {/* Recently Viewed */}
          {recentlyViewed?.length > 1 && (
            <div className="border-t border-border pt-12">
              <h2 className="text-2xl font-display font-medium text-foreground mb-6">
                Recently Viewed
              </h2>
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {recentlyViewed?.slice(1, 6)?.map((viewedId) => (
                  <button
                    key={viewedId}
                    onClick={() =>
                      navigate(`/product-details-page/${viewedId}`)
                    }
                    className="flex-shrink-0 w-24 h-24 bg-surface rounded-lg border border-border hover:border-muted-foreground transition-colors duration-300"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon
                        name="Package"
                        size={24}
                        className="text-muted-foreground"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product?.category?.toLowerCase()}
      />

      {/* Floating Action Button for Mobile */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <Button
          size="lg"
          className="rounded-full shadow-floating"
          onClick={() =>
            handleAddToCart({
              ...product,
              selectedSize: product?.sizes?.[0] || "",
              selectedColor: product?.colors?.[0],
              quantity: 1,
            })
          }
        >
          <Icon name="ShoppingCart" size={20} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
