import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// 1. Define cart types
export interface CartItem {
  id: number | string; // Supporting both numbers (fakeStore) and strings (books)
  title: string;
  price: number;
  image: string;
  quantity: number;
  gift?: boolean;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  savedForLater: CartItem[]; // Keeping this features from previous implementation
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { id: number | string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number | string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SAVE_FOR_LATER'; payload: { id: number | string } }
  | { type: 'MOVE_TO_BASKET'; payload: { id: number | string } }
  | { type: 'REMOVE_FROM_SAVED'; payload: { id: number | string } }
  | { type: 'TOGGLE_GIFT'; payload: { id: number | string } }
  | { type: 'LOAD_CART'; payload: CartState };

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  savedForLater: [],
};

// Formatting helper
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  return { totalItems, totalPrice };
};

// Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;

  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      let newItems;
      
      if (existingItemIndex > -1) {
        newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + (action.payload.quantity || 1)
        };
      } else {
        newItems = [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }];
      }

      const totals = calculateTotals(newItems);
      newState = { ...state, items: newItems, ...totals };
      break;
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      const totals = calculateTotals(newItems);
      newState = { ...state, items: newItems, ...totals };
      break;
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item => 
        item.id === action.payload.id 
          ? { ...item, quantity: action.payload.quantity } 
          : item
      );
      const totals = calculateTotals(newItems);
      newState = { ...state, items: newItems, ...totals };
      break;
    }
    
    case 'TOGGLE_GIFT': {
      const newItems = state.items.map(item => 
        item.id === action.payload.id 
          ? { ...item, gift: !item.gift } 
          : item
      );
      newState = { ...state, items: newItems };
      break;
    }

    case 'SAVE_FOR_LATER': {
      const itemToSave = state.items.find(item => item.id === action.payload.id);
      if (!itemToSave) return state;
      
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      const totals = calculateTotals(newItems);
      
      newState = { 
        ...state, 
        items: newItems, 
        savedForLater: [...state.savedForLater, itemToSave],
        ...totals 
      };
      break;
    }
    
    case 'REMOVE_FROM_SAVED': {
       newState = {
           ...state,
           savedForLater: state.savedForLater.filter(item => item.id !== action.payload.id)
       };
       break;
    }

    case 'MOVE_TO_BASKET': {
      const itemToMove = state.savedForLater.find(item => item.id === action.payload.id);
      if (!itemToMove) return state;
      
      const newSaved = state.savedForLater.filter(item => item.id !== action.payload.id);
      const newItems = [...state.items, itemToMove];
      const totals = calculateTotals(newItems);
      
      newState = {
          ...state,
          savedForLater: newSaved,
          items: newItems,
          ...totals
      };
      break;
    }

    case 'CLEAR_CART':
      newState = initialState;
      break;

    case 'LOAD_CART':
      newState = action.payload;
      break;

    default:
      return state;
  }
  
  return newState;
};

// Context
interface CartContextType extends CartState {
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
  toggleGift: (id: number | string) => void;
  saveForLater: (id: number | string) => void;
  removeFromSaved: (id: number | string) => void;
  moveToBasket: (id: number | string) => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

// Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

// Provider
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('amazonCloneCartTS');
      if (savedCart) {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage', error);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('amazonCloneCartTS', JSON.stringify(state));
  }, [state]);

  const [isCartOpen, setIsCartOpen] = React.useState(false);

  // Actions
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setIsCartOpen(true); // Auto-open cart on add
  };

  const removeFromCart = (id: number | string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const updateQuantity = (id: number | string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const toggleGift = (id: number | string) => {
      dispatch({ type: 'TOGGLE_GIFT', payload: { id }});
  };
  
  const saveForLater = (id: number | string) => {
      dispatch({ type: 'SAVE_FOR_LATER', payload: { id } });
  };
  
  const removeFromSaved = (id: number | string) => {
      dispatch({ type: 'REMOVE_FROM_SAVED', payload: { id } });
  };
  
  const moveToBasket = (id: number | string) => {
      dispatch({ type: 'MOVE_TO_BASKET', payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleGift,
    saveForLater,
    removeFromSaved,
    moveToBasket,
    isCartOpen,
    openCart,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
