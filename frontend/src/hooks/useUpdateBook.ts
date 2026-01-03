import type { Book } from "../types/book-interface";

export const useUpdateBook = async (book: Book) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/book/${book.id_book}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update book");
  }

  return res.json();
};
