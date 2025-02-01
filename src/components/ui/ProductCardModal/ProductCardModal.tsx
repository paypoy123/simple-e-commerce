import React from 'react';
import { Button } from '../Button';
import styles from './ProductCardModal.module.scss';
import Cart from '../../../assets/cart.svg';
import { useCart } from '@/Context/cartContext';
import { useWishlist } from '@/Context/whislistContext';
import { usePrice } from '@/Context/priceContext';

interface ProductCardModalProps {
  id: number;
  image: string;
  title: string;
  price: number;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  onAddToCart: (id: number) => void;
  onAddToWishlist: (id: number) => void;
}

export const ProductCardModal: React.FC<ProductCardModalProps> = ({
  id,
  image,
  title,
  price,
  category,
  description,
  rating,
  onAddToCart,
  onAddToWishlist,
}) => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const convertDollarToRupiah = usePrice();

  return (
    <div
      className={styles.modalCardContainer}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.modalImageContainer}>
        <img src={image} alt={title} className={styles.modalImage} />
      </div>

      <div className={styles.modalDescription}>
        <h3 className={styles.modalTitle}>{title}</h3>
        <p className={styles.modalCategory}>{category}</p>
        <p className={styles.modalDescriptionText}>{description}</p>
        <p className={styles.modalRating}>Rating: {rating.rate}</p>
        <p className={styles.modalAmount}>Amount: {rating.count}</p>
        <div className={styles.containerCartPriceWishlist}>
          <div>
            <p className={styles.modalPrice}>
              Price: {convertDollarToRupiah(price)}
            </p>
          </div>
          <div className={styles.containerWishlistCart}>
            <div className={styles.containerWishlist}>
              <div>Wishlist</div>
              {wishlist.length > 0 && (
                <span className={styles.modalWishlist}>{wishlist.length}</span>
              )}
            </div>
            <div className={styles.containerCart}>
              <Cart className={styles.modalCartIcon} />
              {cart.length > 0 && (
                <span className={styles.modalCart}>{cart.length}</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.modalButtonContainer}>
          <Button
            onClick={() => onAddToCart(id)}
            className={styles.modalButton1}
          >
            Add to cart
          </Button>
          <Button
            onClick={() => onAddToWishlist(id)}
            className={styles.modalButton2}
          >
            Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
};
