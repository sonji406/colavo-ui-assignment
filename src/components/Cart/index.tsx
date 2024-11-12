import ButtonGroup from './ButtonGroup';
import DiscountList from './DiscountList';
import NextStepButton from './NextStepButton';
import PaymentInformation from './PaymentInformation';
import PaymentList from './PaymentList';
import TotalAmount from './TotalAmount';

const Cart = () => {
  return (
    <div>
      <div className='flex items-center w-full relative mb-8'>
        <img src='/images/icon/close_icon.png' alt='Close icon' className='w-6 h-6' />
        <PaymentInformation />
      </div>
      <ButtonGroup />
      <PaymentList />
      <DiscountList />
      <TotalAmount />
      <NextStepButton />
    </div>
  );
};

export default Cart;
