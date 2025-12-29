import type { createBookPayload } from "../types/createBookPayload";

export async function createBook(payload: createBookPayload) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create book");
  }

  return res.json();
}

export async function deleteBookById(id: number) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/book/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete book");
  }
}
