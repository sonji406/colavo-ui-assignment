interface CheckoutItemsProps {
  itemData: { count: number; name: string; price: number }[];
}

const CheckoutItems = ({ itemData }: CheckoutItemsProps) => {
  return (
    <div className='pt-4'>
      {itemData.map((item, index) => (
        <div key={index} className='flex justify-between items-center mb-4'>
          <div>
            <p className='text-sm'>{item.name}</p>
            <p className='text-gray-500 text-xs'>{item.price.toLocaleString()}원</p>
          </div>
          <div>
            <button className='flex bg-gray-100 text-gray-400 text-sm py-1 px-2 rounded-2xl font-medium'>
              <span>{item.count}</span>
              <img src='/images/icon/down_icon.png' alt='Down icon' className='w-5 h-5' />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutItems;
