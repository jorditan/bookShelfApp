import { useState } from "react";
import { deleteBookById } from "../api/books";

export const useDeleteBook = () => {
  // Placeholder for delete book logic
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteBook(id: number): Promise<void> {
    try {
      setLoading(true);
      setError(null);

      await deleteBookById(id);
      console.log("Libro elimiinado con éxito");
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
