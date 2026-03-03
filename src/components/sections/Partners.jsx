const categories = [
  {
    title: 'Public Companies',
    description: [
      'NYSE-listed fashion groups',
      'European publicly traded houses',
      'Global apparel corporations'
    ]
  },
  {
    title: 'Designer Brands',
    description: [
      'Contemporary fashion labels',
      'Boutique & atelier collections',
      'Independent designer brands'
    ]
  },
  {
    title: 'Major Retail Chains',
    description: [
      'Fortune 500 retailers',
      'Mass market chains',
      'Warehouse & off-price leaders'
    ]
  },
  {
    title: 'Sustainable Brands',
    description: [
      'Certified organic labels',
      'Eco-friendly collections',
      'B Corp certified brands'
    ]
  },
];

export default function Partners() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        {/* Transition Section */}
        <div className="text-center mb-20">
          {/* Top decorative line */}
          <div className="w-16 h-px bg-accent-black/20 mx-auto mb-8"></div>

          {/* Transition message */}
          <p className="font-serif text-2xl md:text-3xl text-accent-black mb-3">
            Serving 200+ Fashion Brands
          </p>
          <p className="text-gray-500 text-lg">
            Across 30+ Countries
          </p>

          {/* Bottom decorative line */}
          <div className="w-16 h-px bg-accent-black/20 mx-auto mt-8"></div>
        </div>

        {/* Main Content Area with different background */}
        <div className="bg-accent-warm/20 -mx-4 md:-mx-8 px-4 md:px-8 py-12 md:py-16 rounded-3xl">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-overline text-gray-400 mb-4 tracking-widest">Trusted Partners</p>
              <h2 className="heading-secondary mb-6">Trusted by Industry Leaders</h2>
              <p className="text-body text-gray-600">
                Serving diverse categories across the fashion industry, from public companies to emerging designer brands
              </p>
            </div>

            {/* Categories - 2x2 Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {categories.map((category) => (
                <div
                  key={category.title}
                  className="bg-white border border-accent-black/5 rounded-2xl p-8 h-full hover:border-accent-black/10 hover:shadow-md transition-all"
                >
                  {/* Yarn Icon */}
                  <div className="mb-5 flex justify-center">
                    <img
                      src="/yarn-icon.png"
                      alt=""
                      className="w-16 h-16 object-contain opacity-50"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-semibold text-accent-black mb-3 text-center tracking-wide">{category.title}</h3>
                  <div className="w-16 h-px bg-accent-black/30 mx-auto mb-5"></div>

                  {/* Description List */}
                  <ul className="space-y-3">
                    {category.description.map((item, i) => (
                      <li key={i} className="text-gray-600 text-sm text-center flex items-center justify-center gap-2">
                        <span className="text-accent-black text-base leading-none">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Stats */}
            <div className="text-center">
              <div className="bg-accent-black text-white px-6 py-4 md:px-12 md:py-6 rounded-full">
                <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl md:text-4xl font-bold">200+</span>
                    <span className="text-white/70 text-sm md:text-base">Brands</span>
                  </div>
                  <div className="hidden md:block w-px h-10 bg-white/15"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/90 text-sm md:text-base font-medium">Guaranteed Delivery</span>
                  </div>
                  <div className="hidden md:block w-px h-10 bg-white/15"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/90 text-sm md:text-base font-medium">Long-term Partnerships</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
