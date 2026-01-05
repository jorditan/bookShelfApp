interface Props {
  label: string;
  onClick?: () => void;
  onFilter?: () => void;
  values: string[];
}

const FilterButton: React.FC<Props> = ({
  label,
  onClick,
  onFilter,
  values,
}) => {
  return (
    <>
      <select
        id="countries"
        className="block w-fit px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
      >
        <option selected>{label}</option>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterButton;
