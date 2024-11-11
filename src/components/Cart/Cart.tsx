import PaymentInformation from './PaymentInformation';
import ButtonGroup from './ButtonGroup';
import DiscountList from './DiscountList';
import PaymentList from './PaymentList';
import TotalAmount from './TotalAmount';
import NextStepButton from './NextStepButton';

const Cart = () => {
  return (
    <div>
      <button className=''>X</button>
      <PaymentInformation />
      <ButtonGroup />
      <PaymentList />
      <DiscountList />
      <TotalAmount />
      <NextStepButton />
    </div>
  );
};

export default Cart;
