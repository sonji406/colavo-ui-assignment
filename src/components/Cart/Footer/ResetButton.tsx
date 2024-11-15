const ResetButton = () => {
  const resetLocalStorage = () => {
    window.localStorage.clear();
    location.reload();
  };

  return (
    <div>
      <button
        onClick={resetLocalStorage}
        className='bg-violet-400 text-white font-extrabold w-full py-3 rounded-lg'
      >
        초기화
      </button>
    </div>
  );
};

export default ResetButton;
