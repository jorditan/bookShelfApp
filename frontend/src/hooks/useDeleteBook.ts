import { useState } from "react";
import { deleteBookById } from "../api/books";
import useBookStore from "../store/useBookStore";
import toast from "react-hot-toast";

export const useDeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteBook(id: number): Promise<void> {
    try {
      setLoading(true);
      setError(null);

      await deleteBookById(id);
      useBookStore.getState().removeBookById(id);
      toast("Libro eliminado con éxito", { icon: "🗑️" });
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
