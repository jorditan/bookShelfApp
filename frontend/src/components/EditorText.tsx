import { useState } from "react";

interface Props {
  label?: string;
  placeholder?: string;
  maxLenght?: number;
  onChange?: (value: string) => void;
}

const EditorText: React.FC<Props> = ({
  label,
  placeholder,
  onChange,
  maxLenght,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    setValue(next);
    onChange?.(next);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <label
          htmlFor="message"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          {label}
        </label>
        <small className="text-body">
          {value.length}/{maxLenght}
        </small>
      </div>
      <div className="w-full mb-4 overflow-hidden border border-default-medium rounded-base bg-neutral-secondary-medium shadow-xs">
        <div className="px-4 py-2 bg-neutral-secondary-medium rounded-b-base">
          <textarea
            maxLength={maxLenght}
            id="editor"
            value={value}
            onChange={handleChange}
            rows={8}
            className="block w-full overflow-hidden px-0 text-sm text-heading bg-neutral-secondary-medium border-0 focus:ring-0 placeholder:text-body"
            placeholder={placeholder}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default EditorText;
