import Header from './Header';
import Footer from './Footer';
import ButtonGroup from './ButtonGroup';
import CheckoutList from './CheckoutList';
import ViewProvider from 'contexts/ViewContext';

const Cart = () => {
  return (
    <ViewProvider>
      <div className='h-full flex flex-col justify-between pt-4'>
        <Header />
        <ButtonGroup />
        <CheckoutList />
        <Footer />
      </div>
    </ViewProvider>
  );
};

export default Cart;
