import React from 'react';
import styles from './Navbar.module.scss';
import MaduraIcon from '@/assets/maduraIcon.svg';
import CartIcon from '@/assets/cart.svg';
import { Button } from '@/components/ui/Button';
import { useSearch } from '@/Context/searchContext';
import CloseInput from '@/assets/closeInput.svg';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useCart } from '@/Context/cartContext';
import { useWishlist } from '@/Context/whislistContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NavbarProps {
  onSearch: (query: string) => void;
  buttons?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, buttons }) => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
    navigate(`/search?q=${searchQuery}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleClearClick = () => {
    setSearchQuery('');
  };

  const goToHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/');
  };

  const goToWishlist = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (wishlist.length > 0) {
      navigate('/wishlist');
    } else {
      toast.error('Your wishlist is empty!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const goToCheckout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (cart.length > 0) {
      navigate('/checkout');
    } else {
      toast.error('Your cart is empty!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div>
          <a href='/' onClick={goToHome} className={styles.logo}>
            <MaduraIcon className={styles.maduraIcon} />
            <h1 className={styles.title}>Warung Madura</h1>
          </a>
        </div>

        <div className={styles.searchContainer}>
          <input
            type='text'
            placeholder='Search for products...'
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            className={styles.searchInput}
          />
          {searchQuery && (
            <CloseInput
              onClick={handleClearClick}
              className={clsx(styles.closeInput, {
                [styles.closeInputAligned]: !buttons,
              })}
            />
          )}
          {buttons && (
            <Button className={styles.searchButton} onClick={handleSearchClick}>
              Search
            </Button>
          )}
        </div>

        <div className={styles.navLinks}>
          <a href='/' onClick={goToHome} className={styles.active1}>
            Home
          </a>
          <a className={styles.active2} href='/wishlist' onClick={goToWishlist}>
            Wishlist
            {wishlist.length > 0 && (
              <span className={styles.wishlistCount}>{wishlist.length}</span>
            )}
          </a>
          <a className={styles.active3} href='/checkout' onClick={goToCheckout}>
            <CartIcon className={styles.cartIcon} />
            {cart.length > 0 && (
              <span className={styles.cartCount}>{cart.length}</span>
            )}
          </a>
        </div>
      </div>
    </nav>
  );
};
