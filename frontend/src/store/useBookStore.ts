import { create } from "zustand";
import type { Book } from "../types/book-interface";

type bookStore = {
  books: Book[];
  addBook: (book: Book) => void;
  removeBookById: (id: number) => void;
  setBooks: (books: Book[]) => void;
};

const useBookStore = create<bookStore>((set) => ({
  books: [],

  addBook: (book) =>
    set((state) => ({
      books: [...state.books, book],
    })),

  removeBookById: (id) =>
    set((state) => ({
      books: state.books.filter((book) => book.id_book !== id),
    })),

  setBooks: (books) => set({ books }),
}));

export default useBookStore;
