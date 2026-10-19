import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../types/restaurant';

export interface TastingBagItem {
  dish: MenuItem;
  quantity: number;
  withWinePairing: boolean;
}

interface TastingBagContextType {
  items: TastingBagItem[];
  addItem: (dish: MenuItem, withWinePairing?: boolean) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  toggleWinePairing: (dishId: string) => void;
  clearBag: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  totalEstimatedPrice: number;
  totalCount: number;
  toastMessage: string | null;
}

const TastingBagContext = createContext<TastingBagContextType | undefined>(undefined);

export const TastingBagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<TastingBagItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('aurelia_tasting_bag');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('aurelia_tasting_bag', JSON.stringify(items));
  }, [items]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addItem = (dish: MenuItem, withWinePairing = false) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.dish.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.dish.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { dish, quantity: 1, withWinePairing }];
    });
    showToast(`Added "${dish.name}" to your Tasting Itinerary.`);
  };

  const removeItem = (dishId: string) => {
    setItems((prev) => prev.filter((i) => i.dish.id !== dishId));
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(dishId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.dish.id === dishId ? { ...i, quantity } : i))
    );
  };

  const toggleWinePairing = (dishId: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.dish.id === dishId ? { ...i, withWinePairing: !i.withWinePairing } : i
      )
    );
  };

  const clearBag = () => {
    setItems([]);
  };

  const totalEstimatedPrice = items.reduce((sum, item) => {
    const dishCost = item.dish.price * item.quantity;
    const wineCost = item.withWinePairing ? 45 * item.quantity : 0;
    return sum + dishCost + wineCost;
  }, 0);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TastingBagContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        toggleWinePairing,
        clearBag,
        isDrawerOpen,
        setIsDrawerOpen,
        totalEstimatedPrice,
        totalCount,
        toastMessage,
      }}
    >
      {children}
    </TastingBagContext.Provider>
  );
};

export const useTastingBag = () => {
  const context = useContext(TastingBagContext);
  if (!context) {
    throw new Error('useTastingBag must be used within a TastingBagProvider');
  }
  return context;
};
