import { createContext, ReactNode, useContext, useState } from 'react';

interface Item {
  id: string;
  name: string;
  price: number;
  count: number;
}

interface Discount {
  id: string;
  name: string;
  rate: number;
}

interface CartContextProps {
  checkoutItems: Item[];
  checkoutDiscounts: Discount[];
  totalAmount: number;
  handleCheckoutItems: (item: Item) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [checkoutItems, setCheckoutItems] = useState<Item[]>([]);
  const [checkoutDiscounts, setCheckoutDiscounts] = useState<Discount[]>([]);
  const [totalAmount, seTotalAmount] = useState<number>(0);

  const handleCheckoutItems = (item: Item) => {
    setCheckoutItems((currentItems) => {
      const foundItem = currentItems.find((i) => i.id === item.id);
      const updatedItems = foundItem
        ? currentItems.filter((i) => i.id !== item.id)
        : [...currentItems, item];

      setCheckoutItems(updatedItems);
      return updatedItems;
    });
  };

  return (
    <CartContext.Provider
      value={{
        checkoutItems,
        checkoutDiscounts,
        totalAmount,
        handleCheckoutItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  const context = useContext(CartContext);

  return context as CartContextProps;
};

export { useCartContext };

export default CartProvider;
