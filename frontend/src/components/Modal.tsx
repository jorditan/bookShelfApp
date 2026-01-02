import React, { useMemo, useState, type JSX } from "react";
import Form from "./Form";

interface Props {
  buttonToggleText?: string;
  modalHeader: string;
  modalDescription?: string;
  submitButtonText?: string;
  icon?: JSX.Element;
  cancelButtonText?: string;
}

const Modal: React.FC<Props> = ({
  buttonToggleText = "Abrir",
  modalHeader,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalId = useMemo(
    () => `crud-modal-${Math.random().toString(36).slice(2, 8)}`,
    []
  );

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
        className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none flex gap-2 items-center"
        type="button"
        aria-haspopup="dialog"
        aria-controls={modalId}
        aria-expanded={isOpen}
      >
        {icon}
        {buttonToggleText}
      </button>

      <div
        id={modalId}
        role="dialog"
        aria-modal="true"
        className={`${
          isOpen ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/40`}
        onClick={handleClose}
      >
        <div
          className="relative p-4 w-full max-w-lg max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
              <h3 className="text-lg font-medium text-heading">
                {modalHeader}
              </h3>
              <button
                type="button"
                className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                onClick={handleClose}
                aria-label="Cerrar modal"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <Form />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
