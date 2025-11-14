import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Home", path: "/homepage", icon: "Home" },
    { name: "Shop", path: "/shop-page", icon: "ShoppingBag" },
    { name: "Cart", path: "/cart-page", icon: "ShoppingCart" },
    { name: "Admin", path: "/admin-dashboard", icon: "Settings" },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center transition-elegant group-hover:bg-secondary">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                <path
                  d="M12 16L13.09 22.26L22 23L13.09 23.74L12 30L10.91 23.74L2 23L10.91 22.26L12 16Z"
                  opacity="0.6"
                />
              </svg>
            </div>
            <span className="font-display text-xl font-medium text-foreground gradient-text">
              Maxo Premium fashion
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.slice(0, 3)?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-elegant ${
                  isActivePath(item?.path)
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="Search" size={20} />
              </Button>

              {isSearchOpen && (
                <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-lg shadow-elegant p-4 animate-fade-in">
                  <div className="relative">
                    <Icon
                      name="Search"
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Heart" size={20} />
            </Button>

            {/* User Account */}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="User" size={20} />
            </Button>

            {/* Admin Access */}
            <Link to="/admin-dashboard">
              <Button
                variant="outline"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="Settings" size={16} />
                <span className="ml-2">Admin</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-slide-in">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="relative mb-6">
                <Icon
                  name="Search"
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-elegant ${
                      isActivePath(item?.path)
                        ? "text-primary bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="pt-6 border-t border-border space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                >
                  <Icon name="Heart" size={20} />
                  <span className="ml-3">Wishlist</span>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                >
                  <Icon name="User" size={20} />
                  <span className="ml-3">Account</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Search Overlay for Mobile */}
      {isSearchOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
