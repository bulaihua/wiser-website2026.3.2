import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navigation, servicesSubmenu, productsSubmenu, aboutSubmenu } from '../../data/companyData';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileSubmenus, setMobileSubmenus] = useState({});
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileSubmenus({});
  }, [location.pathname]);

  const handleDropdownEnter = (name) => {
    setOpenDropdown(name);
  };

  const handleDropdownLeave = () => {
    setOpenDropdown(null);
  };

  const toggleMobileSubmenu = (name) => {
    setMobileSubmenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const getSubmenu = (name) => {
    if (name === 'Products') return productsSubmenu;
    if (name === 'Our Services') return servicesSubmenu;
    if (name === 'About Us') return aboutSubmenu;
    return [];
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white border-b border-gray-100'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="Wiser Enterprise Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation - lg breakpoint (1024px+) */}
          <div className="hidden lg:flex items-center flex-1 justify-center">
            <div className="flex items-center gap-8">
              {navigation.map((item) => (
                item.hasDropdown ? (
                  <div
                    key={item.name}
                    className="relative dropdown-container"
                    onMouseEnter={() => handleDropdownEnter(item.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button className="text-[15px] font-semibold text-gray-700 hover:text-accent-black transition-colors flex items-center gap-1.5">
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute top-full left-0 right-0 flex justify-center mt-2">
                        <div className="bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden min-w-[200px]">
                          {getSubmenu(item.name).map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block px-5 py-3 text-[15px] text-gray-600 hover:text-accent-black hover:bg-gray-50 transition-colors whitespace-nowrap text-center"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-[15px] font-semibold text-gray-700 hover:text-accent-black transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Right Side - CTA (Desktop) */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/contact"
              className="text-[15px] font-semibold text-accent-black hover:text-gray-600 transition-colors px-5 py-2 border-2 border-accent-black rounded-full"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-accent-black" />
            ) : (
              <Menu className="w-6 h-6 text-accent-black" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="container-custom py-4">
            <div className="flex flex-col">
              {navigation.map((item) => (
                item.hasDropdown ? (
                  <div key={item.name} className="border-b border-gray-50">
                    <button
                      onClick={() => toggleMobileSubmenu(item.name)}
                      className="w-full text-left text-base text-accent-black hover:text-gray-600 transition-colors py-3 flex items-center justify-between"
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSubmenus[item.name] ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileSubmenus[item.name] && (
                      <div className="pl-4 pb-3">
                        {getSubmenu(item.name).map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block text-sm text-gray-600 hover:text-accent-black transition-colors py-2"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-base text-accent-black hover:text-gray-600 transition-colors py-3 border-b border-gray-50"
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Link
                to="/contact"
                className="block text-base text-accent-black font-medium py-3"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
