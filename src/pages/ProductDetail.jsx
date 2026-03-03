import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { getProductById } from '../data/productsData';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!product) {
    return (
      <div className="pt-36 text-center">
        <p>Product not found</p>
        <Link to="/products" className="btn-primary mt-4 inline-block">Back to Products</Link>
      </div>
    );
  }

  const images = product.gallery || [];
  const selectedImage = images[selectedIndex];

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-accent-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
          <h1 className="heading-secondary">{product.title}</h1>
          <div className="w-32"></div>
        </motion.div>

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="mb-20">
            {/* Main Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="relative max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="relative w-full aspect-[4/5]">
                  <img
                    src={selectedImage}
                    alt={`${product.title} gallery`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-lg border border-gray-100 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-lg border border-gray-100 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

              </motion.div>
            </AnimatePresence>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide justify-center">
                {images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all bg-gray-50 ${
                      selectedIndex === index
                        ? 'border-accent-black shadow-md ring-2 ring-accent-black/20'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} thumbnail`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center p-16 bg-gray-50 rounded-2xl border border-gray-100"
        >
          <h2 className="heading-tertiary mb-3">Interested in this category?</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Contact us to discuss your requirements and get a customized quote.
          </p>
          <Link
            to="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
