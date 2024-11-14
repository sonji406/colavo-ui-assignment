import { useCartContext } from 'contexts/CartContext';

interface ItemMenuProps {
  items: { id: string; name: string; price: number; count: number }[];
  currencyCode: string;
}

const ItemMenu = ({ items, currencyCode }: ItemMenuProps) => {
  const { checkoutItems, handleCheckoutItems } = useCartContext();

  const toggleCheckoutItem = (itemId: string) => {
    const selectedItem = items.find((item) => item.id === itemId);
    if (selectedItem) {
      handleCheckoutItems(selectedItem);
    }
  };

  return (
    <div>
      {items &&
        items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleCheckoutItem(item.id)}
            className='flex justify-between mb-4'
          >
            <div>
              <p className='text-lg'>{item.name}</p>
              <p className='text-gray-500 text-base'>
                {currencyCode === 'KRW' ? item.price.toLocaleString() + '원' : '$'}
              </p>
            </div>
            {checkoutItems.find((checkoutItem) => checkoutItem.id === item.id) && (
              <div className='w-8 h-8 flex-shrink-0'>
                <img src='/images/icon/check_icon.png' alt='Check icon' />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ItemMenu;
