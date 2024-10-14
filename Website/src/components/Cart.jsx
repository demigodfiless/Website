import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../features/cartSlice'; // Import the removeFromCart action

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch(); // Get dispatch function
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h2 className="text-2xl font-bold">Please log in to view your cart.</h2>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId)); // Dispatch removeFromCart action
  };

  return (
    <div className="cart-container min-h-screen flex flex-col items-center p-6" style={{ color: 'white', fontSize: '18px' }}>
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item border border-gray-700 rounded-lg p-4 shadow-md bg-gray-800">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p>Price: <strong>${item.price}</strong></p>
              <p>Quantity: <strong>{item.quantity}</strong></p>
              <button 
                onClick={() => handleRemoveFromCart(item.id)} 
                className="mt-2 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      {cartItems.length > 0 && (
        <button 
          onClick={handleCheckout} 
          className="mt-6 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
