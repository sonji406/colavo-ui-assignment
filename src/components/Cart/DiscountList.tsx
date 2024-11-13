interface DiscountItem {
  name: string;
  rate: number;
}
interface DiscountListProps {
  totalPrice: number;
  discountData: Record<string, DiscountItem>;
}

const DiscountList = ({ totalPrice, discountData }: DiscountListProps) => {
  return (
    <div className='pt-4'>
      {Object.keys(discountData).map((key) => {
        const item = discountData[key];

        return (
          <div key={key} className='flex justify-between items-center mb-4'>
            <div>
              <p className='text-sm'>{item.name}</p>
              <p className='text-pink-500 text-xs'>
                {(totalPrice * item.rate * -1).toLocaleString()}원 ({Math.round(item.rate * 100)}%)
              </p>
            </div>
            <div>
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

export default DiscountList;
