interface DiscountMenuProps {
  discounts: { name: string; rate: number }[];
}

const DiscountMenu = ({ discounts }: DiscountMenuProps) => {
  return (
    <div>
      {discounts.map((discount, index) => (
        <div key={index} className='flex justify-between mb-4'>
          <div>
            <p className='text-lg'>{discount.name}</p>
            <p className='text-pink-500 text-sm'>{discount.rate.toLocaleString()}%</p>
          </div>
          <div className='w-8 h-8 flex-shrink-0'>
            <img src='/images/icon/check_icon.png' alt='Check icon' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscountMenu;
