import NextStepButton from './NextStepButton';
import TotalAmount from './TotalAmount';

const Footer = () => {
  return (
    <div className='px-5'>
      <TotalAmount />
      <NextStepButton />
    </div>
  );
};

export default Footer;
