import { useViewContext } from 'contexts/ViewContext';

const CompleteButton = () => {
  const { currentView } = useViewContext();

  const handleAdd = (type: string) => {
    if (type === 'item') {
      // 대충 item 추가
    } else if (type === 'discount') {
      // 대충 discount 추가
    }
  };

  return (
    <div className='text-white text-center'>
      <p className='py-4 font-medium'>
        {currentView === 'itemMenu' ? '서비스를 선택하세요' : '할인을 선택하세요'}(여러 개 선택가능)
      </p>
      <button
        onClick={() => handleAdd(currentView === 'itemMenu' ? 'item' : 'discount')}
        className='bg-violet-300 font-bold w-full py-3 rounded-lg'
      >
        완료
      </button>
    </div>
  );
};

export default CompleteButton;
