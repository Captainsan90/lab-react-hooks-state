import React, { useState } from 'react';

// --- Data Setup ---
const productsData = [
  { id: 1, name: 'Banana', category: 'Fruits' },
  { id: 2, name: 'Mango', category: 'Fruits' },
  { id: 3, name: 'Milk', category: 'Drinks' },
  { id: 4, name: 'Soda', category: 'Drinks' },
  { id: 5, name: 'Juice', category: 'Drinks' },
  { id: 6, name: 'Milkshake', category: 'Drinks' },
  { id: 7, name: 'Charger', category: 'Kitchen Appliances' },
  { id: 8, name: 'Kettle', category: 'Kitchen Appliances' },
  { id: 9, name: 'Blender', category: 'Kitchen Appliances' },
  { id: 10, name: 'Oven', category: 'Kitchen Appliances' },
  { id: 11, name: 'Sneakers', category: 'Shoes' },
  { id: 12, name: 'Sandals', category: 'Shoes' },
];

// --- Components ---

// Dark Mode Toggle Component
const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button 
      onClick={() => setDarkMode(!darkMode)}
      style={{
        padding: '10px 20px',
        cursor: 'pointer',
        marginBottom: '20px',
        backgroundColor: darkMode ? '#fff' : '#333',
        color: darkMode ? '#333' : '#fff',
        border: '1px solid #ccc',
        borderRadius: '5px'
      }}
    >
      {/* Text Change */}
      {darkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
    </button>
  );
};

// Category Filter Component
const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter by Category:</label>
      <select 
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ padding: '5px', borderRadius: '4px' }}
      >
        <option value="All">All Products</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

// Product Card Componentt
const ProductCard = ({ product, addToCart }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px',
      width: '150px',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)' 
    }}>
      <h3>{product.name}</h3>
      <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{product.category}</p>
      <button 
        onClick={() => addToCart(product)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default function App() {
  // State: Dark Mode
  const [darkMode, setDarkMode] = useState(false);
  
  // State: Cart
  const [cart, setCart] = useState([]);
  
  // State: Category Filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Styles based on Dark Mode
  const appStyles = {
    backgroundColor: darkMode ? '#121212' : '#f9f9f9',
    color: darkMode ? '#ffffff' : '#000000',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    transition: 'all 0.3s ease'
  };

  // Get unique categories for dropdown
  const categories = [...new Set(productsData.map(p => p.category))];

  // Filter logic
  const filteredProducts = selectedCategory === 'All' 
    ? productsData 
    : productsData.filter(product => product.category === selectedCategory);

  // Add to Cart function
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div style={appStyles}>
      <h1>Supermarket App</h1>
      
      {/* Dark Mode Toggle */}
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        
        {/* Left Column: Products Area */}
        <div style={{ flex: 3 }}>
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
          
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>

        {/* Right Column: Cart Area */}
        <div style={{ 
            flex: 1, 
            borderLeft: '1px solid #ccc', 
            paddingLeft: '20px',
            minWidth: '250px' 
        }}>
          <h2>Shopping Cart</h2>
          
          {/* Cart Total */}
          <h4 style={{ color: '#007bff' }}>Total Items: {cart.length}</h4>

          <ul style={{ paddingLeft: '20px' }}>
            {cart.map((item, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>
                {item.name} is in your cart
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}