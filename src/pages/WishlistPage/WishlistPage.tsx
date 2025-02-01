import React, { useCallback } from 'react';
import { useWishlist } from '@/Context/whislistContext';
import { useCart } from '@/Context/cartContext';
import { usePrice } from '@/Context/priceContext';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '@/Context/searchContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './WishlistPage.module.scss';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const convertDollarToRupiah = usePrice();
  const { setSearchQuery } = useSearch();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate(`/search?q=${query}`);
  };

  const handleAddToCart = useCallback(
    (item: any) => {
      addToCart(item);
      toast.success(`${item.title} has been added to your cart!`, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      removeFromWishlist(item.id);
    },
    [addToCart, removeFromWishlist]
  );

  return (
    <>
      <Navbar buttons onSearch={handleSearch} />
      <div className={styles.container}>
        <h2 className={styles.title}>Wishlist</h2>
        {wishlist.length > 0 ? (
          <div className={styles.itemsContainer}>
            {wishlist.map((item) => (
              <div key={item.id} className={styles.item}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemPrice}>
                    {convertDollarToRupiah(Number(item.price))}
                  </p>
                </div>
                <div className={styles.itemActions}>
                  <button
                    className={styles.addToCartButton}
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className={styles.removeFromWishlistButton}
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptyMessage}>Your wishlist is empty.</p>
        )}
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};
