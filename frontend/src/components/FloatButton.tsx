import { Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

const FloatButton = () => {
  return (
    <div className="h-auto w-full pb-4 lg:hidden z-10 bottom-0 left-0 absolute flex justify-end">
      <div className="max-full bg-neutral-primary-soft shadow-xs border border-default rounded-base p-2 md:flex md:items-center md:justify-between">
        <div className="inline-flex w-fit h-full md:order-2 md:gap-4 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <NavLink to={"add"}>
            <button
              type="button"
              className="text-white flex justify-center items-center bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              <Plus className="inline h-4 w-4" />
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FloatButton;
