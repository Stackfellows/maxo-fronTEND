import React, { useEffect } from "react";

import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import FeaturedProducts from "./components/FeaturedProducts";
import CategoryShowcase from "./components/CategoryShowcase";
import TrustSignals from "./components/TrustSignals";
import NewsletterSection from "./components/NewsletterSection";
import SocialProof from "./components/SocialProof";

const Homepage = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Category Showcase */}
        <CategoryShowcase />

        {/* Trust Signals */}
        <TrustSignals />

        {/* Social Proof */}
        <SocialProof />

        {/* Newsletter Section */}
        <NewsletterSection />
      </main>
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                  >
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                  </svg>
                </div>
                <span className="font-display text-xl font-medium">
                  Feathers Closet
                </span>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Premium fashion destination for the modern woman who values
                quality, style, and sophistication.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/shop-page"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Shop All
                  </a>
                </li>
                <li>
                  <a
                    href="/shop-page"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Handbags
                  </a>
                </li>
                <li>
                  <a
                    href="/shop-page"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Clothing
                  </a>
                </li>
                <li>
                  <a
                    href="/shop-page"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h3 className="font-semibold mb-4">Customer Care</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Size Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Returns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Pinterest
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/80 text-sm">
              © {new Date()?.getFullYear()} Feathers Closet. All rights
              reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
