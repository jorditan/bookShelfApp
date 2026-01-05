import { ArrowLeft } from "lucide-react";
import Form from "../components/Form";
import { NavLink, useNavigate } from "react-router-dom";
import { createBook } from "../api/books";
import { formatDateToISO } from "../hooks/useFormatDate";

const FormView = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="max-w-3xl mx-auto flex gap-2 flex-col mb-8">
        <div className="flex gap-2 items-center">
          <NavLink to="/">
            <ArrowLeft className="text-body" />
          </NavLink>
          <h1 className="text-3xl font-bold text-heading font-sans">
            Añadir reseña de un libro
          </h1>
          <small className="text-body">* campos obligatorios</small>
        </div>
        <Form
          onCancel={() => navigate("/")}
          onSubmit={async (data) => {
            await createBook({
              ...data,
              read_date: formatDateToISO(data.readDate),
              id_book: 0,
            });
            navigate("/");
          }}
        />
      </section>
    </>
  );
};

export default FormView;
