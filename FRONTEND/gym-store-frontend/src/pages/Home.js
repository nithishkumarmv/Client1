import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Gym Products</h2>
      {products.map(prod => (
        <div key={prod._id}>
          <h3>{prod.name}</h3>
          <img src={prod.image} alt={prod.name} width="100" />
          <p>Rs. {prod.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
