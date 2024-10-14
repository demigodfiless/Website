// src/components/Checkout.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cartSlice';
import { reduceStock } from '../features/productSlice'; // Import the reduceStock action

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.products); // Access the products
  const dispatch = useDispatch();

  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // Adjusted to multiply by quantity

  const handleFinalizeOrder = () => {
    let allStockAvailable = true; // Flag to check stock availability

    // Reduce stock for each item in the cart
    cartItems.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (product) {
        // Check if the requested quantity is available
        if (product.quantity >= item.quantity) {
          dispatch(reduceStock({ id: item.id, quantity: item.quantity })); // Reduce the stock
        } else {
          alert(`Insufficient stock for ${item.name}. Available: ${product.quantity}, Requested: ${item.quantity}`);
          allStockAvailable = false; // Set flag to false if stock is insufficient
        }
      }
    });

    // If all items are in stock, finalize the order
    if (allStockAvailable) {
      alert('Order placed successfully!');
      dispatch(clearCart()); // Clear the cart after placing the order
    }
  };

  return (
    <div className="checkout min-h-screen flex flex-col items-center justify-center bg-black p-6" style={{ color: 'white', fontSize: '18px' }}>
      <h2 className="text-3xl font-bold mb-4">Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map(item => (
              <div key={item.id} className="checkout-item border border-gray-700 rounded-lg p-4 shadow-md bg-gray-800">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p>Price: <strong>${item.price}</strong></p>
                <p>Quantity: <strong>{item.quantity}</strong></p>
              </div>
            ))}
          </div>
          <h3 className="text-xl font-bold mt-6">Total Amount: <strong>${totalAmount}</strong></h3>
          <button 
            onClick={handleFinalizeOrder} 
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
