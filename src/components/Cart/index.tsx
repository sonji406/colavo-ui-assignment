import Footer from './Footer';
import Header from './Header';
import ButtonGroup from './ButtonGroup';
import PaymentList from './PaymentList';
import DiscountList from './DiscountList';

const Cart = () => {
  return (
    <div className='h-full flex flex-col justify-between pt-4'>
      <Header />
      <ButtonGroup />
      <div className='flex-grow px-5 border-solid border-b border-gray-200'>
        <PaymentList />
        <DiscountList />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
