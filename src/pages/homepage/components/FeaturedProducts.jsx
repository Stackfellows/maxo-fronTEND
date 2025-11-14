import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const FeaturedProducts = () => {
  const [wishlist, setWishlist] = useState(new Set());

  const featuredProducts = [
    {
      id: 1,
      name: "Luxe Leather Tote",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1601281866896-1576541e77a1",
      imageAlt:
        "Premium black leather tote bag with gold hardware displayed on marble surface",
      category: "Handbags",
      isNew: true,
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Silk Wrap Dress",
      price: 189,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1678534955044-f15aafeb1fe0",
      imageAlt:
        "Elegant navy blue silk wrap dress on model in natural lighting",
      category: "Dresses",
      isNew: false,
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 3,
      name: "Pearl Chain Clutch",
      price: 149,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1724241106641-dddb84447275",
      imageAlt:
        "Elegant white pearl chain clutch bag with gold clasp on velvet background",
      category: "Evening Bags",
      isNew: true,
      rating: 4.7,
      reviews: 67,
    },
    {
      id: 4,
      name: "Cashmere Blazer",
      price: 349,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1604581312410-72dbb2553d26",
      imageAlt:
        "Sophisticated beige cashmere blazer on professional woman in office setting",
      category: "Outerwear",
      isNew: false,
      rating: 4.9,
      reviews: 156,
    },
  ];

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist?.has(productId)) {
        newWishlist?.delete(productId);
      } else {
        newWishlist?.add(productId);
      }
      return newWishlist;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-foreground mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked pieces that embody elegance and sophistication for the
            modern woman
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {featuredProducts?.map((product) => (
            <motion.div
              key={product?.id}
              variants={itemVariants}
              className="group bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-floating transition-premium"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product?.image}
                  alt={product?.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-premium"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product?.isNew && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      New
                    </span>
                  )}
                  {product?.originalPrice && (
                    <span className="px-2 py-1 bg-error text-error-foreground text-xs font-medium rounded-full">
                      Sale
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product?.id)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-elegant hover:bg-white"
                >
                  <Icon
                    name="Heart"
                    size={16}
                    className={`transition-colors ${
                      wishlist?.has(product?.id)
                        ? "text-red-500 fill-red-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>

                {/* Quick Add Button */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-elegant">
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full bg-white text-primary hover:bg-white/90"
                  >
                    Quick Add
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    {product?.category}
                  </span>
                </div>

                <Link to="/product-details-page" className="block">
                  <h3 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product?.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        className={`${
                          i < Math.floor(product?.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product?.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-foreground">
                    ${product?.price}
                  </span>
                  {product?.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product?.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-12"
        >
          <Link to="/shop-page">
            <Button variant="outline" size="lg" className="px-8 py-3">
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
