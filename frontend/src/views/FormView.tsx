import { ArrowLeft } from "lucide-react";
import Form from "../components/Form";
import { NavLink } from "react-router-dom";

const FormView = () => {
  return (
    <>
      <section className="max-w-3xl mx-auto flex gap-4 flex-col">
        <div className="flex gap-2 items-center mb-4">
          <NavLink to="/">
            <ArrowLeft className="text-body" />
          </NavLink>
          <h1 className="text-3xl font-bold text-heading font-sans">
            Añadir reseña de un libro
          </h1>
        </div>
        <Form />
      </section>
    </>
  );
};

export default FormView;
