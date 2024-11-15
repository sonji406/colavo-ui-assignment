import { useCartContext } from 'contexts/CartContext';
import { useState } from 'react';

const CheckoutItems = () => {
  const { checkoutItems, handleItemCount, completedSelections } = useCartContext();
  const [isOpenCount, setIsOpenCount] = useState<{ [id: string]: boolean }>({});

  const handleCountModal = (id: string) => {
    setIsOpenCount((prevState) => {
      const newState = Object.keys(prevState).reduce(
        (acc, key) => {
          acc[key] = false;
          return acc;
        },
        {} as { [key: string]: boolean },
      );

      return {
        ...newState,
        [id]: !prevState[id],
      };
    });
  };

  const completedChange = (id: string) => {
    handleCountModal(id);
    completedSelections();
  };

  const counts = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div>
      {checkoutItems.map((item) => (
        <div key={item.id} className='flex justify-between items-center mb-4 gap-x-1'>
          <div>
            <p className='text-sm'>{item.name}</p>
            <p className='text-gray-500 text-xs'>{item.price.toLocaleString()}원</p>
          </div>
          <div className='flex-shrink-0 relative'>
            <button
              onClick={() => handleCountModal(item.id)}
              className='flex bg-gray-100 text-gray-400 text-sm py-1 px-2 rounded-2xl font-medium'
            >
              <span>{item.count}</span>
              <img src='/images/icon/down_icon.png' alt='Down icon' className='w-5 h-5' />
            </button>
            {isOpenCount[item.id] && (
              <div className='border-solid border w-40 absolute top-full mt-2 left-0 -ml-28 z-10 bg-white shadow-lg'>
                <p className='py-4 pl-2'>{item.name}</p>
                <select
                  size={5}
                  onChange={(e) => {
                    const updatedCount = Number(e.target.value);
                    handleItemCount(item.id, updatedCount);
                  }}
                  className='border-solid border-y w-full'
                >
                  {counts.map((count) => (
                    <option key={count} value={count} className='text-center'>
                      {count}
                    </option>
                  ))}
                </select>
                <div className='flex w-full text-center py-2'>
                  <button className='basis-1/2 text-pink-400 border-r'>삭제</button>
                  <button onClick={() => completedChange(item.id)} className='basis-1/2'>
                    완료
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutItems;
