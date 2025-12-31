import { Link } from "react-router-dom";

interface Props {
  label?: string;
  extraClassName?: string;
  onClick?: () => void;
  to?: string;
}

const Button: React.FC<Props> = ({
  label = "Default",
  onClick,
  to,
  extraClassName,
}) => {
  const className =
    "text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none";

  if (to) {
    return (
      <Link to={to} className={` ${className} ${extraClassName}`}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
