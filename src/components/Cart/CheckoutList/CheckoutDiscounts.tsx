import { useCartContext } from 'contexts/CartContext';

const CheckoutDiscounts = () => {
  const { checkoutDiscounts, totalPrice } = useCartContext();

  return (
    <div>
      {checkoutDiscounts.map((discount) => {
        return (
          <div key={discount.id} className='flex justify-between items-center mb-4'>
            <div>
              <p className='text-sm'>{discount.name}</p>
              <p className='text-pink-500 text-xs'>
                {(totalPrice * discount.rate * -1).toLocaleString()}원 (
                {Math.round(discount.rate * 100)}%)
              </p>
            </div>
            <div className='flex-shrink-0'>
              <button className='flex bg-gray-100 text-gray-400 text-sm py-1 px-2 rounded-2xl font-medium'>
                <span>수정</span>
                <img src='/images/icon/down_icon.png' alt='Down icon' className='w-5 h-5' />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutDiscounts;
