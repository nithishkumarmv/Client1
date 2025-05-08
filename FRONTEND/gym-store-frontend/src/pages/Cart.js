import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { loadRazorpay } from '../utils/razorpay';

function Cart() {
  const { cartItems } = useContext(CartContext);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const payNow = async () => {
    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) return alert("Razorpay SDK failed to load");

    const result = await axios.post('http://localhost:5000/api/payment/create-order', {
      amount: total,
      currency: "INR"
    });

    const { id: order_id } = result.data;

    const options = {
      key: "RAZORPAY_KEY", // public key here
      amount: total * 100, // Amount in paise
      currency: "INR",
      name: "Gym Store",
      order_id,
      handler: async (response) => {
        const verify = await axios.post('http://localhost:5000/api/payment/verify', response);
        if (verify.data.success) {
          alert("Payment Successful!");
        } else {
          alert("Payment Failed!");
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map((item, i) => (
        <div key={i}>
          {item.name} - Rs. {item.price}
        </div>
      ))}
      <h3>Total: Rs. {total}</h3>
      {/* Attach the payNow function to the button's onClick event */}
      <button onClick={payNow}>Proceed to Pay</button>
    </div>
  );
}

export default Cart;
