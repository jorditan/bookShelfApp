import React, { useState } from "react";
import { Download } from "lucide-react";
import EditorText from "./EditorText";
import { NavLink } from "react-router-dom";
import { useCreateBook } from "../hooks/useCreateBook";
import Sonner from "../components/Sonner";
import { useToast } from "../hooks/useSonner";

const Form = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    publisher: "",
    review: "",
    readDate: "",
  });

  const { visible, message, type, showToast, hideToast } = useToast(3000);

  const { submitBook, loading, err } = useCreateBook();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await submitBook({
        title: form.title,
        author: form.author,
        publisher: form.publisher,
        review: form.review,
        read_date: form.readDate,
        id_book: 0,
      });
      showToast("Libro creado con éxito");
    } catch (error) {
      showToast("Error al crear el libro", "error");
      console.log(error, err);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full mx-auto space-y-4">
        <div className="flex flex-col gap-4">
          <div id="name" className="flex flex-col gap-1.5">
            <label
              htmlFor="visitors"
              className="block text-sm font-medium text-heading"
            >
              Título *{" "}
            </label>
            <input
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              type="text"
              id="visitors"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 shadow-xs placeholder:text-body"
              placeholder="Ej: El Principito"
              required
            />
          </div>
          <div id="author" className="flex flex-col gap-1.5">
            <label
              htmlFor="visitors"
              className="block text-sm font-medium text-heading"
            >
              Autor *{" "}
            </label>
            <input
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              type="text"
              id="visitors"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 shadow-xs placeholder:text-body"
              placeholder="Ej: Antoine de Saint-Exupéry"
              required
            />
          </div>
          <div id="editorial" className="flex flex-col gap-1.5">
            <label
              htmlFor="visitors"
              className="block text-sm font-medium text-heading"
            >
              Editorial *{" "}
            </label>
            <input
              onChange={(e) => setForm({ ...form, publisher: e.target.value })}
              type="text"
              id="visitors"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 shadow-xs placeholder:text-body"
              placeholder="Ej: Editorial Planeta"
              required
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
                <svg
                  className="w-4 h-4 text-body"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                  />
                </svg>
              </div>
              <input
                id="datepicker-autohide"
                datepicker-autohide
                type="text"
                className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 shadow-xs placeholder:text-body"
                placeholder="Select date"
              />
            </div>
          </div>
        </div>

        <div>
          {/*Reseña*/}
          <label
            htmlFor="message"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Reseña
          </label>
          <EditorText placeholder="Escribe tu análisis aquí..." />
          <div className="flex flex-col gap-2">
            <div className="w-full flex gap-2 justify-center bg-neutral-secondary items-center border-dashed px-1 py-2 rounded-base border border-gray-400  dark:border-gray-700 hover:bg-neutral-secondary-soft hover:border-brand hover:text-heading cursor-pointer">
              <Download className="w-3 h-3 text-body" />
              <small className="text-body">
                Haz click para subir una imágen del libro
              </small>
            </div>
            <button
              type="button"
              className="text-body w-fit flex gap-2 bg-neutral-primary-soft border border-default hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary-soft shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              <Download className="w-4 h-4" />
              Subir imágen
            </button>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <div className="flex gap-2">
            <NavLink to="/">
              <button
                type="button"
                className="text-body hover:cursor-pointer  bg-neutral-primary border border-default hover:bg-neutral-secondary-soft hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              >
                {" "}
                Cancelar
              </button>
            </NavLink>

            <button
              type="submit"
              className="text-white hover:cursor-pointer bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Guardar libro
            </button>
          </div>
        </div>
      </form>
      <Sonner
        visible={visible}
        message={message}
        type={type}
        onClose={hideToast}
      />
    </>
  );
};

export default Form;
