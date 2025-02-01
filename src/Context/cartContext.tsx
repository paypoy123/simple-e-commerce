import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Definisi tipe untuk produk yang ada di keranjang
interface Product {
  id: number; // ID produk
  title: string; // Nama produk
  price: string; // Harga produk
  category: string; // Kategori produk
  description: string; // Deskripsi produk
  image: string; // URL gambar produk
}

// CartItem adalah produk di keranjang yang sudah memiliki quantity
interface CartItem extends Product {
  quantity: number; // Jumlah produk di keranjang
}

// CartState adalah tipe data untuk menyimpan semua item di keranjang
interface CartState {
  items: CartItem[]; // List item yang ada di keranjang
}

// CartAction adalah jenis aksi yang bisa dilakukan untuk mengubah data di cart
type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'INCREASE_QUANTITY'; payload: number }
  | { type: 'DECREASE_QUANTITY'; payload: number };

// Initial state untuk keranjang
const initialCartState: CartState = { items: [] };

// Reducer adalah fungsi yang mengubah state berdasarkan aksi yang diterima
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case 'CLEAR_CART': {
      return { items: [] };
    }

    case 'INCREASE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case 'DECREASE_QUANTITY': {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    }

    default: {
      const _exhaustiveCheck: never = action;
      throw new Error(`Unhandled action type: ${_exhaustiveCheck}`);
    }
  }
};

// CartContextProps mendefinisikan apa saja yang tersedia di Context untuk keranjang
interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

// Membuat Context untuk menyimpan data keranjang yang bisa diakses di seluruh aplikasi
const CartContext = createContext<CartContextProps | undefined>(undefined);

// CartProvider adalah komponen yang menyediakan data dan fungsi terkait keranjang untuk aplikasi
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const increaseQuantity = (id: number) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  };

  const decreaseQuantity = (id: number) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook custom untuk menggunakan CartContext di komponen lain
export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
