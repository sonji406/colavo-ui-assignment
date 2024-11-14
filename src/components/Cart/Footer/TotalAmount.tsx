import { useCartContext } from 'contexts/CartContext';

const TotalAmount = () => {
  const { totalAmount } = useCartContext();

  return (
    <div className='flex justify-between items-center py-4 font-normal'>
      <p className='text-base text-zinc-400'>합계</p>
      <p className='text-4xl'>{totalAmount.toLocaleString()}원</p>
    </div>
  );
};

export default TotalAmount;
