import { useCartContext } from 'contexts/CartContext';
import { useState } from 'react';

const CheckoutDiscounts = () => {
  const { checkoutDiscounts, totalPrice, checkoutItems } = useCartContext();
  const [isOpenItem, setIsOpenItem] = useState<{ [id: string]: boolean }>({});

  const handleItemModal = (id: string) => {
    setIsOpenItem((prevState) => {
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

  const toggleDiscoutItems = (itemId: string) => {
    const selectedItem = checkoutItems.find((item) => item.id === itemId);
  };

  return (
    <div>
      {checkoutDiscounts.map((discount) => {
        return (
          <div key={discount.id} className='flex justify-between items-center mb-4'>
            <div>
              <p className='text-sm'>{discount.name}</p>
              <p className='text-xs text-gray-400'>
                {discount.items.map((item) => item.name).join(', ')}
              </p>
              <p className='text-pink-500 text-xs'>
                {(totalPrice * discount.rate * -1).toLocaleString()}원 (
                {Math.round(discount.rate * 100)}%)
              </p>
            </div>
            <div className='flex-shrink-0 relative'>
              <button
                onClick={() => handleItemModal(discount.id)}
                className='flex bg-gray-100 text-gray-400 text-sm py-1 px-2 rounded-2xl font-medium'
              >
                <span>수정</span>
                <img src='/images/icon/down_icon.png' alt='Down icon' className='w-5 h-5' />
              </button>
              {isOpenItem[discount.id] && (
                <div className='border-solid border w-40 absolute top-full mt-2 left-0 -ml-24 z-10 bg-white shadow-lg'>
                  <p className='border-solid border-b py-3 pl-2 mb-4'>{discount.name}</p>
                  {discount.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleDiscoutItems(item.id)}
                      className='flex justify-between items-center mb-4 gap-x-1 pl-2'
                    >
                      <div>
                        <p className='text-sm'>{item.name}</p>
                        <p className='text-gray-500 text-xs'>{item.price.toLocaleString()}원</p>
                      </div>
                      {checkoutItems.find((selectedItem) => selectedItem.id === item.id) && (
                        <div className='w-4 h-4 mr-2 flex-shrink-0'>
                          <img src='/images/icon/check_icon.png' alt='Check icon' />
                        </div>
                      )}
                    </div>
                  ))}
                  <div className='flex w-full text-center py-2 border-solid border-t'>
                    <button className='basis-1/2 text-pink-400 border-r'>삭제</button>
                    <button className='basis-1/2'>확인</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutDiscounts;
