import { Calendar, Download } from "lucide-react";
import EditorText from "./EditorText";
import { NavLink } from "react-router-dom";

const Form = () => {
  return (
    <>
      <form className="w-full mx-auto space-y-4">
        <div className="flex flex-col gap-4">
          <div id="name" className="flex flex-col gap-1.5">
            <label
              htmlFor="visitors"
              className="block text-sm font-medium text-heading"
            >
              Título *{" "}
            </label>
            <input
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
              type="text"
              id="visitors"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 shadow-xs placeholder:text-body"
              placeholder="Ej: Editorial Planeta"
              required
            />
          </div>
          <div className="relative max-w-sm flex flex-col gap-1.5">
            <label
              htmlFor="datepicker"
              className="block text-sm font-medium text-heading"
            >
              Fecha de lectura
            </label>
            <div className="relative">
              <input
                id="datepicker-autohide"
                datepicker-autohide
                type="text"
                className="block w-full ps-9 pe-3  bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Seleccionar fecha"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body pointer-events-none" />
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
            <div className="w-full flex gap-2 justify-center bg-neutral-secondary items-center border-dashed px-1 py-2 rounded-base border border-neutral-secondary-medium">
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
            <NavLink to="/">
              <button
                type="submit"
                className="text-white hover:cursor-pointer bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              >
                Guardar libro
              </button>
            </NavLink>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
