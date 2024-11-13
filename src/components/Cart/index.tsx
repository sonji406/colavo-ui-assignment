import Footer from './Footer';
import Header from './Header';
import ButtonGroup from './ButtonGroup';
import PaymentList from './PaymentList';
import DiscountList from './DiscountList';

const paymentData = {
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

const Cart = () => {
  const totalPrice = Object.values(paymentData).reduce((sum, item) => sum + item.price, 0);

  return (
    <div className='h-full flex flex-col justify-between pt-4'>
      <Header />
      <ButtonGroup />
      <div className='flex-grow px-5'>
        <PaymentList paymentData={paymentData} />
        <DiscountList totalPrice={totalPrice} discountData={discountData} />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
