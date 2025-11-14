import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from "./pages/admin-dashboard";
import AdminProductManagement from "./pages/admin-product-management";
import ProductDetailsPage from "./pages/product-details-page";
import ShopPage from "./pages/shop-page";
import CartPage from "./pages/cart-page";
import Homepage from "./pages/homepage";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<Homepage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin-product-management"
            element={<AdminProductManagement />}
          />
          <Route
            path="/product-details-page"
            element={<ProductDetailsPage />}
          />
          <Route path="/shop-page" element={<ShopPage />} />
          <Route path="/cart-page" element={<CartPage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
