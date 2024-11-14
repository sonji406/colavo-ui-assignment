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
  selectedItems: Item[];
  selectedDiscounts: Discount[];
  checkoutItems: Item[];
  checkoutDiscounts: Discount[];
  totalPrice: number;
  totalRate: number;
  totalAmount: number;
  selectItem: (item: Item) => void;
  selectDiscount: (discount: Discount) => void;
  completedSelections: () => void;
  cancelSelected: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<Discount[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<Item[]>([]);
  const [checkoutDiscounts, setCheckoutDiscounts] = useState<Discount[]>([]);
  const [totalPrice, seTotalPrice] = useState<number>(0);
  const [totalRate, setTotalRate] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const selectItem = (item: Item) => {
    setSelectedItems((currentItems) => {
      const foundItem = currentItems.find((i) => i.id === item.id);
      return foundItem ? currentItems.filter((i) => i.id !== item.id) : [...currentItems, item];
    });
  };

  const selectDiscount = (discount: Discount) => {
    setSelectedDiscounts((currentDiscounts) => {
      const foundDiscount = currentDiscounts.find((d) => d.id === discount.id);
      return foundDiscount
        ? currentDiscounts.filter((d) => d.id !== discount.id)
        : [...currentDiscounts, discount];
    });
  };

  const completedSelections = () => {
    setCheckoutItems(selectedItems);
    setCheckoutDiscounts(selectedDiscounts);

    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

    const totalRate =
      Math.round(selectedDiscounts.reduce((sum, discount) => sum + discount.rate, 0) * 100) / 100;

    seTotalPrice(totalPrice);
    setTotalRate(totalRate);
    setTotalAmount(totalPrice - totalPrice * totalRate);
  };

  const cancelSelected = () => {
    setSelectedItems(checkoutItems);
    setSelectedDiscounts(checkoutDiscounts);
  };

  return (
    <CartContext.Provider
      value={{
        selectedItems,
        selectedDiscounts,
        checkoutItems,
        checkoutDiscounts,
        totalPrice,
        totalRate,
        totalAmount,
        selectItem,
        selectDiscount,
        completedSelections,
        cancelSelected,
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
