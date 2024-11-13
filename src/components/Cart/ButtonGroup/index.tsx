import { useViewContext } from 'contexts/ViewContext';
import Button from './Button';

const ButtonGroup = () => {
  const { currentView, changeView } = useViewContext();

  const handleItemMenu = () => {
    changeView('itemMenu');
  };

  const handleDiscountMenu = () => {
    changeView('discountMenu');
  };

  return (
    <>
      {currentView === 'main' && (
        <div className='flex gap-x-2 mx-5 pb-4 border-b-2 border-dashed border-slate-100'>
          <Button
            onClick={handleItemMenu}
            icon='/images/icon/gray_plus_icon.png'
            bgColor='bg-gray-100'
            textColor='text-gray-400'
            text='시술'
          />
          <Button
            onClick={handleDiscountMenu}
            icon='/images/icon/pink_plus_icon.png'
            bgColor='bg-rose-50'
            textColor='text-pink-400'
            text='할인'
          />
        </div>
      )}
    </>
  );
};

export default ButtonGroup;
