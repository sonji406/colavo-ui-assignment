import { useViewContext } from 'contexts/ViewContext';
import TotalAmount from './TotalAmount';
import NextStepButton from './NextStepButton';
import CompleteButton from './CompleteButton';

const Footer = () => {
  const { currentView } = useViewContext();

  return (
    <div
      className={`px-5 pb-12 ${currentView !== 'main' ? 'bg-violet-400' : 'border-solid border-t-2 border-gray-100'}`}
    >
      {currentView === 'main' ? (
        <>
          <TotalAmount />
          <NextStepButton />
        </>
      ) : (
        <CompleteButton />
      )}
    </div>
  );
};

export default Footer;
