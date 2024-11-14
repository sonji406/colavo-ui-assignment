interface ItemMenuProps {
  items: { name: string; price: number }[];
}

const ItemMenu = ({ items }: ItemMenuProps) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className='flex justify-between mb-4'>
          <div>
            <p className='text-lg'>{item.name}</p>
            <p className='text-gray-500 text-base'>{item.price.toLocaleString()}원</p>
          </div>
          <div className='w-8 h-8 flex-shrink-0'>
            <img src='/images/icon/check_icon.png' alt='Check icon' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemMenu;
