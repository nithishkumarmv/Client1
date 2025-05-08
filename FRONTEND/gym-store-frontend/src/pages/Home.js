import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import '../styles/Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Fetch products from the backend API
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };


  return (
    <div className="home-container">
      <h1>Welcome to Gym Store</h1>
      <h2>Trending Products</h2>
      <div className="recent-products">
        {products.slice(-5).map((product) => (
          <div key={product._id} className="recent-product-card">
            <img src={product.image} alt={product.name} className="recent-product-image" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;