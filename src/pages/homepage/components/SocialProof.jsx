import React from "react";
import { motion } from "framer-motion";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const SocialProof = () => {
  const customerPhotos = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      imageAlt:
        "Professional woman with blonde hair wearing elegant black blazer smiling confidently",
      name: "Sarah M.",
      product: "Luxe Leather Tote",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1681811512700-8a7062e635bc",
      imageAlt:
        "Young professional woman with dark hair in navy dress holding designer handbag",
      name: "Emma L.",
      product: "Silk Wrap Dress",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1607624333627-98090c0992c6",
      imageAlt:
        "Elegant woman with curly hair wearing cream colored coat in urban setting",
      name: "Jessica R.",
      product: "Cashmere Blazer",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1671639334587-1fa8b5b463ce",
      imageAlt:
        "Sophisticated woman with brown hair in professional attire holding luxury clutch bag",
      name: "Maria K.",
      product: "Pearl Chain Clutch",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1583598680403-26a7ab6e50b5",
      imageAlt:
        "Confident woman with red hair wearing stylish winter coat in city environment",
      name: "Anna T.",
      product: "Winter Collection",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1639851019794-e50127767ad4",
      imageAlt:
        "Young woman with long dark hair in elegant evening wear with statement jewelry",
      name: "Olivia C.",
      product: "Evening Collection",
    },
  ];

  const testimonials = [
    {
      id: 1,
      text: "The quality is exceptional and the style is exactly what I was looking for. Feathers Closet has become my go-to for elegant pieces.",
      author: "Rachel Thompson",
      rating: 5,
      verified: true,
    },
    {
      id: 2,
      text: "Fast shipping, beautiful packaging, and the dress fits perfectly. I've already ordered two more items!",
      author: "Michelle Davis",
      rating: 5,
      verified: true,
    },
    {
      id: 3,
      text: "Love the attention to detail and the sophisticated designs. These pieces make me feel confident and stylish.",
      author: "Jennifer Wilson",
      rating: 5,
      verified: true,
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
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-foreground mb-4">
            Loved by Women Everywhere
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our customers style their Feathers Closet pieces and read
            their experiences
          </p>
        </motion.div>

        {/* Customer Photos Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          {customerPhotos?.map((photo) => (
            <motion.div
              key={photo?.id}
              variants={itemVariants}
              className="group relative aspect-square overflow-hidden rounded-lg bg-card shadow-elegant hover:shadow-floating transition-premium"
            >
              <Image
                src={photo?.image}
                alt={photo?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-premium"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-elegant flex items-end">
                <div className="p-3 text-white">
                  <div className="text-sm font-medium">{photo?.name}</div>
                  <div className="text-xs text-white/80">{photo?.product}</div>
                </div>
              </div>

              {/* Instagram Icon */}
              <div className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-elegant">
                <Icon name="Instagram" size={14} className="text-gray-800" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials?.map((testimonial) => (
            <motion.div
              key={testimonial?.id}
              variants={itemVariants}
              className="bg-card p-6 rounded-lg shadow-elegant"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={16}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground mb-4 leading-relaxed">
                "{testimonial?.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="font-medium text-foreground">
                  {testimonial?.author}
                </div>
                {testimonial?.verified && (
                  <div className="flex items-center gap-1 text-success text-sm">
                    <Icon name="CheckCircle" size={14} />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Media CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Share your style with{" "}
            <span className="font-medium text-primary">#FeathersCloset</span>
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Icon name="Instagram" size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Icon name="Facebook" size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Icon name="Twitter" size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
