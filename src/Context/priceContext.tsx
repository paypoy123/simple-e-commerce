import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';

// Membuat konteks untuk harga
const PriceContext = createContext<
  ((dollarPrice: number) => string) | undefined
>(undefined);

// Fungsi untuk memformat harga dalam Rupiah
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

interface PriceProviderProps {
  children: ReactNode;
}

// Penyedia konteks untuk harga
export const PriceProvider = ({ children }: PriceProviderProps) => {
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const response = await fetch(
        'https://api.exchangerate-api.com/v4/latest/USD'
      );
      const data = await response.json();
      setExchangeRate(data.rates.IDR);
    };

    fetchExchangeRate();
  }, []);

  // Fungsi untuk mengonversi dan memformat harga dalam Rupiah
  const convertAndFormatPrice = (dollarPrice: number) => {
    const priceInRupiah = Math.round(dollarPrice * exchangeRate);
    return formatPrice(priceInRupiah);
  };

  return (
    <PriceContext.Provider value={convertAndFormatPrice}>
      {children}
    </PriceContext.Provider>
  );
};

// Hook untuk menggunakan konteks harga
export const usePrice = () => {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error('usePrice must be used within a PriceProvider');
  }
  return context;
};
