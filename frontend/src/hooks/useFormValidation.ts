import { useState } from "react";

type BookForm = {
  title: string;
  author: string;
  publisher: string;
  rating: number;
  readDate: string;
};

type FormErrors = Partial<Record<keyof BookForm, string>>;

export const useFormValidation = () => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (form: BookForm) => {
    const errors: FormErrors = {};

    if (!form.title.trim()) {
      errors.title = "El título es obligatorio";
    }

    if (!form.author.trim()) {
      errors.author = "El autor es obligatorio";
    }

    if (!form.publisher.trim()) {
      errors.publisher = "La editorial es obligatoria";
    }

    if (form.rating < 0.5 || form.rating > 5) {
      errors.rating = "La calificación debe estar entre 0.5 y 5";
    }

    if (form.readDate && !/^\d{2}\/\d{2}\/\d{4}$/.test(form.readDate)) {
      errors.readDate = "Formato de fecha inválido";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  function clearErrors() {
    setErrors({});
  }

  return { errors, validate, clearErrors };
};
