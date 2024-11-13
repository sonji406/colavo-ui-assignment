import PaymentInformation from './PaymentInformation';
import { useViewContext } from 'contexts/ViewContext';

const Header = () => {
  const { currentView } = useViewContext();

  return (
    <div className='flex items-center w-full relative mb-8 px-4'>
      <button className='w-6 h-6'>
        <img src='/images/icon/close_icon.png' alt='Close icon' />
      </button>
      {currentView === 'main' && <PaymentInformation />}
      {currentView === 'itemMenu' && <div>시술메뉴</div>}
      {currentView === 'discountMenu' && <div>할인</div>}
    </div>
  );
};

export default Header;
