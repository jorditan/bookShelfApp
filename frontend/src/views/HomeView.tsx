import { useEffect } from "react";
import BookList from "../components/BookList";
import EmptyState from "./EmptyState";
import useBookStore from "../store/useBookStore";
import FilterButton from "../components/FilterButton";

const HomeView = () => {
  useEffect(() => {
    useBookStore.getState().fetchBooks();
  }, []);

  const books = useBookStore((state) => state.books);

  return (
    <section className="flex flex-col gap-4">
      {books.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col justify-between items-start gap-4 ">
          <div id="filters" className="flex gap-2 w-full justify-end">
            <FilterButton
              label="Fecha de lectura"
              values={[
                "Última semana",
                "Último mes",
                "Últimos 3 meses",
                "Últimos 6 meses",
                "Último año",
              ]}
            />
            <FilterButton
              label="Calificación"
              values={[
                "1 estrella",
                "2 estrellas",
                "3 estrellas",
                "4 estrellas",
                "5 estrellas",
              ]}
            />
          </div>
          <BookList books={books} />
        </div>
      )}
    </section>
  );
};

export default HomeView;
