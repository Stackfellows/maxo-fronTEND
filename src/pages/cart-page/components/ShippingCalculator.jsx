import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";

const ShippingCalculator = ({ onShippingUpdate }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
  ];

  const usStates = [
    { value: "ca", label: "California" },
    { value: "ny", label: "New York" },
    { value: "tx", label: "Texas" },
    { value: "fl", label: "Florida" },
    { value: "il", label: "Illinois" },
  ];

  const calculateShipping = async () => {
    if (!selectedCountry || !zipCode) return;

    setIsCalculating(true);

    // Mock shipping calculation
    setTimeout(() => {
      const mockOptions = [
        {
          id: "standard",
          name: "Standard Shipping",
          description: "5-7 business days",
          price: selectedCountry === "us" ? 5.99 : 12.99,
          estimatedDays: "5-7",
        },
        {
          id: "express",
          name: "Express Shipping",
          description: "2-3 business days",
          price: selectedCountry === "us" ? 12.99 : 24.99,
          estimatedDays: "2-3",
        },
        {
          id: "overnight",
          name: "Overnight Shipping",
          description: "Next business day",
          price: selectedCountry === "us" ? 24.99 : 39.99,
          estimatedDays: "1",
        },
      ];

      setShippingOptions(mockOptions);
      setIsCalculating(false);
    }, 1000);
  };

  const selectShippingOption = (option) => {
    onShippingUpdate(option);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 shadow-elegant">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Truck" size={20} className="text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">
          Shipping Calculator
        </h3>
      </div>
      <div className="space-y-4">
        {/* Country Selection */}
        <Select
          label="Country"
          options={countries}
          value={selectedCountry}
          onChange={setSelectedCountry}
          placeholder="Select country"
        />

        {/* State Selection (US only) */}
        {selectedCountry === "us" && (
          <Select
            label="State"
            options={usStates}
            value={selectedState}
            onChange={setSelectedState}
            placeholder="Select state"
          />
        )}

        {/* ZIP Code */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            ZIP / Postal Code
          </label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e?.target?.value)}
            placeholder="Enter ZIP code"
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>

        {/* Calculate Button */}
        <Button
          variant="outline"
          fullWidth
          onClick={calculateShipping}
          disabled={!selectedCountry || !zipCode}
          loading={isCalculating}
        >
          <Icon name="Calculator" size={16} />
          <span className="ml-2">Calculate Shipping</span>
        </Button>

        {/* Shipping Options */}
        {shippingOptions?.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              Available Options:
            </h4>
            {shippingOptions?.map((option) => (
              <div
                key={option?.id}
                className="border border-border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-elegant"
                onClick={() => selectShippingOption(option)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-foreground text-sm">
                      {option?.name}
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      {option?.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-foreground">
                      ${option?.price?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Free Shipping Notice */}
        <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center text-sm text-success">
            <Icon name="Truck" size={14} className="mr-2" />
            <span>Free shipping on orders over $75</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingCalculator;
