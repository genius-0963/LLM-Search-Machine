import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Trash2, MinusCircle, PlusCircle, ShoppingBag } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            to="/shop" 
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg inline-block transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                {cart.items.map((item) => (
                  <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex flex-col sm:flex-row border-b border-gray-200 py-4 last:border-0 last:pb-0 first:pt-0">
                    <div className="sm:w-24 h-24 flex-shrink-0 overflow-hidden rounded-md mb-4 sm:mb-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 ml-0 sm:ml-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900">
                            <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                          </h3>
                          <div className="mt-1 text-sm text-gray-500">
                            {item.color && <span className="mr-2">Color: {item.color}</span>}
                            {item.size && <span>Size: {item.size}</span>}
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors ml-4 flex-shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-primary-600 focus:outline-none"
                          disabled={item.quantity <= 1}
                        >
                          <MinusCircle className="w-5 h-5" />
                        </button>
                        <span className="mx-3 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-primary-600 focus:outline-none"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <PlusCircle className="w-5 h-5" />
                        </button>
                        <div className="ml-auto text-base font-medium text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                <div className="border-t border-b border-gray-200 py-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900 font-medium">${(cart.total * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-4 font-medium text-lg">
                  <span className="text-gray-900">Total</span>
                  <span className="text-primary-600">${(cart.total + cart.total * 0.1).toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  className="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg inline-block text-center transition-colors duration-300"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/shop"
                  className="mt-2 w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 font-medium px-6 py-3 rounded-lg inline-block text-center transition-colors duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;