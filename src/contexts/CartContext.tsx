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
  updateCountItems: Item[];
  totalPrice: number;
  totalRate: number;
  totalAmount: number;
  selectItem: (item: Item) => void;
  selectDiscount: (discount: Discount) => void;
  handleItemCount: (id: string, count: number) => void;
  completedSelections: () => void;
  completedUpdateCount: () => void;
  removeItem: (id: string) => void;
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
  const [updateCountItems, setUpdateCountItems] = useState<Item[]>([]);
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

  const handleItemCount = (id: string, updateCount: number) => {
    setUpdateCountItems(() => {
      const updatedItems = checkoutItems.map((item) =>
        item.id === id ? { ...item, count: updateCount } : item,
      );

      return updatedItems;
    });
  };

  const calculateTotals = (items: Item[], discounts: Discount[]) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);
    const totalRate =
      Math.round(discounts.reduce((sum, discount) => sum + discount.rate, 0) * 100) / 100;
    const totalAmount = totalPrice - totalPrice * totalRate;

    return { totalPrice, totalRate, totalAmount };
  };

  const checkoutUpdates = (itemsToCheckout: Item[], selectedDiscounts: Discount[]) => {
    const { totalPrice, totalRate, totalAmount } = calculateTotals(
      itemsToCheckout,
      selectedDiscounts,
    );

    const updatedSelectedItems = selectedItems.map((item) => {
      const updatedItem = itemsToCheckout.find((checkoutItem) => checkoutItem.id === item.id);
      return updatedItem ? updatedItem : item;
    });

    setCheckoutItems(itemsToCheckout);
    setCheckoutDiscounts(selectedDiscounts);
    setSelectedItems(updatedSelectedItems);
    setTotalPrice(totalPrice);
    setTotalRate(totalRate);
    setTotalAmount(totalAmount);

    setDataLocalStorage('checkoutItems', itemsToCheckout);
    setDataLocalStorage('checkoutDiscounts', selectedDiscounts);
    setDataLocalStorage('selectedItems', updatedSelectedItems);
    setDataLocalStorage('totalPrice', totalPrice);
    setDataLocalStorage('totalRate', totalRate);
    setDataLocalStorage('totalAmount', totalAmount);
  };

  const completedSelections = () => {
    checkoutUpdates(selectedItems, selectedDiscounts);
  };

  const completedUpdateCount = () => {
    checkoutUpdates(updateCountItems, selectedDiscounts);
  };

  const removeItem = (id: string) => {
    const updatedSelectedItems = selectedItems.filter((item) => item.id !== id);
    const itemsToCheckout = checkoutItems.filter((item) => item.id !== id);

    setSelectedItems(updatedSelectedItems);
    checkoutUpdates(itemsToCheckout, selectedDiscounts);
  };

  const cancelSelected = () => {
    setSelectedItems(checkoutItems);
    setSelectedDiscounts(checkoutDiscounts);
  };

  useEffect(() => {
    const updatedSelectedItems = checkoutItems.filter((item) =>
      selectedItems.find((selectedItem) => selectedItem.id === item.id),
    );
    setSelectedItems(updatedSelectedItems);
  }, [checkoutItems]);

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
        updateCountItems,
        totalPrice,
        totalRate,
        totalAmount,
        selectItem,
        selectDiscount,
        handleItemCount,
        completedSelections,
        completedUpdateCount,
        removeItem,
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
