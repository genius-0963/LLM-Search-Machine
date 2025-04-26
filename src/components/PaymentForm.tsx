import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../contexts/CartContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PaymentFormProps {
  onSuccess: (paymentId: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSuccess }) => {
  const { cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStripePayment = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          amount: cart.total,
          currency: 'usd',
        }),
      });

      const { clientSecret, error: paymentError } = await response.json();
      if (paymentError) throw new Error(paymentError);

      const { error: stripeError } = await stripe.confirmPayment({
        elements: {
          payment_method: {
            card: {
              number: '4242424242424242',
              exp_month: 12,
              exp_year: 2025,
              cvc: '123',
            },
          },
        },
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (stripeError) throw new Error(stripeError.message);

      onSuccess('stripe-payment-id');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 py-2 px-4 rounded-lg border ${
              paymentMethod === 'card'
                ? 'border-primary-600 bg-primary-50 text-primary-600'
                : 'border-gray-300 text-gray-700'
            }`}
          >
            Credit Card
          </button>
          <button
            onClick={() => setPaymentMethod('paypal')}
            className={`flex-1 py-2 px-4 rounded-lg border ${
              paymentMethod === 'paypal'
                ? 'border-primary-600 bg-primary-50 text-primary-600'
                : 'border-gray-300 text-gray-700'
            }`}
          >
            PayPal
          </button>
        </div>

        {paymentMethod === 'card' ? (
          <div>
            <button
              onClick={handleStripePayment}
              disabled={isProcessing}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400"
            >
              {isProcessing ? 'Processing...' : 'Pay with Card'}
            </button>
          </div>
        ) : (
          <PayPalScriptProvider options={{ 
            'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
            currency: 'USD',
          }}>
            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: cart.total.toString(),
                      currency_code: 'USD'
                    }
                  }]
                });
              }}
              onApprove={async (data, actions) => {
                if (actions.order) {
                  const order = await actions.order.capture();
                  onSuccess(order.id);
                }
              }}
            />
          </PayPalScriptProvider>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;