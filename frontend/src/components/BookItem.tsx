import { ArrowRight, Building2, Calendar, CircleUser } from "lucide-react";
import { Tooltip } from "flowbite-react";
import type { Book } from "../types/book-interface";
import React from "react";

const formatDate = (input: string | Date | undefined): string => {
  if (!input) return "";
  if (input instanceof Date) {
    const day = String(input.getUTCDate()).padStart(2, "0");
    const month = String(input.getUTCMonth() + 1).padStart(2, "0");
    const year = input.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }
  const iso = String(input);
  const datePart = iso.split("T")[0];
  const [y, m, d] = datePart.split("-");
  if (y && m && d) return `${d}/${m}/${y}`;
  const dt = new Date(iso);
  if (!isNaN(dt.getTime())) {
    const day = String(dt.getUTCDate()).padStart(2, "0");
    const month = String(dt.getUTCMonth() + 1).padStart(2, "0");
    const year = dt.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }
  return iso;
};

const BookItem: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <div className="bg-neutral-primary-soft hover:border-brand hover:shadow-md transition-all delay-100 block max-w-sm min-w-md p-6 border border-default rounded-base shadow-xs hover:cursor-pointer">
      <a href="#">
        <img
          className="rounded-base"
          src="/docs/images/blog/image-1.jpg"
          alt={book.title}
        />
      </a>
      <a href="#">
        <h5 className="mt-6 font-mono mb-2 text-2xl font-semibold tracking-tight text-heading">
          {book.title}
        </h5>
      </a>
      <div className="flex gap-2 flex-col">
        <p className="text-body">
          <CircleUser className="w-4 h-4 inline-block mr-1" />
          {book.author}
        </p>
        <div className="flex justify-between pb-4">
          <div className="flex gap-1 items-center">
            <Tooltip
              className="flex justify-center items-center"
              content="Fecha de lectura"
              placement="top"
            >
              <Calendar className="w-4 h-4 inline-block text-body" />
            </Tooltip>
            <small className="text-body block">
              {formatDate(book.read_date)}
            </small>
          </div>

          <div className="flex gap-1 items-center">
            <Tooltip content="Editorial" placement="top">
              <Building2 className="w-4 h-4 inline-block text-body" />
            </Tooltip>
            <small className="text-body">{book.publisher}</small>
          </div>
        </div>
      </div>
      <a
        href="#"
        className="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
      >
        Leer más
        <ArrowRight className="w-4 h-4 ml-2" />
      </a>
    </div>
  );
};

export default BookItem;
