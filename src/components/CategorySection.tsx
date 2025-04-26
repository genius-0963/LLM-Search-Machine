import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../data/products';

const CategorySection: React.FC = () => {
  const categories = getCategories();
  
  // Map categories to images and descriptions
  const categoryInfo = {
    'Audio': {
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Premium sound experiences'
    },
    'Wearables': {
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Smart devices for your lifestyle'
    },
    'Computers': {
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Powerful tech for work and play'
    },
    'Accessories': {
      image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Essential add-ons for your devices'
    },
    'Smart Home': {
      image: 'https://images.pexels.com/photos/1034812/pexels-photo-1034812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Control your home with ease'
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <Link 
              key={category} 
              to={`/category/${category.toLowerCase()}`}
              className="group relative overflow-hidden rounded-lg shadow-md h-64"
            >
              <img 
                src={categoryInfo[category as keyof typeof categoryInfo]?.image} 
                alt={category} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-1">{category}</h3>
                <p className="text-gray-200 text-sm mb-4">
                  {categoryInfo[category as keyof typeof categoryInfo]?.description}
                </p>
                <span className="inline-block bg-white text-primary-600 text-sm font-medium px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Explore {category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;