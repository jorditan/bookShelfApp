import { useEffect } from "react";
import BookList from "../components/BookList";
import EmptyState from "./EmptyState";
import useBookStore from "../store/useBookStore";

const HomeView = () => {
  useEffect(() => {
    useBookStore.getState().fetchBooks();
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
