import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const SizeGuideModal = ({ isOpen, onClose, category }) => {
  if (!isOpen) return null;

  const sizeCharts = {
    bags: {
      title: "Bag Size Guide",
      description: "Find the perfect bag size for your needs",
      sizes: [
        {
          size: "Mini",
          dimensions: '6" x 4" x 2"',
          description: "Perfect for essentials like phone, cards, and keys",
        },
        {
          size: "Small",
          dimensions: '8" x 6" x 3"',
          description: "Ideal for daily essentials and small items",
        },
        {
          size: "Medium",
          dimensions: '12" x 9" x 4"',
          description: "Great for work, shopping, and everyday use",
        },
        {
          size: "Large",
          dimensions: '16" x 12" x 6"',
          description: "Spacious for travel, work, and carrying more items",
        },
        {
          size: "Extra Large",
          dimensions: '20" x 15" x 8"',
          description:
            "Perfect for travel, gym, or when you need maximum space",
        },
      ],
    },
    clothing: {
      title: "Clothing Size Guide",
      description: "Use these measurements to find your perfect fit",
      sizes: [
        { size: "XS", bust: '32"', waist: '24"', hips: '34"' },
        { size: "S", bust: '34"', waist: '26"', hips: '36"' },
        { size: "M", bust: '36"', waist: '28"', hips: '38"' },
        { size: "L", bust: '38"', waist: '30"', hips: '40"' },
        { size: "XL", bust: '40"', waist: '32"', hips: '42"' },
        { size: "XXL", bust: '42"', waist: '34"', hips: '44"' },
      ],
    },
  };

  const currentChart = sizeCharts?.[category] || sizeCharts?.bags;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-floating max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-display font-medium text-foreground">
            {currentChart?.title}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-muted-foreground">{currentChart?.description}</p>

          {/* Measurement Tips */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Info" size={16} className="text-primary" />
              <span>How to Measure</span>
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              {category === "clothing" ? (
                <>
                  <p>
                    <strong>Bust:</strong> Measure around the fullest part of
                    your chest
                  </p>
                  <p>
                    <strong>Waist:</strong> Measure around the narrowest part of
                    your waist
                  </p>
                  <p>
                    <strong>Hips:</strong> Measure around the fullest part of
                    your hips
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Length:</strong> Measured from left to right at the
                    widest point
                  </p>
                  <p>
                    <strong>Height:</strong> Measured from bottom to top at the
                    tallest point
                  </p>
                  <p>
                    <strong>Depth:</strong> Measured from front to back at the
                    deepest point
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Size Chart */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">
                    Size
                  </th>
                  {category === "clothing" ? (
                    <>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Bust
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Waist
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Hips
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Dimensions
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">
                        Best For
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentChart?.sizes?.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="py-3 px-4 font-medium text-foreground">
                      {item?.size}
                    </td>
                    {category === "clothing" ? (
                      <>
                        <td className="py-3 px-4 text-muted-foreground">
                          {item?.bust}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {item?.waist}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {item?.hips}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-4 text-muted-foreground">
                          {item?.dimensions}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground text-sm">
                          {item?.description}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fit Tips */}
          <div className="bg-surface rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Lightbulb" size={16} className="text-accent" />
              <span>Fit Tips</span>
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • If you're between sizes, we recommend sizing up for a more
                comfortable fit
              </p>
              <p>
                • Consider the intended use - size up for layering or a relaxed
                fit
              </p>
              <p>• Check the product description for specific fit notes</p>
              <p>
                • Contact our customer service team if you need personalized
                sizing advice
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            <Icon name="MessageCircle" size={16} />
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
