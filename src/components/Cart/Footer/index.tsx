import { useViewContext } from 'contexts/ViewContext';
import TotalAmount from './TotalAmount';
import ResetButton from './ResetButton';
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
          <ResetButton />
        </>
      ) : (
        <CompleteButton />
      )}
    </div>
  );
};

export default Footer;
