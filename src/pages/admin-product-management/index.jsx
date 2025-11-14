import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import StatsCards from "./components/StatsCards";
import ProductFilters from "./components/ProductFilters";
import BulkActions from "./components/BulkActions";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    priceRange: "",
    stockLevel: "",
  });

  // Mock product data
  const mockProducts = [
    {
      id: "1",
      name: "Elegant Leather Handbag",
      description: `Premium Italian leather handbag crafted with meticulous attention to detail.\nFeatures multiple compartments for organization and a timeless design that complements any outfit.\nPerfect for both professional and casual occasions.`,
      category: "Handbags",
      price: 299.99,
      comparePrice: 399.99,
      sku: "ELH-001",
      stock: 25,
      lowStockThreshold: 5,
      status: "active",
      image: "https://images.unsplash.com/photo-1702326626601-74d2e86922b4",
      imageAlt:
        "Elegant brown leather handbag with gold hardware displayed on white background",
      seoTitle: "Premium Italian Leather Handbag - Elegant Design",
      seoDescription:
        "Discover our premium Italian leather handbag featuring timeless design and superior craftsmanship. Perfect for modern women who value style and functionality.",
      tags: ["leather", "handbag", "premium", "italian"],
      createdAt: "2024-10-15T10:30:00Z",
      updatedAt: "2024-11-10T14:20:00Z",
    },
    {
      id: "2",
      name: "Vintage Crossbody Bag",
      description: `Stylish vintage-inspired crossbody bag perfect for everyday use.\nAdjustable strap and compact design make it ideal for hands-free convenience.\nCrafted from durable materials with vintage brass hardware.`,
      category: "Crossbody Bags",
      price: 89.99,
      comparePrice: null,
      sku: "VCB-002",
      stock: 3,
      lowStockThreshold: 5,
      status: "active",
      image: "https://images.unsplash.com/photo-1711113456820-639918258722",
      imageAlt:
        "Vintage brown crossbody bag with brass buckles worn by woman in casual outfit",
      seoTitle: "Vintage Crossbody Bag - Hands-Free Style",
      seoDescription:
        "Shop our vintage-inspired crossbody bag featuring adjustable strap and compact design. Perfect for modern women on the go.",
      tags: ["crossbody", "vintage", "casual", "everyday"],
      createdAt: "2024-10-20T09:15:00Z",
      updatedAt: "2024-11-08T16:45:00Z",
    },
    {
      id: "3",
      name: "Designer Evening Clutch",
      description: `Sophisticated evening clutch adorned with crystal embellishments.\nPerfect for formal events and special occasions.\nIncludes detachable chain strap for versatile styling options.`,
      category: "Clutches",
      price: 199.99,
      comparePrice: 249.99,
      sku: "DEC-003",
      stock: 15,
      lowStockThreshold: 3,
      status: "active",
      image: "https://images.unsplash.com/photo-1660695768053-af80309a7cfe",
      imageAlt:
        "Elegant black evening clutch with crystal embellishments and gold chain strap",
      seoTitle: "Designer Evening Clutch - Crystal Embellished",
      seoDescription:
        "Elevate your evening look with our designer clutch featuring crystal embellishments and detachable chain strap.",
      tags: ["clutch", "evening", "formal", "crystals"],
      createdAt: "2024-10-25T11:00:00Z",
      updatedAt: "2024-11-05T13:30:00Z",
    },
    {
      id: "4",
      name: "Casual Tote Bag",
      description: `Spacious canvas tote bag perfect for shopping and daily activities.\nEco-friendly materials and reinforced handles for durability.\nMinimalist design that pairs well with any casual outfit.`,
      category: "Tote Bags",
      price: 45.99,
      comparePrice: null,
      sku: "CTB-004",
      stock: 0,
      lowStockThreshold: 10,
      status: "out-of-stock",
      image: "https://images.unsplash.com/photo-1613848531944-a30f04f6679b",
      imageAlt:
        "Natural canvas tote bag with leather handles displayed flat on wooden surface",
      seoTitle: "Eco-Friendly Canvas Tote Bag - Casual Style",
      seoDescription:
        "Shop our eco-friendly canvas tote bag featuring reinforced handles and spacious design. Perfect for everyday use.",
      tags: ["tote", "canvas", "eco-friendly", "casual"],
      createdAt: "2024-11-01T08:45:00Z",
      updatedAt: "2024-11-12T10:15:00Z",
    },
    {
      id: "5",
      name: "Professional Laptop Bag",
      description: `Sleek laptop bag designed for the modern professional woman.\nPadded compartment fits laptops up to 15 inches.\nMultiple pockets for organization and premium vegan leather construction.`,
      category: "Backpacks",
      price: 159.99,
      comparePrice: 199.99,
      sku: "PLB-005",
      stock: 12,
      lowStockThreshold: 5,
      status: "active",
      image: "https://images.unsplash.com/photo-1522205969998-dceeeda5424a",
      imageAlt:
        "Black professional laptop bag with multiple compartments and shoulder strap",
      seoTitle: "Professional Laptop Bag - Vegan Leather",
      seoDescription:
        "Organize your work essentials with our professional laptop bag featuring padded compartment and vegan leather construction.",
      tags: ["laptop", "professional", "vegan-leather", "work"],
      createdAt: "2024-10-30T14:20:00Z",
      updatedAt: "2024-11-07T09:10:00Z",
    },
    {
      id: "6",
      name: "Bohemian Summer Dress",
      description: `Flowing bohemian dress perfect for summer occasions.\nLightweight fabric with beautiful floral print.\nComfortable fit with adjustable waist tie for flattering silhouette.`,
      category: "Dresses",
      price: 79.99,
      comparePrice: null,
      sku: "BSD-006",
      stock: 8,
      lowStockThreshold: 5,
      status: "inactive",
      image: "https://images.unsplash.com/photo-1678534955887-092b74e7772c",
      imageAlt:
        "Flowing bohemian dress with floral print worn by woman in garden setting",
      seoTitle: "Bohemian Summer Dress - Floral Print",
      seoDescription:
        "Embrace summer style with our bohemian dress featuring beautiful floral print and comfortable flowing fit.",
      tags: ["dress", "bohemian", "summer", "floral"],
      createdAt: "2024-10-18T16:30:00Z",
      updatedAt: "2024-11-03T12:00:00Z",
    },
  ];

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, searchTerm, filters]);

  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered?.filter(
        (product) =>
          product?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          product?.sku?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          product?.description
            ?.toLowerCase()
            ?.includes(searchTerm?.toLowerCase())
      );
    }

    // Category filter
    if (filters?.category) {
      filtered = filtered?.filter(
        (product) => product?.category === filters?.category
      );
    }

    // Status filter
    if (filters?.status) {
      filtered = filtered?.filter(
        (product) => product?.status === filters?.status
      );
    }

    // Price range filter
    if (filters?.priceRange) {
      filtered = filtered?.filter((product) => {
        const price = product?.price;
        switch (filters?.priceRange) {
          case "0-50":
            return price < 50;
          case "50-100":
            return price >= 50 && price < 100;
          case "100-200":
            return price >= 100 && price < 200;
          case "200-500":
            return price >= 200 && price < 500;
          case "500+":
            return price >= 500;
          default:
            return true;
        }
      });
    }

    // Stock level filter
    if (filters?.stockLevel) {
      filtered = filtered?.filter((product) => {
        switch (filters?.stockLevel) {
          case "in-stock":
            return product?.stock > product?.lowStockThreshold;
          case "low-stock":
            return (
              product?.stock > 0 && product?.stock <= product?.lowStockThreshold
            );
          case "out-of-stock":
            return product?.stock === 0 || product?.status === "out-of-stock";
          default:
            return true;
        }
      });
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSelectProduct = (productId, isSelected) => {
    if (isSelected) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts?.filter((id) => id !== productId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedProducts(filteredProducts?.map((p) => p?.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = (productId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      setProducts(products?.filter((p) => p?.id !== productId));
      setSelectedProducts(selectedProducts?.filter((id) => id !== productId));
    }
  };

  const handleStatusChange = (productId, newStatus) => {
    setProducts(
      products?.map((p) =>
        p?.id === productId
          ? { ...p, status: newStatus, updatedAt: new Date()?.toISOString() }
          : p
      )
    );
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      setProducts(
        products?.map((p) =>
          p?.id === editingProduct?.id
            ? { ...productData, id: editingProduct?.id }
            : p
        )
      );
    } else {
      setProducts([...products, productData]);
    }

    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleBulkStatusChange = (productIds, newStatus) => {
    setProducts(
      products?.map((p) =>
        productIds?.includes(p?.id)
          ? { ...p, status: newStatus, updatedAt: new Date()?.toISOString() }
          : p
      )
    );
    setSelectedProducts([]);
  };

  const handleBulkDelete = (productIds) => {
    setProducts(products?.filter((p) => !productIds?.includes(p?.id)));
    setSelectedProducts([]);
  };

  const handleBulkPriceUpdate = (productIds, priceUpdateData) => {
    setProducts(
      products?.map((p) => {
        if (!productIds?.includes(p?.id)) return p;

        let newPrice = p?.price;
        const value = parseFloat(priceUpdateData?.value);

        if (priceUpdateData?.type === "percentage") {
          if (priceUpdateData?.operation === "increase") {
            newPrice = p?.price * (1 + value / 100);
          } else {
            newPrice = p?.price * (1 - value / 100);
          }
        } else {
          if (priceUpdateData?.operation === "increase") {
            newPrice = p?.price + value;
          } else {
            newPrice = p?.price - value;
          }
        }

        return {
          ...p,
          price: Math.max(0, Math.round(newPrice * 100) / 100),
          updatedAt: new Date()?.toISOString(),
        };
      })
    );
    setSelectedProducts([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                <Link
                  to="/admin-dashboard"
                  className="hover:text-foreground transition-colors"
                >
                  Admin Dashboard
                </Link>
                <Icon name="ChevronRight" size={14} />
                <span>Product Management</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Product Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your product catalog, inventory, and pricing
              </p>
            </div>

            <Button
              onClick={() => {
                setEditingProduct(null);
                setShowProductForm(true);
              }}
              iconName="Plus"
              iconPosition="left"
              className="mt-4 sm:mt-0"
            >
              Add Product
            </Button>
          </div>

          {/* Stats Cards */}
          <StatsCards products={products} />

          {/* Filters */}
          <div className="mt-8">
            <ProductFilters
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              totalProducts={products?.length}
              filteredCount={filteredProducts?.length}
            />
          </div>

          {/* Bulk Actions */}
          <div className="mt-6">
            <BulkActions
              selectedProducts={selectedProducts}
              onBulkStatusChange={handleBulkStatusChange}
              onBulkDelete={handleBulkDelete}
              onBulkPriceUpdate={handleBulkPriceUpdate}
            />
          </div>

          {/* Products Table */}
          <div className="mt-6">
            {filteredProducts?.length > 0 ? (
              <ProductTable
                products={filteredProducts}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onStatusChange={handleStatusChange}
                selectedProducts={selectedProducts}
                onSelectProduct={handleSelectProduct}
                onSelectAll={handleSelectAll}
              />
            ) : (
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <Icon
                  name="Package"
                  size={48}
                  className="mx-auto text-muted-foreground mb-4"
                />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || Object.values(filters)?.some((f) => f)
                    ? "Try adjusting your search or filters to find products."
                    : "Get started by adding your first product to the catalog."}
                </p>
                {!searchTerm && !Object.values(filters)?.some((f) => f) && (
                  <Button
                    onClick={() => {
                      setEditingProduct(null);
                      setShowProductForm(true);
                    }}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add Your First Product
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Product Form Modal */}
      <ProductForm
        product={editingProduct}
        onSave={handleSaveProduct}
        onCancel={() => {
          setShowProductForm(false);
          setEditingProduct(null);
        }}
        isOpen={showProductForm}
      />
    </div>
  );
};

export default AdminProductManagement;
