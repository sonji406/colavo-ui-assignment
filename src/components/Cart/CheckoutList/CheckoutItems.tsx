import { useCartContext } from 'contexts/CartContext';
import { useState } from 'react';

const CheckoutItems = () => {
  const { checkoutItems, handleItemCount, completedSelections } = useCartContext();
  const [isOpenCount, setIsOpenCount] = useState<{ [id: string]: boolean }>({});

  const handleCountModal = (id: string) => {
    setIsOpenCount((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
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
          <div className='flex-shrink-0'>
            <button
              onClick={() => handleCountModal(item.id)}
              className='flex bg-gray-100 text-gray-400 text-sm py-1 px-2 rounded-2xl font-medium'
            >
              <span>{item.count}</span>
              <img src='/images/icon/down_icon.png' alt='Down icon' className='w-5 h-5' />
            </button>
            {isOpenCount[item.id] && (
              <div>
                <p>{item.name}</p>
                <select
                  size={5}
                  onChange={(e) => {
                    const updatedCount = Number(e.target.value);
                    handleItemCount(item.id, updatedCount);
                  }}
                >
                  {counts.map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
                <div className='flex'>
                  <button>삭제</button>
                  <button onClick={() => completedChange(item.id)}>완료</button>
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
