import {
  ArrowRight,
  Building2,
  Calendar,
  CircleUser,
  Star,
  Trash2,
} from "lucide-react";
import { Tooltip } from "flowbite-react";
import type { Book } from "../types/book-interface";
import React from "react";
import ButtonIcon from "./ButtonIcon";
import { useDeleteBook } from "../hooks/useDeleteBook";
import Modal from "./Modal";
import Form from "./Form";
import useBookStore from "../store/useBookStore";
import { formatDate } from "../hooks/useFormatDate";

const BookItem: React.FC<{ book: Book }> = ({ book }) => {
  const { deleteBook } = useDeleteBook();
  const updateBook = useBookStore((state) => state.updateBook);

  return (
    <div className="bg-neutral-primary-soft hover:border-brand hover:shadow-md transition-all delay-100 block max-w-sm min-w-md p-6 border border-default rounded-base shadow-xs hover:cursor-pointer">
      <div className="flex justify-between mt-2 mb-2 items-center">
        <h5 className="font-mono text-2xl font-semibold tracking-tight text-heading">
          {book.title}
        </h5>
        <div id="icons" className="flex gap-1">
          <Tooltip content="Eliminar libro" placement="top">
            <ButtonIcon
              onClick={() => deleteBook(book.id_book)}
              icon={<Trash2 className="w-4 h-4" />}
            />
          </Tooltip>
        </div>
      </div>
      <div className="flex gap-2 flex-col text-body">
        <div className="flex justify-between items-center">
          <div className="flex gap-0.5 items-center">
            <Tooltip content="Autor" placement="top">
              <CircleUser className="w-4 h-4 inline-block mr-1" />
            </Tooltip>
            <div></div>
            <p className="text-body">{book.author}</p>
          </div>
          <div>
            {book.rating !== undefined && (
              <div className="flex gap-1 items-center">
                <Star className="w-4 fill-current h-4 inline-block text-body" />
                <span className="text-body">{book.rating}/5</span>
              </div>
            )}
          </div>
        </div>
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
              {!book.read_date ? "No especificada" : ""}
              {formatDate(book.read_date)}
            </small>
          </div>

          <div className="flex gap-1 items-center">
            <Tooltip content="Editorial" placement="top">
              <Building2 className="w-4 h-4 inline-block text-body" />
            </Tooltip>
            <small className="text-body">
              {!book.publisher ? "No especificada" : ""}
              {book.publisher}
            </small>
          </div>
        </div>
      </div>
      <Modal
        buttonToggleText="Leer más"
        modalHeader="Editar libro"
        submitButtonText="Guardar cambios"
        icon={<ArrowRight className="w-4 h-4" />}
        cancelButtonText="Cancelar"
        children={
          <Form
            initialValues={{
              title: book.title,
            }}
            onSubmit={async (data) =>
              await updateBook(book.id_book, {
                ...data,
                read_date: formatDate(data.readDate),
              })
            }
            submitLabel="Guardar cambios"
          />
        }
      />
    </div>
  );
};

export default BookItem;
