import { FileArchive, Image, List, Maximize, SmileIcon } from "lucide-react";

interface Props {
  placeholder?: string;
}

const EditorText: React.FC<Props> = ({ placeholder }) => {
  return (
    <>
      <div className="w-full mb-4 border border-default-medium rounded-base bg-neutral-secondary-medium shadow-xs">
        <div className="flex items-center justify-between px-3 py-2 border-b border-default-medium">
          <div className="flex flex-wrap items-center divide-default-medium sm:divide-x sm:rtl:divide-x-reverse">
            <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
              <button
                type="button"
                className="p-2 text-body rounded-sm cursor-pointer hover:text-heading hover:bg-neutral-tertiary-medium"
              >
                <FileArchive className="w-5 h-5" />
                <span className="sr-only">Attach file</span>
              </button>
              <button
                type="button"
                className="p-2 text-body rounded-sm cursor-pointer hover:text-heading hover:bg-neutral-tertiary-medium"
              >
                <Image className="w-5 h-5" />
                <span className="sr-only">Upload image</span>
              </button>
              <button
                type="button"
                className="p-2 text-body rounded-sm cursor-pointer hover:text-heading hover:bg-neutral-tertiary-medium"
              >
                <SmileIcon className="w-5 h-5" />
                <span className="sr-only">Add emoji</span>
              </button>
            </div>
            <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
              <button
                type="button"
                className="p-2 text-body rounded-sm cursor-pointer hover:text-heading hover:bg-neutral-tertiary-medium"
              >
                <List className="w-5 h-5" />
                <span className="sr-only">Add list</span>
              </button>
            </div>
          </div>
          <button
            type="button"
            data-tooltip-target="tooltip-fullscreen"
            className="p-2 text-body rounded-sm cursor-pointer sm:ms-auto hover:text-heading hover:bg-neutral-tertiary-medium"
          >
            <Maximize className="w-5 h-5" />
            <span className="sr-only">Pantalla completa</span>
          </button>
          <div
            id="tooltip-fullscreen"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip"
          >
            Pantalla completa
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
        <div className="px-4 py-2 bg-neutral-secondary-medium rounded-b-base">
          <label htmlFor="editor" className="sr-only">
            Publish post
          </label>
          <textarea
            id="editor"
            rows={8}
            className="block w-full px-0 text-sm text-heading bg-neutral-secondary-medium border-0 focus:ring-0 placeholder:text-body"
            placeholder={placeholder}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default EditorText;
