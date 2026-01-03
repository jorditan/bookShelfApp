import { useState } from "react";
import { searchBookByParams } from "../api/books";
import type { Book } from "../types/book-interface";
import useBookStore from "../store/useBookStore";
import toast from "react-hot-toast";

export const useSearchBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setBooks = useBookStore((state) => state.setBooks);

  async function searchBook(params: {
    title?: string;
    author?: string;
  }): Promise<void> {
    try {
      setLoading(true);
      setError(null);

      const books: Book[] = await searchBookByParams(params);
      if (books.length === 0) {
        toast("No se han encontrado libros", { icon: "📚" });
      }
      setBooks(books);
    } catch (err) {
      toast.error("Algo no ha salido como se esperaba");
      setError("Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    searchBook,
    loading,
    error,
  };
};
