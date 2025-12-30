import { useState } from "react";
import { deleteBookById } from "../api/books";
import useBookStore from "../store/useBookStore";
import { useToast } from "./useSonner";

export const useDeleteBook = () => {
  // Placeholder for delete book logic
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { showToast } = useToast(3000);

  async function deleteBook(id: number): Promise<void> {
    try {
      setLoading(true);
      setError(null);

      await deleteBookById(id);
      useBookStore.getState().removeBookById(id);
      console.log("Libro elimiinado con éxito");
      showToast("Libro creado con éxito");
    } catch (err) {
      setError("Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    deleteBook,
    loading,
    error,
  };
};
