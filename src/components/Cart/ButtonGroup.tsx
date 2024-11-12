const ButtonGroup = () => {
  return (
    <div className='flex gap-x-2 px-1 pb-4 border-b-2 border-dashed border-slate-100'>
      <button className='basis-1/2 rounded-xl bg-gray-100 py-3 flex items-center justify-center'>
        <img src='/images/icon/gray_plus_icon.png' alt='Plus Icon' className='w-4 h-4 mr-1' />
        <span className='text-gray-400 font-semibold align-middle mt-0.5'>시술</span>
      </button>
      <button className='basis-1/2 rounded-xl bg-rose-50 py-3 flex items-center justify-center'>
        <img src='/images/icon/pink_plus_icon.png' alt='Plus Icon' className='w-4 h-4 mr-1' />
        <span className='text-pink-400 font-semibold align-middle mt-0.5'>할인</span>
      </button>
    </div>
  );
};

export default ButtonGroup;
