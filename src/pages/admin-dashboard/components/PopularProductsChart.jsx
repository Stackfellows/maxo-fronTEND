import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Image from "../../../components/AppImage";

const PopularProductsChart = () => {
  const productData = [
    {
      name: "Leather Handbag",
      sales: 145,
      revenue: 21750,
      image: "https://images.unsplash.com/photo-1702326626601-74d2e86922b4",
      imageAlt:
        "Elegant brown leather handbag with gold hardware on white background",
    },
    {
      name: "Silk Dress",
      sales: 132,
      revenue: 19800,
      image: "https://images.unsplash.com/photo-1523979038242-a9326b4c8463",
      imageAlt: "Flowing navy blue silk dress on mannequin in boutique setting",
    },
    {
      name: "Designer Clutch",
      sales: 98,
      revenue: 14700,
      image: "https://images.unsplash.com/photo-1601281866896-1576541e77a1",
      imageAlt:
        "Metallic gold designer clutch purse with chain strap on marble surface",
    },
    {
      name: "Wool Coat",
      sales: 87,
      revenue: 26100,
      image: "https://images.unsplash.com/photo-1722858958066-97deb3471c89",
      imageAlt: "Elegant camel-colored wool coat hanging on wooden hanger",
    },
    {
      name: "Crossbody Bag",
      sales: 76,
      revenue: 11400,
      image: "https://images.unsplash.com/photo-1620786514663-8c3f57ffe17c",
      imageAlt:
        "Compact black crossbody bag with adjustable strap on neutral background",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elegant">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Popular Products
        </h3>
        <p className="text-sm text-muted-foreground">
          Top selling items this month
        </p>
      </div>
      <div className="h-80 mb-6" aria-label="Popular Products Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={productData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="name"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />

            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                color: "var(--color-foreground)",
              }}
            />

            <Bar
              dataKey="sales"
              fill="var(--color-accent)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {productData?.slice(0, 3)?.map((product, index) => (
          <div
            key={product?.name}
            className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
              <Image
                src={product?.image}
                alt={product?.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground">
                {product?.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {product?.sales} units sold
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">
                ${product?.revenue?.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Revenue</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProductsChart;
