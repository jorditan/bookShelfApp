import { ArrowLeft } from "lucide-react";
import Form from "../components/Form";
import { NavLink, useNavigate } from "react-router-dom";
import { createBook } from "../api/books";

const FormView = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="max-w-3xl mx-auto flex gap-2 flex-col mb-8">
        <div className="flex justify-start items-start lg:items-center flex-col lg:flex-row gap-2 ">
          <div className="flex gap-2 items-center">
            <NavLink to="/">
              <ArrowLeft className="text-body" />
            </NavLink>
            <h1 className="text-2xl lg:text-3xl font-bold text-heading font-sans">
              Añadir reseña de un libro
            </h1>
          </div>
          <small className="text-body">* campos obligatorios</small>
        </div>
        <Form
          onCancel={() => navigate("/")}
          onSubmit={async (data) => {
            await createBook({
              ...data,
              read_date: data.readDate || null,
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
