import { useViewContext } from 'contexts/ViewContext';
import CheckoutDiscounts from './CheckoutDiscounts';
import CheckoutItems from './CheckoutItems';
import ItemMenu from './ItemMenu';

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
  const totalPrice = Object.values(itemData).reduce((sum, item) => sum + item.price, 0);

  return (
    <div className='flex-grow px-5'>
      {currentView === 'main' && (
        <>
          <CheckoutItems itemData={Object.values(itemData)} />
          <CheckoutDiscounts totalPrice={totalPrice} discountData={Object.values(discountData)} />
        </>
      )}
      {currentView === 'itemMenu' && <ItemMenu />}
    </div>
  );
};

export default CheckoutList;
