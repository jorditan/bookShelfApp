import { useEffect } from "react";
import type { Book } from "../types/book-interface";
import BookList from "../components/BookList";
import EmptyState from "./EmptyState";
import useBookStore from "../store/useBookStore";

const HomeView = () => {
  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data: Book[]) => {
        useBookStore.getState().setBooks(data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const books = useBookStore((state) => state.books);

  return (
    <section className="flex flex-col gap-4">
      {books.length === 0 ? <EmptyState /> : null}
      <BookList books={books} />
    </section>
  );
};

export default HomeView;
