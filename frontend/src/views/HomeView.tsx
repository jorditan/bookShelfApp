import { useEffect } from "react";
import BookList from "../components/BookList";
import EmptyState from "./EmptyState";
import useBookStore from "../store/useBookStore";
import FilterButton from "../components/FilterButton";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import FloatButton from "../components/FloatButton";

const HomeView = () => {
  useEffect(() => {
    useBookStore.getState().fetchBooks();
  }, []);

  const books = useBookStore((state) => state.books);
  const navigate = useNavigate();
  const { searchQuery } = useBookStore();

  return (
    <>
      <section className="flex flex-col gap-4">
        {searchQuery !== "" && books.length === 0 ? (
          <EmptyState
            icon={<Search className="w-12 h-12 text-body" />}
            description={`No se han encontrado libros para la búsqueda: "${searchQuery}"`}
            buttonLabel="Limpiar búsqueda"
            onClick={() => {
              useBookStore.getState().fetchBooks();
            }}
          />
        ) : books.length === 0 ? (
          <EmptyState
            description=" Aún no haz añadido la reseña de ningún libro.
          Haz click en el botón para comenzar"
            buttonLabel="Añadir reseña"
            onClick={() => {
              navigate("/add");
            }}
          />
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
        <FloatButton />
      </section>
    </>
  );
};

export default HomeView;
