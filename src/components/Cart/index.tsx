import Header from './Header';
import Footer from './Footer';
import ButtonGroup from './ButtonGroup';
import CheckoutList from './CheckoutList';
import ViewProvider from 'contexts/ViewContext';
import CartProvider from 'contexts/CartContext';

const Cart = () => {
  return (
    <ViewProvider>
      <CartProvider>
        <div className='h-full flex flex-col justify-between pt-4'>
          <Header />
          <ButtonGroup />
          <CheckoutList />
          <Footer />
        </div>
      </CartProvider>
    </ViewProvider>
  );
};

export default Cart;
