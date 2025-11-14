import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";

const HeroSection = () => {
  const heroData = {
    title: "Winter Elegance Collection",
    subtitle: "Discover curated pieces that define your style",
    description:
      "Premium handbags and clothing crafted for the modern woman who values sophistication and quality.",
    ctaText: "Shop Collection",
    backgroundImage:
      "https://images.unsplash.com/photo-1674822968853-e8cf0192a63b",
    backgroundImageAlt:
      "Elegant fashion boutique interior with luxury handbags and clothing displays in warm lighting",
    badge: "New Arrivals",
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroData?.backgroundImage}
          alt={heroData?.backgroundImageAlt}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium mb-6"
          >
            {heroData?.badge}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white mb-6 leading-tight"
          >
            {heroData?.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-4 font-light"
          >
            {heroData?.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {heroData?.description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link to="/shop-page">
              <Button
                variant="default"
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-medium shadow-elegant transition-premium"
              >
                {heroData?.ctaText}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
