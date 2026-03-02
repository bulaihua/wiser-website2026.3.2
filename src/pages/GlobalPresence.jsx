import { motion } from 'framer-motion';
import { MapPin, Shield, Users, Factory, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icon for active/inactive locations
const createCustomIcon = (isActive) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        position: relative;
        width: ${isActive ? '40px' : '32px'};
        height: ${isActive ? '40px' : '32px'};
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="
          font-size: ${isActive ? '32px' : '24px'};
          line-height: 1;
          filter: ${isActive ? 'drop-shadow(0 2px 4px rgba(239, 68, 68, 0.4))' : 'none'};
          animation: ${isActive ? 'bounce 1s infinite' : 'none'};
        ">📍</span>
      </div>
      <style>
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      </style>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
};

// Factory locations with coordinates
const factoryLocations = [
  {
    id: 'china',
    name: 'China',
    subtitle: 'Headquarters & Primary Hub',
    position: [31.2304, 120.5431], // Shanghai/Jiangsu area
    stats: [
      { value: '2006', label: 'Established' },
      { value: '12', label: 'Facilities' },
      { value: '5M+', label: 'Pieces/Year' },
      { value: '800+', label: 'Workers' },
    ],
    description: 'Our foundation since 2006. China remains our headquarters with 2 owned factories and 10 partner facilities, offering unmatched expertise in premium knitwear and complex constructions.',
    highlights: ['Premium Cashmere', 'Intarsia & Jacquard', 'Fully Fashioned', 'Hand-finishing'],
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    subtitle: 'Southeast Asia Hub',
    position: [10.8231, 106.6297], // Hanoi area
    stats: [
      { value: '2014', label: 'Since' },
      { value: '2', label: 'Facilities' },
      { value: '1.5M+', label: 'Pieces/Year' },
      { value: '2', label: 'PVH Certified' },
    ],
    description: 'Our first Southeast Asia expansion, featuring modern facilities specializing in full-package knitwear production with preferential EU and US market access.',
    highlights: ['Full Package Production', 'Skilled Workforce', 'Tariff Benefits', 'Modern Equipment'],
  },
  {
    id: 'bangladesh',
    name: 'Bangladesh',
    subtitle: 'Woven Specialist',
    position: [23.8103, 90.4125], // Dhaka
    stats: [
      { value: '2016', label: 'Since' },
      { value: '1', label: 'Facility' },
      { value: '1M+', label: 'Pieces/Year' },
      { value: '1', label: 'PVH Certified' },
    ],
    description: 'Large-scale woven garment production with competitive pricing and growing capacity for volume orders.',
    highlights: ['Woven Garments', 'Large Scale', 'Competitive Pricing', 'Growing Capacity'],
  },
  {
    id: 'cambodia',
    name: 'Cambodia',
    subtitle: 'Sweater Production',
    position: [11.5564, 104.9282], // Phnom Penh
    stats: [
      { value: '2018', label: 'Since' },
      { value: '1', label: 'Facility' },
      { value: '500K+', label: 'Pieces/Year' },
      { value: '1', label: 'PVH Certified' },
    ],
    description: 'Specializing in sweater production with excellent trade access to key markets and room for expansion.',
    highlights: ['Sweater Production', 'Trade Access', 'Growing Capacity', 'Cost Efficient'],
  },
];

