import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { ProductCard } from '@/components/ui/ProductCard';
import { Navbar } from '@/components/ui/Navbar';
import useFetchProduct from '@/hooks/useFetchProduct';
import { useSearch } from '@/Context/searchContext';
import { useCart } from '@/Context/cartContext';
import { useWishlist } from '@/Context/whislistContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback } from 'react';
import { Footer } from '@/components/ui/Footer';

export const HomePage: React.FC = () => {
  const { products, loading, error } = useFetchProduct();
  const { setSearchQuery } = useSearch();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate(`/search?q=${query}`);
  };

  const handleAddToCart = useCallback(
    (product: any) => {
      addToCart(product);
      toast.success(`${product.title} has been added to your cart`, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
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

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <Navbar onSearch={handleSearch} buttons />
          <div className={styles.container}>
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
          <ToastContainer />
        </>
      )}
    </>
  );
};
