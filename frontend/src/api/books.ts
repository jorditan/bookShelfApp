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

export async function searchBookByParams(params: {
  title?: string;
  author?: string;
}) {
  console.log("Searching books with params:");
  const searchParams = new URLSearchParams();

  if (params.title) {
    searchParams.append("title", params.title);
  }

  if (params.author) {
    searchParams.append("author", params.author);
  }

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/books?${searchParams.toString()}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to search books");
  }

  return res.json();
}
