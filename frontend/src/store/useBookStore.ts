import { create } from "zustand";
import type { Book } from "../types/book-interface";
import { createBook, deleteBookById, editBook } from "../api/books";
import { toast } from "react-hot-toast/headless";
import type { createBookPayload } from "../types/createBookPayload";

type bookStore = {
  books: Book[];
  createBook: (book: Book) => void;
  setBooks: (books: Book[]) => void;
  updateBook: (id: number, data: Partial<Book>) => Promise<void>;
  removeBookById: (id: number) => void;
  fetchBooks: () => Promise<void>;
  loading?: string | boolean;
  error?: string | null;
};

const useBookStore = create<bookStore>((set) => ({
  books: [],

  createBook: async (payload: createBookPayload) => {
    try {
      set({ loading: true, error: null });

      const created = await createBook(payload);
      toast.success("Libro creado con éxito");
      return created;
    } catch (err) {
      set({ error: "Something went wrong" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

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

  removeBookById: async (id: number) => {
    try {
      set({ loading: true, error: null });

      await deleteBookById(id);
      useBookStore
        .getState()
        .setBooks(
          useBookStore.getState().books.filter((book) => book.id_book !== id)
        );
      toast("Libro eliminado con éxito", { icon: "🗑️" });
    } catch (err) {
      set({ error: "Something went wrong" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useBookStore;
