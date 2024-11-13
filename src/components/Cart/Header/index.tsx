import PaymentInformation from './PaymentInformation';

const Header = () => {
  return (
    <div className='flex items-center w-full relative mb-8 px-4'>
      <button className='w-6 h-6'>
        <img src='/images/icon/close_icon.png' alt='Close icon' />
      </button>
      <PaymentInformation />
    </div>
  );
};

export default Header;
