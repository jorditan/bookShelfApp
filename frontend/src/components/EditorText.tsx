interface Props {
  placeholder?: string;
  onChange?: (value: string) => void;
}

const EditorText: React.FC<Props> = ({ placeholder, onChange }) => {
  return (
    <>
      <div className="w-full mb-4 overflow-hidden border border-default-medium rounded-base bg-neutral-secondary-medium shadow-xs">
        <div className="px-4 py-2 bg-neutral-secondary-medium rounded-b-base">
          <label htmlFor="editor" className="sr-only">
            Publish post
          </label>
          <textarea
            id="editor"
            onChange={(e) => onChange && onChange(e.target.value)}
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
