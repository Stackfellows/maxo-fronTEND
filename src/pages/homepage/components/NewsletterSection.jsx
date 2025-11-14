import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const benefits = [
    {
      id: 1,
      icon: "Sparkles",
      text: "Exclusive styling tips & trends",
    },
    {
      id: 2,
      icon: "Tag",
      text: "Early access to sales & new arrivals",
    },
    {
      id: 3,
      icon: "Gift",
      text: "Special member-only offers",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-foreground mb-6">
              Join Our Style Community
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Get insider access to fashion tips, exclusive offers, and be the
              first to know about our latest collections. Join over 50,000
              style-conscious women.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits?.map((benefit) => (
                <motion.div
                  key={benefit?.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: benefit?.id * 0.1, duration: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon
                      name={benefit?.icon}
                      size={16}
                      className="text-primary"
                    />
                  </div>
                  <span className="text-foreground font-medium">
                    {benefit?.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {!isSubscribed ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e?.target?.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="px-8 whitespace-nowrap"
                  >
                    Subscribe Now
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg"
                >
                  <Icon name="CheckCircle" size={20} className="text-success" />
                  <span className="text-success font-medium">
                    Thank you for subscribing! Check your email for styling
                    tips.
                  </span>
                </motion.div>
              )}

              <p className="text-xs text-muted-foreground mt-3">
                By subscribing, you agree to our Privacy Policy. Unsubscribe at
                any time.
              </p>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-floating">
              <Image
                src="https://images.unsplash.com/photo-1601326374180-e118ac4f7af4"
                alt="Stylish woman in elegant outfit reading fashion magazine in modern apartment with natural lighting"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-elegant"
            >
              <Icon name="Mail" size={24} className="text-accent-foreground" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-6 -left-6 w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-elegant"
            >
              <Icon
                name="Heart"
                size={28}
                className="text-secondary-foreground"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
