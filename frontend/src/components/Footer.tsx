import { Tooltip } from "flowbite";
import { NavLink } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import { SunMoon } from "lucide-react";
import { changeTheme } from "../theme/themeController";
import Button from "./Button";

const Footer = () => {
  return (
    <footer className="bg-neutral-primary-soft z-10 absolute bottom-0 left-0 right-0 rounded-base shadow-xs border border-default m-4">
      <div className="w-full mx-auto max-full p-4 md:flex md:items-center md:justify-between">
        <div className="hidden md:inline-flex w-fit h-full md:order-2 md:gap-4 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <NavLink to={"add"}>
            <Button label="Añadir reseña" />
          </NavLink>

          <ButtonIcon onClick={changeTheme} icon={<SunMoon />} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
