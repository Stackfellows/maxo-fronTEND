import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const TrustSignals = () => {
  const trustFeatures = [
    {
      id: 1,
      icon: "Shield",
      title: "Secure Shopping",
      description: "SSL encrypted checkout with secure payment processing",
    },
    {
      id: 2,
      icon: "Truck",
      title: "Free Shipping",
      description: "Complimentary shipping on orders over $150",
    },
    {
      id: 3,
      icon: "RotateCcw",
      title: "Easy Returns",
      description: "30-day hassle-free return policy",
    },
    {
      id: 4,
      icon: "Award",
      title: "Quality Guarantee",
      description: "Premium materials with lifetime craftsmanship warranty",
    },
  ];

  const testimonialStats = [
    {
      id: 1,
      number: "50K+",
      label: "Happy Customers",
      description: "Women who trust our quality",
    },
    {
      id: 2,
      number: "4.9",
      label: "Average Rating",
      description: "Based on 12,000+ reviews",
    },
    {
      id: 3,
      number: "98%",
      label: "Satisfaction Rate",
      description: "Customer happiness guarantee",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Trust Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16"
        >
          {trustFeatures?.map((feature) => (
            <motion.div
              key={feature?.id}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-premium">
                <Icon name={feature?.icon} size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature?.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature?.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Stats */}
        <div className="bg-muted/50 rounded-2xl p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-display font-medium text-foreground mb-4">
              Trusted by Women Worldwide
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made Feathers
              Closet their go-to destination for premium fashion
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonialStats?.map((stat) => (
              <motion.div
                key={stat?.id}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-semibold text-primary mb-2">
                  {stat?.number}
                </div>
                <div className="text-lg font-medium text-foreground mb-1">
                  {stat?.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat?.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Security Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-6 mt-12 pt-8 border-t border-border"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Shield" size={16} />
            <span className="text-sm font-medium">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="CreditCard" size={16} />
            <span className="text-sm font-medium">Secure Payments</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Lock" size={16} />
            <span className="text-sm font-medium">Privacy Protected</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Verified Store</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignals;
