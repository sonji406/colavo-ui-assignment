import formatDate from '../../../utils/formatDate';

const PaymentInformation = () => {
  const paymentData = {
    fullName: '곽지우',
    completedDate: formatDate(new Date()),
  };

  return (
    <div className='absolute left-1/2 transform -translate-x-1/2 text-center'>
      <p className='text-lg font-medium'>{paymentData.fullName}</p>
      <p className='text-sm text-gray-300 font-medium'>{paymentData.completedDate}</p>
    </div>
  );
};

export default PaymentInformation;
