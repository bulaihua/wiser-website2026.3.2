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
        <div className="flex items-center justify-between mb-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-accent-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
          <h1 className="heading-secondary">{product.title}</h1>
          <div className="w-32"></div>
        </div>

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="mb-20">
            {/* Main Image */}
            <div className="relative max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative w-full aspect-[4/5]">
                <img
                  src={selectedImage}
                  alt={`${product.title} gallery`}
                  className="w-full h-full object-contain transition-opacity duration-300"
                  key={selectedIndex}
                />
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-lg border border-gray-100 transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center shadow-lg border border-gray-100 transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-4 justify-center scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all bg-gray-50 ${
                      selectedIndex === index
                        ? 'border-accent-black shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} thumbnail`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="text-center p-12 md:p-16 bg-gray-50 rounded-2xl border border-gray-100">
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
        </div>
      </div>
    </div>
  );
}
