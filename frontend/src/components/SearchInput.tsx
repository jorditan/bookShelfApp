import { Search } from "lucide-react";
import useBookStore from "../store/useBookStore";
import { useEffect } from "react";

interface Props {
  onSearch: (query: string) => void;
  placeholder: string;
}

const SearchInput = ({ onSearch, placeholder }: Props) => {
  const { searchQuery, setQuery } = useBookStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery!.trim());
  };

  useEffect(() => {
    if (!searchQuery!.trim()) return;

    const timeout = setTimeout(() => {
      onSearch(searchQuery!.trim());
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="search"
          className="block mb-2.5 text-sm font-medium text-heading sr-only "
        >
          Buscar
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="w-4 h-4 text-body" />
          </div>
          <input
            onChange={(e) => setQuery!(e.target.value)}
            type="search"
            id="search"
            className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            placeholder={placeholder}
          />
          <button
            type="submit"
            className="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
          >
            Buscar
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchInput;
