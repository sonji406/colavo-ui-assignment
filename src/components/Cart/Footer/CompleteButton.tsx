import { useCartContext } from 'contexts/CartContext';
import { useViewContext } from 'contexts/ViewContext';

const CompleteButton = () => {
  const { currentView, changeView } = useViewContext();
  const { completedSelections } = useCartContext();

  const completeCheckout = () => {
    completedSelections();
    changeView('main');
  };

  return (
    <div className='text-white text-center'>
      <p className='py-4 font-medium'>
        {currentView === 'itemMenu' ? '서비스를 선택하세요' : '할인을 선택하세요'}(여러 개 선택가능)
      </p>
      <button onClick={completeCheckout} className='bg-violet-300 font-bold w-full py-3 rounded-lg'>
        완료
      </button>
    </div>
  );
};

export default CompleteButton;
