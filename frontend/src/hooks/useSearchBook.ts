import { useState } from "react";
import { searchBookByParams } from "../api/books";
import type { Book } from "../types/book-interface";
import useBookStore from "../store/useBookStore";

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
      console.log("Books found:", books);
      setBooks(books);
    } catch (err) {
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
