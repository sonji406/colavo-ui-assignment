interface ButtonProps {
  icon: string;
  bgColor: string;
  textColor: string;
  text: string;
}

const Button = ({ icon, bgColor, textColor, text }: ButtonProps) => (
  <button className={`basis-1/2 rounded-xl py-3 flex items-center justify-center ${bgColor}`}>
    <img src={icon} alt='Plus Icon' className='w-4 h-4 mr-1' />
    <span className={`font-semibold align-middle mt-0.5 ${textColor}`}>{text}</span>
  </button>
);

export default Button;
