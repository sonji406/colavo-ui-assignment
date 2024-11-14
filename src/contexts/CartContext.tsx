import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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
  const getDataLocalStorage = (key: string, defaultValue: any) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };

  const [selectedItems, setSelectedItems] = useState<Item[]>(() =>
    getDataLocalStorage('selectedItems', []),
  );
  const [selectedDiscounts, setSelectedDiscounts] = useState<Discount[]>(() =>
    getDataLocalStorage('selectedDiscounts', []),
  );
  const [checkoutItems, setCheckoutItems] = useState<Item[]>(() =>
    getDataLocalStorage('checkoutItems', []),
  );
  const [checkoutDiscounts, setCheckoutDiscounts] = useState<Discount[]>(() =>
    getDataLocalStorage('checkoutDiscounts', []),
  );
  const [totalPrice, setTotalPrice] = useState<number>(() => getDataLocalStorage('totalPrice', 0));
  const [totalRate, setTotalRate] = useState<number>(() => getDataLocalStorage('totalRate', 0));
  const [totalAmount, setTotalAmount] = useState<number>(() =>
    getDataLocalStorage('totalAmount', 0),
  );

  const setDataLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const selectItem = (item: Item) => {
    setSelectedItems((currentItems) => {
      const foundItem = currentItems.find((i) => i.id === item.id);
      const addItems = foundItem
        ? currentItems.filter((i) => i.id !== item.id)
        : [...currentItems, item];

      setDataLocalStorage('selectedItems', addItems);
      return addItems;
    });
  };

  const selectDiscount = (discount: Discount) => {
    setSelectedDiscounts((currentDiscounts) => {
      const foundDiscount = currentDiscounts.find((d) => d.id === discount.id);
      const addDiscount = foundDiscount
        ? currentDiscounts.filter((d) => d.id !== discount.id)
        : [...currentDiscounts, discount];

      setDataLocalStorage('selectedDiscounts', addDiscount);
      return addDiscount;
    });
  };

  const completedSelections = () => {
    setCheckoutItems(selectedItems);
    setCheckoutDiscounts(selectedDiscounts);

    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

    const totalRate =
      Math.round(selectedDiscounts.reduce((sum, discount) => sum + discount.rate, 0) * 100) / 100;

    const totalAmount = totalPrice - totalPrice * totalRate;

    setTotalPrice(totalPrice);
    setTotalRate(totalRate);
    setTotalAmount(totalAmount);

    setDataLocalStorage('checkoutItems', selectedItems);
    setDataLocalStorage('checkoutDiscounts', selectedDiscounts);
    setDataLocalStorage('totalPrice', totalPrice);
    setDataLocalStorage('totalRate', totalRate);
    setDataLocalStorage('totalAmount', totalAmount);
  };

  const cancelSelected = () => {
    setSelectedItems(checkoutItems);
    setSelectedDiscounts(checkoutDiscounts);
  };

  useEffect(() => {
    setDataLocalStorage('selectedItems', selectedItems);
    setDataLocalStorage('selectedDiscounts', selectedDiscounts);
    setDataLocalStorage('checkoutItems', checkoutItems);
    setDataLocalStorage('checkoutDiscounts', checkoutDiscounts);
    setDataLocalStorage('totalPrice', totalPrice);
    setDataLocalStorage('totalRate', totalRate);
    setDataLocalStorage('totalAmount', totalAmount);
  }, [
    selectedItems,
    selectedDiscounts,
    checkoutItems,
    checkoutDiscounts,
    totalPrice,
    totalRate,
    totalAmount,
  ]);

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
