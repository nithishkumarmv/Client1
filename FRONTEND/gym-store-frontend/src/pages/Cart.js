import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/Cart.css';

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.cartId} className="cart-item">
              <span>{item.name}</span>
              <span>Rs. {item.price}</span>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.cartId)} // Use cartId to remove
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <h3 className="cart-total">Total: Rs. {total}</h3>
    </div>
  );
}

export default Cart;
