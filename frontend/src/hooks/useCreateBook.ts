import { useState } from "react";
import { createBook } from "../api/books";
import type { createBookPayload } from "../types/createBookPayload";

export const useCreateBook = () => {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState<string | null>(null);

  async function submitBook(payload: createBookPayload) {
    try {
      setLoading(true);
      setError(null);

      const created = await createBook(payload);
      return created;
    } catch (err) {
      setError("Something went wrong");
      throw err;
    } finally {
      console.log("Libro creado");
      setLoading(false);
    }
  }

  return {
    submitBook,
    loading,
    err,
  };
};
