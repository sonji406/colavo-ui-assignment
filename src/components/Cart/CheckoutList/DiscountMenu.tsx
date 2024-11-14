import { useCartContext } from 'contexts/CartContext';

interface DiscountMenuProps {
  discounts: { id: string; name: string; rate: number }[];
}

const DiscountMenu = ({ discounts }: DiscountMenuProps) => {
  const { selectedDiscounts, selectDiscount } = useCartContext();

  const toggleCheckoutDiscount = (discountId: string) => {
    const selectedDiscout = discounts.find((discount) => discount.id === discountId);
    if (selectedDiscout) {
      selectDiscount(selectedDiscout);
    }
  };

  return (
    <div>
      {discounts &&
        discounts.map((discount) => (
          <div
            key={discount.id}
            onClick={() => toggleCheckoutDiscount(discount.id)}
            className='flex justify-between mb-4'
          >
            <div>
              <p className='text-lg'>{discount.name}</p>
              <p className='text-pink-500 text-sm'>{discount.rate.toLocaleString()}%</p>
            </div>
            {selectedDiscounts.find((selectedDiscount) => selectedDiscount.id === discount.id) && (
              <div className='w-8 h-8 flex-shrink-0'>
                <img src='/images/icon/check_icon.png' alt='Check icon' />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default DiscountMenu;
