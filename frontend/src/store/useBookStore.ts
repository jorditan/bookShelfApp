import { create } from "zustand";
import type { Book } from "../types/book-interface";
import { editBook } from "../api/books";

type bookStore = {
  books: Book[];
  addBook: (book: Book) => void;
  removeBookById: (id: number) => void;
  setBooks: (books: Book[]) => void;
  updateBook: (id: number, data: Partial<Book>) => Promise<void>;
  fetchBooks: () => Promise<void>;
  loading?: string | boolean;
  error?: string | null;
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

  updateBook: async (id: number, data: Partial<Book>) => {
    try {
      set({ loading: true, error: null });

      const updated = await editBook(id, data);
      set((state) => ({
        books: state.books.map((b) =>
          b.id_book === updated.id_book ? updated : b
        ),
      }));
    } catch (err) {
      console.log(err);
      set({ error: "Failed to update book" });
    } finally {
      set({ loading: false });
    }
  },

  fetchBooks: async () => {
    try {
      set({ loading: true, error: null });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/books`);

      if (!res.ok) {
        throw new Error("Failed to fetch books");
      }

      const books: Book[] = await res.json();

      set({ books });
    } catch (err) {
      console.log(err);
      set({ error: "Something went wrong" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useBookStore;
