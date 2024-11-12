import NextStepButton from './NextStepButton';
import TotalAmount from './TotalAmount';

const Footer = () => {
  return (
    <div className='border-solid border-t-2 border-gray-100 px-5'>
      <TotalAmount />
      <NextStepButton />
    </div>
  );
};

export default Footer;
