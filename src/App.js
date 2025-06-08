import React, { useState, useEffect } from 'react';
import './App.css';

const QuickMart = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: '🛒' },
    { id: 'fruits', name: 'Fruits & Vegetables', icon: '🥕' },
    { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛' },
    { id: 'snacks', name: 'Snacks', icon: '🍿' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' },
    { id: 'personal', name: 'Personal Care', icon: '🧴' },
    { id: 'household', name: 'Household', icon: '🧽' }
  ];

  const products = [
    {
      id: 1, name: 'Fresh Bananas', price: 40, originalPrice: 50, category: 'fruits',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=200&fit=crop',
      rating: 4.5, delivery: '10 min', discount: '20% OFF', inStock: true
    },
    {
      id: 2, name: 'Organic Apples', price: 120, originalPrice: 150, category: 'fruits',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=200&fit=crop',
      rating: 4.8, delivery: '12 min', discount: '20% OFF', inStock: true
    },
    {
      id: 3, name: 'Fresh Milk', price: 60, originalPrice: 65, category: 'dairy',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=200&fit=crop',
      rating: 4.6, delivery: '8 min', discount: '8% OFF', inStock: true
    },
    {
      id: 4, name: 'Greek Yogurt', price: 85, originalPrice: 100, category: 'dairy',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop',
      rating: 4.7, delivery: '10 min', discount: '15% OFF', inStock: true
    },
    {
      id: 5, name: 'Potato Chips', price: 25, originalPrice: 30, category: 'snacks',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=200&fit=crop',
      rating: 4.3, delivery: '15 min', discount: '17% OFF', inStock: true
    },
    {
      id: 6, name: 'Orange Juice', price: 80, originalPrice: 95, category: 'beverages',
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=200&fit=crop',
      rating: 4.4, delivery: '12 min', discount: '16% OFF', inStock: true
    },
    {
      id: 7, name: 'Hand Sanitizer', price: 45, originalPrice: 50, category: 'personal',
      image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=300&h=200&fit=crop',
      rating: 4.2, delivery: '20 min', discount: '10% OFF', inStock: true
    },
    {
      id: 8, name: 'Dish Soap', price: 35, originalPrice: 40, category: 'household',
      image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=200&fit=crop',
      rating: 4.1, delivery: '25 min', discount: '13% OFF', inStock: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="quickmart-app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <span>QuickMart</span>
          </div>
          
          <div className="location-info">
            <div className="location-item">
              <span>📍</span>
              <span>Delivery in 10-15 min</span>
            </div>
            <div className="location-item">
              <span>🏠</span>
              <span>Shimla, HP</span>
            </div>
          </div>
          
          <div className="cart-profile">
            <div className="cart-icon">
              <span>🛒</span>
              {getTotalItems() > 0 && (
                <div className="cart-badge">{getTotalItems()}</div>
              )}
            </div>
            <span>👤</span>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Search */}
        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="categories">
          <div className="category-scroll">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="category-icon">{category.icon}</div>
                <div className="category-name">{category.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const quantity = getCartQuantity(product.id);
            return (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-discount">{product.discount}</div>
                  <div className="product-heart">❤️</div>
                </div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-meta">
                    <div className="product-rating">
                      <span className="star">⭐</span>
                      <span>{product.rating}</span>
                    </div>
                    <span>•</span>
                    <span>🕒 {product.delivery}</span>
                  </div>
                  <div className="product-pricing">
                    <span className="current-price">₹{product.price}</span>
                    <span className="original-price">₹{product.originalPrice}</span>
                  </div>
                  {quantity > 0 ? (
                    <div className="quantity-control">
                      <button className="quantity-btn" onClick={() => removeFromCart(product.id)}>-</button>
                      <span className="quantity-display">{quantity}</span>
                      <button className="quantity-btn" onClick={() => addToCart(product)}>+</button>
                    </div>
                  ) : (
                    <button className="add-button" onClick={() => addToCart(product)}>ADD</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="cart-summary">
          <div className="cart-content">
            <div className="cart-info">
              <div className="cart-items">{getTotalItems()} items</div>
              <div className="cart-total">₹{getTotalPrice()}</div>
            </div>
            <button className="checkout-btn" onClick={() => alert('Proceeding to checkout! 🛒')}>
              <span>Proceed to Checkout</span>
              <span>🚚</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickMart;