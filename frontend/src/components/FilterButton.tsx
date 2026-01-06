import { Filter } from "lucide-react";

interface Props {
  label: string;
  onClick?: () => void;
  onFilter?: () => void;
  values: string[];
}

const FilterButton: React.FC<Props> = ({ label, onFilter, values }) => {
  return (
    <div className="relative inline-flex items-center">
      <Filter className="absolute left-3 h-4 w-4 text-body pointer-events-none" />
      <select
        id="countries"
        className="block w-fit py-2.5 ps-10 pe-3 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
        defaultValue={label}
        onChange={onFilter}
        value={label}
      >
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterButton;
