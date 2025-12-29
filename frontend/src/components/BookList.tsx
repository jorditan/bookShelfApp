import type { Book } from "../types/book-interface";
import React from "react";
import BookItem from "./BookItem";

interface Props {
  books: Book[];
}

const BookList: React.FC<Props> = ({ books }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {books.map((book: Book) => (
        <BookItem key={book.id_book} book={book} />
      ))}
    </div>
  );
};

export default BookList;
