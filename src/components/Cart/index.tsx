import Header from './Header';
import Footer from './Footer';
import ButtonGroup from './ButtonGroup';
import CheckoutList from './CheckoutList';

const Cart = () => {
  return (
    <div className='h-full flex flex-col justify-between pt-4'>
      <Header />
      <ButtonGroup />
      <CheckoutList />
      <Footer />
    </div>
  );
};

export default Cart;
