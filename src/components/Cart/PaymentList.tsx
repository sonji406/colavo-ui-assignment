import CustomSelect from './CustomSelect';

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
              <select>
                <option value='1'>1</option>
              </select>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentList;
