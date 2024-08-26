
import React, { useState, useEffect } from 'react';
import './App.css';
const App = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok ' + res.statusText);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched Data:', data);
        setItems(data);
        setFilteredItems(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch products. Please try again later.');
      });
  }, []);

  useEffect(() => {
    let filtered = items;

    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }

    if (maxPrice) {
      filtered = filtered.filter(item => item.price <= parseFloat(maxPrice));
    }

    setFilteredItems(filtered);
  }, [category, maxPrice, items]);

  return (
    <div>
      <h1>Welcome to Simple <span>Tufail's</span> Online store</h1>

      <div>
        <label>
          Filter by Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </label>

        <label>
          Filter by Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Enter maximum price"
          />
        </label>
      </div>

      <div className="product-list">
        {filteredItems.map(item => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.title} className="product-image" />
            <h2>{item.title}</h2>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
