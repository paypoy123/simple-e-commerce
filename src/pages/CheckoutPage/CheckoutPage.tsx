import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/cartContext';
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm';
import styles from './CheckoutPage.module.scss';
import { usePrice } from '@/Context/priceContext';
import { Navbar } from '@/components/ui/Navbar';
import { useSearch } from '@/Context/searchContext';
import { Footer } from '@/components/ui/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const navigate = useNavigate();
  const convertDollarToRupiah = usePrice();
  const { setSearchQuery } = useSearch();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate(`/search?q=${query}`);
  };

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      setTimeout(() => {
        navigate('/search?q=');
      }, 1500);
    }
  }, [cart, navigate]);

  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleSubmit = () => {
    toast.success('Checkout successful!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    clearCart();
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setShowCheckoutForm(false);
    }
  };

  return (
    <>
      <Navbar buttons onSearch={handleSearch} />
      <>
        <div className={styles.checkoutPageContainer}>
          <header className={styles.checkoutPageHeader}>
            <h2 className={styles.checkoutPageTitle}>Keranjang Belanja</h2>
          </header>

          {cart.length > 0 ? (
            <>
              <div className={styles.cartItemsContainer}>
                {cart.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.cartItemImageContainer}>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className={styles.cartItemInfo}>
                      <p className={styles.cartItemTitle}>{item.title}</p>
                      <p className={styles.cartItemPrice}>
                        {convertDollarToRupiah(Number(item.price))}
                      </p>
                    </div>
                    <div className={styles.cartItemQuantity}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className={styles.quantityValue}>
                        {item.quantity}
                      </span>
                      <button
                        className={styles.quantityButton}
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className={styles.removeItemButton}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>

              <div className={styles.totalPriceContainer}>
                <div>
                  <p className={styles.totalPriceLabel}>Total Harga:</p>
                  <h3 className={styles.totalPriceValue}>
                    {convertDollarToRupiah(
                      cart.reduce(
                        (total, item) =>
                          total + Number(item.price) * Number(item.quantity),
                        0
                      )
                    )}
                  </h3>
                </div>
                {!showCheckoutForm ? (
                  <button
                    onClick={handleCheckout}
                    className={styles.checkoutButton}
                  >
                    checkout
                  </button>
                ) : (
                  <div
                    className={styles.checkoutFormOverlay}
                    onClick={handleOverlayClick}
                  >
                    <div
                      className={styles.checkoutFormContainer}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <CheckoutForm onSubmit={handleSubmit} />
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className={styles.emptyCartMessage}>
              Keranjang belanja kosong. Silahkan tambahkan produk untuk
              melanjutkan
            </p>
          )}
        </div>
        <ToastContainer />
      </>
      <Footer />
    </>
  );
};
