import { SearchProvider } from '@/Context/searchContext';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage/HomePage';
import { SearchPage } from '../pages/SearchPage/SearchPage';
import { CheckoutPage } from '../pages/CheckoutPage/CheckoutPage';
import { CartProvider } from '@/Context/cartContext';
import { WishlistProvider } from '@/Context/whislistContext';
import { WishlistPage } from '@/pages/WishlistPage';
import { PriceProvider } from '@/Context/priceContext'; // Import PriceProvider

export const Home: React.FC = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <SearchProvider>
          <PriceProvider>
            {' '}
            {/* Wrap everything with PriceProvider */}
            <Router>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='/checkout' element={<CheckoutPage />} />
                <Route path='/wishlist' element={<WishlistPage />} />
              </Routes>
            </Router>
          </PriceProvider>
        </SearchProvider>
      </WishlistProvider>
    </CartProvider>
  );
};
