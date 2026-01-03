import { create } from "zustand";
import type { Book } from "../types/book-interface";

type bookStore = {
  books: Book[];
  addBook: (book: Book) => void;
  removeBookById: (id: number) => void;
  setBooks: (books: Book[]) => void;
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
