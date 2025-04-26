import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import PaymentForm from '../components/PaymentForm';

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentSuccess = (paymentId: string) => {
    setIsProcessing(true);
    // Here you would typically create an order in your database
    console.log('Payment successful:', paymentId);
    clearCart();
    navigate('/payment-success');
  };

  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Tax</span>
                    <span>${(cart.total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mt-2 font-bold">
                    <span>Total</span>
                    <span>${(cart.total + cart.total * 0.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
              <PaymentForm onSuccess={handlePaymentSuccess} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;