const LocationCard = ({ location, onExpand, isExpanded, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`border overflow-hidden transition-all duration-300 ${
        isActive ? 'border-accent-black' : 'border-gray-200'
      }`}
    >
      <button
        onClick={() => onExpand(location.id)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
      >
        <div className="text-left">
          <h3 className="font-display text-xl text-accent-black flex items-center gap-2">
            {location.name}
            {isActive && <span className="w-2 h-2 bg-accent-black rounded-full"></span>}
          </h3>
          <p className="text-sm text-gray-500">{location.subtitle}</p>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-gray-200"
        >
          <div className="p-6">
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{location.description}</p>

            <div className="flex flex-wrap gap-2">
              {location.highlights.map((highlight, i) => (
                <span key={i} className="text-xs px-3 py-1 bg-gray-100 text-accent-black">
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default function GlobalPresence() {
  const [activeLocation, setActiveLocation] = useState('china');
  const [expandedCard, setExpandedCard] = useState('china');

  return (
    <div className="pt-36 pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="heading-secondary mb-6">Global Presence</h1>
          <p className="text-body text-gray-600">
            Strategic manufacturing locations across China and Southeast Asia deliver
            quality production, risk diversification, and competitive advantages.
          </p>
        </motion.div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center mb-10">
          <div className="w-16 h-px bg-accent-black/20"></div>
        </div>

        {/* Strategic Advantages - MOVED TO FRONT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <p className="text-overline text-gray-400 mb-3 tracking-widest">Why It Matters</p>
            <h2 className="heading-secondary">Strategic Advantages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Our multi-country presence delivers tangible benefits to our partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Risk Diversification',
                description: 'Production spread across multiple countries reduces supply chain disruption risks from trade issues, natural disasters, or regional challenges.',
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                title: 'Tariff Optimization',
                description: 'Leverage preferential trade agreements and tariff structures across China, Vietnam, and Cambodia for optimal landed costs.',
              },
              {
                icon: <Factory className="w-6 h-6" />,
                title: 'Flexible Sourcing',
                description: 'Allocate production across locations based on capacity availability, specialization, and your specific market requirements.',
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: 'Quality Consistency',
                description: 'Standardized processes and management systems ensure consistent quality across all facilities, regardless of location.',
              },
            ].map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                className="flex gap-4 p-6 border border-gray-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent-black rounded-full flex items-center justify-center text-white">
                    {advantage.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg text-accent-black mb-2">{advantage.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{advantage.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center mb-10">
          <div className="w-16 h-px bg-accent-black/20"></div>
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { value: '4', label: 'Countries', icon: <MapPin className="w-5 h-5" /> },
            { value: '16+', label: 'Facilities', icon: <Factory className="w-5 h-5" /> },
            { value: '8M+', label: 'Annual Capacity', icon: <Users className="w-5 h-5" /> },
            { value: '4', label: 'PVH Certified', icon: <Shield className="w-5 h-5" /> },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 border border-gray-200 bg-accent-warm">
              <div className="w-12 h-12 bg-accent-black rounded-full flex items-center justify-center text-white mx-auto mb-3">
                {stat.icon}
              </div>
              <p className="font-display text-3xl text-accent-black mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center mb-10">
          <div className="w-16 h-px bg-accent-black/20"></div>
        </div>

        {/* Interactive Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[2/1] rounded-lg overflow-hidden border border-gray-200">
              <MapContainer
                center={[25, 105]}
                zoom={3}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                attributionControl={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {factoryLocations.map((location) => (
                  <Marker
                    key={location.id}
                    position={location.position}
                    icon={createCustomIcon(activeLocation === location.id)}
                    eventHandlers={{
                      click: () => {
                        setActiveLocation(location.id);
                        setExpandedCard(location.id);
                      },
                    }}
                  >
                    <Popup>
                      <div className="text-center p-2">
                        <h3 className="font-display font-bold text-accent-black">{location.name}</h3>
                        <p className="text-xs text-gray-500">{location.subtitle}</p>
                        <p className="text-xs text-gray-600 mt-1">{location.stats[2].value} pieces/year</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Location selector below map */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {factoryLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => {
                    setActiveLocation(location.id);
                    setExpandedCard(location.id);
                  }}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    activeLocation === location.id
                      ? 'bg-accent-black text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {location.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center mb-10">
          <div className="w-16 h-px bg-accent-black/20"></div>
        </div>

        {/* Simplified Location Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="text-center mb-12">
            <p className="text-overline text-gray-400 mb-3 tracking-widest">Locations</p>
            <h2 className="heading-secondary">Our Facilities</h2>
          </div>
          <div className="space-y-4">
            {factoryLocations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onExpand={(id) => {
                  setActiveLocation(id);
                  setExpandedCard(id);
                }}
                isExpanded={expandedCard === location.id}
                isActive={activeLocation === location.id}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center p-12 bg-accent-black text-white"
        >
          <h2 className="heading-tertiary mb-4 text-white">Visit Our Facilities</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Experience our manufacturing capabilities firsthand. We'd be happy to arrange
            a facility tour at any of our locations.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-accent-black px-8 py-4 font-medium hover:bg-gray-100 transition-colors"
          >
            Schedule a Visit
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
