import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Image from "../../../components/AppImage";

const CategoryShowcase = () => {
  const categories = [
    {
      id: 1,
      name: "Handbags",
      description: "Luxury leather goods crafted to perfection",
      image: "https://images.unsplash.com/photo-1719888343373-aacf90b5a7af",
      imageAlt:
        "Collection of premium leather handbags in various colors displayed on marble surface",
      itemCount: 156,
      link: "/shop-page",
    },
    {
      id: 2,
      name: "Dresses",
      description: "Elegant pieces for every occasion",
      image: "https://images.unsplash.com/photo-1707451983464-52b26940ddea",
      imageAlt:
        "Elegant woman in flowing floral dress walking through sunlit garden",
      itemCount: 89,
      link: "/shop-page",
    },
    {
      id: 3,
      name: "Outerwear",
      description: "Sophisticated layers for modern living",
      image: "https://images.unsplash.com/photo-1706539369025-ab52a64b28cc",
      imageAlt:
        "Professional woman in tailored beige coat standing in modern urban setting",
      itemCount: 67,
      link: "/shop-page",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
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
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections designed to elevate your wardrobe
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {categories?.map((category) => (
            <motion.div
              key={category?.id}
              variants={itemVariants}
              className="group"
            >
              <Link to={category?.link} className="block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-card shadow-elegant group-hover:shadow-floating transition-premium">
                  {/* Category Image */}
                  <Image
                    src={category?.image}
                    alt={category?.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-premium"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="transform group-hover:-translate-y-2 transition-premium">
                      <h3 className="text-2xl font-display font-medium mb-2">
                        {category?.name}
                      </h3>
                      <p className="text-white/90 mb-3 leading-relaxed">
                        {category?.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80">
                          {category?.itemCount} items
                        </span>
                        <div className="flex items-center text-sm font-medium group-hover:text-accent transition-colors">
                          Shop Now
                          <svg
                            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
