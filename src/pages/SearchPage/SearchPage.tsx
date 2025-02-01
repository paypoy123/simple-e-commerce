import { ProductCard } from '@/components/ui/ProductCard';
import useFetchProduct from '@/hooks/useFetchProduct';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './SearchPage.module.scss';
import { Navbar } from '@/components/ui/Navbar';
import { useSearch } from '@/Context/searchContext';
import { useLocation } from 'react-router-dom';
import { useCart } from '@/Context/cartContext';
import { useWishlist } from '@/Context/whislistContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from '@/components/ui/Footer';

export const SearchPage: React.FC = () => {
  const { products, loading, error } = useFetchProduct();
  const [searchResults, setSearchResults] = useState(
    useFetchProduct().products
  );
  const { setSearchQuery } = useSearch();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleAddToCart = useCallback(
    (product: any) => {
      addToCart(product);
      toast.success(`${product.title} has been added to your cart`, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    },
    [addToCart]
  );

  const handleAddToWishlist = useCallback(
    (product: any) => {
      addToWishlist(product);
      toast.success(`${product.title} has been added to your wishlist`, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    },
    [addToWishlist]
  );

  useEffect(() => {
    const handleSearch = () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }
      const results = products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    };

    setSearchQuery(searchQuery);
    handleSearch();
  }, [searchQuery, products, setSearchQuery]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <Navbar onSearch={(query) => setSearchQuery(query)} buttons />
          <div className={styles.container}>
            {searchQuery && searchResults.length === 0 && (
              <h2 className={styles.title}>
                No results found for {searchQuery}
              </h2>
            )}

            {searchResults.length > 0 && (
              <>
                <h2 className={styles.title}>
                  Search Results for {searchQuery}
                </h2>
                <div className={styles.cardContainer}>
                  {searchResults.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onAddToCart={() => {
                        handleAddToCart(product);
                      }}
                      onAddToWishlist={() => {
                        handleAddToWishlist(product);
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            <h2 className={styles.title}>Featured Products</h2>
            <div className={styles.cardContainer}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={() => {
                    handleAddToCart(product);
                  }}
                  onAddToWishlist={() => {
                    handleAddToWishlist(product);
                  }}
                />
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
      <ToastContainer />
    </>
  );
};
