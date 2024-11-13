import axios from 'axios';
import { useEffect, useState } from 'react';

interface Item {
  name: string;
  price: number;
  count: number;
}

interface Discount {
  name: string;
  rate: number;
}

const ItemMenu = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [currencyCode, setCurrencyCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getResponseData = async () => {
      try {
        const response = await axios.get(
          'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData',
        );

        const { data } = response;

        setItems(Object.values(data.items));
        setDiscounts(Object.values(data.discounts));
        setCurrencyCode(data.currency_code);
      } catch (error) {
        setError('데이터 불러오기 실패');
      }
    };

    getResponseData();
  }, []);

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className='flex justify-between mb-4'>
          <div>
            <p className='text-lg'>{item.name}</p>
            <p className='text-gray-500 text-base'>{item.price.toLocaleString()}원</p>
          </div>
          <div>
            <img src='/images/icon/check_icon.png' alt='Check icon' className='w-8 h-8' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemMenu;
