import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { productCategories } from '../../data/productsData';

export default function ProductShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="product-showcase" ref={ref} className="py-24 bg-white scroll-mt-32">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-overline mb-4">Our Expertise</p>
          <h2 className="heading-secondary mb-6">Product Showcase</h2>
          <p className="text-body text-gray-600">
            From concept to creation, we deliver exceptional products
            that meet the highest standards of quality and design.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCategories.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link
                to={`/product/${product.id}`}
                className="block group"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-gray-100 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-accent-black/0 group-hover:bg-accent-black/20 transition-colors duration-300"></div>
                  {/* Category Label */}
                  <div className="absolute top-3 left-3">
                    <span className="text-overline text-xs text-white/90 drop-shadow-md bg-black/30 px-2 py-1 rounded">
                      {product.name}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-lg text-accent-black mb-2 group-hover:text-gray-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {product.features.slice(0, 3).map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs text-gray-500 px-2 py-1 border border-gray-200 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* View More Link */}
                <div className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-accent-black transition-colors">
                  <span>View Gallery</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
