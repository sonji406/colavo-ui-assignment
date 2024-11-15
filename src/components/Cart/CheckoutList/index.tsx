import axios from 'axios';
import { useState, useEffect } from 'react';
import { useViewContext } from 'contexts/ViewContext';
import { useCartContext } from 'contexts/CartContext';

import ItemMenu from './ItemMenu';
import DiscountMenu from './DiscountMenu';
import CheckoutItems from './CheckoutItems';
import CheckoutDiscounts from './CheckoutDiscounts';

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
  items: Item[];
}

const CheckoutList = () => {
  const { currentView } = useViewContext();
  const { handlecurrency } = useCartContext();

  const [items, setItems] = useState<Item[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getResponseData = async () => {
      try {
        const response = await axios.get(
          'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData',
        );

        const { data } = response;

        setItems(
          Object.entries(data.items).map(([key, item]) => ({
            id: key,
            ...(item as Omit<Item, 'id'>),
          })),
        );
        setDiscounts(
          Object.entries(data.discounts).map(([key, discount]) => ({
            id: key,
            ...(discount as Omit<Discount, 'id'>),
            items: [],
          })),
        );
        handlecurrency(data.currency_code);
      } catch (error) {
        setError('데이터 불러오기 실패');
      }
    };

    getResponseData();
  }, []);

  return (
    <div className='flex-grow px-5 pt-4 overflow-y-auto'>
      {currentView === 'main' && (
        <>
          <CheckoutItems />
          <CheckoutDiscounts />
        </>
      )}
      {error ? <p className='text-center'>{error}</p> : ''}
      {currentView === 'itemMenu' && <ItemMenu items={items} />}
      {currentView === 'discountMenu' && <DiscountMenu discounts={discounts} />}
    </div>
  );
};

export default CheckoutList;
