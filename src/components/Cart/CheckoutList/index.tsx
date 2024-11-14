import axios from 'axios';
import { useState, useEffect } from 'react';
import { useViewContext } from 'contexts/ViewContext';

import ItemMenu from './ItemMenu';
import DiscountMenu from './DiscountMenu';
import CheckoutItems from './CheckoutItems';
import CheckoutDiscounts from './CheckoutDiscounts';

interface Item {
  name: string;
  price: number;
  count: number;
}

interface Discount {
  name: string;
  rate: number;
}

const itemData = {
  i_1: {
    count: 1,
    name: '여성컷',
    price: 35000,
  },
  i_2: {
    count: 1,
    name: '남성컷',
    price: 30000,
  },
  i_3: {
    count: 1,
    name: '드라이',
    price: 30000,
  },
  i_4: {
    count: 1,
    name: '기본펌',
    price: 100000,
  },
};

const discountData = {
  d_1: {
    name: '지인 할인',
    rate: 0.08,
  },
  d_2: {
    name: '학생 할인',
    rate: 0.07,
  },
};

const CheckoutList = () => {
  const { currentView } = useViewContext();

  const [items, setItems] = useState<Item[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [currencyCode, setCurrencyCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  const totalPrice = Object.values(itemData).reduce((sum, item) => sum + item.price, 0);

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
            ...(item as Item),
          })),
        );
        setDiscounts(
          Object.entries(data.discounts).map(([key, discount]) => ({
            id: key,
            ...(discount as Discount),
          })),
        );
        setCurrencyCode(data.currency_code);
      } catch (error) {
        setError('데이터 불러오기 실패');
      }
    };

    getResponseData();
  }, []);

  console.log(items);

  return (
    <div className='flex-grow px-5 overflow-y-auto'>
      {currentView === 'main' && (
        <>
          <CheckoutItems itemData={Object.values(itemData)} />
          <CheckoutDiscounts totalPrice={totalPrice} discountData={Object.values(discountData)} />
        </>
      )}
      {currentView === 'itemMenu' && <ItemMenu items={items} />}
      {currentView === 'discountMenu' && <DiscountMenu discounts={discounts} />}
    </div>
  );
};

export default CheckoutList;
