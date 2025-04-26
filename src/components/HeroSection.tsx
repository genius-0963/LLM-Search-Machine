import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen bg-gray-100 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Hero background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Elevate Your <span className="text-primary-500">Lifestyle</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Discover premium products that combine quality, innovation, and style. Shop the latest trends and timeless classics.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/shop" 
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/categories" 
              className="bg-transparent hover:bg-white/10 text-white border border-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="w-1 h-10 rounded-full bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-white animate-scroll"></div>
        </div>
        <span className="text-white text-xs mt-2">Scroll Down</span>
      </div>
    </section>
  );
};

export default HeroSection;