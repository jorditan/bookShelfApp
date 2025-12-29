import type { JSX } from "react/jsx-dev-runtime";

interface Props {
  label?: string;
  onClick?: () => void;
  icon: JSX.Element;
}

const ButtonIcon: React.FC<Props> = ({ label, onClick, icon }) => {
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className="toggle-full-view flex h-fit w-fit py-1 px-2 items-center justify-center h-unset text-xs font-medium text-body bg-neutral-primary-medium border border-default-medium rounded-base focus:outline-none hover:bg-neutral-secondary-strong hover:border-default-strong hover:text-heading focus:z-10 focus:ring-2 focus:ring-neutral-tertiary"
      >
        {icon}
        <span className="sr-only">{label}</span>
      </button>
    </>
  );
};

export default ButtonIcon;
