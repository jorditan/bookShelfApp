import React, { useState } from "react";
import { Calendar } from "lucide-react";
import EditorText from "./EditorText";
import toast from "react-hot-toast";
import Alert from "./Alert";
import { useFormValidation } from "../hooks/useFormValidation";

interface BookFormValues {
  title: string;
  author: string;
  publisher: string;
  rating: number;
  review: string;
  readDate: string;
}

interface FormProps {
  initialValues?: Partial<BookFormValues>;
  onSubmit: (data: BookFormValues) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
}

const Form = ({
  initialValues,
  onSubmit,
  submitLabel = "Guardar libro",
  onCancel,
}: FormProps) => {
  const [form, setForm] = useState<BookFormValues>({
    title: initialValues?.title || "",
    author: initialValues?.author || "",
    publisher: initialValues?.publisher || "",
    rating: initialValues?.rating || 0,
    review: initialValues?.review || "",
    readDate: initialValues?.readDate || "",
  });

  const { errors, validate, clearErrors } = useFormValidation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const isValid = validate(form);

    if (!isValid) {
      toast.error("Por favor completa los campos del formulario");
      setTimeout(() => {
        clearErrors();
      }, 4000);
      return;
    }

    await onSubmit(form);
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full pt-6 mx-auto space-y-4">
        <div className="flex flex-col gap-4">
          <div id="name" className="flex flex-col gap-1.5">
            <label
              htmlFor="visitors"
              className={`
                ${errors.title ? "text-red-600" : ""}
                block text-sm font-medium text-heading`}
            >
              Título *{" "}
            </label>
            <input
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              value={form.title}
              type="text"
              id="visitors"
              className={`${errors.title ? "border-red-600" : "border-default-medium"} bg-neutral-secondary-medium border text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 shadow-xs placeholder:text-body`}
              placeholder="Ej: El Principito"
            />
            {errors.title && (
              <small className="text-sm text-red-600 mt-1">
                {errors.title}
              </small>
            )}
          </div>
          <div id="author" className="flex flex-col gap-1.5">
            <label
              htmlFor="visitors"
              className={`${errors.author ? "text-red-600" : ""} block text-sm font-medium text-heading`}
            >
              Autor *{" "}
            </label>
            <input
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              type="text"
              id="visitors"
              className={`${errors.author ? "border-red-600" : "border-default-medium"} bg-neutral-secondary-medium border text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 shadow-xs placeholder:text-body`}
              placeholder="Ej: Antoine de Saint-Exupéry"
            />
            {errors.author && (
              <small className="text-sm text-red-600 mt-1">
                {errors.author}
              </small>
            )}
          </div>
          <div id="editorial" className="flex flex-col gap-1.5">
            <label
              htmlFor="visitors"
              className="block text-sm font-medium text-heading"
            >
              Editorial{" "}
            </label>
            <input
              onChange={(e) => setForm({ ...form, publisher: e.target.value })}
              type="text"
              value={form.publisher}
              id="visitors"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 shadow-xs placeholder:text-body"
              placeholder="Ej: Editorial Planeta"
            />
          </div>
          <div className="relative max-w-sm flex flex-col gap-1.5">
            <label
              htmlFor="readingDate"
              className="block text-sm font-medium text-heading"
            >
              Fecha de lectura
            </label>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Calendar className="w-4 h-4 text-body" />
              </div>
              <input
                value={form.readDate}
                id="datepicker-autohide"
                onChange={(e) => setForm({ ...form, readDate: e.target.value })}
                type="date"
                className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 shadow-xs placeholder:text-body"
                placeholder="Seleccione una fecha"
              />
            </div>
            <small className="text-body">¿Cuándo terminaste de leerlo?</small>
            {errors.readDate && (
              <small className="text-sm text-red-600 mt-1">
                {errors.readDate}
              </small>
            )}
          </div>

          <div className="relative mb-6 h-auto">
            <label
              htmlFor="labels-range-input text-body"
              className="block text-sm font-medium text-heading"
            >
              Calificación: {form.rating}/5
            </label>
            <input
              value={form.rating}
              id="labels-range-input"
              type="range"
              onChange={(e) =>
                setForm({ ...form, rating: parseFloat(e.target.value) })
              }
              min="0"
              max="5"
              step="0.5"
              className="w-full h-2 bg-neutral-quaternary rounded-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-body -bottom-2 relative ">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
        </div>

        <div>
          {/*Reseña*/}
          <EditorText
            label="Reseña"
            maxLenght={2040}
            value={form.review}
            onChange={(value) => setForm({ ...form, review: value })}
            placeholder="Escribe tu análisis aquí..."
          />

          <Alert
            title="Información:"
            text="Podrás editar todos estos datos más tarde."
            type="info"
          />
        </div>
        <div className="flex w-full justify-end">
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              type="button"
              className="text-body hover:cursor-pointer  bg-neutral-primary border border-default hover:bg-neutral-secondary-soft hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              {" "}
              Cancelar
            </button>

            <button
              disabled={false}
              type="submit"
              className={`"opacity-50 cursor-not-allowed" : ""} text-white hover:cursor-pointer bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none`}
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
