import { useCartContext } from 'contexts/CartContext';

const TotalAmount = () => {
  const { totalAmount, currencyCode } = useCartContext();

  return (
    <div className='flex justify-between items-center py-4 font-normal'>
      <p className='text-base text-zinc-400'>합계</p>
      <p className='text-4xl'>
        {currencyCode === 'KRW'
          ? totalAmount.toLocaleString() + '원'
          : '$' + (totalAmount / 1400).toFixed(2)}
      </p>
    </div>
  );
};

export default TotalAmount;
