import { useViewContext } from 'contexts/ViewContext';
import TotalAmount from './TotalAmount';
import NextStepButton from './NextStepButton';

const Footer = () => {
  const { currentView } = useViewContext();

  return (
    <div className='border-solid border-t-2 border-gray-100 px-5'>
      {currentView === 'main' && (
        <>
          <TotalAmount totalAmount={135750} />
          <NextStepButton />
        </>
      )}
    </div>
  );
};

export default Footer;
