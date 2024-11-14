import { useViewContext } from 'contexts/ViewContext';
import PaymentInformation from './PaymentInformation';
import { useCartContext } from 'contexts/CartContext';

const Header = () => {
  const { currentView, changeView } = useViewContext();
  const { cancelSelected } = useCartContext();

  const handleCartMain = () => {
    changeView('main');
    cancelSelected();
  };

  return (
    <div className='flex items-center w-full relative mb-8 px-4'>
      <button onClick={handleCartMain} className='w-6 h-6'>
        <img src='/images/icon/close_icon.png' alt='Close icon' />
      </button>
      <div className='absolute left-1/2 transform -translate-x-1/2 text-center'>
        {currentView === 'main' && <PaymentInformation />}
        {currentView === 'itemMenu' && <p className='text-xl font-semibold'>시술메뉴</p>}
        {currentView === 'discountMenu' && <p className='text-xl font-semibold'>할인</p>}
      </div>
    </div>
  );
};

export default Header;
