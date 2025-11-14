import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const ProductForm = ({ product, onSave, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    comparePrice: "",
    sku: "",
    stock: "",
    lowStockThreshold: "",
    status: "active",
    images: [],
    variants: [],
    seoTitle: "",
    seoDescription: "",
    tags: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  const categories = [
    "Handbags",
    "Shoulder Bags",
    "Clutches",
    "Tote Bags",
    "Crossbody Bags",
    "Backpacks",
    "Dresses",
    "Tops",
    "Bottoms",
    "Outerwear",
    "Accessories",
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product?.name || "",
        description: product?.description || "",
        category: product?.category || "",
        price: product?.price?.toString() || "",
        comparePrice: product?.comparePrice?.toString() || "",
        sku: product?.sku || "",
        stock: product?.stock?.toString() || "",
        lowStockThreshold: product?.lowStockThreshold?.toString() || "5",
        status: product?.status || "active",
        images: product?.images || [],
        variants: product?.variants || [],
        seoTitle: product?.seoTitle || "",
        seoDescription: product?.seoDescription || "",
        tags: product?.tags?.join(", ") || "",
      });
      setImagePreview(product?.image || "");
    } else {
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        comparePrice: "",
        sku: "",
        stock: "",
        lowStockThreshold: "5",
        status: "active",
        images: [],
        variants: [],
        seoTitle: "",
        seoDescription: "",
        tags: "",
      });
      setImagePreview("");
    }
    setErrors({});
  }, [product, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e?.target?.result);
        setFormData((prev) => ({
          ...prev,
          images: [e?.target?.result, ...prev?.images?.slice(1)],
        }));
      };
      reader?.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) newErrors.name = "Product name is required";
    if (!formData?.category) newErrors.category = "Category is required";
    if (!formData?.price || parseFloat(formData?.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!formData?.sku?.trim()) newErrors.sku = "SKU is required";
    if (!formData?.stock || parseInt(formData?.stock) < 0)
      newErrors.stock = "Valid stock quantity is required";

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    const productData = {
      ...formData,
      price: parseFloat(formData?.price),
      comparePrice: formData?.comparePrice
        ? parseFloat(formData?.comparePrice)
        : null,
      stock: parseInt(formData?.stock),
      lowStockThreshold: parseInt(formData?.lowStockThreshold),
      tags: formData?.tags
        ?.split(",")
        ?.map((tag) => tag?.trim())
        ?.filter((tag) => tag),
      image: imagePreview,
      imageAlt: `${formData?.name} - ${formData?.category} product image showing elegant design`,
      id: product?.id || Date.now()?.toString(),
      createdAt: product?.createdAt || new Date()?.toISOString(),
      updatedAt: new Date()?.toISOString(),
    };

    onSave(productData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-elegant max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Basic Information
              </h3>

              <Input
                label="Product Name"
                type="text"
                value={formData?.name}
                onChange={(e) => handleInputChange("name", e?.target?.value)}
                error={errors?.name}
                required
                placeholder="Enter product name"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={formData?.description}
                  onChange={(e) =>
                    handleInputChange("description", e?.target?.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                  placeholder="Enter product description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <select
                  value={formData?.category}
                  onChange={(e) =>
                    handleInputChange("category", e?.target?.value)
                  }
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  {categories?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors?.category && (
                  <p className="text-error text-sm mt-1">{errors?.category}</p>
                )}
              </div>

              <Input
                label="SKU"
                type="text"
                value={formData?.sku}
                onChange={(e) => handleInputChange("sku", e?.target?.value)}
                error={errors?.sku}
                required
                placeholder="Enter SKU"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Product Image
              </h3>

              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={imagePreview}
                        alt="Product preview showing uploaded image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                    >
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Icon
                      name="Upload"
                      size={48}
                      className="mx-auto text-muted-foreground"
                    />
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                      >
                        Upload Image
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label="Price ($)"
              type="number"
              step="0.01"
              value={formData?.price}
              onChange={(e) => handleInputChange("price", e?.target?.value)}
              error={errors?.price}
              required
              placeholder="0.00"
            />

            <Input
              label="Compare Price ($)"
              type="number"
              step="0.01"
              value={formData?.comparePrice}
              onChange={(e) =>
                handleInputChange("comparePrice", e?.target?.value)
              }
              placeholder="0.00"
            />

            <Input
              label="Stock Quantity"
              type="number"
              value={formData?.stock}
              onChange={(e) => handleInputChange("stock", e?.target?.value)}
              error={errors?.stock}
              required
              placeholder="0"
            />

            <Input
              label="Low Stock Alert"
              type="number"
              value={formData?.lowStockThreshold}
              onChange={(e) =>
                handleInputChange("lowStockThreshold", e?.target?.value)
              }
              placeholder="5"
            />
          </div>

          {/* SEO & Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              SEO & Settings
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                label="SEO Title"
                type="text"
                value={formData?.seoTitle}
                onChange={(e) =>
                  handleInputChange("seoTitle", e?.target?.value)
                }
                placeholder="SEO optimized title"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  value={formData?.status}
                  onChange={(e) =>
                    handleInputChange("status", e?.target?.value)
                  }
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                SEO Description
              </label>
              <textarea
                value={formData?.seoDescription}
                onChange={(e) =>
                  handleInputChange("seoDescription", e?.target?.value)
                }
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                placeholder="SEO meta description"
              />
            </div>

            <Input
              label="Tags"
              type="text"
              value={formData?.tags}
              onChange={(e) => handleInputChange("tags", e?.target?.value)}
              placeholder="fashion, bags, luxury (comma separated)"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              {product ? "Update Product" : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
