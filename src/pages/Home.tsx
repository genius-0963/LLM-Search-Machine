import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import CategorySection from '../components/CategorySection';
import Newsletter from '../components/Newsletter';

const Home: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      
      {/* Promotional Banner */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Summer Sale</h2>
              <p className="text-gray-300 mb-6">
                Enjoy up to 50% off on selected items. Limited time offer.
              </p>
              <a 
                href="/shop" 
                className="inline-block bg-white text-gray-900 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Shop the Sale
              </a>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Summer Sale" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <Newsletter />
    </main>
  );
};

export default Home;