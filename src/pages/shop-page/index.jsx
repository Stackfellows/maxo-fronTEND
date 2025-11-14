import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import FilterSidebar from "./components/FilterSidebar";
import CategoryTabs from "./components/CategoryTabs";
import SortDropdown from "./components/SortDropdown";
import ProductGrid from "./components/ProductGrid";
import QuickViewModal from "./components/QuickViewModal";

const ShopPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSort, setCurrentSort] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 12;

  const [filters, setFilters] = useState({
    categories: [],
    priceRanges: [],
    brands: [],
    sizes: [],
    colors: [],
    ratings: [],
  });

  // Mock products data
  const allProducts = [
    {
      id: 1,
      name: "Classic Leather Tote Bag",
      brand: "Coach",
      price: 298.0,
      originalPrice: 350.0,
      discount: 15,
      rating: 4.8,
      reviewCount: 124,
      description:
        "Elegant leather tote bag perfect for everyday use. Features multiple compartments and premium leather construction with gold-tone hardware.",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
      ],
      imageAlt:
        "Classic brown leather tote bag with gold hardware displayed on white background",
      colors: ["#8B4513", "#000000", "#D2B48C"],
      sizes: ["S", "M", "L"],
      category: "tote-bags",
      isNew: false,
      inStock: true,
    },
    {
      id: 2,
      name: "Designer Crossbody Purse",
      brand: "Michael Kors",
      price: 189.99,
      originalPrice: null,
      discount: null,
      rating: 4.6,
      reviewCount: 89,
      description:
        "Stylish crossbody purse with adjustable strap. Perfect for hands-free shopping and daily activities with secure zip closure.",
      images: [
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
      ],
      imageAlt:
        "Black designer crossbody purse with chain strap on marble surface",
      colors: ["#000000", "#8B4513", "#DC2626"],
      sizes: ["One Size"],
      category: "crossbody",
      isNew: true,
      inStock: true,
    },
    {
      id: 3,
      name: "Vintage Shoulder Bag",
      brand: "Kate Spade",
      price: 245.0,
      originalPrice: 295.0,
      discount: 17,
      rating: 4.7,
      reviewCount: 156,
      description:
        "Timeless vintage-inspired shoulder bag with classic design elements. Features premium materials and sophisticated styling.",
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      ],
      imageAlt:
        "Vintage brown shoulder bag with brass buckles and leather trim",
      colors: ["#8B4513", "#D2B48C", "#000000"],
      sizes: ["M", "L"],
      category: "shoulder-bags",
      isNew: false,
      inStock: true,
    },
    {
      id: 4,
      name: "Evening Clutch Bag",
      brand: "Tory Burch",
      price: 125.0,
      originalPrice: null,
      discount: null,
      rating: 4.5,
      reviewCount: 67,
      description:
        "Elegant evening clutch perfect for special occasions. Features metallic finish and removable chain strap for versatile styling.",
      images: [
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
      ],
      imageAlt:
        "Gold metallic evening clutch bag with chain strap on black velvet",
      colors: ["#D4AF37", "#000000", "#C0C0C0"],
      sizes: ["One Size"],
      category: "clutches",
      isNew: true,
      inStock: true,
    },
    {
      id: 5,
      name: "Professional Handbag",
      brand: "Marc Jacobs",
      price: 425.0,
      originalPrice: 495.0,
      discount: 14,
      rating: 4.9,
      reviewCount: 203,
      description:
        "Sophisticated handbag designed for the modern professional. Features laptop compartment and organizational pockets.",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500",
      ],
      imageAlt:
        "Black professional handbag with structured design and gold accents",
      colors: ["#000000", "#8B4513", "#2F4F4F"],
      sizes: ["M", "L"],
      category: "handbags",
      isNew: false,
      inStock: true,
    },
    {
      id: 6,
      name: "Casual Canvas Backpack",
      brand: "Coach",
      price: 195.0,
      originalPrice: null,
      discount: null,
      rating: 4.4,
      reviewCount: 91,
      description:
        "Versatile canvas backpack perfect for casual outings. Features multiple pockets and comfortable padded straps.",
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      ],
      imageAlt: "Beige canvas backpack with leather trim and brass hardware",
      colors: ["#D2B48C", "#8B4513", "#000000"],
      sizes: ["S", "M"],
      category: "backpacks",
      isNew: true,
      inStock: true,
    },
    {
      id: 7,
      name: "Luxury Leather Wallet",
      brand: "Gucci",
      price: 89.99,
      originalPrice: 120.0,
      discount: 25,
      rating: 4.6,
      reviewCount: 78,
      description:
        "Premium leather wallet with multiple card slots and bill compartments. Features signature brand detailing.",
      images: [
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
      ],
      imageAlt: "Black luxury leather wallet with gold logo embossing",
      colors: ["#000000", "#8B4513", "#DC2626"],
      sizes: ["One Size"],
      category: "accessories",
      isNew: false,
      inStock: true,
    },
    {
      id: 8,
      name: "Structured Satchel Bag",
      brand: "Prada",
      price: 675.0,
      originalPrice: 750.0,
      discount: 10,
      rating: 4.8,
      reviewCount: 145,
      description:
        "Elegant structured satchel with premium leather construction. Features dual handles and removable shoulder strap.",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500",
      ],
      imageAlt:
        "Navy blue structured satchel bag with silver hardware and leather handles",
      colors: ["#2563EB", "#000000", "#8B4513"],
      sizes: ["M", "L"],
      category: "handbags",
      isNew: true,
      inStock: true,
    },
    {
      id: 9,
      name: "Bohemian Fringe Bag",
      brand: "Louis Vuitton",
      price: 1250.0,
      originalPrice: null,
      discount: null,
      rating: 4.7,
      reviewCount: 89,
      description:
        "Unique bohemian-style bag with fringe details. Perfect for festival season and casual weekend outings.",
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      ],
      imageAlt:
        "Brown suede bohemian bag with leather fringe and beaded details",
      colors: ["#8B4513", "#D2B48C", "#16A34A"],
      sizes: ["M"],
      category: "shoulder-bags",
      isNew: false,
      inStock: true,
    },
    {
      id: 10,
      name: "Mini Chain Bag",
      brand: "Chanel",
      price: 2850.0,
      originalPrice: null,
      discount: null,
      rating: 4.9,
      reviewCount: 234,
      description:
        "Iconic mini chain bag with quilted leather design. A timeless piece that elevates any outfit with luxury appeal.",
      images: [
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
      ],
      imageAlt:
        "Black quilted mini chain bag with gold chain strap and CC logo",
      colors: ["#000000", "#FFFFFF", "#EC4899"],
      sizes: ["One Size"],
      category: "crossbody",
      isNew: true,
      inStock: true,
    },
    {
      id: 11,
      name: "Travel Duffle Bag",
      brand: "Hermès",
      price: 1895.0,
      originalPrice: 2100.0,
      discount: 10,
      rating: 4.8,
      reviewCount: 167,
      description:
        "Spacious travel duffle bag crafted from premium materials. Perfect for weekend getaways and business trips.",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500",
      ],
      imageAlt:
        "Tan leather travel duffle bag with brass hardware and leather handles",
      colors: ["#D2B48C", "#8B4513", "#000000"],
      sizes: ["L", "XL"],
      category: "tote-bags",
      isNew: false,
      inStock: true,
    },
    {
      id: 12,
      name: "Convertible Backpack Tote",
      brand: "Michael Kors",
      price: 225.0,
      originalPrice: 275.0,
      discount: 18,
      rating: 4.5,
      reviewCount: 112,
      description:
        "Versatile bag that converts from backpack to tote. Perfect for busy professionals who need adaptable style.",
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      ],
      imageAlt:
        "Gray convertible backpack tote with adjustable straps and multiple compartments",
      colors: ["#808080", "#000000", "#8B4513"],
      sizes: ["M", "L"],
      category: "backpacks",
      isNew: true,
      inStock: true,
    },
  ];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered?.filter(
        (product) =>
          product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          product?.brand?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          product?.description
            ?.toLowerCase()
            ?.includes(searchQuery?.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered?.filter(
        (product) => product?.category === activeCategory
      );
    }

    // Apply filters
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter((product) =>
        filters?.categories?.includes(product?.category)
      );
    }

    if (filters?.brands?.length > 0) {
      filtered = filtered?.filter((product) =>
        filters?.brands?.includes(product?.brand)
      );
    }

    if (filters?.colors?.length > 0) {
      filtered = filtered?.filter((product) =>
        product?.colors?.some((color) => filters?.colors?.includes(color))
      );
    }

    if (filters?.sizes?.length > 0) {
      filtered = filtered?.filter((product) =>
        product?.sizes?.some((size) => filters?.sizes?.includes(size))
      );
    }

    if (filters?.ratings?.length > 0) {
      filtered = filtered?.filter((product) =>
        filters?.ratings?.some(
          (rating) => Math.floor(product?.rating) >= rating
        )
      );
    }

    if (filters?.priceRanges?.length > 0) {
      const priceRanges = [
        { id: "under-50", min: 0, max: 50 },
        { id: "50-100", min: 50, max: 100 },
        { id: "100-200", min: 100, max: 200 },
        { id: "200-500", min: 200, max: 500 },
        { id: "over-500", min: 500, max: 9999 },
      ];

      filtered = filtered?.filter((product) =>
        filters?.priceRanges?.some((rangeId) => {
          const range = priceRanges?.find((r) => r?.id === rangeId);
          return (
            range &&
            product?.price >= range?.min &&
            product?.price <= range?.max
          );
        })
      );
    }

    // Sort products
    switch (currentSort) {
      case "price-low":
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case "price-high":
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case "rating":
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case "popularity":
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      case "name-az":
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case "name-za":
        filtered?.sort((a, b) => b?.name?.localeCompare(a?.name));
        break;
      case "newest":
      default:
        filtered?.sort((a, b) => (b?.isNew ? 1 : 0) - (a?.isNew ? 1 : 0));
        break;
    }

    return filtered;
  }, [allProducts, searchQuery, activeCategory, filters, currentSort]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedProducts?.length / itemsPerPage
  );
  const paginatedProducts = filteredAndSortedProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      priceRanges: [],
      brands: [],
      sizes: [],
      colors: [],
      ratings: [],
    });
    setSearchQuery("");
    setActiveCategory("all");
    setCurrentPage(1);
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleAddToWishlist = (productId) => {
    console.log("Added to wishlist:", productId);
    // Implement wishlist functionality
  };

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
    // Implement cart functionality
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Shop - Feathers Closet | Premium Fashion Collection</title>
        <meta
          name="description"
          content="Discover our curated collection of premium handbags, accessories, and fashion essentials. Shop the latest trends with advanced filtering and sorting options."
        />
        <meta
          name="keywords"
          content="handbags, fashion, accessories, luxury bags, designer purses, crossbody bags, tote bags"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 py-12">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <div className="text-center">
                <h1 className="text-4xl lg:text-5xl font-display font-semibold text-foreground mb-4">
                  Shop Our Collection
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover premium handbags and accessories curated for the
                  modern woman. Find your perfect style with our advanced
                  filtering options.
                </p>
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="flex gap-8">
              {/* Filter Sidebar */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  isOpen={false}
                  onClose={() => {}}
                />
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Search and Controls */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <Icon
                        name="Search"
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        type="search"
                        placeholder="Search products, brands, or categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e?.target?.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-4">
                    {/* Mobile Filter Button */}
                    <Button
                      variant="outline"
                      onClick={() => setIsFilterOpen(true)}
                      className="lg:hidden"
                      iconName="Filter"
                      iconPosition="left"
                    >
                      Filters
                    </Button>

                    {/* Sort Dropdown */}
                    <SortDropdown
                      currentSort={currentSort}
                      onSortChange={setCurrentSort}
                    />

                    {/* View Mode Toggle */}
                    <div className="hidden sm:flex border border-border rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="icon"
                        onClick={() => setViewMode("grid")}
                        className="h-8 w-8"
                      >
                        <Icon name="Grid3x3" size={16} />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="icon"
                        onClick={() => setViewMode("list")}
                        className="h-8 w-8"
                      >
                        <Icon name="List" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Results Summary */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    Showing {paginatedProducts?.length} of{" "}
                    {filteredAndSortedProducts?.length} products
                  </p>

                  {(Object.values(filters)?.some((f) => f?.length > 0) ||
                    searchQuery ||
                    activeCategory !== "all") && (
                    <Button
                      variant="ghost"
                      onClick={handleClearFilters}
                      iconName="X"
                      iconPosition="left"
                      size="sm"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>

                {/* Product Grid */}
                <ProductGrid
                  products={paginatedProducts}
                  viewMode={viewMode}
                  onQuickView={handleQuickView}
                  onAddToWishlist={handleAddToWishlist}
                  onAddToCart={handleAddToCart}
                  loading={loading}
                />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      Previous
                    </Button>

                    <div className="flex gap-1">
                      {[...Array(totalPages)]?.map((_, index) => {
                        const page = index + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 2 && page <= currentPage + 2)
                        ) {
                          return (
                            <Button
                              key={page}
                              variant={
                                currentPage === page ? "default" : "outline"
                              }
                              onClick={() => handlePageChange(page)}
                              size="icon"
                              className="w-10 h-10"
                            >
                              {page}
                            </Button>
                          );
                        } else if (
                          page === currentPage - 3 ||
                          page === currentPage + 3
                        ) {
                          return (
                            <span
                              key={page}
                              className="flex items-center px-2 text-muted-foreground"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        {/* Quick View Modal */}
        <QuickViewModal
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={() => {
            setIsQuickViewOpen(false);
            setSelectedProduct(null);
          }}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
        />
      </div>
    </>
  );
};

export default ShopPage;
