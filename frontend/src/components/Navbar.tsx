import { Link, NavLink } from "react-router-dom";
import { changeTheme } from "../theme/themeController";
import Button from "./Button";
import ButtonIcon from "./ButtonIcon";
import { BookAIcon, SunMoon } from "lucide-react";
import SearchInput from "./SearchInput";
import { Tooltip } from "flowbite-react";
import useBookStore from "../store/useBookStore";

const Navbar = () => {
  const { searchBook } = useBookStore();
  const { books } = useBookStore();
  return (
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/"} className="flex items-center gap-2">
          <BookAIcon className="h-8 w-8 text-body" />
          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
            BookShelf
          </span>
        </Link>

        <div className="w-md">
          {books.length > 0 && (
            <SearchInput
              placeholder="Buscar libro por título..."
              onSearch={(query) => searchBook && searchBook({ title: query })}
            />
          )}
        </div>

        <div className="inline-flex h-full md:order-2 gap-4 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {books.length > 0 && (
            <NavLink to={"add"}>
              <Button label="Añadir reseña" />
            </NavLink>
          )}
          <Tooltip content="Cambiar tema" placement="bottom">
            <ButtonIcon onClick={changeTheme} icon={<SunMoon />} />
          </Tooltip>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
