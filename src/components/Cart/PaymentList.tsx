interface PaymentItem {
  count: number;
  name: string;
  price: number;
}
interface PaymentListProps {
  paymentData: Record<string, PaymentItem>;
}

const PaymentList = ({ paymentData }: PaymentListProps) => {
  return (
    <div className='pt-4'>
      {Object.keys(paymentData).map((key) => {
        const item = paymentData[key];

        return (
          <div key={key} className='flex justify-between items-center mb-4'>
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
        );
      })}
    </div>
  );
};

export default PaymentList;
