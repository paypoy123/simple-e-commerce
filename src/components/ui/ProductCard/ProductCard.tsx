import React, { useState } from 'react';
import styles from './ProductCard.module.scss';
import { Button } from '../Button';
import { ProductCardModal } from '../ProductCardModal';
import { usePrice } from '@/Context/priceContext';

interface ProductCardProps {
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

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  category,
  description,
  rating,
  image,
  onAddToCart,
  onAddToWishlist,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const convertDollarToRupiah = usePrice();

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.card}>
        <img
          src={image}
          alt={title}
          className={styles.image}
          onClick={handleCardClick}
        />
        <div className={styles.cardContent}>
          <h3 className={styles.title} onClick={handleCardClick}>
            {title}
          </h3>
          <p className={styles.category}>{category}</p>
          <p className={styles.price}>{convertDollarToRupiah(price)}</p>
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={() => onAddToCart(id)} className={styles.button1}>
            Add to cart
          </Button>
          <Button
            onClick={() => onAddToWishlist(id)}
            className={styles.button2}
          >
            Wishlist
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <ProductCardModal
            id={id}
            image={image}
            title={title}
            price={price}
            category={category}
            description={description}
            rating={rating}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
          />
        </div>
      )}
    </>
  );
};
