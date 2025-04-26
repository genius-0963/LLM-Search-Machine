import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { Star, ShoppingCart, Heart, Share2, ArrowLeft, MinusCircle, PlusCircle } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg"
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  return (
    <main className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-8 text-gray-500">
          <button onClick={() => navigate(-1)} className="flex items-center mr-2 hover:text-primary-600">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          <span>/</span>
          <span className="mx-2">{product.category}</span>
          <span>/</span>
          <span className="mx-2 text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">{product.rating} ({Math.floor(Math.random() * 100) + 20} reviews)</span>
            </div>

            <p className="text-2xl font-bold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-gray-700 mb-8">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 focus:outline-none ${
                        selectedColor === color ? 'border-primary-600' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                               color.toLowerCase() === 'black' ? '#000000' : 
                                               color.toLowerCase() === 'blue' ? '#3B82F6' : 
                                               color.toLowerCase() === 'red' ? '#EF4444' : 
                                               color.toLowerCase() === 'silver' ? '#CBD5E1' : 
                                               color.toLowerCase() === 'rose gold' ? '#F9A8D4' : 
                                               color.toLowerCase() === 'navy' ? '#1E3A8A' : 
                                               color.toLowerCase() === 'space gray' ? '#4B5563' : 
                                               color.toLowerCase() === 'olive' ? '#65A30D' : 
                                               color.toLowerCase() === 'tortoise' ? '#92400E' : '#CBD5E1'
                              }}
                    />
                  ))}
                </div>
                {selectedColor && (
                  <p className="mt-2 text-sm text-gray-500">Selected: {selectedColor}</p>
                )}
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md focus:outline-none ${
                        selectedSize === size 
                          ? 'border-primary-600 bg-primary-50 text-primary-600' 
                          : 'border-gray-300 text-gray-700 hover:border-gray-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="text-gray-500 hover:text-primary-600 focus:outline-none"
                  disabled={quantity <= 1}
                >
                  <MinusCircle className="w-5 h-5" />
                </button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="text-gray-500 hover:text-primary-600 focus:outline-none"
                  disabled={quantity >= product.stock}
                >
                  <PlusCircle className="w-5 h-5" />
                </button>
                <span className="ml-4 text-sm text-gray-500">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center">
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </button>
              <button className="hidden sm:flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium p-3 rounded-lg transition-colors duration-300">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <a href="#" className="border-primary-600 text-primary-600 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
                Description
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
                Specifications
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
                Reviews
              </a>
            </nav>
          </div>
          <div className="py-6">
            <p className="text-gray-700">
              {product.description}
            </p>
            <p className="text-gray-700 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget dignissim quam. Donec eget metus auctor, 
              finibus nulla at, tincidunt nulla. Praesent tincidunt arcu nec metus cursus, vel ultrices magna tristique. 
              Nulla facilisi. Suspendisse potenti. Cras bibendum porttitor enim, nec imperdiet urna elementum eu.
            </p>
            <ul className="list-disc pl-5 mt-4 text-gray-700">
              <li className="mb-2">High-quality materials</li>
              <li className="mb-2">Carefully crafted by experts</li>
              <li className="mb-2">Designed for optimal performance</li>
              <li className="mb-2">1 year manufacturer warranty</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;